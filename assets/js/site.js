/* nichalzaki.github.io — interaksi kecil. Tidak ada isi situs di file ini. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var doc = document.documentElement;

  /* Menu ponsel */
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    if (!btn || !menu) return;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open);
    btn.innerHTML = open ? 'Close <span aria-hidden="true">×</span>' : 'Menu <span aria-hidden="true">+</span>';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (btn) btn.addEventListener('click', function () { setMenu(menu.hidden); });
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 860) setMenu(false); });

  /* Judul hero: tiap baris naik bergantian */
  var title = document.querySelector('.hero__title');
  if (title && !reduce) {
    var parts = title.innerHTML.split(/<br\s*\/?>/i);
    title.innerHTML = parts.map(function (p) { return '<span class="ln"><span>' + p.trim() + '</span></span>'; }).join('');
  }

  /* Muncul saat di-scroll */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  /* Angka menghitung naik (hanya angka di awal, mis. "300+") */
  if (!reduce && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        var el = e.target, m = el.textContent.match(/^(\d+)(.*)$/);
        if (!m) return;
        var end = +m[1], rest = m[2], t0 = null, dur = 1100;
        function step(t) {
          if (!t0) t0 = t;
          var k = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
          el.textContent = v + rest;
          if (k < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach(function (el) { co.observe(el); });
  }

  /* Menu aktif sesuai bagian yang sedang dibaca */
  var links = document.querySelectorAll('.nav__links a');
  var secs = [];
  links.forEach(function (a) {
    var id = (a.getAttribute('href') || '').split('#')[1];
    var s = id && document.getElementById(id);
    if (s) secs.push([s, a]);
  });
  if (secs.length && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        secs.forEach(function (p) { if (p[0] === e.target) p[1].classList.toggle('is-on', e.isIntersecting); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (p) { so.observe(p[0]); });
  }

  /* Kembali ke atas */
  var top = document.getElementById('toTop');
  if (top) top.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
})();
