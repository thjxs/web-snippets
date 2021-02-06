// this program is a JavaScript version of Mersenne Twister, with concealment and encapsulation in class,
// an almost straight conversion from the original program, mt19937ar.c,
// translated by y. okada on July 17, 2006.
// and modified a little at july 20, 2006, but there are not any substantial differences.
// in this program, procedure descriptions and comments of original source code were not removed.
// lines commented with //c// were originally descriptions of c procedure. and a few following lines are appropriate JavaScript descriptions.
// lines commented with /* and */ are original comments.
// lines commented with // are additional comments in this JavaScript version.
// before using this version, create at least one instance of MersenneTwister19937 class, and initialize the each state, given below in c comments, of all the instances.
/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/
const N = 624;
const M = 397;
const MATRIX_A = 0x9908b0df;
const UPPER_MASK = 0x80000000;
const LOWER_MASK = 0x7fffffff;
function unsigned32(n1: number) {
  return n1 < 0 ? (n1 ^ UPPER_MASK) + UPPER_MASK : n1;
}
function subtraction32(n1: number, n2: number) {
  return n1 < n2 ? unsigned32((0x10000000 - (n2 - n1)) & 0xffffffff) : n1 - n2;
}
function addition32(n1: number, n2: number) {
  return unsigned32((n1 + n2) & 0xffffffff);
}
function multiplication32(n1: number, n2: number) {
  let sum = 0;
  for (let i = 0; i < 32; i += 1) {
    if ((n1 >>> i) & 0x1) {
      sum = addition32(sum, unsigned32(n2 << i));
    }
  }
  return sum;
}
class MersenneTwister19937 {
  mt: any[];
  mti: number;
  mag01: number[];

  constructor() {
    this.mt = new Array(N);
    this.mti = N + 1;
    this.mag01 = [0x0, MATRIX_A];
  }

  init_genrand(s: number) {
    this.mt[0] = unsigned32(s & 0xffffffff);
    for (this.mti = 1; this.mti < N; this.mti += 1) {
      this.mt[this.mti] = addition32(
        multiplication32(
          1812433253,
          unsigned32(this.mt[this.mti - 1] & (this.mt[this.mti - 1] >>> 30))
        ),
        this.mti
      );
      this.mt[this.mti] = unsigned32(this.mt[this.mti] & 0xffffffff);
    }
  }

  init_by_array(init_key: Array<number>, key_length: number) {
    let i, j, k;
    this.init_genrand(19650218);
    i = 1;
    j = 0;
    k = N > key_length ? N : key_length;
    for (; k; k -= 1) {
      this.mt[i] = addition32(
        addition32(
          unsigned32(
            this.mt[i] ^
              multiplication32(
                unsigned32(this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)),
                1664525
              )
          ),
          init_key[j]
        ),
        j
      );
      this.mt[i] = unsigned32(this.mt[i] & 0xffffffff);
      i += 1;
      j += 1;
      if (i >= N) {
        this.mt[0] = this.mt[N - 1];
        i = 1;
      }
      if (j >= key_length) j = 0;
    }
    for (k = N - 1; k; k -= 1) {
      this.mt[i] = subtraction32(
        unsigned32(
          this.mt[i] ^
            multiplication32(
              unsigned32(this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)),
              1566083941
            )
        ),
        i
      );
      this.mt[i] = unsigned32(this.mt[i] & 0xffffffff);
      i += 1;
      if (i >= N) {
        this.mt[0] = this.mt[N - 1];
        i = 1;
      }
    }
    this.mt[0] = 0x80000000;
  }

  genrand_int32() {
    let y;
    if (this.mti >= N) {
      let kk;
      if (this.mti === N + 1) {
        this.init_genrand(5489);
      }

      for (kk = 0; kk < N - M; kk += 1) {
        y = unsigned32(
          (this.mt[kk] & UPPER_MASK) | (this.mt[kk + 1] & LOWER_MASK)
        );
        this.mt[kk] = unsigned32(
          this.mt[kk + M] ^ (y >>> 1) ^ this.mag01[y & 0x1]
        );
      }

      y = unsigned32((this.mt[N - 1] & UPPER_MASK) | (this.mt[0] & LOWER_MASK));
      this.mt[N - 1] = unsigned32(
        this.mt[M - 1] ^ (y >>> 1) ^ this.mag01[y & 0x1]
      );
      this.mti = 0;
    }

    y = this.mt[this.mti];
    this.mti += 1;

    y = unsigned32(y ^ (y >>> 11));
    y = unsigned32(y ^ ((y << 7) & 0x9d2c5680));
    y = unsigned32(y ^ ((y << 15) & 0xefc60000));
    y = unsigned32(y ^ (y >>> 18));

    return y;
  }

  genrand_int31() {
    return this.genrand_int32() >>> 1;
  }

  genrand_real1() {
    return this.genrand_int32() * (1.0 / 4294967295.0);
  }

  genrand_real2() {
    return this.genrand_int32() * (1.0 / 4294967296.0);
  }

  genrand_real3() {
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
  }

  genrand_res53() {
    const a = this.genrand_int32() >>> 5;
    const b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }
}

const gen = new MersenneTwister19937();
gen.init_genrand(new Date().getTime() % 1000000000);

export function rand(max?: number, min?: number) {
  if (min === undefined) {
    min = 0;
  }
  if (max === undefined) {
    min = 0;
    max = 32768;
  }

  return Math.floor(gen.genrand_real2() * (max - min) + min);
}

export function seed(s: number) {
  if (typeof s !== 'number') {
    throw new Error('seed(s) must take numeric argument; is ' + typeof s);
  }
  gen.init_genrand(s);
}

export function seed_array(a: number[]) {
  if (typeof a !== 'object') {
    throw new Error('seed_array(a) must take array of numbers; is ' + typeof a);
  }
  gen.init_by_array(a, a.length);
}

export default MersenneTwister19937;
