/* Optional page enhancement only. Main text, links, FAQ, and the YouTube player work without JS. */
(function () {
  'use strict';
  var root = document.getElementById('fc-life-documentary');
  if (!root) return;
  root.dataset.lifeReady = 'true';
  // Keep internal links usable in the full local preview and a future Wix HTML insertion.
  root.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href^="#"]');
    if (!link || !root.contains(link)) return;
    var target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target || !root.contains(target)) return;
    // Browser's native anchor navigation is retained. No animation or link interception.
    if (target.tagName === 'MAIN' && !target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
    }
  });
})();
