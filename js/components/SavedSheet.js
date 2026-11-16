import { h } from '../core/component.js';
import { A } from '../core/actions.js';
import { Sheet } from './Sheet.js';
import { waBtn } from './ui.js';
import { itemInfo } from '../data/items.js';
import { IMAGES } from '../data/images.js';

function SavedBody(_, ctx) {
  const list = ctx.select((s) => s.wishlist);
  if (!list.length) return h('p', { class: 'lead' }, 'Nothing saved yet. Tap the heart on any room, photo or service.');
  return h('div', null,
    h('ul', { class: 'pl' }, list.map((id) => {
      const it = itemInfo(id);
      return h('li', null,
        h('span', { class: 'sv-item' }, h('img', { src: IMAGES[it.img].src, alt: '', width: 56, height: 42 }), it.name),
        h('button', { class: 'btn s', type: 'button', 'aria-label': 'Remove ' + it.name, onClick: () => A.toggleSaved(id, it.name) }, 'Remove'));
    })),
    h('div', { class: 'row' },
      waBtn('Hello Likizo Lodge, I’m interested in:\n' + list.map((id) => '- ' + itemInfo(id).name).join('\n') + '\nDates: ', 'Send list on WhatsApp'),
      h('button', { class: 'btn', type: 'button', onClick: A.clearSaved }, 'Clear')));
}

export function SavedSheet() {
  return h(Sheet, { uiKey: 'saved', side: 'modal', label: 'Saved list' },
    h('div', { class: 'sh' }, h('h2', { class: 'm0' }, 'Your saved list'),
      h('button', { class: 'btn s', type: 'button', onClick: () => A.ui('saved', false) }, 'Close')),
    h(SavedBody));
}
