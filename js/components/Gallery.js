import { h } from '../core/component.js';
import { A } from '../core/actions.js';
import { store } from '../core/store.js';
import { Heart } from './Heart.js';
import { Sheet } from './Sheet.js';
import { chip, waBtn } from './ui.js';
import { CATEGORIES, GALLERY } from '../data/gallery.js';
import { visibleGallery } from '../utils/selectors.js';
import { img } from '../utils/img.js';
import { IMAGES } from '../data/images.js';

export function CategoryFilter(_, ctx) {
  const cat = ctx.select((s) => s.cat);
  return h('div', { class: 'chips', role: 'group', 'aria-label': 'Filter photos' },
    CATEGORIES.map((c) => chip(c, cat === c, () => A.setCat(c), 'cat-' + c)));
}

export function GalleryGrid(_, ctx) {
  const items = ctx.select((s) => visibleGallery(s).map((g) => g.id));
  return h('div', { class: 'gal' }, items.map((id) => {
    const g = GALLERY.find((x) => x.id === id);
    return h('div', { class: 'gi' },
      h('button', { class: 'open', type: 'button', 'aria-label': 'Open photo: ' + g.alt, onClick: () => A.ui('lightbox', g.id) }, img(g.img, g.alt)),
      h(Heart, { id: 'img:' + g.id }));
  }));
}

export function GalleryCount(_, ctx) {
  const p = h('p', { class: 'sr', 'aria-live': 'polite' });
  ctx.watch((s) => visibleGallery(s).length, (n) => { p.textContent = `${n} photos shown`; }, true);
  return p;
}

function LightboxBody(_, ctx) {
  const [id] = ctx.select((s) => [s.ui.lightbox, s.cat]);
  if (id == null) return h('div');
  const g = GALLERY.find((x) => x.id === id);
  return h('div', { class: 'lb' },
    h('img', { src: IMAGES[g.img].src, alt: g.alt, class: 'lb-img' }),
    h('p', null, g.alt),
    h('div', { class: 'row m0' },
      h('button', { class: 'btn s', type: 'button', onClick: () => step(-1) }, 'Previous'),
      h('button', { class: 'btn s', type: 'button', onClick: () => step(1) }, 'Next'),
      h(Heart, { id: 'img:' + g.id, text: true }),
      waBtn(`Hello, I’m interested in: ${g.alt}. Dates: `, 'Ask about this', 'btn s w'),
      h('button', { class: 'btn s', type: 'button', onClick: () => A.ui('lightbox', null) }, 'Close')));
}

function step(d) {
  const s = store.get();
  const list = visibleGallery(s);
  const i = list.findIndex((g) => g.id === s.ui.lightbox);
  const next = list[(i + d + list.length) % list.length];
  if (next) A.ui('lightbox', next.id);
}

export function Lightbox(_, ctx) {
  const sheet = h(Sheet, { uiKey: 'lightbox', closed: null, side: 'modal', label: 'Photo viewer' }, h(LightboxBody));
  ctx.onMount((el) => {
    const onKey = (e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  });
  return sheet;
}
