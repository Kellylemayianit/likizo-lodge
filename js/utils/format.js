import { SITE } from '../data/site.js';

export const money = (v, who) => (v == null ? '–' : who === 'r' ? 'KSh ' + v.toLocaleString('en-KE') : 'USD ' + v);
export const priceFor = (room, who, plan, occ) => {
  const a = room.rates[who][plan];
  return a[occ && a.length > 1 ? 1 : 0];
};
export const fromPrice = (room, who) => Math.min(...room.rates[who].map((a) => a[0]));
export const waLink = (text) => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(text)}`;
export const BOOK_TEXT = 'Hello Likizo Lodge, I’d like to make a booking. Dates: ';
