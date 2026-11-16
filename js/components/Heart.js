import { h } from '../core/component.js';
import { A } from '../core/actions.js';
import { icon } from '../utils/icons.js';
import { itemName } from '../data/items.js';

// Save-to-wishlist toggle. text=true renders a labelled button instead of the round icon.
export function Heart({ id, text }, ctx) {
  const on = ctx.select((s) => s.wishlist.includes(id));
  const name = itemName(id);
  return h('button', {
    class: text ? 'btn s' : 'heart', type: 'button', 'aria-pressed': String(on),
    'aria-label': 'Save ' + name, onClick: () => A.toggleSaved(id, name)
  }, icon('heart', 22), text ? (on ? 'Saved' : 'Save') : null);
}
