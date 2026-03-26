import z, { useState as X, useRef as Gt, useMemo as De, useEffect as W } from "react";
import { createRoot as Wt } from "react-dom/client";
function l(e, t, n) {
  function r(c, u) {
    if (c._zod || Object.defineProperty(c, "_zod", {
      value: {
        def: u,
        constr: s,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), c._zod.traits.has(e))
      return;
    c._zod.traits.add(e), t(c, u);
    const a = s.prototype, f = Object.keys(a);
    for (let p = 0; p < f.length; p++) {
      const g = f[p];
      g in c || (c[g] = a[g].bind(c));
    }
  }
  const o = (n == null ? void 0 : n.Parent) ?? Object;
  class i extends o {
  }
  Object.defineProperty(i, "name", { value: e });
  function s(c) {
    var u;
    const a = n != null && n.Parent ? new i() : this;
    r(a, c), (u = a._zod).deferred ?? (u.deferred = []);
    for (const f of a._zod.deferred)
      f();
    return a;
  }
  return Object.defineProperty(s, "init", { value: r }), Object.defineProperty(s, Symbol.hasInstance, {
    value: (c) => {
      var u, a;
      return n != null && n.Parent && c instanceof n.Parent ? !0 : (a = (u = c == null ? void 0 : c._zod) == null ? void 0 : u.traits) == null ? void 0 : a.has(e);
    }
  }), Object.defineProperty(s, "name", { value: e }), s;
}
class H extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class ft extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
const dt = {};
function L(e) {
  return dt;
}
function pt(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, o]) => t.indexOf(+r) === -1).map(([r, o]) => o);
}
function Ze(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function Ne(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function Te(e) {
  return e == null;
}
function Ie(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function Kt(e, t) {
  const n = (e.toString().split(".")[1] || "").length, r = t.toString();
  let o = (r.split(".")[1] || "").length;
  if (o === 0 && /\d?e-\d?/.test(r)) {
    const u = r.match(/\d?e-(\d?)/);
    u != null && u[1] && (o = Number.parseInt(u[1]));
  }
  const i = n > o ? n : o, s = Number.parseInt(e.toFixed(i).replace(".", "")), c = Number.parseInt(t.toFixed(i).replace(".", ""));
  return s % c / 10 ** i;
}
const Ue = Symbol("evaluating");
function y(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== Ue)
        return r === void 0 && (r = Ue, r = n()), r;
    },
    set(o) {
      Object.defineProperty(e, t, {
        value: o
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function B(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function U(...e) {
  const t = {};
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function Fe(e) {
  return JSON.stringify(e);
}
function Yt(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const ht = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function de(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Ht = Ne(() => {
  var e;
  if (typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) != null && e.includes("Cloudflare")))
    return !1;
  try {
    const t = Function;
    return new t(""), !0;
  } catch {
    return !1;
  }
});
function oe(e) {
  if (de(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const n = t.prototype;
  return !(de(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function mt(e) {
  return oe(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const qt = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function _e(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function F(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def);
  return (!t || n != null && n.parent) && (r._zod.parent = e), r;
}
function h(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if ((t == null ? void 0 : t.message) !== void 0) {
    if ((t == null ? void 0 : t.error) !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function Xt(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const Qt = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function en(e, t) {
  const n = e._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const i = U(e._zod.def, {
    get shape() {
      const s = {};
      for (const c in t) {
        if (!(c in n.shape))
          throw new Error(`Unrecognized key: "${c}"`);
        t[c] && (s[c] = n.shape[c]);
      }
      return B(this, "shape", s), s;
    },
    checks: []
  });
  return F(e, i);
}
function tn(e, t) {
  const n = e._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const i = U(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape };
      for (const c in t) {
        if (!(c in n.shape))
          throw new Error(`Unrecognized key: "${c}"`);
        t[c] && delete s[c];
      }
      return B(this, "shape", s), s;
    },
    checks: []
  });
  return F(e, i);
}
function nn(e, t) {
  if (!oe(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0) {
    const i = e._zod.def.shape;
    for (const s in t)
      if (Object.getOwnPropertyDescriptor(i, s) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const o = U(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape, ...t };
      return B(this, "shape", i), i;
    }
  });
  return F(e, o);
}
function rn(e, t) {
  if (!oe(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = U(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return B(this, "shape", r), r;
    }
  });
  return F(e, n);
}
function on(e, t) {
  const n = U(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return B(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return F(e, n);
}
function sn(e, t, n) {
  const o = t._zod.def.checks;
  if (o && o.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const s = U(t._zod.def, {
    get shape() {
      const c = t._zod.def.shape, u = { ...c };
      if (n)
        for (const a in n) {
          if (!(a in c))
            throw new Error(`Unrecognized key: "${a}"`);
          n[a] && (u[a] = e ? new e({
            type: "optional",
            innerType: c[a]
          }) : c[a]);
        }
      else
        for (const a in c)
          u[a] = e ? new e({
            type: "optional",
            innerType: c[a]
          }) : c[a];
      return B(this, "shape", u), u;
    },
    checks: []
  });
  return F(t, s);
}
function cn(e, t, n) {
  const r = U(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, i = { ...o };
      if (n)
        for (const s in n) {
          if (!(s in i))
            throw new Error(`Unrecognized key: "${s}"`);
          n[s] && (i[s] = new e({
            type: "nonoptional",
            innerType: o[s]
          }));
        }
      else
        for (const s in o)
          i[s] = new e({
            type: "nonoptional",
            innerType: o[s]
          });
      return B(this, "shape", i), i;
    }
  });
  return F(t, r);
}
function Y(e, t = 0) {
  var n;
  if (e.aborted === !0)
    return !0;
  for (let r = t; r < e.issues.length; r++)
    if (((n = e.issues[r]) == null ? void 0 : n.continue) !== !0)
      return !0;
  return !1;
}
function gt(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function ce(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.message;
}
function V(e, t, n) {
  var o, i, s, c, u, a;
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const f = ce((s = (i = (o = e.inst) == null ? void 0 : o._zod.def) == null ? void 0 : i.error) == null ? void 0 : s.call(i, e)) ?? ce((c = t == null ? void 0 : t.error) == null ? void 0 : c.call(t, e)) ?? ce((u = n.customError) == null ? void 0 : u.call(n, e)) ?? ce((a = n.localeError) == null ? void 0 : a.call(n, e)) ?? "Invalid input";
    r.message = f;
  }
  return delete r.inst, delete r.continue, t != null && t.reportInput || delete r.input, r;
}
function Pe(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function ie(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
const _t = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, Ze, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, vt = l("$ZodError", _t), bt = l("$ZodError", _t, { Parent: Error });
function un(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const o of e.issues)
    o.path.length > 0 ? (n[o.path[0]] = n[o.path[0]] || [], n[o.path[0]].push(t(o))) : r.push(t(o));
  return { formErrors: r, fieldErrors: n };
}
function an(e, t = (n) => n.message) {
  const n = { _errors: [] }, r = (o) => {
    for (const i of o.issues)
      if (i.code === "invalid_union" && i.errors.length)
        i.errors.map((s) => r({ issues: s }));
      else if (i.code === "invalid_key")
        r({ issues: i.issues });
      else if (i.code === "invalid_element")
        r({ issues: i.issues });
      else if (i.path.length === 0)
        n._errors.push(t(i));
      else {
        let s = n, c = 0;
        for (; c < i.path.length; ) {
          const u = i.path[c];
          c === i.path.length - 1 ? (s[u] = s[u] || { _errors: [] }, s[u]._errors.push(t(i))) : s[u] = s[u] || { _errors: [] }, s = s[u], c++;
        }
      }
  };
  return r(e), n;
}
const Ae = (e) => (t, n, r, o) => {
  const i = r ? Object.assign(r, { async: !1 }) : { async: !1 }, s = t._zod.run({ value: n, issues: [] }, i);
  if (s instanceof Promise)
    throw new H();
  if (s.issues.length) {
    const c = new ((o == null ? void 0 : o.Err) ?? e)(s.issues.map((u) => V(u, i, L())));
    throw ht(c, o == null ? void 0 : o.callee), c;
  }
  return s.value;
}, xe = (e) => async (t, n, r, o) => {
  const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let s = t._zod.run({ value: n, issues: [] }, i);
  if (s instanceof Promise && (s = await s), s.issues.length) {
    const c = new ((o == null ? void 0 : o.Err) ?? e)(s.issues.map((u) => V(u, i, L())));
    throw ht(c, o == null ? void 0 : o.callee), c;
  }
  return s.value;
}, ve = (e) => (t, n, r) => {
  const o = r ? { ...r, async: !1 } : { async: !1 }, i = t._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise)
    throw new H();
  return i.issues.length ? {
    success: !1,
    error: new (e ?? vt)(i.issues.map((s) => V(s, o, L())))
  } : { success: !0, data: i.value };
}, ln = /* @__PURE__ */ ve(bt), be = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let i = t._zod.run({ value: n, issues: [] }, o);
  return i instanceof Promise && (i = await i), i.issues.length ? {
    success: !1,
    error: new e(i.issues.map((s) => V(s, o, L())))
  } : { success: !0, data: i.value };
}, fn = /* @__PURE__ */ be(bt), dn = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Ae(e)(t, n, o);
}, pn = (e) => (t, n, r) => Ae(e)(t, n, r), hn = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return xe(e)(t, n, o);
}, mn = (e) => async (t, n, r) => xe(e)(t, n, r), gn = (e) => (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return ve(e)(t, n, o);
}, _n = (e) => (t, n, r) => ve(e)(t, n, r), vn = (e) => async (t, n, r) => {
  const o = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return be(e)(t, n, o);
}, bn = (e) => async (t, n, r) => be(e)(t, n, r), yn = /^[cC][^\s-]{8,}$/, zn = /^[0-9a-z]+$/, wn = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, kn = /^[0-9a-vA-V]{20}$/, $n = /^[A-Za-z0-9]{27}$/, Zn = /^[a-zA-Z0-9_-]{21}$/, En = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Sn = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Me = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, On = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Nn = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Tn() {
  return new RegExp(Nn, "u");
}
const In = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Pn = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, An = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, xn = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, jn = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, yt = /^[A-Za-z0-9_-]*$/, Cn = /^\+[1-9]\d{6,14}$/, zt = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Rn = /* @__PURE__ */ new RegExp(`^${zt}$`);
function wt(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Dn(e) {
  return new RegExp(`^${wt(e)}$`);
}
function Un(e) {
  const t = wt({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${t}(?:${n.join("|")})`;
  return new RegExp(`^${zt}T(?:${r})$`);
}
const Fn = (e) => {
  const t = e ? `[\\s\\S]{${(e == null ? void 0 : e.minimum) ?? 0},${(e == null ? void 0 : e.maximum) ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, Mn = /^-?\d+$/, Jn = /^-?\d+(?:\.\d+)?$/, Ln = /^[^A-Z]*$/, Vn = /^[^a-z]*$/, A = /* @__PURE__ */ l("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), kt = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, $t = /* @__PURE__ */ l("$ZodCheckLessThan", (e, t) => {
  A.init(e, t);
  const n = kt[typeof t.value];
  e._zod.onattach.push((r) => {
    const o = r._zod.bag, i = (t.inclusive ? o.maximum : o.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < i && (t.inclusive ? o.maximum = t.value : o.exclusiveMaximum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
      origin: n,
      code: "too_big",
      maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), Zt = /* @__PURE__ */ l("$ZodCheckGreaterThan", (e, t) => {
  A.init(e, t);
  const n = kt[typeof t.value];
  e._zod.onattach.push((r) => {
    const o = r._zod.bag, i = (t.inclusive ? o.minimum : o.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > i && (t.inclusive ? o.minimum = t.value : o.exclusiveMinimum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
      origin: n,
      code: "too_small",
      minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), Bn = /* @__PURE__ */ l("$ZodCheckMultipleOf", (e, t) => {
  A.init(e, t), e._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = t.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : Kt(n.value, t.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Gn = /* @__PURE__ */ l("$ZodCheckNumberFormat", (e, t) => {
  var s;
  A.init(e, t), t.format = t.format || "float64";
  const n = (s = t.format) == null ? void 0 : s.includes("int"), r = n ? "int" : "number", [o, i] = Qt[t.format];
  e._zod.onattach.push((c) => {
    const u = c._zod.bag;
    u.format = t.format, u.minimum = o, u.maximum = i, n && (u.pattern = Mn);
  }), e._zod.check = (c) => {
    const u = c.value;
    if (n) {
      if (!Number.isInteger(u)) {
        c.issues.push({
          expected: r,
          format: t.format,
          code: "invalid_type",
          continue: !1,
          input: u,
          inst: e
        });
        return;
      }
      if (!Number.isSafeInteger(u)) {
        u > 0 ? c.issues.push({
          input: u,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          inclusive: !0,
          continue: !t.abort
        }) : c.issues.push({
          input: u,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          inclusive: !0,
          continue: !t.abort
        });
        return;
      }
    }
    u < o && c.issues.push({
      origin: "number",
      input: u,
      code: "too_small",
      minimum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), u > i && c.issues.push({
      origin: "number",
      input: u,
      code: "too_big",
      maximum: i,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    });
  };
}), Wn = /* @__PURE__ */ l("$ZodCheckMaxLength", (e, t) => {
  var n;
  A.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !Te(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length <= t.maximum)
      return;
    const s = Pe(o);
    r.issues.push({
      origin: s,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), Kn = /* @__PURE__ */ l("$ZodCheckMinLength", (e, t) => {
  var n;
  A.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !Te(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const o = r.value;
    if (o.length >= t.minimum)
      return;
    const s = Pe(o);
    r.issues.push({
      origin: s,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), Yn = /* @__PURE__ */ l("$ZodCheckLengthEquals", (e, t) => {
  var n;
  A.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const o = r.value;
    return !Te(o) && o.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (r) => {
    const o = r.value, i = o.length;
    if (i === t.length)
      return;
    const s = Pe(o), c = i > t.length;
    r.issues.push({
      origin: s,
      ...c ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), ye = /* @__PURE__ */ l("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  A.init(e, t), e._zod.onattach.push((o) => {
    const i = o._zod.bag;
    i.format = t.format, t.pattern && (i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(t.pattern));
  }), t.pattern ? (n = e._zod).check ?? (n.check = (o) => {
    t.pattern.lastIndex = 0, !t.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: o.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (r = e._zod).check ?? (r.check = () => {
  });
}), Hn = /* @__PURE__ */ l("$ZodCheckRegex", (e, t) => {
  ye.init(e, t), e._zod.check = (n) => {
    t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: n.value,
      pattern: t.pattern.toString(),
      inst: e,
      continue: !t.abort
    });
  };
}), qn = /* @__PURE__ */ l("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = Ln), ye.init(e, t);
}), Xn = /* @__PURE__ */ l("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = Vn), ye.init(e, t);
}), Qn = /* @__PURE__ */ l("$ZodCheckIncludes", (e, t) => {
  A.init(e, t);
  const n = _e(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
  t.pattern = r, e._zod.onattach.push((o) => {
    const i = o._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(r);
  }), e._zod.check = (o) => {
    o.value.includes(t.includes, t.position) || o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: o.value,
      inst: e,
      continue: !t.abort
    });
  };
}), er = /* @__PURE__ */ l("$ZodCheckStartsWith", (e, t) => {
  A.init(e, t);
  const n = new RegExp(`^${_e(t.prefix)}.*`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.startsWith(t.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: t.prefix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), tr = /* @__PURE__ */ l("$ZodCheckEndsWith", (e, t) => {
  A.init(e, t);
  const n = new RegExp(`.*${_e(t.suffix)}$`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.endsWith(t.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: t.suffix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), nr = /* @__PURE__ */ l("$ZodCheckOverwrite", (e, t) => {
  A.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class rr {
  constructor(t = []) {
    this.content = [], this.indent = 0, this && (this.args = t);
  }
  indented(t) {
    this.indent += 1, t(this), this.indent -= 1;
  }
  write(t) {
    if (typeof t == "function") {
      t(this, { execution: "sync" }), t(this, { execution: "async" });
      return;
    }
    const r = t.split(`
`).filter((s) => s), o = Math.min(...r.map((s) => s.length - s.trimStart().length)), i = r.map((s) => s.slice(o)).map((s) => " ".repeat(this.indent * 2) + s);
    for (const s of i)
      this.content.push(s);
  }
  compile() {
    const t = Function, n = this == null ? void 0 : this.args, o = [...((this == null ? void 0 : this.content) ?? [""]).map((i) => `  ${i}`)];
    return new t(...n, o.join(`
`));
  }
}
const or = {
  major: 4,
  minor: 3,
  patch: 6
}, S = /* @__PURE__ */ l("$ZodType", (e, t) => {
  var o;
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = or;
  const r = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && r.unshift(e);
  for (const i of r)
    for (const s of i._zod.onattach)
      s(e);
  if (r.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), (o = e._zod.deferred) == null || o.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const i = (c, u, a) => {
      let f = Y(c), p;
      for (const g of u) {
        if (g._zod.def.when) {
          if (!g._zod.def.when(c))
            continue;
        } else if (f)
          continue;
        const d = c.issues.length, v = g._zod.check(c);
        if (v instanceof Promise && (a == null ? void 0 : a.async) === !1)
          throw new H();
        if (p || v instanceof Promise)
          p = (p ?? Promise.resolve()).then(async () => {
            await v, c.issues.length !== d && (f || (f = Y(c, d)));
          });
        else {
          if (c.issues.length === d)
            continue;
          f || (f = Y(c, d));
        }
      }
      return p ? p.then(() => c) : c;
    }, s = (c, u, a) => {
      if (Y(c))
        return c.aborted = !0, c;
      const f = i(u, r, a);
      if (f instanceof Promise) {
        if (a.async === !1)
          throw new H();
        return f.then((p) => e._zod.parse(p, a));
      }
      return e._zod.parse(f, a);
    };
    e._zod.run = (c, u) => {
      if (u.skipChecks)
        return e._zod.parse(c, u);
      if (u.direction === "backward") {
        const f = e._zod.parse({ value: c.value, issues: [] }, { ...u, skipChecks: !0 });
        return f instanceof Promise ? f.then((p) => s(p, c, u)) : s(f, c, u);
      }
      const a = e._zod.parse(c, u);
      if (a instanceof Promise) {
        if (u.async === !1)
          throw new H();
        return a.then((f) => i(f, r, u));
      }
      return i(a, r, u);
    };
  }
  y(e, "~standard", () => ({
    validate: (i) => {
      var s;
      try {
        const c = ln(e, i);
        return c.success ? { value: c.data } : { issues: (s = c.error) == null ? void 0 : s.issues };
      } catch {
        return fn(e, i).then((u) => {
          var a;
          return u.success ? { value: u.data } : { issues: (a = u.error) == null ? void 0 : a.issues };
        });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), je = /* @__PURE__ */ l("$ZodString", (e, t) => {
  var n;
  S.init(e, t), e._zod.pattern = [...((n = e == null ? void 0 : e._zod.bag) == null ? void 0 : n.patterns) ?? []].pop() ?? Fn(e._zod.bag), e._zod.parse = (r, o) => {
    if (t.coerce)
      try {
        r.value = String(r.value);
      } catch {
      }
    return typeof r.value == "string" || r.issues.push({
      expected: "string",
      code: "invalid_type",
      input: r.value,
      inst: e
    }), r;
  };
}), w = /* @__PURE__ */ l("$ZodStringFormat", (e, t) => {
  ye.init(e, t), je.init(e, t);
}), ir = /* @__PURE__ */ l("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = Sn), w.init(e, t);
}), sr = /* @__PURE__ */ l("$ZodUUID", (e, t) => {
  if (t.version) {
    const r = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[t.version];
    if (r === void 0)
      throw new Error(`Invalid UUID version: "${t.version}"`);
    t.pattern ?? (t.pattern = Me(r));
  } else
    t.pattern ?? (t.pattern = Me());
  w.init(e, t);
}), cr = /* @__PURE__ */ l("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = On), w.init(e, t);
}), ur = /* @__PURE__ */ l("$ZodURL", (e, t) => {
  w.init(e, t), e._zod.check = (n) => {
    try {
      const r = n.value.trim(), o = new URL(r);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(o.hostname) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: t.hostname.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      })), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(o.protocol.endsWith(":") ? o.protocol.slice(0, -1) : o.protocol) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: n.value,
        inst: e,
        continue: !t.abort
      })), t.normalize ? n.value = o.href : n.value = r;
      return;
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "url",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), ar = /* @__PURE__ */ l("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = Tn()), w.init(e, t);
}), lr = /* @__PURE__ */ l("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = Zn), w.init(e, t);
}), fr = /* @__PURE__ */ l("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = yn), w.init(e, t);
}), dr = /* @__PURE__ */ l("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = zn), w.init(e, t);
}), pr = /* @__PURE__ */ l("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = wn), w.init(e, t);
}), hr = /* @__PURE__ */ l("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = kn), w.init(e, t);
}), mr = /* @__PURE__ */ l("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = $n), w.init(e, t);
}), gr = /* @__PURE__ */ l("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = Un(t)), w.init(e, t);
}), _r = /* @__PURE__ */ l("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = Rn), w.init(e, t);
}), vr = /* @__PURE__ */ l("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = Dn(t)), w.init(e, t);
}), br = /* @__PURE__ */ l("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = En), w.init(e, t);
}), yr = /* @__PURE__ */ l("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = In), w.init(e, t), e._zod.bag.format = "ipv4";
}), zr = /* @__PURE__ */ l("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = Pn), w.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
    try {
      new URL(`http://[${n.value}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), wr = /* @__PURE__ */ l("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = An), w.init(e, t);
}), kr = /* @__PURE__ */ l("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = xn), w.init(e, t), e._zod.check = (n) => {
    const r = n.value.split("/");
    try {
      if (r.length !== 2)
        throw new Error();
      const [o, i] = r;
      if (!i)
        throw new Error();
      const s = Number(i);
      if (`${s}` !== i)
        throw new Error();
      if (s < 0 || s > 128)
        throw new Error();
      new URL(`http://[${o}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: n.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
});
function Et(e) {
  if (e === "")
    return !0;
  if (e.length % 4 !== 0)
    return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
const $r = /* @__PURE__ */ l("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = jn), w.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
    Et(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function Zr(e) {
  if (!yt.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return Et(n);
}
const Er = /* @__PURE__ */ l("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = yt), w.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
    Zr(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Sr = /* @__PURE__ */ l("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = Cn), w.init(e, t);
});
function Or(e, t = null) {
  try {
    const n = e.split(".");
    if (n.length !== 3)
      return !1;
    const [r] = n;
    if (!r)
      return !1;
    const o = JSON.parse(atob(r));
    return !("typ" in o && (o == null ? void 0 : o.typ) !== "JWT" || !o.alg || t && (!("alg" in o) || o.alg !== t));
  } catch {
    return !1;
  }
}
const Nr = /* @__PURE__ */ l("$ZodJWT", (e, t) => {
  w.init(e, t), e._zod.check = (n) => {
    Or(n.value, t.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), St = /* @__PURE__ */ l("$ZodNumber", (e, t) => {
  S.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Jn, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const o = n.value;
    if (typeof o == "number" && !Number.isNaN(o) && Number.isFinite(o))
      return n;
    const i = typeof o == "number" ? Number.isNaN(o) ? "NaN" : Number.isFinite(o) ? void 0 : "Infinity" : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: o,
      inst: e,
      ...i ? { received: i } : {}
    }), n;
  };
}), Tr = /* @__PURE__ */ l("$ZodNumberFormat", (e, t) => {
  Gn.init(e, t), St.init(e, t);
}), Ir = /* @__PURE__ */ l("$ZodUnknown", (e, t) => {
  S.init(e, t), e._zod.parse = (n) => n;
}), Pr = /* @__PURE__ */ l("$ZodNever", (e, t) => {
  S.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function Je(e, t, n) {
  e.issues.length && t.issues.push(...gt(n, e.issues)), t.value[n] = e.value;
}
const Ar = /* @__PURE__ */ l("$ZodArray", (e, t) => {
  S.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value;
    if (!Array.isArray(o))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: e
      }), n;
    n.value = Array(o.length);
    const i = [];
    for (let s = 0; s < o.length; s++) {
      const c = o[s], u = t.element._zod.run({
        value: c,
        issues: []
      }, r);
      u instanceof Promise ? i.push(u.then((a) => Je(a, n, s))) : Je(u, n, s);
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
});
function pe(e, t, n, r, o) {
  if (e.issues.length) {
    if (o && !(n in r))
      return;
    t.issues.push(...gt(n, e.issues));
  }
  e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function Ot(e) {
  var r, o, i, s;
  const t = Object.keys(e.shape);
  for (const c of t)
    if (!((s = (i = (o = (r = e.shape) == null ? void 0 : r[c]) == null ? void 0 : o._zod) == null ? void 0 : i.traits) != null && s.has("$ZodType")))
      throw new Error(`Invalid element at key "${c}": expected a Zod schema`);
  const n = Xt(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n)
  };
}
function Nt(e, t, n, r, o, i) {
  const s = [], c = o.keySet, u = o.catchall._zod, a = u.def.type, f = u.optout === "optional";
  for (const p in t) {
    if (c.has(p))
      continue;
    if (a === "never") {
      s.push(p);
      continue;
    }
    const g = u.run({ value: t[p], issues: [] }, r);
    g instanceof Promise ? e.push(g.then((d) => pe(d, n, p, t, f))) : pe(g, n, p, t, f);
  }
  return s.length && n.issues.push({
    code: "unrecognized_keys",
    keys: s,
    input: t,
    inst: i
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const xr = /* @__PURE__ */ l("$ZodObject", (e, t) => {
  S.init(e, t);
  const n = Object.getOwnPropertyDescriptor(t, "shape");
  if (!(n != null && n.get)) {
    const c = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const u = { ...c };
        return Object.defineProperty(t, "shape", {
          value: u
        }), u;
      }
    });
  }
  const r = Ne(() => Ot(t));
  y(e._zod, "propValues", () => {
    const c = t.shape, u = {};
    for (const a in c) {
      const f = c[a]._zod;
      if (f.values) {
        u[a] ?? (u[a] = /* @__PURE__ */ new Set());
        for (const p of f.values)
          u[a].add(p);
      }
    }
    return u;
  });
  const o = de, i = t.catchall;
  let s;
  e._zod.parse = (c, u) => {
    s ?? (s = r.value);
    const a = c.value;
    if (!o(a))
      return c.issues.push({
        expected: "object",
        code: "invalid_type",
        input: a,
        inst: e
      }), c;
    c.value = {};
    const f = [], p = s.shape;
    for (const g of s.keys) {
      const d = p[g], v = d._zod.optout === "optional", b = d._zod.run({ value: a[g], issues: [] }, u);
      b instanceof Promise ? f.push(b.then(($) => pe($, c, g, a, v))) : pe(b, c, g, a, v);
    }
    return i ? Nt(f, a, c, u, r.value, e) : f.length ? Promise.all(f).then(() => c) : c;
  };
}), jr = /* @__PURE__ */ l("$ZodObjectJIT", (e, t) => {
  xr.init(e, t);
  const n = e._zod.parse, r = Ne(() => Ot(t)), o = (g) => {
    var G;
    const d = new rr(["shape", "payload", "ctx"]), v = r.value, b = (j) => {
      const I = Fe(j);
      return `shape[${I}]._zod.run({ value: input[${I}], issues: [] }, ctx)`;
    };
    d.write("const input = payload.value;");
    const $ = /* @__PURE__ */ Object.create(null);
    let R = 0;
    for (const j of v.keys)
      $[j] = `key_${R++}`;
    d.write("const newResult = {};");
    for (const j of v.keys) {
      const I = $[j], x = Fe(j), m = g[j], _ = ((G = m == null ? void 0 : m._zod) == null ? void 0 : G.optout) === "optional";
      d.write(`const ${I} = ${b(j)};`), _ ? d.write(`
        if (${I}.issues.length) {
          if (${x} in input) {
            payload.issues = payload.issues.concat(${I}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${x}, ...iss.path] : [${x}]
            })));
          }
        }
        
        if (${I}.value === undefined) {
          if (${x} in input) {
            newResult[${x}] = undefined;
          }
        } else {
          newResult[${x}] = ${I}.value;
        }
        
      `) : d.write(`
        if (${I}.issues.length) {
          payload.issues = payload.issues.concat(${I}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${x}, ...iss.path] : [${x}]
          })));
        }
        
        if (${I}.value === undefined) {
          if (${x} in input) {
            newResult[${x}] = undefined;
          }
        } else {
          newResult[${x}] = ${I}.value;
        }
        
      `);
    }
    d.write("payload.value = newResult;"), d.write("return payload;");
    const Z = d.compile();
    return (j, I) => Z(g, j, I);
  };
  let i;
  const s = de, c = !dt.jitless, a = c && Ht.value, f = t.catchall;
  let p;
  e._zod.parse = (g, d) => {
    p ?? (p = r.value);
    const v = g.value;
    return s(v) ? c && a && (d == null ? void 0 : d.async) === !1 && d.jitless !== !0 ? (i || (i = o(t.shape)), g = i(g, d), f ? Nt([], v, g, d, p, e) : g) : n(g, d) : (g.issues.push({
      expected: "object",
      code: "invalid_type",
      input: v,
      inst: e
    }), g);
  };
});
function Le(e, t, n, r) {
  for (const i of e)
    if (i.issues.length === 0)
      return t.value = i.value, t;
  const o = e.filter((i) => !Y(i));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((i) => i.issues.map((s) => V(s, r, L())))
  }), t);
}
const Cr = /* @__PURE__ */ l("$ZodUnion", (e, t) => {
  S.init(e, t), y(e._zod, "optin", () => t.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0), y(e._zod, "optout", () => t.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), y(e._zod, "values", () => {
    if (t.options.every((o) => o._zod.values))
      return new Set(t.options.flatMap((o) => Array.from(o._zod.values)));
  }), y(e._zod, "pattern", () => {
    if (t.options.every((o) => o._zod.pattern)) {
      const o = t.options.map((i) => i._zod.pattern);
      return new RegExp(`^(${o.map((i) => Ie(i.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1, r = t.options[0]._zod.run;
  e._zod.parse = (o, i) => {
    if (n)
      return r(o, i);
    let s = !1;
    const c = [];
    for (const u of t.options) {
      const a = u._zod.run({
        value: o.value,
        issues: []
      }, i);
      if (a instanceof Promise)
        c.push(a), s = !0;
      else {
        if (a.issues.length === 0)
          return a;
        c.push(a);
      }
    }
    return s ? Promise.all(c).then((u) => Le(u, o, e, i)) : Le(c, o, e, i);
  };
}), Rr = /* @__PURE__ */ l("$ZodIntersection", (e, t) => {
  S.init(e, t), e._zod.parse = (n, r) => {
    const o = n.value, i = t.left._zod.run({ value: o, issues: [] }, r), s = t.right._zod.run({ value: o, issues: [] }, r);
    return i instanceof Promise || s instanceof Promise ? Promise.all([i, s]).then(([u, a]) => Ve(n, u, a)) : Ve(n, i, s);
  };
});
function Ee(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (oe(e) && oe(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((i) => n.indexOf(i) !== -1), o = { ...e, ...t };
    for (const i of r) {
      const s = Ee(e[i], t[i]);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [i, ...s.mergeErrorPath]
        };
      o[i] = s.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const o = e[r], i = t[r], s = Ee(o, i);
      if (!s.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...s.mergeErrorPath]
        };
      n.push(s.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Ve(e, t, n) {
  const r = /* @__PURE__ */ new Map();
  let o;
  for (const c of t.issues)
    if (c.code === "unrecognized_keys") {
      o ?? (o = c);
      for (const u of c.keys)
        r.has(u) || r.set(u, {}), r.get(u).l = !0;
    } else
      e.issues.push(c);
  for (const c of n.issues)
    if (c.code === "unrecognized_keys")
      for (const u of c.keys)
        r.has(u) || r.set(u, {}), r.get(u).r = !0;
    else
      e.issues.push(c);
  const i = [...r].filter(([, c]) => c.l && c.r).map(([c]) => c);
  if (i.length && o && e.issues.push({ ...o, keys: i }), Y(e))
    return e;
  const s = Ee(t.value, n.value);
  if (!s.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);
  return e.value = s.data, e;
}
const Dr = /* @__PURE__ */ l("$ZodEnum", (e, t) => {
  S.init(e, t);
  const n = pt(t.entries), r = new Set(n);
  e._zod.values = r, e._zod.pattern = new RegExp(`^(${n.filter((o) => qt.has(typeof o)).map((o) => typeof o == "string" ? _e(o) : o.toString()).join("|")})$`), e._zod.parse = (o, i) => {
    const s = o.value;
    return r.has(s) || o.issues.push({
      code: "invalid_value",
      values: n,
      input: s,
      inst: e
    }), o;
  };
}), Ur = /* @__PURE__ */ l("$ZodTransform", (e, t) => {
  S.init(e, t), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new ft(e.constructor.name);
    const o = t.transform(n.value, n);
    if (r.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((s) => (n.value = s, n));
    if (o instanceof Promise)
      throw new H();
    return n.value = o, n;
  };
});
function Be(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const Tt = /* @__PURE__ */ l("$ZodOptional", (e, t) => {
  S.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", y(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), y(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${Ie(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (t.innerType._zod.optin === "optional") {
      const o = t.innerType._zod.run(n, r);
      return o instanceof Promise ? o.then((i) => Be(i, n.value)) : Be(o, n.value);
    }
    return n.value === void 0 ? n : t.innerType._zod.run(n, r);
  };
}), Fr = /* @__PURE__ */ l("$ZodExactOptional", (e, t) => {
  Tt.init(e, t), y(e._zod, "values", () => t.innerType._zod.values), y(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (n, r) => t.innerType._zod.run(n, r);
}), Mr = /* @__PURE__ */ l("$ZodNullable", (e, t) => {
  S.init(e, t), y(e._zod, "optin", () => t.innerType._zod.optin), y(e._zod, "optout", () => t.innerType._zod.optout), y(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${Ie(n.source)}|null)$`) : void 0;
  }), y(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), Jr = /* @__PURE__ */ l("$ZodDefault", (e, t) => {
  S.init(e, t), e._zod.optin = "optional", y(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => Ge(i, t)) : Ge(o, t);
  };
});
function Ge(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const Lr = /* @__PURE__ */ l("$ZodPrefault", (e, t) => {
  S.init(e, t), e._zod.optin = "optional", y(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), Vr = /* @__PURE__ */ l("$ZodNonOptional", (e, t) => {
  S.init(e, t), y(e._zod, "values", () => {
    const n = t.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => We(i, e)) : We(o, e);
  };
});
function We(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const Br = /* @__PURE__ */ l("$ZodCatch", (e, t) => {
  S.init(e, t), y(e._zod, "optin", () => t.innerType._zod.optin), y(e._zod, "optout", () => t.innerType._zod.optout), y(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => (n.value = i.value, i.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: i.issues.map((s) => V(s, r, L()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = o.value, o.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: o.issues.map((i) => V(i, r, L()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), Gr = /* @__PURE__ */ l("$ZodPipe", (e, t) => {
  S.init(e, t), y(e._zod, "values", () => t.in._zod.values), y(e._zod, "optin", () => t.in._zod.optin), y(e._zod, "optout", () => t.out._zod.optout), y(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const i = t.out._zod.run(n, r);
      return i instanceof Promise ? i.then((s) => ue(s, t.in, r)) : ue(i, t.in, r);
    }
    const o = t.in._zod.run(n, r);
    return o instanceof Promise ? o.then((i) => ue(i, t.out, r)) : ue(o, t.out, r);
  };
});
function ue(e, t, n) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const Wr = /* @__PURE__ */ l("$ZodReadonly", (e, t) => {
  S.init(e, t), y(e._zod, "propValues", () => t.innerType._zod.propValues), y(e._zod, "values", () => t.innerType._zod.values), y(e._zod, "optin", () => {
    var n, r;
    return (r = (n = t.innerType) == null ? void 0 : n._zod) == null ? void 0 : r.optin;
  }), y(e._zod, "optout", () => {
    var n, r;
    return (r = (n = t.innerType) == null ? void 0 : n._zod) == null ? void 0 : r.optout;
  }), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const o = t.innerType._zod.run(n, r);
    return o instanceof Promise ? o.then(Ke) : Ke(o);
  };
});
function Ke(e) {
  return e.value = Object.freeze(e.value), e;
}
const Kr = /* @__PURE__ */ l("$ZodCustom", (e, t) => {
  A.init(e, t), S.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
    const r = n.value, o = t.fn(r);
    if (o instanceof Promise)
      return o.then((i) => Ye(i, n, r, e));
    Ye(o, n, r, e);
  };
});
function Ye(e, t, n, r) {
  if (!e) {
    const o = {
      code: "custom",
      input: n,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (o.params = r._zod.def.params), t.issues.push(ie(o));
  }
}
var He;
class Yr {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...n) {
    const r = n[0];
    return this._map.set(t, r), r && typeof r == "object" && "id" in r && this._idmap.set(r.id, t), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const n = this._map.get(t);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(t), this;
  }
  get(t) {
    const n = t._zod.parent;
    if (n) {
      const r = { ...this.get(n) ?? {} };
      delete r.id;
      const o = { ...r, ...this._map.get(t) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function Hr() {
  return new Yr();
}
(He = globalThis).__zod_globalRegistry ?? (He.__zod_globalRegistry = Hr());
const ne = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function qr(e, t) {
  return new e({
    type: "string",
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Xr(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function qe(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Qr(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function eo(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function to(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function no(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ro(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function oo(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function io(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function so(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function co(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function uo(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ao(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function lo(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function fo(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function po(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ho(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function mo(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function go(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function _o(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function vo(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function bo(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function yo(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function zo(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function wo(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ko(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function $o(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Zo(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Eo(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function So(e, t) {
  return new e({
    type: "never",
    ...h(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Xe(e, t) {
  return new $t({
    check: "less_than",
    ...h(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function ze(e, t) {
  return new $t({
    check: "less_than",
    ...h(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Qe(e, t) {
  return new Zt({
    check: "greater_than",
    ...h(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function we(e, t) {
  return new Zt({
    check: "greater_than",
    ...h(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function et(e, t) {
  return new Bn({
    check: "multiple_of",
    ...h(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function It(e, t) {
  return new Wn({
    check: "max_length",
    ...h(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function he(e, t) {
  return new Kn({
    check: "min_length",
    ...h(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Pt(e, t) {
  return new Yn({
    check: "length_equals",
    ...h(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function Oo(e, t) {
  return new Hn({
    check: "string_format",
    format: "regex",
    ...h(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function No(e) {
  return new qn({
    check: "string_format",
    format: "lowercase",
    ...h(e)
  });
}
// @__NO_SIDE_EFFECTS__
function To(e) {
  return new Xn({
    check: "string_format",
    format: "uppercase",
    ...h(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Io(e, t) {
  return new Qn({
    check: "string_format",
    format: "includes",
    ...h(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function Po(e, t) {
  return new er({
    check: "string_format",
    format: "starts_with",
    ...h(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function Ao(e, t) {
  return new tr({
    check: "string_format",
    format: "ends_with",
    ...h(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function q(e) {
  return new nr({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function xo(e) {
  return /* @__PURE__ */ q((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function jo() {
  return /* @__PURE__ */ q((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Co() {
  return /* @__PURE__ */ q((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Ro() {
  return /* @__PURE__ */ q((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Do() {
  return /* @__PURE__ */ q((e) => Yt(e));
}
// @__NO_SIDE_EFFECTS__
function Uo(e, t, n) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...h(n)
  });
}
// @__NO_SIDE_EFFECTS__
function Fo(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...h(n)
  });
}
// @__NO_SIDE_EFFECTS__
function Mo(e) {
  const t = /* @__PURE__ */ Jo((n) => (n.addIssue = (r) => {
    if (typeof r == "string")
      n.issues.push(ie(r, n.value, t._zod.def));
    else {
      const o = r;
      o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = n.value), o.inst ?? (o.inst = t), o.continue ?? (o.continue = !t._zod.def.abort), n.issues.push(ie(o));
    }
  }, e(n.value, n)));
  return t;
}
// @__NO_SIDE_EFFECTS__
function Jo(e, t) {
  const n = new A({
    check: "custom",
    ...h(t)
  });
  return n._zod.check = e, n;
}
function At(e) {
  let t = (e == null ? void 0 : e.target) ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: (e == null ? void 0 : e.metadata) ?? ne,
    target: t,
    unrepresentable: (e == null ? void 0 : e.unrepresentable) ?? "throw",
    override: (e == null ? void 0 : e.override) ?? (() => {
    }),
    io: (e == null ? void 0 : e.io) ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: (e == null ? void 0 : e.cycles) ?? "ref",
    reused: (e == null ? void 0 : e.reused) ?? "inline",
    external: (e == null ? void 0 : e.external) ?? void 0
  };
}
function T(e, t, n = { path: [], schemaPath: [] }) {
  var f, p;
  var r;
  const o = e._zod.def, i = t.seen.get(e);
  if (i)
    return i.count++, n.schemaPath.includes(e) && (i.cycle = n.path), i.schema;
  const s = { schema: {}, count: 1, cycle: void 0, path: n.path };
  t.seen.set(e, s);
  const c = (p = (f = e._zod).toJSONSchema) == null ? void 0 : p.call(f);
  if (c)
    s.schema = c;
  else {
    const g = {
      ...n,
      schemaPath: [...n.schemaPath, e],
      path: n.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, s.schema, g);
    else {
      const v = s.schema, b = t.processors[o.type];
      if (!b)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);
      b(e, t, v, g);
    }
    const d = e._zod.parent;
    d && (s.ref || (s.ref = d), T(d, t, g), t.seen.get(d).isParent = !0);
  }
  const u = t.metadataRegistry.get(e);
  return u && Object.assign(s.schema, u), t.io === "input" && P(e) && (delete s.schema.examples, delete s.schema.default), t.io === "input" && s.schema._prefault && ((r = s.schema).default ?? (r.default = s.schema._prefault)), delete s.schema._prefault, t.seen.get(e).schema;
}
function xt(e, t) {
  var s, c, u, a;
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = /* @__PURE__ */ new Map();
  for (const f of e.seen.entries()) {
    const p = (s = e.metadataRegistry.get(f[0])) == null ? void 0 : s.id;
    if (p) {
      const g = r.get(p);
      if (g && g !== f[0])
        throw new Error(`Duplicate schema id "${p}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      r.set(p, f[0]);
    }
  }
  const o = (f) => {
    var b;
    const p = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const $ = (b = e.external.registry.get(f[0])) == null ? void 0 : b.id, R = e.external.uri ?? ((G) => G);
      if ($)
        return { ref: R($) };
      const Z = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
      return f[1].defId = Z, { defId: Z, ref: `${R("__shared")}#/${p}/${Z}` };
    }
    if (f[1] === n)
      return { ref: "#" };
    const d = `#/${p}/`, v = f[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: v, ref: d + v };
  }, i = (f) => {
    if (f[1].schema.$ref)
      return;
    const p = f[1], { ref: g, defId: d } = o(f);
    p.def = { ...p.schema }, d && (p.defId = d);
    const v = p.schema;
    for (const b in v)
      delete v[b];
    v.$ref = g;
  };
  if (e.cycles === "throw")
    for (const f of e.seen.entries()) {
      const p = f[1];
      if (p.cycle)
        throw new Error(`Cycle detected: #/${(c = p.cycle) == null ? void 0 : c.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const f of e.seen.entries()) {
    const p = f[1];
    if (t === f[0]) {
      i(f);
      continue;
    }
    if (e.external) {
      const d = (u = e.external.registry.get(f[0])) == null ? void 0 : u.id;
      if (t !== f[0] && d) {
        i(f);
        continue;
      }
    }
    if ((a = e.metadataRegistry.get(f[0])) == null ? void 0 : a.id) {
      i(f);
      continue;
    }
    if (p.cycle) {
      i(f);
      continue;
    }
    if (p.count > 1 && e.reused === "ref") {
      i(f);
      continue;
    }
  }
}
function jt(e, t) {
  var s, c, u;
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (a) => {
    const f = e.seen.get(a);
    if (f.ref === null)
      return;
    const p = f.def ?? f.schema, g = { ...p }, d = f.ref;
    if (f.ref = null, d) {
      r(d);
      const b = e.seen.get(d), $ = b.schema;
      if ($.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (p.allOf = p.allOf ?? [], p.allOf.push($)) : Object.assign(p, $), Object.assign(p, g), a._zod.parent === d)
        for (const Z in p)
          Z === "$ref" || Z === "allOf" || Z in g || delete p[Z];
      if ($.$ref && b.def)
        for (const Z in p)
          Z === "$ref" || Z === "allOf" || Z in b.def && JSON.stringify(p[Z]) === JSON.stringify(b.def[Z]) && delete p[Z];
    }
    const v = a._zod.parent;
    if (v && v !== d) {
      r(v);
      const b = e.seen.get(v);
      if (b != null && b.schema.$ref && (p.$ref = b.schema.$ref, b.def))
        for (const $ in p)
          $ === "$ref" || $ === "allOf" || $ in b.def && JSON.stringify(p[$]) === JSON.stringify(b.def[$]) && delete p[$];
    }
    e.override({
      zodSchema: a,
      jsonSchema: p,
      path: f.path ?? []
    });
  };
  for (const a of [...e.seen.entries()].reverse())
    r(a[0]);
  const o = {};
  if (e.target === "draft-2020-12" ? o.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? o.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? o.$schema = "http://json-schema.org/draft-04/schema#" : e.target, (s = e.external) != null && s.uri) {
    const a = (c = e.external.registry.get(t)) == null ? void 0 : c.id;
    if (!a)
      throw new Error("Schema is missing an `id` property");
    o.$id = e.external.uri(a);
  }
  Object.assign(o, n.def ?? n.schema);
  const i = ((u = e.external) == null ? void 0 : u.defs) ?? {};
  for (const a of e.seen.entries()) {
    const f = a[1];
    f.def && f.defId && (i[f.defId] = f.def);
  }
  e.external || Object.keys(i).length > 0 && (e.target === "draft-2020-12" ? o.$defs = i : o.definitions = i);
  try {
    const a = JSON.parse(JSON.stringify(o));
    return Object.defineProperty(a, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: me(t, "input", e.processors),
          output: me(t, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), a;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function P(e, t) {
  const n = t ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(e))
    return !1;
  n.seen.add(e);
  const r = e._zod.def;
  if (r.type === "transform")
    return !0;
  if (r.type === "array")
    return P(r.element, n);
  if (r.type === "set")
    return P(r.valueType, n);
  if (r.type === "lazy")
    return P(r.getter(), n);
  if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault")
    return P(r.innerType, n);
  if (r.type === "intersection")
    return P(r.left, n) || P(r.right, n);
  if (r.type === "record" || r.type === "map")
    return P(r.keyType, n) || P(r.valueType, n);
  if (r.type === "pipe")
    return P(r.in, n) || P(r.out, n);
  if (r.type === "object") {
    for (const o in r.shape)
      if (P(r.shape[o], n))
        return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const o of r.options)
      if (P(o, n))
        return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const o of r.items)
      if (P(o, n))
        return !0;
    return !!(r.rest && P(r.rest, n));
  }
  return !1;
}
const Lo = (e, t = {}) => (n) => {
  const r = At({ ...n, processors: t });
  return T(e, r), xt(r, e), jt(r, e);
}, me = (e, t, n = {}) => (r) => {
  const { libraryOptions: o, target: i } = r ?? {}, s = At({ ...o ?? {}, target: i, io: t, processors: n });
  return T(e, s), xt(s, e), jt(s, e);
}, Vo = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, Bo = (e, t, n, r) => {
  const o = n;
  o.type = "string";
  const { minimum: i, maximum: s, format: c, patterns: u, contentEncoding: a } = e._zod.bag;
  if (typeof i == "number" && (o.minLength = i), typeof s == "number" && (o.maxLength = s), c && (o.format = Vo[c] ?? c, o.format === "" && delete o.format, c === "time" && delete o.format), a && (o.contentEncoding = a), u && u.size > 0) {
    const f = [...u];
    f.length === 1 ? o.pattern = f[0].source : f.length > 1 && (o.allOf = [
      ...f.map((p) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: p.source
      }))
    ]);
  }
}, Go = (e, t, n, r) => {
  const o = n, { minimum: i, maximum: s, format: c, multipleOf: u, exclusiveMaximum: a, exclusiveMinimum: f } = e._zod.bag;
  typeof c == "string" && c.includes("int") ? o.type = "integer" : o.type = "number", typeof f == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (o.minimum = f, o.exclusiveMinimum = !0) : o.exclusiveMinimum = f), typeof i == "number" && (o.minimum = i, typeof f == "number" && t.target !== "draft-04" && (f >= i ? delete o.minimum : delete o.exclusiveMinimum)), typeof a == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (o.maximum = a, o.exclusiveMaximum = !0) : o.exclusiveMaximum = a), typeof s == "number" && (o.maximum = s, typeof a == "number" && t.target !== "draft-04" && (a <= s ? delete o.maximum : delete o.exclusiveMaximum)), typeof u == "number" && (o.multipleOf = u);
}, Wo = (e, t, n, r) => {
  n.not = {};
}, Ko = (e, t, n, r) => {
}, Yo = (e, t, n, r) => {
  const o = e._zod.def, i = pt(o.entries);
  i.every((s) => typeof s == "number") && (n.type = "number"), i.every((s) => typeof s == "string") && (n.type = "string"), n.enum = i;
}, Ho = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, qo = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, Xo = (e, t, n, r) => {
  const o = n, i = e._zod.def, { minimum: s, maximum: c } = e._zod.bag;
  typeof s == "number" && (o.minItems = s), typeof c == "number" && (o.maxItems = c), o.type = "array", o.items = T(i.element, t, { ...r, path: [...r.path, "items"] });
}, Qo = (e, t, n, r) => {
  var a;
  const o = n, i = e._zod.def;
  o.type = "object", o.properties = {};
  const s = i.shape;
  for (const f in s)
    o.properties[f] = T(s[f], t, {
      ...r,
      path: [...r.path, "properties", f]
    });
  const c = new Set(Object.keys(s)), u = new Set([...c].filter((f) => {
    const p = i.shape[f]._zod;
    return t.io === "input" ? p.optin === void 0 : p.optout === void 0;
  }));
  u.size > 0 && (o.required = Array.from(u)), ((a = i.catchall) == null ? void 0 : a._zod.def.type) === "never" ? o.additionalProperties = !1 : i.catchall ? i.catchall && (o.additionalProperties = T(i.catchall, t, {
    ...r,
    path: [...r.path, "additionalProperties"]
  })) : t.io === "output" && (o.additionalProperties = !1);
}, ei = (e, t, n, r) => {
  const o = e._zod.def, i = o.inclusive === !1, s = o.options.map((c, u) => T(c, t, {
    ...r,
    path: [...r.path, i ? "oneOf" : "anyOf", u]
  }));
  i ? n.oneOf = s : n.anyOf = s;
}, ti = (e, t, n, r) => {
  const o = e._zod.def, i = T(o.left, t, {
    ...r,
    path: [...r.path, "allOf", 0]
  }), s = T(o.right, t, {
    ...r,
    path: [...r.path, "allOf", 1]
  }), c = (a) => "allOf" in a && Object.keys(a).length === 1, u = [
    ...c(i) ? i.allOf : [i],
    ...c(s) ? s.allOf : [s]
  ];
  n.allOf = u;
}, ni = (e, t, n, r) => {
  const o = e._zod.def, i = T(o.innerType, t, r), s = t.seen.get(e);
  t.target === "openapi-3.0" ? (s.ref = o.innerType, n.nullable = !0) : n.anyOf = [i, { type: "null" }];
}, ri = (e, t, n, r) => {
  const o = e._zod.def;
  T(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
}, oi = (e, t, n, r) => {
  const o = e._zod.def;
  T(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType, n.default = JSON.parse(JSON.stringify(o.defaultValue));
}, ii = (e, t, n, r) => {
  const o = e._zod.def;
  T(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(o.defaultValue)));
}, si = (e, t, n, r) => {
  const o = e._zod.def;
  T(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
  let s;
  try {
    s = o.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  n.default = s;
}, ci = (e, t, n, r) => {
  const o = e._zod.def, i = t.io === "input" ? o.in._zod.def.type === "transform" ? o.out : o.in : o.out;
  T(i, t, r);
  const s = t.seen.get(e);
  s.ref = i;
}, ui = (e, t, n, r) => {
  const o = e._zod.def;
  T(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType, n.readOnly = !0;
}, Ct = (e, t, n, r) => {
  const o = e._zod.def;
  T(o.innerType, t, r);
  const i = t.seen.get(e);
  i.ref = o.innerType;
}, ai = /* @__PURE__ */ l("ZodISODateTime", (e, t) => {
  gr.init(e, t), k.init(e, t);
});
function li(e) {
  return /* @__PURE__ */ yo(ai, e);
}
const fi = /* @__PURE__ */ l("ZodISODate", (e, t) => {
  _r.init(e, t), k.init(e, t);
});
function di(e) {
  return /* @__PURE__ */ zo(fi, e);
}
const pi = /* @__PURE__ */ l("ZodISOTime", (e, t) => {
  vr.init(e, t), k.init(e, t);
});
function hi(e) {
  return /* @__PURE__ */ wo(pi, e);
}
const mi = /* @__PURE__ */ l("ZodISODuration", (e, t) => {
  br.init(e, t), k.init(e, t);
});
function gi(e) {
  return /* @__PURE__ */ ko(mi, e);
}
const _i = (e, t) => {
  vt.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (n) => an(e, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => un(e, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        e.issues.push(n), e.message = JSON.stringify(e.issues, Ze, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, Ze, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return e.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, C = l("ZodError", _i, {
  Parent: Error
}), vi = /* @__PURE__ */ Ae(C), bi = /* @__PURE__ */ xe(C), yi = /* @__PURE__ */ ve(C), zi = /* @__PURE__ */ be(C), wi = /* @__PURE__ */ dn(C), ki = /* @__PURE__ */ pn(C), $i = /* @__PURE__ */ hn(C), Zi = /* @__PURE__ */ mn(C), Ei = /* @__PURE__ */ gn(C), Si = /* @__PURE__ */ _n(C), Oi = /* @__PURE__ */ vn(C), Ni = /* @__PURE__ */ bn(C), O = /* @__PURE__ */ l("ZodType", (e, t) => (S.init(e, t), Object.assign(e["~standard"], {
  jsonSchema: {
    input: me(e, "input"),
    output: me(e, "output")
  }
}), e.toJSONSchema = Lo(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(U(t, {
  checks: [
    ...t.checks ?? [],
    ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
}), {
  parent: !0
}), e.with = e.check, e.clone = (n, r) => F(e, n, r), e.brand = () => e, e.register = (n, r) => (n.add(e, r), e), e.parse = (n, r) => vi(e, n, r, { callee: e.parse }), e.safeParse = (n, r) => yi(e, n, r), e.parseAsync = async (n, r) => bi(e, n, r, { callee: e.parseAsync }), e.safeParseAsync = async (n, r) => zi(e, n, r), e.spa = e.safeParseAsync, e.encode = (n, r) => wi(e, n, r), e.decode = (n, r) => ki(e, n, r), e.encodeAsync = async (n, r) => $i(e, n, r), e.decodeAsync = async (n, r) => Zi(e, n, r), e.safeEncode = (n, r) => Ei(e, n, r), e.safeDecode = (n, r) => Si(e, n, r), e.safeEncodeAsync = async (n, r) => Oi(e, n, r), e.safeDecodeAsync = async (n, r) => Ni(e, n, r), e.refine = (n, r) => e.check(ws(n, r)), e.superRefine = (n) => e.check(ks(n)), e.overwrite = (n) => e.check(/* @__PURE__ */ q(n)), e.optional = () => ot(e), e.exactOptional = () => as(e), e.nullable = () => it(e), e.nullish = () => ot(it(e)), e.nonoptional = (n) => ms(e, n), e.array = () => ge(e), e.or = (n) => rs([e, n]), e.and = (n) => is(e, n), e.transform = (n) => st(e, cs(n)), e.default = (n) => ds(e, n), e.prefault = (n) => hs(e, n), e.catch = (n) => _s(e, n), e.pipe = (n) => st(e, n), e.readonly = () => ys(e), e.describe = (n) => {
  const r = e.clone();
  return ne.add(r, { description: n }), r;
}, Object.defineProperty(e, "description", {
  get() {
    var n;
    return (n = ne.get(e)) == null ? void 0 : n.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return ne.get(e);
  const r = e.clone();
  return ne.add(r, n[0]), r;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e.apply = (n) => n(e), e)), Rt = /* @__PURE__ */ l("_ZodString", (e, t) => {
  je.init(e, t), O.init(e, t), e._zod.processJSONSchema = (r, o, i) => Bo(e, r, o);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...r) => e.check(/* @__PURE__ */ Oo(...r)), e.includes = (...r) => e.check(/* @__PURE__ */ Io(...r)), e.startsWith = (...r) => e.check(/* @__PURE__ */ Po(...r)), e.endsWith = (...r) => e.check(/* @__PURE__ */ Ao(...r)), e.min = (...r) => e.check(/* @__PURE__ */ he(...r)), e.max = (...r) => e.check(/* @__PURE__ */ It(...r)), e.length = (...r) => e.check(/* @__PURE__ */ Pt(...r)), e.nonempty = (...r) => e.check(/* @__PURE__ */ he(1, ...r)), e.lowercase = (r) => e.check(/* @__PURE__ */ No(r)), e.uppercase = (r) => e.check(/* @__PURE__ */ To(r)), e.trim = () => e.check(/* @__PURE__ */ jo()), e.normalize = (...r) => e.check(/* @__PURE__ */ xo(...r)), e.toLowerCase = () => e.check(/* @__PURE__ */ Co()), e.toUpperCase = () => e.check(/* @__PURE__ */ Ro()), e.slugify = () => e.check(/* @__PURE__ */ Do());
}), Ti = /* @__PURE__ */ l("ZodString", (e, t) => {
  je.init(e, t), Rt.init(e, t), e.email = (n) => e.check(/* @__PURE__ */ Xr(Pi, n)), e.url = (n) => e.check(/* @__PURE__ */ ro(Ai, n)), e.jwt = (n) => e.check(/* @__PURE__ */ bo(Ki, n)), e.emoji = (n) => e.check(/* @__PURE__ */ oo(xi, n)), e.guid = (n) => e.check(/* @__PURE__ */ qe(tt, n)), e.uuid = (n) => e.check(/* @__PURE__ */ Qr(ae, n)), e.uuidv4 = (n) => e.check(/* @__PURE__ */ eo(ae, n)), e.uuidv6 = (n) => e.check(/* @__PURE__ */ to(ae, n)), e.uuidv7 = (n) => e.check(/* @__PURE__ */ no(ae, n)), e.nanoid = (n) => e.check(/* @__PURE__ */ io(ji, n)), e.guid = (n) => e.check(/* @__PURE__ */ qe(tt, n)), e.cuid = (n) => e.check(/* @__PURE__ */ so(Ci, n)), e.cuid2 = (n) => e.check(/* @__PURE__ */ co(Ri, n)), e.ulid = (n) => e.check(/* @__PURE__ */ uo(Di, n)), e.base64 = (n) => e.check(/* @__PURE__ */ go(Bi, n)), e.base64url = (n) => e.check(/* @__PURE__ */ _o(Gi, n)), e.xid = (n) => e.check(/* @__PURE__ */ ao(Ui, n)), e.ksuid = (n) => e.check(/* @__PURE__ */ lo(Fi, n)), e.ipv4 = (n) => e.check(/* @__PURE__ */ fo(Mi, n)), e.ipv6 = (n) => e.check(/* @__PURE__ */ po(Ji, n)), e.cidrv4 = (n) => e.check(/* @__PURE__ */ ho(Li, n)), e.cidrv6 = (n) => e.check(/* @__PURE__ */ mo(Vi, n)), e.e164 = (n) => e.check(/* @__PURE__ */ vo(Wi, n)), e.datetime = (n) => e.check(li(n)), e.date = (n) => e.check(di(n)), e.time = (n) => e.check(hi(n)), e.duration = (n) => e.check(gi(n));
});
function Ii(e) {
  return /* @__PURE__ */ qr(Ti, e);
}
const k = /* @__PURE__ */ l("ZodStringFormat", (e, t) => {
  w.init(e, t), Rt.init(e, t);
}), Pi = /* @__PURE__ */ l("ZodEmail", (e, t) => {
  cr.init(e, t), k.init(e, t);
}), tt = /* @__PURE__ */ l("ZodGUID", (e, t) => {
  ir.init(e, t), k.init(e, t);
}), ae = /* @__PURE__ */ l("ZodUUID", (e, t) => {
  sr.init(e, t), k.init(e, t);
}), Ai = /* @__PURE__ */ l("ZodURL", (e, t) => {
  ur.init(e, t), k.init(e, t);
}), xi = /* @__PURE__ */ l("ZodEmoji", (e, t) => {
  ar.init(e, t), k.init(e, t);
}), ji = /* @__PURE__ */ l("ZodNanoID", (e, t) => {
  lr.init(e, t), k.init(e, t);
}), Ci = /* @__PURE__ */ l("ZodCUID", (e, t) => {
  fr.init(e, t), k.init(e, t);
}), Ri = /* @__PURE__ */ l("ZodCUID2", (e, t) => {
  dr.init(e, t), k.init(e, t);
}), Di = /* @__PURE__ */ l("ZodULID", (e, t) => {
  pr.init(e, t), k.init(e, t);
}), Ui = /* @__PURE__ */ l("ZodXID", (e, t) => {
  hr.init(e, t), k.init(e, t);
}), Fi = /* @__PURE__ */ l("ZodKSUID", (e, t) => {
  mr.init(e, t), k.init(e, t);
}), Mi = /* @__PURE__ */ l("ZodIPv4", (e, t) => {
  yr.init(e, t), k.init(e, t);
}), Ji = /* @__PURE__ */ l("ZodIPv6", (e, t) => {
  zr.init(e, t), k.init(e, t);
}), Li = /* @__PURE__ */ l("ZodCIDRv4", (e, t) => {
  wr.init(e, t), k.init(e, t);
}), Vi = /* @__PURE__ */ l("ZodCIDRv6", (e, t) => {
  kr.init(e, t), k.init(e, t);
}), Bi = /* @__PURE__ */ l("ZodBase64", (e, t) => {
  $r.init(e, t), k.init(e, t);
}), Gi = /* @__PURE__ */ l("ZodBase64URL", (e, t) => {
  Er.init(e, t), k.init(e, t);
}), Wi = /* @__PURE__ */ l("ZodE164", (e, t) => {
  Sr.init(e, t), k.init(e, t);
}), Ki = /* @__PURE__ */ l("ZodJWT", (e, t) => {
  Nr.init(e, t), k.init(e, t);
}), Dt = /* @__PURE__ */ l("ZodNumber", (e, t) => {
  St.init(e, t), O.init(e, t), e._zod.processJSONSchema = (r, o, i) => Go(e, r, o), e.gt = (r, o) => e.check(/* @__PURE__ */ Qe(r, o)), e.gte = (r, o) => e.check(/* @__PURE__ */ we(r, o)), e.min = (r, o) => e.check(/* @__PURE__ */ we(r, o)), e.lt = (r, o) => e.check(/* @__PURE__ */ Xe(r, o)), e.lte = (r, o) => e.check(/* @__PURE__ */ ze(r, o)), e.max = (r, o) => e.check(/* @__PURE__ */ ze(r, o)), e.int = (r) => e.check(nt(r)), e.safe = (r) => e.check(nt(r)), e.positive = (r) => e.check(/* @__PURE__ */ Qe(0, r)), e.nonnegative = (r) => e.check(/* @__PURE__ */ we(0, r)), e.negative = (r) => e.check(/* @__PURE__ */ Xe(0, r)), e.nonpositive = (r) => e.check(/* @__PURE__ */ ze(0, r)), e.multipleOf = (r, o) => e.check(/* @__PURE__ */ et(r, o)), e.step = (r, o) => e.check(/* @__PURE__ */ et(r, o)), e.finite = () => e;
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
});
function re(e) {
  return /* @__PURE__ */ $o(Dt, e);
}
const Yi = /* @__PURE__ */ l("ZodNumberFormat", (e, t) => {
  Tr.init(e, t), Dt.init(e, t);
});
function nt(e) {
  return /* @__PURE__ */ Zo(Yi, e);
}
const Hi = /* @__PURE__ */ l("ZodUnknown", (e, t) => {
  Ir.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ko();
});
function rt() {
  return /* @__PURE__ */ Eo(Hi);
}
const qi = /* @__PURE__ */ l("ZodNever", (e, t) => {
  Pr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Wo(e, n, r);
});
function Xi(e) {
  return /* @__PURE__ */ So(qi, e);
}
const Qi = /* @__PURE__ */ l("ZodArray", (e, t) => {
  Ar.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Xo(e, n, r, o), e.element = t.element, e.min = (n, r) => e.check(/* @__PURE__ */ he(n, r)), e.nonempty = (n) => e.check(/* @__PURE__ */ he(1, n)), e.max = (n, r) => e.check(/* @__PURE__ */ It(n, r)), e.length = (n, r) => e.check(/* @__PURE__ */ Pt(n, r)), e.unwrap = () => e.element;
});
function ge(e, t) {
  return /* @__PURE__ */ Uo(Qi, e, t);
}
const es = /* @__PURE__ */ l("ZodObject", (e, t) => {
  jr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Qo(e, n, r, o), y(e, "shape", () => t.shape), e.keyof = () => Ut(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: rt() }), e.loose = () => e.clone({ ...e._zod.def, catchall: rt() }), e.strict = () => e.clone({ ...e._zod.def, catchall: Xi() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => nn(e, n), e.safeExtend = (n) => rn(e, n), e.merge = (n) => on(e, n), e.pick = (n) => en(e, n), e.omit = (n) => tn(e, n), e.partial = (...n) => sn(Ft, e, n[0]), e.required = (...n) => cn(Mt, e, n[0]);
});
function ts(e, t) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...h(t)
  };
  return new es(n);
}
const ns = /* @__PURE__ */ l("ZodUnion", (e, t) => {
  Cr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => ei(e, n, r, o), e.options = t.options;
});
function rs(e, t) {
  return new ns({
    type: "union",
    options: e,
    ...h(t)
  });
}
const os = /* @__PURE__ */ l("ZodIntersection", (e, t) => {
  Rr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => ti(e, n, r, o);
});
function is(e, t) {
  return new os({
    type: "intersection",
    left: e,
    right: t
  });
}
const Se = /* @__PURE__ */ l("ZodEnum", (e, t) => {
  Dr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (r, o, i) => Yo(e, r, o), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, o) => {
    const i = {};
    for (const s of r)
      if (n.has(s))
        i[s] = t.entries[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new Se({
      ...t,
      checks: [],
      ...h(o),
      entries: i
    });
  }, e.exclude = (r, o) => {
    const i = { ...t.entries };
    for (const s of r)
      if (n.has(s))
        delete i[s];
      else
        throw new Error(`Key ${s} not found in enum`);
    return new Se({
      ...t,
      checks: [],
      ...h(o),
      entries: i
    });
  };
});
function Ut(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new Se({
    type: "enum",
    entries: n,
    ...h(t)
  });
}
const ss = /* @__PURE__ */ l("ZodTransform", (e, t) => {
  Ur.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => qo(e, n), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new ft(e.constructor.name);
    n.addIssue = (i) => {
      if (typeof i == "string")
        n.issues.push(ie(i, n.value, t));
      else {
        const s = i;
        s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = n.value), s.inst ?? (s.inst = e), n.issues.push(ie(s));
      }
    };
    const o = t.transform(n.value, n);
    return o instanceof Promise ? o.then((i) => (n.value = i, n)) : (n.value = o, n);
  };
});
function cs(e) {
  return new ss({
    type: "transform",
    transform: e
  });
}
const Ft = /* @__PURE__ */ l("ZodOptional", (e, t) => {
  Tt.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ct(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function ot(e) {
  return new Ft({
    type: "optional",
    innerType: e
  });
}
const us = /* @__PURE__ */ l("ZodExactOptional", (e, t) => {
  Fr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ct(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function as(e) {
  return new us({
    type: "optional",
    innerType: e
  });
}
const ls = /* @__PURE__ */ l("ZodNullable", (e, t) => {
  Mr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => ni(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function it(e) {
  return new ls({
    type: "nullable",
    innerType: e
  });
}
const fs = /* @__PURE__ */ l("ZodDefault", (e, t) => {
  Jr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => oi(e, n, r, o), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function ds(e, t) {
  return new fs({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : mt(t);
    }
  });
}
const ps = /* @__PURE__ */ l("ZodPrefault", (e, t) => {
  Lr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => ii(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function hs(e, t) {
  return new ps({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : mt(t);
    }
  });
}
const Mt = /* @__PURE__ */ l("ZodNonOptional", (e, t) => {
  Vr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => ri(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function ms(e, t) {
  return new Mt({
    type: "nonoptional",
    innerType: e,
    ...h(t)
  });
}
const gs = /* @__PURE__ */ l("ZodCatch", (e, t) => {
  Br.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => si(e, n, r, o), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function _s(e, t) {
  return new gs({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const vs = /* @__PURE__ */ l("ZodPipe", (e, t) => {
  Gr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => ci(e, n, r, o), e.in = t.in, e.out = t.out;
});
function st(e, t) {
  return new vs({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const bs = /* @__PURE__ */ l("ZodReadonly", (e, t) => {
  Wr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => ui(e, n, r, o), e.unwrap = () => e._zod.def.innerType;
});
function ys(e) {
  return new bs({
    type: "readonly",
    innerType: e
  });
}
const zs = /* @__PURE__ */ l("ZodCustom", (e, t) => {
  Kr.init(e, t), O.init(e, t), e._zod.processJSONSchema = (n, r, o) => Ho(e, n);
});
function ws(e, t = {}) {
  return /* @__PURE__ */ Fo(zs, e, t);
}
function ks(e) {
  return /* @__PURE__ */ Mo(e);
}
const ke = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
], $s = [
  [5, 3, 0, 6, 0, 8, 9, 0, 2],
  [6, 0, 2, 0, 9, 0, 3, 4, 8],
  [0, 9, 8, 3, 0, 2, 0, 6, 7],
  [8, 5, 0, 7, 6, 1, 4, 0, 3],
  [4, 0, 6, 8, 5, 3, 7, 9, 0],
  [7, 1, 3, 0, 2, 4, 0, 5, 6],
  [9, 6, 0, 5, 3, 7, 2, 8, 4],
  [0, 8, 7, 4, 1, 9, 6, 0, 5],
  [3, 4, 5, 0, 8, 6, 1, 7, 0]
], Zs = [
  [0, 3, 0, 6, 0, 8, 0, 0, 2],
  [6, 0, 2, 0, 0, 0, 3, 4, 0],
  [0, 9, 0, 3, 0, 2, 0, 0, 7],
  [8, 5, 0, 0, 6, 1, 0, 0, 3],
  [0, 0, 6, 8, 0, 3, 7, 0, 0],
  [7, 0, 3, 0, 2, 0, 0, 5, 6],
  [9, 0, 0, 5, 0, 7, 0, 8, 0],
  [0, 8, 7, 0, 1, 0, 6, 0, 5],
  [3, 0, 0, 0, 8, 6, 0, 7, 0]
], Es = [
  [0, 0, 0, 6, 0, 0, 0, 0, 2],
  [0, 0, 2, 0, 0, 0, 3, 0, 0],
  [1, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 7, 6, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 9, 0],
  [0, 1, 0, 0, 2, 4, 0, 0, 0],
  [0, 0, 0, 5, 0, 0, 0, 0, 4],
  [0, 0, 7, 0, 0, 0, 6, 0, 0],
  [3, 0, 0, 0, 0, 6, 0, 0, 0]
], K = {
  easy: { puzzle: $s, solution: ke },
  medium: { puzzle: Zs, solution: ke },
  hard: { puzzle: Es, solution: ke }
};
function fe(e) {
  return e.map((t) => [...t]);
}
const ct = "tasks", Ss = "1.0.0", ut = "TASK_COUNT_CHANGED", Os = ge(ge(re().int().min(0).max(9)).length(9)).length(9), Ns = ts({
  id: Ii().min(1),
  difficulty: Ut(["easy", "medium", "hard"]),
  currentBoard: Os,
  bestTime: re().nonnegative().nullable(),
  elapsedTime: re().nonnegative(),
  createdAt: re().int().nonnegative(),
  updatedAt: re().int().nonnegative()
}), Jt = ge(Ns);
function $e(e) {
  const t = Date.now();
  return {
    id: `save-${t}-${Math.random().toString(36).slice(2, 7)}`,
    difficulty: e,
    currentBoard: fe(K[e].puzzle),
    bestTime: null,
    elapsedTime: 0,
    createdAt: t,
    updatedAt: t
  };
}
function at(e) {
  try {
    return JSON.stringify(e).slice(0, 180);
  } catch {
    return String(e).slice(0, 180);
  }
}
function Ts(e) {
  if (typeof e == "function")
    return e;
  if (e && typeof e == "object") {
    const t = e;
    if (typeof t.off == "function")
      return t.off;
    if (typeof t.cleanup == "function")
      return t.cleanup;
  }
  return () => {
  };
}
function Lt(e) {
  if (typeof e != "string")
    return e;
  try {
    return JSON.parse(e);
  } catch {
    return e;
  }
}
function Is(e, t) {
  const n = Lt(e), r = [{ value: n, path: t }];
  if (n && typeof n == "object" && !Array.isArray(n)) {
    const o = n;
    "data" in o && r.push({ value: o.data, path: `${t}.data` }), "value" in o && r.push({ value: o.value, path: `${t}.value` }), "payload" in o && r.push({ value: o.payload, path: `${t}.payload` }), "tasks" in o && r.push({ value: o.tasks, path: `${t}.tasks` });
  }
  return r;
}
function Ps(e) {
  const t = [{ value: e, path: "raw" }], n = /* @__PURE__ */ new Set(), r = at(e);
  for (; t.length > 0; ) {
    const o = t.shift();
    if (!o)
      break;
    const i = `${o.path}:${at(o.value)}`;
    if (n.has(i))
      continue;
    n.add(i);
    const s = Is(o.value, o.path);
    for (const c of s) {
      const u = Lt(c.value);
      if (Array.isArray(u)) {
        const a = Jt.safeParse(u);
        return a.success ? {
          tasks: a.data,
          source: "validated-array",
          extractedPath: c.path,
          preview: r
        } : {
          tasks: [],
          source: "invalid-array-downgrade",
          extractedPath: c.path,
          preview: r
        };
      }
      u && typeof u == "object" && t.push({ value: u, path: c.path });
    }
  }
  return {
    tasks: [],
    source: "not-array-downgrade",
    extractedPath: "none",
    preview: r
  };
}
function As(e) {
  return e.reduce((t, n) => t + n.filter((r) => r !== 0).length, 0);
}
function lt(e) {
  const t = /* @__PURE__ */ new Set(), n = (r) => {
    const o = /* @__PURE__ */ new Map();
    for (const i of r) {
      if (i.value === 0) continue;
      const s = o.get(i.value) ?? [];
      s.push({ row: i.row, col: i.col }), o.set(i.value, s);
    }
    o.forEach((i) => {
      if (i.length > 1)
        for (const s of i)
          t.add(`${s.row}-${s.col}`);
    });
  };
  for (let r = 0; r < 9; r += 1)
    n(e[r].map((o, i) => ({ row: r, col: i, value: o })));
  for (let r = 0; r < 9; r += 1) {
    const o = [];
    for (let i = 0; i < 9; i += 1)
      o.push({ row: i, col: r, value: e[i][r] });
    n(o);
  }
  for (let r = 0; r < 3; r += 1)
    for (let o = 0; o < 3; o += 1) {
      const i = [];
      for (let s = 0; s < 3; s += 1)
        for (let c = 0; c < 3; c += 1) {
          const u = r * 3 + s, a = o * 3 + c;
          i.push({ row: u, col: a, value: e[u][a] });
        }
      n(i);
    }
  return t;
}
function xs(e, t) {
  return e.every((n, r) => n.every((o, i) => o === t[r][i]));
}
function js({ context: e, registerCleanup: t }) {
  const [n, r] = X([]), [o, i] = X(null), [s, c] = X(!1), [u, a] = X("載入中..."), [f, p] = X(/* @__PURE__ */ new Set()), g = Gt(!0), d = De(
    () => n.find((m) => m.id === o) ?? n[0] ?? null,
    [n, o]
  ), v = (d == null ? void 0 : d.currentBoard) ?? fe(K.easy.puzzle), b = d ? K[d.difficulty].solution : K.easy.solution, $ = De(
    () => d ? K[d.difficulty].puzzle.map((m) => m.map((_) => _ !== 0)) : [],
    [d]
  ), R = d ? xs(v, b) && lt(v).size === 0 : !1;
  W(() => {
    const m = Ts(
      e.eventBus.on(ut, (_) => {
        typeof _ == "number" && a(`存檔數量已更新：${_}`);
      })
    );
    return t(m), m;
  }, [e, t]), W(() => {
    let m = !1;
    return (async () => {
      try {
        console.info("[task-board] restore start");
        const N = await e.storage.get(ct), E = Ps(N);
        if (console.info("[task-board] restore payload", {
          preview: E.preview,
          extractedPath: E.extractedPath
        }), m)
          return;
        if (E.tasks.length > 0)
          r(E.tasks), i(E.tasks[0].id), a("已還原上次進度");
        else {
          const M = $e("easy");
          r([M]), i(M.id), a("建立新的數獨局");
        }
        console.info("[task-board] restore success", {
          count: E.tasks.length,
          source: E.source
        });
      } catch (N) {
        if (console.error("[task-board] restore failed", N), !m) {
          const E = $e("easy");
          r([E]), i(E.id), a("還原失敗，已建立新局");
        }
      } finally {
        m || c(!0);
      }
    })(), () => {
      m = !0;
    };
  }, [e]), W(() => {
    e.eventBus.emit(ut, n.length);
  }, [e, n.length]), W(() => {
    if (!s)
      return;
    if (g.current) {
      g.current = !1;
      return;
    }
    console.info("[task-board] save triggered", { count: n.length }), (async () => {
      try {
        const _ = Jt.parse(n);
        await e.storage.save(ct, _, Ss);
      } catch (_) {
        console.error("[task-board] save failed", _);
      }
    })();
  }, [e, s, n]), W(() => {
    if (!d || R)
      return;
    const m = window.setInterval(() => {
      r(
        (_) => _.map(
          (N) => N.id === d.id ? {
            ...N,
            elapsedTime: N.elapsedTime + 1,
            updatedAt: Date.now()
          } : N
        )
      );
    }, 1e3);
    return () => {
      window.clearInterval(m);
    };
  }, [d, R]), W(() => {
    !d || !R || (r(
      (m) => m.map((_) => {
        if (_.id !== d.id)
          return _;
        const N = _.bestTime === null ? _.elapsedTime : Math.min(_.bestTime, _.elapsedTime);
        return {
          ..._,
          bestTime: N,
          updatedAt: Date.now()
        };
      })
    ), a("恭喜完成！已更新最佳時間"));
  }, [d, R]);
  const Z = (m, _, N) => {
    var E;
    !d || (E = $[m]) != null && E[_] || r(
      (M) => M.map((J) => {
        if (J.id !== d.id)
          return J;
        const se = fe(J.currentBoard);
        return se[m][_] = N, {
          ...J,
          currentBoard: se,
          updatedAt: Date.now()
        };
      })
    );
  }, G = () => {
    const m = lt(v);
    p(m), m.size === 0 ? a("目前沒有衝突，繼續加油！") : a(`發現 ${m.size} 個衝突格`);
  }, j = () => {
    if (d) {
      for (let m = 0; m < 9; m += 1)
        for (let _ = 0; _ < 9; _ += 1)
          if (v[m][_] === 0) {
            Z(m, _, b[m][_]), a(`提示：已填入 R${m + 1}C${_ + 1}`), p(/* @__PURE__ */ new Set());
            return;
          }
      a("盤面已填滿");
    }
  }, I = (m) => {
    d && (r(
      (_) => _.map(
        (N) => N.id === d.id ? {
          ...N,
          difficulty: m,
          currentBoard: fe(K[m].puzzle),
          elapsedTime: 0,
          updatedAt: Date.now()
        } : N
      )
    ), p(/* @__PURE__ */ new Set()), a(`已開始 ${m} 新局`));
  }, x = () => {
    if (!d)
      return;
    const m = $e(d.difficulty);
    r((_) => [m, ..._]), i(m.id), p(/* @__PURE__ */ new Set()), a("已新增一筆存檔");
  };
  return /* @__PURE__ */ z.createElement("div", { className: "sudoku-app", role: "application", "aria-label": "Sudoku Master" }, /* @__PURE__ */ z.createElement("div", { className: "app-shell" }, /* @__PURE__ */ z.createElement("header", { className: "header" }, /* @__PURE__ */ z.createElement("h1", null, "數獨 Sudoku")), /* @__PURE__ */ z.createElement("main", { className: "content" }, /* @__PURE__ */ z.createElement("section", { className: "status-row", "aria-live": "polite" }, /* @__PURE__ */ z.createElement("div", { className: "chip" }, "難度：", (d == null ? void 0 : d.difficulty) ?? "easy"), /* @__PURE__ */ z.createElement("div", { className: "chip" }, "已填格數：", As(v), "/81"), /* @__PURE__ */ z.createElement("div", { className: "chip" }, "目前時間：", (d == null ? void 0 : d.elapsedTime) ?? 0, "s"), /* @__PURE__ */ z.createElement("div", { className: "chip" }, "最佳時間：", (d == null ? void 0 : d.bestTime) ?? "--")), /* @__PURE__ */ z.createElement("section", { className: "control-row" }, /* @__PURE__ */ z.createElement("button", { className: "btn", type: "button", onClick: G }, "檢查錯誤"), /* @__PURE__ */ z.createElement("button", { className: "btn primary", type: "button", onClick: j }, "提示"), /* @__PURE__ */ z.createElement("button", { className: "btn", type: "button", onClick: x }, "新增存檔"), /* @__PURE__ */ z.createElement(
    "select",
    {
      className: "select",
      value: (d == null ? void 0 : d.difficulty) ?? "easy",
      onChange: (m) => I(m.target.value),
      "aria-label": "選擇難度"
    },
    /* @__PURE__ */ z.createElement("option", { value: "easy" }, "簡單"),
    /* @__PURE__ */ z.createElement("option", { value: "medium" }, "普通"),
    /* @__PURE__ */ z.createElement("option", { value: "hard" }, "困難")
  )), /* @__PURE__ */ z.createElement("section", { className: "board", "aria-label": "9x9 數獨棋盤" }, v.map(
    (m, _) => m.map((N, E) => {
      var Ce;
      const M = ((Ce = $[_]) == null ? void 0 : Ce[E]) ?? !1, J = `${_}-${E}`, se = [
        "cell",
        M ? "fixed" : "",
        f.has(J) ? "error" : "",
        E === 2 || E === 5 ? "subgrid-right" : "",
        _ === 2 || _ === 5 ? "subgrid-bottom" : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ z.createElement(
        "input",
        {
          key: J,
          className: se,
          type: "text",
          inputMode: "numeric",
          maxLength: 1,
          "aria-label": `第 ${_ + 1} 列第 ${E + 1} 格`,
          value: N === 0 ? "" : String(N),
          disabled: M,
          onChange: (Bt) => {
            const Re = Bt.target.value.replace(/[^1-9]/g, "");
            Z(_, E, Re ? Number(Re) : 0);
          }
        }
      );
    })
  )), /* @__PURE__ */ z.createElement("div", { className: `message ${R ? "ok" : ""}` }, u), /* @__PURE__ */ z.createElement("section", { className: "saves", "aria-label": "存檔列表" }, n.map((m) => /* @__PURE__ */ z.createElement(
    "button",
    {
      key: m.id,
      type: "button",
      className: `save-card ${m.id === (d == null ? void 0 : d.id) ? "active" : ""}`,
      onClick: () => {
        i(m.id), p(/* @__PURE__ */ new Set()), a("已切換存檔");
      }
    },
    /* @__PURE__ */ z.createElement("span", null, m.id),
    /* @__PURE__ */ z.createElement("span", null, m.difficulty, " / ", m.elapsedTime, "s")
  ))))));
}
const Cs = '@import"https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&display=swap";#plugin-plugin-sudoku .sudoku-app{--bg-a: #f6f7fb;--bg-b: #ddeaf9;--ink: #0f172a;--muted: #475569;--panel: rgba(255, 255, 255, .9);--line: #9fb4c9;--accent: #146c94;--accent-strong: #0f4c75;--accent-soft: #e4f5ff;--danger: #bb2528;--ok: #0f9d58;min-height:100%;font-family:Chakra Petch,Segoe UI,sans-serif;color:var(--ink);background:radial-gradient(circle at 15% 10%,rgba(20,108,148,.18),transparent 45%),radial-gradient(circle at 85% 80%,rgba(15,76,117,.14),transparent 40%),linear-gradient(135deg,var(--bg-a),var(--bg-b));padding:18px 14px}#plugin-plugin-sudoku .app-shell{max-width:940px;margin:0 auto;border-radius:24px;background:var(--panel);box-shadow:0 18px 52px #0f172a2e;overflow:hidden;border:1px solid rgba(20,108,148,.24)}#plugin-plugin-sudoku .header{padding:22px 22px 18px;background:linear-gradient(90deg,#146c94,#19a7ce);color:#fff}#plugin-plugin-sudoku .header h1{margin:0;font-size:clamp(25px,3vw,34px);letter-spacing:.04em}#plugin-plugin-sudoku .header p{margin:8px 0 0;opacity:.92}#plugin-plugin-sudoku .content{display:grid;gap:16px;padding:18px 18px 20px}#plugin-plugin-sudoku .status-row{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(145px,1fr))}#plugin-plugin-sudoku .chip{border-radius:12px;background:#eff8ff;border:1px solid #c6def3;padding:10px 12px;font-weight:600;box-shadow:inset 0 1px #fffc}#plugin-plugin-sudoku .board{width:min(100%,650px);margin:0 auto;border:3px solid #20364f;border-radius:16px;overflow:hidden;display:grid;grid-template-columns:repeat(9,minmax(0,1fr));box-shadow:0 12px 24px #0f172a21}#plugin-plugin-sudoku .cell{box-sizing:border-box;width:100%;min-width:0;aspect-ratio:1 / 1;padding:0;border:1px solid var(--line);text-align:center;font-size:clamp(18px,2vw,24px);font-weight:600;line-height:1;outline:none;display:grid;place-items:center;background:#fff;color:var(--ink);transition:background-color .16s ease,box-shadow .16s ease,transform .16s ease}#plugin-plugin-sudoku .cell:focus{background:#e7f6ff;box-shadow:inset 0 0 0 2px #24a8e0}#plugin-plugin-sudoku .cell.fixed{background:#eef3f8;color:#0b2740}#plugin-plugin-sudoku .cell.error{background:#ffe2e2;color:var(--danger)}#plugin-plugin-sudoku .cell.subgrid-right{border-right:2px solid #20364f}#plugin-plugin-sudoku .cell.subgrid-bottom{border-bottom:2px solid #20364f}#plugin-plugin-sudoku .control-row{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(128px,1fr))}#plugin-plugin-sudoku .btn,#plugin-plugin-sudoku .select{min-height:44px;border-radius:12px;border:1px solid #c7d9ea;font-family:inherit;font-size:15px}#plugin-plugin-sudoku .btn{cursor:pointer;font-weight:600;background:#f2f8fd;color:#102a43;box-shadow:0 1px #fffc inset}#plugin-plugin-sudoku .btn.primary{background:var(--accent);color:#fff;border-color:var(--accent-strong)}#plugin-plugin-sudoku .btn:hover{transform:translateY(-1px);filter:brightness(1.01)}#plugin-plugin-sudoku .btn:disabled{opacity:.55;cursor:not-allowed;transform:none}#plugin-plugin-sudoku .message{min-height:26px;border-radius:12px;padding:6px 10px;background:var(--accent-soft);border:1px solid #b8daef;color:var(--muted);font-size:15px}#plugin-plugin-sudoku .message.ok{color:var(--ok);font-weight:600;background:#e7f8ec;border-color:#9dd8b0}#plugin-plugin-sudoku .saves{display:grid;gap:8px}#plugin-plugin-sudoku .save-card{border:1px solid #bfd3e6;border-radius:12px;padding:10px;display:flex;justify-content:space-between;align-items:center;gap:8px;background:#f8fbff}#plugin-plugin-sudoku .save-card.active{border-color:#146c94;background:#edf8ff;box-shadow:inset 0 0 0 1px #146c94}@media (max-width: 700px){#plugin-plugin-sudoku .sudoku-app{padding:10px}#plugin-plugin-sudoku .content{padding:12px;gap:12px}#plugin-plugin-sudoku .header{padding:16px 14px}#plugin-plugin-sudoku .header h1{font-size:24px}#plugin-plugin-sudoku .chip{padding:8px 10px;font-size:14px}#plugin-plugin-sudoku .btn,#plugin-plugin-sudoku .select{min-height:42px;font-size:14px}}', Oe = "plugin-sudoku", Rs = `plugin-${Oe}`;
let Q = null, le = null, D = null, ee = null, te = null;
const Vt = [];
function Ds(e) {
  Vt.push(e);
}
const Ms = {
  id: Oe,
  name: "Sudoku Master",
  version: "1.0.0",
  mount(e, t) {
    le = e, D = document.createElement("div"), D.id = Rs, D.style.minHeight = "100%", ee = document.createElement("div"), ee.style.minHeight = "100%", te = document.createElement("style"), te.setAttribute("data-plugin-style", Oe), te.textContent = Cs, D.appendChild(te), D.appendChild(ee), e.appendChild(D), Q = Wt(ee), Q.render(/* @__PURE__ */ z.createElement(js, { context: t, registerCleanup: Ds }));
  },
  unmount() {
    Vt.splice(0).forEach((e) => {
      try {
        e();
      } catch {
      }
    }), Q && (Q.unmount(), Q = null), D && (D.innerHTML = "", D.remove(), D = null), ee = null, le && (le.innerHTML = "", le = null), te = null;
  }
};
export {
  Ms as default
};
