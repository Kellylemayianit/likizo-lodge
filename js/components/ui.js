// Small stateless helpers (not components): buttons, chips, WhatsApp links.
import { h } from '../core/component.js';
import { waLink } from '../utils/format.js';

export const chip = (label, on, onClick, fk) =>
  h('button', { class: 'chip', type: 'button', 'aria-pressed': String(!!on), 'data-fk': fk, onClick }, label);

export const waBtn = (text, label, cls = 'btn w') =>
  h('a', { class: cls, href: waLink(text), target: '_blank', rel: 'noopener' }, label);

export const telBtn = (tel, label, cls = 'btn') => h('a', { class: cls, href: 'tel:' + tel }, label);
