// A tiny React-like runtime: h() builds DOM, function components get (props, ctx),
// ctx.select() subscribes + re-renders, ctx.watch() subscribes without re-rendering,
// ctx.onMount()/onCleanup() are lifecycle hooks.
import { store } from './store.js';

let current = null;
const same = (a, b) =>
  a === b || (Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, i) => x === b[i]));

const append = (el, kid) => {
  if (kid == null || kid === false || kid === true) return;
  if (Array.isArray(kid)) return kid.forEach((k) => append(el, k));
  el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
};

export function h(tag, props, ...kids) {
  props = props || {};
  if (typeof tag === 'function') return instantiate(tag, { ...props, children: kids.flat(Infinity) }).el;
  const el = document.createElement(tag);
  for (const k in props) {
    const v = props[k];
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v; // trusted, static markup only (icons)
    else if (k === 'value') el.value = v;
    else if (k.length > 2 && k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  append(el, kids);
  return el;
}

function teardown(inst) {
  inst.subs.forEach((off) => off());
  inst.cleanups.forEach((fn) => fn());
  inst.subs = [];
  inst.cleanups = [];
  inst.kids.forEach((k) => { k.dead = true; teardown(k); });
  inst.kids = [];
}

function ctxFor(inst) {
  return {
    select(selector) {
      const value = selector(store.get());
      inst.subs.push(store.subscribe((s) => {
        if (!inst.dead && !same(selector(s), value)) rerender(inst);
      }));
      return value;
    },
    watch(selector, cb, immediate) {
      let last = selector(store.get());
      if (immediate) cb(last);
      inst.subs.push(store.subscribe((s) => {
        if (inst.dead) return;
        const next = selector(s);
        if (!same(next, last)) { last = next; cb(next); }
      }));
    },
    onMount(fn) {
      queueMicrotask(() => {
        if (inst.dead) return;
        const cleanup = fn(inst.el);
        if (typeof cleanup === 'function') inst.cleanups.push(cleanup);
      });
    },
    onCleanup(fn) { inst.cleanups.push(fn); }
  };
}

function build(inst) {
  teardown(inst);
  const prev = current;
  current = inst;
  try {
    const out = inst.Comp(inst.props, ctxFor(inst));
    return out instanceof Node ? out : document.createTextNode(out ?? '');
  } finally { current = prev; }
}

function instantiate(Comp, props) {
  const inst = { Comp, props, el: null, subs: [], cleanups: [], kids: [], parent: current, dead: false };
  if (current) current.kids.push(inst);
  inst.el = build(inst);
  return inst;
}

function rerender(inst) {
  if (inst.dead) return;
  const old = inst.el;
  const key = document.activeElement && document.activeElement.dataset && document.activeElement.dataset.fk;
  const next = build(inst);
  if (old.parentNode) old.replaceWith(next);
  for (let p = inst.parent; p && p.el === old; p = p.parent) p.el = next;
  inst.el = next;
  if (key) {
    const again = next.querySelector('[data-fk="' + key + '"]');
    if (again) again.focus({ preventScroll: true });
  }
}

// Mount a component into a container; returns an unmount function.
export function render(Comp, props, container) {
  const inst = instantiate(Comp, props || {});
  container.replaceChildren(inst.el);
  return () => { inst.dead = true; teardown(inst); };
}
