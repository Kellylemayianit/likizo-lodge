# Amboseli Likizo Lodge: modular vanilla SPA

No build step and no dependencies. ES modules, a hash router, a central store and small React-style components.

## Run it
ES modules need a web server (opening `index.html` from the file system will not work):

    npx serve .          # or: python3 -m http.server 8000

Deploy by uploading the folder as-is to any static host (Cloudflare Pages, Netlify, GitHub Pages).

## Structure
    index.html              shell, SEO meta + JSON-LD, splash loader, pre-paint theme script
    css/
      tokens.css            colours, fonts, light + dark values
      base.css              reset, type, focus ring, utilities
      layout.css            header, nav, footer, grid, breakpoints (wide desktop)
      components.css        buttons, chips, cards, tables, gallery, forms, dialogs
      views.css             hero, story rows, quote band, reveal animation
      loader.css            splash, route progress bar, view entrance
    js/
      main.js               boot: theme, mount App, start router
      router.js             #home #about #menu #contact (+ filter query on #menu)
      core/
        component.js        h(), components, ctx.select / watch / onMount / onCleanup
        store.js            one state object, subscribe, localStorage persistence
        actions.js          every state change (A.setPlan, A.toggleSaved, ...)
      components/           Header, NavDrawer, Sheet (dialog), Filters, RoomCard,
                            ServiceCard, Gallery + Lightbox, SavedSheet, BookingForm,
                            ThemeSwitch, Footer, Blocks, App
      views/                Home, About, Menu, Contact
      data/                 site, rooms (prices), services, gallery, images, nav
      utils/                format, selectors, urlstate, theme, loader, reveal, icons, img
    assets/img/             the lodge's photos

## How it works (React-like)
- `h('div', {class: 'x'}, child)` builds DOM. `h(MyComponent, props)` mounts a function component.
- A component is `(props, ctx) => Element`.
  - `ctx.select(s => s.who)` reads state and re-renders that component when the value changes.
  - `ctx.watch(selector, cb)` reacts without re-rendering (used by dialogs and live regions).
  - `ctx.onMount(el => cleanup)` and `ctx.onCleanup(fn)` are the lifecycle hooks.
- Components never change state directly; they call `A.*` actions.
- Focus is restored after a re-render via `data-fk` keys, so keyboard users keep their place in the filter panel.

## Things to edit
- **Prices:** `js/data/rooms.js` (rates are `[single, double]`, or `[per house]`).
- **Opening year:** `founded` in `js/data/site.js` (shows "Est. 20XX" on About).
- **Phone / WhatsApp / email:** `js/data/site.js`.
- **Photos:** replace files in `assets/img/` (keep the names, or update `js/data/images.js` with new sizes).
  The current images were cropped from phone screen recordings, so swap in the originals.
- **Shareable filters:** `#menu?who=n&plan=1&occ=1&type=std,vip`.
