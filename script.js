document.addEventListener('DOMContentLoaded', () => {

  /* Year in footer */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Nav scroll state + mobile toggle ---------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  }));

  /* ---------- Hero doors open on load ---------- */
  const hero = document.getElementById('hero');
  requestAnimationFrame(() => setTimeout(() => hero.classList.add('doors-open'), 250));

  /* ---------- Floor indicator rail ---------- */
  const railItems = Array.from(document.querySelectorAll('.rail-floors li'));
  const railFill = document.getElementById('railFill');
  const floorReadout = document.getElementById('floorReadout');
  const sections = railItems.map(li => document.getElementById(li.dataset.target)).filter(Boolean);

  const railObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target);
        railItems.forEach(li => li.classList.remove('active'));
        railItems[idx]?.classList.add('active');
        const num = railItems[idx]?.querySelector('.rail-num')?.textContent || '06';
        if (floorReadout) floorReadout.textContent = num;
        const fillPct = ((idx + 1) / railItems.length) * 100;
        railFill.style.height = fillPct + '%';
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(s => railObserver.observe(s));

  railItems.forEach(li => li.addEventListener('click', () => {
    document.getElementById(li.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
  }));

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Testimonial slider ---------- */
  const quotes = Array.from(document.querySelectorAll('.quote'));
  const dotsWrap = document.getElementById('quoteDots');
  let quoteIndex = 0;

  quotes.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showQuote(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function showQuote(i) {
    quotes[quoteIndex].classList.remove('active');
    dots[quoteIndex].classList.remove('active');
    quoteIndex = (i + quotes.length) % quotes.length;
    quotes[quoteIndex].classList.add('active');
    dots[quoteIndex].classList.add('active');
  }

  document.getElementById('quotePrev').addEventListener('click', () => showQuote(quoteIndex - 1));
  document.getElementById('quoteNext').addEventListener('click', () => showQuote(quoteIndex + 1));

  let quoteTimer = setInterval(() => showQuote(quoteIndex + 1), 6000);
  document.querySelector('.quote-wrap').addEventListener('mouseenter', () => clearInterval(quoteTimer));
  document.querySelector('.quote-wrap').addEventListener('mouseleave', () => {
    quoteTimer = setInterval(() => showQuote(quoteIndex + 1), 6000);
  });

  /* ---------- Contact form ---------- */
  // TODO: This currently only simulates a submission. Connect it to a real
  // backend or email service (e.g. Formspree, EmailJS, or your own API route)
  // before going live. See the note in the project README.
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Thank you — we will get back to you shortly.';
    form.reset();
  });

});
