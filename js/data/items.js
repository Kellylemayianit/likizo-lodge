// Resolve a wishlist id ("room:std", "svc:pool", "img:cabin") to a name + thumbnail.
import { ROOMS } from './rooms.js';
import { SERVICES } from './services.js';
import { GALLERY } from './gallery.js';

export function itemInfo(id) {
  const [kind, key] = id.split(':');
  if (kind === 'room') { const r = ROOMS.find((x) => x.id === key); return { name: r.name, img: r.img }; }
  if (kind === 'svc') { const s = SERVICES.find((x) => x.id === key); return { name: s.name, img: s.img }; }
  const g = GALLERY.find((x) => x.id === key);
  return { name: 'Photo: ' + g.alt, img: g.img };
}
export const itemName = (id) => itemInfo(id).name;
