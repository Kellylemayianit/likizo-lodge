import { h } from '../core/component.js';
import { A } from '../core/actions.js';
import { NAV } from '../data/nav.js';
import { icon } from '../utils/icons.js';
import { ThemeSwitch } from './ThemeSwitch.js';
import { SITE } from '../data/site.js';
import { BOOK_TEXT, waLink } from '../utils/format.js';

// variant 'bar' = desktop nav, 'drawer' = sidebar list
export function NavLinks({ variant }, ctx) {
  const route = ctx.select((s) => s.route);
  const links = NAV.map((n) => h('a', {
    href: '#' + n.key, 'aria-current': route === n.key ? 'page' : null,
    onClick: variant === 'drawer' ? () => A.ui('nav', false) : null
  }, n.label, variant === 'drawer' ? h('small', null, n.hint) : null));
  return variant === 'bar'
    ? h('nav', { 'aria-label': 'Main', class: 'bar-nav' }, links)
    : h('div', { class: 'dnav', role: 'navigation', 'aria-label': 'Site pages' }, links);
}

export function SavedButton({ id }, ctx) {
  const n = ctx.select((s) => s.wishlist.length);
  return h('button', {
    class: 'btn s save', id, type: 'button', 'aria-haspopup': 'dialog',
    'aria-label': `Saved list, ${n} item${n === 1 ? '' : 's'}`, onClick: () => A.ui('saved', true)
  }, icon('heart', 18), h('span', { class: 'st' }, 'Saved'), n ? h('span', { class: 'cnt' }, n) : null);
}

// Smart header: hides on scroll down (desktop), returns on scroll up, condenses, shows read progress.
export function Header(_, ctx) {
  ctx.onMount((el) => {
    let last = 0;
    const prog = el.querySelector('.prog');
    const onScroll = () => {
      const y = scrollY, max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      el.classList.toggle('sc', y > 20);
      prog.style.width = (y / max) * 100 + '%';
      if (innerWidth >= 900) {
        if (y > 140 && y > last + 4) el.classList.add('hide');
        else if (y < last - 4 || y < 140) el.classList.remove('hide');
      } else el.classList.remove('hide');
      last = y;
    };
    const show = () => el.classList.remove('hide');
    addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('focusin', show);
    return () => { removeEventListener('scroll', onScroll); el.removeEventListener('focusin', show); };
  });

  return h('header', { class: 'site-header' },
    h('div', { class: 'hl' },
      h('button', { class: 'btn s hbg', type: 'button', 'aria-haspopup': 'dialog', 'aria-label': 'Open menu', onClick: () => A.ui('nav', true) }, icon('menu', 22)),
      h('a', { class: 'logo', href: '#home', 'aria-label': SITE.name + ', home' }, icon('mountain', 30), SITE.short)),
    h(NavLinks, { variant: 'bar' }),
    h('div', { class: 'hb' }, h(ThemeSwitch, { variant: 'icon' }), h(SavedButton, { id: 'saved-btn' }),
      h('a', { class: 'btn s w', href: waLink(BOOK_TEXT), target: '_blank', rel: 'noopener' }, h('span', { class: 'hd' }, 'Book on\u00a0'), 'WhatsApp')),
    h('div', { class: 'prog' }));
}
