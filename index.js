(function(){var module={exports:{}};var exports=module.exports;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// vendetta:@vendetta/metro/common
var require_common = __commonJS({
  "vendetta:@vendetta/metro/common"(exports, module2) {
    module2.exports = vendetta.metro.common;
  }
});

// vendetta:@vendetta/metro
var require_metro = __commonJS({
  "vendetta:@vendetta/metro"(exports, module2) {
    module2.exports = vendetta.metro;
  }
});

// vendetta:@vendetta/plugin
var require_plugin = __commonJS({
  "vendetta:@vendetta/plugin"(exports, module2) {
    module2.exports = vendetta.plugin;
  }
});

// vendetta:@vendetta/commands
var require_commands = __commonJS({
  "vendetta:@vendetta/commands"(exports, module2) {
    module2.exports = vendetta.commands;
  }
});

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/rt.ts
var import_common = __toESM(require_common(), 1);
var import_metro = __toESM(require_metro(), 1);
function usableReact(c) {
  return !!c && typeof c.createElement === "function" && typeof c.useState === "function";
}
function pickReact() {
  const tries = [
    () => import_common.React,
    () => import_common.React?.default,
    () => (0, import_metro.findByProps)("createElement", "useState"),
    () => globalThis.React,
    () => globalThis.vendetta?.metro?.common?.React
  ];
  for (const t of tries) {
    try {
      const c = t();
      if (usableReact(c)) return c;
    } catch {
    }
  }
  return import_common.React;
}
function pickRN() {
  for (const t of [() => import_common.ReactNative, () => import_common.ReactNative?.default, () => (0, import_metro.findByProps)("View", "Text", "StyleSheet")]) {
    try {
      const c = t();
      if (c && c.View && c.Text) return c;
    } catch {
    }
  }
  return import_common.ReactNative;
}
var React = pickReact();
var RN = pickRN();
function reactDiagnostics() {
  const d = (n, c) => `${n}: ${c ? "obj keys=" + Object.keys(c).slice(0, 12).join(",") : String(c)}`;
  return [d("common.React", import_common.React), "createElement=" + typeof import_common.React?.createElement, "picked createElement=" + typeof React?.createElement, "missing RN components: " + missingComponents(["View", "Text", "ScrollView", "TextInput", "Switch", "TouchableOpacity", "Pressable"])].join("\n");
}
function comp(name) {
  const tries = [
    () => RN?.[name],
    () => import_common.ReactNative?.[name],
    () => (0, import_metro.findByProps)(name)?.[name],
    () => (0, import_metro.findByName)(name, false)?.default ?? (0, import_metro.findByName)(name),
    () => globalThis.ReactNative?.[name]
  ];
  for (const t of tries) {
    try {
      const c = t();
      if (c) return c;
    } catch {
    }
  }
  return void 0;
}
function missingComponents(names) {
  return names.filter((n) => !comp(n)).join(",") || "none";
}

// src/notify.ts
function notify(message) {
  console.log("[aegires-e2ee] notice:", message);
  try {
    RN.Alert.alert("Aegires E2EE", message);
  } catch {
  }
}
function quiet(message) {
  console.log("[aegires-e2ee]", message);
}

// src/state.ts
var import_plugin = __toESM(require_plugin(), 1);

// node_modules/@noble/hashes/esm/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber(h.outputLen);
  anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotl(word, shift) {
  return word << shift | word >>> 32 - shift >>> 0;
}
var nextTick = async () => {
};
async function asyncLoop(iters, tick, cb) {
  let ts = Date.now();
  for (let i = 0; i < iters; i++) {
    cb(i);
    const diff = Date.now() - ts;
    if (diff >= 0 && diff < tick)
      continue;
    await nextTick();
    ts += diff;
  }
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function kdfInputToBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function checkOpts(defaults, opts) {
  if (opts !== void 0 && {}.toString.call(opts) !== "[object Object]")
    throw new Error("options should be object or undefined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
var Hash = class {
};
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}

// node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash {
  constructor(hash, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    ahash(hash);
    const key = toBytes(_key);
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean(pad);
  }
  update(buf) {
    aexists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists(this);
    abytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new HMAC(hash, key);

// node_modules/@noble/hashes/esm/pbkdf2.js
function pbkdf2Init(hash, _password, _salt, _opts) {
  ahash(hash);
  const opts = checkOpts({ dkLen: 32, asyncTick: 10 }, _opts);
  const { c, dkLen, asyncTick } = opts;
  anumber(c);
  anumber(dkLen);
  anumber(asyncTick);
  if (c < 1)
    throw new Error("iterations (c) should be >= 1");
  const password = kdfInputToBytes(_password);
  const salt = kdfInputToBytes(_salt);
  const DK = new Uint8Array(dkLen);
  const PRF = hmac.create(hash, password);
  const PRFSalt = PRF._cloneInto().update(salt);
  return { c, dkLen, asyncTick, DK, PRF, PRFSalt };
}
function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
  PRF.destroy();
  PRFSalt.destroy();
  if (prfW)
    prfW.destroy();
  clean(u);
  return DK;
}
async function pbkdf2Async(hash, password, salt, opts) {
  const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
  let prfW;
  const arr = new Uint8Array(4);
  const view = createView(arr);
  const u = new Uint8Array(PRF.outputLen);
  for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
    const Ti = DK.subarray(pos, pos + PRF.outputLen);
    view.setInt32(0, ti, false);
    (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
    Ti.set(u.subarray(0, Ti.length));
    await asyncLoop(c - 1, asyncTick, () => {
      PRF._cloneInto(prfW).update(u).digestInto(u);
      for (let i = 0; i < Ti.length; i++)
        Ti[i] ^= u[i];
    });
  }
  return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}

// node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};

// node_modules/@noble/hashes/esm/legacy.js
var SHA1_IV = /* @__PURE__ */ Uint32Array.from([
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
]);
var SHA1_W = /* @__PURE__ */ new Uint32Array(80);
var SHA1 = class extends HashMD {
  constructor() {
    super(64, 20, 8, false);
    this.A = SHA1_IV[0] | 0;
    this.B = SHA1_IV[1] | 0;
    this.C = SHA1_IV[2] | 0;
    this.D = SHA1_IV[3] | 0;
    this.E = SHA1_IV[4] | 0;
  }
  get() {
    const { A, B, C: C2, D, E } = this;
    return [A, B, C2, D, E];
  }
  set(A, B, C2, D, E) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C2 | 0;
    this.D = D | 0;
    this.E = E | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA1_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 80; i++)
      SHA1_W[i] = rotl(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
    let { A, B, C: C2, D, E } = this;
    for (let i = 0; i < 80; i++) {
      let F, K;
      if (i < 20) {
        F = Chi(B, C2, D);
        K = 1518500249;
      } else if (i < 40) {
        F = B ^ C2 ^ D;
        K = 1859775393;
      } else if (i < 60) {
        F = Maj(B, C2, D);
        K = 2400959708;
      } else {
        F = B ^ C2 ^ D;
        K = 3395469782;
      }
      const T = rotl(A, 5) + F + E + K + SHA1_W[i] | 0;
      E = D;
      D = C2;
      C2 = rotl(B, 30);
      B = A;
      A = T;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C2 = C2 + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    this.set(A, B, C2, D, E);
  }
  roundClean() {
    clean(SHA1_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var sha1 = /* @__PURE__ */ createHasher(() => new SHA1());

// node_modules/@noble/hashes/esm/sha1.js
var sha12 = sha1;

// src/crypto/utf8.ts
function utf8Encode(s) {
  const out = [];
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i);
    if (c >= 55296 && c <= 56319) {
      const d = i + 1 < s.length ? s.charCodeAt(i + 1) : 0;
      if (d >= 56320 && d <= 57343) {
        c = 65536 + (c - 55296 << 10) + (d - 56320);
        i++;
      } else {
        c = 63;
      }
    } else if (c >= 56320 && c <= 57343) {
      c = 63;
    }
    if (c < 128) {
      out.push(c);
    } else if (c < 2048) {
      out.push(192 | c >> 6, 128 | c & 63);
    } else if (c < 65536) {
      out.push(224 | c >> 12, 128 | c >> 6 & 63, 128 | c & 63);
    } else {
      out.push(240 | c >> 18, 128 | c >> 12 & 63, 128 | c >> 6 & 63, 128 | c & 63);
    }
  }
  return Uint8Array.from(out);
}
function utf8Decode(b) {
  const units = [];
  let i = 0;
  while (i < b.length) {
    const c = b[i];
    let cp = 65533;
    let need = 0;
    let min = 0;
    if (c < 128) {
      cp = c;
    } else if (c >= 194 && c <= 223) {
      cp = c & 31;
      need = 1;
      min = 128;
    } else if (c >= 224 && c <= 239) {
      cp = c & 15;
      need = 2;
      min = 2048;
    } else if (c >= 240 && c <= 244) {
      cp = c & 7;
      need = 3;
      min = 65536;
    }
    i++;
    if (need > 0) {
      let ok = i + need <= b.length;
      for (let k = 0; ok && k < need; k++) {
        const cc = b[i + k];
        if ((cc & 192) !== 128) ok = false;
        else cp = cp << 6 | cc & 63;
      }
      if (ok && cp >= min && cp <= 1114111 && !(cp >= 55296 && cp <= 57343)) {
        i += need;
      } else {
        cp = 65533;
      }
    }
    if (cp >= 65536) {
      const v = cp - 65536;
      units.push(55296 + (v >> 10), 56320 + (v & 1023));
    } else {
      units.push(cp);
    }
  }
  let s = "";
  for (let k = 0; k < units.length; k += 8192) {
    s += String.fromCharCode.apply(null, units.slice(k, k + 8192));
  }
  return s;
}

// src/crypto/keys.ts
var SALT = utf8Encode("pwc");
var ITERATIONS = 15e3;
var KEY_BYTES = 32;
async function deriveKey(password) {
  return pbkdf2Async(sha12, utf8Encode(password), SALT, { c: ITERATIONS, dkLen: KEY_BYTES, asyncTick: 10 });
}
function toHex(b) {
  let s = "";
  for (let i = 0; i < b.length; i++) s += (b[i] < 16 ? "0" : "") + b[i].toString(16);
  return s;
}
function fromHex(h) {
  if (h.length % 2 !== 0 || !/^[0-9a-fA-F]*$/.test(h)) return null;
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.substr(i * 2, 2), 16);
  return out;
}

// src/state.ts
function initStorage() {
  var _a2, _b2, _c, _d, _e;
  (_a2 = import_plugin.storage).globalKeyHex ?? (_a2.globalKeyHex = "");
  (_b2 = import_plugin.storage).channels ?? (_b2.channels = {});
  (_c = import_plugin.storage).encryptByDefault ?? (_c.encryptByDefault = false);
  (_d = import_plugin.storage).showLock ?? (_d.showLock = true);
  (_e = import_plugin.storage).debug ?? (_e.debug = false);
}
var keyCache = /* @__PURE__ */ new Map();
function keyFromHex(hex) {
  if (!hex) return null;
  const hit = keyCache.get(hex);
  if (hit) return hit;
  const parsed = fromHex(hex);
  if (parsed && parsed.length === 32) {
    keyCache.set(hex, parsed);
    return parsed;
  }
  return null;
}
function cfg(channelId) {
  return import_plugin.storage.channels?.[channelId];
}
function getSendKey(channelId) {
  return keyFromHex(cfg(channelId)?.keyHex) ?? keyFromHex(import_plugin.storage.globalKeyHex);
}
function getReceiveKeys(channelId) {
  const keys = [];
  const chan = channelId ? keyFromHex(cfg(channelId)?.keyHex) : null;
  const glob = keyFromHex(import_plugin.storage.globalKeyHex);
  if (chan) keys.push(chan);
  if (glob && glob !== chan) keys.push(glob);
  return keys;
}
function hasGlobalKey() {
  return !!keyFromHex(import_plugin.storage.globalKeyHex);
}
function isEncryptionOn(channelId) {
  const c = cfg(channelId);
  if (c && typeof c.enabled === "boolean") return c.enabled;
  return !!import_plugin.storage.encryptByDefault;
}
function setChannelEnabled(channelId, enabled) {
  import_plugin.storage.channels[channelId] = { ...import_plugin.storage.channels[channelId] ?? {}, enabled };
}
async function setGlobalPassword(password) {
  import_plugin.storage.globalKeyHex = toHex(await deriveKey(password));
}
function clearGlobalKey() {
  import_plugin.storage.globalKeyHex = "";
}
async function setChannelPassword(channelId, password) {
  const keyHex = toHex(await deriveKey(password));
  import_plugin.storage.channels[channelId] = { ...import_plugin.storage.channels[channelId] ?? {}, keyHex };
}
function removeChannelConfig(channelId) {
  delete import_plugin.storage.channels[channelId];
}
function listChannelConfigs() {
  const out = [];
  for (const id of Object.keys(import_plugin.storage.channels ?? {})) {
    const c = import_plugin.storage.channels[id];
    out.push({ id, hasKey: !!c?.keyHex, enabled: c?.enabled });
  }
  return out;
}

// src/diag.ts
var diag = {
  installed: {},
  events: 0,
  // every Flux event seen
  msgEvents: 0,
  // events that carried message(s)
  types: {},
  // event type -> count, for events carrying messages
  encSeen: 0,
  // messages starting with the § marker
  decrypted: 0,
  noKey: 0,
  wrongKey: 0,
  sendCalls: 0,
  lastSend: "(no send seen yet)"
};
function diagLines() {
  const types = Object.entries(diag.types).map(([k, v]) => `${k}:${v}`).join(", ") || "none";
  return [
    ...Object.entries(diag.installed).map(([k, v]) => `hook ${k}: ${v}`),
    `flux events seen: ${diag.events}`,
    `message events: ${diag.msgEvents}`,
    `event types with messages: ${types}`,
    `encrypted msgs seen: ${diag.encSeen}`,
    `decrypted OK: ${diag.decrypted}`,
    `no key for channel: ${diag.noKey}`,
    `wrong key: ${diag.wrongKey}`,
    `sendMessage calls: ${diag.sendCalls}`,
    `last send: ${diag.lastSend}`
  ];
}

// src/patch.ts
var log = (...a) => console.log("[aegires-e2ee]", ...a);
function registry() {
  const g = globalThis;
  const tries = [() => vendetta?.metro?.modules, () => g.modules, () => g.__r?.getModules?.()];
  for (const t of tries) {
    try {
      const m = t();
      if (m && typeof m === "object") return m;
    } catch {
    }
  }
  return null;
}
function scan(pred) {
  const reg = registry();
  if (!reg) return void 0;
  let ids;
  try {
    ids = Object.keys(reg);
  } catch {
    return void 0;
  }
  for (const id of ids) {
    let ex;
    try {
      const m = reg[id];
      if (!m || !m.isInitialized) continue;
      ex = m.publicModule?.exports;
    } catch {
      continue;
    }
    if (!ex) continue;
    for (let i = 0; i < 2; i++) {
      try {
        const c = i === 0 ? ex : ex.default;
        if (c && (typeof c === "object" || typeof c === "function") && pred(c)) return c;
      } catch {
      }
    }
  }
  return void 0;
}
var isFn = (o, n) => typeof o[n] === "function";
function findFns(...names) {
  const pred = (o) => names.every((n) => isFn(o, n));
  try {
    const r = vendetta?.metro?.findByProps?.(...names);
    if (r && pred(r)) return r;
  } catch {
  }
  return scan(pred);
}
function findFlux() {
  const pred = (o) => isFn(o, "dispatch") && isFn(o, "subscribe") && isFn(o, "unsubscribe");
  try {
    const c = vendetta?.metro?.common?.FluxDispatcher;
    if (c && isFn(c, "dispatch")) return c;
  } catch {
  }
  return findFns("dispatch", "subscribe", "unsubscribe") ?? scan(pred);
}
function selectedChannelId() {
  try {
    const s = vendetta?.metro?.findByStoreName?.("SelectedChannelStore");
    const id = s?.getChannelId?.();
    if (id) return String(id);
  } catch {
  }
  try {
    const s = scan((o) => isFn(o, "getChannelId") && isFn(o, "getVoiceChannelId") && isFn(o, "getLastSelectedChannelId"));
    const id = s?.getChannelId?.();
    if (id) return String(id);
  } catch {
  }
  return "";
}
function install(name, obj, make) {
  if (!obj || typeof obj[name] !== "function") throw new Error(`${name} is not a function on the target`);
  const orig = obj[name];
  const inner = make(orig);
  let active = true;
  const wrapper = function(...args) {
    return active ? inner.apply(this, args) : orig.apply(this, args);
  };
  try {
    Object.defineProperty(obj, name, { value: wrapper, writable: true, configurable: true, enumerable: true });
  } catch {
    try {
      obj[name] = wrapper;
    } catch {
    }
  }
  if (obj[name] !== wrapper) throw new Error(`could not replace ${name} (read-only)`);
  return () => {
    active = false;
    try {
      if (obj[name] === wrapper) Object.defineProperty(obj, name, { value: orig, writable: true, configurable: true, enumerable: true });
    } catch {
    }
  };
}
function before(name, obj, cb) {
  return install(
    name,
    obj,
    (orig) => function(...args) {
      try {
        const r = cb(args);
        if (Array.isArray(r)) args = r;
      } catch (e) {
        log("before-hook error in " + name, e);
      }
      return orig.apply(this, args);
    }
  );
}
function instead(name, obj, cb) {
  return install(
    name,
    obj,
    (orig) => function(...args) {
      return cb(args, (...a) => orig.apply(this, a));
    }
  );
}
function envSummary() {
  const keys = (o) => {
    try {
      return o ? Object.keys(o).slice(0, 14).join(",") : String(o);
    } catch {
      return "?";
    }
  };
  const reg = registry();
  let n = -1, init = -1;
  try {
    if (reg) {
      const ids = Object.keys(reg);
      n = ids.length;
      init = ids.reduce((c, id) => c + (reg[id]?.isInitialized ? 1 : 0), 0);
    }
  } catch {
  }
  return `metro[${keys(vendetta?.metro)}] patcher[${keys(vendetta?.patcher)}] registry=${reg ? n + " mods, " + init + " init" : "NONE"}`;
}
function noteFound(label, found) {
  diag.installed["find " + label] = found ? "found" : "NOT FOUND";
}

// src/patches/send.ts
var import_plugin2 = __toESM(require_plugin(), 1);

// node_modules/@noble/ciphers/esm/utils.js
function isBytes2(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abool(b) {
  if (typeof b !== "boolean")
    throw new Error(`boolean expected, not ${b}`);
}
function abytes2(b, ...lengths) {
  if (!isBytes2(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists2(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput2(out, instance) {
  abytes2(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u8(arr) {
  return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean2(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView2(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes2(data);
  else if (isBytes2(data))
    data = copyBytes(data);
  else
    throw new Error("Uint8Array expected, got " + typeof data);
  return data;
}
function equalBytes(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
}
var wrapCipher = /* @__NO_SIDE_EFFECTS__ */ (params, constructor) => {
  function wrappedCipher(key, ...args) {
    abytes2(key);
    if (!isLE)
      throw new Error("Non little-endian hardware is not yet supported");
    if (params.nonceLength !== void 0) {
      const nonce = args[0];
      if (!nonce)
        throw new Error("nonce / iv required");
      if (params.varSizeNonce)
        abytes2(nonce);
      else
        abytes2(nonce, params.nonceLength);
    }
    const tagl = params.tagLength;
    if (tagl && args[1] !== void 0) {
      abytes2(args[1]);
    }
    const cipher = constructor(key, ...args);
    const checkOutput = (fnLength, output) => {
      if (output !== void 0) {
        if (fnLength !== 2)
          throw new Error("cipher output not supported");
        abytes2(output);
      }
    };
    let called = false;
    const wrCipher = {
      encrypt(data, output) {
        if (called)
          throw new Error("cannot encrypt() twice with same key + nonce");
        called = true;
        abytes2(data);
        checkOutput(cipher.encrypt.length, output);
        return cipher.encrypt(data, output);
      },
      decrypt(data, output) {
        abytes2(data);
        if (tagl && data.length < tagl)
          throw new Error("invalid ciphertext length: smaller than tagLength=" + tagl);
        checkOutput(cipher.decrypt.length, output);
        return cipher.decrypt(data, output);
      }
    };
    return wrCipher;
  }
  Object.assign(wrappedCipher, params);
  return wrappedCipher;
};
function getOutput(expectedLength, out, onlyAligned = true) {
  if (out === void 0)
    return new Uint8Array(expectedLength);
  if (out.length !== expectedLength)
    throw new Error("invalid output length, expected " + expectedLength + ", got: " + out.length);
  if (onlyAligned && !isAligned32(out))
    throw new Error("invalid output, must be aligned");
  return out;
}
function setBigUint642(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function u64Lengths(dataLength, aadLength, isLE2) {
  abool(isLE2);
  const num = new Uint8Array(16);
  const view = createView2(num);
  setBigUint642(view, 0, BigInt(aadLength), isLE2);
  setBigUint642(view, 8, BigInt(dataLength), isLE2);
  return num;
}
function isAligned32(bytes) {
  return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
  return Uint8Array.from(bytes);
}

// node_modules/@noble/ciphers/esm/_polyval.js
var BLOCK_SIZE = 16;
var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
var ZEROS32 = u32(ZEROS16);
var POLY = 225;
var mul2 = (s0, s1, s2, s3) => {
  const hiBit = s3 & 1;
  return {
    s3: s2 << 31 | s3 >>> 1,
    s2: s1 << 31 | s2 >>> 1,
    s1: s0 << 31 | s1 >>> 1,
    s0: s0 >>> 1 ^ POLY << 24 & -(hiBit & 1)
    // reduce % poly
  };
};
var swapLE = (n) => (n >>> 0 & 255) << 24 | (n >>> 8 & 255) << 16 | (n >>> 16 & 255) << 8 | n >>> 24 & 255 | 0;
function _toGHASHKey(k) {
  k.reverse();
  const hiBit = k[15] & 1;
  let carry = 0;
  for (let i = 0; i < k.length; i++) {
    const t = k[i];
    k[i] = t >>> 1 | carry;
    carry = (t & 1) << 7;
  }
  k[0] ^= -hiBit & 225;
  return k;
}
var estimateWindow = (bytes) => {
  if (bytes > 64 * 1024)
    return 8;
  if (bytes > 1024)
    return 4;
  return 2;
};
var GHASH = class {
  // We select bits per window adaptively based on expectedLength
  constructor(key, expectedLength) {
    this.blockLen = BLOCK_SIZE;
    this.outputLen = BLOCK_SIZE;
    this.s0 = 0;
    this.s1 = 0;
    this.s2 = 0;
    this.s3 = 0;
    this.finished = false;
    key = toBytes2(key);
    abytes2(key, 16);
    const kView = createView2(key);
    let k0 = kView.getUint32(0, false);
    let k1 = kView.getUint32(4, false);
    let k2 = kView.getUint32(8, false);
    let k3 = kView.getUint32(12, false);
    const doubles = [];
    for (let i = 0; i < 128; i++) {
      doubles.push({ s0: swapLE(k0), s1: swapLE(k1), s2: swapLE(k2), s3: swapLE(k3) });
      ({ s0: k0, s1: k1, s2: k2, s3: k3 } = mul2(k0, k1, k2, k3));
    }
    const W = estimateWindow(expectedLength || 1024);
    if (![1, 2, 4, 8].includes(W))
      throw new Error("ghash: invalid window size, expected 2, 4 or 8");
    this.W = W;
    const bits2 = 128;
    const windows = bits2 / W;
    const windowSize = this.windowSize = 2 ** W;
    const items = [];
    for (let w = 0; w < windows; w++) {
      for (let byte = 0; byte < windowSize; byte++) {
        let s0 = 0, s1 = 0, s2 = 0, s3 = 0;
        for (let j = 0; j < W; j++) {
          const bit = byte >>> W - j - 1 & 1;
          if (!bit)
            continue;
          const { s0: d0, s1: d1, s2: d2, s3: d3 } = doubles[W * w + j];
          s0 ^= d0, s1 ^= d1, s2 ^= d2, s3 ^= d3;
        }
        items.push({ s0, s1, s2, s3 });
      }
    }
    this.t = items;
  }
  _updateBlock(s0, s1, s2, s3) {
    s0 ^= this.s0, s1 ^= this.s1, s2 ^= this.s2, s3 ^= this.s3;
    const { W, t, windowSize } = this;
    let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
    const mask = (1 << W) - 1;
    let w = 0;
    for (const num of [s0, s1, s2, s3]) {
      for (let bytePos = 0; bytePos < 4; bytePos++) {
        const byte = num >>> 8 * bytePos & 255;
        for (let bitPos = 8 / W - 1; bitPos >= 0; bitPos--) {
          const bit = byte >>> W * bitPos & mask;
          const { s0: e0, s1: e1, s2: e2, s3: e3 } = t[w * windowSize + bit];
          o0 ^= e0, o1 ^= e1, o2 ^= e2, o3 ^= e3;
          w += 1;
        }
      }
    }
    this.s0 = o0;
    this.s1 = o1;
    this.s2 = o2;
    this.s3 = o3;
  }
  update(data) {
    aexists2(this);
    data = toBytes2(data);
    abytes2(data);
    const b32 = u32(data);
    const blocks = Math.floor(data.length / BLOCK_SIZE);
    const left = data.length % BLOCK_SIZE;
    for (let i = 0; i < blocks; i++) {
      this._updateBlock(b32[i * 4 + 0], b32[i * 4 + 1], b32[i * 4 + 2], b32[i * 4 + 3]);
    }
    if (left) {
      ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
      this._updateBlock(ZEROS32[0], ZEROS32[1], ZEROS32[2], ZEROS32[3]);
      clean2(ZEROS32);
    }
    return this;
  }
  destroy() {
    const { t } = this;
    for (const elm of t) {
      elm.s0 = 0, elm.s1 = 0, elm.s2 = 0, elm.s3 = 0;
    }
  }
  digestInto(out) {
    aexists2(this);
    aoutput2(out, this);
    this.finished = true;
    const { s0, s1, s2, s3 } = this;
    const o32 = u32(out);
    o32[0] = s0;
    o32[1] = s1;
    o32[2] = s2;
    o32[3] = s3;
    return out;
  }
  digest() {
    const res = new Uint8Array(BLOCK_SIZE);
    this.digestInto(res);
    this.destroy();
    return res;
  }
};
var Polyval = class extends GHASH {
  constructor(key, expectedLength) {
    key = toBytes2(key);
    abytes2(key);
    const ghKey = _toGHASHKey(copyBytes(key));
    super(ghKey, expectedLength);
    clean2(ghKey);
  }
  update(data) {
    data = toBytes2(data);
    aexists2(this);
    const b32 = u32(data);
    const left = data.length % BLOCK_SIZE;
    const blocks = Math.floor(data.length / BLOCK_SIZE);
    for (let i = 0; i < blocks; i++) {
      this._updateBlock(swapLE(b32[i * 4 + 3]), swapLE(b32[i * 4 + 2]), swapLE(b32[i * 4 + 1]), swapLE(b32[i * 4 + 0]));
    }
    if (left) {
      ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
      this._updateBlock(swapLE(ZEROS32[3]), swapLE(ZEROS32[2]), swapLE(ZEROS32[1]), swapLE(ZEROS32[0]));
      clean2(ZEROS32);
    }
    return this;
  }
  digestInto(out) {
    aexists2(this);
    aoutput2(out, this);
    this.finished = true;
    const { s0, s1, s2, s3 } = this;
    const o32 = u32(out);
    o32[0] = s0;
    o32[1] = s1;
    o32[2] = s2;
    o32[3] = s3;
    return out.reverse();
  }
};
function wrapConstructorWithKey(hashCons) {
  const hashC = (msg, key) => hashCons(key, msg.length).update(toBytes2(msg)).digest();
  const tmp = hashCons(new Uint8Array(16), 0);
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (key, expectedLength) => hashCons(key, expectedLength);
  return hashC;
}
var ghash = wrapConstructorWithKey((key, expectedLength) => new GHASH(key, expectedLength));
var polyval = wrapConstructorWithKey((key, expectedLength) => new Polyval(key, expectedLength));

// node_modules/@noble/ciphers/esm/aes.js
var BLOCK_SIZE2 = 16;
var BLOCK_SIZE32 = 4;
var EMPTY_BLOCK = /* @__PURE__ */ new Uint8Array(BLOCK_SIZE2);
var POLY2 = 283;
function mul22(n) {
  return n << 1 ^ POLY2 & -(n >> 7);
}
function mul(a, b) {
  let res = 0;
  for (; b > 0; b >>= 1) {
    res ^= a & -(b & 1);
    a = mul22(a);
  }
  return res;
}
var sbox = /* @__PURE__ */ (() => {
  const t = new Uint8Array(256);
  for (let i = 0, x = 1; i < 256; i++, x ^= mul22(x))
    t[i] = x;
  const box = new Uint8Array(256);
  box[0] = 99;
  for (let i = 0; i < 255; i++) {
    let x = t[255 - i];
    x |= x << 8;
    box[t[i]] = (x ^ x >> 4 ^ x >> 5 ^ x >> 6 ^ x >> 7 ^ 99) & 255;
  }
  clean2(t);
  return box;
})();
var rotr32_8 = (n) => n << 24 | n >>> 8;
var rotl32_8 = (n) => n << 8 | n >>> 24;
function genTtable(sbox2, fn) {
  if (sbox2.length !== 256)
    throw new Error("Wrong sbox length");
  const T0 = new Uint32Array(256).map((_, j) => fn(sbox2[j]));
  const T1 = T0.map(rotl32_8);
  const T2 = T1.map(rotl32_8);
  const T3 = T2.map(rotl32_8);
  const T01 = new Uint32Array(256 * 256);
  const T23 = new Uint32Array(256 * 256);
  const sbox22 = new Uint16Array(256 * 256);
  for (let i = 0; i < 256; i++) {
    for (let j = 0; j < 256; j++) {
      const idx = i * 256 + j;
      T01[idx] = T0[i] ^ T1[j];
      T23[idx] = T2[i] ^ T3[j];
      sbox22[idx] = sbox2[i] << 8 | sbox2[j];
    }
  }
  return { sbox: sbox2, sbox2: sbox22, T0, T1, T2, T3, T01, T23 };
}
var tableEncoding = /* @__PURE__ */ genTtable(sbox, (s) => mul(s, 3) << 24 | s << 16 | s << 8 | mul(s, 2));
var xPowers = /* @__PURE__ */ (() => {
  const p = new Uint8Array(16);
  for (let i = 0, x = 1; i < 16; i++, x = mul22(x))
    p[i] = x;
  return p;
})();
function expandKeyLE(key) {
  abytes2(key);
  const len = key.length;
  if (![16, 24, 32].includes(len))
    throw new Error("aes: invalid key size, should be 16, 24 or 32, got " + len);
  const { sbox2 } = tableEncoding;
  const toClean = [];
  if (!isAligned32(key))
    toClean.push(key = copyBytes(key));
  const k32 = u32(key);
  const Nk = k32.length;
  const subByte = (n) => applySbox(sbox2, n, n, n, n);
  const xk = new Uint32Array(len + 28);
  xk.set(k32);
  for (let i = Nk; i < xk.length; i++) {
    let t = xk[i - 1];
    if (i % Nk === 0)
      t = subByte(rotr32_8(t)) ^ xPowers[i / Nk - 1];
    else if (Nk > 6 && i % Nk === 4)
      t = subByte(t);
    xk[i] = xk[i - Nk] ^ t;
  }
  clean2(...toClean);
  return xk;
}
function apply0123(T01, T23, s0, s1, s2, s3) {
  return T01[s0 << 8 & 65280 | s1 >>> 8 & 255] ^ T23[s2 >>> 8 & 65280 | s3 >>> 24 & 255];
}
function applySbox(sbox2, s0, s1, s2, s3) {
  return sbox2[s0 & 255 | s1 & 65280] | sbox2[s2 >>> 16 & 255 | s3 >>> 16 & 65280] << 16;
}
function encrypt(xk, s0, s1, s2, s3) {
  const { sbox2, T01, T23 } = tableEncoding;
  let k = 0;
  s0 ^= xk[k++], s1 ^= xk[k++], s2 ^= xk[k++], s3 ^= xk[k++];
  const rounds = xk.length / 4 - 2;
  for (let i = 0; i < rounds; i++) {
    const t02 = xk[k++] ^ apply0123(T01, T23, s0, s1, s2, s3);
    const t12 = xk[k++] ^ apply0123(T01, T23, s1, s2, s3, s0);
    const t22 = xk[k++] ^ apply0123(T01, T23, s2, s3, s0, s1);
    const t32 = xk[k++] ^ apply0123(T01, T23, s3, s0, s1, s2);
    s0 = t02, s1 = t12, s2 = t22, s3 = t32;
  }
  const t0 = xk[k++] ^ applySbox(sbox2, s0, s1, s2, s3);
  const t1 = xk[k++] ^ applySbox(sbox2, s1, s2, s3, s0);
  const t2 = xk[k++] ^ applySbox(sbox2, s2, s3, s0, s1);
  const t3 = xk[k++] ^ applySbox(sbox2, s3, s0, s1, s2);
  return { s0: t0, s1: t1, s2: t2, s3: t3 };
}
function ctr32(xk, isLE2, nonce, src, dst) {
  abytes2(nonce, BLOCK_SIZE2);
  abytes2(src);
  dst = getOutput(src.length, dst);
  const ctr = nonce;
  const c32 = u32(ctr);
  const view = createView2(ctr);
  const src32 = u32(src);
  const dst32 = u32(dst);
  const ctrPos = isLE2 ? 0 : 12;
  const srcLen = src.length;
  let ctrNum = view.getUint32(ctrPos, isLE2);
  let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
  for (let i = 0; i + 4 <= src32.length; i += 4) {
    dst32[i + 0] = src32[i + 0] ^ s0;
    dst32[i + 1] = src32[i + 1] ^ s1;
    dst32[i + 2] = src32[i + 2] ^ s2;
    dst32[i + 3] = src32[i + 3] ^ s3;
    ctrNum = ctrNum + 1 >>> 0;
    view.setUint32(ctrPos, ctrNum, isLE2);
    ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
  }
  const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
  if (start < srcLen) {
    const b32 = new Uint32Array([s0, s1, s2, s3]);
    const buf = u8(b32);
    for (let i = start, pos = 0; i < srcLen; i++, pos++)
      dst[i] = src[i] ^ buf[pos];
    clean2(b32);
  }
  return dst;
}
function computeTag(fn, isLE2, key, data, AAD) {
  const aadLength = AAD ? AAD.length : 0;
  const h = fn.create(key, data.length + aadLength);
  if (AAD)
    h.update(AAD);
  const num = u64Lengths(8 * data.length, 8 * aadLength, isLE2);
  h.update(data);
  h.update(num);
  const res = h.digest();
  clean2(num);
  return res;
}
var gcm = /* @__PURE__ */ wrapCipher({ blockSize: 16, nonceLength: 12, tagLength: 16, varSizeNonce: true }, function aesgcm(key, nonce, AAD) {
  if (nonce.length < 8)
    throw new Error("aes/gcm: invalid nonce length");
  const tagLength = 16;
  function _computeTag(authKey, tagMask, data) {
    const tag = computeTag(ghash, false, authKey, data, AAD);
    for (let i = 0; i < tagMask.length; i++)
      tag[i] ^= tagMask[i];
    return tag;
  }
  function deriveKeys() {
    const xk = expandKeyLE(key);
    const authKey = EMPTY_BLOCK.slice();
    const counter = EMPTY_BLOCK.slice();
    ctr32(xk, false, counter, counter, authKey);
    if (nonce.length === 12) {
      counter.set(nonce);
    } else {
      const nonceLen = EMPTY_BLOCK.slice();
      const view = createView2(nonceLen);
      setBigUint642(view, 8, BigInt(nonce.length * 8), false);
      const g = ghash.create(authKey).update(nonce).update(nonceLen);
      g.digestInto(counter);
      g.destroy();
    }
    const tagMask = ctr32(xk, false, counter, EMPTY_BLOCK);
    return { xk, authKey, counter, tagMask };
  }
  return {
    encrypt(plaintext) {
      const { xk, authKey, counter, tagMask } = deriveKeys();
      const out = new Uint8Array(plaintext.length + tagLength);
      const toClean = [xk, authKey, counter, tagMask];
      if (!isAligned32(plaintext))
        toClean.push(plaintext = copyBytes(plaintext));
      ctr32(xk, false, counter, plaintext, out.subarray(0, plaintext.length));
      const tag = _computeTag(authKey, tagMask, out.subarray(0, out.length - tagLength));
      toClean.push(tag);
      out.set(tag, plaintext.length);
      clean2(...toClean);
      return out;
    },
    decrypt(ciphertext) {
      const { xk, authKey, counter, tagMask } = deriveKeys();
      const toClean = [xk, authKey, tagMask, counter];
      if (!isAligned32(ciphertext))
        toClean.push(ciphertext = copyBytes(ciphertext));
      const data = ciphertext.subarray(0, -tagLength);
      const passedTag = ciphertext.subarray(-tagLength);
      const tag = _computeTag(authKey, tagMask, data);
      toClean.push(tag);
      if (!equalBytes(tag, passedTag))
        throw new Error("aes/gcm: invalid ghash tag");
      const out = ctr32(xk, false, counter, data);
      clean2(...toClean);
      return out;
    }
  };
});

// node_modules/fflate/esm/browser.js
var u82 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u82([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u82([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u82([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var hMap = (function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
});
var flt = new u82(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u82(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u82(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf || new u82(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u82(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u82(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u82(tl);
        var clt = new u82(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
  d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i = 0; i < d.length; ++i) {
    if (d[i])
      t.push({ s: i, f: d[i] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return { t: et, l: 0 };
  if (s == 1) {
    var v = new u82(t[0].s + 1);
    v[t[0].s] = 1;
    return { t: v, l: 1 };
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i2].f ? i0++ : i2++];
    r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i = 1; i < s; ++i) {
    if (t2[i].s > maxSym)
      maxSym = t2[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t2[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>= lft;
    while (dt > 0) {
      var i2_2 = t2[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t2[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return { t: new u82(tr), l: mbt };
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return { c: cl.subarray(0, cli), n: s };
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    ++lcfreq[lclt[i] & 31];
  for (var i = 0; i < lcdt.length; ++i)
    ++lcfreq[lcdt[i] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    var sym = syms[i];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, sym >> 23 & 31), p += fleb[len];
      var dst = sym & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[sym]), p += ll[sym];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u82(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
  var s = st.z || dat.length;
  var o = new u82(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var lst = st.l;
  var pos = (st.r || 0) & 7;
  if (lvl) {
    if (pos)
      w[0] = st.r >> 3;
    var opt = deo[lvl - 1];
    var n = opt >> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
    for (; i + 2 < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    for (i = Math.max(i, wi); i < s; ++i) {
      syms[li++] = dat[i];
      ++lf[dat[i]];
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst) {
      st.r = pos & 7 | w[pos / 8 | 0] << 3;
      pos -= 7;
      st.h = head, st.p = prev, st.i = i, st.w = wi;
    }
  } else {
    for (var i = st.w || 0; i < s + lst; i += 65535) {
      var e = i + 65535;
      if (e >= s) {
        w[pos / 8 | 0] = lst;
        e = s;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i, e));
    }
    st.i = s;
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var dopt = function(dat, opt, pre, post, st) {
  if (!st) {
    st = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u82(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}

// src/crypto/base64.ts
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var LOOKUP = {};
for (let i = 0; i < ALPHABET.length; i++) LOOKUP[ALPHABET[i]] = i;
function base64Encode(bytes) {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i];
    const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += ALPHABET[a >> 2];
    out += ALPHABET[(a & 3) << 4 | b >> 4];
    out += i + 1 < bytes.length ? ALPHABET[(b & 15) << 2 | c >> 6] : "=";
    out += i + 2 < bytes.length ? ALPHABET[c & 63] : "=";
  }
  return out;
}
function base64Decode(text) {
  const clean3 = text.replace(/[\s=]+/g, "");
  if (clean3.length % 4 === 1) return null;
  const out = new Uint8Array(Math.floor(clean3.length * 3 / 4));
  let o = 0;
  for (let i = 0; i < clean3.length; i += 4) {
    const v = [];
    for (let k = 0; k < 4; k++) {
      if (i + k >= clean3.length) {
        v.push(0);
        continue;
      }
      const x = LOOKUP[clean3[i + k]];
      if (x === void 0) return null;
      v.push(x);
    }
    const n = clean3.length - i;
    if (o < out.length) out[o++] = v[0] << 2 | v[1] >> 4;
    if (n > 2 && o < out.length) out[o++] = (v[1] & 15) << 4 | v[2] >> 2;
    if (n > 3 && o < out.length) out[o++] = (v[2] & 3) << 6 | v[3];
  }
  return out;
}

// src/crypto/random.ts
function hasSecureRandom() {
  const c = globalThis.crypto;
  return !!c && typeof c.getRandomValues === "function";
}
function randomBytes(n) {
  const c = globalThis.crypto;
  if (!c || typeof c.getRandomValues !== "function") {
    throw new Error("No secure random source: crypto.getRandomValues is missing in this runtime");
  }
  const out = new Uint8Array(n);
  c.getRandomValues(out);
  return out;
}

// src/crypto/wire.ts
var PREFIX = "\xA7";
var MAX_PLAINTEXT_LEN = 1300;
var IV_LEN = 12;
var TAG_LEN = 16;
var COMPRESS_THRESHOLD = 100;
var MAX_INFLATED_BYTES = 1 << 20;
var FLAG_RAW = 0;
var FLAG_DEFLATE = 1;
function looksEncrypted(s) {
  return typeof s === "string" && s.startsWith(PREFIX);
}
function concat(a, b) {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}
function encryptText(plain, key) {
  const raw = utf8Encode(plain);
  let data = raw;
  let flag = FLAG_RAW;
  if (raw.length >= COMPRESS_THRESHOLD) {
    const z = deflateSync(raw, { level: 1 });
    if (z.length < raw.length) {
      data = z;
      flag = FLAG_DEFLATE;
    }
  }
  const payload = concat(Uint8Array.of(flag), data);
  const iv = randomBytes(IV_LEN);
  const sealed = gcm(key, iv).encrypt(payload);
  return PREFIX + base64Encode(concat(iv, sealed));
}
function decryptText(wire, key) {
  if (!looksEncrypted(wire)) return null;
  try {
    const all = base64Decode(wire.slice(PREFIX.length));
    if (!all || all.length < IV_LEN + TAG_LEN) return null;
    const payload = gcm(key, all.subarray(0, IV_LEN)).decrypt(all.subarray(IV_LEN));
    if (payload.length === 0) return null;
    const data = payload.subarray(1);
    if (payload[0] === FLAG_DEFLATE) {
      const out = inflateSync(data);
      return out.length > MAX_INFLATED_BYTES ? null : utf8Decode(out);
    }
    return utf8Decode(data);
  } catch {
    return null;
  }
}
function encryptBytes(plain, key) {
  const iv = randomBytes(IV_LEN);
  return concat(iv, gcm(key, iv).encrypt(plain));
}
function decryptBytes(blob, key) {
  if (blob.length < IV_LEN + TAG_LEN) return null;
  try {
    return gcm(key, blob.subarray(0, IV_LEN)).decrypt(blob.subarray(IV_LEN));
  } catch {
    return null;
  }
}

// src/patches/send.ts
var LOCK = "\u{1F512} ";
var BLOCK = Symbol("block");
function prepare(channelId, content) {
  if (typeof content !== "string" || content.length === 0) return null;
  if (looksEncrypted(content)) return null;
  if (!isEncryptionOn(channelId)) return null;
  const key = getSendKey(channelId);
  if (!key) {
    notify("E2EE is on for this chat but no key is set - message not sent");
    return BLOCK;
  }
  if (content.length > MAX_PLAINTEXT_LEN) {
    notify(`Too long to encrypt (${content.length}/${MAX_PLAINTEXT_LEN}) - message not sent`);
    return BLOCK;
  }
  try {
    return encryptText(content, key);
  } catch (e) {
    notify("Encryption failed - message not sent");
    console.log("[aegires-e2ee] encrypt error", e);
    return BLOCK;
  }
}
function installSendPatch() {
  const MessageActions = findFns("sendMessage", "receiveMessage");
  noteFound("sendMessage module", MessageActions);
  if (!MessageActions) {
    diag.installed["sendMessage lookup"] = "NOT FOUND";
    throw new Error("sendMessage module not found - sending is NOT encrypted");
    return () => {
    };
  }
  const undo2 = [];
  undo2.push(
    instead("sendMessage", MessageActions, (args, orig) => {
      const [channelId, message] = args;
      diag.sendCalls++;
      if (!message || typeof channelId !== "string") diag.lastSend = "hook hit but unexpected args";
      if (import_plugin2.storage.debug) {
        console.log("[aegires-e2ee] sendMessage hook hit", {
          channelId,
          hasMessage: !!message,
          contentType: typeof message?.content,
          encryptionOn: typeof channelId === "string" ? isEncryptionOn(channelId) : null,
          hasKey: typeof channelId === "string" ? !!getSendKey(channelId) : null
        });
      }
      if (message && typeof channelId === "string") {
        const out = prepare(channelId, message.content);
        diag.lastSend = `on=${isEncryptionOn(channelId)} key=${!!getSendKey(channelId)} text=${typeof message.content === "string" && message.content.length > 0} -> ${out === BLOCK ? "BLOCKED" : out === null ? "sent unchanged" : "encrypted"}`;
        if (out === BLOCK) return Promise.resolve();
        if (out !== null) message.content = out;
      }
      return orig(...args);
    })
  );
  if (typeof MessageActions.editMessage === "function") {
    undo2.push(
      instead("editMessage", MessageActions, (args, orig) => {
        const [channelId, , message] = args;
        if (message && typeof channelId === "string" && typeof message.content === "string") {
          if (message.content.startsWith(LOCK)) message.content = message.content.slice(LOCK.length);
          const out = prepare(channelId, message.content);
          if (out === BLOCK) return Promise.resolve();
          if (out !== null) message.content = out;
        }
        return orig(...args);
      })
    );
  }
  return () => undo2.forEach((u) => u());
}

// src/patches/receive.ts
var import_plugin4 = __toESM(require_plugin(), 1);

// src/crypto/files.ts
function encryptedFileName(original) {
  if (!original) return "file.enc";
  const dot = original.lastIndexOf(".");
  if (dot > 0 && dot < original.length - 1) return original.slice(0, dot) + ".enc" + original.slice(dot);
  return original + ".enc";
}
function isEncryptedFileName(name) {
  return !!name && (name.includes(".enc.") || name.endsWith(".enc"));
}
var SIZE_TAG = /^\[sz:(\d+),(\d+)\]/;
function makeSizeTag(width, height) {
  return `[sz:${Math.round(width)},${Math.round(height)}]`;
}
function splitSizeTag(body) {
  const m = SIZE_TAG.exec(body);
  if (!m) return { width: null, height: null, text: body };
  return { width: parseInt(m[1], 10), height: parseInt(m[2], 10), text: body.slice(m[0].length) };
}

// src/patches/attachments.ts
var import_plugin3 = __toESM(require_plugin(), 1);

// src/patches/attachments-util.ts
var MAX_FILE_BYTES = 8 * 1024 * 1024;
var ATT_RE = /\/attachments\/(\d+)\/(\d+)\/([^/?#]+)/;
var DROP_PARAMS = /* @__PURE__ */ new Set(["width", "height", "format", "quality", "size", "animated"]);
var MIME = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  bmp: "image/bmp",
  heic: "image/heic"
};
function parseAttachmentUrl(url) {
  const m = ATT_RE.exec(url);
  if (!m) return null;
  let filename = m[3];
  try {
    filename = decodeURIComponent(filename);
  } catch {
  }
  return { channelId: m[1], attachmentId: m[2], filename };
}
function rawCdnUrl(url) {
  const q = url.indexOf("?");
  const base = (q >= 0 ? url.slice(0, q) : url).replace(/^(https?:\/\/)media\.discordapp\.net/, "$1cdn.discordapp.com");
  if (q < 0) return base;
  const kept = url.slice(q + 1).split("&").filter((p) => p && !DROP_PARAMS.has(p.split("=")[0]));
  return kept.length ? base + "?" + kept.join("&") : base;
}
function extOf(name) {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}
function imageMimeFor(name) {
  return MIME[extOf(name)] ?? null;
}

// src/patches/attachments.ts
var log2 = (...a) => {
  if (import_plugin3.storage.debug) console.log("[aegires-e2ee:att]", ...a);
};
var sizeHints = /* @__PURE__ */ new Map();
function recordSizeHint(messageId, w, h) {
  if (!messageId || !w || !h) return;
  sizeHints.set(messageId, { w, h });
  if (sizeHints.size > 300) sizeHints.delete(sizeHints.keys().next().value);
}
function fixMessage(m) {
  if (!m || !Array.isArray(m.attachments)) return;
  for (const a of m.attachments) {
    if (!a || !isEncryptedFileName(a.filename)) continue;
    const mime = imageMimeFor(a.filename.replace(".enc", ""));
    if (!mime) continue;
    const hint = sizeHints.get(m.id);
    a.content_type = mime;
    a.width = hint?.w ?? a.width ?? 480;
    a.height = hint?.h ?? a.height ?? 360;
  }
  if (m.referenced_message) fixMessage(m.referenced_message);
}
function installMarkPatch() {
  const FluxDispatcher = findFlux();
  if (!FluxDispatcher) throw new Error("FluxDispatcher not found");
  return before("dispatch", FluxDispatcher, (args) => {
    try {
      const e = args[0];
      if (!e || typeof e !== "object") return;
      if (e.message) fixMessage(e.message);
      if (Array.isArray(e.messages)) {
        for (const m of e.messages) Array.isArray(m) ? m.forEach(fixMessage) : fixMessage(m);
      }
    } catch (err2) {
      log2("mark error", err2);
    }
  });
}
var cache = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
async function fetchBytes(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("http " + res.status);
  const buf = await res.arrayBuffer();
  if (buf.byteLength > MAX_FILE_BYTES + 64) throw new Error("too big");
  return new Uint8Array(buf);
}
function loadDecrypted(url) {
  const ref = parseAttachmentUrl(url);
  const hit = cache.get(ref.attachmentId);
  if (hit) return Promise.resolve(hit);
  const running = inflight.get(ref.attachmentId);
  if (running) return running;
  const keys = getReceiveKeys(ref.channelId);
  if (!keys.length) return Promise.reject("nokey");
  const p = (async () => {
    const blob = await fetchBytes(rawCdnUrl(url));
    for (const k of keys) {
      const plain = decryptBytes(blob, k);
      if (plain) {
        const mime = imageMimeFor(ref.filename.replace(".enc", "")) ?? "application/octet-stream";
        const uri = `data:${mime};base64,${base64Encode(plain)}`;
        cache.set(ref.attachmentId, uri);
        if (cache.size > 20) cache.delete(cache.keys().next().value);
        return uri;
      }
    }
    throw "fail";
  })().finally(() => inflight.delete(ref.attachmentId));
  inflight.set(ref.attachmentId, p);
  return p;
}
function DecryptedMedia(p) {
  const [state, setState] = React.useState(cache.get(parseAttachmentUrl(p.url).attachmentId) ?? "loading");
  React.useEffect(() => {
    let dead = false;
    if (!state.startsWith("data:")) {
      loadDecrypted(p.url).then(
        (uri) => !dead && setState(uri),
        (why) => !dead && setState(why === "nokey" ? "nokey" : "fail")
      );
    }
    return () => {
      dead = true;
    };
  }, [p.url]);
  if (state.startsWith("data:")) {
    const props = { ...p.origProps };
    if (p.where === "uri") props.uri = state;
    else if (p.where === "array") props.source = [{ ...props.source[0], uri: state }, ...props.source.slice(1)];
    else props.source = { ...props.source, uri: state };
    return React.createElement(p.orig, props);
  }
  const { View: View2, Text: Text2 } = RN;
  const label = state === "loading" ? "\u{1F512} Decrypting\u2026" : state === "nokey" ? "\u{1F512} Key missing" : "\u{1F512} Decrypt failed";
  return React.createElement(
    View2,
    { style: [p.origProps.style, { minHeight: 60, alignItems: "center", justifyContent: "center", backgroundColor: "#2b2d31", borderRadius: 8 }] },
    React.createElement(Text2, { style: { color: "#b5bac1" } }, label)
  );
}
function encInfo(props) {
  if (!props || typeof props !== "object") return null;
  const s = props.source;
  let uri, where = "";
  if (s && typeof s === "object" && !Array.isArray(s)) {
    uri = s.uri;
    where = "source";
  } else if (Array.isArray(s) && s[0] && typeof s[0] === "object") {
    uri = s[0].uri;
    where = "array";
  } else if (typeof props.uri === "string") {
    uri = props.uri;
    where = "uri";
  }
  if (typeof uri !== "string" || uri.indexOf(".enc") === -1) return null;
  const ref = parseAttachmentUrl(uri);
  return ref && isEncryptedFileName(ref.filename) ? { url: uri, where } : null;
}
function installRenderPatch() {
  const undo2 = [];
  const hook = (name, parent, isJsx) => {
    if (!parent || typeof parent[name] !== "function") return;
    undo2.push(
      before(name, parent, (args) => {
        try {
          const [type, props] = args;
          if (type === DecryptedMedia || typeof type === "string") return;
          const info = encInfo(props);
          if (!info) return;
          const origProps = isJsx ? props : args.length > 2 ? { ...props, children: args.length === 3 ? args[2] : args.slice(2) } : props;
          const next = [DecryptedMedia, { orig: type, origProps, url: info.url, where: info.where }];
          if (isJsx && args.length > 2) next.push(args[2]);
          return next;
        } catch (e) {
          log2("render hook error", e);
        }
      })
    );
  };
  const jsxRt = findFns("jsx", "jsxs");
  hook("jsx", jsxRt, true);
  hook("jsxs", jsxRt, true);
  hook("createElement", React, false);
  if (!undo2.length) throw new Error("could not hook rendering - encrypted images will not display");
  return () => undo2.forEach((u) => u());
}
var FM = globalThis.nativeModuleProxy?.DCDFileManager ?? globalThis.nativeModuleProxy?.RTNFileManager;
async function readBytes(uri) {
  const res = await fetch(uri);
  const blob = await res.blob();
  if (typeof blob.arrayBuffer === "function") return new Uint8Array(await blob.arrayBuffer());
  return await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const b = base64Decode(String(r.result).split(",")[1] ?? "");
      b ? resolve(b) : reject(new Error("decode"));
    };
    r.onerror = () => reject(new Error("read"));
    r.readAsDataURL(blob);
  });
}
async function writeTemp(bytes) {
  if (!FM || typeof FM.writeFile !== "function") throw new Error("no native file module");
  const rel = `aegires_${Date.now()}_${Math.floor(Math.random() * 1e9)}.bin`;
  const b64 = base64Encode(bytes);
  const consts = (typeof FM.getConstants === "function" ? FM.getConstants() : FM) ?? {};
  let lastErr;
  for (const [dirName, dirPath] of [["cache", consts.CacheDirPath], ["documents", consts.DocumentsDirPath]]) {
    try {
      const ret = await FM.writeFile(dirName, rel, b64, "base64");
      let path = typeof ret === "string" && ret ? ret : dirPath ? `${dirPath}/${rel}` : "";
      if (!path) continue;
      if (path.startsWith("/")) path = "file://" + path;
      return path;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr ?? new Error("write failed");
}
function imageSize(uri) {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), 3e3);
    try {
      RN.Image.getSize(uri, (w, h) => {
        clearTimeout(t);
        resolve({ w, h });
      }, () => {
        clearTimeout(t);
        resolve(null);
      });
    } catch {
      clearTimeout(t);
      resolve(null);
    }
  });
}
function descriptorOf(u) {
  for (const c of [u?.item?.file, u?.file, u?.item, u]) {
    if (c && typeof c === "object" && typeof c.uri === "string") return c;
  }
  return null;
}
function setAll(o, fields) {
  for (const [k, v] of Object.entries(fields)) {
    if (o && k in o) {
      try {
        o[k] = v;
      } catch {
      }
    }
  }
}
var pendingTag = /* @__PURE__ */ new Map();
async function encryptUpload(u, key, channelId) {
  const d = descriptorOf(u);
  if (!d) throw new Error("unknown upload shape: " + Object.keys(u ?? {}).join(","));
  const name = d.name ?? d.filename ?? u.filename ?? "file";
  const mime = d.mimeType ?? d.type ?? u.mimeType ?? "";
  const bytes = await readBytes(d.uri);
  if (bytes.length > MAX_FILE_BYTES) throw new Error("file over 8 MB");
  if (mime.startsWith("image/") || imageMimeFor(name)) {
    const s = await imageSize(d.uri);
    if (s) pendingTag.set(channelId, { tag: makeSizeTag(s.w, s.h), t: Date.now() });
  }
  const enc = encryptBytes(bytes, key);
  const tmp = await writeTemp(enc);
  const encName = encryptedFileName(name);
  const fields = { uri: tmp, name: encName, filename: encName, mimeType: "application/octet-stream", type: "application/octet-stream", contentType: "application/octet-stream" };
  setAll(d, fields);
  if (d !== u) setAll(u, { filename: encName, mimeType: "application/octet-stream" });
  if (d.uri !== tmp) throw new Error("could not swap upload uri");
  const finalName = d.name ?? d.filename ?? u.filename;
  if (finalName !== encName) throw new Error("could not swap file name");
}
function installUploadPatch() {
  const mod = findFns("uploadLocalFiles");
  if (!mod) {
    throw new Error("upload hook not found - attachments are NOT encrypted");
  }
  return instead("uploadLocalFiles", mod, (args, orig) => {
    const opts = args[0];
    let channelId = opts?.channelId ?? opts?.channel?.id;
    if (!channelId) channelId = selectedChannelId() || void 0;
    if (!channelId || !isEncryptionOn(channelId)) return orig(...args);
    const key = getSendKey(channelId);
    if (!key) {
      notify("E2EE is on but no key is set - upload cancelled");
      return Promise.resolve();
    }
    const uploads = Array.isArray(opts?.uploads) ? opts.uploads : Array.isArray(opts?.files) ? opts.files : [];
    if (!uploads.length) {
      notify("Aegires E2EE: unknown upload format - upload cancelled to stay safe");
      log2("uploadLocalFiles args", Object.keys(opts ?? {}));
      return Promise.resolve();
    }
    return (async () => {
      try {
        for (const u of uploads) await encryptUpload(u, key, channelId);
      } catch (e) {
        console.log("[aegires-e2ee] attachment encrypt failed", e);
        notify("Attachment encryption failed - upload cancelled");
        return;
      }
      return orig(...args);
    })();
  });
}
function installTagPatch() {
  const MessageActions = findFns("sendMessage", "receiveMessage");
  if (!MessageActions) throw new Error("sendMessage module not found");
  return before("sendMessage", MessageActions, (args) => {
    const [channelId, message] = args;
    const p = typeof channelId === "string" ? pendingTag.get(channelId) : void 0;
    if (!p || !message) return;
    pendingTag.delete(channelId);
    if (Date.now() - p.t > 12e4) return;
    if (typeof message.content === "string" && !looksEncrypted(message.content) && isEncryptionOn(channelId)) {
      message.content = p.tag + message.content;
    }
  });
}
var IMAGES_WORKING = false;
var PLACEHOLDER_MARK = "\u{1F512} Encrypted attachment";
function addPlaceholder(m) {
  if (!m || !Array.isArray(m.attachments)) return;
  const names = [];
  for (const a of m.attachments) {
    if (a && isEncryptedFileName(a.filename)) names.push(String(a.filename));
  }
  if (!names.length) return;
  if (typeof m.content === "string" && looksEncrypted(m.content)) return;
  const text = typeof m.content === "string" ? m.content : "";
  if (text.indexOf(PLACEHOLDER_MARK) !== -1) return;
  const note = `${PLACEHOLDER_MARK}: cannot decrypt images - image decryption is currently broken`;
  m.content = text ? `${text}
${note}` : note;
  if (m.referenced_message) addPlaceholder(m.referenced_message);
}
function installPlaceholderPatch() {
  const FluxDispatcher = findFlux();
  if (!FluxDispatcher) throw new Error("FluxDispatcher not found");
  return before("dispatch", FluxDispatcher, (args) => {
    try {
      const e = args[0];
      if (!e || typeof e !== "object") return;
      if (e.message) addPlaceholder(e.message);
      if (Array.isArray(e.messages)) {
        for (const m of e.messages) Array.isArray(m) ? m.forEach(addPlaceholder) : addPlaceholder(m);
      }
    } catch (err2) {
      log2("placeholder error", err2);
    }
  });
}
function installUploadGuard() {
  const mod = findFns("uploadLocalFiles");
  if (!mod) throw new Error("upload hook not found - uploads cannot be blocked in encrypted chats");
  return instead("uploadLocalFiles", mod, (args, orig) => {
    const opts = args[0];
    let channelId = opts?.channelId ?? opts?.channel?.id;
    if (!channelId) channelId = selectedChannelId() || void 0;
    if (channelId && isEncryptionOn(channelId)) {
      notify("Encrypted images and files are not supported yet - upload cancelled so nothing is sent unencrypted. Turn encryption off for this chat to send it normally.");
      return Promise.resolve();
    }
    return orig(...args);
  });
}
function installAttachmentPatches() {
  const unpatches = [];
  const timers2 = [];
  let stopped = false;
  const add = (name, f, retry = 2) => {
    if (stopped) return;
    try {
      unpatches.push(f());
      diag.installed["att: " + name] = "ok";
    } catch (e) {
      const msg = String(e?.message ?? e).slice(0, 80);
      diag.installed["att: " + name] = "FAILED: " + msg + (retry > 0 ? " (retrying)" : "");
      console.log(`[aegires-e2ee] ${name} failed`, e);
      if (retry > 0) timers2.push(setTimeout(() => add(name, f, retry - 1), 5e3));
    }
  };
  if (IMAGES_WORKING) {
    add("attachment marker", installMarkPatch);
    add("attachment renderer", installRenderPatch);
    add("upload patch", installUploadPatch);
    add("caption size tag", installTagPatch);
  } else {
    add("attachment placeholder", installPlaceholderPatch);
    add("upload guard", installUploadGuard);
  }
  return () => {
    stopped = true;
    timers2.forEach((t) => clearTimeout(t));
    unpatches.slice().reverse().forEach((u) => {
      try {
        u();
      } catch {
      }
    });
    cache.clear();
    inflight.clear();
    sizeHints.clear();
    pendingTag.clear();
  };
}

// src/patches/receive.ts
function tryDecrypt(content, channelId) {
  for (const key of getReceiveKeys(channelId)) {
    const plain = decryptText(content, key);
    if (plain !== null) return plain;
  }
  return null;
}
function decryptMessage(m, fallbackChannelId) {
  if (!m || typeof m !== "object") return false;
  const channelId = m.channel_id ?? m.channelId ?? fallbackChannelId;
  let changed = false;
  if (looksEncrypted(m.content)) {
    diag.encSeen++;
    const hasKeys = getReceiveKeys(channelId).length > 0;
    if (!hasKeys) diag.noKey++;
    const plain = tryDecrypt(m.content, channelId);
    if (plain !== null) {
      diag.decrypted++;
      const sp = splitSizeTag(plain);
      recordSizeHint(m.id, sp.width, sp.height);
      const text = sp.text;
      m.content = (import_plugin4.storage.showLock ? LOCK : "") + text;
      changed = true;
    } else if (hasKeys) {
      diag.wrongKey++;
    }
  }
  if (m.referenced_message && decryptMessage(m.referenced_message, channelId)) changed = true;
  return changed;
}
function handleEvent(event) {
  diag.events++;
  if (!event || typeof event !== "object") return;
  if (!event.message && !event.messages) return;
  diag.msgEvents++;
  const type = String(event.type);
  if (Object.keys(diag.types).length < 12 || diag.types[type]) diag.types[type] = (diag.types[type] ?? 0) + 1;
  if (event.message) decryptMessage(event.message, event.channelId);
  if (Array.isArray(event.messages)) {
    for (const m of event.messages) {
      if (Array.isArray(m)) m.forEach((x) => decryptMessage(x, event.channelId));
      else decryptMessage(m, event.channelId);
    }
  }
}
function installReceivePatch() {
  const FluxDispatcher = findFlux();
  noteFound("FluxDispatcher", FluxDispatcher);
  if (!FluxDispatcher || typeof FluxDispatcher.dispatch !== "function") throw new Error("FluxDispatcher.dispatch not found");
  return before("dispatch", FluxDispatcher, (args) => {
    try {
      handleEvent(args[0]);
    } catch (e) {
      console.log("[aegires-e2ee] receive error", e);
    }
  });
}

// src/commands.ts
var import_commands = __toESM(require_commands(), 1);

// src/selftest-vectors.ts
var VECTORS = [
  { label: "short ascii", password: "correct horse battery staple", plain: "hi", wire: "\xA7ocamRGm5W4ipCc79FmqVdUaOBv17qbvpUWz5dhyDTg==" },
  { label: "unicode password + emoji text", password: "p\xE4ssw\xF6rd-\u2603", plain: "unicode \u2603 \u{1F512} \xE9\xE8 \u65E5\u672C\u8A9E", wire: "\xA7wf0RLC7/vN4ti5OWwuRmAxLp22E7V4CFgKBVPAsFanD2AVFxVA29N61zleIam8r+18LVAnJfjK4jSm+S" },
  { label: "compressed (flag=1)", password: "pw", plain: "hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world ", wire: "\xA7vqxQFKct0QMhamAdB6pBenhEzb9OrTd9Z6TWUWC0oIj5hnHJ0JhnsO5YJT4r4Y2vIg==" }
];

// src/selftest.ts
async function runSelfTest() {
  const lines = [];
  let ok = true;
  const check = (pass, text) => {
    lines.push((pass ? "PASS  " : "FAIL  ") + text);
    if (!pass) ok = false;
  };
  const rng = hasSecureRandom();
  check(rng, "secure random (crypto.getRandomValues) available");
  for (const v of VECTORS) {
    try {
      const key = await deriveKey(v.password);
      const got = decryptText(v.wire, key);
      check(got === v.plain, "decrypt Aegires vector: " + v.label);
      if (rng) {
        const again = decryptText(encryptText(v.plain, key), key);
        check(again === v.plain, "encrypt+decrypt round trip: " + v.label);
      }
    } catch (e) {
      check(false, v.label + " threw: " + String(e));
    }
  }
  return { ok, lines };
}

// src/commands.ts
var choice = (v) => ({ name: v, displayName: v, value: v });
function installCommands() {
  try {
    return (0, import_commands.registerCommand)({
      name: "e2ee",
      displayName: "e2ee",
      description: "Aegires E2EE: turn encryption on/off for this chat, or show status",
      displayDescription: "Aegires E2EE: turn encryption on/off for this chat, or show status",
      applicationId: "-1",
      type: 1,
      // CHAT
      inputType: 1,
      // BUILT_IN_TEXT
      options: [
        {
          name: "action",
          displayName: "action",
          description: "on, off, status or selftest",
          displayDescription: "on, off, status or selftest",
          type: 3,
          // STRING
          required: true,
          choices: ["on", "off", "status", "selftest"].map(choice)
        }
      ],
      execute: async (args, ctx) => {
        const action = args?.find((a) => a.name === "action")?.value;
        const channelId = ctx?.channel?.id;
        if (!channelId) return notify("E2EE: no channel in context");
        if (action === "on") {
          if (!getSendKey(channelId)) return notify("Set a key in the plugin settings first");
          setChannelEnabled(channelId, true);
          return notify("E2EE ON for this chat");
        }
        if (action === "off") {
          setChannelEnabled(channelId, false);
          return notify("E2EE OFF for this chat");
        }
        if (action === "status") {
          return notify(`E2EE ${isEncryptionOn(channelId) ? "ON" : "OFF"} - key ${getSendKey(channelId) ? "set" : "missing"}`);
        }
        if (action === "selftest") {
          notify("Running self-test...");
          const r = await runSelfTest();
          return notify(r.ok ? "Self-test passed" : "Self-test FAILED - open plugin settings for details");
        }
      }
    });
  } catch (e) {
    console.log("[aegires-e2ee] could not register /e2ee (use the settings page instead)", e);
    return () => {
    };
  }
}

// src/ui/Settings.tsx
var import_plugin5 = __toESM(require_plugin(), 1);
var View = comp("View");
var Text = comp("Text");
var ScrollView = comp("ScrollView") ?? View;
var TextInput = comp("TextInput") ?? Text;
var Touch = comp("TouchableOpacity") ?? comp("Pressable") ?? comp("TouchableWithoutFeedback") ?? View;
function FallbackSwitch(props) {
  return /* @__PURE__ */ React.createElement(Touch, { onPress: () => props.onValueChange(!props.value) }, /* @__PURE__ */ React.createElement(View, { style: { backgroundColor: props.value ? C.accent : C.input, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14 } }, /* @__PURE__ */ React.createElement(Text, { style: { color: "#fff", fontWeight: "700" } }, props.value ? "ON" : "OFF")));
}
var Switch = comp("Switch") ?? FallbackSwitch;
var C = { text: "#dbdee1", muted: "#949ba4", card: "#2b2d31", input: "#1e1f22", accent: "#5865f2", danger: "#da373c" };
function Button(props) {
  return /* @__PURE__ */ React.createElement(
    Touch,
    {
      disabled: props.busy,
      onPress: props.onPress,
      style: { backgroundColor: props.danger ? C.danger : C.accent, opacity: props.busy ? 0.5 : 1, padding: 10, borderRadius: 6, marginTop: 8 }
    },
    /* @__PURE__ */ React.createElement(Text, { style: { color: "#fff", textAlign: "center", fontWeight: "600" } }, props.label)
  );
}
function Field(props) {
  return /* @__PURE__ */ React.createElement(
    TextInput,
    {
      value: props.value,
      onChangeText: props.onChange,
      placeholder: props.placeholder,
      placeholderTextColor: C.muted,
      secureTextEntry: !!props.secret,
      autoCapitalize: "none",
      autoCorrect: false,
      style: { backgroundColor: C.input, color: C.text, borderRadius: 6, padding: 10, marginTop: 8 }
    }
  );
}
function Card(props) {
  return /* @__PURE__ */ React.createElement(View, { style: { backgroundColor: C.card, borderRadius: 8, padding: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(Text, { style: { color: C.text, fontSize: 16, fontWeight: "700" } }, props.title), props.hint ? /* @__PURE__ */ React.createElement(Text, { style: { color: C.muted, marginTop: 4 } }, props.hint) : null, props.children);
}
function ToggleRow(props) {
  return /* @__PURE__ */ React.createElement(View, { style: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 } }, /* @__PURE__ */ React.createElement(Text, { style: { color: C.text, flex: 1, paddingRight: 12 } }, props.label), /* @__PURE__ */ React.createElement(Switch, { value: props.value, onValueChange: props.onChange }));
}
function currentChannelId() {
  try {
    return selectedChannelId();
  } catch {
    return "";
  }
}
function SettingsInner() {
  const [, bump] = React.useState(0);
  const refresh = () => bump((n) => n + 1);
  const [pw, setPw] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [chanId, setChanId] = React.useState(currentChannelId());
  const [chanPw, setChanPw] = React.useState("");
  const [testLines, setTestLines] = React.useState([]);
  const run = async (what, fn) => {
    setBusy(true);
    try {
      await fn();
      notify(what + " - done");
    } catch (e) {
      notify(what + " failed: " + String(e));
    } finally {
      setBusy(false);
      refresh();
    }
  };
  return /* @__PURE__ */ React.createElement(ScrollView, { style: { flex: 1 }, contentContainerStyle: { padding: 12 } }, /* @__PURE__ */ React.createElement(
    Card,
    {
      title: "Global key " + (hasGlobalKey() ? "(set)" : "(not set)"),
      hint: "Used in every chat that has no channel key. Everyone in the chat must type the SAME password, and Aegires users must use the same one in the app. The password is not saved - only the key derived from it."
    },
    /* @__PURE__ */ React.createElement(Field, { value: pw, onChange: setPw, placeholder: "Shared password", secret: true }),
    /* @__PURE__ */ React.createElement(
      Button,
      {
        label: busy ? "Deriving key..." : "Set global key",
        busy,
        onPress: () => {
          if (!pw) return notify("Password cannot be empty");
          run("Set global key", async () => {
            await setGlobalPassword(pw);
            setPw("");
          });
        }
      }
    ),
    hasGlobalKey() ? /* @__PURE__ */ React.createElement(Button, { label: "Clear global key", danger: true, onPress: () => {
      clearGlobalKey();
      notify("Global key cleared");
      refresh();
    } }) : null
  ), /* @__PURE__ */ React.createElement(Card, { title: "Behaviour" }, /* @__PURE__ */ React.createElement(ToggleRow, { label: "Encrypt outgoing messages by default (in chats without their own on/off setting)", value: !!import_plugin5.storage.encryptByDefault, onChange: (v) => {
    import_plugin5.storage.encryptByDefault = v;
    refresh();
  } }), /* @__PURE__ */ React.createElement(ToggleRow, { label: "Show a lock icon in front of decrypted messages", value: !!import_plugin5.storage.showLock, onChange: (v) => {
    import_plugin5.storage.showLock = v;
    refresh();
  } }), /* @__PURE__ */ React.createElement(ToggleRow, { label: "Debug logging", value: !!import_plugin5.storage.debug, onChange: (v) => {
    import_plugin5.storage.debug = v;
    refresh();
  } })), /* @__PURE__ */ React.createElement(Card, { title: "Per-chat key / switch", hint: "Channel ID is pre-filled with the chat you had open. Leave the password empty to only change on/off." }, /* @__PURE__ */ React.createElement(Field, { value: chanId, onChange: setChanId, placeholder: "Channel ID" }), /* @__PURE__ */ React.createElement(Field, { value: chanPw, onChange: setChanPw, placeholder: "Password for this chat only (optional)", secret: true }), /* @__PURE__ */ React.createElement(
    Button,
    {
      label: "Save for this chat",
      busy,
      onPress: () => {
        if (!/^\d+$/.test(chanId)) return notify("Channel ID must be digits only");
        run("Save chat settings", async () => {
          if (chanPw) await setChannelPassword(chanId, chanPw);
          setChannelEnabled(chanId, true);
          setChanPw("");
        });
      }
    }
  ), listChannelConfigs().map((c) => /* @__PURE__ */ React.createElement(View, { key: c.id, style: { marginTop: 12, borderTopWidth: 1, borderTopColor: C.input, paddingTop: 8 } }, /* @__PURE__ */ React.createElement(Text, { style: { color: C.text } }, c.id, c.hasKey ? "  (own key)" : ""), /* @__PURE__ */ React.createElement(ToggleRow, { label: "Encrypt outgoing here", value: c.enabled === true, onChange: (v) => {
    setChannelEnabled(c.id, v);
    refresh();
  } }), /* @__PURE__ */ React.createElement(Button, { label: "Remove", danger: true, onPress: () => {
    removeChannelConfig(c.id);
    refresh();
  } })))), /* @__PURE__ */ React.createElement(Card, { title: "Diagnostics", hint: "What the hooks are doing right now. Press Refresh after sending / receiving a message." }, /* @__PURE__ */ React.createElement(Button, { label: "Refresh", onPress: () => refresh() }), /* @__PURE__ */ React.createElement(Text, { selectable: true, style: { color: C.text, marginTop: 8, fontFamily: "monospace", fontSize: 12 } }, "global key: " + (hasGlobalKey() ? "set" : "NOT SET") + "\n" + diagLines().join("\n"))), /* @__PURE__ */ React.createElement(Card, { title: "Self-test", hint: "Run this first. It checks Discord has a secure random source and that this phone can decrypt messages made by the real Aegires code." }, /* @__PURE__ */ React.createElement(
    Button,
    {
      label: busy ? "Running..." : "Run self-test",
      busy,
      onPress: () => run("Self-test", async () => {
        const r = await runSelfTest();
        setTestLines(r.lines);
        notify(r.ok ? "Self-test passed" : "Self-test FAILED");
      })
    }
  ), testLines.map((l, i) => /* @__PURE__ */ React.createElement(Text, { key: i, style: { color: l.startsWith("PASS") ? C.text : C.danger, marginTop: 4, fontFamily: "monospace" } }, l))));
}
function Settings() {
  try {
    return SettingsInner();
  } catch (e) {
    const msg = String(e) + "\n" + String(e?.stack ?? "").slice(0, 1200) + "\n" + reactDiagnostics();
    console.log("[aegires-e2ee] settings crashed", msg);
    try {
      RN.Alert.alert("Aegires settings crashed", msg);
    } catch {
    }
    try {
      return /* @__PURE__ */ React.createElement(ScrollView, { style: { flex: 1 }, contentContainerStyle: { padding: 12 } }, /* @__PURE__ */ React.createElement(Text, { selectable: true, style: { color: C.danger } }, msg));
    } catch {
      return null;
    }
  }
}

// src/index.tsx
var undo = [];
var timers = [];
function safely(name, install2, retry = 3) {
  try {
    undo.push(install2());
    diag.installed[name] = "ok";
  } catch (e) {
    const msg = String(e?.message ?? e).slice(0, 80);
    diag.installed[name] = "FAILED: " + msg + (retry > 0 ? " (retrying)" : "");
    console.log(`[aegires-e2ee] ${name} failed to install`, e);
    if (retry > 0) timers.push(setTimeout(() => safely(name, install2, retry - 1), 4e3));
    else quiet(`${name} failed: ${msg}`);
  }
}
function unloadAll() {
  timers.forEach((t) => clearTimeout(t));
  timers = [];
  undo.slice().reverse().forEach((u) => {
    try {
      u();
    } catch (e) {
      console.log("[aegires-e2ee] unpatch error", e);
    }
  });
  undo = [];
}
var SLOT = "__aegiresE2EEUnload";
var index_default = {
  onLoad() {
    const g = globalThis;
    try {
      g[SLOT]?.();
    } catch (e) {
      console.log("[aegires-e2ee] cleanup of previous instance failed", e);
    }
    g[SLOT] = unloadAll;
    initStorage();
    try {
      diag.installed["env"] = envSummary();
    } catch {
    }
    if (!hasSecureRandom()) {
      quiet("no secure random source - encrypting is impossible. Run the self-test in settings.");
    }
    safely("send patch", installSendPatch);
    safely("receive patch", installReceivePatch);
    safely("attachment patches", installAttachmentPatches);
    safely("commands", installCommands);
  },
  onUnload() {
    unloadAll();
    const g = globalThis;
    if (g[SLOT] === unloadAll) delete g[SLOT];
  },
  settings: Settings
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ciphers/esm/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/

return module.exports;})()
