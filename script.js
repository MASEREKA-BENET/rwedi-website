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
