/* Shared by every page in /games/. Starts the game on click and shows "More games". */
(function () {
  var p = document.getElementById('player');
  if (!p) return;

  function track() {
    try {
      var id = p.dataset.id;
      var r = JSON.parse(localStorage.getItem('geckoRecent') || '[]').filter(function (x) { return x !== id; });
      r.unshift(id);
      localStorage.setItem('geckoRecent', JSON.stringify(r.slice(0, 12)));
      var s = JSON.parse(localStorage.getItem('geckoStats') || '{"xp":0,"played":[]}');
      var first = s.played.indexOf(id) < 0;
      if (first) s.played.push(id);
      s.xp += first ? 15 : 10;
      localStorage.setItem('geckoStats', JSON.stringify(s));
    } catch (e) {}
  }

  function start() {
    if (p.querySelector('iframe') || !p.dataset.src) return;
    track();
    var f = document.createElement('iframe');
    f.id = 'gameFrame';
    f.title = p.dataset.title || 'Game';
    f.allowFullscreen = true;
    f.setAttribute('allow', 'fullscreen; autoplay; gamepad');
    if (p.dataset.sandbox !== 'none') f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-pointer-lock allow-orientation-lock');
    if (p.dataset.scroll !== 'yes') f.setAttribute('scrolling', 'no');
    f.src = p.dataset.src;
    p.appendChild(f);
    var o = document.getElementById('overlay');
    if (o) o.remove();
    f.focus();
  }

  var btn = document.getElementById('playBtn');
  if (btn) btn.addEventListener('click', function () { if (btn.tagName === 'BUTTON') start(); else track(); });

  var fs = document.getElementById('fsBtn');
  if (fs) fs.addEventListener('click', function () {
    start();
    var f = p.querySelector('iframe') || p;
    (f.requestFullscreen || f.webkitRequestFullscreen || function () {}).call(f);
  });

  var grid = document.getElementById('moreGrid');
  if (!grid) return;
  fetch('/games.json').then(function (r) { return r.json(); }).then(function (all) {
    var cur = all.filter(function (g) { return g.id === p.dataset.id; })[0];
    var rest = all.filter(function (g) { return !g.hidden && g.id !== p.dataset.id; });
    function shuffle(a) { return a.sort(function () { return Math.random() - .5; }); }
    var same = shuffle(rest.filter(function (g) { return cur && g.category === cur.category; }));
    var other = shuffle(rest.filter(function (g) { return !cur || g.category !== cur.category; }));
    var pick = same.concat(other).slice(0, 6);
    function e(s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
    grid.innerHTML = pick.map(function (g) {
      return '<a class="mg" href="/games/' + e(g.id) + '/"><img src="' + e(/^(https?:)?\/\/|^\//.test(g.img) ? g.img : '/' + g.img) + '" loading="lazy" referrerpolicy="no-referrer" alt="' + e(g.title) + '" onerror="this.style.visibility=\'hidden\'"/><span>' + e(g.title) + '</span></a>';
    }).join('');
  }).catch(function () { var m = document.querySelector('.more'); if (m) m.style.display = 'none'; });
})();

/* "Best ... games" pages: refresh the list from games.json so new games appear */
(function () {
  var cg = document.getElementById('collGrid');
  if (!cg) return;
  var C = cg.dataset.cat, TWO = (window.GECKO && window.GECKO.twoPlayer) || [];
  function e(s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  fetch('/games.json').then(function (r) { return r.json(); }).then(function (all) {
    var list = all.filter(function (g) {
      if (g.hidden) return false;
      var cat = g.category === '2 Player' ? 'Action' : g.category;
      var two = g.category === '2 Player' || TWO.indexOf(g.id) > -1 || (g.tags || []).indexOf('2 Player') > -1;
      return cat === C || (C === '2 Player' && two) || (g.tags || []).indexOf(C) > -1;
    });
    if (!list.length) return;
    cg.innerHTML = list.map(function (g) {
      var img = /^(https?:)?\/\/|^\//.test(g.img) ? g.img : '/' + g.img;
      return '<a class="mg" href="/games/' + e(g.id) + '/"><img src="' + e(img) + '" loading="lazy" referrerpolicy="no-referrer" alt="' + e(g.title) + '" onerror="this.style.visibility=\'hidden\'"/><span>' + e(g.title) + '</span><p>' + e(g.desc) + '</p></a>';
    }).join('');
  }).catch(function () {});
})();
