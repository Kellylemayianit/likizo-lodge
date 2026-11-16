import { h } from '../core/component.js';
import { Heart } from './Heart.js';
import { waBtn } from './ui.js';
import { PLANS } from '../data/rooms.js';
import { money, priceFor, fromPrice } from '../utils/format.js';
import { img } from '../utils/img.js';

export function PriceTable({ room }, ctx) {
  const who = ctx.select((s) => s.who);
  return h('div', null,
    h('table', null,
      h('caption', { class: 'sr' }, 'All prices for ' + room.name),
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Meal plan'),
        room.house ? h('th', { scope: 'col' }, 'Per house') : [h('th', { scope: 'col' }, 'Single'), h('th', { scope: 'col' }, 'Double')])),
      h('tbody', null, PLANS.map((p, i) => {
        const a = room.rates[who][i];
        return h('tr', null, h('td', null, p), room.house ? h('td', null, money(a[0], who)) : [h('td', null, money(a[0], who)), h('td', null, money(a[1], who))]);
      }))),
    h('p', { class: 'fine' }, room.note + ' Children’s and group rates on request.'));
}

// mode 'from' (home): headline from-price. mode 'priced' (menu): exact price for the chosen facets.
export function RoomCard({ room, mode }, ctx) {
  const [who, plan, occ] = ctx.select(mode === 'from' ? (s) => [s.who, 0, 0] : (s) => [s.who, s.plan, s.occ]);
  const unit = room.house ? ' per house' : ' per person' + (mode === 'priced' && room.rates[who][plan].length > 1 ? (occ ? ', double' : ', single') : '');
  const msg = mode === 'from'
    ? `Hello, I’d like to book the ${room.name}. Dates: `
    : `Hello, I’d like to book the ${room.name} (${PLANS[plan]}, ${who === 'r' ? 'resident' : 'non-resident'}). Dates: `;
  return h('article', { class: 'card' },
    img(room.img, room.name), h(Heart, { id: 'room:' + room.id }),
    h('div', { class: 'cb' },
      h('h3', null, room.name),
      h('p', null, room.info + (mode === 'priced' ? ' · ' + PLANS[plan] : '')),
      h('div', { class: 'price' }, mode === 'from' ? h('small', null, 'from ') : null,
        money(mode === 'from' ? fromPrice(room, who) : priceFor(room, who, plan, occ), who), h('small', null, unit)),
      waBtn(msg, mode === 'from' ? 'Book on WhatsApp' : 'Book this on WhatsApp'),
      mode === 'priced' ? h('details', null, h('summary', null, 'Full price list'), h(PriceTable, { room })) : null));
}
