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

  const footer = document.querySelector('.site-footer');
  const footerSocialLinks = footer && footer.querySelector('.social-links');
  if (footer && footerSocialLinks && !footer.querySelector('.footer-bottom')) {
    footerSocialLinks.insertAdjacentHTML('beforeend', `
      <a href="https://www.facebook.com/search/top?q=Rwenzori%20Development%20Initiative" target="_blank" rel="noopener noreferrer" aria-label="Find RweDI on Facebook" title="Facebook search for RweDI"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8h2.7l.4-3.2h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3V13h2.8v8z"/></svg></a>
      <a href="https://x.com/search?q=Rwenzori%20Development%20Initiative" target="_blank" rel="noopener noreferrer" aria-label="Find RweDI on X" title="X search for RweDI"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2.5h3.1l-6.8 7.8 8 11.2H17l-5-6.6-5.7 6.6H3.2l7.3-8.4L2.8 2.5H10l4.5 6.1zm-1.1 17h1.7L8.5 4.4H6.7z"/></svg></a>
      <a href="https://www.instagram.com/explore/search/keyword/?q=Rwenzori%20Development%20Initiative" target="_blank" rel="noopener noreferrer" aria-label="Find RweDI on Instagram" title="Instagram search for RweDI"><svg class="icon-outline" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r=".8" fill="currentColor" stroke="none"/></svg></a>
      <a href="https://www.youtube.com/results?search_query=Rwenzori+Development+Initiative" target="_blank" rel="noopener noreferrer" aria-label="Find RweDI on YouTube" title="YouTube search for RweDI"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.5 3.8z"/></svg></a>
    `);
    const orderedSocialLinks = [
      footerSocialLinks.querySelector('[aria-label="Find RweDI on Facebook"]'),
      footerSocialLinks.querySelector('[aria-label="Find RweDI on X"]'),
      footerSocialLinks.querySelector('[aria-label="Find RweDI on LinkedIn"]'),
      footerSocialLinks.querySelector('[aria-label="Find RweDI on Instagram"]'),
      footerSocialLinks.querySelector('[aria-label="Find RweDI on YouTube"]'),
      footerSocialLinks.querySelector('[aria-label="Message RweDI on WhatsApp"]'),
      footerSocialLinks.querySelector('[aria-label="Email RweDI at enosmin111@gmail.com"]'),
    ];
    if (orderedSocialLinks.every(Boolean)) footerSocialLinks.replaceChildren(...orderedSocialLinks);
    const footerBottom = document.createElement('div');
    footerBottom.className = 'footer-bottom';
    const copyright = document.createElement('p');
    copyright.className = 'footer-copyright';
    copyright.textContent = `© ${new Date().getFullYear()} RWEDI. ALL RIGHTS RESERVED.`;
    footerSocialLinks.setAttribute('aria-label', 'Social media and contact links');
    footerBottom.append(copyright, footerSocialLinks);
    footer.append(footerBottom);
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
      rotationTimer = window.setInterval(() => showSlide(activeSlide + 1), 4000);
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
