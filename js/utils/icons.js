import { h } from '../core/component.js';

const P = {
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="M5 5l14 14M19 5L5 19"/>',
  heart: '<path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/>',
  mountain: '<path d="M1 21 11 5l5 8 3-4 10 12z" stroke-linejoin="round"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
  auto: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>'
};

export function icon(name, size = 20) {
  return h('span', {
    class: 'ico', 'aria-hidden': 'true',
    html: `<svg width="${size}" height="${size}" viewBox="0 0 ${name === 'mountain' ? 30 : 24} ${name === 'mountain' ? 22 : 24}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">${P[name]}</svg>`
  });
}
