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
      return `<div class="nav-item${group.items ? ' has-dropdown' : ''}${group.cta ? ' nav-support' : ''}"><a class="nav-link${group.cta ? ' nav-cta' : ''}" href="${group.href}"${active ? ' aria-current="page"' : ''}${group.items ? ` aria-haspopup="true" aria-expanded="false" aria-controls="nav-dropdown-${index}"` : ''}>${group.title}${group.items ? '<span class="dropdown-chevron" aria-hidden="true">⌄</span>' : ''}</a>${itemLinks}</div>`;
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

  document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
  const form = document.querySelector('[data-email-form]');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('[aria-live="polite"]');
    if (!form.reportValidity()) { if (status) status.textContent = 'Please check the required fields and try again.'; return; }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Website enquiry: ${data.get('subject') || 'Contact RweDI'}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
    if (status) status.textContent = 'Your email app will open with your enquiry ready to send.';
    window.location.href = `mailto:rwedi.info@gmail.com?subject=${subject}&body=${body}`;
  });
})();
