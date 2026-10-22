// Image galleries with a lightbox. Markup: <div class="photo-gallery" data-gallery="magic"></div>, items come from GALLERIES.
(() => {
  const GALLERIES = {
    magic: {
      folder: 'assets/magic/gallery-',
      title: { es: 'Galería del juego', en: 'Game gallery' }, subtitle: { es: 'Una fiesta adorable… hasta que deja de serlo.', en: 'An adorable party… until it isn’t.' },
      items: [
        { es: 'Menú principal', en: 'Main menu' },
        { es: 'Círculo te invita a su fiesta', en: 'Circle invites you to the party' },
        { es: 'La cocina, primer objetivo', en: 'The kitchen, first goal' },
        { es: 'Minijuego de ingredientes', en: 'Ingredients minigame' },
        { es: 'Explorando la casa', en: 'Exploring the house' },
        { es: 'Algo extraño en la fiesta', en: 'Something strange at the party' },
        { es: 'Los globos de la fiesta', en: 'The party balloons' },
        { es: '…pero ¿eres tú?', en: '…but is it you?' }
      ]
    }
  };
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
  const ui = { es: { open: 'Ampliar imagen', close: 'Cerrar', prev: 'Anterior', next: 'Siguiente' }, en: { open: 'Enlarge image', close: 'Close', prev: 'Previous', next: 'Next' } };
  let box, current = null;

  function render(el) {
    const g = GALLERIES[el.dataset.gallery];
    el.innerHTML = `<header class="photo-gallery__head"><h2>${g.title[lang()]}</h2><p>${g.subtitle[lang()]}</p></header><div class="photo-gallery__grid">` + g.items.map((item, i) => `<button type="button" class="photo-gallery__item" data-i="${i}" style="--tilt:${[-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5][i % 8]}deg" aria-label="${ui[lang()].open}: ${item[lang()]}">
      <img src="${g.folder}${i + 1}-thumb.webp" alt="" loading="lazy"><span>${item[lang()]}</span></button>`).join('') + '</div>';
  }

  function show(name, index) {
    const g = GALLERIES[name];
    current = { name, index: (index + g.items.length) % g.items.length };
    const item = g.items[current.index];
    box.querySelector('img').src = `${g.folder}${current.index + 1}.webp`;
    box.querySelector('img').alt = item[lang()];
    box.querySelector('figcaption').textContent = `${item[lang()]} · ${current.index + 1}/${g.items.length}`;
    if (!box.open) box.showModal();
  }

  function buildBox() {
    box = document.createElement('dialog');
    box.className = 'lightbox';
    box.innerHTML = `<figure><img alt=""><figcaption></figcaption></figure>
      <button type="button" class="lightbox__close" data-act="close">×</button>
      <button type="button" class="lightbox__nav lightbox__nav--prev" data-act="-1">←</button>
      <button type="button" class="lightbox__nav lightbox__nav--next" data-act="1">→</button>`;
    document.body.appendChild(box);
    box.addEventListener('click', event => {
      const act = event.target.closest('[data-act]')?.dataset.act;
      if (act === 'close' || event.target === box) box.close();
      else if (act) show(current.name, current.index + Number(act));
    });
    box.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') show(current.name, current.index + 1);
      if (event.key === 'ArrowLeft') show(current.name, current.index - 1);
    });
    let x = null;
    box.addEventListener('touchstart', e => { x = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', e => { if (x === null) return; const d = e.changedTouches[0].clientX - x; x = null; if (Math.abs(d) > 50) show(current.name, current.index + (d < 0 ? 1 : -1)); });
  }

  function labels() {
    const t = ui[lang()];
    box.querySelector('[data-act="close"]').setAttribute('aria-label', t.close);
    box.querySelector('[data-act="-1"]').setAttribute('aria-label', t.prev);
    box.querySelector('[data-act="1"]').setAttribute('aria-label', t.next);
  }

  buildBox(); labels();
  document.querySelectorAll('.photo-gallery').forEach(el => {
    render(el);
    el.addEventListener('click', event => { const b = event.target.closest('[data-i]'); if (b) show(el.dataset.gallery, Number(b.dataset.i)); });
  });
  new MutationObserver(() => { document.querySelectorAll('.photo-gallery').forEach(render); labels(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
