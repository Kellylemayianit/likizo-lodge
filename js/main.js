import { h } from './core/component.js';
import { store } from './core/store.js';
import { App } from './components/App.js';
import { startRouter } from './router.js';
import { writeFilters } from './utils/urlstate.js';
import { applyTheme, followDevice } from './utils/theme.js';
import { hideSplash } from './utils/loader.js';

document.documentElement.classList.add('js');
applyTheme(store.get().theme);
followDevice(() => store.get().theme);
document.getElementById('app').replaceChildren(h(App));
startRouter(document.getElementById('main'));

let theme = store.get().theme;
store.subscribe((s) => {
  writeFilters(); // keep shareable filter state in the URL on the Rooms & menu page
  if (s.theme !== theme) { theme = s.theme; applyTheme(theme); }
});
hideSplash();
