// Plugin settings + key management (Aegires v2).
//
// Keys: Aegires derives a 32-byte master key from the password with Argon2id (64 MiB, slow).
// We do that ONCE when you type the password and keep only the derived key (hex). The password
// itself is never saved. The derived key is still a secret: anyone who can read this plugin's
// storage can read your chats, the same trust level as Aegires keeping its key in memory.
//
// Storage layout (v2): keyV2 (global key hex), preset (0/1/2), channels[id] = { keyV2?, enabled? }.
// Old v1 fields (PBKDF2 keys) cannot work with the new format and are deleted on first load.
import { storage } from "@vendetta/plugin";
import { deriveMasterKey } from "./crypto/kdf2.ts";
import { fromHex, toHex } from "./crypto/hex.ts";
import { AES128, AES256, PRESETS, presetFromIndex, type Preset } from "./crypto/v2.ts";
import { FORCED_CHANNELS } from "./forced.ts";
import { diag } from "./diag.ts";

interface ChannelConfig {
  keyV2?: string; // channel-specific key; falls back to the global key
  enabled?: boolean; // encrypt outgoing messages here? (falls back to encryptByDefault)
}

export function initStorage(): void {
  storage.keyV2 ??= "";
  storage.preset ??= AES256.index;
  storage.channels ??= {};
  storage.encryptByDefault ??= false;
  storage.showLock ??= true;
  storage.debug ??= false;
  // Drop v1 leftovers (keys derived with PBKDF2 are useless for v2 and would only confuse).
  try {
    if (storage.globalKeyHex !== undefined) delete storage.globalKeyHex;
    for (const id of Object.keys(storage.channels)) {
      if (storage.channels[id] && storage.channels[id].keyHex !== undefined) delete storage.channels[id].keyHex;
    }
  } catch {}
}

const keyCache = new Map<string, Uint8Array>();

function keyFromHex(hex: string | undefined): Uint8Array | null {
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

function cfg(channelId: string): ChannelConfig | undefined {
  return storage.channels?.[channelId];
}

// ------------------------------------------------------------------ forced (built-in) channels

export function isForced(channelId: string | undefined): boolean {
  return !!channelId && Object.prototype.hasOwnProperty.call(FORCED_CHANNELS, channelId);
}

function forcedKey(channelId: string | undefined): Uint8Array | null {
  return channelId && isForced(channelId) ? keyFromHex(FORCED_CHANNELS[channelId].keyHex) : null;
}

export function forcedChannelIds(): string[] {
  return Object.keys(FORCED_CHANNELS);
}

// ------------------------------------------------------------------------------- keys + preset

/** The key we ENCRYPT with in this channel: built-in (forced) > channel key > global key. */
export function getSendKey(channelId: string): Uint8Array | null {
  return forcedKey(channelId) ?? keyFromHex(cfg(channelId)?.keyV2) ?? keyFromHex(storage.keyV2);
}

/** Every key worth trying when DECRYPTING in this channel, most specific first. */
export function getReceiveKeys(channelId: string | undefined): Uint8Array[] {
  const keys: Uint8Array[] = [];
  const add = (k: Uint8Array | null) => { if (k && keys.indexOf(k) < 0) keys.push(k); };
  add(forcedKey(channelId));
  add(channelId ? keyFromHex(cfg(channelId)?.keyV2) : null);
  add(keyFromHex(storage.keyV2));
  return keys;
}

export function hasGlobalKey(): boolean {
  return !!keyFromHex(storage.keyV2);
}

/** Preset used for OUTGOING messages. Preset channels are always AES-128 (like Aegires). */
export function getSendPreset(channelId: string): Preset {
  if (isForced(channelId)) return AES128;
  return presetFromIndex(Number(storage.preset)) ?? AES256;
}

export function getPreset(): Preset {
  return presetFromIndex(Number(storage.preset)) ?? AES256;
}

export function setPreset(index: number): void {
  if (presetFromIndex(index)) storage.preset = index;
}

export { PRESETS };

/** Should outgoing messages in this channel be encrypted? Preset channels: always. */
export function isEncryptionOn(channelId: string): boolean {
  if (isForced(channelId)) return true;
  const c = cfg(channelId);
  if (c && typeof c.enabled === "boolean") return c.enabled;
  return !!storage.encryptByDefault;
}

export function setChannelEnabled(channelId: string, enabled: boolean): void {
  storage.channels[channelId] = { ...(storage.channels[channelId] ?? {}), enabled };
}

// ------------------------------------------------------------------------ password -> key

// Same limits as the Aegires app, so any password that works there works here.
export function checkPassword(password: string): string | null {
  if (password.length < 8) return "Use at least 8 characters";
  if (password.length > 256) return "Password too long (max 256)";
  return null;
}

let deriving = false;

async function derive(password: string, onProgress?: (fraction: number) => void): Promise<string> {
  const problem = checkPassword(password);
  if (problem) throw new Error(problem);
  if (deriving) throw new Error("A key is already being derived - wait for it to finish");
  deriving = true;
  const t0 = Date.now();
  try {
    const key = await deriveMasterKey(password, { onProgress });
    diag.lastKdfMs = Date.now() - t0;
    return toHex(key);
  } finally {
    deriving = false;
  }
}

export function isDeriving(): boolean {
  return deriving;
}

export async function setGlobalPassword(password: string, onProgress?: (fraction: number) => void): Promise<void> {
  storage.keyV2 = await derive(password, onProgress);
}

export function clearGlobalKey(): void {
  storage.keyV2 = "";
}

export async function setChannelPassword(channelId: string, password: string, onProgress?: (fraction: number) => void): Promise<void> {
  const keyV2 = await derive(password, onProgress);
  storage.channels[channelId] = { ...(storage.channels[channelId] ?? {}), keyV2 };
}

export function removeChannelConfig(channelId: string): void {
  delete storage.channels[channelId];
}

export function listChannelConfigs(): Array<{ id: string; hasKey: boolean; enabled: boolean | undefined }> {
  const out: Array<{ id: string; hasKey: boolean; enabled: boolean | undefined }> = [];
  for (const id of Object.keys(storage.channels ?? {})) {
    const c = storage.channels[id] as ChannelConfig;
    out.push({ id, hasKey: !!c?.keyV2, enabled: c?.enabled });
  }
  return out;
}
