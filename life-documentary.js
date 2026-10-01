/* Optional page enhancement only. Main text, links, FAQ, and the YouTube player work without JS. */
(function () {
  'use strict';
  var root = document.getElementById('fc-life-documentary');
  if (!root) return;
  root.dataset.lifeReady = 'true';
  root.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link || !root.contains(link)) return;
    // A full document load also clears this page's static Wix styles when linking to another page, including /#about.
    var destination = new URL(link.href, window.location.href);
    if (destination.origin === window.location.origin && destination.pathname !== window.location.pathname && (!link.target || link.target === '_self') && !link.hasAttribute('download')) {
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(link.href);
      return;
    }
    var href = link.getAttribute('href');
    if (href.charAt(0) !== '#') return;
    var target = document.getElementById(href.slice(1));
    if (!target || !root.contains(target)) return;
    // Retain native navigation for anchors within this page.
    if (target.tagName === 'MAIN' && !target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
    }
  }, true);
})();
