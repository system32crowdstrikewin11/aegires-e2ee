// End-to-end test of the BUILT plugin against a mock Discord.   Run:  npm run build && node test/e2e-mock.mjs
//
// Evaluates dist/index.js the way a Vendetta-style loader does, hands it a fake `vendetta`
// (patcher, metro, storage, toasts, commands), then drives the patched send/receive paths with
// Aegires v2 messages made by the independent node:crypto reference (test/reference2.mjs).
// It proves our send/receive/edit logic, fail-closed behaviour and unpatching. It can NOT prove
// Discord's real internals look like the mock - that needs the phone.
import fs from "node:fs";
import vm from "node:vm";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import * as ref from "./reference2.mjs";

const require = createRequire(import.meta.url);
const code = fs.readFileSync(new URL("../dist/index.js", import.meta.url), "utf8");

const SELF = "555000111222333444", OTHER = "777000111222333444";
const FORCED = "1562876012675465326";
let currentUser = { id: SELF };

const toasts = [], sent = [], edited = [], dispatched = [], storage = {}, commands = [];
const MessageActions = {
  sendMessage: (channelId, message) => { sent.push({ channelId, content: message.content }); return Promise.resolve("sent"); },
  editMessage: (channelId, id, message) => { edited.push({ channelId, id, content: message.content }); return Promise.resolve("edited"); },
  receiveMessage() {},
};
const UserStore = { getCurrentUser: () => currentUser, getUser: () => currentUser };
const FluxDispatcher = { dispatch: (event) => { dispatched.push(event); } };

function patcher(kind) {
  return (name, obj, cb) => {
    const orig = obj[name];
    obj[name] = function (...args) {
      if (kind === "before") { const r = cb(args); return orig.apply(this, Array.isArray(r) ? r : args); }
      if (kind === "after") return cb(args, orig.apply(this, args));
      return cb(args, orig.bind(this));
    };
    return () => { obj[name] = orig; };
  };
}
const vendetta = {
  patcher: { before: patcher("before"), after: patcher("after"), instead: patcher("instead") },
  metro: {
    findByProps: (...p) => (p.includes("sendMessage") ? MessageActions : p.includes("getCurrentUser") ? UserStore : undefined),
    findByStoreName: () => ({ getChannelId: () => "999" }),
    common: { React: { createElement: () => null, useState: (v) => [v, () => {}] }, ReactNative: new Proxy({}, { get: (_, k) => (k === "Alert" ? { alert: (_t, m) => toasts.push(m) } : "RN") }), FluxDispatcher },
  },
  plugin: { storage },
  storage: { useProxy: (s) => s },
  ui: { toasts: { showToast: (t) => toasts.push(t) } },
  commands: { registerCommand: (c) => { commands.push(c); return () => commands.splice(commands.indexOf(c), 1); } },
};

const ctx = vm.createContext({ vendetta, console, require, crypto: globalThis.crypto, setTimeout, clearTimeout });
const raw = vm.runInContext(`(vendetta => { return ${code} })(vendetta)`, ctx);
const plugin = raw.default ?? raw;
assert.equal(typeof plugin.onLoad, "function");
assert.equal(typeof plugin.onUnload, "function");
assert.ok(plugin.settings, "settings component exported");
console.log("  ok  bundle evaluates to { default: { onLoad, onUnload, settings } }");

// v1 leftovers in storage must be removed on load
storage.globalKeyHex = "ab".repeat(32);
storage.channels = { 321: { keyHex: "cd".repeat(32), enabled: true } };
currentUser = null; // our own id is not known yet
plugin.onLoad();
assert.equal(commands.length, 1, "/e2ee registered");
assert.equal(storage.globalKeyHex, undefined);
assert.equal(storage.channels[321].keyHex, undefined);
assert.equal(storage.preset, 2, "default preset AES-256");
console.log("  ok  onLoad: v1 keys dropped, default preset AES-256");

const key = Buffer.from(Array.from({ length: 32 }, (_, i) => (i * 5 + 9) & 255));
const P = ref.PRESETS;
const headerOf = (wire) => Buffer.from(wire.slice(1, 5), "base64")[0];

// ---- outgoing -----------------------------------------------------------------------------
storage.keyV2 = key.toString("hex");
storage.encryptByDefault = true;
await MessageActions.sendMessage("123", { content: "too early" });
assert.equal(sent.length, 0, "unknown own user id => blocked");
assert.ok(toasts.at(-1).includes("user id"));
console.log("  ok  unknown own user id => blocked (fail closed)");
currentUser = { id: SELF };
await new Promise((r) => setTimeout(r, 3100)); // self-id lookups are rate-limited to 1 / 3 s
await MessageActions.sendMessage("123", { content: "hello there" });
assert.ok(sent.at(-1).content.startsWith("§"));
assert.equal(headerOf(sent.at(-1).content), 0x22, "AES-256 header (v2, preset 2)");
assert.equal(ref.decMsg(sent.at(-1).content, key, "123", SELF), "hello there");
console.log("  ok  outgoing text encrypted; the reference (=> Aegires) reads it with channel + our user id");

for (const idx of [0, 1]) {
  storage.preset = idx;
  await MessageActions.sendMessage("123", { content: "preset " + idx });
  assert.equal(headerOf(sent.at(-1).content), 0x20 | idx);
  assert.equal(ref.decMsg(sent.at(-1).content, key, "123", SELF), "preset " + idx);
}
storage.preset = 2;
console.log("  ok  preset setting switches AES-128 / AES-192 / AES-256 on the wire");

const n = sent.length;
await MessageActions.sendMessage("123", { content: "x".repeat(1408) });
assert.equal(sent.length, n, "over-long message must NOT be sent");
assert.ok(toasts.at(-1).includes("Too long"));
await MessageActions.sendMessage("123", { content: "é".repeat(704) }); // 1408 bytes but only 704 chars
assert.equal(sent.length, n, "limit is in UTF-8 BYTES, not characters");
await MessageActions.sendMessage("123", { content: "x".repeat(1407) });
assert.equal(sent.length, n + 1, "exactly the max fits");
console.log("  ok  limit is bytes (1407 for AES-256): over-limit blocked, exact max sent");

storage.channels["777"] = { enabled: false };
await MessageActions.sendMessage("777", { content: "plain on purpose" });
assert.equal(sent.at(-1).content, "plain on purpose");
console.log("  ok  per-channel OFF sends plaintext");

storage.keyV2 = "";
const m = sent.length;
await MessageActions.sendMessage("123", { content: "no key" });
assert.equal(sent.length, m, "no key + encryption on => blocked");
assert.ok(toasts.at(-1).includes("no key"));
storage.keyV2 = key.toString("hex");
console.log("  ok  encryption on but no key => blocked, not sent in plaintext");

await MessageActions.editMessage("123", "m1", { content: "🔒 edited text" });
assert.equal(ref.decMsg(edited.at(-1).content, key, "123", SELF), "edited text");
console.log("  ok  edit strips the lock marker, then encrypts");

// ---- forced (preset) channel ---------------------------------------------------------------
storage.encryptByDefault = false;
storage.keyV2 = "";
const fkey = ref.master("mojoen", "dcenc2|ctx|forced|" + FORCED);
await MessageActions.sendMessage(FORCED, { content: "public channel hello" });
assert.equal(headerOf(sent.at(-1).content), 0x20, "forced channel is always AES-128");
assert.equal(ref.decMsg(sent.at(-1).content, fkey, FORCED, SELF), "public channel hello");
console.log("  ok  preset channel: always encrypted, AES-128, built-in key (no setup)");
storage.keyV2 = key.toString("hex");
storage.encryptByDefault = true;

// ---- incoming -----------------------------------------------------------------------------
const enc = (text, k, p, ch, author) => ref.encMsg(text, k, P[p], ch, author);
FluxDispatcher.dispatch({ type: "MESSAGE_CREATE", channelId: "123", message: { id: "1", channel_id: "123", author: { id: OTHER }, content: enc("secret text", key, 2, "123", OTHER) } });
assert.equal(dispatched.at(-1).message.content, "🔒 secret text");

FluxDispatcher.dispatch({
  type: "LOAD_MESSAGES_SUCCESS",
  channelId: "123",
  messages: [
    { id: "2", channel_id: "123", author: { id: OTHER }, content: enc("aes128 msg", key, 0, "123", OTHER) },
    { id: "3", channel_id: "123", author: { id: OTHER }, content: enc("[sz:640,480]look at this", key, 1, "123", OTHER), referenced_message: { id: "2", channel_id: "123", author: { id: SELF }, content: enc("quoted", key, 2, "123", SELF) } },
    { id: "4", channel_id: "123", author: { id: OTHER }, content: "just a normal message" },
    { id: "5", channel_id: "123", author: { id: OTHER }, content: enc("other key", ref.master("someone else", "dcenc2|user-key|v1", 1024), 2, "123", OTHER) },
    { id: "6", channel_id: "123", author: { id: OTHER }, content: enc("moved from another channel", key, 2, "999", OTHER) },
    { id: "7", channel_id: "123", author: { id: SELF }, content: enc("claimed by wrong author", key, 2, "123", OTHER) },
  ],
});
const msgs = dispatched.at(-1).messages;
assert.equal(msgs[0].content, "🔒 aes128 msg");
assert.equal(msgs[1].content, "🔒 look at this", "[sz:W,H] tag stripped");
assert.equal(msgs[1].referenced_message.content, "🔒 quoted", "reply preview decrypted with ITS author");
assert.equal(msgs[2].content, "just a normal message");
assert.ok(msgs[3].content.startsWith("§"), "foreign key left untouched");
assert.ok(msgs[4].content.startsWith("§"), "ciphertext moved to another channel is rejected");
assert.ok(msgs[5].content.startsWith("§"), "ciphertext attributed to a different author is rejected");
console.log("  ok  incoming: all presets, [sz] caption, reply previews; wrong key / moved channel / forged author untouched");

FluxDispatcher.dispatch({ type: "MESSAGE_CREATE", channelId: FORCED, message: { id: "20", channel_id: FORCED, author: { id: OTHER }, content: ref.encMsg("hi public", fkey, P[0], FORCED, OTHER) } });
assert.equal(dispatched.at(-1).message.content, "🔒 hi public");
console.log("  ok  incoming in the preset channel decrypts with the built-in key");

FluxDispatcher.dispatch({ type: "MESSAGE_UPDATE", message: { id: "30", channel_id: "123", content: enc("edited later", key, 2, "123", OTHER) } });
assert.ok(dispatched.at(-1).message.content.startsWith("§"), "no author known for id 30 => cannot decrypt");
FluxDispatcher.dispatch({ type: "MESSAGE_CREATE", message: { id: "31", channel_id: "123", author: { id: OTHER }, content: "plain first" } });
FluxDispatcher.dispatch({ type: "MESSAGE_UPDATE", message: { id: "31", channel_id: "123", content: enc("edited with remembered author", key, 2, "123", OTHER) } });
assert.equal(dispatched.at(-1).message.content, "🔒 edited with remembered author");
console.log("  ok  partial MESSAGE_UPDATE without author uses the author remembered from earlier events");

storage.showLock = false;
FluxDispatcher.dispatch({ type: "MESSAGE_UPDATE", message: { id: "6", channel_id: "123", author: { id: OTHER }, content: enc("no icon", key, 2, "123", OTHER) } });
assert.equal(dispatched.at(-1).message.content, "no icon");
console.log("  ok  lock icon can be turned off");

// ---- command ------------------------------------------------------------------------------
await commands[0].execute([{ name: "action", value: "aes-192" }], { channel: { id: "123" } });
assert.equal(storage.preset, 1);
await commands[0].execute([{ name: "action", value: "aes-256" }], { channel: { id: "123" } });
assert.equal(storage.preset, 2);
await commands[0].execute([{ name: "action", value: "off" }], { channel: { id: FORCED } });
assert.ok(toasts.at(-1).includes("cannot be turned off"));
await commands[0].execute([{ name: "action", value: "off" }], { channel: { id: "123" } });
assert.equal(storage.channels["123"].enabled, false);
await MessageActions.sendMessage("123", { content: "after /e2ee off" });
assert.equal(sent.at(-1).content, "after /e2ee off");
console.log("  ok  /e2ee aes-192, aes-256, off work; preset channel cannot be switched off");

// ---- unload -------------------------------------------------------------------------------
plugin.onUnload();
storage.channels = {}; storage.encryptByDefault = true;
await MessageActions.sendMessage("123", { content: "after unload" });
assert.equal(sent.at(-1).content, "after unload", "unpatched: nothing encrypts any more");
FluxDispatcher.dispatch({ type: "MESSAGE_CREATE", message: { id: "90", channel_id: "123", author: { id: OTHER }, content: enc("still locked", key, 2, "123", OTHER) } });
assert.ok(dispatched.at(-1).message.content.startsWith("§"), "unpatched: nothing decrypts any more");
console.log("  ok  onUnload removes every patch");

console.log("\nE2E mock test passed.");
