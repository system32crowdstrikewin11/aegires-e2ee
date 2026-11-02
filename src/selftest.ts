// On-device self-test (plugin settings > Self-test). It proves, on THIS phone's JS engine, that
// everything the Aegires v2 format needs gives the same bytes as the reference implementation:
// secure random, BigInt (used by Argon2), AES-128/192/256 + short GCM tags, HKDF, file chunks,
// and Argon2id itself (small-memory vectors; use "Measure key derivation" for the real 64 MiB run).
import { decryptFile, decryptMessage, encryptFile, encryptMessage, messagePreset, presetFromIndex } from "./crypto/v2.ts";
import { deriveMasterKey } from "./crypto/kdf2.ts";
import { fromHex, toHex } from "./crypto/hex.ts";
import { hasSecureRandom } from "./crypto/random.ts";
import { CHANNEL_ID, FILE, KDF, MASTER_HEX, MESSAGES, SENDER_ID } from "./selftest-vectors.ts";

export async function runSelfTest(): Promise<{ ok: boolean; lines: string[] }> {
  const lines: string[] = [];
  let ok = true;
  const check = (pass: boolean, text: string) => {
    lines.push((pass ? "PASS  " : "FAIL  ") + text);
    if (!pass) ok = false;
  };

  const rng = hasSecureRandom();
  check(rng, "secure random (crypto.getRandomValues) available");
  check(typeof (globalThis as any).BigInt === "function", "BigInt available (needed for Argon2id)");

  const master = fromHex(MASTER_HEX)!;
  for (const v of MESSAGES) {
    try {
      check(decryptMessage(v.wire, master, CHANNEL_ID, SENDER_ID) === v.plain, "decrypt vector: " + v.label);
      check(messagePreset(v.wire)?.index === v.preset, "preset detected from header: " + v.label);
      check(decryptMessage(v.wire, master, CHANNEL_ID, "999") === null, "wrong sender rejected: " + v.label);
      if (rng) {
        const p = presetFromIndex(v.preset)!;
        const again = decryptMessage(encryptMessage(v.plain, master, p, CHANNEL_ID, SENDER_ID), master, CHANNEL_ID, SENDER_ID);
        check(again === v.plain, "encrypt + decrypt round trip: " + v.label);
      }
    } catch (e) {
      check(false, v.label + " threw: " + String(e));
    }
  }

  try {
    const got = decryptFile(fromHex(FILE.wireHex)!, master, CHANNEL_ID, SENDER_ID);
    check(!!got && toHex(got) === FILE.plainHex, "decrypt file vector: " + FILE.label);
    if (rng) {
      const big = new Uint8Array(70000).map((_, i) => (i * 31) & 255);
      const back = decryptFile(encryptFile(big, master, presetFromIndex(2)!, CHANNEL_ID, SENDER_ID), master, CHANNEL_ID, SENDER_ID);
      check(!!back && back.length === big.length && toHex(back.subarray(65530, 65545)) === toHex(big.subarray(65530, 65545)), "file round trip across a chunk boundary (70000 B)");
    }
  } catch (e) {
    check(false, "file test threw: " + String(e));
  }

  for (const v of KDF) {
    try {
      const t0 = Date.now();
      const key = await deriveMasterKey(v.password, { context: v.context ?? undefined, memoryKiB: v.memoryKiB });
      check(toHex(key) === v.key, `Argon2id vector: ${v.label} (${Date.now() - t0} ms)`);
    } catch (e) {
      check(false, `Argon2id ${v.label} threw: ${String(e)}`);
    }
  }
  return { ok, lines };
}

/** Real-size derivation (64 MiB, 3 passes) so you can see how long a key takes on this phone. */
export async function measureKdf(onProgress?: (fraction: number) => void): Promise<number> {
  const t0 = Date.now();
  await deriveMasterKey("benchmark-password", { onProgress });
  return Date.now() - t0;
}
