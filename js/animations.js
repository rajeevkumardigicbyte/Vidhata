/* =========================================================
   VIDHATA PLASTICS — SCROLL ANIMATIONS
   js/animations.js
   ========================================================= */

'use strict';

// ── Intersection Observer Scroll Reveals ─────────────────
function initScrollReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  const staggerEls = document.querySelectorAll('[data-stagger]');

  if (!revealEls.length && !staggerEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
  staggerEls.forEach(el => observer.observe(el));
}

// ── Progress Bars on Scroll ──────────────────────────────
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.dataset.width || '100%';
        setTimeout(() => {
          fill.style.transform = `scaleX(${parseFloat(width) / 100})`;
          fill.classList.add('animated');
        }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ── Section Number Highlight ──────────────────────────────
function initSectionNumbers() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.navbar__link[href]');

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href').includes(id));
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ── Magnetic Buttons ──────────────────────────────────────
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    const strength = parseFloat(btn.dataset.magnetic) || 0.3;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
      
      // 3D Parallax: Translate direct children slightly for visual depth
      const children = btn.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].tagName === 'STYLE') continue;
        children[i].style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
        children[i].style.transition = 'none';
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
      
      // Reset children positions
      const children = btn.children;
      for (let i = 0; i < children.length; i++) {
        children[i].style.transform = '';
        children[i].style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        setTimeout(() => { children[i].style.transition = ''; }, 400);
      }
    });
  });
}

// ── Ripple Effect ─────────────────────────────────────────
function initRipple() {
  document.querySelectorAll('[data-ripple]').forEach(el => {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';

    el.addEventListener('click', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        width: 4px;
        height: 4px;
        background: rgba(255,255,255,0.3);
        transform: scale(0);
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;

      el.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

// ── Sticky Progress Bar ───────────────────────────────────
function initReadingProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / docH) * 100;
    bar.style.width = Math.min(progress, 100) + '%';
  }, { passive: true });
}

// ── Card 3D Hover ─────────────────────────────────────────
function initCard3D() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('[data-3d]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      const strength = parseFloat(card.dataset['3d']) || 10;

      card.style.transform = `
        perspective(800px)
        rotateX(${-y * strength * 0.5}deg)
        rotateY(${x * strength * 0.5}deg)
        translateZ(8px)
      `;

      // Inner glow follow
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${(x * 50 + 50)}% ${(y * 50 + 50)}%, rgba(37, 99, 235,0.15) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Tabs Component ────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabContainer => {
    const tabs = tabContainer.querySelectorAll('[data-tab]');
    const panels = tabContainer.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const panel = tabContainer.querySelector(`[data-panel="${target}"]`);
        if (panel) {
          panel.classList.add('active');
          panel.setAttribute('data-reveal', 'up');
          setTimeout(() => panel.classList.add('revealed'), 10);
        }
      });
    });
  });
}

// ── Accordion Component ───────────────────────────────────
function initAccordion() {
  document.querySelectorAll('[data-accordion]').forEach(item => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const content = item.querySelector('[data-accordion-content]');
    if (!trigger || !content) return;

    // Set max-height for animation
    content.style.maxHeight = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)';

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all siblings
      const accordion = item.closest('[data-accordion-group]');
      if (accordion) {
        accordion.querySelectorAll('[data-accordion].open').forEach(openItem => {
          openItem.classList.remove('open');
          openItem.querySelector('[data-accordion-content]').style.maxHeight = '0';
        });
      }

      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// ── Image Parallax ────────────────────────────────────────
function initImageParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const images = document.querySelectorAll('[data-parallax]');
  if (!images.length) return;

  let ticking = false;

  const update = () => {
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const speed = parseFloat(img.dataset.parallax) || 0.3;
      const center = rect.top + rect.height / 2;
      const offset = (window.innerHeight / 2 - center) * speed;
      img.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

// ── Cursor Glow Effect ────────────────────────────────────
function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(37, 99, 235,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: opacity 0.3s;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0;
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  const animate = () => {
    cx += (mx - cx) * 0.06;
    cy += (my - cy) * 0.06;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(animate);
  };

  animate();
}

// ── Image Scroll Animations ───────────────────────────────
function initImageAnimations() {
  const animatedImgs = document.querySelectorAll(
    '.img-fade-in, .img-slide-left, .img-slide-right, .img-scale-in'
  );
  if (!animatedImgs.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animatedImgs.forEach(img => observer.observe(img));
}

// ── Init All ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initProgressBars();
  initSectionNumbers();
  initMagneticButtons();
  initRipple();
  initReadingProgress();
  initCard3D();
  initTabs();
  initAccordion();
  initImageParallax();
  initCursorGlow();
  initImageAnimations();
});

