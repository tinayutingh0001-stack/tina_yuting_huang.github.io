(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const header = document.querySelector('[data-site-header]');

  if (toggle && nav) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });
  }

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const filterGroup = document.querySelector('[data-publication-filters]');
  const publications = [...document.querySelectorAll('[data-publication]')];
  const publicationGroups = [...document.querySelectorAll('[data-publication-group]')];
  const search = document.querySelector('[data-publication-search]');
  const resultCount = document.querySelector('[data-publication-count]');
  const emptyState = document.querySelector('[data-publication-empty]');
  let activeFilter = 'all';

  const updatePublications = () => {
    const query = (search?.value || '').trim().toLowerCase();
    let visible = 0;

    publications.forEach((publication) => {
      const categories = (publication.dataset.category || '').split(' ');
      const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
      const matchesSearch = !query || publication.textContent.toLowerCase().includes(query);
      const show = matchesFilter && matchesSearch;
      publication.hidden = !show;
      if (show) visible += 1;
    });

    publicationGroups.forEach((group) => {
      group.hidden = !group.querySelector('[data-publication]:not([hidden])');
    });

    if (resultCount) {
      resultCount.textContent = `${visible} ${visible === 1 ? 'record' : 'records'}`;
    }
    if (emptyState) emptyState.hidden = visible !== 0;
  };

  filterGroup?.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    activeFilter = button.dataset.filter;
    filterGroup.querySelectorAll('button').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    updatePublications();
  });
  search?.addEventListener('input', updatePublications);
  if (publications.length) updatePublications();

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
