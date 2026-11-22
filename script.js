(() => {
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = textWalker.nextNode())) {
    textNode.nodeValue = textNode.nodeValue.replace(/\bproposed headquarters\b/gi, match =>
      match[0] === 'P' ? 'Headquarters' : 'headquarters'
    );
  }

  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const brand = document.querySelector('.brand');
  const brandLogo = brand && brand.querySelector('img');
  if (brandLogo) {
    const showTextOnlyBrand = () => brand.classList.add('logo-missing');
    brandLogo.addEventListener('error', showTextOnlyBrand, { once: true });
    if (brandLogo.complete && brandLogo.naturalWidth === 0) showTextOnlyBrand();
  }

  const hero = document.querySelector('.hero');
  const slides = hero ? Array.from(hero.querySelectorAll('.hero-slide')) : [];
  const slideControls = hero ? Array.from(hero.querySelectorAll('.hero-slide-dot')) : [];
  const slideToggle = hero && hero.querySelector('.hero-slide-toggle');
  if (hero && slides.length && slideControls.length === slides.length && slideToggle) {
    let activeSlide = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    let isPaused = false;
    let rotationTimer = null;
    const toggleIcon = slideToggle.querySelector('.hero-toggle-icon');

    const updateToggle = () => {
      slideToggle.setAttribute('aria-pressed', String(isPaused));
      slideToggle.setAttribute('aria-label', isPaused ? 'Play background slideshow' : 'Pause background slideshow');
      toggleIcon.textContent = isPaused ? '▶' : 'Ⅱ';
    };
    const showSlide = index => {
      activeSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
      slideControls.forEach((control, controlIndex) => {
        const isCurrent = controlIndex === activeSlide;
        control.classList.toggle('is-active', isCurrent);
        control.setAttribute('aria-pressed', String(isCurrent));
      });
    };
    const stopRotation = () => {
      window.clearInterval(rotationTimer);
      rotationTimer = null;
    };
    const startRotation = () => {
      stopRotation();
      if (isPaused) return;
      rotationTimer = window.setInterval(() => showSlide(activeSlide + 1), 6500);
    };

    slideControls.forEach((control, index) => {
      control.addEventListener('click', () => {
        showSlide(index);
        startRotation();
      });
    });
    slideToggle.addEventListener('click', () => {
      isPaused = !isPaused;
      updateToggle();
      startRotation();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopRotation();
      else startRotation();
    });
    updateToggle();
    startRotation();
  }

  if (!button || !nav) return;
  const closeMenu = () => {
    button.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      button.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !button.contains(event.target)) closeMenu();
  });
})();
