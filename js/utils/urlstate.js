// Shareable filter state in the hash, e.g. #menu?who=n&plan=1&occ=1&type=std,vip
import { store } from '../core/store.js';

export function readFilters(query) {
  const q = new URLSearchParams(query);
  const patch = {};
  if (q.get('who') === 'n' || q.get('who') === 'r') patch.who = q.get('who');
  if (q.has('plan') && +q.get('plan') >= 0 && +q.get('plan') <= 3) patch.plan = +q.get('plan');
  if (q.has('occ')) patch.occ = q.get('occ') === '1' ? 1 : 0;
  if (q.get('type')) patch.types = q.get('type').split(',').filter((t) => ['std', 'ste', 'vip'].includes(t));
  if (Object.keys(patch).length) store.set(patch);
}

export function writeFilters() {
  const s = store.get();
  // A pending navigation can leave store.route stale for a tick, so also check the real hash.
  if (s.route !== 'menu' || !location.hash.startsWith('#menu')) return;
  const q = new URLSearchParams({ who: s.who, plan: s.plan, occ: s.occ });
  if (s.types.length) q.set('type', s.types.join(','));
  const next = '#menu?' + q.toString();
  // Only touch history when the filters really changed; replaceState during a link click would cancel that navigation.
  if (location.hash !== next) history.replaceState(null, '', next);
}
