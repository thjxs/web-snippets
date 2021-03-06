!(function (n) {
  var r = {};
  function e(t) {
    if (r[t]) return r[t].exports;
    var i = (r[t] = { i: t, l: !1, exports: {} });
    return n[t].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
  }
  (e.m = n),
    (e.c = r),
    (e.d = function (n, r, t) {
      e.o(n, r) || Object.defineProperty(n, r, { enumerable: !0, get: t });
    }),
    (e.r = function (n) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(n, '__esModule', { value: !0 });
    }),
    (e.t = function (n, r) {
      if ((1 & r && (n = e(n)), 8 & r)) return n;
      if (4 & r && 'object' == typeof n && n && n.__esModule) return n;
      var t = Object.create(null);
      if (
        (e.r(t),
        Object.defineProperty(t, 'default', { enumerable: !0, value: n }),
        2 & r && 'string' != typeof n)
      )
        for (var i in n)
          e.d(
            t,
            i,
            function (r) {
              return n[r];
            }.bind(null, i)
          );
      return t;
    }),
    (e.n = function (n) {
      var r =
        n && n.__esModule
          ? function () {
              return n.default;
            }
          : function () {
              return n;
            };
      return e.d(r, 'a', r), r;
    }),
    (e.o = function (n, r) {
      return Object.prototype.hasOwnProperty.call(n, r);
    }),
    (e.p = ''),
    e((e.s = 1));
})([
  function (n, r) {
    function e() {
      var n, r, e;
      (n = 624), (r = 397), (e = 2147483648);
      var t = new Array(n),
        i = 625;
      function o(n) {
        return n < 0 ? (n ^ e) + e : n;
      }
      function a(n, r) {
        return o((n + r) & 4294967295);
      }
      function u(n, r) {
        for (var e = 0, t = 0; t < 32; ++t)
          (n >>> t) & 1 && (e = a(e, o(r << t)));
        return e;
      }
      (this.init_genrand = function (r) {
        for (t[0] = o(4294967295 & r), i = 1; i < n; i++)
          (t[i] = a(u(1812433253, o(t[i - 1] ^ (t[i - 1] >>> 30))), i)),
            (t[i] = o(4294967295 & t[i]));
      }),
        (this.init_by_array = function (r, e) {
          var i, f, c, d, s;
          for (
            this.init_genrand(19650218), i = 1, f = 0, c = n > e ? n : e;
            c;
            c--
          )
            (t[i] = a(
              a(o(t[i] ^ u(o(t[i - 1] ^ (t[i - 1] >>> 30)), 1664525)), r[f]),
              f
            )),
              (t[i] = o(4294967295 & t[i])),
              f++,
              ++i >= n && ((t[0] = t[623]), (i = 1)),
              f >= e && (f = 0);
          for (c = 623; c; c--)
            (t[i] =
              (d = o(
                (dbg = t[i]) ^ u(o(t[i - 1] ^ (t[i - 1] >>> 30)), 1566083941)
              )) < (s = i)
                ? o((4294967296 - (s - d)) & 4294967295)
                : d - s),
              (t[i] = o(4294967295 & t[i])),
              ++i >= n && ((t[0] = t[623]), (i = 1));
          t[0] = 2147483648;
        });
      var f = [0, 2567483615];
      (this.genrand_int32 = function () {
        var a;
        if (i >= n) {
          var u;
          for (625 == i && this.init_genrand(5489), u = 0; u < 227; u++)
            (a = o((t[u] & e) | (2147483647 & t[u + 1]))),
              (t[u] = o(t[u + r] ^ (a >>> 1) ^ f[1 & a]));
          for (; u < 623; u++)
            (a = o((t[u] & e) | (2147483647 & t[u + 1]))),
              (t[u] = o(t[u + (r - n)] ^ (a >>> 1) ^ f[1 & a]));
          (a = o((t[623] & e) | (2147483647 & t[0]))),
            (t[623] = o(t[396] ^ (a >>> 1) ^ f[1 & a])),
            (i = 0);
        }
        return (
          (a = o((a = t[i++]) ^ (a >>> 11))),
          (a = o(a ^ ((a << 7) & 2636928640))),
          (a = o(a ^ ((a << 15) & 4022730752))),
          (a = o(a ^ (a >>> 18)))
        );
      }),
        (this.genrand_int31 = function () {
          return this.genrand_int32() >>> 1;
        }),
        (this.genrand_real1 = function () {
          return this.genrand_int32() * (1 / 4294967295);
        }),
        (this.genrand_real2 = function () {
          return this.genrand_int32() * (1 / 4294967296);
        }),
        (this.genrand_real3 = function () {
          return (this.genrand_int32() + 0.5) * (1 / 4294967296);
        }),
        (this.genrand_res53 = function () {
          return (
            (67108864 * (this.genrand_int32() >>> 5) +
              (this.genrand_int32() >>> 6)) *
            (1 / 9007199254740992)
          );
        });
    }
    r.MersenneTwister19937 = e;
    var t = new e();
    t.init_genrand(new Date().getTime() % 1e9),
      (r.rand = function (n, r) {
        return (
          void 0 === n && ((r = 0), (n = 32768)),
          Math.floor(t.genrand_real2() * (n - r) + r)
        );
      }),
      (r.seed = function (n) {
        if ('number' != typeof n)
          throw new Error('seed(S) must take numeric argument; is ' + typeof n);
        t.init_genrand(n);
      }),
      (r.seed_array = function (n) {
        if ('object' != typeof n)
          throw new Error(
            'seed_array(A) must take array of numbers; is ' + typeof n
          );
        t.init_by_array(n, n.length);
      });
  },
  function (n, r, e) {
    'use strict';
    e.r(r);
    var t = e(0);
    window.randomNumber = function (n) {
      'number' == typeof n && (n = { max: n }),
        void 0 === (n = n || {}).min && (n.min = 0),
        void 0 === n.max && (n.max = 99999),
        void 0 === n.precision && (n.precision = 1);
      let r = n.max;
      r >= 0 && (r += n.precision);
      let e = Math.floor(t.rand(r / n.precision, n.min / n.precision));
      return (e /= 1 / n.precision);
    };
  },
]);
