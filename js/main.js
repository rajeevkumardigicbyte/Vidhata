/* =========================================================
   VIDHATA PLASTICS — MAIN JAVASCRIPT
   js/main.js
   ========================================================= */

'use strict';

// ── Utility ─────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── Loading Screen ───────────────────────────────────────
function initLoadingScreen() {
  const screen = $('#loading-screen');
  if (!screen) return;

  const hideScreen = () => {
    setTimeout(() => {
      screen.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1000);
  };

  // If the window is already fully loaded, hide loader immediately
  if (document.readyState === 'complete') {
    hideScreen();
  } else {
    window.addEventListener('load', hideScreen);
    // Safety Fallback: Force hide loader after 3 seconds in case window load stalls
    setTimeout(hideScreen, 3000);
  }

  document.body.style.overflow = 'hidden';
}

// ── Navbar ───────────────────────────────────────────────
function initNavbar() {
  const navbar = $('#navbar');
  if (!navbar) return;

  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const mobileLinks = $$('.navbar__mobile-link');
  let lastScroll = 0;

  // Scroll behavior
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide on scroll down, show on scroll up (past 300px)
    if (scrollY > 300) {
      if (scrollY > lastScroll && !mobileMenu?.classList.contains('open')) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = scrollY;
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Touch dropdown support (Tablet & Mobile viewport widths > 991px)
  const dropdowns = $$('.navbar__dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.navbar__link');
    if (!link) return;

    link.addEventListener('click', (e) => {
      // Toggle dropdown on tap for tablet/desktop layout
      if (window.innerWidth > 991) {
        const isOpen = dropdown.classList.contains('open');
        
        // Close others
        dropdowns.forEach(other => other.classList.remove('open'));

        if (!isOpen) {
          e.preventDefault();
          dropdown.classList.add('open');
        } else {
          // If already open, let the click navigate normally
          dropdown.classList.remove('open');
        }
      }
    });
  });

  // Close dropdowns on clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar__dropdown')) {
      dropdowns.forEach(d => d.classList.remove('open'));
    }
  });

  // Active link highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  $$('.navbar__link, .navbar__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Counter Animation ─────────────────────────────────────
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const formatNumber = (num, suffix) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'M' + suffix;
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K' + suffix;
    return num.toLocaleString() + suffix;
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = parseInt(el.dataset.duration) || 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.round(eased * target);

      el.textContent = prefix + formatNumber(current, suffix);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + formatNumber(target, suffix);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ── Particle Canvas Animation ─────────────────────────────
function initParticles() {
  const canvas = $('#particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  const resize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Particle {
    constructor() { this.reset(); }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.6 - 0.2;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = Math.random();
      this.maxLife = Math.random() * 0.002 + 0.001;
      const randVal = Math.random();
      this.hue = randVal < 0.7 ? 199 : 215; // Sky blue or slate
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life += this.maxLife;
      this.opacity = Math.sin(this.life * Math.PI) * 0.5;

      if (this.life >= 1 || this.y < -10) {
        this.y = canvas.height + 10;
        this.x = Math.random() * canvas.width;
        this.life = 0;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.hue === 199 ? `hsl(199, 89%, 48%)` : `hsl(215, 19%, 50%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Floating connections
  class ConnectionParticle extends Particle {
    constructor() {
      super();
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.maxLife = 0;
      this.opacity = Math.random() * 0.4 + 0.05;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
  }

  // Create particles
  const numParticles = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  const connParticles = [];
  const numConn = Math.min(40, Math.floor(canvas.width / 30));
  for (let i = 0; i < numConn; i++) {
    connParticles.push(new ConnectionParticle());
  }

  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < connParticles.length; i++) {
      for (let j = i + 1; j < connParticles.length; j++) {
        const dx = connParticles[i].x - connParticles[j].x;
        const dy = connParticles[i].y - connParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / maxDist) * 0.12;
          ctx.strokeStyle = 'rgba(14, 165, 233, 0.4)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(connParticles[i].x, connParticles[i].y);
          ctx.lineTo(connParticles[j].x, connParticles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    connParticles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });

    animFrame = requestAnimationFrame(animate);
  }

  // Pause when off-screen for performance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate();
      } else {
        cancelAnimationFrame(animFrame);
      }
    });
  });

  observer.observe(canvas.parentElement || canvas);
  animate();
}

// ── Typed Text Animation ──────────────────────────────────
function initTypedText() {
  const els = $$('[data-typed]');
  els.forEach(el => {
    const words = el.dataset.typed.split(',').map(s => s.trim());
    const speed = parseInt(el.dataset.speed) || 100;
    const pause = parseInt(el.dataset.pause) || 2000;
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    el.parentNode.insertBefore(cursor, el.nextSibling);

    const type = () => {
      const word = words[wordIdx];
      el.textContent = isDeleting ? word.substring(0, charIdx - 1) : word.substring(0, charIdx + 1);
      isDeleting ? charIdx-- : charIdx++;

      let delay = isDeleting ? speed / 2 : speed;

      if (!isDeleting && charIdx === word.length) {
        delay = pause;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 300;
      }

      setTimeout(type, delay);
    };

    setTimeout(type, 500);
  });
}

// ── Smooth Anchor Scrolling ────────────────────────────────
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── Cookie Banner ─────────────────────────────────────────
function initCookieBanner() {
  const banner = $('#cookie-banner');
  if (!banner) return;

  if (localStorage.getItem('vp-cookies')) return;

  setTimeout(() => banner.classList.add('visible'), 2500);

  $('#cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('vp-cookies', 'accepted');
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 600);
  });

  $('#cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('vp-cookies', 'declined');
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 600);
  });
}

// ── Parallax for Hero ──────────────────────────────────────
function initParallax() {
  const heroBg = $('.hero__bg');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ── Back to Top ────────────────────────────────────────────
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 500 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 500 ? 'all' : 'none';
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Video Autoplay on Intersection ────────────────────────
function initVideos() {
  $$('video[data-autoplay]').forEach(video => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        e.isIntersecting ? video.play().catch(() => {}) : video.pause();
      });
    }, { threshold: 0.3 });
    observer.observe(video);
  });
}

// ── Tilt Effect on Cards ───────────────────────────────────
function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  $$('[data-tilt]').forEach(el => {
    const strength = parseFloat(el.dataset.tilt) || 8;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(6px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
      setTimeout(() => { el.style.transition = ''; }, 400);
    });
  });
}

// ── Image Lazy Loading ────────────────────────────────────
function initLazyImages() {
  const images = $$('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });

  images.forEach(img => observer.observe(img));
}

// ── Interactive Grid ──────────────────────────────────────
function initInteractiveGrid() {
  $$('.bg-grid').forEach(grid => {
    const parent = grid.parentElement || grid;
    parent.addEventListener('mousemove', (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      grid.style.setProperty('--mouse-x', `${x}px`);
      grid.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ── Init Everything ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavbar();
  initCounters();
  initParticles();
  initTypedText();
  initSmoothScroll();
  initCookieBanner();
  initParallax();
  initBackToTop();
  initVideos();
  initTilt();
  initLazyImages();
  initInteractiveGrid();
});
