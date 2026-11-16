import { h } from '../core/component.js';
import { NAV } from '../data/nav.js';
import { SITE } from '../data/site.js';
import { icon } from '../utils/icons.js';

export function Footer() {
  return h('footer', { class: 'site-footer' },
    h('div', null, h('p', { class: 'logo' }, icon('mountain', 28), SITE.name), h('p', null, SITE.tagline + '.'), h('p', null, SITE.location)),
    h('div', null, h('h2', null, 'Explore'), NAV.map((n) => h('a', { href: '#' + n.key }, n.label))),
    h('div', null, h('h2', null, 'Contact'),
      SITE.phones.map((p) => h('a', { href: 'tel:' + p.tel }, p.label)),
      h('a', { href: 'mailto:' + SITE.email }, SITE.email),
      h('p', null, `Check-in ${SITE.checkIn} · Check-out ${SITE.checkOut}`)),
    h('p', { class: 'copy' }, `© ${new Date().getFullYear()} ${SITE.name}`));
}
