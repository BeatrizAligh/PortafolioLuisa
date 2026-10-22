// Último Ensayo + BomberWoman case studies: open/close, copy, book pages, sprites and the responsibilities minigame.
(() => {
  const content = window.CASES_CONTENT;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
  const t = path => path.split('.').reduce((value, key) => value?.[key], content[lang()]);
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const cases = { 'ultimo-ensayo': $('#ultimoCase'), bomberman: $('#bomberCase'), otros: $('#otrosCase'), hotel: $('#hotelCase') };

  /* ---------- copy ---------- */
  function renderCopy() {
    $$('.case [data-k]').forEach(element => {
      const value = t(element.dataset.k);
      if (value == null) return;
      if (element.dataset.attr) element.setAttribute(element.dataset.attr, value);
      else if (element.tagName === 'DIV') element.innerHTML = value.split('\n').map(line => `<p>${line}</p>`).join('');
      else if (element.tagName === 'BUTTON' && element.querySelector('span')) element.querySelector('span').textContent = value;
      else element.innerHTML = value;
    });
    renderBook(false);
    renderOthers();
    const stores = t('ultimo.stores') || [];
    $('#ueStores').innerHTML = `<span>${t('ultimo.storesTitle')}</span>` + stores.map(st => `<a class="ue-store" href="${st.url}" target="_blank" rel="noreferrer">${st.label} <b aria-hidden="true">↗</b></a>`).join('');
    if (activePower !== null && !$('#bwPanel').hidden) fillPanel(activePower);
    $$('.bw-power').forEach((button, index) => button.setAttribute('aria-label', t('bomber.powers')[Number(button.dataset.power)].title));
  }

  function renderOthers() {
    const holder = $('#otItems');
    if (!holder) return;
    const keep = holder.querySelector('video');
    if (keep && holder.dataset.lang === lang()) return;
    holder.dataset.lang = lang();
    holder.innerHTML = t('otros.items').map(item => `<article class="ot-item" id="ot-${item.id}">
      <div class="ot-item__copy case-reveal is-visible">
        <h3>${item.title}</h3>
        <p class="case-eyebrow ot-role">${item.role}</p>
        <div class="case-body">${item.body.split('\n').map(line => `<p>${line}</p>`).join('')}</div>
        <h4>${item.techTitle}</h4>
        <ul>${item.tech.map(line => `<li>${line}</li>`).join('')}</ul>
        <p class="case-meta">${item.meta}</p>
      </div>
      <div class="ot-item__media"><div class="ot-frame"><div class="vplayer vplayer--pixel" data-video="${item.video}" data-title="${item.title}" style="--vp-ratio:16/10"></div></div></div>
    </article>`).join('');
    window.VideoSlots?.init(holder);
  }

  /* ---------- open / close (shared with the Mochis and Magic Birthday cases) ---------- */
  function closeCase(section) {
    if (!section || !section.classList.contains('is-open')) return;
    section.classList.remove('is-open');
    section.setAttribute('aria-hidden', 'true');
    section.inert = true;
    section.classList.remove('is-settled');
    window.VideoSlots?.pauseAll();
  }
  function closeOthers(keep) {
    ['#mochisCase', '#magicCase', '#ultimoCase', '#bomberCase', '#otrosCase', '#hotelCase'].forEach(selector => {
      const section = $(selector);
      if (section && section !== keep) closeCase(section);
    });
    $$('[data-project]').forEach(card => { if (!keep || card.dataset.project !== keep.dataset.case) card.setAttribute('aria-expanded', 'false'); });
  }
  function openCase(id) {
    const section = cases[id];
    if (!section) return;
    closeOthers(section);
    section.classList.add('is-open');
    section.setAttribute('aria-hidden', 'false');
    section.inert = false;
    setTimeout(() => section.classList.contains('is-open') && section.classList.add('is-settled'), 850);
    if (id === 'ultimo-ensayo') setTimeout(() => renderBook(false), 60);
    $(`[data-project="${id}"]`)?.setAttribute('aria-expanded', 'true');
    if (id === 'bomberman') buildMap();
    setTimeout(() => section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), 380);
  }
  window.PortfolioCases = { open: openCase, closeOthers };

  const grid = $('#projectGrid');
  grid?.addEventListener('click', event => {
    const card = event.target.closest('[data-project]');
    if (!card) return;
    const id = card.dataset.project;
    if (cases[id]) { event.stopPropagation(); openCase(id); }
    else closeOthers(id === 'mochis' ? $('#mochisCase') : $('#magicCase'));
  }, true);

  $$('[data-case-close]').forEach(button => button.addEventListener('click', () => {
    const section = button.closest('.case');
    closeCase(section);
    const card = $(`[data-project="${section.dataset.case}"]`);
    (card || grid)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    card?.focus({ preventScroll: true });
  }));

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: .12 });
  $$('.case-reveal').forEach(element => revealObserver.observe(element));

  /* ---------- Último Ensayo: the book ---------- */
  // Content flows into as many pages as needed; each section starts on a new spread and the bookmarks jump to it.
  let spread = 0, spreads = [], sectionStart = [];
  function blocksFor(data) {
    const left = [{ html: `<h3>${data.title}</h3>` }]
      .concat(data.list ? data.list.map(item => ({ li: item })) : data.body.split('\n').flatMap((line, para) => line.match(/[^.!?;]+[.!?;]+["”»)]?\s*|[^.!?;]+$/g).map(sentence => ({ para, text: sentence.trim() }))))
      .concat(data.note ? [{ html: `<p class="ue-page__note">${data.note}</p>` }] : []);
    const right = data.video ? [{ video: true }] : [{ html: `<h3>${data.asideTitle}</h3>` }].concat(data.aside.map(item => ({ li: item })));
    return [left, right];
  }
  function blocksHtml(blocks) {
    let html = '', open = false;
    let para = null;
    blocks.forEach(block => {
      if (block.text !== undefined) {
        if (open) { html += '</ul>'; open = false; }
        html += para === block.para ? ` ${block.text}` : `${para !== null ? '</p>' : ''}<p>${block.text}`;
        para = block.para; return;
      }
      if (para !== null) { html += '</p>'; para = null; }
      if (block.li) { if (!open) { html += '<ul>'; open = true; } html += `<li>${block.li}</li>`; return; }
      if (open) { html += '</ul>'; open = false; }
      html += block.video ? '<div class="vplayer" data-video="ultimo-mecanicas" data-title="El último ensayo — sistemas"></div>' : block.html;
    });
    return html + (para !== null ? '</p>' : '') + (open ? '</ul>' : '');
  }
  function flow(blocks, measure) {
    // Fixed-height pages (desktop): fill until the page overflows. Fluid pages (mobile): one page per group.
    if (!measure || blocks[0].video) return [blocks];
    const pages = []; let current = [];
    blocks.forEach(block => {
      current.push(block);
      measure.innerHTML = blocksHtml(current);
      if (measure.scrollHeight > measure.clientHeight + 1 && current.length > 1) {
        current.pop();
        const carry = [];
        while (current.length > 1 && /^<(h3|span)/.test(current[current.length - 1].html || '')) carry.unshift(current.pop()); // headings travel with their content
        pages.push(current); current = [...carry.filter(b => !/^<span/.test(b.html)), block];
      }
    });
    if (current.length) pages.push(current);
    return pages;
  }
  function paginate() {
    const left = $('#ueLeft');
    const fixed = getComputedStyle(left).position === 'absolute' && left.clientHeight > 0;
    let measure = null;
    if (fixed) {
      measure = left.cloneNode(false);
      measure.removeAttribute('id');
      Object.assign(measure.style, { visibility: 'hidden', overflow: 'hidden', display: 'block' });
      left.parentElement.appendChild(measure);
    }
    const pages = []; sectionStart = [];
    t('ultimo.pages').forEach(data => {
      if (pages.length % 2) pages.push([]); // every section opens on a left page
      sectionStart.push(pages.length / 2);
      const [leftBlocks, rightBlocks] = blocksFor(data);
      if (data.video) {
        flow(leftBlocks, measure).forEach(page => pages.push(page));
        if (pages.length % 2 === 0) pages.push([]); // keep the video on the right-hand page
        pages.push(rightBlocks);
      } else {
        // text and "Aportes" share the same flow so no page is left half empty
        flow(leftBlocks.concat(measure ? [{ html: '<span class="ue-gap"></span>' }] : [], rightBlocks), measure).forEach(page => pages.push(page));
      }
    });
    if (pages.length % 2) pages.push([]);
    measure?.remove();
    spreads = [];
    for (let i = 0; i < pages.length; i += 2) spreads.push([pages[i], pages[i + 1]]);
    spread = Math.min(spread, spreads.length - 1);
  }
  function currentSection() {
    let section = 0;
    sectionStart.forEach((start, index) => { if (spread >= start) section = index; });
    return section;
  }
  function renderBook(animate, direction = 1, repaginate = true) {
    if (repaginate) paginate();
    const pages = t('ultimo.pages');
    const active = currentSection();
    $('#ueBookTabs').innerHTML = pages.map((item, index) => `<button type="button" role="tab" aria-selected="${index === active}" data-section="${index}" style="--i:${index}" aria-label="${item.tab}" title="${item.tab}">${item.tab}</button>`).join('');
    $('#uePageNumber').textContent = `${t('common.page')} ${spread + 1} / ${spreads.length}`;
    const apply = () => {
      const [leftPage, rightPage] = spreads[spread];
      $('#ueLeft').innerHTML = blocksHtml(leftPage);
      $('#ueRight').innerHTML = blocksHtml(rightPage);
      $('#ueRight').classList.toggle('ue-page--video', rightPage.some(block => block.video));
      window.VideoSlots?.init($('#ueRight'));
    };
    if (!animate || reduceMotion) { apply(); return; }
    const book = $('#ueBookSpread');
    book.classList.remove('is-turning-next', 'is-turning-prev');
    void book.offsetWidth;
    book.classList.add(direction > 0 ? 'is-turning-next' : 'is-turning-prev');
    setTimeout(apply, 330);
    setTimeout(() => book.classList.remove('is-turning-next', 'is-turning-prev'), 760);
  }
  function goToSpread(index) {
    const next = (index + spreads.length) % spreads.length;
    if (next === spread) return;
    const direction = next > spread ? 1 : -1;
    spread = next;
    renderBook(true, direction, false);
  }
  $('#ueBookTabs').addEventListener('click', event => { const tab = event.target.closest('[data-section]'); if (tab) goToSpread(sectionStart[Number(tab.dataset.section)]); });
  $('#uePrev').addEventListener('click', () => goToSpread(spread - 1));
  $('#ueNext').addEventListener('click', () => goToSpread(spread + 1));
  $('#ueBook').addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') goToSpread(spread + 1);
    if (event.key === 'ArrowLeft') goToSpread(spread - 1);
  });
  let touchX = null;
  $('#ueBookSpread').addEventListener('touchstart', event => { touchX = event.touches[0].clientX; }, { passive: true });
  $('#ueBookSpread').addEventListener('touchend', event => {
    if (touchX === null) return;
    const delta = event.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(delta) > 60) goToSpread(spread + (delta < 0 ? 1 : -1));
  });
  let resizeTimer;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { if (cases['ultimo-ensayo'].classList.contains('is-open')) renderBook(false); }, 200); });

  /* ---------- BomberWoman: hero strip built from the crisp game tiles ---------- */
  const HERO = {
    desktop: { rows: ['RRRRRRRRRR', 'R.BB.B..BR', 'R...BB...R', 'R........R', 'RB.BB.BB.R', 'RRRRRRRRRR'], bomb: 6, from: 1, to: 4.6 },
    mobile: { rows: ['RRRRR', 'R.B.R', 'R..BR', 'R...R', 'RB..R', 'RRRRR'], bomb: 3, from: .9, to: 2 }
  };
  let heroLayout = null;
  function buildHero() {
    const mobile = matchMedia('(max-width: 700px)').matches;
    if (heroLayout === mobile) return;
    heroLayout = mobile;
    const { rows, bomb, from, to } = HERO[mobile ? 'mobile' : 'desktop'];
    const map = $('#bwHeroMap');
    map.style.setProperty('--cols', rows[0].length);
    map.style.setProperty('--rows', rows.length);
    let html = '';
    rows.forEach((row, r) => row.split('').forEach((cell, c) => {
      const style = `style="--c:${c};--r:${r}"`;
      if (cell === 'R') { html += `<span class="bw-tile bw-tile--rock" ${style}></span>`; return; }
      const shaded = 'RB'.includes(rows[r - 1]?.[c]);
      html += `<span class="bw-tile bw-tile--${shaded ? 'shadow' : 'ground'}" ${style}></span>`;
      if (cell === 'B') html += `<span class="bw-tile bw-tile--block" ${style}></span>`;
    }));
    html += `<span class="bw-walker" style="--r:3;--from:${from};--to:${to}"><span class="bw-girl" data-dir="right"></span></span>`;
    html += `<span class="bw-bomb" style="--c:${bomb};--r:3"></span>`;
    map.innerHTML = html;
  }
  buildHero();
  matchMedia('(max-width: 700px)').addEventListener('change', buildHero);

  /* ---------- BomberWoman: bouncing heads in "Mi rol" ---------- */
  const heads = [
    { name: 'gio', idle: 4, total: 8 }, { name: 'luis', idle: 5, total: 10 }, { name: 'vane', idle: 4, total: 9 }
  ];
  const headState = [];
  function buildHeads() {
    const holder = $('#bwHeads');
    holder.innerHTML = heads.map((head, index) => `<button type="button" class="bw-head" style="--frames:${head.total};--idle:${head.idle};background-image:url('assets/bomber/head-${head.name}.webp')" data-head="${index}" aria-label="💥"></button>`).join('');
    const rect = () => holder.getBoundingClientRect();
    $$('.bw-head', holder).forEach((element, index) => {
      headState[index] = { element, x: 0.15 + index * 0.3, y: 0.55 + (index % 2) * 0.2, vx: (index % 2 ? -1 : 1) * (0.06 + index * 0.015), vy: (index % 2 ? 1 : -1) * 0.045, exploding: false };
      element.addEventListener('click', () => explodeHead(index));
    });
    let last = performance.now();
    const tick = now => {
      const dt = Math.min((now - last) / 1000, .05); last = now;
      const box = rect();
      if (box.width && cases.bomberman.classList.contains('is-open')) headState.forEach(state => {
        if (state.exploding) return;
        const size = state.element.offsetWidth;
        const maxX = 1 - size / box.width, maxY = 1 - size / box.height;
        state.x += state.vx * dt; state.y += state.vy * dt;
        if (state.x < 0 || state.x > maxX) { state.vx *= -1; state.x = Math.max(0, Math.min(maxX, state.x)); }
        if (state.y < 0 || state.y > maxY) { state.vy *= -1; state.y = Math.max(0, Math.min(maxY, state.y)); }
        state.element.style.transform = `translate(${state.x * box.width}px, ${state.y * box.height}px)`;
      });
      requestAnimationFrame(tick);
    };
    if (!reduceMotion) requestAnimationFrame(tick);
    else headState.forEach(state => { state.element.style.transform = `translate(${state.x * 100}%, ${state.y * 300}%)`; });
  }
  function explodeHead(index) {
    const state = headState[index];
    if (state.exploding) return;
    state.exploding = true;
    state.element.classList.add('is-exploding');
    setTimeout(() => {
      state.element.classList.remove('is-exploding');
      state.x = Math.random() * .7; state.y = Math.random() * .7;
      state.exploding = false;
    }, 1400);
  }

  /* ---------- BomberWoman: responsibilities map ---------- */
  // Desktop layout (10 × 7) taken from the design. R rock, B block, D door, G start, 1-7 power-ups (one per responsibility).
  const LAYOUT = [
    'RRRRRRRRRR',
    'RG.B3B.4DR',
    'R..B...BBR',
    'R.1..B7B.R',
    'R..B.BBBBR',
    'R2.B.6..5R',
    'RRRRRRRRRR'
  ];
  // Power-up icon used for each responsibility (index into assets/bomber/power-N.webp).
  const POWER_ICON = [1, 2, 5, 6, 7, 3, 4];
  let mapBuilt = false, mobileLayout = null, girl = null, girlPos = null, walking = false, activePower = null;
  const visited = new Set();

  function layoutFor(mobile) {
    const rows = LAYOUT.map(row => row.split(''));
    if (!mobile) return rows;
    return rows[0].map((_, c) => rows.map(row => row[c])); // transpose: 7 × 10 on phones
  }
  function buildMap(force = false) {
    const mobile = matchMedia('(max-width: 700px)').matches;
    if (mapBuilt && mobile === mobileLayout && !force) return;
    mapBuilt = true; mobileLayout = mobile;
    const grid = layoutFor(mobile);
    const map = $('#bwMap');
    map.style.setProperty('--cols', grid[0].length);
    map.style.setProperty('--rows', grid.length);
    const solid = (r, c) => grid[r]?.[c] === 'R' || grid[r]?.[c] === 'B' || grid[r]?.[c] === 'D';
    let html = '';
    grid.forEach((row, r) => row.forEach((cell, c) => {
      const style = `style="--c:${c};--r:${r}"`;
      if (cell === 'R') { html += `<span class="bw-tile bw-tile--rock" ${style}></span>`; return; }
      html += `<span class="bw-tile bw-tile--${solid(r - 1, c) ? 'shadow' : 'ground'}" ${style}></span>`;
      if (cell === 'B') html += `<span class="bw-tile bw-tile--block" ${style}></span>`;
      if (cell === 'D') html += `<span class="bw-tile bw-tile--door" ${style}></span>`;
      if (/[1-7]/.test(cell)) {
        const power = Number(cell) - 1;
        html += `<button type="button" class="bw-power${visited.has(power) ? ' is-visited' : ''}" ${style} data-power="${power}" aria-label="${t('bomber.powers')[power].title}"><img src="assets/bomber/power-${POWER_ICON[power]}.webp" alt=""></button>`;
      }
      if (cell === 'G' && !girlPos) girlPos = { r, c };
    }));
    if (girlPos && mobile !== girlPos.mobile) {
      const start = grid.flatMap((row, r) => row.map((cell, c) => cell === 'G' ? { r, c } : null)).find(Boolean);
      girlPos = { ...start, mobile };
    }
    html += `<span class="bw-map__girl" style="--c:${girlPos.c};--r:${girlPos.r}"><span class="bw-girl" data-dir="down"></span></span>`;
    map.innerHTML = html;
    girl = $('.bw-map__girl', map);
    map.dataset.grid = JSON.stringify(grid);
  }
  function path(grid, from, to) {
    const key = p => `${p.r},${p.c}`;
    const queue = [from], previous = { [key(from)]: null };
    while (queue.length) {
      const current = queue.shift();
      if (current.r === to.r && current.c === to.c) break;
      for (const [dr, dc] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
        const next = { r: current.r + dr, c: current.c + dc };
        const cell = grid[next.r]?.[next.c];
        if (!cell || 'RBD'.includes(cell) || key(next) in previous) continue;
        previous[key(next)] = current; queue.push(next);
      }
    }
    if (!(key(to) in previous)) return [];
    const steps = [];
    for (let p = to; p && key(p) !== key(from); p = previous[key(p)]) steps.unshift(p);
    return steps;
  }
  async function walkTo(target) {
    const grid = JSON.parse($('#bwMap').dataset.grid);
    const steps = path(grid, girlPos, target);
    const sprite = $('.bw-girl', girl);
    walking = true; girl.classList.add('is-walking');
    for (const step of steps) {
      sprite.dataset.dir = step.c > girlPos.c ? 'right' : step.c < girlPos.c ? 'left' : step.r > girlPos.r ? 'down' : 'up';
      girlPos = { ...girlPos, r: step.r, c: step.c };
      girl.style.setProperty('--c', step.c); girl.style.setProperty('--r', step.r);
      await new Promise(resolve => setTimeout(resolve, reduceMotion ? 0 : 230));
    }
    girl.classList.remove('is-walking'); sprite.dataset.dir = 'down'; walking = false;
  }
  function fillPanel(power) {
    const data = t('bomber.powers')[power];
    $('#bwPanelTitle').textContent = data.title + ':';
    $('#bwPanelBody').textContent = data.text;
    // One edited video per responsibility (same order as bomber.powers)
    const clip = ['bomber-movimiento', 'bomber-bombas', 'bomber-enemigos', 'bomber-potenciadores', 'bomber-gestion', 'bomber-animaciones', 'bomber-transiciones'][power];
    const slot = $('#bwPanelVideo');
    if (window.VideoSlots && slot.dataset.video !== clip) window.VideoSlots.set(slot, clip);
  }
  function openPanel(power) {
    activePower = power;
    visited.add(power);
    $(`.bw-power[data-power="${power}"]`)?.classList.add('is-visited');
    fillPanel(power);
    const panel = $('#bwPanel');
    const cols = JSON.parse($('#bwMap').dataset.grid)[0].length;
    panel.dataset.side = girlPos.c < cols / 2 ? 'right' : 'left';
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('is-open'));
    $('#bwPanelHome').focus({ preventScroll: true });
  }
  function closePanel() {
    const panel = $('#bwPanel');
    if (panel.hidden) return;
    panel.classList.remove('is-open');
    window.VideoSlots?.pauseAll();
    setTimeout(() => { panel.hidden = true; }, reduceMotion ? 0 : 320);
    $(`.bw-power[data-power="${activePower}"]`)?.focus({ preventScroll: true });
  }
  $('#bwMap').addEventListener('click', async event => {
    const button = event.target.closest('.bw-power');
    if (!button || walking) return;
    const power = Number(button.dataset.power);
    await walkTo({ r: Number(button.style.getPropertyValue('--r')), c: Number(button.style.getPropertyValue('--c')) });
    openPanel(power);
  });
  $('#bwPanelHome').addEventListener('click', closePanel);
  // close only when the backdrop itself is clicked (the video player swaps its button for a <video>,
  // so a click inside the card can arrive with a target that is no longer in the page)
  $('#bwPanel').addEventListener('click', event => { if (event.target === event.currentTarget) closePanel(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closePanel(); });
  matchMedia('(max-width: 700px)').addEventListener('change', () => { if (mapBuilt) buildMap(true); });

  buildHeads();
  renderCopy();
  document.addEventListener('portfolio:language', renderCopy);
  new MutationObserver(renderCopy).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
