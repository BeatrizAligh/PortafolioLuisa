// Copy for the Último Ensayo and BomberWoman case studies (taken from the figcraft design, proofread).
window.CASES_CONTENT = {
  es: {
    common: { back: 'Ver más proyectos', close: 'Cerrar caso de estudio', prev: 'Página anterior', next: 'Página siguiente', page: 'Página', home: 'Volver al minijuego', closePanel: 'Cerrar' },
    ultimo: {
      title: 'El último ensayo',
      stack: 'Desarrollo individual · Unity · C# · Game Design · UI',
      tagline: 'Una historia sobre la música, la ansiedad y volver a intentarlo.',
      body: 'El último ensayo es un videojuego narrativo en primera persona que sigue a Mateo, un violinista que intenta recuperar su relación con la música mientras enfrenta el miedo a fallar y la pérdida de su maestro. La experiencia combina exploración, decisiones cotidianas y minijuegos de interpretación musical, afinación, respiración y pensamientos intrusivos.\nDesarrollé el proyecto de forma individual, asumiendo el diseño de juego, la programación en Unity y el diseño e implementación de la interfaz. También me encargué de buscar, seleccionar e integrar modelos 3D gratuitos de terceros para construir los escenarios.',
      meta: '2025–2026 · Dardranight Studios<br><b>Estado: finalizado y publicado</b>',
      storesTitle: 'Descárgalo',
      stores: [{ label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.UnityTechnologies.com.unity.template.urpblank.com.UltimoEnsayo&hl=es_CO' }, { label: 'App Store', url: 'https://apps.apple.com/us/app/elultimoensayo/id6761848484' }],
      roleKicker: 'Mi rol',
      roleTitle: 'Unity Developer<br>De la narrativa a los sistemas que la hacen jugable',
      roleBody: 'Programé en Unity y C# los sistemas que conectan la exploración, las actividades y la progresión narrativa. Organicé la experiencia mediante una estructura por días, con eventos activados por horario y conversaciones que responden a las decisiones del jugador.\nImplementé cuatro minijuegos: interpretación de violín, afinación, respiración y selección de pensamientos. Cada uno se integra con el flujo principal, coordinando la interfaz, las cámaras, el audio y la habilitación de controles.\nUno de los retos fue mantener la continuidad entre sistemas que comparten el mismo tiempo de juego. Para resolverlo, implementé una cola de eventos que organiza las secuencias pendientes y evita que las conversaciones y actividades se superpongan.',
      respTitle: 'Mis responsabilidades',
      credit: 'Proyecto desarrollado individualmente. Fui responsable del game design, la programación, el diseño de UI y su implementación en Unity, además de la selección e integración de recursos para los escenarios. Los modelos 3D utilizados provienen de recursos gratuitos de terceros; su autoría corresponde a sus respectivos creadores.',
      finalTitle: 'El último ensayo',
      pages: [
        { tab: 'Unity Developer', title: 'Unity Developer', list: ['Control del personaje en primera persona e interacción con objetos mediante una retícula con progreso.', 'Progresión por días, reloj del juego y eventos asociados a horarios.', 'Sistema de diálogos con elecciones y contenido configurado mediante ScriptableObjects.', 'Programación de los cuatro minijuegos y sus tutoriales.', 'Diario con objetivos y notas desbloqueables, y correo con estados de lectura.', 'Guardado del avance entre jornadas y recuperación de notas y correos.', 'Transiciones entre escenas con carga aditiva, puntos de aparición y fundidos.', 'Integración de cámaras, secuencias y audio con Cinemachine y Timeline.'], note: '<b>Tecnologías:</b> Unity 6, C#, uGUI, TextMeshPro, Input System, Cinemachine y Timeline.', video: true },
        { tab: 'Game Design', title: 'Game Design', body: 'Diseñé la experiencia para que el jugador conozca a Mateo a través de lo que hace: practicar, trabajar, descansar, distraerse o intentar retomar su rutina. Estas acciones hacen avanzar el tiempo y se conectan con conversaciones, objetivos y momentos de la historia.\nEstructuré la progresión desde el backstage de un concierto hasta un recital de despedida, pasando por varias jornadas en el apartamento. La repetición del entorno permite mostrar cambios en el contexto, las actividades disponibles y la disposición del protagonista hacia la música.\nLos minijuegos funcionan como parte del relato. La interpretación introduce presión mediante el aumento de velocidad de las notas; la afinación propone preparar el instrumento antes de practicar; la respiración divide la interacción en inhalar, sostener y exhalar; y los pensamientos intrusivos plantean elecciones bajo un límite de tiempo.', asideTitle: 'Aportes', aside: ['Concepto, mecánicas y estructura de progresión.', 'Ciclo de juego basado en explorar, elegir actividades, avanzar el tiempo y descubrir contenido narrativo.', 'Diseño de cuatro minijuegos vinculados con la experiencia del protagonista.', 'Variaciones del minijuego musical para historia, práctica y recital.', 'Decisiones que modifican actividades y conversaciones dentro de una progresión narrativa guiada.', 'Tutoriales introducidos en el contexto de cada mecánica.', 'Uso del diario y el correo para complementar la historia y orientar al jugador.'] },
        { tab: 'UI Design', title: 'UI Design & Implementation', body: 'Diseñé e implementé la interfaz del proyecto, desde los menús y ajustes hasta el diario, el correo, los diálogos y las pantallas de los minijuegos. Trabajé con tipografías serif, tonos cálidos e iconografía relacionada con la música y la escritura para acompañar el carácter íntimo de la historia.\nCada mecánica necesitaba comunicar información diferente. En afinación, combiné la selección de cuerdas y clavijas con indicadores de desviación y estados visuales. En el juego de ritmo, incorporé señales de acierto y error. Para la respiración y los pensamientos intrusivos, utilicé instrucciones por fase, barras de progreso y límites de tiempo visibles.\nTambién incorporé opciones de tamaño de texto, volumen, brillo y sensibilidad de cámara para permitir ajustes de lectura y control.', asideTitle: 'Aportes', aside: ['Diseño visual e implementación de menús, HUD y navegación entre paneles.', 'Diario con objetivos, subtareas, notas y avisos de contenido nuevo.', 'Interfaz de correo con listado de mensajes y estados de lectura.', 'Paneles de diálogo con retratos, texto progresivo y elecciones.', 'Interfaces específicas para los cuatro minijuegos.', 'Tutoriales visuales, confirmaciones y mensajes de interacción bloqueada.', 'Estados de selección, progreso, disponibilidad y respuesta a las acciones.', 'Integración de controles táctiles y entradas de teclado y ratón.'] }
      ]
    },
    otros: {
      title: 'Otros proyectos',
      intro: 'Proyectos en Unity donde el diseño de juego está al servicio de un mensaje.',
      items: [
        { id: 'offshore', title: 'OffShore', role: 'Programación, UI, experiencia de juego (game design) y analítica · Stack: Unity 6 (6000.4), URP 2D, Input System, Localization, Unity Gaming Services Analytics, WebGL con plantilla propia', body: 'Juego de activismo en pixel art: un endless runner donde el jugador cruza California, el Golfo de México y Alaska esquivando obstáculos mientras un reloj de 45 segundos corre en su contra. El giro de diseño es que el juego está hecho para que pierdas: cada derrota explica que “no fue tu habilidad, el sistema está diseñado para avanzar antes de que las comunidades reaccionen” y lleva al llamado a firmar contra la expansión de la perforación petrolera en altamar. La mecánica comunica el mensaje.\nDesarrollé la programación, la UI bilingüe (español/inglés), el flujo narrativo y la instrumentación de analítica, incluida la integración con la web anfitriona donde vive el juego.', techTitle: 'Lo técnico', tech: ['Mundo con parallax de 6 capas (cielo, dos planos medios, agua, suelo y obstáculos), rampa de velocidad y biomas definidos en ScriptableObjects (WorldSO y ObstaclePoolSO con pesos).', 'Salto con coyote time (0,1 s) y jump buffer (0,12 s), doble salto, teclado y táctil con el Input System.', 'Vidas, reloj, días, curiosidades educativas, transición circular de cortina y narrativa de derrota por bioma.', 'Analítica en dos capas: eventos de UGS (run_started, life_lost, biome_changed, sign_now_clicked…) y un puente .jslib que los envía al dataLayer de la página padre por postMessage, con validación de origen en el host.', 'WebGL embebido: control de orientación en móvil, pausa automática y scroll de la página padre hacia la sección de firma desde un botón del juego.'], meta: 'Dardranight Studios<br><b>Estado: finalizado y publicado</b>', video: 'unity-offshore' }
      ]
    },
    bomber: {
      title: 'BomberWoman',
      stack: 'Desarrollo en Unity · Programación en C# · Implementación de UI · Animación 2D',
      tech: 'Unity, C#, Tilemap, Animator, Unity Input System y TextMesh Pro.',
      body: 'Este proyecto recrea la dinámica de Bomberman: recorrer escenarios, colocar bombas, destruir obstáculos y enfrentarse a enemigos mientras se recolectan potenciadores.\nMi responsabilidad fue llevar los recursos visuales a una experiencia jugable en Unity. Programé los sistemas del juego, monté las escenas y conecté la interfaz con las acciones y los estados de la partida.',
      meta: '2024 · Dardranight Studios<br><b>Estado: finalizado</b>',
      roleKicker: 'Mi rol',
      roleTitle: 'Programación de gameplay e integración en Unity',
      roleBody: 'Estuve a cargo de toda la programación del juego y de su implementación dentro de Unity. Recibí los sprites como recursos separados y la propuesta de interfaz en Figma; a partir de ese material, realicé el montaje, la configuración y la integración de los elementos visuales e interactivos.',
      roleHint: 'Haz clic en las caras para hacerlas explotar.',
      mapTitle: 'Mis responsabilidades',
      mapHint: 'Haz clic en un poder azul: la protagonista caminará hasta él y descubrirás una de mis responsabilidades.',
      panelKicker: 'Mi participación',
      finalTitle: 'BomberWoman',
      powers: [
        { title: 'Control del personaje', text: 'movimiento, colisiones y conexión de las animaciones con la dirección y el estado del jugador.' },
        { title: 'Bombas y explosiones', text: 'colocación sobre la cuadrícula, detonación temporizada o remota, propagación en cuatro direcciones y destrucción de bloques.' },
        { title: 'Enemigos', text: 'movimiento autónomo, detección de obstáculos, aparición en espacios disponibles y comportamiento de derrota.' },
        { title: 'Potenciadores', text: 'ocho tipos de mejoras que modifican la cantidad de bombas, el alcance de las explosiones, la velocidad y las capacidades del personaje.' },
        { title: 'Gestión de partida e interfaz', text: 'vidas, reaparición, puntuación, temporizador, pausa y reinicio del escenario. Implementación de menús, tutorial, indicadores de partida, ajustes y pantallas de victoria y derrota.' },
        { title: 'Animación e integración visual', text: 'preparación de secuencias con los sprites entregados, configuración de Animator y animaciones de explosión, destrucción y derrota.' },
        { title: 'Transiciones y personalización', text: 'sistema de cortinillas animadas seleccionables para los cambios de escena, personalización de música, logo para iniciativas BTL y cambio de recursos gráficos de inicio en WebGL.' }
      ]
    }
  },
  en: {
    common: { back: 'See more projects', close: 'Close case study', prev: 'Previous page', next: 'Next page', page: 'Page', home: 'Back to the minigame', closePanel: 'Close' },
    ultimo: {
      title: 'The Last Rehearsal',
      stack: 'Solo development · Unity · C# · Game Design · UI',
      tagline: 'A story about music, anxiety and trying again.',
      body: 'The Last Rehearsal is a first-person narrative game about Mateo, a violinist trying to rebuild his relationship with music while facing the fear of failure and the loss of his mentor. The experience combines exploration, everyday choices and minigames about musical performance, tuning, breathing and intrusive thoughts.\nI developed the project on my own, handling the game design, Unity programming, and the interface design and implementation. I also searched for, selected and integrated free third-party 3D models to build the environments.',
      meta: '2025–2026 · Dardranight Studios<br><b>Status: completed and published</b>',
      storesTitle: 'Get it on',
      stores: [{ label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.UnityTechnologies.com.unity.template.urpblank.com.UltimoEnsayo&hl=es_CO' }, { label: 'App Store', url: 'https://apps.apple.com/us/app/elultimoensayo/id6761848484' }],
      roleKicker: 'My role',
      roleTitle: 'Unity Developer<br>From the narrative to the systems that make it playable',
      roleBody: 'I programmed in Unity and C# the systems that connect exploration, activities and narrative progression. The experience is organized by days, with time-based events and conversations that respond to the player’s choices.\nI implemented four minigames: violin performance, tuning, breathing and thought selection. Each one plugs into the main flow, coordinating the interface, cameras, audio and input availability.\nOne of the challenges was keeping continuity between systems that share the same in-game time. To solve it, I built an event queue that orders pending sequences and keeps conversations and activities from overlapping.',
      respTitle: 'My responsibilities',
      credit: 'Solo project. I was responsible for the game design, programming, UI design and its implementation in Unity, as well as selecting and integrating assets for the environments. The 3D models come from free third-party resources; their authorship belongs to their respective creators.',
      finalTitle: 'The Last Rehearsal',
      pages: [
        { tab: 'Unity Developer', title: 'Unity Developer', list: ['First-person character control and object interaction through a progress reticle.', 'Day-based progression, in-game clock and time-based events.', 'Dialogue system with choices and content configured through ScriptableObjects.', 'Programming of the four minigames and their tutorials.', 'Journal with goals and unlockable notes, plus an email inbox with read states.', 'Progress saving between days and recovery of notes and emails.', 'Scene transitions with additive loading, spawn points and fades.', 'Camera, sequence and audio integration with Cinemachine and Timeline.'], note: '<b>Technologies:</b> Unity 6, C#, uGUI, TextMeshPro, Input System, Cinemachine and Timeline.', video: true },
        { tab: 'Game Design', title: 'Game Design', body: 'I designed the experience so players get to know Mateo through what he does: practicing, working, resting, getting distracted or trying to get back into his routine. These actions move time forward and connect with conversations, goals and story moments.\nI structured the progression from the backstage of a concert to a farewell recital, through several days in the apartment. Revisiting the same space shows changes in context, in the available activities and in the protagonist’s attitude towards music.\nThe minigames are part of the story. Performance adds pressure by speeding up the notes; tuning asks players to prepare the instrument before practicing; breathing splits the interaction into inhaling, holding and exhaling; and intrusive thoughts force choices under a time limit.', asideTitle: 'Contributions', aside: ['Concept, mechanics and progression structure.', 'Gameplay loop based on exploring, choosing activities, advancing time and discovering narrative content.', 'Design of four minigames tied to the protagonist’s experience.', 'Variations of the music minigame for story, practice and recital.', 'Choices that change activities and conversations within a guided narrative progression.', 'Tutorials introduced in the context of each mechanic.', 'Use of the journal and email to support the story and guide the player.'] },
        { tab: 'UI Design', title: 'UI Design & Implementation', body: 'I designed and implemented the project’s interface, from menus and settings to the journal, email, dialogues and minigame screens. I worked with serif typefaces, warm tones and music- and writing-related iconography to match the intimate tone of the story.\nEach mechanic had to communicate different information. For tuning, I combined string and peg selection with deviation indicators and visual states. In the rhythm game, I added hit and miss feedback. For breathing and intrusive thoughts, I used step-by-step instructions, progress bars and visible time limits.\nI also added text size, volume, brightness and camera sensitivity options so players can adjust reading and controls.', asideTitle: 'Contributions', aside: ['Visual design and implementation of menus, HUD and panel navigation.', 'Journal with goals, subtasks, notes and new-content alerts.', 'Email interface with message list and read states.', 'Dialogue panels with portraits, progressive text and choices.', 'Dedicated interfaces for the four minigames.', 'Visual tutorials, confirmations and blocked-interaction messages.', 'Selection, progress, availability and feedback states for every action.', 'Touch controls plus keyboard and mouse input.'] }
      ]
    },
    otros: {
      title: 'Other projects',
      intro: 'Unity projects where game design serves a message.',
      items: [
        { id: 'offshore', title: 'OffShore', role: 'Programming, UI, game design and analytics · Stack: Unity 6 (6000.4), URP 2D, Input System, Localization, Unity Gaming Services Analytics, WebGL with a custom template', body: 'A pixel-art activism game: an endless runner where players cross California, the Gulf of Mexico and Alaska dodging obstacles while a 45-second clock runs against them. The design twist is that the game is built for you to lose: every defeat explains that “it wasn’t your skill, the system is designed to move forward before communities can react” and leads to a call to sign against the expansion of offshore oil drilling. The mechanic delivers the message.\nI handled the programming, the bilingual (Spanish/English) UI, the narrative flow and the analytics instrumentation, including the integration with the host website where the game lives.', techTitle: 'Technical highlights', tech: ['6-layer parallax world (sky, two mid planes, water, ground and obstacles), speed ramp and biomes defined in ScriptableObjects (WorldSO and weighted ObstaclePoolSO).', 'Jump with coyote time (0.1 s) and jump buffer (0.12 s), double jump, keyboard and touch through the Input System.', 'Lives, clock, days, educational facts, circular curtain transition and a defeat narrative per biome.', 'Two-layer analytics: UGS events (run_started, life_lost, biome_changed, sign_now_clicked…) and a .jslib bridge that forwards them to the parent page’s dataLayer via postMessage, with origin validation on the host.', 'Embedded WebGL: mobile orientation control, automatic pause and scrolling the parent page to the petition section from an in-game button.'], meta: 'Dardranight Studios<br><b>Status: completed and published</b>', video: 'unity-offshore' }
      ]
    },
    bomber: {
      title: 'BomberWoman',
      stack: 'Unity development · C# programming · UI implementation · 2D animation',
      tech: 'Unity, C#, Tilemap, Animator, Unity Input System and TextMesh Pro.',
      body: 'This project recreates the Bomberman formula: exploring levels, placing bombs, destroying obstacles and facing enemies while collecting power-ups.\nMy job was to turn the visual assets into a playable experience in Unity. I programmed the game systems, assembled the scenes and connected the interface to the match actions and states.',
      meta: '2024 · Dardranight Studios<br><b>Status: completed</b>',
      roleKicker: 'My role',
      roleTitle: 'Gameplay programming and Unity integration',
      roleBody: 'I was in charge of all the game programming and its implementation in Unity. I received the sprites as separate assets and the interface proposal in Figma; from that material I assembled, configured and integrated every visual and interactive element.',
      roleHint: 'Click the faces to make them explode.',
      mapTitle: 'My responsibilities',
      mapHint: 'Click a blue power-up: the heroine will walk to it and reveal one of my responsibilities.',
      panelKicker: 'My contribution',
      finalTitle: 'BomberWoman',
      powers: [
        { title: 'Character control', text: 'movement, collisions and animations linked to the player’s direction and state.' },
        { title: 'Bombs and explosions', text: 'grid placement, timed or remote detonation, four-way blast propagation and block destruction.' },
        { title: 'Enemies', text: 'autonomous movement, obstacle detection, spawning in free tiles and defeat behavior.' },
        { title: 'Power-ups', text: 'eight upgrade types that change the number of bombs, blast range, speed and the character’s abilities.' },
        { title: 'Match flow and interface', text: 'lives, respawn, score, timer, pause and level restart. Menus, tutorial, match indicators, settings and win and lose screens.' },
        { title: 'Animation and visual integration', text: 'sequences built from the delivered sprites, Animator setup and explosion, destruction and defeat animations.' },
        { title: 'Transitions and customization', text: 'selectable animated wipes for scene changes, music customization, a logo option for BTL activations and swappable start-screen art in WebGL.' }
      ]
    }
  }
};
