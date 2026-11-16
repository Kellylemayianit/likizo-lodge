// Central store: one immutable state object, subscribe/notify, localStorage persistence.
const KEY = 'likizo.v1';

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
};
const saved = load();

let state = {
  route: 'home',
  theme: ['light', 'dark'].includes(saved.theme) ? saved.theme : 'auto',
  who: saved.who === 'n' ? 'n' : 'r',   // r = Kenya resident, n = non-resident
  plan: 0,                              // index into PLANS
  occ: 0,                               // 0 single, 1 double
  types: [],                            // room-type filter (empty = all)
  cat: 'All',                           // gallery category
  wishlist: Array.isArray(saved.wishlist) ? saved.wishlist : [],
  ui: { nav: false, filters: false, saved: false, lightbox: null },
  live: ''                              // screen-reader announcements
};

const subs = new Set();

const persist = () => {
  try { localStorage.setItem(KEY, JSON.stringify({ wishlist: state.wishlist, who: state.who, theme: state.theme })); } catch {}
};

export const store = {
  get: () => state,
  set(patch) {
    state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
    persist();
    [...subs].forEach((fn) => fn(state));
  },
  subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  }
};
