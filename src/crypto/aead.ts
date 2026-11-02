// AES-GCM with a configurable tag length (Aegires v2 uses 12/14/16-byte tags) and 128/192/256-bit
// keys. @noble/ciphers only produces full 16-byte tags, but a GCM tag of length t is simply the first
// t bytes of the full tag, so:
//   seal: encrypt normally, cut the tag down.
//   open: decrypt with CTR (counter block = nonce || 00000002, exactly what GCM uses for the first
//         data block), re-seal the plaintext and compare the truncated tag in constant time.
import { ctr, gcm } from "@noble/ciphers/aes";

export function gcmSeal(key: Uint8Array, nonce: Uint8Array, aad: Uint8Array, plain: Uint8Array, tagLen: number): Uint8Array {
  if (nonce.length !== 12) throw new Error("nonce must be 12 bytes");
  const sealed = gcm(key, nonce, aad).encrypt(plain); // ct || 16-byte tag
  return sealed.slice(0, plain.length + tagLen);
}

/** Returns the plaintext, or null if authentication fails. Never throws. */
export function gcmOpen(key: Uint8Array, nonce: Uint8Array, aad: Uint8Array, data: Uint8Array, tagLen: number): Uint8Array | null {
  try {
    if (nonce.length !== 12 || data.length < tagLen) return null;
    if (tagLen === 16) return gcm(key, nonce, aad).decrypt(data);
    const ct = data.subarray(0, data.length - tagLen);
    const tag = data.subarray(data.length - tagLen);
    const counter = new Uint8Array(16);
    counter.set(nonce, 0);
    counter[15] = 2;
    const plain = ctr(key, counter).decrypt(ct);
    const check = gcm(key, nonce, aad).encrypt(plain);
    let diff = 0;
    for (let i = 0; i < tagLen; i++) diff |= check[plain.length + i] ^ tag[i];
    return diff === 0 ? plain : null;
  } catch {
    return null;
  }
}
