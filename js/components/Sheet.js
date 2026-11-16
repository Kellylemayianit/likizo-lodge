// A <dialog> driven by the store. side = 'left' | 'right' | 'modal'.
import { h } from '../core/component.js';
import { A } from '../core/actions.js';

export function Sheet({ uiKey, side, label, closed = false, children }, ctx) {
  const dlg = h('dialog', { class: side === 'modal' ? 'modal' : 'side ' + side, 'aria-label': label },
    h('div', { class: 'dl' }, children));
  dlg.addEventListener('close', () => A.ui(uiKey, closed));
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  ctx.watch((s) => s.ui[uiKey] !== closed, (open) => {
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, true);
  return dlg;
}
