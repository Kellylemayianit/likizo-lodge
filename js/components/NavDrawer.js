import { h } from '../core/component.js';
import { A } from '../core/actions.js';
import { Sheet } from './Sheet.js';
import { NavLinks } from './Header.js';
import { waBtn, telBtn } from './ui.js';
import { BOOK_TEXT } from '../utils/format.js';
import { ThemeSwitch } from './ThemeSwitch.js';
import { SITE } from '../data/site.js';

export function NavDrawer() {
  return h(Sheet, { uiKey: 'nav', side: 'left', label: 'Site menu' },
    h('div', { class: 'sh' }, h('span', { class: 'logo' }, SITE.short),
      h('button', { class: 'btn s', type: 'button', onClick: () => A.ui('nav', false) }, 'Close')),
    h(NavLinks, { variant: 'drawer' }),
    h('div', null, h('p', { class: 'fine' }, 'Theme'), h(ThemeSwitch, { variant: 'seg' })),
    waBtn(BOOK_TEXT, 'Book on WhatsApp'),
    telBtn(SITE.phones[0].tel, 'Call ' + SITE.phones[0].label),
    h('button', { class: 'btn', type: 'button', onClick: () => { A.ui('nav', false); A.ui('saved', true); } }, 'Saved list'));
}
