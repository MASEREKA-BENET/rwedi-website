(() => {
  const nav = document.querySelector('.site-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const groups = [
    { title: 'Home', href: 'index.html' },
    { title: 'About Us', href: 'about.html', items: [['Organisation Overview', 'about.html#overview'], ['Mission and Vision', 'about.html#mission-vision'], ['Our Founders', 'about.html#founders'], ['Governance', 'about.html#governance']] },
    { title: 'Our Projects', href: 'projects.html', items: [['Current Project', 'projects.html#current-project'], ['Project Details', 'projects.html#project-impact']] },
    { title: 'Our Programs', href: 'programmes.html', items: [['Agriculture and Food Security', 'programmes.html#agriculture'], ['Youth Empowerment', 'programmes.html#youth'], ['Education and Human Development', 'programmes.html#education'], ['Environment and Resilience', 'programmes.html#environment']] },
    { title: 'Our Partners', href: 'index.html#partners', items: [['Partnership approach', 'index.html#partners'], ['Become a Partner', 'contact.html#partner']] },
    { title: 'Contact Us', href: 'contact.html' },
    { title: 'Support RweDI', href: 'contact.html#get-involved', cta: true }
  ];

  if (nav) {
    nav.innerHTML = groups.map((group, index) => {
      const active = current === group.href.split('#')[0] && !group.cta;
      const itemLinks = group.items ? `<div class="nav-dropdown" id="nav-dropdown-${index}">${group.items.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</div>` : '';
      return `<div class="nav-item${group.items ? ' has-dropdown' : ''}${group.cta ? ' nav-support' : ''}"><a class="nav-link${group.cta ? ' nav-cta' : ''}" href="${group.href}"${active ? ' aria-current="page"' : ''}${group.items ? ` aria-haspopup="true" aria-expanded="false" aria-controls="nav-dropdown-${index}"` : ''}>${group.title}</a>${itemLinks}</div>`;
    }).join('');
  }

  const closeDropdowns = (except) => nav?.querySelectorAll('.has-dropdown > .nav-link').forEach(link => {
    if (link !== except) { link.setAttribute('aria-expanded', 'false'); link.parentElement.classList.remove('dropdown-open'); }
  });
  nav?.querySelectorAll('.has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', event => {
      if (window.matchMedia('(max-width: 1000px)').matches) {
        event.preventDefault();
        const open = link.getAttribute('aria-expanded') === 'true';
        closeDropdowns(link);
        link.setAttribute('aria-expanded', String(!open));
        link.parentElement.classList.toggle('dropdown-open', !open);
      }
    });
    link.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') { event.preventDefault(); link.setAttribute('aria-expanded', 'true'); link.parentElement.classList.add('dropdown-open'); link.parentElement.querySelector('.nav-dropdown a')?.focus(); }
    });
  });

  if (menuButton && nav) {
    const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); closeDropdowns(); };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', event => { if (event.target.closest('.nav-dropdown a') || !event.target.closest('.has-dropdown')) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });
    document.addEventListener('click', event => { if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
  }

  const hero = document.querySelector('.hero');
  const slides = hero ? Array.from(hero.querySelectorAll('.hero-slide')) : [];
  if (slides.length > 1) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    let paused = reducedMotion.matches;
    let timer;
    const setSlide = index => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === active));
    };
    const stop = () => { window.clearInterval(timer); timer = undefined; };
    const start = () => {
      stop();
      if (!paused && !document.hidden) timer = window.setInterval(() => setSlide(active + 1), 6500);
    };
    document.addEventListener('visibilitychange', start);
    reducedMotion.addEventListener?.('change', event => { paused = event.matches; start(); });
    start();
  }

  const pageHero = document.querySelector('.page-hero');
  const pageBackgrounds = {
    'about.html': [
      { label: 'Community planting', src: 'assets/programme-environment.jpeg' },
      { label: 'Agriculture', src: 'assets/programme-agriculture.jpeg' },
      { label: 'Community farming', src: 'assets/kasese-farmers-planting.png' }
    ],
    'programmes.html': [
      { label: 'Agriculture', src: 'assets/programme-agriculture.jpeg' },
      { label: 'Youth', src: 'assets/programme-youth.jpeg' },
      { label: 'Education', src: 'assets/programme-education.jpeg' },
      { label: 'Environment', src: 'assets/programme-environment.jpeg' }
    ],
    'projects.html': [
      { label: 'Proposed pilot', src: 'assets/kithoma-youth-led-climate-smart-farming.jpeg' },
      { label: 'Agriculture', src: 'assets/programme-agriculture.jpeg' },
      { label: 'Community', src: 'assets/kasese-farmers-planting.png' }
    ],
    'contact.html': [
      { label: 'Community', src: 'assets/kasese-farmers-planting.png' },
      { label: 'Youth', src: 'assets/programme-youth.jpeg' },
      { label: 'Education', src: 'assets/programme-education.jpeg' },
      { label: 'Environment', src: 'assets/programme-environment.jpeg' }
    ]
  };
  const backgrounds = pageBackgrounds[current];
  if (pageHero && backgrounds?.length) {
    const backdrop = document.createElement('div');
    backdrop.className = 'page-hero-background';
    backdrop.setAttribute('aria-hidden', 'true');
    const currentPhoto = document.createElement('img');
    const nextPhoto = document.createElement('img');
    currentPhoto.className = 'page-hero-photo is-visible';
    nextPhoto.className = 'page-hero-photo';
    currentPhoto.alt = '';
    nextPhoto.alt = '';
    currentPhoto.fetchPriority = 'high';
    currentPhoto.src = backgrounds[0].src;
    backdrop.append(currentPhoto, nextPhoto);
    pageHero.prepend(backdrop);

    const picker = document.createElement('div');
    picker.className = 'page-background-picker';
    picker.setAttribute('role', 'group');
    picker.setAttribute('aria-label', 'Choose a page background photo');
    let visiblePhoto = currentPhoto;
    let activeIndex = 0;
    backgrounds.forEach((background, index) => {
      const choice = document.createElement('button');
      choice.className = 'page-background-choice';
      choice.type = 'button';
      choice.setAttribute('aria-label', `Use ${background.label.toLowerCase()} photo as background`);
      choice.setAttribute('aria-pressed', String(index === activeIndex));
      const thumbnail = document.createElement('img');
      thumbnail.src = background.src;
      thumbnail.alt = '';
      thumbnail.loading = 'lazy';
      const label = document.createElement('span');
      label.textContent = background.label;
      choice.append(thumbnail, label);
      choice.addEventListener('click', () => {
        if (index === activeIndex) return;
        activeIndex = index;
        picker.querySelectorAll('.page-background-choice').forEach((button, buttonIndex) => button.setAttribute('aria-pressed', String(buttonIndex === index)));
        const next = visiblePhoto === currentPhoto ? nextPhoto : currentPhoto;
        next.classList.remove('is-visible');
        next.onload = () => {
          requestAnimationFrame(() => {
            next.classList.add('is-visible');
            visiblePhoto.classList.remove('is-visible');
            visiblePhoto = next;
          });
        };
        next.src = background.src;
        if (next.complete && next.naturalWidth) next.onload();
      });
      picker.append(choice);
    });
    pageHero.querySelector('.page-hero-inner')?.append(picker);
  }

  document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
  document.querySelectorAll('.footer-location').forEach(node => { node.textContent = 'Proposed headquarters: Kasese Municipality, Kasese District, Uganda'; });
  const form = document.querySelector('[data-email-form]');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('[aria-live="polite"]');
    if (!form.reportValidity()) { if (status) status.textContent = 'Please check the required fields and try again.'; return; }
    const data = new FormData(form);
    const reason = data.get('subject') || 'General enquiry';
    const subject = `Website enquiry: ${reason}`;
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nReason: ${reason}\n\nMessage:\n${data.get('message')}`;
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('rwedi.info@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = 'Opening Gmail with your message ready. Review it and click Send.';
    window.location.href = gmailComposeUrl;
  });
})();
