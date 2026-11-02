// LEGACY (Aegires v1) key derivation - only used by the old image code and the old interop test.
// Text now uses kdf2.ts (Argon2id). Original note: identical to Aegires' old Crypto.deriveKey():
//   PBKDF2WithHmacSHA1, password as UTF-8, salt = "pwc", 15000 iterations, 256-bit key.
// This is weak by modern standards (SHA-1, static salt, few iterations) but it is what the
// Aegires app uses, and we must match it to read each other's messages. Use long random
// passphrases. See docs/GUIDE.md ("Security notes") for the proposed v2 upgrade.
import { pbkdf2Async } from "@noble/hashes/pbkdf2";
import { sha1 } from "@noble/hashes/sha1";
import { utf8Encode } from "./utf8.ts";

const SALT = utf8Encode("pwc");
const ITERATIONS = 15000;
const KEY_BYTES = 32;

/** Slow on purpose (~15000 HMAC rounds). Async so the UI thread can breathe between chunks. */
export async function deriveKey(password: string): Promise<Uint8Array> {
  return pbkdf2Async(sha1, utf8Encode(password), SALT, { c: ITERATIONS, dkLen: KEY_BYTES, asyncTick: 10 });
}

export { toHex, fromHex } from "./hex.ts";
