// Renders the AR Dev / Web Dev pages from SHOWCASE_CONTENT. Cards on the landing scroll to each project section.
(() => {
  const pageId = document.body.dataset.showcase;
  const data = window.SHOWCASE_CONTENT[pageId];
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang') || localStorage.getItem('portfolio-language') || 'es';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = selector => document.querySelector(selector);
  const paragraphs = text => text.split('\n').map(line => `<p>${line}</p>`).join('');

  function media(section) {
    const m = section.media;
    const title = section.title.replace(/"/g, '&quot;');
    if (m.type === 'laptop') return `<div class="sc-laptop"><div class="sc-laptop__screen"><div class="vplayer" data-video="${m.video}" data-title="${title}"></div></div><img class="sc-laptop__frame" src="assets/web/laptop.webp" alt="" aria-hidden="true"></div>`;
    if (m.type === 'images') return `<div class="sc-phones">${m.images.map((src, i) => `<img src="${src}" alt="${i ? '' : m.alt}" loading="lazy" style="--i:${i}">`).join('')}</div>`;
    return `<div class="sc-phone"><div class="vplayer vplayer--phone" data-video="${m.video}" data-title="${title}"${m.ratio ? ` style="--vp-ratio:${m.ratio}"` : ''}></div></div>`;
  }

  function copyBlock(section, copy, { features = true } = {}) {
    const logo = section.logo ? `<img class="sc-logo" src="${section.logo}" alt="" loading="lazy">` : '';
    const list = features && section.features ? featureBlock(section, copy) : '';
    const link = section.link ? `<a class="sc-cta" href="${section.link}" target="_blank" rel="noreferrer">${copy.cta} <span aria-hidden="true">›</span></a>` : '';
    return `${logo}<h2 id="${section.id}-title">${section.title}</h2><p class="case-eyebrow sc-stack">${section.stack}</p><div class="case-body">${paragraphs(section.body)}</div>${list}<p class="case-meta">${section.meta}</p>${link}`;
  }
  const featureBlock = (section, copy) => `<div class="sc-features"><h3>${copy.featuresTitle}</h3><ul>${section.features.map(item => `<li>${item}</li>`).join('')}</ul></div>`;

  function sectionMarkup(section, copy) {
    const open = `<section class="sc-section sc--${section.theme}${section.reverse ? ' sc--reverse' : ''}" id="${section.id}" aria-labelledby="${section.id}-title">`;
    if (section.theme === 'windmar') {
      // Design: centered copy over the island, features bottom-left, screens bottom-right.
      return `${open}
        <div class="sc-center sc-reveal"><img class="sc-windmar-logo" src="assets/web/windmar-logo.webp" alt="Windmar Home" loading="lazy">${copyBlock(section, copy, { features: false })}</div>
        <div class="sc-inner sc-inner--bottom">
          <div class="sc-copy sc-reveal">${featureBlock(section, copy)}</div>
          <div class="sc-media sc-reveal"><div class="sc-windmar-stage"><img class="sc-windmar-collage" src="assets/web/windmar-collage.webp" alt="" loading="lazy">${media(section)}<img class="sc-windmar-phone" src="assets/web/windmar-phone.webp" alt="" loading="lazy"></div></div>
        </div></section>`;
    }
    if (section.theme === 'dino') {
      return `${open}
        <header class="sc-dino-head sc-reveal"><img class="sc-dino-logo" src="assets/ar/dinomochis-logo.webp" alt="Alpina Mochisaurios" loading="lazy"><h2 id="${section.id}-title">${section.title}</h2><p class="case-eyebrow sc-stack">${section.stack}</p></header>
        <div class="sc-inner"><div class="sc-copy sc-reveal"><div class="case-body">${paragraphs(section.body)}</div><p class="case-meta">${section.meta}</p></div><div class="sc-media sc-reveal">${media(section)}</div></div>
        <div class="sc-dino-world" aria-hidden="true">${[1, 2, 3, 4, 5].map(i => `<img class="sc-dino-phone sc-dino-phone--${i}" src="assets/ar/dinomochis-phone-${i}.webp" alt="" loading="lazy">`).join('')}</div>
      </section>`;
    }
    const logo = section.theme === 'flame' ? '<img class="sc-badge" src="assets/web/flame-logo.webp" alt="The Flame Company" loading="lazy">'
      : section.theme === 'dark' ? '<img class="sc-badge sc-badge--skull" src="assets/web/dardranight-logo.webp" alt="Dardranight Studios" loading="lazy">' : '';
    const plain = { ...section, logo: '' };
    return `${open}${logo}
      <div class="sc-inner">
        <div class="sc-copy sc-reveal">${copyBlock(plain, copy)}</div>
        <div class="sc-media sc-reveal">${media(section)}</div>
      </div>
    </section>`;
  }

  function carouselMarkup(carousel) {
    const slide = (item, clone) => `<article class="sc-slide"${clone ? ' aria-hidden="true" data-clone' : ` id="slide-${item.id}"`}><div class="vplayer vplayer--phone" data-video="${item.video}" data-title="${item.title}" style="--vp-ratio:4/9"></div><h3>${item.title}</h3><p>${item.text}</p><p class="sc-slide__status">${data[lang].status || ''}</p></article>`;
    return `<section class="sc-section sc--carousel" id="${carousel.id}" aria-labelledby="${carousel.id}-title">
      <img class="sc-separator" src="assets/ar/separator.webp" alt="" aria-hidden="true">
      <div class="sc-carousel-head sc-reveal"><h2 id="${carousel.id}-title">${carousel.title}</h2><p class="case-eyebrow sc-stack">${carousel.stack}</p><p class="case-meta">${carousel.meta}</p></div>
      <div class="sc-carousel sc-reveal">
        <button class="sc-carousel__arrow" type="button" data-dir="-1" aria-label="${lang === 'es' ? 'Anterior' : 'Previous'}">←</button>
        <div class="sc-carousel__track" id="carouselTrack">${carousel.items.map(i => slide(i, true)).join('')}${carousel.items.map(i => slide(i, false)).join('')}${carousel.items.map(i => slide(i, true)).join('')}</div>
        <button class="sc-carousel__arrow" type="button" data-dir="1" aria-label="${lang === 'es' ? 'Siguiente' : 'Next'}">→</button>
      </div>
      <div class="sc-dots" id="carouselDots">${carousel.items.map((item, i) => `<button type="button" data-slide="${i}" aria-label="${item.title}"></button>`).join('')}</div>
    </section>`;
  }

  function sectionsMarkup(copy) {
    // consecutive Claro sections share one continuous background, like the design
    let html = '', group = '';
    copy.sections.forEach(section => {
      const markup = sectionMarkup(section, copy);
      if (section.theme === 'claro') { group += markup; return; }
      if (group) { html += `<div class="sc-group sc-group--claro">${group}</div>`; group = ''; }
      html += markup;
    });
    if (group) html += `<div class="sc-group sc-group--claro">${group}</div>`;
    return html;
  }

  function render() {
    const copy = data[lang];
    document.documentElement.lang = lang;
    document.title = `${copy.pageTitle} — Luisa Leaccott`;
    const button = $('#languageButton');
    button.textContent = lang === 'es' ? 'EN' : 'ES';
    button.setAttribute('aria-label', lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish');
    $('#projectsTitle').textContent = copy.pageTitle;
    $('#projectsKicker').textContent = copy.kicker;
    $('#projectsDescription').innerHTML = copy.intro.map(p => `<p>${p}</p>`).join('');
    const cards = copy.sections.map(s => ({ id: s.id, title: s.cardTitle || s.title, text: s.card }));
    if (copy.carousel) cards.push({ id: copy.carousel.id, title: copy.carousel.cardTitle, text: copy.carousel.card });
    $('#projectGrid').dataset.count = cards.length;
    $('#projectGrid').innerHTML = cards.map(card => `<a class="project-card" href="#${card.id}"><h2>${card.title}</h2><p>${card.text}</p><span class="project-card__arrow" aria-hidden="true">↓</span></a>`).join('');
    $('#showcaseSections').innerHTML = sectionsMarkup(copy) + (copy.carousel ? carouselMarkup(copy.carousel) : '');
    $('#backLink span').textContent = copy.back;
    window.VideoSlots.init($('#showcaseSections'));
    observeReveals();
    bindCarousel();
  }

  let revealObserver;
  function observeReveals() {
    revealObserver?.disconnect();
    revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.sc-reveal').forEach(el => revealObserver.observe(el));
  }

  // Infinite carousel: the slide set is rendered three times; when the centre slide lands in a copy we jump silently to the real one.
  function bindCarousel() {
    const track = $('#carouselTrack');
    if (!track) return;
    const slides = [...track.children];
    const n = slides.length / 3;
    const dots = [...document.querySelectorAll('#carouselDots button')];
    const offsetFor = i => slides[i].offsetLeft - track.offsetLeft - (track.clientWidth - slides[i].offsetWidth) / 2;
    const centre = () => {
      const c = track.scrollLeft + track.clientWidth / 2;
      let best = 0, dist = Infinity;
      slides.forEach((slide, i) => { const d = Math.abs(slide.offsetLeft - track.offsetLeft + slide.offsetWidth / 2 - c); if (d < dist) { dist = d; best = i; } });
      return best;
    };
    const mark = () => {
      const best = centre();
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === best));
      dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === best % n)));
      return best;
    };
    const go = (i, smooth = true) => track.scrollTo({ left: offsetFor(i), behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
    let settle;
    track.addEventListener('scroll', () => {
      requestAnimationFrame(mark);
      clearTimeout(settle);
      settle = setTimeout(() => {
        const best = centre();
        if (best < n || best >= 2 * n) { window.VideoSlots?.pauseAll(); go(n + (best % n), false); mark(); }
      }, 140);
    }, { passive: true });
    document.querySelectorAll('.sc-carousel__arrow').forEach(arrow => arrow.addEventListener('click', () => go(centre() + Number(arrow.dataset.dir))));
    dots.forEach((dot, i) => dot.addEventListener('click', () => go(n + i)));
    requestAnimationFrame(() => { go(n, false); mark(); });
    addEventListener('resize', () => go(n + (centre() % n), false));
    window.goToSlide = id => { const i = slides.findIndex(slide => slide.id === `slide-${id}`); if (i >= 0) go(i); };
  }

  // Smooth-scroll from landing cards (and keep the URL hash in sync).
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', link.getAttribute('href'));
  });

  $('#languageButton').addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('portfolio-language', lang);
    render();
  });

  render();
  if (location.hash) setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' }), 120);
})();
