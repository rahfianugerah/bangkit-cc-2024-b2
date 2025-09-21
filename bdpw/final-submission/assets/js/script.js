// Slides & dots
const slides = document.querySelectorAll('.myslide');
const dots = document.querySelectorAll('.dot');

let index = 0;
let timer = null;
const INTERVAL = 6000;

function showSlide(i) {
    if (i < 0) i = slides.length - 1;
    if (i >= slides.length) i = 0;
    index = i;

    slides.forEach((s, k) => {
        const active = k === index;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', String(!active));
    });

    dots.forEach((d, k) => d.classList.toggle('is-active', k === index));
}
function startAuto() { stopAuto(); timer = setInterval(() => next(), INTERVAL); }
function stopAuto() { if (timer) clearInterval(timer); timer = null; }
function next() { showSlide(index + 1); }
function prev() { showSlide(index - 1); }

document.querySelector('.next').addEventListener('click', () => { next(); startAuto(); });
document.querySelector('.prev').addEventListener('click', () => { prev(); startAuto(); });
dots.forEach((btn, i) => btn.addEventListener('click', () => { showSlide(i); startAuto(); }));

// Touch swipe
let touchStartX = 0;
let touchEndX = 0;
const sliderEl = document.querySelector('.slider');
sliderEl.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
sliderEl.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const dx = touchEndX - touchStartX;
    if (Math.abs(dx) > 40) { if (dx < 0) next(); else prev(); startAuto(); }
}, { passive: true });

// Start
showSlide(0);
startAuto();

// Pause on hover
sliderEl.addEventListener('mouseenter', stopAuto);
sliderEl.addEventListener('mouseleave', startAuto);

// Contact drawer
const contactLink = document.getElementById('contact-link');
const contactAside = document.querySelector('.contact-aside');
const closeAside = document.getElementById('close-aside');

contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    contactAside.classList.add('active');
    contactAside.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
});
closeAside.addEventListener('click', () => {
    contactAside.classList.remove('active');
    contactAside.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
});

// Reveal on scroll
const toReveal = document.querySelectorAll('.reveal, .reveal-up');
const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal--in');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
toReveal.forEach(el => io.observe(el));

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    document.documentElement.classList.toggle('nav-open');
});
