import { h } from '../core/component.js';
import { ROOMS, PLANS } from '../data/rooms.js';
import { waLink } from '../utils/format.js';

const field = (label, input) => h('label', null, label, input);
const opts = (list) => list.map((x) => h('option', null, x));

export function BookingForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    const d = new FormData(e.target), g = (k) => d.get(k) || '-';
    open(waLink(`Hello Likizo Lodge, booking request.\nName: ${g('nm')}\nCheck-in: ${g('ci')}\nCheck-out: ${g('co')}\nGuests: ${g('gs')} (${g('wh')})\nRoom: ${g('rm')}, ${g('pl')}\nNotes: ${g('nt')}`), '_blank', 'noopener');
  };
  return h('form', { onSubmit },
    field('Your name', h('input', { name: 'nm', required: true, autocomplete: 'name' })),
    h('div', { class: 'two' }, field('Check-in', h('input', { type: 'date', name: 'ci' })), field('Check-out', h('input', { type: 'date', name: 'co' }))),
    h('div', { class: 'two' },
      field('Guests', h('input', { type: 'number', name: 'gs', min: 1, value: 2, inputmode: 'numeric' })),
      field('Guest type', h('select', { name: 'wh' }, opts(['Kenya resident', 'Non-resident'])))),
    field('Room', h('select', { name: 'rm' }, opts(ROOMS.map((r) => r.name)))),
    field('Meal plan', h('select', { name: 'pl' }, opts(PLANS))),
    field('Notes, such as honeymoon or safari', h('textarea', { name: 'nt', rows: 3 })),
    h('button', { class: 'btn w', type: 'submit' }, 'Send booking on WhatsApp'));
}
