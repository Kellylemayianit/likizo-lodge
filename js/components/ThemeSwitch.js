import { h } from '../core/component.js';
import { A } from '../core/actions.js';
import { icon } from '../utils/icons.js';
import { chip } from './ui.js';

const MODES = [['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']];

// variant 'icon': one button that cycles Auto > Light > Dark (header). 'seg': three choices (menu).
export function ThemeSwitch({ variant }, ctx) {
  const theme = ctx.select((s) => s.theme);
  if (variant === 'seg') {
    return h('div', { class: 'seg', role: 'group', 'aria-label': 'Theme' },
      MODES.map(([k, label]) => chip(label, theme === k, () => A.setTheme(k), 'theme-' + k)));
  }
  const i = MODES.findIndex(([k]) => k === theme);
  const next = MODES[(i + 1) % MODES.length];
  return h('button', {
    class: 'btn s theme-btn', type: 'button', 'data-fk': 'theme-cycle',
    'aria-label': `Theme: ${MODES[i][1]}. Switch to ${next[1]}`, title: `Theme: ${MODES[i][1]}`,
    onClick: () => A.setTheme(next[0])
  }, icon(theme === 'auto' ? 'auto' : theme === 'dark' ? 'moon' : 'sun', 18));
}
