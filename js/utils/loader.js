// Loading feedback: a branded splash on first load, a thin progress bar on page changes.
const bar = document.createElement('div');
bar.className = 'route-bar';
bar.setAttribute('aria-hidden', 'true');
document.body.append(bar);

export const routeLoader = {
  start() { bar.className = 'route-bar run'; },
  end() {
    bar.className = 'route-bar done';
    setTimeout(() => { bar.className = 'route-bar'; }, 320);
  }
};

// Resolve when the first images of a view are decoded (or after maxMs), so the bar ends on real content.
export function whenImagesReady(root, maxMs = 450) {
  const imgs = [...root.querySelectorAll('img')].slice(0, 2).map((i) => (i.decode ? i.decode().catch(() => {}) : null));
  return Promise.race([Promise.all(imgs), new Promise((r) => setTimeout(r, maxMs))]);
}

export function hideSplash(minMs = 700, maxMs = 3500) {
  const splash = document.getElementById('loader');
  if (!splash) return;
  const done = () => { splash.classList.add('done'); setTimeout(() => splash.remove(), 500); };
  const loaded = new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true })));
  Promise.race([Promise.all([loaded, new Promise((r) => setTimeout(r, minMs))]), new Promise((r) => setTimeout(r, maxMs))]).then(done);
}
