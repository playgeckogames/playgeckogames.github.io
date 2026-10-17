/* Shared by every page in /games/. Starts the game on click and shows "More games". */
(function () {
  var p = document.getElementById('player');
  if (!p) return;

  function start() {
    if (p.querySelector('iframe') || !p.dataset.src) return;
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
  if (btn && btn.tagName === 'BUTTON') btn.addEventListener('click', start);

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
