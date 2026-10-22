(() => {
  const data = window.PORTFOLIO_CONTENT;
  let lang = localStorage.getItem('portfolio-language') || 'es';
  let activePortfolio = 'unity';
  let activeNode = 'systems';
  let activePersonal = 'enjoy';
  let wheelAnimating = false;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const get = (object, path) => path.split('.').reduce((value, key) => value?.[key], object);

  const assets = {
    engines: ['UnityLogo.png','8thwallLogo.png','RobloxLogo.png','ZapparLogo.png','GodotLogo.png'],
    tools: ['AsepriteLogo.png','PhotoshopLogo.png','FigmaLogo.png','AframeLogo.png','GitHubLogo.png','PythonLogo.png','BlenderLogo.png','ChagptLogo.png','VueLogo.png','NoSeLogo.png']
  };
  const personalMeta = {
    studies:['EstudiosLogo.png',1], experience:['ExperienciaLogo.png',2], values:['ValoroLogo.png',3], enjoy:['DisfrutoLogo.png',4], learning:['ProfundizandoLogo.png',3], strengths:['FortalezasLogo.png',2], hobbies:['HobbiesLogo.png',1]
  };

  function renderStaticText() {
    const copy = data[lang];
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => { const value = get(copy, el.dataset.i18n); if (value) el.textContent = value; });
    $('#languageButton').textContent = lang === 'es' ? 'EN' : 'ES';
    renderSkills(); renderTechGroups(); renderPortfolio(activePortfolio); renderNode(activeNode); renderWheel(); renderPersonal(activePersonal);
  }

  function renderIcons() {
    $('#engineIcons').innerHTML = assets.engines.map(name => `<img src="Img/LogosPNG/${name}" alt="${name.replace('Logo.png','')}">`).join('');
    $('#toolIcons').innerHTML = assets.tools.map(name => `<img src="Img/LogosPNG/${name}" alt="${name.replace('Logo.png','')}">`).join('');
  }

  function renderTechGroups() {
    $('#techGroups').innerHTML = data[lang].techGroups.map(group => `<div class="tech-group"><h4>${group.title}</h4><ul>${group.items.map(item => `<li>${item}</li>`).join('')}</ul></div>`).join('');
  }

  function renderSkills() {
    $('#skillCopy').innerHTML = data[lang].skillGroups.map(item => `<article class="skill-item"><div><h4>${item.title}</h4><p>${item.text}</p></div><img src="Img/LogosPNG/${encodeURIComponent(item.icon)}" alt=""></article>`).join('');
  }

  function crystalImage(item, state) {
    const extension = 'webp';
    return `Img/Cristales/${item.folder}/${state}.${extension}`;
  }

  function renderCrystals() {
    const fragments = [1,2,3,4,5,6,7,8].map(number => `<img class="crystal-fragment crystal-fragment--${number}" src="Img/Cristales/MiniCristales (${number}).png" alt="" aria-hidden="true">`).join('');
    $('#crystalStage').innerHTML = data.portfolio.map((item, index) => `<button class="crystal${index === 0 ? ' is-active' : ''}" data-id="${item.id}" aria-label="${item.title}" aria-pressed="${index === 0}"><img class="inactive" src="${crystalImage(item,'Inactive')}" alt=""><img class="active" src="${crystalImage(item,'Active')}" alt=""></button>`).join('') + fragments;
    $$('.crystal').forEach(button => button.addEventListener('click', () => renderPortfolio(button.dataset.id)));
  }

  function renderPortfolio(id) {
    activePortfolio = id;
    const item = data.portfolio.find(entry => entry.id === id);
    if (!item) return;
    $$('.crystal').forEach(button => { const active = button.dataset.id === id; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', active); });
    $('#portfolioType').textContent = item.type;
    $('#portfolioTitle').textContent = item.title;
    $('#portfolioDescription').textContent = lang === 'es' ? item.descriptionEs : item.descriptionEn;
    const pages = { unity: 'portfolio.html?category=unity', game: 'portfolio.html?category=game', featured: 'portfolio.html?category=featured', ar: 'ar.html', web: 'web.html' };
    $('#portfolioLink').href = pages[item.id] + (pages[item.id].includes('?') ? '&' : '?') + `lang=${lang}`;
  }

  function renderNode(id) {
    activeNode = id;
    const item = data[lang].nodes[id];
    $('#nodeTitle').textContent = item.title; $('#nodeDescription').textContent = item.text;
    $$('.node').forEach(node => node.classList.toggle('is-active', node.dataset.node === id));
    $$('.star-map path').forEach(path => path.classList.toggle('is-active', path.dataset.path === id));
  }

  function renderWheel() {
    const items = data[lang].personalItems;
    $('#personalWheel').innerHTML = Object.entries(items).map(([id,item]) => { const [icon] = personalMeta[id]; return `<button role="tab" aria-selected="${id===activePersonal}" data-personal="${id}"><span>${item.label}</span><img src="Img/LogosPNG/${icon}" alt=""></button>`; }).join('');
    $$('[data-personal]').forEach(button => button.addEventListener('click', () => rotatePersonalTo(button.dataset.personal)));
    positionPersonalWheel();
  }

  function positionPersonalWheel() {
    const ids = Object.keys(data[lang].personalItems);
    const activeIndex = ids.indexOf(activePersonal);
    $$('[data-personal]').forEach(button => {
      const index = ids.indexOf(button.dataset.personal);
      let slot = index - activeIndex;
      if (slot > 3) slot -= ids.length;
      if (slot < -3) slot += ids.length;
      const previousSlot = Number(button.dataset.slot);
      if (button.dataset.slot !== undefined && Math.abs(previousSlot - slot) > 3) {
        button.classList.add('is-wrapping');
        requestAnimationFrame(() => requestAnimationFrame(() => button.classList.remove('is-wrapping')));
      }
      button.dataset.slot = slot;
      button.style.setProperty('--slot', slot);
      button.style.setProperty('--offset', `${34 - Math.abs(slot) * 10}px`);
      // Keep the two outer icons fully inside the mobile viewport while
      // preserving the roulette's seven evenly spaced positions.
      button.style.setProperty('--mobile-x', `${50 + slot * 12.5}%`);
      button.style.setProperty('--bar-height', `${154 - Math.abs(slot) * 27}px`);
      const active = slot === 0;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', active);
      button.tabIndex = active ? 0 : -1;
    });
  }

  async function rotatePersonalTo(id) {
    if (wheelAnimating || id === activePersonal) return;
    const ids = Object.keys(data[lang].personalItems);
    let current = ids.indexOf(activePersonal);
    const target = ids.indexOf(id);
    let distance = target - current;
    if (distance > ids.length / 2) distance -= ids.length;
    if (distance < -ids.length / 2) distance += ids.length;
    const direction = Math.sign(distance);
    const steps = Math.abs(distance);
    wheelAnimating = true;
    $('.personal__detail').classList.add('is-changing');
    for (let step = 0; step < steps; step += 1) {
      current = (current + direction + ids.length) % ids.length;
      activePersonal = ids[current];
      positionPersonalWheel();
      await new Promise(resolve => setTimeout(resolve, 210));
    }
    renderPersonal(id);
    $('.personal__detail').classList.remove('is-changing');
    wheelAnimating = false;
  }

  function renderPersonal(id) {
    activePersonal = id;
    const item = data[lang].personalItems[id]; const icon = personalMeta[id][0];
    $('#personalIcon').src = `Img/LogosPNG/${icon}`; $('#personalLabel').textContent = item.label; $('#personalHeading').textContent = item.heading; $('#personalText').textContent = item.text;
    $('#personalList').innerHTML = item.list.map(value => `<li>${value}</li>`).join('');
    $('#personalListTitle').textContent = item.listTitle || '';
    $('#personalListTitle').hidden = !item.listTitle || !item.list.length;
    positionPersonalWheel();
  }

  function counters(entries) {
    entries.forEach(entry => { if (!entry.isIntersecting) return; $$('[data-count]', entry.target).forEach(el => { const goal=Number(el.dataset.count); const output=el.querySelector('b') || el; const start=performance.now(); const step=now => { const p=Math.min((now-start)/1100,1); output.textContent=(goal*p).toFixed(goal%1?1:0); if(p<1) requestAnimationFrame(step); }; requestAnimationFrame(step); }); });
  }

  function initMotion() {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.14});
    $$('.reveal').forEach(el => observer.observe(el));
    const statObserver=new IntersectionObserver(counters,{threshold:.5}); statObserver.observe($('.stats'));
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) addEventListener('scroll', () => { const y=scrollY; $$('.parallax').forEach(el => el.style.transform=`translateY(${(y-el.offsetTop)*.035}px)`); },{passive:true});
  }

  $('#languageButton').addEventListener('click', () => { lang=lang==='es'?'en':'es'; localStorage.setItem('portfolio-language',lang); renderStaticText(); });
  renderIcons(); renderCrystals(); renderWheel(); renderStaticText(); initMotion();
  $$('.node').forEach(node => node.addEventListener('click', () => renderNode(node.dataset.node)));
  addEventListener('load', () => setTimeout(() => $('#loader').classList.add('is-hidden'), 650));
})();
