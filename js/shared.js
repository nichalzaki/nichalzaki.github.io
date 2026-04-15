/* ── Theme ── */
const themeBtn = document.getElementById('themeToggle');
const root = document.documentElement;

function setTheme(dark) {
    root.dataset.theme = dark ? 'dark' : 'light';
    if (themeBtn) themeBtn.textContent = dark ? '☾' : '☀';
    localStorage.setItem('nz-theme-v2', dark ? 'dark' : 'light');
}
const savedTheme = localStorage.getItem('nz-theme-v2');
if (savedTheme === 'dark') setTheme(true);
if (themeBtn) themeBtn.addEventListener('click', () => setTheme(root.dataset.theme !== 'dark'));

/* ── Font size ── */
const fontBtn = document.getElementById('fontToggle');
let bigFont = localStorage.getItem('nz-font') === 'large';
function applyFont() {
    root.classList.toggle('text-large', bigFont);
    if (fontBtn) fontBtn.classList.toggle('active', bigFont);
}
applyFont();
if (fontBtn) fontBtn.addEventListener('click', () => {
    bigFont = !bigFont;
    localStorage.setItem('nz-font', bigFont ? 'large' : 'normal');
    applyFont();
});

/* ── Mobile nav hamburger ── */
const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('navMobile');
if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
}

/* ── Mouse Parallax — hero only ── */
let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX / innerWidth - .5;
    my = e.clientY / innerHeight - .5;
});
(function mouseRaf() {
    cx += (mx - cx) * .07;
    cy += (my - cy) * .07;
    document.querySelectorAll('.fl[data-speed]').forEach(el => {
        const s = +el.dataset.speed;
        el.style.transform = `translate(${cx * s}px, ${cy * s}px)`;
    });
    requestAnimationFrame(mouseRaf);
})();

/* ── Scroll Parallax — section letters ── */
function updateScrollParallax() {
    document.querySelectorAll('.sec-fl[data-scroll-speed]').forEach(el => {
        const rect = el.parentElement.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - innerHeight / 2;
        const speed = parseFloat(el.dataset.scrollSpeed);
        el.style.transform = `translateY(${centerOffset * speed}px)`;
    });
}
window.addEventListener('scroll', updateScrollParallax, { passive: true });
updateScrollParallax();

/* ── Scroll fade-in ── */
const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 90);
            io.unobserve(e.target);
        }
    });
}, { threshold: .08, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

/* ── Active nav link (same-page scroll sections) ── */
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('.nav-links a, .nav-mobile a');
if (secs.length) {
    window.addEventListener('scroll', () => {
        let cur = '';
        secs.forEach(s => { if (scrollY >= s.offsetTop - 80) cur = s.id; });
        nls.forEach(a => {
            const href = a.getAttribute('href');
            a.classList.toggle('active', href === '#' + cur);
        });
    }, { passive: true });
}

/* ── Active nav link (multipage) ── */
const currentPage = location.pathname.split('/').pop() || 'index.html';
nls.forEach(a => {
    const href = a.getAttribute('href');
    if (href && !href.startsWith('#') && href !== '#') {
        const linkPage = href.split('/').pop();
        if (linkPage === currentPage) a.classList.add('active');
    }
});

/* ── Helpers ── */
function smoothGo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ── WhatsApp ── */
function sendToWhatsApp() {
    const name = document.getElementById('f-name')?.value.trim() || '';
    const email = document.getElementById('f-email')?.value.trim() || '';
    const type = document.getElementById('f-type')?.value || '';
    const msg = document.getElementById('f-msg')?.value.trim() || '';
    if (!name || !type) {
        alert('Please fill in your name and select a project type.');
        return;
    }
    const text = `Hi Zaki! I found your portfolio and I'd like to discuss a project.\n\n*Name:* ${name}\n*Email:* ${email || '-'}\n*Service:* ${type}\n*Details:* ${msg || '-'}`;
    window.open(`https://wa.me/6282243813872?text=${encodeURIComponent(text)}`, '_blank');
}
