// Applies the chosen theme. "auto" follows the device (prefers-color-scheme).
const mq = matchMedia('(prefers-color-scheme: dark)');

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', theme);
  const dark = theme === 'dark' || (theme === 'auto' && mq.matches);
  const meta = document.querySelector('meta[name=theme-color]');
  if (meta) meta.content = dark ? '#1d1105' : '#4a2a0a';
}

export function followDevice(getTheme) {
  mq.addEventListener('change', () => applyTheme(getTheme()));
}
