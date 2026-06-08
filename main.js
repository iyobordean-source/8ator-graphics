// === 8ator Graphic ===

// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Cursor glow
const glow = document.getElementById('cursorGlow');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let gx = mx, gy = my;
window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
function loop() {
  gx += (mx - gx) * 0.12;
  gy += (my - gy) * 0.12;
  glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
  requestAnimationFrame(loop);
}
loop();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('in'), delay);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 3D tilt on cards
const tiltEls = document.querySelectorAll('.tilt');
tiltEls.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// Parallax on hero scene
const scene = document.querySelector('.scene');
if (scene) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    scene.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  });
}

// Smooth nav active state
const navLinks = document.querySelectorAll('.nav-links a');
const sections = [...document.querySelectorAll('section[id]')];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  const cur = sections.find(s => y >= s.offsetTop && y < s.offsetTop + s.offsetHeight);
  if (!cur) return;
  navLinks.forEach(a => a.style.color = a.getAttribute('href') === '#' + cur.id ? '#fff' : '');
});
