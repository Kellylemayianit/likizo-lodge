// Layout building blocks used by views.
import { h } from '../core/component.js';
import { SITE } from '../data/site.js';
import { img } from '../utils/img.js';

export const hero = ({ image, alt, kicker, title, lead, actions }) =>
  h('section', { class: 'hero' }, img(image, alt, { eager: true }),
    h('div', { class: 'tx' }, h('p', { class: 'kick' }, kicker), h('h1', null, title), h('p', { class: 'lead' }, lead),
      h('div', { class: 'row' }, actions)));

export const story = ({ image, alt, title, body, rev, extra }) =>
  h('section', { class: 'story reveal' + (rev ? ' rev' : '') }, img(image, alt),
    h('div', null, h('h2', null, title), body, extra));

export const band = (quote, sub) =>
  h('div', { class: 'band reveal' }, h('p', null, quote), h('small', null, sub));

export const facts = () =>
  h('div', { class: 'facts' },
    h('div', null, h('b', null, SITE.checkIn), 'Check-in'),
    h('div', null, h('b', null, SITE.checkOut), 'Check-out'),
    h('div', null, h('b', null, 'Free'), 'Pool & Wi-Fi'));

export const est = () =>
  h('div', { class: 'est' }, h('b', null, SITE.founded ? 'Est. ' + SITE.founded : 'Opening year to be added'), h('span', null, SITE.name + ', Kimana'));

export const section = (title, lead, ...kids) =>
  h('section', { class: 'sec reveal' }, title ? h('h2', null, title) : null, lead ? h('p', { class: 'lead' }, lead) : null, ...kids);
