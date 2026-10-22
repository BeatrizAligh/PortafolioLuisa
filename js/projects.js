(() => {
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang') || localStorage.getItem('portfolio-language') || 'es';
  const categoryId = ['unity', 'game', 'featured'].includes(params.get('category')) ? params.get('category') : 'unity';
  let responsibility = 0;
  // Videos shown next to each responsibility tab (same order as the tabs).
  const responsibilityVideos = [
    { videos: 'mochis-batallas|mochis-poderes', labels: { es: 'Mochi Batallas|Mochipoderes', en: 'Mochi Battles|Mochipowers' } },
    { videos: 'mochis-coleccion-premios', labels: { es: 'Colección y premios', en: 'Collection and prizes' } },
    { videos: 'mochis-tutorial-mazos', labels: { es: 'Tutorial de mazos', en: 'Deck tutorial' } },
    null
  ];
  const galleryVideos = [
    { id: 'mochis-gameplay-general', es: 'Gameplay general', en: 'Gameplay overview' },
    { id: 'mochis-login-navegacion', es: 'Inicio, tutorial y navegación', en: 'Login, tutorial and navigation' },
    { id: 'mochis-perfil-estadisticas', es: 'Perfil, estadísticas y personalización', en: 'Profile, stats and customization' },
    { id: 'mochis-organizacion-mazos', es: 'Organización de mazos', en: 'Deck management' }
  ];
  let galleryIndex = 0;
  function renderGallery() {
    const thumbs = document.querySelector('#mochisGalleryThumbs');
    if (!thumbs) return;
    thumbs.innerHTML = galleryVideos.map((video, index) => `
      <button type="button" role="tab" class="mochis-thumb" aria-selected="${index === galleryIndex}" data-gallery="${index}">
        <img src="media/poster/${video.id}.webp" alt="" loading="lazy"><span>${video[lang]}</span>
      </button>`).join('');
  }
  const responsibilityStates = {
    es: [
      { label: 'Gameplay', title: 'Diseño e implementación de gameplay', items: ['Diseñé y programé Mochipoderes, un modo de cartas basado en la construcción de mazos, la gestión de energía y las decisiones tácticas durante el combate.', 'Implementé los sistemas de juego para los distintos modos disponibles.', 'Desarrollé la lógica de las partidas contra la máquina, incluyendo el uso de mazos disponibles para este tipo de enfrentamiento.', 'Participé en la modificación de reglas, estadísticas de cartas y ciclo de batalla de Mochi Batallas.'] },
      { label: 'Sistemas', title: 'Desarrollo de sistemas en Unity', items: ['Implementé el sistema de navegación entre pantallas.', 'Desarrollé tutoriales y guías paso a paso para acompañar al jugador.', 'Implementé sistemas de personalización de personajes, fondos, volumen y efectos de sonido.', 'Desarrollé el sistema de mochistickers asociados a las partidas.', 'Implementé el registro de estadísticas de juego, incluyendo partidas totales, victorias, derrotas y empates por modalidad.', 'Desarrollé el sistema de organización y gestión de mazos.', 'Implementé los sistemas de bloqueo y desbloqueo de personajes, stickers y cartas.', 'Desarrollé el sistema de premios y recompensas.'] },
      { label: 'Integración visual', title: 'Integración visual y montaje de interfaz', items: ['Monté las distintas ventanas y pantallas de la interfaz dentro de Unity.', 'Organicé los sprites y las spritesheets proporcionados por la diseñadora.', 'Configuré los Animator Controllers y ajusté las animaciones y sus transiciones para integrarlas en el juego.'] },
      { label: 'Trabajo en equipo', kicker: 'Trabajo en equipo', title: 'Preparación para la integración con backend', paragraphs: ['Dejé preparados los sistemas frontend para su conexión con los servicios de backend, cuyo desarrollo estuvo a cargo de otro integrante del equipo. Las funcionalidades sociales basadas en amigos y códigos de invitación, así como el acceso a mazos de otros jugadores, no formaron parte de mis responsabilidades de implementación.', 'El proyecto se desarrolló en colaboración con una diseñadora, una desarrolladora frontend —mi rol— y un desarrollador backend.'] }
    ],
    en: [
      { label: 'Gameplay', title: 'Gameplay design and implementation', items: ['I designed and programmed Mochipowers, a card mode based on deck building, energy management and tactical decisions during combat.', 'I implemented gameplay systems for the available modes.', 'I developed the logic for matches against the computer, including the decks available for these matches.', 'I helped modify rules, card statistics and the Mochi Battles combat loop.'] },
      { label: 'Systems', title: 'Unity systems development', items: ['I implemented navigation between screens.', 'I developed tutorials and step-by-step guides for players.', 'I implemented customization systems for characters, backgrounds, volume and sound effects.', 'I developed the match-related Mochisticker system.', 'I implemented game statistics, including total matches, wins, losses and draws for each mode.', 'I developed deck organization and management.', 'I implemented systems for locking and unlocking characters, stickers and cards.', 'I developed prizes and rewards.'] },
      { label: 'Visual integration', title: 'Visual integration and interface assembly', items: ['I assembled the interface windows and screens in Unity.', 'I organized the sprites and spritesheets supplied by the designer.', 'I configured Animator Controllers and adjusted animations and transitions for integration into the game.'] },
      { label: 'Teamwork', kicker: 'Teamwork', title: 'Preparing for backend integration', paragraphs: ['I prepared the frontend systems for connection to backend services developed by another team member. Social features involving friends and invitation codes, as well as access to other players’ decks, were outside my implementation responsibilities.', 'The project was a collaboration between a designer, a frontend developer —my role— and a backend developer.'] }
    ]
  };
  function renderResponsibility(animate = false) {
    const state = responsibilityStates[lang][responsibility];
    const panel = document.querySelector('#mochisResponsibilityPanel');
    panel.setAttribute('aria-labelledby', `mochisTab${responsibility}`);
    panel.classList.toggle('mochis-responsibilities--text-only', responsibility === 3);
    panel.querySelector('.mochis-feature').hidden = responsibility === 3;
    const media = responsibilityVideos[responsibility];
    const player = document.querySelector('#mochisFeatureVideo');
    if (media && window.VideoSlots && (player.dataset.video !== media.videos || player.dataset.labels !== media.labels[lang])) window.VideoSlots.set(player, media.videos, media.labels[lang]);
    panel.querySelector('[data-mochis="responsibilityTitle"]').textContent = state.title;
    panel.querySelector('[data-mochis="responsibilityKicker"]').textContent = state.kicker || (lang === 'es' ? 'Mis responsabilidades' : 'My responsibilities');
    const list = document.querySelector('#mochisResponsibilityText');
    const prose = document.querySelector('#mochisResponsibilityProse');
    list.hidden = !state.items;
    prose.hidden = !state.paragraphs;
    list.replaceChildren(...(state.items || []).map(text => {
      const item = document.createElement('li'); item.textContent = text; return item;
    }));
    prose.replaceChildren(...(state.paragraphs || []).map(text => {
      const paragraph = document.createElement('p'); paragraph.textContent = text; return paragraph;
    }));
    document.querySelectorAll('[data-responsibility]').forEach((button, index) => {
      button.setAttribute('aria-selected', String(index === responsibility));
      button.tabIndex = index === responsibility ? 0 : -1;
      button.setAttribute('aria-label', responsibilityStates[lang][index].label);
      button.querySelector('span').textContent = responsibilityStates[lang][index].label;
    });
    if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) panel.querySelector('.mochis-responsibilities__copy').animate([{opacity:0, transform:'translateY(12px)'},{opacity:1, transform:'translateY(0)'}], {duration:320, easing:'ease-out'});
  }
  const copy = {
    es: {
      kicker: 'Portafolio',
      categories: {
        unity: { title: 'Unity Gameplay Developer', paragraphs: ['Soy Unity Gameplay Developer y me apasiona transformar ideas en experiencias jugables. Me especializo en desarrollar mecánicas, sistemas de juego e interacciones que conectan el diseño con la programación, creando experiencias intuitivas, dinámicas y memorables. Disfruto resolver desafíos técnicos, prototipar ideas y dar vida a mundos interactivos a través del código.'], projects: ['mochis', 'ultimo-ensayo', 'magic-birthday', 'bomberman', 'otros'] },
        game: { title: 'Game Design', paragraphs: ['Me enfoco en la conceptualización y el diseño de experiencias de juego, definiendo mecánicas, reglas, sistemas de progresión y dinámicas que construyen la experiencia del jugador. Desarrollo y documento ideas mediante Game Design Documents (GDD), diseño de sistemas y prototipos, buscando crear propuestas con identidad propia, objetivos claros y una jugabilidad coherente.'], projects: ['magic-birthday', 'ultimo-ensayo', 'mochis', 'hotel'], design: true },
        featured: { title: 'Proyectos destacados', paragraphs: ['Estos son algunos de los proyectos en los que he participado y que mayor impacto han tenido en mi enfoque y desarrollo profesional: videojuegos en Unity, experiencias de realidad aumentada y sitios web interactivos.'], projects: ['magic-birthday', 'ultimo-ensayo', 'mochis', 'bomberman', 'ar-hp', 'ar-coca', 'web-flame', 'web-audi'] }
      },
      cards: {
        'mochis': { title: 'Ilumimochis', text: 'Juego de cartas con construcción de mazos y enfrentamientos entre cuatro familias. Trabajé en la programación del gameplay y la interfaz en Unity, conectando un catálogo de 40 cartas con la selección de mazos, el reparto de manos y la resolución de enfrentamientos.', design: 'Combina una experiencia de enfrentamientos accesible con un modo de construcción de mazos y gestión estratégica de recursos.' },
        'ultimo-ensayo': { title: 'El último ensayo', text: 'Videojuego narrativo en primera persona sobre un violinista que intenta recuperar su relación con la música. Lo desarrollé de forma individual, combinando game design, programación en Unity, UI y minijuegos musicales.', design: 'La experiencia combina exploración, decisiones cotidianas y minijuegos de interpretación musical, afinación, respiración y pensamientos intrusivos.' },
        'magic-birthday': { title: 'Magic Birthday', text: 'Experiencia de horror psicológico que juega con la ruptura de la cuarta pared. Una adorable fiesta de cumpleaños se transforma progresivamente mientras el juego, el computador y el teléfono del jugador comienzan a mezclarse.', design: 'El jugador debe completar pequeñas actividades y resolver retos mientras intenta descubrir qué ocurrió con la persona que debía celebrar.' },
        'bomberman': { title: 'BomberWoman', text: 'Juego arcade 2D inspirado en Bomberman. Me encargué de la programación y de toda la implementación en Unity: mecánicas, enemigos, potenciadores, interfaz, animaciones y transiciones, a partir de sprites y un diseño de UI proporcionados.' },
        'hotel': { title: 'Hotel de Criaturas Pequeñas', text: 'Juego mobile idle-cozy: una red de hoteles-santuario que rescatan criaturas mágicas. Game design completo de economía, combate, retención y monetización.', design: 'El jugador administra una red de hoteles-santuario que rescatan criaturas mágicas de un mundo amenazado por fuerzas oscuras.' },
        'otros': { title: 'Otros proyectos', text: 'OffShore: juego de activismo en pixel art donde la derrota es el mensaje. Programación, UI bilingüe, game design y analítica en Unity.' },
        'ar-hp': { title: 'HP Printer AR', text: 'Experiencia WebAR que permite colocar una impresora HP a escala real en cualquier superficie, directo desde el navegador del celular.', href: 'ar.html#hp-printer' },
        'ar-coca': { title: 'Coca-Cola Selector', text: 'Filtro facial tipo “¿esto o aquello?” en el que el usuario responde con la cabeza, sin tocar la pantalla.', href: 'ar.html#coca-cola' },
        'web-flame': { title: 'The Flame Company', text: 'Sitio web para un restaurante y hobby center de fantasía: diseño UI/UX, desarrollo en Vue 3, carrito y pasarela de pago.', href: 'web.html#flame-company' },
        'web-audi': { title: 'Audi RS 3 ChatBot', text: 'Banner publicitario conversacional en React para el lanzamiento del Audi RS 3 Sportback en México.', href: 'web.html#audi-chatbot' }
      },
      mochis: {
        type: 'Unity · C# · Game Development · Game Design',
        summary: 'Juego digital de cartas desarrollado como parte de una campaña de Yogo Yogo, inspirado en sus personajes y colección de cartas. Combina enfrentamientos accesibles con construcción de mazos y gestión estratégica de recursos.',
        meta: '2025 · Dardranight Studios<br>Estado: finalizado y publicado',
        roleKicker: 'Mi rol',
        roleTitle: 'Unity Developer — Frontend & Game Designer',
        roleText: 'En Ilumimochis fui responsable del desarrollo frontend del videojuego en Unity y del diseño de uno de sus modos de juego. Mi trabajo abarcó sistemas de gameplay, navegación, personalización y progresión, además del montaje de interfaz y la configuración de recursos visuales.',
        responsibilityKicker: 'Mis responsabilidades',
        responsibilityTitle: 'Diseño e implementación de gameplay',
        galleryKicker: 'Gameplay', galleryTitle: 'Recorrido por el juego',
        responsibilityText: 'Diseñé y programé Mochipoderes, un modo basado en construcción de mazos, gestión de energía y decisiones tácticas. Implementé los sistemas de juego, la lógica de partidas contra la máquina y participé en el ajuste de reglas, estadísticas de cartas y ciclo de batalla de Mochi Batallas.'
      }
    },
    en: {
      kicker: 'Portfolio',
      categories: {
        unity: { title: 'Unity Gameplay Developer', paragraphs: ['I am a Unity Gameplay Developer who loves turning ideas into playable experiences. I specialize in mechanics, game systems and interactions that connect design with programming to create intuitive, dynamic and memorable experiences. I enjoy solving technical challenges, prototyping ideas and bringing interactive worlds to life through code.'], projects: ['mochis', 'ultimo-ensayo', 'magic-birthday', 'bomberman', 'otros'] },
        game: { title: 'Game Design', paragraphs: ['I focus on conceptualizing and designing game experiences, defining the mechanics, rules, progression systems and dynamics that shape the player experience. I develop and document ideas through Game Design Documents (GDD), systems design and prototypes, aiming for proposals with their own identity, clear goals and coherent gameplay.'], projects: ['magic-birthday', 'ultimo-ensayo', 'mochis', 'hotel'], design: true },
        featured: { title: 'Featured projects', paragraphs: ['A selection of the projects I have contributed to that have had the greatest impact on my approach and professional growth: Unity games, augmented-reality experiences and interactive websites.'], projects: ['magic-birthday', 'ultimo-ensayo', 'mochis', 'bomberman', 'ar-hp', 'ar-coca', 'web-flame', 'web-audi'] }
      },
      cards: {
        'mochis': { title: 'Ilumimochis', text: 'A deck-building card game featuring battles between four families. I programmed the gameplay and Unity interface, connecting a 40-card catalog with deck selection, hand dealing and battle resolution.', design: 'It combines approachable battles with a deck-building mode and strategic resource management.' },
        'ultimo-ensayo': { title: 'The Last Rehearsal', text: 'A first-person narrative game about a violinist trying to reconnect with music. I developed it independently, combining game design, Unity programming, UI and music-focused minigames.', design: 'The experience combines exploration, everyday choices and minigames about musical performance, tuning, breathing and intrusive thoughts.' },
        'magic-birthday': { title: 'Magic Birthday', text: 'A psychological horror experience built around breaking the fourth wall. An adorable birthday party gradually changes as the game, the computer and the player’s phone begin to merge.', design: 'Players complete small activities and solve challenges while trying to find out what happened to the person they were supposed to celebrate.' },
        'bomberman': { title: 'BomberWoman', text: 'A 2D arcade game inspired by Bomberman. I handled the programming and full Unity implementation: mechanics, enemies, power-ups, UI, animation and transitions using provided sprites and UI designs.' },
        'hotel': { title: 'Little Creatures Hotel', text: 'An idle-cozy mobile game: a network of sanctuary hotels that rescue magical creatures. Full game design of economy, combat, retention and monetization.', design: 'Players run a network of sanctuary hotels that rescue magical creatures from a world threatened by dark forces.' },
        'otros': { title: 'Other projects', text: 'OffShore: a pixel-art activism game where losing is the message. Programming, bilingual UI, game design and analytics in Unity.' },
        'ar-hp': { title: 'HP Printer AR', text: 'A WebAR experience that places a life-size HP printer on any surface, straight from the phone’s browser.', href: 'ar.html#hp-printer' },
        'ar-coca': { title: 'Coca-Cola Selector', text: 'A “this or that” face filter where users answer with their head, without touching the screen.', href: 'ar.html#coca-cola' },
        'web-flame': { title: 'The Flame Company', text: 'Website for a fantasy restaurant and hobby center: UI/UX design, Vue 3 development, cart and payment gateway.', href: 'web.html#flame-company' },
        'web-audi': { title: 'Audi RS 3 ChatBot', text: 'A conversational React ad banner for the launch of the Audi RS 3 Sportback in Mexico.', href: 'web.html#audi-chatbot' }
      },
      mochis: {
        type: 'Unity · C# · Game Development · Game Design',
        summary: 'A digital card game developed for a Yogo Yogo campaign, inspired by its characters and collectible cards. It combines approachable battles with deck building and strategic resource management.',
        meta: '2025 · Dardranight Studios<br>Status: completed and published',
        roleKicker: 'My role',
        roleTitle: 'Unity Developer — Frontend & Game Designer',
        roleText: 'For Ilumimochis I led the Unity frontend development and designed one of its game modes. My work covered gameplay, navigation, customization and progression systems, along with interface assembly and visual-resource configuration.',
        responsibilityKicker: 'My responsibilities',
        responsibilityTitle: 'Gameplay design and implementation',
        galleryKicker: 'Gameplay', galleryTitle: 'A walk through the game',
        responsibilityText: 'I designed and programmed Mochipowers, a mode based on deck building, energy management and tactical choices. I implemented its gameplay systems and AI matches, and helped refine rules, card statistics and the Mochi Battles combat loop.'
      }
    }
  };
  function render() {
    const content = copy[lang];
    document.documentElement.lang = lang;
    const languageButton = document.querySelector('#languageButton');
    languageButton.textContent = lang === 'es' ? 'EN' : 'ES';
    languageButton.setAttribute('aria-label', lang === 'es' ? 'Cambiar a inglés' : 'Cambiar a español');
    const category = content.categories[categoryId] || content.categories.unity;
    document.title = `${category.title} — Luisa Leaccott`;
    document.body.dataset.category = categoryId;
    document.querySelector('#projectsTitle').textContent = category.title;
    document.querySelector('#projectsKicker').textContent = content.kicker;
    document.querySelector('#projectsDescription').innerHTML = category.paragraphs.map(value => `<p>${value}</p>`).join('');
    const gridEl = document.querySelector('#projectGrid');
    gridEl.dataset.count = category.projects.length;
    gridEl.innerHTML = category.projects.map(id => {
      const card = content.cards[id];
      const text = category.design && card.design ? card.design : card.text;
      if (card.href) return `<a class="project-card project-card--link" href="${card.href}"><h2>${card.title}</h2><p>${text}</p><span class="project-card__arrow" aria-hidden="true">→</span></a>`;
      return `<button class="project-card" type="button" data-project="${id}" aria-label="${card.title}" aria-expanded="false"><h2>${card.title}</h2><p>${text}</p><span class="project-card__arrow" aria-hidden="true">→</span></button>`;
    }).join('');
    document.querySelectorAll('[data-mochis]').forEach(element => {
      const value = content.mochis[element.dataset.mochis];
      if (value) element.innerHTML = value;
    });
    const mochisButton = document.querySelector('[data-project="mochis"]');
    if (mochisButton) mochisButton.setAttribute('aria-expanded', String(document.querySelector('#mochisCase').classList.contains('is-open')));
    renderResponsibility();
    renderGallery();
    document.dispatchEvent(new CustomEvent('portfolio:language', { detail: { lang } }));
  }
  document.querySelector('#languageButton').addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('portfolio-language', lang);
    render();
  });
  const mochisCase = document.querySelector('#mochisCase');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tabs = document.querySelector('#mochisTabs');
  tabs.addEventListener('click', event => {
    const button = event.target.closest('[data-responsibility]');
    if (!button) return;
    responsibility = Number(button.dataset.responsibility);
    renderResponsibility(true);
    const panel = document.querySelector('#mochisResponsibilityPanel');
    if (panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
  tabs.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    responsibility = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (responsibility + (event.key === 'ArrowRight' ? 1 : 3)) % 4;
    renderResponsibility(true);
    document.querySelector(`#mochisTab${responsibility}`).focus();
  });
  document.querySelector('#projectGrid').addEventListener('click', event => {
    const card = event.target.closest('[data-project]');
    if (!card || card.dataset.project !== 'mochis') return;
    mochisCase.classList.add('is-open');
    mochisCase.setAttribute('aria-hidden', 'false');
    card.setAttribute('aria-expanded', 'true');
    setTimeout(() => mochisCase.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), 420);
  });
  document.querySelector('#mochisClose').addEventListener('click', () => {
    mochisCase.classList.remove('is-open');
    mochisCase.setAttribute('aria-hidden', 'true');
    const card = document.querySelector('[data-project="mochis"]');
    if (card) {
      card.setAttribute('aria-expanded', 'false');
      card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      card.focus({ preventScroll: true });
    }
  });
  document.querySelector('#mochisGalleryThumbs').addEventListener('click', event => {
    const thumb = event.target.closest('[data-gallery]');
    if (!thumb) return;
    galleryIndex = Number(thumb.dataset.gallery);
    renderGallery();
    const player = document.querySelector('#mochisGalleryPlayer');
    window.VideoSlots.set(player, galleryVideos[galleryIndex].id);
    player.querySelector('.vplayer__poster')?.click();
  });
  const particles = document.querySelector('#mochisParticles');
  particles.innerHTML = Array.from({ length: 34 }, (_, index) => {
    const x = (index * 37) % 100;
    const y = (index * 71) % 96;
    const size = 2 + (index % 5) * 1.5;
    const color = index % 3 === 0 ? '#ff4ede' : index % 3 === 1 ? '#8ee9ff' : '#ffe766';
    return `<i class="mochis-particle" style="--x:${x}%;--y:${y}%;--size:${size}px;--color:${color};--duration:${5 + index % 6}s;--drift:${(index % 2 ? 1 : -1) * (12 + index % 22)}px"></i>`;
  }).join('');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: .16 });
  document.querySelectorAll('.mochis-reveal').forEach(element => revealObserver.observe(element));
  if (!reduceMotion) document.querySelectorAll('[data-parallax-zone]').forEach(zone => {
    zone.addEventListener('pointermove', event => {
      const rect = zone.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      zone.querySelectorAll('.parallax-layer').forEach(layer => {
        const depth = Number(layer.dataset.depth || .1);
        layer.style.translate = `${x * depth * 90}px ${y * depth * 70}px`;
      });
    });
    zone.addEventListener('pointerleave', () => zone.querySelectorAll('.parallax-layer').forEach(layer => { layer.style.translate = ''; }));
  });
  render();
})();
