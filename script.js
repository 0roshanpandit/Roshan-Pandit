(() => {
  const stars = document.querySelector('.space-stars');
  const count = window.innerWidth < 700 ? 95 : 180;

  // Generate the moving star field.
  for (let i = 0; i < count; i++) {
    const s = document.createElement('i');
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.setProperty('--x', `${(Math.random() - .5) * 160}px`);
    s.style.setProperty('--y', `${(Math.random() - .5) * 130}px`);
    s.style.setProperty('--d', `${7 + Math.random() * 13}s`);
    s.style.setProperty('--o', `${.25 + Math.random() * .75}`);
    s.style.animationDelay = `${-Math.random() * 15}s`;
    stars.appendChild(s);
  }

  const root = document.documentElement;
  const portrait = document.querySelector('.hero-person');
  const cosmos = document.querySelector('.cosmos');
  const glow = document.querySelector('.hero-glow');
  const cards = document.querySelectorAll('.floating-card');

  // Subtle mouse parallax: environment moves more than the actual portrait.
  window.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth - .5);
    const y = (e.clientY / window.innerHeight - .5);
    root.style.setProperty('--mx', `${x * 24}px`);
    root.style.setProperty('--my', `${y * 18}px`);

    if (window.innerWidth > 1000) {
      cosmos.style.transform = `translate(${x * 28}px, ${y * 22}px)`;
      glow.style.transform = `translate(${x * -16}px, ${y * -12}px)`;
      portrait.style.transform = `translateX(calc(-50% + ${x * 7}px)) translateY(${y * -5}px)`;
      cards.forEach((card, i) => {
        const depth = (i + 1) * 4;
        card.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    }
  });

  // Premium cursor.
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
    ring.style.opacity = '1';
  });

  function cursorLoop() {
    rx += (mx - rx) * .15;
    ry += (my - ry) * .15;
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  document.querySelectorAll('a, button, .magnetic-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // Small magnetic pull for buttons/cards.
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * .08}px, ${y * .08}px)`;
    });
    el.addEventListener('pointerleave', () => el.style.transform = '');
  });

  // Keep the hero visual responsive after resize.
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1000) {
      cosmos.style.transform = '';
      glow.style.transform = '';
      portrait.style.transform = 'translateX(-50%)';
      cards.forEach(card => card.style.transform = '');
    }
  });
})();
