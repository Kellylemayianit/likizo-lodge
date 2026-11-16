// Hash router: #home, #about, #menu?who=n&plan=1, #contact
import { render } from './core/component.js';
import { store } from './core/store.js';
import { Home } from './views/Home.js';
import { About } from './views/About.js';
import { Menu } from './views/Menu.js';
import { Contact } from './views/Contact.js';
import { readFilters } from './utils/urlstate.js';
import { reveal } from './utils/reveal.js';
import { routeLoader, whenImagesReady } from './utils/loader.js';
import { SITE } from './data/site.js';

const routes = {
  home: { title: 'Home', view: Home },
  about: { title: 'About & gallery', view: About },
  menu: { title: 'Rooms & menu', view: Menu },
  contact: { title: 'Contact', view: Contact }
};

export function startRouter(outlet) {
  let unmount = null, first = true;
  const go = () => {
    const [path, query] = location.hash.slice(1).split('?');
    const key = routes[path] ? path : 'home';
    if (!first) routeLoader.start();
    if (unmount) unmount();
    store.set((s) => ({ route: key, ui: { ...s.ui, nav: false } }));
    if (key === 'menu' && query) readFilters(query);
    document.title = `${routes[key].title} | ${SITE.name}`;
    unmount = render(routes[key].view, {}, outlet);
    reveal(outlet);
    scrollTo(0, 0);
    if (!first) outlet.focus({ preventScroll: true });
    if (!first) whenImagesReady(outlet).then(routeLoader.end);
    first = false;
  };
  addEventListener('hashchange', go);
  go();
}
