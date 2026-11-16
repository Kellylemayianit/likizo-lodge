import { h } from '../core/component.js';
import { hero, story, band, facts, section } from '../components/Blocks.js';
import { RoomCard } from '../components/RoomCard.js';
import { ServiceCard } from '../components/ServiceCard.js';
import { WhoToggle } from '../components/Filters.js';
import { waBtn, telBtn } from '../components/ui.js';
import { ROOMS } from '../data/rooms.js';
import { SERVICES } from '../data/services.js';
import { SITE } from '../data/site.js';
import { BOOK_TEXT } from '../utils/format.js';

export function Home() {
  return h('div', { class: 'view' },
    hero({
      image: 'cottage', alt: 'Stone and thatch cottage at Amboseli Likizo Lodge',
      kicker: 'Kimana · Amboseli, Kenya', title: 'Luxury, with Kilimanjaro at your window.',
      lead: 'Where luxury meets the wild. A calm lodge in the gateway to Amboseli’s untamed beauty, where every stay feels like home.',
      actions: [waBtn(BOOK_TEXT, 'Book on WhatsApp'), h('a', { class: 'btn', href: '#about' }, 'Explore the lodge')]
    }),
    facts(),
    story({
      image: 'poolWide', alt: 'The swimming pool and gardens', title: 'Between the park and the border',
      body: [
        h('p', null, 'Amboseli Likizo Lodge sits in Kimana, a short drive from Amboseli National Park (about 20 km), with Tsavo West 35 km away and the Tanzania border 25 km. Mount Kilimanjaro is the backdrop to every morning.'),
        h('p', null, 'Wake to the snow-capped summit over the plains, take breakfast slowly, and let the day begin only when you are ready.')
      ],
      extra: h('div', { class: 'pill' }, SITE.distances.map((d) => h('span', null, `${d.km} km ${d.to === 'the Tanzania border' ? 'Tanzania border' : d.to}`)))
    }),
    story({
      image: 'lounge', alt: 'Lounge seating at Lebistro', title: 'Slow down. Stay a while.', rev: true,
      body: [
        h('p', null, 'Thatched cottages and A-frame cabins sit among green gardens. There is a pool to float in, a lounge for sundowners, and a table set for dinner. Nothing here is rushed.'),
        h('p', null, 'Staff learn your name and your preferences, so a stay feels less like a booking and more like coming home.')
      ]
    }),
    band(SITE.tagline + '.', SITE.name),
    section('Stay in comfort', 'Rooms, cabins and a family house, with meal plans to suit you.',
      h(WhoToggle), h('div', { class: 'grid c3 mt' }, ROOMS.map((r) => h(RoomCard, { room: r, mode: 'from' })))),
    section('What we offer', 'Honeymoons, conferences, garden events, game drives and Maasai cultural visits, all arranged for you.',
      h('div', { class: 'grid c3' }, SERVICES.map((s) => h(ServiceCard, { svc: s })))),
    section('Your stay begins with a message', 'Send your dates and we will confirm availability and the best rate.',
      h('div', { class: 'row' }, waBtn(BOOK_TEXT, 'Book on WhatsApp'), telBtn(SITE.phones[0].tel, 'Call ' + SITE.phones[0].label))));
}
