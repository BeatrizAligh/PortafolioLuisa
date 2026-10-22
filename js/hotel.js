// Renders the Hotel de Criaturas Pequeñas case study from HOTEL_CONTENT (portfolio.html?category=game).
(() => {
  const root = document.querySelector('#hotelBody');
  if (!root) return;
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');

  function windows() {
    // a small CSS hotel: floors of windows that light up at random
    return Array.from({ length: 4 }, (_, floor) => `<div class="ht-floor">${Array.from({ length: 5 }, (_, i) => `<i style="--d:${((floor * 5 + i) * 1.37) % 6}s"></i>`).join('')}</div>`).join('');
  }

  function render() {
    const c = window.HOTEL_CONTENT[lang()];
    root.innerHTML = `
      <div class="ht-hero">
        <div class="ht-sky" aria-hidden="true">${Array.from({ length: 40 }, (_, i) => `<b style="--x:${(i * 37) % 100}%;--y:${(i * 23) % 60}%;--d:${2 + (i % 5)}s"></b>`).join('')}</div>
        <div class="ht-building" aria-hidden="true"><span class="ht-roof"></span><div class="ht-sign">HOTEL</div>${windows()}<span class="ht-door"></span></div>
        <div class="ht-creatures" aria-hidden="true">${Array.from({ length: 9 }, (_, i) => `<span style="--x:${8 + i * 10.5}%;--d:${5 + (i % 4)}s;--h:${[200, 160, 50, 300, 120, 20, 260, 180, 90][i]}"></span>`).join('')}</div>
        <div class="ht-hero__copy case-reveal is-visible">
          <p class="case-eyebrow">${c.eyebrow}</p>
          <h2 id="htTitle">${c.title}</h2>
          <p class="ht-tagline">${c.tagline}</p>
          <p class="ht-status"><span></span>${c.status}</p>
        </div>
        <p class="ht-artnote">${c.artNote}</p>
      </div>
      <dl class="ht-facts">${c.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <section class="ht-block ht-two">
        <div class="case-reveal"><h3>${c.aboutTitle}</h3><p>${c.about}</p></div>
        <div class="case-reveal"><h3>${c.roleTitle}</h3><p>${c.role}</p></div>
      </section>
      <section class="ht-block">
        <h3 class="case-reveal">${c.loopTitle}</h3>
        <p class="ht-lead case-reveal">${c.loopText}</p>
        <ol class="ht-loop case-reveal">${c.loop.map((step, i) => `<li style="--i:${i}"><b>${i + 1}</b><span>${step}</span></li>`).join('')}</ol>
      </section>
      <section class="ht-block">
        <h3 class="case-reveal">${c.systemsTitle}</h3>
        <div class="ht-systems">${c.systems.map(s => `<article class="ht-card case-reveal"><strong>${s.k}</strong><h4>${s.t}</h4><p>${s.d}</p></article>`).join('')}</div>
      </section>
      <section class="ht-block">
        <h3 class="case-reveal">${c.decisionsTitle}</h3>
        <div class="ht-decisions">${c.decisions.map(([q, a], i) => `<details class="case-reveal"${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
      </section>
      <section class="ht-block">
        <h3 class="case-reveal">${c.metricsTitle}</h3>
        <div class="ht-metrics">${c.metrics.map(([v, l]) => `<div class="case-reveal"><strong>${v}</strong><span>${l}</span></div>`).join('')}</div>
      </section>
      <section class="ht-block ht-two">
        <div class="case-reveal"><h3>${c.docsTitle}</h3><ul class="ht-docs">${c.docs.map(([k, v]) => `<li><b>${k}</b><span>${v}</span></li>`).join('')}</ul></div>
        <div class="case-reveal"><h3>${c.showsTitle}</h3><ul class="ht-shows">${c.shows.map(s => `<li>${s}</li>`).join('')}</ul></div>
      </section>`;
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } }), { threshold: .1 });
    root.querySelectorAll('.case-reveal:not(.is-visible)').forEach(el => observer.observe(el));
  }
  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
