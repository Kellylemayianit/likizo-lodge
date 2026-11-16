import { h } from '../core/component.js';
import { Heart } from './Heart.js';
import { waBtn } from './ui.js';
import { img } from '../utils/img.js';

export function ServiceCard({ svc }) {
  return h('article', { class: 'card' },
    img(svc.img, svc.name), h(Heart, { id: 'svc:' + svc.id }),
    h('div', { class: 'cb' }, h('h3', null, svc.name), h('p', null, svc.desc),
      h('div', { class: 'row' }, waBtn('Hello, ' + svc.ask, 'Ask on WhatsApp', 'btn s w'))));
}
