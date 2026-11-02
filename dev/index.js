(function(){var module={exports:{}};var exports=module.exports;
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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

// node_modules/@noble/hashes/esm/_u64.js
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var U32_MASK64, _32n, rotrSH, rotrSL, rotrBH, rotrBL, rotr32H, rotr32L, add3L, add3H;
var init_u64 = __esm({
  "node_modules/@noble/hashes/esm/_u64.js"() {
    U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    _32n = /* @__PURE__ */ BigInt(32);
    rotrSH = (h, l, s) => h >>> s | l << 32 - s;
    rotrSL = (h, l, s) => h << 32 - s | l >>> s;
    rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
    rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
    rotr32H = (_h, l) => l;
    rotr32L = (h, _l) => h;
    add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  }
});

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
function u8(arr) {
  return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
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
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function createOptHasher(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}
var isLE, swap8IfBE, swap32IfBE, nextTick, Hash;
var init_utils = __esm({
  "node_modules/@noble/hashes/esm/utils.js"() {
    isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    swap8IfBE = isLE ? (n) => n : (n) => byteSwap(n);
    swap32IfBE = isLE ? (u) => u : byteSwap32;
    nextTick = async () => {
    };
    Hash = class {
    };
  }
});

// node_modules/@noble/hashes/esm/_blake.js
var BSIGMA;
var init_blake = __esm({
  "node_modules/@noble/hashes/esm/_blake.js"() {
    BSIGMA = /* @__PURE__ */ Uint8Array.from([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9,
      12,
      5,
      1,
      15,
      14,
      13,
      4,
      10,
      0,
      7,
      6,
      3,
      9,
      2,
      8,
      11,
      13,
      11,
      7,
      14,
      12,
      1,
      3,
      9,
      5,
      0,
      15,
      4,
      8,
      6,
      2,
      10,
      6,
      15,
      14,
      9,
      11,
      3,
      0,
      8,
      12,
      2,
      13,
      7,
      1,
      4,
      10,
      5,
      10,
      2,
      8,
      4,
      7,
      6,
      1,
      5,
      15,
      11,
      9,
      14,
      3,
      12,
      13,
      0,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      // Blake1, unused in others
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9
    ]);
  }
});

// node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE3 ? 4 : 0;
  const l = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE3);
  view.setUint32(byteOffset + l, wl, isLE3);
}
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD, SHA256_IV;
var init_md = __esm({
  "node_modules/@noble/hashes/esm/_md.js"() {
    init_utils();
    HashMD = class extends Hash {
      constructor(blockLen, outputLen, padOffset, isLE3) {
        super();
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE3;
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
        const { buffer, view, blockLen, isLE: isLE3 } = this;
        let { pos } = this;
        buffer[pos++] = 128;
        clean(this.buffer.subarray(pos));
        if (this.padOffset > blockLen - pos) {
          this.process(view, 0);
          pos = 0;
        }
        for (let i = pos; i < blockLen; i++)
          buffer[i] = 0;
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE3);
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
          oview.setUint32(4 * i, state[i], isLE3);
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
    SHA256_IV = /* @__PURE__ */ Uint32Array.from([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
  }
});

// node_modules/@noble/hashes/esm/blake2.js
function G1b(a, b, c, d, msg, x) {
  const Xl = msg[x], Xh = msg[x + 1];
  let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
  let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
  let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
  let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
  let ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotr32H(Dh, Dl), Dl: rotr32L(Dh, Dl) });
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrSH(Bh, Bl, 24), Bl: rotrSL(Bh, Bl, 24) });
  BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
  BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
  BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
  BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}
function G2b(a, b, c, d, msg, x) {
  const Xl = msg[x], Xh = msg[x + 1];
  let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
  let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
  let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
  let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
  let ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotrSH(Dh, Dl, 16), Dl: rotrSL(Dh, Dl, 16) });
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrBH(Bh, Bl, 63), Bl: rotrBL(Bh, Bl, 63) });
  BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
  BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
  BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
  BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}
function checkBlake2Opts(outputLen, opts = {}, keyLen, saltLen, persLen) {
  anumber(keyLen);
  if (outputLen < 0 || outputLen > keyLen)
    throw new Error("outputLen bigger than keyLen");
  const { key, salt, personalization } = opts;
  if (key !== void 0 && (key.length < 1 || key.length > keyLen))
    throw new Error("key length must be undefined or 1.." + keyLen);
  if (salt !== void 0 && salt.length !== saltLen)
    throw new Error("salt must be undefined or " + saltLen);
  if (personalization !== void 0 && personalization.length !== persLen)
    throw new Error("personalization must be undefined or " + persLen);
}
var B2B_IV, BBUF, BLAKE2, BLAKE2b, blake2b;
var init_blake2 = __esm({
  "node_modules/@noble/hashes/esm/blake2.js"() {
    init_blake();
    init_u64();
    init_utils();
    B2B_IV = /* @__PURE__ */ Uint32Array.from([
      4089235720,
      1779033703,
      2227873595,
      3144134277,
      4271175723,
      1013904242,
      1595750129,
      2773480762,
      2917565137,
      1359893119,
      725511199,
      2600822924,
      4215389547,
      528734635,
      327033209,
      1541459225
    ]);
    BBUF = /* @__PURE__ */ new Uint32Array(32);
    BLAKE2 = class extends Hash {
      constructor(blockLen, outputLen) {
        super();
        this.finished = false;
        this.destroyed = false;
        this.length = 0;
        this.pos = 0;
        anumber(blockLen);
        anumber(outputLen);
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.buffer = new Uint8Array(blockLen);
        this.buffer32 = u32(this.buffer);
      }
      update(data) {
        aexists(this);
        data = toBytes(data);
        abytes(data);
        const { blockLen, buffer, buffer32 } = this;
        const len = data.length;
        const offset = data.byteOffset;
        const buf = data.buffer;
        for (let pos = 0; pos < len; ) {
          if (this.pos === blockLen) {
            swap32IfBE(buffer32);
            this.compress(buffer32, 0, false);
            swap32IfBE(buffer32);
            this.pos = 0;
          }
          const take = Math.min(blockLen - this.pos, len - pos);
          const dataOffset = offset + pos;
          if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
            const data32 = new Uint32Array(buf, dataOffset, Math.floor((len - pos) / 4));
            swap32IfBE(data32);
            for (let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
              this.length += blockLen;
              this.compress(data32, pos32, false);
            }
            swap32IfBE(data32);
            continue;
          }
          buffer.set(data.subarray(pos, pos + take), this.pos);
          this.pos += take;
          this.length += take;
          pos += take;
        }
        return this;
      }
      digestInto(out) {
        aexists(this);
        aoutput(out, this);
        const { pos, buffer32 } = this;
        this.finished = true;
        clean(this.buffer.subarray(pos));
        swap32IfBE(buffer32);
        this.compress(buffer32, 0, true);
        swap32IfBE(buffer32);
        const out32 = u32(out);
        this.get().forEach((v, i) => out32[i] = swap8IfBE(v));
      }
      digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
      }
      _cloneInto(to) {
        const { buffer, length, finished, destroyed, outputLen, pos } = this;
        to || (to = new this.constructor({ dkLen: outputLen }));
        to.set(...this.get());
        to.buffer.set(buffer);
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        to.outputLen = outputLen;
        return to;
      }
      clone() {
        return this._cloneInto();
      }
    };
    BLAKE2b = class extends BLAKE2 {
      constructor(opts = {}) {
        const olen = opts.dkLen === void 0 ? 64 : opts.dkLen;
        super(128, olen);
        this.v0l = B2B_IV[0] | 0;
        this.v0h = B2B_IV[1] | 0;
        this.v1l = B2B_IV[2] | 0;
        this.v1h = B2B_IV[3] | 0;
        this.v2l = B2B_IV[4] | 0;
        this.v2h = B2B_IV[5] | 0;
        this.v3l = B2B_IV[6] | 0;
        this.v3h = B2B_IV[7] | 0;
        this.v4l = B2B_IV[8] | 0;
        this.v4h = B2B_IV[9] | 0;
        this.v5l = B2B_IV[10] | 0;
        this.v5h = B2B_IV[11] | 0;
        this.v6l = B2B_IV[12] | 0;
        this.v6h = B2B_IV[13] | 0;
        this.v7l = B2B_IV[14] | 0;
        this.v7h = B2B_IV[15] | 0;
        checkBlake2Opts(olen, opts, 64, 16, 16);
        let { key, personalization, salt } = opts;
        let keyLength = 0;
        if (key !== void 0) {
          key = toBytes(key);
          keyLength = key.length;
        }
        this.v0l ^= this.outputLen | keyLength << 8 | 1 << 16 | 1 << 24;
        if (salt !== void 0) {
          salt = toBytes(salt);
          const slt = u32(salt);
          this.v4l ^= swap8IfBE(slt[0]);
          this.v4h ^= swap8IfBE(slt[1]);
          this.v5l ^= swap8IfBE(slt[2]);
          this.v5h ^= swap8IfBE(slt[3]);
        }
        if (personalization !== void 0) {
          personalization = toBytes(personalization);
          const pers = u32(personalization);
          this.v6l ^= swap8IfBE(pers[0]);
          this.v6h ^= swap8IfBE(pers[1]);
          this.v7l ^= swap8IfBE(pers[2]);
          this.v7h ^= swap8IfBE(pers[3]);
        }
        if (key !== void 0) {
          const tmp = new Uint8Array(this.blockLen);
          tmp.set(key);
          this.update(tmp);
        }
      }
      // prettier-ignore
      get() {
        let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
        return [v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h];
      }
      // prettier-ignore
      set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
        this.v0l = v0l | 0;
        this.v0h = v0h | 0;
        this.v1l = v1l | 0;
        this.v1h = v1h | 0;
        this.v2l = v2l | 0;
        this.v2h = v2h | 0;
        this.v3l = v3l | 0;
        this.v3h = v3h | 0;
        this.v4l = v4l | 0;
        this.v4h = v4h | 0;
        this.v5l = v5l | 0;
        this.v5h = v5h | 0;
        this.v6l = v6l | 0;
        this.v6h = v6h | 0;
        this.v7l = v7l | 0;
        this.v7h = v7h | 0;
      }
      compress(msg, offset, isLast) {
        this.get().forEach((v, i) => BBUF[i] = v);
        BBUF.set(B2B_IV, 16);
        let { h, l } = fromBig(BigInt(this.length));
        BBUF[24] = B2B_IV[8] ^ l;
        BBUF[25] = B2B_IV[9] ^ h;
        if (isLast) {
          BBUF[28] = ~BBUF[28];
          BBUF[29] = ~BBUF[29];
        }
        let j = 0;
        const s = BSIGMA;
        for (let i = 0; i < 12; i++) {
          G1b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
          G2b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
          G1b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
          G2b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
          G1b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
          G2b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
          G1b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
          G2b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
          G1b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
          G2b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
          G1b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
          G2b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
          G1b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
          G2b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
          G1b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
          G2b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
        }
        this.v0l ^= BBUF[0] ^ BBUF[16];
        this.v0h ^= BBUF[1] ^ BBUF[17];
        this.v1l ^= BBUF[2] ^ BBUF[18];
        this.v1h ^= BBUF[3] ^ BBUF[19];
        this.v2l ^= BBUF[4] ^ BBUF[20];
        this.v2h ^= BBUF[5] ^ BBUF[21];
        this.v3l ^= BBUF[6] ^ BBUF[22];
        this.v3h ^= BBUF[7] ^ BBUF[23];
        this.v4l ^= BBUF[8] ^ BBUF[24];
        this.v4h ^= BBUF[9] ^ BBUF[25];
        this.v5l ^= BBUF[10] ^ BBUF[26];
        this.v5h ^= BBUF[11] ^ BBUF[27];
        this.v6l ^= BBUF[12] ^ BBUF[28];
        this.v6h ^= BBUF[13] ^ BBUF[29];
        this.v7l ^= BBUF[14] ^ BBUF[30];
        this.v7h ^= BBUF[15] ^ BBUF[31];
        clean(BBUF);
      }
      destroy() {
        this.destroyed = true;
        clean(this.buffer32);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    };
    blake2b = /* @__PURE__ */ createOptHasher((opts) => new BLAKE2b(opts));
  }
});

// node_modules/@noble/hashes/esm/argon2.js
var argon2_exports = {};
__export(argon2_exports, {
  argon2d: () => argon2d,
  argon2dAsync: () => argon2dAsync,
  argon2i: () => argon2i,
  argon2iAsync: () => argon2iAsync,
  argon2id: () => argon2id,
  argon2idAsync: () => argon2idAsync
});
function mul(a, b) {
  const aL = a & 65535;
  const aH = a >>> 16;
  const bL = b & 65535;
  const bH = b >>> 16;
  const ll = Math.imul(aL, bL);
  const hl = Math.imul(aH, bL);
  const lh = Math.imul(aL, bH);
  const hh = Math.imul(aH, bH);
  const carry = (ll >>> 16) + (hl & 65535) + lh;
  const high = hh + (hl >>> 16) + (carry >>> 16) | 0;
  const low = carry << 16 | ll & 65535;
  return { h: high, l: low };
}
function mul2(a, b) {
  const { h, l } = mul(a, b);
  return { h: (h << 1 | l >>> 31) & 4294967295, l: l << 1 & 4294967295 };
}
function blamka(Ah, Al, Bh, Bl) {
  const { h: Ch, l: Cl } = mul2(Al, Bl);
  const Rll = add3L(Al, Bl, Cl);
  return { h: add3H(Rll, Ah, Bh, Ch), l: Rll | 0 };
}
function G(a, b, c, d) {
  let Al = A2_BUF[2 * a], Ah = A2_BUF[2 * a + 1];
  let Bl = A2_BUF[2 * b], Bh = A2_BUF[2 * b + 1];
  let Cl = A2_BUF[2 * c], Ch = A2_BUF[2 * c + 1];
  let Dl = A2_BUF[2 * d], Dh = A2_BUF[2 * d + 1];
  ({ h: Ah, l: Al } = blamka(Ah, Al, Bh, Bl));
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotr32H(Dh, Dl), Dl: rotr32L(Dh, Dl) });
  ({ h: Ch, l: Cl } = blamka(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrSH(Bh, Bl, 24), Bl: rotrSL(Bh, Bl, 24) });
  ({ h: Ah, l: Al } = blamka(Ah, Al, Bh, Bl));
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotrSH(Dh, Dl, 16), Dl: rotrSL(Dh, Dl, 16) });
  ({ h: Ch, l: Cl } = blamka(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrBH(Bh, Bl, 63), Bl: rotrBL(Bh, Bl, 63) });
  A2_BUF[2 * a] = Al, A2_BUF[2 * a + 1] = Ah;
  A2_BUF[2 * b] = Bl, A2_BUF[2 * b + 1] = Bh;
  A2_BUF[2 * c] = Cl, A2_BUF[2 * c + 1] = Ch;
  A2_BUF[2 * d] = Dl, A2_BUF[2 * d + 1] = Dh;
}
function P(v00, v01, v02, v03, v04, v05, v06, v07, v08, v09, v10, v11, v12, v13, v14, v15) {
  G(v00, v04, v08, v12);
  G(v01, v05, v09, v13);
  G(v02, v06, v10, v14);
  G(v03, v07, v11, v15);
  G(v00, v05, v10, v15);
  G(v01, v06, v11, v12);
  G(v02, v07, v08, v13);
  G(v03, v04, v09, v14);
}
function block(x, xPos, yPos, outPos, needXor) {
  for (let i = 0; i < 256; i++)
    A2_BUF[i] = x[xPos + i] ^ x[yPos + i];
  for (let i = 0; i < 128; i += 16) {
    P(i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9, i + 10, i + 11, i + 12, i + 13, i + 14, i + 15);
  }
  for (let i = 0; i < 16; i += 2) {
    P(i, i + 1, i + 16, i + 17, i + 32, i + 33, i + 48, i + 49, i + 64, i + 65, i + 80, i + 81, i + 96, i + 97, i + 112, i + 113);
  }
  if (needXor)
    for (let i = 0; i < 256; i++)
      x[outPos + i] ^= A2_BUF[i] ^ x[xPos + i] ^ x[yPos + i];
  else
    for (let i = 0; i < 256; i++)
      x[outPos + i] = A2_BUF[i] ^ x[xPos + i] ^ x[yPos + i];
  clean(A2_BUF);
}
function Hp(A, dkLen) {
  const A8 = u8(A);
  const T = new Uint32Array(1);
  const T8 = u8(T);
  T[0] = dkLen;
  if (dkLen <= 64)
    return blake2b.create({ dkLen }).update(T8).update(A8).digest();
  const out = new Uint8Array(dkLen);
  let V = blake2b.create({}).update(T8).update(A8).digest();
  let pos = 0;
  out.set(V.subarray(0, 32));
  pos += 32;
  for (; dkLen - pos > 64; pos += 32) {
    const Vh = blake2b.create({}).update(V);
    Vh.digestInto(V);
    Vh.destroy();
    out.set(V.subarray(0, 32), pos);
  }
  out.set(blake2b(V, { dkLen: dkLen - pos }), pos);
  clean(V, T);
  return u32(out);
}
function indexAlpha(r, s, laneLen, segmentLen, index, randL, sameLane = false) {
  let area;
  if (r === 0) {
    if (s === 0)
      area = index - 1;
    else if (sameLane)
      area = s * segmentLen + index - 1;
    else
      area = s * segmentLen + (index == 0 ? -1 : 0);
  } else if (sameLane)
    area = laneLen - segmentLen + index - 1;
  else
    area = laneLen - segmentLen + (index == 0 ? -1 : 0);
  const startPos = r !== 0 && s !== ARGON2_SYNC_POINTS - 1 ? (s + 1) * segmentLen : 0;
  const rel = area - 1 - mul(area, mul(randL, randL).h).h;
  return (startPos + rel) % laneLen;
}
function isU32(num) {
  return Number.isSafeInteger(num) && num >= 0 && num < maxUint32;
}
function argon2Opts(opts) {
  const merged = {
    version: 19,
    dkLen: 32,
    maxmem: maxUint32 - 1,
    asyncTick: 10
  };
  for (let [k, v] of Object.entries(opts))
    if (v != null)
      merged[k] = v;
  const { dkLen, p, m, t, version, onProgress } = merged;
  if (!isU32(dkLen) || dkLen < 4)
    throw new Error("dkLen should be at least 4 bytes");
  if (!isU32(p) || p < 1 || p >= Math.pow(2, 24))
    throw new Error("p should be 1 <= p < 2^24");
  if (!isU32(m))
    throw new Error("m should be 0 <= m < 2^32");
  if (!isU32(t) || t < 1)
    throw new Error("t (iterations) should be 1 <= t < 2^32");
  if (onProgress !== void 0 && typeof onProgress !== "function")
    throw new Error("progressCb should be function");
  if (!isU32(m) || m < 8 * p)
    throw new Error("memory should be at least 8*p bytes");
  if (version !== 16 && version !== 19)
    throw new Error("unknown version=" + version);
  return merged;
}
function argon2Init(password, salt, type, opts) {
  password = kdfInputToBytes(password);
  salt = kdfInputToBytes(salt);
  abytes(password);
  abytes(salt);
  if (!isU32(password.length))
    throw new Error("password should be less than 4 GB");
  if (!isU32(salt.length) || salt.length < 8)
    throw new Error("salt should be at least 8 bytes and less than 4 GB");
  if (!Object.values(AT).includes(type))
    throw new Error("invalid type");
  let { p, dkLen, m, t, version, key, personalization, maxmem, onProgress, asyncTick } = argon2Opts(opts);
  key = abytesOrZero(key);
  personalization = abytesOrZero(personalization);
  const h = blake2b.create({});
  const BUF = new Uint32Array(1);
  const BUF8 = u8(BUF);
  for (let item of [p, dkLen, m, t, version, type]) {
    BUF[0] = item;
    h.update(BUF8);
  }
  for (let i of [password, salt, key, personalization]) {
    BUF[0] = i.length;
    h.update(BUF8).update(i);
  }
  const H0 = new Uint32Array(18);
  const H0_8 = u8(H0);
  h.digestInto(H0_8);
  const lanes = p;
  const mP = 4 * p * Math.floor(m / (ARGON2_SYNC_POINTS * p));
  const laneLen = Math.floor(mP / p);
  const segmentLen = Math.floor(laneLen / ARGON2_SYNC_POINTS);
  const memUsed = mP * 256;
  if (!isU32(maxmem) || memUsed > maxmem)
    throw new Error("mem should be less than 2**32, got: maxmem=" + maxmem + ", memused=" + memUsed);
  const B = new Uint32Array(memUsed);
  for (let l = 0; l < p; l++) {
    const i = 256 * laneLen * l;
    H0[17] = l;
    H0[16] = 0;
    B.set(Hp(H0, 1024), i);
    H0[16] = 1;
    B.set(Hp(H0, 1024), i + 256);
  }
  let perBlock = () => {
  };
  if (onProgress) {
    const totalBlock = t * ARGON2_SYNC_POINTS * p * segmentLen;
    const callbackPer = Math.max(Math.floor(totalBlock / 1e4), 1);
    let blockCnt = 0;
    perBlock = () => {
      blockCnt++;
      if (onProgress && (!(blockCnt % callbackPer) || blockCnt === totalBlock))
        onProgress(blockCnt / totalBlock);
    };
  }
  clean(BUF, H0);
  return { type, mP, p, t, version, B, laneLen, lanes, segmentLen, dkLen, perBlock, asyncTick };
}
function argon2Output(B, p, laneLen, dkLen) {
  const B_final = new Uint32Array(256);
  for (let l = 0; l < p; l++)
    for (let j = 0; j < 256; j++)
      B_final[j] ^= B[256 * (laneLen * l + laneLen - 1) + j];
  const res = u8(Hp(B_final, dkLen));
  clean(B_final);
  return res;
}
function processBlock(B, address, l, r, s, index, laneLen, segmentLen, lanes, offset, prev, dataIndependent, needXor) {
  if (offset % laneLen)
    prev = offset - 1;
  let randL, randH;
  if (dataIndependent) {
    let i128 = index % 128;
    if (i128 === 0) {
      address[256 + 12]++;
      block(address, 256, 2 * 256, 0, false);
      block(address, 0, 2 * 256, 0, false);
    }
    randL = address[2 * i128];
    randH = address[2 * i128 + 1];
  } else {
    const T = 256 * prev;
    randL = B[T];
    randH = B[T + 1];
  }
  const refLane = r === 0 && s === 0 ? l : randH % lanes;
  const refPos = indexAlpha(r, s, laneLen, segmentLen, index, randL, refLane == l);
  const refBlock = laneLen * refLane + refPos;
  block(B, 256 * prev, 256 * refBlock, offset * 256, needXor);
}
function argon2(type, password, salt, opts) {
  const { mP, p, t, version, B, laneLen, lanes, segmentLen, dkLen, perBlock } = argon2Init(password, salt, type, opts);
  const address = new Uint32Array(3 * 256);
  address[256 + 6] = mP;
  address[256 + 8] = t;
  address[256 + 10] = type;
  for (let r = 0; r < t; r++) {
    const needXor = r !== 0 && version === 19;
    address[256 + 0] = r;
    for (let s = 0; s < ARGON2_SYNC_POINTS; s++) {
      address[256 + 4] = s;
      const dataIndependent = type == AT.Argon2i || type == AT.Argon2id && r === 0 && s < 2;
      for (let l = 0; l < p; l++) {
        address[256 + 2] = l;
        address[256 + 12] = 0;
        let startPos = 0;
        if (r === 0 && s === 0) {
          startPos = 2;
          if (dataIndependent) {
            address[256 + 12]++;
            block(address, 256, 2 * 256, 0, false);
            block(address, 0, 2 * 256, 0, false);
          }
        }
        let offset = l * laneLen + s * segmentLen + startPos;
        let prev = offset % laneLen ? offset - 1 : offset + laneLen - 1;
        for (let index = startPos; index < segmentLen; index++, offset++, prev++) {
          perBlock();
          processBlock(B, address, l, r, s, index, laneLen, segmentLen, lanes, offset, prev, dataIndependent, needXor);
        }
      }
    }
  }
  clean(address);
  return argon2Output(B, p, laneLen, dkLen);
}
async function argon2Async(type, password, salt, opts) {
  const { mP, p, t, version, B, laneLen, lanes, segmentLen, dkLen, perBlock, asyncTick } = argon2Init(password, salt, type, opts);
  const address = new Uint32Array(3 * 256);
  address[256 + 6] = mP;
  address[256 + 8] = t;
  address[256 + 10] = type;
  let ts = Date.now();
  for (let r = 0; r < t; r++) {
    const needXor = r !== 0 && version === 19;
    address[256 + 0] = r;
    for (let s = 0; s < ARGON2_SYNC_POINTS; s++) {
      address[256 + 4] = s;
      const dataIndependent = type == AT.Argon2i || type == AT.Argon2id && r === 0 && s < 2;
      for (let l = 0; l < p; l++) {
        address[256 + 2] = l;
        address[256 + 12] = 0;
        let startPos = 0;
        if (r === 0 && s === 0) {
          startPos = 2;
          if (dataIndependent) {
            address[256 + 12]++;
            block(address, 256, 2 * 256, 0, false);
            block(address, 0, 2 * 256, 0, false);
          }
        }
        let offset = l * laneLen + s * segmentLen + startPos;
        let prev = offset % laneLen ? offset - 1 : offset + laneLen - 1;
        for (let index = startPos; index < segmentLen; index++, offset++, prev++) {
          perBlock();
          processBlock(B, address, l, r, s, index, laneLen, segmentLen, lanes, offset, prev, dataIndependent, needXor);
          const diff = Date.now() - ts;
          if (!(diff >= 0 && diff < asyncTick)) {
            await nextTick();
            ts += diff;
          }
        }
      }
    }
  }
  clean(address);
  return argon2Output(B, p, laneLen, dkLen);
}
var AT, ARGON2_SYNC_POINTS, abytesOrZero, A2_BUF, maxUint32, argon2d, argon2i, argon2id, argon2dAsync, argon2iAsync, argon2idAsync;
var init_argon2 = __esm({
  "node_modules/@noble/hashes/esm/argon2.js"() {
    init_u64();
    init_blake2();
    init_utils();
    AT = { Argond2d: 0, Argon2i: 1, Argon2id: 2 };
    ARGON2_SYNC_POINTS = 4;
    abytesOrZero = (buf) => {
      if (buf === void 0)
        return Uint8Array.of();
      return kdfInputToBytes(buf);
    };
    A2_BUF = new Uint32Array(256);
    maxUint32 = Math.pow(2, 32);
    argon2d = (password, salt, opts) => argon2(AT.Argond2d, password, salt, opts);
    argon2i = (password, salt, opts) => argon2(AT.Argon2i, password, salt, opts);
    argon2id = (password, salt, opts) => argon2(AT.Argon2id, password, salt, opts);
    argon2dAsync = (password, salt, opts) => argon2Async(AT.Argond2d, password, salt, opts);
    argon2iAsync = (password, salt, opts) => argon2Async(AT.Argon2i, password, salt, opts);
    argon2idAsync = (password, salt, opts) => argon2Async(AT.Argon2id, password, salt, opts);
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

// src/crypto/kdf2.ts
var ARGON_T = 3;
var ARGON_M_KIB = 64 * 1024;
var MASTER_LEN = 32;
var USER_KEY_SALT = "dcenc2|user-key|v1";
function normalize(password) {
  try {
    return password.normalize("NFKC");
  } catch {
    return password;
  }
}
async function deriveMasterKey(password, opts = {}) {
  if (!password) throw new Error("empty password");
  const salt = utf8Encode(opts.context === void 0 ? USER_KEY_SALT : "dcenc2|ctx|" + opts.context);
  const { argon2idAsync: argon2idAsync2 } = await Promise.resolve().then(() => (init_argon2(), argon2_exports));
  return argon2idAsync2(utf8Encode(normalize(password)), salt, {
    t: ARGON_T,
    m: opts.memoryKiB ?? ARGON_M_KIB,
    p: 1,
    dkLen: MASTER_LEN,
    asyncTick: 10,
    // yield to the event loop every ~10 ms so Discord's UI stays alive
    onProgress: opts.onProgress
  });
}

// src/crypto/hex.ts
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

// node_modules/@noble/hashes/esm/hmac.js
init_utils();
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

// node_modules/@noble/hashes/esm/hkdf.js
init_utils();
function extract(hash, ikm, salt) {
  ahash(hash);
  if (salt === void 0)
    salt = new Uint8Array(hash.outputLen);
  return hmac(hash, toBytes(salt), toBytes(ikm));
}
var HKDF_COUNTER = /* @__PURE__ */ Uint8Array.from([0]);
var EMPTY_BUFFER = /* @__PURE__ */ Uint8Array.of();
function expand(hash, prk, info2, length = 32) {
  ahash(hash);
  anumber(length);
  const olen = hash.outputLen;
  if (length > 255 * olen)
    throw new Error("Length should be <= 255*HashLen");
  const blocks = Math.ceil(length / olen);
  if (info2 === void 0)
    info2 = EMPTY_BUFFER;
  const okm = new Uint8Array(blocks * olen);
  const HMAC2 = hmac.create(hash, prk);
  const HMACTmp = HMAC2._cloneInto();
  const T = new Uint8Array(HMAC2.outputLen);
  for (let counter = 0; counter < blocks; counter++) {
    HKDF_COUNTER[0] = counter + 1;
    HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info2).update(HKDF_COUNTER).digestInto(T);
    okm.set(T, olen * counter);
    HMAC2._cloneInto(HMACTmp);
  }
  HMAC2.destroy();
  HMACTmp.destroy();
  clean(T, HKDF_COUNTER);
  return okm.slice(0, length);
}
var hkdf = (hash, ikm, salt, info2, length) => expand(hash, extract(hash, ikm, salt), info2, length);

// node_modules/@noble/hashes/esm/sha2.js
init_md();
init_utils();
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A, B, C: C2, D, E, F, G: G2, H } = this;
    return [A, B, C2, D, E, F, G2, H];
  }
  // prettier-ignore
  set(A, B, C2, D, E, F, G2, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C2 | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G2 | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C: C2, D, E, F, G: G2, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G2) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C2) | 0;
      H = G2;
      G2 = F;
      F = E;
      E = D + T1 | 0;
      D = C2;
      C2 = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C2 = C2 + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G2 = G2 + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C2, D, E, F, G2, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var sha256 = /* @__PURE__ */ createHasher(() => new SHA256());

// node_modules/@noble/hashes/esm/sha256.js
var sha2562 = sha256;

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
function u82(arr) {
  return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u322(arr) {
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
var isLE2 = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
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
function overlapBytes(a, b) {
  return a.buffer === b.buffer && // best we can do, may fail with an obscure Proxy
  a.byteOffset < b.byteOffset + b.byteLength && // a starts before b end
  b.byteOffset < a.byteOffset + a.byteLength;
}
function complexOverlapBytes(input, output) {
  if (overlapBytes(input, output) && input.byteOffset < output.byteOffset)
    throw new Error("complex overlap of input and output is not supported");
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
    if (!isLE2)
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
function setBigUint642(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE3 ? 4 : 0;
  const l = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE3);
  view.setUint32(byteOffset + l, wl, isLE3);
}
function u64Lengths(dataLength, aadLength, isLE3) {
  abool(isLE3);
  const num = new Uint8Array(16);
  const view = createView2(num);
  setBigUint642(view, 0, BigInt(aadLength), isLE3);
  setBigUint642(view, 8, BigInt(dataLength), isLE3);
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
var ZEROS32 = u322(ZEROS16);
var POLY = 225;
var mul22 = (s0, s1, s2, s3) => {
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
      ({ s0: k0, s1: k1, s2: k2, s3: k3 } = mul22(k0, k1, k2, k3));
    }
    const W = estimateWindow(expectedLength || 1024);
    if (![1, 2, 4, 8].includes(W))
      throw new Error("ghash: invalid window size, expected 2, 4 or 8");
    this.W = W;
    const bits = 128;
    const windows = bits / W;
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
    const b32 = u322(data);
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
    const o32 = u322(out);
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
    const b32 = u322(data);
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
    const o32 = u322(out);
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
function mul23(n) {
  return n << 1 ^ POLY2 & -(n >> 7);
}
function mul3(a, b) {
  let res = 0;
  for (; b > 0; b >>= 1) {
    res ^= a & -(b & 1);
    a = mul23(a);
  }
  return res;
}
var sbox = /* @__PURE__ */ (() => {
  const t = new Uint8Array(256);
  for (let i = 0, x = 1; i < 256; i++, x ^= mul23(x))
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
var tableEncoding = /* @__PURE__ */ genTtable(sbox, (s) => mul3(s, 3) << 24 | s << 16 | s << 8 | mul3(s, 2));
var xPowers = /* @__PURE__ */ (() => {
  const p = new Uint8Array(16);
  for (let i = 0, x = 1; i < 16; i++, x = mul23(x))
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
  const k32 = u322(key);
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
function ctrCounter(xk, nonce, src, dst) {
  abytes2(nonce, BLOCK_SIZE2);
  abytes2(src);
  const srcLen = src.length;
  dst = getOutput(srcLen, dst);
  complexOverlapBytes(src, dst);
  const ctr2 = nonce;
  const c32 = u322(ctr2);
  let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
  const src32 = u322(src);
  const dst32 = u322(dst);
  for (let i = 0; i + 4 <= src32.length; i += 4) {
    dst32[i + 0] = src32[i + 0] ^ s0;
    dst32[i + 1] = src32[i + 1] ^ s1;
    dst32[i + 2] = src32[i + 2] ^ s2;
    dst32[i + 3] = src32[i + 3] ^ s3;
    let carry = 1;
    for (let i2 = ctr2.length - 1; i2 >= 0; i2--) {
      carry = carry + (ctr2[i2] & 255) | 0;
      ctr2[i2] = carry & 255;
      carry >>>= 8;
    }
    ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
  }
  const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
  if (start < srcLen) {
    const b32 = new Uint32Array([s0, s1, s2, s3]);
    const buf = u82(b32);
    for (let i = start, pos = 0; i < srcLen; i++, pos++)
      dst[i] = src[i] ^ buf[pos];
    clean2(b32);
  }
  return dst;
}
function ctr32(xk, isLE3, nonce, src, dst) {
  abytes2(nonce, BLOCK_SIZE2);
  abytes2(src);
  dst = getOutput(src.length, dst);
  const ctr2 = nonce;
  const c32 = u322(ctr2);
  const view = createView2(ctr2);
  const src32 = u322(src);
  const dst32 = u322(dst);
  const ctrPos = isLE3 ? 0 : 12;
  const srcLen = src.length;
  let ctrNum = view.getUint32(ctrPos, isLE3);
  let { s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]);
  for (let i = 0; i + 4 <= src32.length; i += 4) {
    dst32[i + 0] = src32[i + 0] ^ s0;
    dst32[i + 1] = src32[i + 1] ^ s1;
    dst32[i + 2] = src32[i + 2] ^ s2;
    dst32[i + 3] = src32[i + 3] ^ s3;
    ctrNum = ctrNum + 1 >>> 0;
    view.setUint32(ctrPos, ctrNum, isLE3);
    ({ s0, s1, s2, s3 } = encrypt(xk, c32[0], c32[1], c32[2], c32[3]));
  }
  const start = BLOCK_SIZE2 * Math.floor(src32.length / BLOCK_SIZE32);
  if (start < srcLen) {
    const b32 = new Uint32Array([s0, s1, s2, s3]);
    const buf = u82(b32);
    for (let i = start, pos = 0; i < srcLen; i++, pos++)
      dst[i] = src[i] ^ buf[pos];
    clean2(b32);
  }
  return dst;
}
var ctr = /* @__PURE__ */ wrapCipher({ blockSize: 16, nonceLength: 16 }, function aesctr(key, nonce) {
  function processCtr(buf, dst) {
    abytes2(buf);
    if (dst !== void 0) {
      abytes2(dst);
      if (!isAligned32(dst))
        throw new Error("unaligned destination");
    }
    const xk = expandKeyLE(key);
    const n = copyBytes(nonce);
    const toClean = [xk, n];
    if (!isAligned32(buf))
      toClean.push(buf = copyBytes(buf));
    const out = ctrCounter(xk, n, buf, dst);
    clean2(...toClean);
    return out;
  }
  return {
    encrypt: (plaintext, dst) => processCtr(plaintext, dst),
    decrypt: (ciphertext, dst) => processCtr(ciphertext, dst)
  };
});
function computeTag(fn, isLE3, key, data, AAD) {
  const aadLength = AAD ? AAD.length : 0;
  const h = fn.create(key, data.length + aadLength);
  if (AAD)
    h.update(AAD);
  const num = u64Lengths(8 * data.length, 8 * aadLength, isLE3);
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

// src/crypto/aead.ts
function gcmSeal(key, nonce, aad, plain, tagLen) {
  if (nonce.length !== 12) throw new Error("nonce must be 12 bytes");
  const sealed = gcm(key, nonce, aad).encrypt(plain);
  return sealed.slice(0, plain.length + tagLen);
}
function gcmOpen(key, nonce, aad, data, tagLen) {
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

// src/crypto/base64.ts
var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var LOOKUP = {};
for (let i = 0; i < ALPHABET.length; i++) LOOKUP[ALPHABET[i]] = i;
function base64Encode(bytes, pad = true) {
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i];
    const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
    out += ALPHABET[a >> 2];
    out += ALPHABET[(a & 3) << 4 | b >> 4];
    out += i + 1 < bytes.length ? ALPHABET[(b & 15) << 2 | c >> 6] : pad ? "=" : "";
    out += i + 2 < bytes.length ? ALPHABET[c & 63] : pad ? "=" : "";
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

// src/crypto/v2.ts
var AES128 = { index: 0, label: "AES-128-GCM", keyBytes: 16, tagBytes: 12, padBlock: 16 };
var AES192 = { index: 1, label: "AES-192-GCM", keyBytes: 24, tagBytes: 14, padBlock: 32 };
var AES256 = { index: 2, label: "AES-256-GCM", keyBytes: 32, tagBytes: 16, padBlock: 64 };
var PRESETS = [AES128, AES192, AES256];
function presetFromIndex(i) {
  for (const p of PRESETS) if (p.index === i) return p;
  return null;
}
var PREFIX = "\xA7";
var DISCORD_CONTENT_LIMIT = 2e3;
var VERSION_MESSAGE = 2;
var VERSION_FILE = 3;
var SALT_LEN = 16;
var NONCE_LEN = 12;
var FILE_CHUNK = 64 * 1024;
var FILE_PREFIX_LEN = 7;
function looksEncrypted(s) {
  return typeof s === "string" && s.startsWith(PREFIX);
}
function maxRawBytesForChars(chars) {
  let n = Math.floor(chars * 3 / 4) + 1;
  while (Math.floor((4 * n + 2) / 3) > chars) n--;
  return n;
}
function maxPlaintextBytes(p) {
  const raw = maxRawBytesForChars(DISCORD_CONTENT_LIMIT - PREFIX.length);
  const payloadCap = raw - 1 - SALT_LEN - p.tagBytes;
  return Math.floor(payloadCap / p.padBlock) * p.padBlock - 1;
}
function utf8Length(s) {
  return utf8Encode(s).length;
}
function concat(...parts) {
  let n = 0;
  for (const p of parts) n += p.length;
  const out = new Uint8Array(n);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}
function info(kind, preset, channelId, senderId) {
  const label = utf8Encode("dcenc2/" + kind);
  const ch = utf8Encode(channelId);
  const se = utf8Encode(senderId);
  return concat(
    label,
    Uint8Array.of(preset.index),
    Uint8Array.of(ch.length >>> 8 & 255, ch.length & 255),
    ch,
    Uint8Array.of(se.length >>> 8 & 255, se.length & 255),
    se
  );
}
function aadOf(header, salt, inf) {
  return concat(Uint8Array.of(header), salt, inf);
}
function chunkNonce(prefix, counter, last) {
  const n = new Uint8Array(NONCE_LEN);
  n.set(prefix, 0);
  n[7] = counter >>> 24 & 255;
  n[8] = counter >>> 16 & 255;
  n[9] = counter >>> 8 & 255;
  n[10] = counter & 255;
  n[11] = last ? 1 : 0;
  return n;
}
function encryptMessage(plain, master, preset, channelId, senderId) {
  if (!channelId || !senderId) throw new Error("channel/sender id missing");
  const data = utf8Encode(plain);
  const max = maxPlaintextBytes(preset);
  if (data.length > max) throw new Error(`message too long for ${preset.label}: ${data.length} > ${max} bytes`);
  const padded = Math.ceil((data.length + 1) / preset.padBlock) * preset.padBlock;
  const payload = new Uint8Array(padded);
  payload.set(data, 0);
  payload[data.length] = 128;
  const header = VERSION_MESSAGE << 4 | preset.index;
  const salt = randomBytes(SALT_LEN);
  const inf = info("msg", preset, channelId, senderId);
  const okm = hkdf(sha2562, master, salt, inf, preset.keyBytes + NONCE_LEN);
  const ct = gcmSeal(okm.subarray(0, preset.keyBytes), okm.subarray(preset.keyBytes), aadOf(header, salt, inf), payload, preset.tagBytes);
  return PREFIX + base64Encode(concat(Uint8Array.of(header), salt, ct), false);
}
function decryptMessage(wire, master, channelId, senderId) {
  try {
    if (!looksEncrypted(wire) || !master || !channelId || !senderId) return null;
    const raw = base64Decode(wire.slice(PREFIX.length));
    if (!raw || raw.length < 1 + SALT_LEN + 1) return null;
    const header = raw[0];
    if (header >> 4 !== VERSION_MESSAGE) return null;
    const preset = presetFromIndex(header & 15);
    if (!preset) return null;
    const ctLen = raw.length - 1 - SALT_LEN;
    if (ctLen < preset.tagBytes + preset.padBlock || (ctLen - preset.tagBytes) % preset.padBlock !== 0) return null;
    const salt = raw.subarray(1, 1 + SALT_LEN);
    const inf = info("msg", preset, channelId, senderId);
    const okm = hkdf(sha2562, master, salt, inf, preset.keyBytes + NONCE_LEN);
    const payload = gcmOpen(okm.subarray(0, preset.keyBytes), okm.subarray(preset.keyBytes), aadOf(header, salt, inf), raw.subarray(1 + SALT_LEN), preset.tagBytes);
    if (!payload) return null;
    let end = payload.length;
    while (end > 0 && payload[end - 1] === 0) end--;
    if (end === 0 || payload[end - 1] !== 128) return null;
    return utf8Decode(payload.subarray(0, end - 1));
  } catch {
    return null;
  }
}
function messagePreset(wire) {
  try {
    if (!looksEncrypted(wire)) return null;
    const raw = base64Decode(wire.slice(PREFIX.length, PREFIX.length + 4));
    if (!raw || raw.length < 1 || raw[0] >> 4 !== VERSION_MESSAGE) return null;
    return presetFromIndex(raw[0] & 15);
  } catch {
    return null;
  }
}
function encryptFile(plain, master, preset, channelId, senderId) {
  if (!channelId || !senderId) throw new Error("channel/sender id missing");
  const header = VERSION_FILE << 4 | preset.index;
  const salt = randomBytes(SALT_LEN);
  const inf = info("file", preset, channelId, senderId);
  const okm = hkdf(sha2562, master, salt, inf, preset.keyBytes + FILE_PREFIX_LEN);
  const key = okm.subarray(0, preset.keyBytes);
  const noncePrefix = okm.subarray(preset.keyBytes);
  const aad = aadOf(header, salt, inf);
  const chunks = Math.max(1, Math.ceil(plain.length / FILE_CHUNK));
  const out = new Uint8Array(1 + SALT_LEN + plain.length + chunks * preset.tagBytes);
  out[0] = header;
  out.set(salt, 1);
  let o = 1 + SALT_LEN;
  for (let c = 0; c < chunks; c++) {
    const part = plain.subarray(c * FILE_CHUNK, Math.min(plain.length, (c + 1) * FILE_CHUNK));
    const sealed = gcmSeal(key, chunkNonce(noncePrefix, c, c === chunks - 1), aad, part, preset.tagBytes);
    out.set(sealed, o);
    o += sealed.length;
  }
  return out;
}
function decryptFile(wire, master, channelId, senderId) {
  try {
    if (!wire || wire.length < 1 + SALT_LEN || !master || !channelId || !senderId) return null;
    const header = wire[0];
    if (header >> 4 !== VERSION_FILE) return null;
    const preset = presetFromIndex(header & 15);
    if (!preset) return null;
    const salt = wire.subarray(1, 1 + SALT_LEN);
    const inf = info("file", preset, channelId, senderId);
    const okm = hkdf(sha2562, master, salt, inf, preset.keyBytes + FILE_PREFIX_LEN);
    const key = okm.subarray(0, preset.keyBytes);
    const noncePrefix = okm.subarray(preset.keyBytes);
    const aad = aadOf(header, salt, inf);
    const body = wire.subarray(1 + SALT_LEN);
    const chunkCt = FILE_CHUNK + preset.tagBytes;
    if (body.length < preset.tagBytes) return null;
    const chunks = Math.ceil(body.length / chunkCt);
    const parts = [];
    for (let c = 0; c < chunks; c++) {
      const piece = body.subarray(c * chunkCt, Math.min(body.length, (c + 1) * chunkCt));
      const plain = gcmOpen(key, chunkNonce(noncePrefix, c, c === chunks - 1), aad, piece, preset.tagBytes);
      if (!plain) return null;
      parts.push(plain);
    }
    return concat(...parts);
  } catch {
    return null;
  }
}

// src/forced.ts
var FORCED_CHANNELS = {
  "1562876012675465326": { keyHex: "7d5b536cb362f4fb58f9be5c472b5a6967b29eae7f27c469f862bdbdad490234" }
};

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
  noAuthor: 0,
  // encrypted message but we could not tell who wrote it (author id is part of the key)
  wrongKey: 0,
  // wrong key, wrong channel/author, or not a v2 message
  sendCalls: 0,
  lastSend: "(no send seen yet)",
  lastKdfMs: 0
  // how long the last Argon2id derivation took
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
    `no author id: ${diag.noAuthor}`,
    `wrong key / not v2: ${diag.wrongKey}`,
    `sendMessage calls: ${diag.sendCalls}`,
    `last send: ${diag.lastSend}`,
    `last key derivation: ${diag.lastKdfMs ? (diag.lastKdfMs / 1e3).toFixed(1) + " s" : "never run"}`
  ];
}

// src/state.ts
function initStorage() {
  var _a, _b, _c, _d, _e, _f;
  (_a = import_plugin.storage).keyV2 ?? (_a.keyV2 = "");
  (_b = import_plugin.storage).preset ?? (_b.preset = AES256.index);
  (_c = import_plugin.storage).channels ?? (_c.channels = {});
  (_d = import_plugin.storage).encryptByDefault ?? (_d.encryptByDefault = false);
  (_e = import_plugin.storage).showLock ?? (_e.showLock = true);
  (_f = import_plugin.storage).debug ?? (_f.debug = false);
  try {
    if (import_plugin.storage.globalKeyHex !== void 0) delete import_plugin.storage.globalKeyHex;
    for (const id of Object.keys(import_plugin.storage.channels)) {
      if (import_plugin.storage.channels[id] && import_plugin.storage.channels[id].keyHex !== void 0) delete import_plugin.storage.channels[id].keyHex;
    }
  } catch {
  }
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
function isForced(channelId) {
  return !!channelId && Object.prototype.hasOwnProperty.call(FORCED_CHANNELS, channelId);
}
function forcedKey(channelId) {
  return channelId && isForced(channelId) ? keyFromHex(FORCED_CHANNELS[channelId].keyHex) : null;
}
function forcedChannelIds() {
  return Object.keys(FORCED_CHANNELS);
}
function getSendKey(channelId) {
  return forcedKey(channelId) ?? keyFromHex(cfg(channelId)?.keyV2) ?? keyFromHex(import_plugin.storage.keyV2);
}
function getReceiveKeys(channelId) {
  const keys = [];
  const add2 = (k) => {
    if (k && keys.indexOf(k) < 0) keys.push(k);
  };
  add2(forcedKey(channelId));
  add2(channelId ? keyFromHex(cfg(channelId)?.keyV2) : null);
  add2(keyFromHex(import_plugin.storage.keyV2));
  return keys;
}
function hasGlobalKey() {
  return !!keyFromHex(import_plugin.storage.keyV2);
}
function getSendPreset(channelId) {
  if (isForced(channelId)) return AES128;
  return presetFromIndex(Number(import_plugin.storage.preset)) ?? AES256;
}
function getPreset() {
  return presetFromIndex(Number(import_plugin.storage.preset)) ?? AES256;
}
function setPreset(index) {
  if (presetFromIndex(index)) import_plugin.storage.preset = index;
}
function isEncryptionOn(channelId) {
  if (isForced(channelId)) return true;
  const c = cfg(channelId);
  if (c && typeof c.enabled === "boolean") return c.enabled;
  return !!import_plugin.storage.encryptByDefault;
}
function setChannelEnabled(channelId, enabled) {
  import_plugin.storage.channels[channelId] = { ...import_plugin.storage.channels[channelId] ?? {}, enabled };
}
function checkPassword(password) {
  if (password.length < 8) return "Use at least 8 characters";
  if (password.length > 256) return "Password too long (max 256)";
  return null;
}
var deriving = false;
async function derive(password, onProgress) {
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
async function setGlobalPassword(password, onProgress) {
  import_plugin.storage.keyV2 = await derive(password, onProgress);
}
function clearGlobalKey() {
  import_plugin.storage.keyV2 = "";
}
async function setChannelPassword(channelId, password, onProgress) {
  const keyV2 = await derive(password, onProgress);
  import_plugin.storage.channels[channelId] = { ...import_plugin.storage.channels[channelId] ?? {}, keyV2 };
}
function removeChannelConfig(channelId) {
  delete import_plugin.storage.channels[channelId];
}
function listChannelConfigs() {
  const out = [];
  for (const id of Object.keys(import_plugin.storage.channels ?? {})) {
    const c = import_plugin.storage.channels[id];
    out.push({ id, hasKey: !!c?.keyV2, enabled: c?.enabled });
  }
  return out;
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

// src/self.ts
var cached = "";
var lastLookup = 0;
function noteSelfId(id) {
  if ((typeof id === "string" || typeof id === "number") && /^\d{5,25}$/.test(String(id))) cached = String(id);
}
function getSelfId() {
  if (cached) return cached;
  const now = Date.now();
  if (now - lastLookup < 3e3) return null;
  lastLookup = now;
  try {
    const store = findFns("getCurrentUser", "getUser");
    noteSelfId(store?.getCurrentUser?.()?.id);
  } catch {
  }
  return cached || null;
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
  const self = getSelfId();
  if (!self) {
    notify("E2EE: could not find your Discord user id yet - message not sent. Try again in a moment.");
    return BLOCK;
  }
  const preset = getSendPreset(channelId);
  const max = maxPlaintextBytes(preset);
  const len = utf8Length(content);
  if (len > max) {
    notify(`Too long to encrypt with ${preset.label} (${len}/${max} bytes) - message not sent`);
    return BLOCK;
  }
  try {
    return encryptMessage(content, key, preset, channelId, self);
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
        diag.lastSend = `on=${isEncryptionOn(channelId)} key=${!!getSendKey(channelId)} self=${!!getSelfId()} text=${typeof message.content === "string" && message.content.length > 0} -> ${out === BLOCK ? "BLOCKED" : out === null ? "sent unchanged" : "encrypted"}`;
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

// src/crypto/wire.ts
var PREFIX2 = "\xA7";
var IV_LEN = 12;
var TAG_LEN = 16;
var MAX_INFLATED_BYTES = 1 << 20;
function looksEncrypted2(s) {
  return typeof s === "string" && s.startsWith(PREFIX2);
}
function concat2(a, b) {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}
function encryptBytes(plain, key) {
  const iv = randomBytes(IV_LEN);
  return concat2(iv, gcm(key, iv).encrypt(plain));
}
function decryptBytes(blob, key) {
  if (blob.length < IV_LEN + TAG_LEN) return null;
  try {
    return gcm(key, blob.subarray(0, IV_LEN)).decrypt(blob.subarray(IV_LEN));
  } catch {
    return null;
  }
}

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
    } catch (err) {
      log2("mark error", err);
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
          const info2 = encInfo(props);
          if (!info2) return;
          const origProps = isJsx ? props : args.length > 2 ? { ...props, children: args.length === 3 ? args[2] : args.slice(2) } : props;
          const next = [DecryptedMedia, { orig: type, origProps, url: info2.url, where: info2.where }];
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
    if (typeof message.content === "string" && !looksEncrypted2(message.content) && isEncryptionOn(channelId)) {
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
  if (typeof m.content === "string" && looksEncrypted2(m.content)) return;
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
    } catch (err) {
      log2("placeholder error", err);
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
  const add2 = (name, f, retry = 2) => {
    if (stopped) return;
    try {
      unpatches.push(f());
      diag.installed["att: " + name] = "ok";
    } catch (e) {
      const msg = String(e?.message ?? e).slice(0, 80);
      diag.installed["att: " + name] = "FAILED: " + msg + (retry > 0 ? " (retrying)" : "");
      console.log(`[aegires-e2ee] ${name} failed`, e);
      if (retry > 0) timers2.push(setTimeout(() => add2(name, f, retry - 1), 5e3));
    }
  };
  if (IMAGES_WORKING) {
    add2("attachment marker", installMarkPatch);
    add2("attachment renderer", installRenderPatch);
    add2("upload patch", installUploadPatch);
    add2("caption size tag", installTagPatch);
  } else {
    add2("attachment placeholder", installPlaceholderPatch);
    add2("upload guard", installUploadGuard);
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
var authorById = /* @__PURE__ */ new Map();
function rememberAuthor(m) {
  if (!m?.id || !m.author?.id) return;
  authorById.set(String(m.id), String(m.author.id));
  if (authorById.size > 4e3) {
    const first = authorById.keys().next().value;
    if (first !== void 0) authorById.delete(first);
  }
}
function tryDecrypt(content, channelId, authorId, keys) {
  for (const key of keys) {
    const plain = decryptMessage(content, key, channelId, authorId);
    if (plain !== null) return plain;
  }
  return null;
}
function decryptMessage2(m, fallbackChannelId) {
  if (!m || typeof m !== "object") return false;
  rememberAuthor(m);
  const channelId = m.channel_id ?? m.channelId ?? fallbackChannelId;
  const authorId = m.author?.id ?? (m.id ? authorById.get(String(m.id)) : void 0);
  let changed = false;
  if (looksEncrypted(m.content)) {
    diag.encSeen++;
    const keys = getReceiveKeys(channelId);
    if (keys.length === 0) {
      diag.noKey++;
    } else if (!channelId || !authorId) {
      diag.noAuthor++;
    } else {
      const plain = tryDecrypt(m.content, channelId, authorId, keys);
      if (plain !== null) {
        diag.decrypted++;
        const sp = splitSizeTag(plain);
        recordSizeHint(m.id, sp.width, sp.height);
        m.content = (import_plugin4.storage.showLock ? LOCK : "") + sp.text;
        changed = true;
      } else {
        diag.wrongKey++;
      }
    }
  }
  if (m.referenced_message && decryptMessage2(m.referenced_message, channelId)) changed = true;
  return changed;
}
function handleEvent(event) {
  diag.events++;
  if (!event || typeof event !== "object") return;
  if (event.type === "CONNECTION_OPEN" || event.type === "CURRENT_USER_UPDATE") noteSelfId(event.user?.id);
  if (!event.message && !event.messages) return;
  diag.msgEvents++;
  const type = String(event.type);
  if (Object.keys(diag.types).length < 12 || diag.types[type]) diag.types[type] = (diag.types[type] ?? 0) + 1;
  if (event.message) decryptMessage2(event.message, event.channelId);
  if (Array.isArray(event.messages)) {
    for (const m of event.messages) {
      if (Array.isArray(m)) m.forEach((x) => decryptMessage2(x, event.channelId));
      else decryptMessage2(m, event.channelId);
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
var MASTER_HEX = "030a11181f262d343b424950575e656c737a81888f969da4abb2b9c0c7ced5dc";
var CHANNEL_ID = "1562876012675465326";
var SENDER_ID = "123456789012345678";
var MESSAGES = [
  {
    "label": "AES-128 ascii",
    "preset": 0,
    "plain": "hello from AES-128",
    "wire": "\xA7IDJHMNzXCLfevk1EL8IPxuypgy3A/jlifUf7arWGw7I+kDRXKmt6/fUqiDTBMjOadTsZfCb8PFsT4ALS/A"
  },
  {
    "label": "AES-192 unicode",
    "preset": 1,
    "plain": "unicode \u2603 \u{1F512} \xE9\xE8 \u65E5\u672C\u8A9E \u2014 AES-192",
    "wire": "\xA7IRU8K7cs933vdV6TaLvr8Bn2qCJQhxyb69uPSl9vRx13UZY1I8LIh8cWbSoVCCDc2LIAh+GVUfl6LGKGAlr1BYUH2cgBjHgb1+lWntOaDg2h/ZTA2okF0h47GZIO8LI"
  },
  {
    "label": "AES-256 long",
    "preset": 2,
    "plain": "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. ",
    "wire": "\xA7IvTJMZgvxaexkTiKurdWSSvotfad2eNgrs0Z2U61VuFE8DA4Db4wXEPTMZJngJlo+LygTMUFqqEOUVDaqeY42YGFHd164dxAbsmxh8HT/vI3GNUsF7huH8AaUaeYC6J17h5Hb8XDyEsefxYqLd4WlF8lSXHkUmvr48kqWqGkqDj0kBLUDsviGLW97KN1jmPSSouQk2hHdCwzYp1C3oWAMemf/3utE8LAmT3eBxaXb4GCwHoKAN8f+15O67XVXGZOjBp1bZ0ei0P+hKXbTykAZigyq7HlmPxHK/GIctw1vtlaQt6EiMRM6QOtfgxsBdhRp5JTx3ClFry+QU9n63F8yR5Afta58b7I7Y1I/YmqRzrYFSL4AipJMrg2Bq6YZNaLKaICJTKzSKjskODlP2Umpm42l8gWr68hyYmQcRFyvL452kOY/RAEQqE5jzI84dpN53fbqQ5ObILQYp8OzJak2jIcJ5jpAXRIb4FpJ1BUTfIh+QEs+39aFK3Hr49ayk0AICR4Qoaj999kcSNc+rWrwc103yhjwRHz5nr+L+3zzO7e"
  }
];
var FILE = { label: "AES-192 file, 100 bytes", plainHex: "05121f2c394653606d7a8794a1aebbc8d5e2effc091623303d4a5764717e8b98a5b2bfccd9e6f3000d1a2734414e5b6875828f9ca9b6c3d0ddeaf704111e2b3845525f6c798693a0adbac7d4e1eefb0815222f3c495663707d8a97a4b1becbd8e5f2ff0c", wireHex: "3191f03dd477dc9388b4144f7246ec30d74b495a21aab8fc13a68831a78bb14b8a5a520e46ce02168dc1dcc4db5057f19069bab0e894cd87b75aecbff970ebc7cd56a18e488b515a8440747b60c02f5f8e125ee0c5b1f39b89ac6471f21f965391d538d47344aec7262365377ade40a8a9b66e4f0f779e301e48f6949a13fcaa62e5ae" };
var KDF = [
  {
    "label": "user key (m=1024)",
    "password": "p\xE4ssw\xF6rd-\u2603",
    "context": null,
    "memoryKiB": 1024,
    "key": "86de5171ab770d7b78491b5dd481ef65f6faec8a4bbb58a1fd248d63a72e75da"
  },
  {
    "label": "context key (m=1024)",
    "password": "mojoen",
    "context": "forced|1562876012675465326",
    "memoryKiB": 1024,
    "key": "4f8baab668752855578fde73ba50ed82111fae979b58f1933056810fc1b97cab"
  }
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
  check(typeof globalThis.BigInt === "function", "BigInt available (needed for Argon2id)");
  const master = fromHex(MASTER_HEX);
  for (const v of MESSAGES) {
    try {
      check(decryptMessage(v.wire, master, CHANNEL_ID, SENDER_ID) === v.plain, "decrypt vector: " + v.label);
      check(messagePreset(v.wire)?.index === v.preset, "preset detected from header: " + v.label);
      check(decryptMessage(v.wire, master, CHANNEL_ID, "999") === null, "wrong sender rejected: " + v.label);
      if (rng) {
        const p = presetFromIndex(v.preset);
        const again = decryptMessage(encryptMessage(v.plain, master, p, CHANNEL_ID, SENDER_ID), master, CHANNEL_ID, SENDER_ID);
        check(again === v.plain, "encrypt + decrypt round trip: " + v.label);
      }
    } catch (e) {
      check(false, v.label + " threw: " + String(e));
    }
  }
  try {
    const got = decryptFile(fromHex(FILE.wireHex), master, CHANNEL_ID, SENDER_ID);
    check(!!got && toHex(got) === FILE.plainHex, "decrypt file vector: " + FILE.label);
    if (rng) {
      const big = new Uint8Array(7e4).map((_, i) => i * 31 & 255);
      const back = decryptFile(encryptFile(big, master, presetFromIndex(2), CHANNEL_ID, SENDER_ID), master, CHANNEL_ID, SENDER_ID);
      check(!!back && back.length === big.length && toHex(back.subarray(65530, 65545)) === toHex(big.subarray(65530, 65545)), "file round trip across a chunk boundary (70000 B)");
    }
  } catch (e) {
    check(false, "file test threw: " + String(e));
  }
  for (const v of KDF) {
    try {
      const t0 = Date.now();
      const key = await deriveMasterKey(v.password, { context: v.context ?? void 0, memoryKiB: v.memoryKiB });
      check(toHex(key) === v.key, `Argon2id vector: ${v.label} (${Date.now() - t0} ms)`);
    } catch (e) {
      check(false, `Argon2id ${v.label} threw: ${String(e)}`);
    }
  }
  return { ok, lines };
}
async function measureKdf(onProgress) {
  const t0 = Date.now();
  await deriveMasterKey("benchmark-password", { onProgress });
  return Date.now() - t0;
}

// src/commands.ts
var choice = (v) => ({ name: v, displayName: v, value: v });
function installCommands() {
  try {
    return (0, import_commands.registerCommand)({
      name: "e2ee",
      displayName: "e2ee",
      description: "Aegires E2EE: encryption on/off for this chat, status, or choose the AES strength",
      displayDescription: "Aegires E2EE: encryption on/off for this chat, status, or choose the AES strength",
      applicationId: "-1",
      type: 1,
      // CHAT
      inputType: 1,
      // BUILT_IN_TEXT
      options: [
        {
          name: "action",
          displayName: "action",
          description: "on, off, status, selftest, or aes-128 / aes-192 / aes-256",
          displayDescription: "on, off, status, selftest, or aes-128 / aes-192 / aes-256",
          type: 3,
          // STRING
          required: true,
          choices: ["on", "off", "status", "selftest", "aes-128", "aes-192", "aes-256"].map(choice)
        }
      ],
      execute: async (args, ctx) => {
        const action = args?.find((a) => a.name === "action")?.value;
        const channelId = ctx?.channel?.id;
        if (!channelId) return notify("E2EE: no channel in context");
        if (action === "aes-128" || action === "aes-192" || action === "aes-256") {
          const p = PRESETS.find((x) => x.label.toLowerCase().startsWith(action));
          setPreset(p.index);
          return notify(`Sending with ${p.label}` + (isForced(channelId) ? " (this preset channel always uses AES-128-GCM)" : ""));
        }
        if (action === "on") {
          if (isForced(channelId)) return notify("This is a preset channel: encryption is always on");
          if (!getSendKey(channelId)) return notify("Set a key in the plugin settings first");
          setChannelEnabled(channelId, true);
          return notify("E2EE ON for this chat");
        }
        if (action === "off") {
          if (isForced(channelId)) return notify("This is a preset channel: encryption cannot be turned off");
          setChannelEnabled(channelId, false);
          return notify("E2EE OFF for this chat");
        }
        if (action === "status") {
          return notify(
            `E2EE ${isEncryptionOn(channelId) ? "ON" : "OFF"}${isForced(channelId) ? " (preset channel)" : ""} - key ${getSendKey(channelId) ? "set" : "missing"} - ${getSendPreset(channelId).label} (setting: ${getPreset().label}) - own id ${getSelfId() ? "known" : "UNKNOWN"}`
          );
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
  const [pct, setPct] = React.useState(-1);
  const onProgress = (f) => {
    const p = Math.floor(f * 100);
    if (p !== pct) setPct(p);
  };
  const run = async (what, fn) => {
    setBusy(true);
    try {
      await fn();
      notify(what + " - done");
    } catch (e) {
      notify(what + " failed: " + String(e));
    } finally {
      setBusy(false);
      setPct(-1);
      refresh();
    }
  };
  return /* @__PURE__ */ React.createElement(ScrollView, { style: { flex: 1 }, contentContainerStyle: { padding: 12 } }, /* @__PURE__ */ React.createElement(
    Card,
    {
      title: "Global key " + (hasGlobalKey() ? "(set)" : "(not set)"),
      hint: "Used in every chat that has no channel key. Everyone in the chat must type the SAME password, and Aegires users must use the same one in the app. The password is not saved - only the key derived from it. Deriving the key is slow on purpose (Argon2id, 64 MiB): keep this screen open until it finishes."
    },
    /* @__PURE__ */ React.createElement(Field, { value: pw, onChange: setPw, placeholder: "Shared password", secret: true }),
    /* @__PURE__ */ React.createElement(
      Button,
      {
        label: busy ? "Deriving key..." + (pct >= 0 ? " " + pct + "%" : "") : "Set global key",
        busy,
        onPress: () => {
          const bad = checkPassword(pw);
          if (bad) return notify(bad);
          run("Set global key", async () => {
            await setGlobalPassword(pw, onProgress);
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
  ), /* @__PURE__ */ React.createElement(
    Card,
    {
      title: "Encryption strength: " + getPreset().label,
      hint: "Applies to messages YOU send. You can read everyone else's, whatever they chose. Stronger = more padding, so fewer characters fit in one message."
    },
    PRESETS.map((p) => /* @__PURE__ */ React.createElement(View, { key: p.index }, /* @__PURE__ */ React.createElement(
      Button,
      {
        label: (getPreset().index === p.index ? "\u2714 " : "") + p.label + "  (max " + maxPlaintextBytes(p) + " bytes per message)",
        onPress: () => {
          setPreset(p.index);
          refresh();
        }
      }
    )))
  ), /* @__PURE__ */ React.createElement(Card, { title: "Preset channels", hint: "Channels with a built-in key (an Aegires feature for public channels). Nothing to set up: messages there are always encrypted with AES-128-GCM and everyone can read them." }, forcedChannelIds().map((id) => /* @__PURE__ */ React.createElement(Text, { key: id, style: { color: C.text, marginTop: 6, fontFamily: "monospace" } }, id))), /* @__PURE__ */ React.createElement(Card, { title: "Behaviour" }, /* @__PURE__ */ React.createElement(ToggleRow, { label: "Encrypt outgoing messages by default (in chats without their own on/off setting)", value: !!import_plugin5.storage.encryptByDefault, onChange: (v) => {
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
      label: busy && pct >= 0 ? "Deriving key... " + pct + "%" : "Save for this chat",
      busy,
      onPress: () => {
        if (!/^\d+$/.test(chanId)) return notify("Channel ID must be digits only");
        if (chanPw) {
          const bad = checkPassword(chanPw);
          if (bad) return notify(bad);
        }
        run("Save chat settings", async () => {
          if (chanPw) await setChannelPassword(chanId, chanPw, onProgress);
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
  } })))), /* @__PURE__ */ React.createElement(Card, { title: "Diagnostics", hint: "What the hooks are doing right now. Press Refresh after sending / receiving a message." }, /* @__PURE__ */ React.createElement(Button, { label: "Refresh", onPress: () => refresh() }), /* @__PURE__ */ React.createElement(Text, { selectable: true, style: { color: C.text, marginTop: 8, fontFamily: "monospace", fontSize: 12 } }, "global key: " + (hasGlobalKey() ? "set" : "NOT SET") + "\npreset: " + getPreset().label + "\nown user id: " + (getSelfId() ?? "NOT FOUND YET") + "\n" + diagLines().join("\n"))), /* @__PURE__ */ React.createElement(Card, { title: "Self-test", hint: "Run this first. It checks, on this phone, that the encryption (all three strengths, file chunks, Argon2id) gives exactly the bytes the Aegires reference gives." }, /* @__PURE__ */ React.createElement(
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
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      label: busy ? "Measuring... " + (pct >= 0 ? pct + "%" : "") : "Measure key derivation speed (real size)",
      busy,
      onPress: () => run("Key derivation", async () => {
        const ms = await measureKdf(onProgress);
        setTestLines(["INFO  full Argon2id (64 MiB, 3 passes) took " + (ms / 1e3).toFixed(1) + " s on this phone"]);
      })
    }
  ), testLines.map((l, i) => /* @__PURE__ */ React.createElement(Text, { key: i, style: { color: l.startsWith("FAIL") ? C.danger : C.text, marginTop: 4, fontFamily: "monospace" } }, l))));
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
    try {
      getSelfId();
    } catch {
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
