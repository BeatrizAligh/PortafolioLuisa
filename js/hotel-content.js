// Hotel de Criaturas Pequeñas — game design case study (no final art yet, so the page is typographic + CSS illustration).
window.HOTEL_CONTENT = {
  es: {
    eyebrow: 'Game Design · Mobile idle-cozy · Android',
    title: 'Hotel de Criaturas Pequeñas',
    tagline: 'Una red de hoteles-santuario para rescatar criaturas mágicas de un mundo amenazado por fuerzas oscuras.',
    status: 'En desarrollo activo — documentación completa, pre-producción',
    facts: [['Rol', 'Game Designer principal y desarrolladora Unity'], ['Equipo', '2 personas: diseño/desarrollo (Luisa) y arte/animación (Juliana)'], ['Plataforma', 'Android · mercado hispanohablante'], ['Estado', 'Pre-producción']],
    aboutTitle: 'El proyecto',
    about: 'Hotel de Criaturas Pequeñas es un juego mobile idle-cozy para Android dirigido al mercado hispanohablante. El jugador administra una red de hoteles-santuario que rescatan criaturas mágicas de un mundo amenazado por fuerzas oscuras. Combina gestión hotelera, colección de criaturas, automatización progresiva y combate idle por turnos dentro de una narrativa de fondo que evoluciona con cada conquista territorial.',
    roleTitle: 'Mi rol como Game Designer',
    role: 'Diseñé el proyecto desde cero: desde la fantasía central hasta el balance de la economía, pasando por cada sistema mecánico, la narrativa del mundo y la arquitectura de monetización. No hubo brief externo ni GDD previo; todo parte de una idea inicial que construí y documenté por completo.',
    loopTitle: 'Core loop de 4 capas',
    loopText: 'Una progresión revelada gradualmente que protege al jugador casual sin aburrir al comprometido. Cada capa aparece solo cuando el jugador dominó la anterior, reduciendo la fricción del onboarding sin sacrificar profundidad.',
    loop: ['Gestión manual del hotel', 'Automatización con criaturas', 'Minijuegos de recursos', 'Conquistas territoriales'],
    systemsTitle: 'Sistemas diseñados',
    systems: [
      { k: '11', t: 'Economía con 11 recursos', d: 'Cada recurso tiene fuente, sink y dificultad de obtención definidos. Los cuellos de botella son intencionales: la comida limita la automatización, los minerales raros frenan la construcción avanzada y la Esencia de Bioma es irrepetible por diseño. Balance calibrado para sesiones de 5 a 15 minutos con 2 o 3 accesos diarios.' },
      { k: '25', t: 'Criaturas en 5 biomas', d: 'Cada criatura tiene rareza, arquetipo de personalidad, pasivo mecánico único, set de animaciones, sonido característico y fragmento de lore. Las legendarias activan combos de santuario que generan decisiones estratégicas de largo plazo.' },
      { k: '50/30/20', t: 'Combate idle por turnos', d: 'El resultado depende del nivel de las criaturas (50 %), la composición del equipo (30 %) y la afinidad de bioma (20 %). El jugador siempre sabe por qué perdió y qué mejorar: no hay azar puro, es estrategia diferida.' },
      { k: '0', t: 'Monetización anti pay-to-win', d: 'Completamente jugable sin pagar. Los ingresos vienen de anuncios rewarded voluntarios, cosméticos y aceleración de tiempos, nunca de ventaja mecánica. El gacha por fragmentos garantiza la criatura al completar las piezas.' },
      { k: '40', t: 'Retención multicapa', d: '40 logros con progreso visible, 20 misiones diarias rotativas, racha mensual de 30 días, 7 eventos de temporada, pase combinado y notificaciones contextuales que no invaden. Cada sistema apunta a un arquetipo de jugador distinto.' },
      { k: '∞', t: 'Narrativa integrada al gameplay', d: 'El mundo oscuro no se cuenta con cinemáticas: se descubre en fragmentos de diálogo de las criaturas, en el estado visual de los biomas antes y después de conquistarlos y en revelaciones al derrotar a cada jefe.' }
    ],
    docsTitle: 'Documentación producida',
    docs: [['GDD completo', 'Documento maestro de más de 15 secciones con cada sistema detallado'], ['Cronograma de desarrollo', '115 tareas en 52 semanas, desglosadas por responsable'], ['Presupuesto de producción', '4 escenarios con precios reales de mercado'], ['Flujo de caja proyectado', '12 meses post-lanzamiento con KPIs objetivo'], ['Mapa de navegación UI', '40 pantallas categorizadas por tipo de interacción'], ['Prompts de wireframes', '10 prompts detallados para Claude Design'], ['Pipeline técnico Unity', 'Arquitectura de código pensada para una desarrolladora junior'], ['Catálogo de logros', '40 logros con progreso, recompensas y categorías'], ['Sistema de audio', 'Guía de producción con herramientas gratuitas'], ['MVP vs. post-lanzamiento', '127 ítems clasificados para el equipo']],
    decisionsTitle: 'Decisiones de diseño clave',
    decisions: [
      ['Tap-to-move en lugar de joystick', 'El joystick libre implicaba animaciones en 8 direcciones, pathfinding complejo y más carga de arte, innecesario en un juego donde la acción principal es gestionar, no explorar. Tap-to-move preserva la estética sin añadir complejidad técnica.'],
      ['Gacha por fragmentos en lugar de gacha aleatorio', 'El mercado hispanohablante es más sensible al pay-to-win que el anglosajón. Los fragmentos garantizan progreso visible y eliminan la percepción de injusticia sin perder el loop de coleccionismo.'],
      ['2D URP en lugar de 2.5D con shaders', 'Los fondos 3D con cel-shading habrían exigido texturas con UV en lugar de ilustraciones directas, rompiendo el flujo natural de la ilustradora y diluyendo el estilo visual, que es el mayor diferenciador del juego.'],
      ['Un arco narrativo sin victoria posible', 'El jugador nunca derrota la oscuridad: solo construye el mejor refugio posible. Es coherente con el tono cozy y con el modelo de live-ops: un juego sin final narrativo puede actualizarse indefinidamente sin contradecir su historia.']
    ],
    metricsTitle: 'Métricas objetivo',
    metrics: [['D1 > 35 %', 'Retención día 1'], ['D7 > 18 %', 'Retención día 7'], ['D30 > 8 %', 'Retención día 30'], ['6–12 min', 'Duración de sesión'], ['2–3', 'Sesiones al día'], ['2 %', 'Conversión F2P → pago'], ['US$0,80', 'ARPU mensual'], ['CO · MX · AR', 'Soft launch']],
    showsTitle: 'Lo que demuestra este proyecto',
    shows: ['Sistemas interconectados sin contradicciones internas: economía, retención, narrativa y monetización son coherentes entre sí.', 'Pensamiento en arquetipos de jugador antes de diseñar mecánicas: cada sistema responde a un perfil definido, no a una preferencia personal.', 'Criterio técnico aplicado al diseño: las decisiones de arte y arquitectura de código están motivadas por el GDD, no al revés.', 'Documentación de producción profesional en un proyecto indie sin estructura de estudio detrás.'],
    artNote: 'Arte en producción · las ilustraciones finales llegarán pronto'
  },
  en: {
    eyebrow: 'Game Design · Mobile idle-cozy · Android',
    title: 'Little Creatures Hotel',
    tagline: 'A network of sanctuary hotels that rescue magical creatures from a world threatened by dark forces.',
    status: 'In active development — full documentation, pre-production',
    facts: [['Role', 'Lead Game Designer and Unity developer'], ['Team', '2 people: design/development (Luisa) and art/animation (Juliana)'], ['Platform', 'Android · Spanish-speaking market'], ['Status', 'Pre-production']],
    aboutTitle: 'The project',
    about: 'Little Creatures Hotel is an idle-cozy mobile game for Android aimed at the Spanish-speaking market. Players run a network of sanctuary hotels that rescue magical creatures from a world threatened by dark forces. It combines hotel management, creature collecting, progressive automation and idle turn-based combat within a background narrative that evolves with every territorial conquest.',
    roleTitle: 'My role as Game Designer',
    role: 'I designed the project from scratch: from the core fantasy to the economy balance, including every mechanical system, the world’s narrative and the monetization architecture. There was no external brief or previous GDD; everything grew from an initial idea that I built and fully documented.',
    loopTitle: '4-layer core loop',
    loopText: 'A gradually revealed progression that protects casual players without boring committed ones. Each layer only appears once the player has mastered the previous one, reducing onboarding friction without sacrificing depth.',
    loop: ['Manual hotel management', 'Automation with creatures', 'Resource minigames', 'Territorial conquests'],
    systemsTitle: 'Systems I designed',
    systems: [
      { k: '11', t: 'Economy with 11 resources', d: 'Each resource has a defined source, sink and acquisition difficulty. Bottlenecks are intentional: food limits automation, rare minerals slow advanced building and Biome Essence is unrepeatable by design. Balanced for 5–15 minute sessions with 2–3 visits a day.' },
      { k: '25', t: 'Creatures across 5 biomes', d: 'Each creature has a rarity, personality archetype, unique mechanical passive, animation set, signature sound and a fragment of lore. Legendaries trigger sanctuary combos that create long-term strategic decisions.' },
      { k: '50/30/20', t: 'Idle turn-based combat', d: 'Outcomes depend on creature level (50%), team composition (30%) and biome affinity (20%). Players always know why they lost and what to improve: no pure luck, just deferred strategy.' },
      { k: '0', t: 'Anti pay-to-win monetization', d: 'Fully playable without paying. Revenue comes from voluntary rewarded ads, cosmetics and time skips, never from mechanical advantage. Fragment-based gacha guarantees the creature once all pieces are collected.' },
      { k: '40', t: 'Multi-layer retention', d: '40 achievements with visible progress, 20 rotating daily missions, a 30-day monthly streak, 7 seasonal events, a combined pass and contextual, non-intrusive notifications. Each system targets a different player archetype.' },
      { k: '∞', t: 'Narrative woven into gameplay', d: 'The dark world isn’t told through cutscenes: it is discovered through creature dialogue fragments, the visual state of biomes before and after conquering them, and revelations when each boss is defeated.' }
    ],
    docsTitle: 'Documentation produced',
    docs: [['Full GDD', 'Master document with 15+ sections detailing every system'], ['Development schedule', '115 tasks over 52 weeks, broken down by owner'], ['Production budget', '4 scenarios with real market prices'], ['Projected cash flow', '12 months post-launch with target KPIs'], ['UI navigation map', '40 screens categorized by interaction type'], ['Wireframe prompts', '10 detailed prompts for Claude Design'], ['Unity technical pipeline', 'Code architecture designed for a junior developer'], ['Achievement catalog', '40 achievements with progress, rewards and categories'], ['Audio system', 'Production guide using free tools'], ['MVP vs. post-launch', '127 items classified for the team']],
    decisionsTitle: 'Key design decisions',
    decisions: [
      ['Tap-to-move instead of a joystick', 'A free joystick meant 8-direction animations, complex pathfinding and a heavier art load — unnecessary in a game where the main action is managing, not exploring. Tap-to-move keeps the look without adding technical complexity.'],
      ['Fragment gacha instead of random gacha', 'The Spanish-speaking market is more sensitive to pay-to-win than the English-speaking one. Fragments guarantee visible progress and remove the feeling of unfairness while keeping the collecting loop.'],
      ['2D URP instead of 2.5D with shaders', 'Cel-shaded 3D backgrounds would have required UV-mapped textures instead of direct illustrations, breaking the illustrator’s natural workflow and diluting the visual style — the game’s biggest differentiator.'],
      ['A narrative arc with no possible victory', 'Players never defeat the darkness; they only build the best possible refuge. This fits the cozy tone and the live-ops model: a game without a narrative ending can be updated indefinitely without contradicting its own story.']
    ],
    metricsTitle: 'Target metrics',
    metrics: [['D1 > 35%', 'Day-1 retention'], ['D7 > 18%', 'Day-7 retention'], ['D30 > 8%', 'Day-30 retention'], ['6–12 min', 'Session length'], ['2–3', 'Sessions per day'], ['2%', 'F2P → payer conversion'], ['US$0.80', 'Monthly ARPU'], ['CO · MX · AR', 'Soft launch']],
    showsTitle: 'What this project shows',
    shows: ['Interconnected systems with no internal contradictions: economy, retention, narrative and monetization are consistent with each other.', 'Thinking in player archetypes before designing mechanics: every system answers to a defined profile, not to personal preference.', 'Technical judgment applied to design: art and code-architecture decisions are driven by the GDD, not the other way around.', 'Professional production documentation on an indie project with no studio structure behind it.'],
    artNote: 'Art in production · final illustrations coming soon'
  }
};
