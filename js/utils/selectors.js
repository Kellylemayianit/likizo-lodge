// Derived state, shared by components.
import { ROOMS } from '../data/rooms.js';
import { GALLERY } from '../data/gallery.js';

export const visibleRooms = (s) => ROOMS.filter((r) => !s.types.length || s.types.includes(r.id));
export const visibleGallery = (s) => GALLERY.filter((g) => s.cat === 'All' || g.cat === s.cat);
