/* Theme toggle + section scroll-spy, shared across pages. */
(function () {
  // ---- theme ----
  var btn = document.getElementById('tog');
  if (btn) {
    btn.addEventListener('click', function () {
      var root = document.documentElement;
      var explicit = root.getAttribute('data-theme');
      var dark = explicit
        ? explicit === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      var next = dark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('qb-theme', next); } catch (e) {}
    });
  }

  // ---- scroll-spy (doc pages only) ----
  var links = Array.prototype.slice.call(document.querySelectorAll('#toc a'));
  if (!links.length) return;

  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  function setCurrent(id) {
    var passed = true;
    links.forEach(function (a) {
      var mine = a.getAttribute('href').slice(1) === id;
      if (mine) {
        a.setAttribute('aria-current', 'true');
        passed = false;
      } else {
        a.removeAttribute('aria-current');
      }
      a.classList.toggle('read', passed && !mine);
    });
  }

  if ('IntersectionObserver' in window) {
    var visible = {};
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].id]) { setCurrent(sections[i].id); return; }
      }
    }, { rootMargin: '-12% 0px -70% 0px', threshold: 0 });
    sections.forEach(function (s) { obs.observe(s); });
  }

  setCurrent(sections[0].id);
}());
