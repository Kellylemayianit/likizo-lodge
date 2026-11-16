import { h } from '../core/component.js';
import { A } from '../core/actions.js';
import { section } from '../components/Blocks.js';
import { ActiveFilters, ResultCount, RoomResults } from '../components/Filters.js';
import { ServiceCard } from '../components/ServiceCard.js';
import { icon } from '../utils/icons.js';
import { EXTRAS } from '../data/rooms.js';
import { SERVICES } from '../data/services.js';

export function Menu() {
  return h('div', { class: 'view' },
    h('section', { class: 'sec' },
      h('h1', null, 'Rooms & menu'),
      h('p', { class: 'lead' }, 'Open the side panel to choose your guest type, meal plan and room. Prices update instantly. Tap the heart to save, then send your list.'),
      h('div', { class: 'tbar' },
        h('button', { class: 'btn p', type: 'button', 'aria-haspopup': 'dialog', onClick: () => A.ui('filters', true) }, icon('menu'), 'Filter & select'),
        h(ActiveFilters)),
      h(ResultCount), h(RoomResults)),
    section('Day rates & extras', 'Honeymoon and VIP setups, private dinners, garden events and game drives are quoted on request.',
      h('ul', { class: 'pl' }, EXTRAS.map(([a, b]) => h('li', null, h('span', null, a), h('b', null, b))))),
    section('Dining & more', null, h('div', { class: 'grid c3' }, SERVICES.map((s) => h(ServiceCard, { svc: s })))));
}
