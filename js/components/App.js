import { h } from '../core/component.js';
import { Header } from './Header.js';
import { Footer } from './Footer.js';
import { NavDrawer } from './NavDrawer.js';
import { FilterPanel } from './Filters.js';
import { SavedSheet } from './SavedSheet.js';
import { Lightbox } from './Gallery.js';

function LiveRegion(_, ctx) {
  const p = h('div', { class: 'sr', 'aria-live': 'polite' });
  ctx.watch((s) => s.live, (m) => { p.textContent = m; });
  return p;
}

export function App() {
  return h('div', { class: 'app' },
    h('a', { class: 'skip', href: '#main', onClick: (e) => { e.preventDefault(); document.getElementById('main').focus(); } }, 'Skip to content'),
    h(Header),
    h('main', { id: 'main', tabindex: '-1' }),
    h(Footer), h(NavDrawer), h(FilterPanel), h(SavedSheet), h(Lightbox), h(LiveRegion));
}
