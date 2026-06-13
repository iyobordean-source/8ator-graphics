// ============================================
// CONFIG
// ============================================
const CONFIG = {
  whatsappNumber: '2349039711713'
};

// ============================================
// HELPERS
// ============================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCursor();
  initSmoothScroll();
  initCounters();
  initPortfolioFilter();
  initContactForm();
  initScrollAnimations();
});

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  const navbar = $('#navbar');
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCursor() {
  const cursor = $('#cursor');
  const follower = $('#cursorFollower');

  if (!cursor || !follower) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    setTimeout(() => {
      follower.style.left = `${e.clientX}px`;
      follower.style.top = `${e.clientY}px`;
    }, 100);
  });

  $$('.p-card, .service-item, .reach-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      follower.classList.add('cursor-hover');
    });

    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      follower.classList.remove('cursor-hover');
    });
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const target = document.querySelector(
        anchor.getAttribute('href')
      );

      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

// ============================================
// COUNTERS
// ============================================
function initCounters() {
  const counters = $$('[data-target]');

  const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    const increment = target / 100;

    let current = 0;

    const update = () => {
      current += increment;

      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => observer.observe(counter));
}

// ============================================
// PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
  const filters = $$('.filter');
  const cards = $$('.p-card');

  filters.forEach(button => {
    button.addEventListener('click', () => {

      filters.forEach(btn =>
        btn.classList.remove('active')
      );

      button.classList.add('active');

      const filter = button.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const form = $('#contactForm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const service = $('#service').value;
    const message = $('#message').value.trim();

    const whatsappMessage = `
Hello! I'd like to inquire about your services.

*Name:* ${name}
*Email:* ${email}
*Service:* ${service}
*Message:* ${message}
`;

    const url =
      `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(url, '_blank');
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const elements = $(
    '.p-card, .service-item, .about-text, .about-visual'
  );

  const animate = () => {
    document
      .querySelectorAll('.p-card, .service-item, .about-text, .about-visual')
      .forEach(el => {
        const rect = el.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.85) {
          el.classList.add('visible');
        }
      });
  };

  window.addEventListener('scroll', animate);
  animate();
}