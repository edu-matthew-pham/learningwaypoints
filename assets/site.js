/* Learning Waypoints — shared nav and footer.
   Edit the MENU below to change the site's navigation everywhere.
   Rule: a submenu lists tools (or, for Getting Started, its two pages) and nothing else. */

(function () {
  var MENU = [
    { label: 'Getting Started', href: '/getting-started/', items: [
      { label: 'Ask your AI', href: '/getting-started/ask-your-ai/', note: 'One link, pasted into the AI you already use' },
      { label: 'Walk the loop', href: '/getting-started/walk-the-loop/', note: 'A short tour, one thing to try in each part' }
    ]},
    { label: 'Curriculum', href: '/curriculum/', items: [
      { label: 'ACARA Progressions', href: 'https://acara.learningwaypoints.com' },
      { label: 'MYP Explorer', href: 'https://myp.learningwaypoints.com' },
      { label: 'Topic Explorer', href: 'https://topic.learningwaypoints.com' }
    ]},
    { label: 'Plan', href: '/plan/', items: [
      { label: 'Planner', href: 'https://planner.learningwaypoints.com' },
      { label: 'Signal', href: 'https://signal.learningwaypoints.com/teacher' },
      { label: 'Insight', href: 'https://insight.learningwaypoints.com' }
    ]},
    { label: 'Lessons', href: '/lessons/', items: [
      { label: 'Tutorials', href: 'https://tutorials.learningwaypoints.com' },
      { label: 'Prepare', href: 'https://prepare.learningwaypoints.com' },
      { label: 'Audio', href: 'https://audio.learningwaypoints.com' }
    ]}
  ];

  var FOOTER_TOOLS = [
    { group: 'Curriculum', items: [
      ['ACARA Progressions', 'https://acara.learningwaypoints.com'],
      ['MYP Explorer', 'https://myp.learningwaypoints.com'],
      ['Topic Explorer', 'https://topic.learningwaypoints.com']
    ]},
    { group: 'Plan', items: [
      ['Planner', 'https://planner.learningwaypoints.com'],
      ['Signal', 'https://signal.learningwaypoints.com/teacher'],
      ['Insight', 'https://insight.learningwaypoints.com']
    ]},
    { group: 'Lessons', items: [
      ['Tutorials', 'https://tutorials.learningwaypoints.com'],
      ['Prepare', 'https://prepare.learningwaypoints.com'],
      ['Audio', 'https://audio.learningwaypoints.com']
    ]},
    { group: 'Prompts for your AI', items: [
      ['Waypoints Kit', 'https://kit.learningwaypoints.com'],
      ['Ask your AI', '/getting-started/ask-your-ai/']
    ]}
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  function isCurrent(href) {
    var p = location.pathname.replace(/index\.html$/, '');
    return href.charAt(0) === '/' && p.indexOf(href) === 0;
  }

  function navHtml() {
    var h = '<a class="lw-logo" href="/">Learning Waypoints</a><ul class="lw-menu">';
    MENU.forEach(function (m) {
      h += '<li class="lw-item"' + (isCurrent(m.href) ? ' data-current' : '') + '>';
      h += '<a class="lw-top" href="' + m.href + '">' + esc(m.label) + '</a><ul class="lw-sub">';
      m.items.forEach(function (it) {
        h += '<li><a href="' + it.href + '">' + esc(it.label) + (it.note ? '<small>' + esc(it.note) + '</small>' : '') + '</a></li>';
      });
      h += '</ul></li>';
    });
    h += '</ul>';
    h += '<button class="lw-burger" type="button" aria-label="Open menu" aria-expanded="false">' +
         '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>';
    return h;
  }

  function drawerHtml() {
    var h = '<button class="lw-drawer-close" type="button" aria-label="Close menu">✕</button>';
    MENU.forEach(function (m) {
      h += '<section><h4><a href="' + m.href + '">' + esc(m.label) + '</a></h4><ul>';
      m.items.forEach(function (it) { h += '<li><a href="' + it.href + '">' + esc(it.label) + '</a></li>'; });
      h += '</ul></section>';
    });
    h += '<section><ul><li><a href="/philosophy/">Philosophy</a></li><li><a href="/support/">Support</a></li></ul></section>';
    return h;
  }

  function footerHtml() {
    var h = '<div class="lw-footer-inner"><div class="lw-footer-tools">';
    FOOTER_TOOLS.forEach(function (g) {
      h += '<div><h5>' + esc(g.group) + '</h5><ul>';
      g.items.forEach(function (t) { h += '<li><a href="' + t[1] + '">' + esc(t[0]) + '</a></li>'; });
      h += '</ul></div>';
    });
    h += '</div><div class="lw-footer-base"><p>© 2026 Learning Waypoints · Free to use · No account required</p>' +
         '<nav><a href="/philosophy/">Philosophy</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/support/">Support</a></nav></div></div>';
    return h;
  }

  function mount() {
    var navEl = document.getElementById('lw-nav');
    if (navEl) {
      navEl.className = 'lw-nav';
      navEl.innerHTML = navHtml();
      var backdrop = document.createElement('div'); backdrop.className = 'lw-backdrop';
      var drawer = document.createElement('div'); drawer.className = 'lw-drawer'; drawer.innerHTML = drawerHtml();
      document.body.appendChild(backdrop); document.body.appendChild(drawer);
      var burger = navEl.querySelector('.lw-burger');
      function open() { drawer.classList.add('open'); backdrop.classList.add('open'); burger.setAttribute('aria-expanded', 'true'); }
      function close() { drawer.classList.remove('open'); backdrop.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
      burger.addEventListener('click', open);
      backdrop.addEventListener('click', close);
      drawer.querySelector('.lw-drawer-close').addEventListener('click', close);
      drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    }
    var footEl = document.getElementById('lw-footer');
    if (footEl) { footEl.className = 'lw-footer'; footEl.innerHTML = footerHtml(); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
