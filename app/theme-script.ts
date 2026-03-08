/** Inline script run before paint to prevent theme flash. Sets data-theme on <html>. */
export const THEME_SCRIPT = `
(function() {
  var storage = typeof localStorage !== 'undefined' ? localStorage : null;
  var key = 'theme';
  var stored = storage ? storage.getItem(key) : null;
  var prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
`;
