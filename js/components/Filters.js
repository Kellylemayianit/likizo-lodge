// Faceted navigation for rooms: side panel + the pieces that react to filter state.
import { h } from '../core/component.js';
import { A } from '../core/actions.js';
import { store } from '../core/store.js';
import { Sheet } from './Sheet.js';
import { RoomCard } from './RoomCard.js';
import { chip } from './ui.js';
import { ROOMS, PLANS } from '../data/rooms.js';
import { visibleRooms } from '../utils/selectors.js';
import { itemName } from '../data/items.js';

const whoChips = (who) => h('div', { class: 'seg', role: 'group', 'aria-label': 'Guest type' },
  chip('Kenya resident (KSh)', who === 'r', () => A.setWho('r'), 'who-r'),
  chip('Non-resident (USD)', who === 'n', () => A.setWho('n'), 'who-n'));

export function WhoToggle(_, ctx) {
  return whoChips(ctx.select((s) => s.who));
}

const fieldset = (legend, ...kids) => h('fieldset', null, h('legend', null, legend), ...kids);

function FilterBody(_, ctx) {
  const [who, plan, occ, ...types] = ctx.select((s) => [s.who, s.plan, s.occ, ...s.types]);
  return h('div', { class: 'facets' },
    fieldset('Guest type', whoChips(who)),
    fieldset('Meal plan', h('div', { class: 'chips' }, PLANS.map((p, i) => chip(p, plan === i, () => A.setPlan(i), 'plan-' + i)))),
    fieldset('Occupancy', h('div', { class: 'chips' },
      chip('Single', !occ, () => A.setOcc(0), 'occ-0'), chip('Double', !!occ, () => A.setOcc(1), 'occ-1'))),
    fieldset('Room type', h('div', { class: 'chips' }, ROOMS.map((r) => chip(r.name, types.includes(r.id), () => A.toggleType(r.id), 'type-' + r.id)))));
}

function ShowButton(_, ctx) {
  const n = ctx.select((s) => visibleRooms(s).length);
  return h('button', { class: 'btn p', type: 'button', onClick: () => A.ui('filters', false) }, `Show ${n} result${n === 1 ? '' : 's'}`);
}

export function FilterPanel() {
  return h(Sheet, { uiKey: 'filters', side: 'right', label: 'Filter and select' },
    h('div', { class: 'sh' }, h('h2', { class: 'm0' }, 'Filter & select'),
      h('button', { class: 'btn s', type: 'button', onClick: () => A.ui('filters', false) }, 'Close')),
    h(FilterBody),
    h('div', { class: 'row m0' }, h(ShowButton), h('button', { class: 'btn', type: 'button', onClick: A.resetFilters }, 'Reset')));
}

export function ActiveFilters(_, ctx) {
  const [who, plan, occ, ...types] = ctx.select((s) => [s.who, s.plan, s.occ, ...s.types]);
  const tags = [who === 'r' ? 'Kenya resident' : 'Non-resident', PLANS[plan], occ ? 'Double' : 'Single', ...types.map((t) => itemName('room:' + t))];
  return h('div', { class: 'pill nm' }, tags.map((t) => h('span', null, t)));
}

// Stable live region: only its text changes, so screen readers announce it.
export function ResultCount(_, ctx) {
  const p = h('p', { class: 'count', 'aria-live': 'polite' });
  const text = (n) => { p.textContent = `${n} room type${n === 1 ? '' : 's'} shown`; };
  ctx.watch((s) => visibleRooms(s).length, text, true);
  return p;
}

export function RoomResults(_, ctx) {
  const ids = ctx.select((s) => visibleRooms(s).map((r) => r.id));
  return h('div', { class: 'grid c3' }, ids.map((id) => h(RoomCard, { room: ROOMS.find((r) => r.id === id), mode: 'priced' })));
}
