import { h } from '../core/component.js';
import { hero, band, section } from '../components/Blocks.js';
import { BookingForm } from '../components/BookingForm.js';
import { waBtn, telBtn } from '../components/ui.js';
import { SITE } from '../data/site.js';
import { BOOK_TEXT } from '../utils/format.js';

export function Contact() {
  return h('div', { class: 'view' },
    hero({
      image: 'poolGarden', alt: 'Pool and gardens, calm in the morning light',
      kicker: 'Serene Kenya', title: 'Come to the quiet.',
      lead: 'Morning light on the snow-capped peak of Kilimanjaro, birdsong in the garden, and the Amboseli plains stretching away. This is Kenya at its most serene, and it starts with a message.',
      actions: [waBtn(BOOK_TEXT, 'WhatsApp ' + SITE.phones[0].label), telBtn(SITE.phones[1].tel, 'Call ' + SITE.phones[1].label)]
    }),
    band('The mountain is waiting.', 'Tell us your dates and we will take care of the rest'),
    section('Plan your stay', 'Fill in your details and we will open WhatsApp with your request ready to send.', h(BookingForm)),
    section('Find us', null,
      h('ul', { class: 'pl' },
        h('li', null, h('span', null, 'Location'), h('b', null, SITE.location)),
        h('li', null, h('span', null, 'Phone'), h('b', null, SITE.phones.map((p, i) => [i ? ' · ' : '', h('a', { href: 'tel:' + p.tel }, p.label)]))),
        h('li', null, h('span', null, 'Email'), h('b', null, h('a', { href: 'mailto:' + SITE.email }, SITE.email))),
        h('li', null, h('span', null, 'Check-in / out'), h('b', null, `${SITE.checkIn} / ${SITE.checkOut}`))),
      h('div', { class: 'row' }, h('a', { class: 'btn', href: SITE.mapsUrl, target: '_blank', rel: 'noopener' }, 'Open in Maps', h('span', { class: 'sr' }, ' (opens in a new tab)')))));
}
