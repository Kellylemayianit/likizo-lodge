// All state changes go through here, so components never mutate state directly.
import { store } from './store.js';

export const A = {
  setTheme: (theme) => store.set({ theme }),
  setWho: (who) => store.set({ who }),
  setPlan: (plan) => store.set({ plan }),
  setOcc: (occ) => store.set({ occ }),
  toggleType: (id) => store.set((s) => ({
    types: s.types.includes(id) ? s.types.filter((t) => t !== id) : [...s.types, id]
  })),
  resetFilters: () => store.set({ who: 'r', plan: 0, occ: 0, types: [] }),
  setCat: (cat) => store.set({ cat }),
  ui: (key, value) => store.set((s) => ({ ui: { ...s.ui, [key]: value } })),
  toggleSaved(id, name) {
    const on = store.get().wishlist.includes(id);
    store.set((s) => ({
      wishlist: on ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id],
      live: `${name} ${on ? 'removed from' : 'added to'} your saved list`
    }));
  },
  clearSaved: () => store.set({ wishlist: [], live: 'Saved list cleared' })
};
