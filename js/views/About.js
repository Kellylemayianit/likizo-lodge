import { h } from '../core/component.js';
import { story, band, est, section } from '../components/Blocks.js';
import { CategoryFilter, GalleryGrid, GalleryCount } from '../components/Gallery.js';
import { waBtn } from '../components/ui.js';
import { ROOMS } from '../data/rooms.js';
import { SITE } from '../data/site.js';
import { BOOK_TEXT } from '../utils/format.js';

export function About() {
  return h('div', { class: 'view' },
    h('section', { class: 'sec' },
      h('p', { class: 'kick' }, 'Our story'), h('h1', null, 'Built on a love of hospitality'),
      h('p', { class: 'lead' }, 'Amboseli Likizo Lodge began with a director’s passion for hospitality and a wish to create a serene place to rest beside Kenya’s wild country. It blends comfort, local culture and nature, so that guests leave with more than a room-night.'),
      est()),
    story({
      image: 'cabin', alt: 'A-frame cabin among the gardens', title: 'Rooms made for rest',
      body: [h('p', null, 'Three ways to stay, each with its own character.'),
        h('ul', null, ROOMS.map((r) => h('li', null, h('b', null, r.name + ': '), r.features.join(', ').toLowerCase() + '.')))],
      extra: h('div', { class: 'row' }, h('a', { class: 'btn', href: '#menu' }, 'See room prices'))
    }),
    story({
      image: 'dining', alt: 'Dining area under the tree', title: 'Meals and the Lebistro bar', rev: true,
      body: [h('p', null, 'Choose Full Board, Half Board, Bed & Breakfast or Bed Only. Dinner is served in our restaurant, and the chef is happy to suggest something special.'),
        h('p', null, 'In the Lebistro lounge, our bartenders mix classic and signature cocktails, with fresh juices, beers, wines, spirits, light bites and hearty meals. Ask about happy-hour specials and themed evenings.')]
    }),
    story({
      image: 'team', alt: 'The Likizo team by the pool', title: 'Professional, from the front door to the last course',
      body: h('ul', null, SITE.professional.map((t) => h('li', null, t)))
    }),
    section('Gallery', null, h(CategoryFilter), h(GalleryCount), h('div', { class: 'mt' }, h(GalleryGrid))),
    band('Luxury, culture and nature, in harmony.', 'How we host: guest satisfaction, an eco-friendly approach, respect for Maasai culture'),
    section('Ready to see it for yourself?', null, h('div', { class: 'row' }, waBtn(BOOK_TEXT, 'Book on WhatsApp'))));
}
