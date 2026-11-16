import { h } from '../core/component.js';
import { IMAGES } from '../data/images.js';

export function img(key, alt, { eager = false, cls = '' } = {}) {
  const i = IMAGES[key];
  return h('img', {
    src: i.src, alt, width: i.w, height: i.h, class: cls || null,
    loading: eager ? 'eager' : 'lazy', decoding: 'async'
  });
}
