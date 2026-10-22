(() => {
  const root = document.querySelector('#magicCase');
  const source = window.MAGIC_FIGCRAFT;
  const extra = window.MAGIC_EXTRA;
  if (!root || !source) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const asset = 'Img/Portafolio/MagicBirthday/';
  let language = document.documentElement.lang === 'en' ? 'en' : 'es';
  let ingredient = 0;
  let responsibility = 0;
  let mechanic = 0;
  let openTimer;
  const english = {
    1730: 'Unity · C# · Game Development · LAN · Game Jam',
    1731: 'A birthday that should not be like this.',
    1732: 'Magic Birthday is a psychological horror experience that breaks the fourth wall. What begins as an adorable birthday party gradually becomes an experience where the game, the computer and the player’s phone start to merge.',
    1733: '2024 · Game Jam — National University of Colombia\nStatus: In development',
    1735: 'My role', 1736: 'Unity Developer · Gameplay Programmer · Implementation',
    1737: 'My main responsibility was developing and assembling the experience in Unity.\nI implemented the systems that allow the different parts of the game to communicate, and integrated the mechanics that give the player’s actions consequences within the experience.',
    1781: 'The project',
    1782: 'A party. A disappearance. Something is wrong.\nThe experience begins with preparations for a birthday party. The player completes small activities and challenges while trying to discover what happened to the person whose birthday they were meant to celebrate.\nThe aesthetic uses hand-painted 2D illustrations on 3D elements, creating an initially cute, familiar look that gradually begins to break down.\nInspired by experiences such as Doki Doki Literature Club and Bonnie’s Bakery, the project makes breaking the fourth wall a central part of its narrative.',
    1790: 'See more projects', 1802: 'More information in the ingredients',
    1804: 'My responsibilities', 1810: 'Programming', 1811: 'Integration', 1812: 'Experience',
    1813: 'Unity 6 and C# for gameplay programming.\nUniversal Render Pipeline (URP) for optimized rendering and mobile compatibility.\nUnity Input System for player controls and input.\nNetcode for GameObjects and Unity Transport for multiplayer synchronization.\nLocal-network match discovery.\nParrelSync for testing multiple clients in the editor.\nCinemachine for dynamic camera control.\nTextMeshPro and Unity UI for interfaces, dialogue and menus.\nA node-based dialogue system using xNode.\nCustom inventory, interaction, quest, notification and dynamic material systems.\nCoroutines, events, interfaces and reusable components.\nMobile configuration using IL2CPP, ARM64 and modern Android APIs.\nI also migrated the project from an older Unity version to Unity 6, updating obsolete APIs, dependencies, rendering settings and build compatibility for current Android devices.',
    1833: 'I implemented PC-to-phone communication over LAN using Netcode for GameObjects and Unity Transport.\nI developed automatic match discovery on the local network, making it easier to connect the phone to the main game.\nI integrated the mobile application as a client connected to the main host or server instance.\nI implemented RPC communication to synchronize actions and events across devices.\nI developed a notification and command system to exchange information between the phone and the main experience.\nI configured networking components including NetworkManager, NetworkBehaviour, synchronized prefabs and connection management.\nI assembled scenes, interfaces, interactive elements, cameras, narrative systems and multiplayer components.\nI prepared the application for modern Android devices using IL2CPP, ARM64, Unity Input System and Universal Render Pipeline.',
    1867: 'I developed fourth-wall-breaking mechanics through gameplay events, diegetic interfaces and dynamic changes to the environment.\nI implemented C# systems in Unity that change the experience state: materials, interactive objects, dialogue, audio, animation and progression.\nI created an interface that simulates a mobile device inside the game using Unity UI, TextMeshPro, events and notifications.\nI developed and supported experiences and minigames using reusable components, coroutines, interfaces, events and modular systems.\nI implemented interaction systems using colliders, triggers, inventory and contextual player actions.\nI integrated a node-based dialogue system to control conversations, responses and narrative events.',
    1844: 'Two devices. One experience.',
    1960: 'The fourth wall in Magic Birthday',
    1962: 'The game uses several systems to make players question where the game ends and their own device begins. The experience includes:',
    1970: 'Dynamic events', 1971: 'Device interaction', 1972: 'Notes system', 1973: 'Phone communication',
    1990: 'Magic Birthday'
  };
  const text = id => language === 'en' ? (english[id] || source[id] || '') : (source[id] || '');
  const headingIds = [1804,1844,1960,1990];
  const responsibilityIds = [1813,1867,1833];
  const responsibilityLabels = [1810,1812,1811];
  const responsibilityIcons = ['programming','experience','integration'];
  const mechanicLabels = [1970,1973,1972,1971];
  const mechanicIcons = ['events','phone','notes','device'];
  const deviceBodyEnglish = 'I implemented a Host–Client architecture with Netcode for GameObjects and Unity Transport. The computer acts as the host and the phone automatically discovers the session on the local network through broadcast.\nOnce connected, the phone becomes a companion interface and sends actions to the game through Server RPCs. The computer processes these commands and synchronizes events, notifications, audio and gameplay changes through Client RPCs and C# events, without external servers or an Internet connection.';
  const stepsEnglish = ['StartHost()', 'Broadcasts the session over LAN', 'The phone detects the IP address and port', 'UnityTransport configuration', 'StartClient()', 'Establishes the connection', 'The phone sends actions through RPCs', 'The server validates and distributes events'];
  const mechanicsEnglish = ['Changes to specific game elements create unexpected situations.', 'The phone becomes an extension of the game and receives information that complements what happens on the PC.', 'The player finds information stored as part of the experience that can be used to continue the investigation.', 'The game can create or modify elements that make the player believe something is happening outside the application.'];
  const views = ['magicResponsibilityView','magicDevicesView','magicFourthWallView','magicGameView'];

  function paragraphs(element, value) {
    element.replaceChildren(...value.split('\n').filter(line => line.trim()).map(line => {
      const p = document.createElement('p'); p.textContent = line; return p;
    }));
  }
  function iconButtons(containerId, labels, icons, selected, prefix, panelId) {
    const container = document.getElementById(containerId);
    container.replaceChildren(...labels.map((id, index) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'magic-tab'; button.id = prefix + index;
      button.dataset.index = index; button.setAttribute('role','tab');
      button.setAttribute('aria-selected', String(index === selected));
      button.setAttribute('aria-controls',panelId); button.tabIndex = index === selected ? 0 : -1;
      const image = document.createElement('img'); image.src = asset + 'icon-' + icons[index] + '.svg?v=20261019'; image.alt = '';
      const label = document.createElement('span'); label.textContent = text(id);
      button.append(image,label); return button;
    }));
  }
  function render(animate = false) {
    root.querySelectorAll('[data-magic]').forEach(element => {
      const value = text(element.dataset.magic);
      if (element.tagName === 'DIV') paragraphs(element,value);
      else element.textContent = value;
    });
    document.querySelector('#magicDetailHeading').textContent = text(headingIds[ingredient]);
    views.forEach((id,index) => { document.getElementById(id).hidden = index !== ingredient; });
    const panel = document.querySelector('#magicIngredientPanel');
    panel.setAttribute('aria-labelledby','magicIngredient'+ingredient);
    document.querySelector('.magic-kitchen').classList.toggle('is-creepy',ingredient===2);
    root.dataset.ingredient=ingredient;
    paragraphs(document.querySelector('#magicDeviceBody'),language==='en'?deviceBodyEnglish:extra.deviceBody);
    document.querySelector('#magicConnectionSteps').replaceChildren(...(language==='en'?stepsEnglish:extra.connectionSteps).map(value=>{
      const item=document.createElement('span');item.textContent=value;return item;
    }));
    document.querySelector('#magicResponsibilityList').replaceChildren(...text(responsibilityIds[responsibility]).split('\n').filter(Boolean).map(line => {
      const item = document.createElement('li'); item.textContent = line; return item;
    }));
    document.querySelector('#magicResponsibilityPanel').setAttribute('aria-labelledby','magicResponsibility'+responsibility);
    iconButtons('magicResponsibilityTabs',responsibilityLabels,responsibilityIcons,responsibility,'magicResponsibility','magicResponsibilityPanel');
    iconButtons('magicMechanicTabs',mechanicLabels,mechanicIcons,mechanic,'magicMechanic','magicMechanicPanel');
    document.querySelector('#magicMechanicHeading').textContent = text(mechanicLabels[mechanic]);
    document.querySelector('#magicMechanicDescription').textContent=language==='en'?mechanicsEnglish[mechanic]:extra.mechanicDescriptions[mechanic];
    document.querySelector('#magicMechanicPanel').setAttribute('aria-labelledby','magicMechanic'+mechanic);
    // Order follows mechanicLabels: dynamic events, phone communication, notes system, device interaction.
    const mechanicVideo=['magic-eventos-dinamicos','magic-comunicacion-telefono','','magic-interaccion-dispositivo'][mechanic];
    const mechanicSlot=document.querySelector('#magicMechanicVideo');
    if(window.VideoSlots&&mechanicSlot.dataset.video!==mechanicVideo) window.VideoSlots.set(mechanicSlot,mechanicVideo);
    // no video for this mechanic yet: hide the empty slot instead of showing a placeholder
    mechanicSlot.closest('.magic-video').hidden=!mechanicVideo;
    document.querySelector('#magicMechanicPanel').classList.toggle('is-text-only',!mechanicVideo);
    const selector=document.querySelector('#magicMobileSelector');
    selector.hidden=ingredient!==0 && ingredient!==2;
    document.querySelector('#magicMobileIcon').src=asset+'icon-'+(ingredient===2?mechanicIcons[mechanic]:responsibilityIcons[responsibility])+'.svg?v=20261019';
    document.querySelector('#magicMobileLabel').textContent=text(ingredient===2?mechanicLabels[mechanic]:responsibilityLabels[responsibility]);
    const intro=document.querySelector('#magicMobileIntro');intro.hidden=ingredient!==2;intro.textContent=text(1962);
    document.querySelector('#magicPrevious').setAttribute('aria-label',language==='es'?'Opción anterior':'Previous option');
    document.querySelector('#magicNext').setAttribute('aria-label',language==='es'?'Opción siguiente':'Next option');
    const ingredients = document.querySelector('#magicIngredients');
    if (!ingredients.children.length) {
      for(let index=0; index<4; index++) {
        const button = document.createElement('button'); button.className='magic-ingredient';button.type='button';
        button.id='magicIngredient'+index;button.dataset.index=index;button.setAttribute('role','tab');button.setAttribute('aria-controls','magicIngredientPanel');
        const image = document.createElement('img'); image.src=asset+'ingredient-'+(index+1)+'.webp';image.alt='';image.loading='lazy';
        button.append(image); ingredients.append(button);
      }
    }
    [...ingredients.children].forEach((button,index) => {
      button.setAttribute('aria-label',text(headingIds[index]));button.setAttribute('aria-selected',String(index===ingredient));button.tabIndex=index===ingredient?0:-1;
      const image = button.querySelector('img');
      image.src=asset+(ingredient===2?'dark-ingredient-':'ingredient-')+(index+1)+'.webp';
      const position=(index-ingredient+4)%4;
      button.style.setProperty('--ingredient-x',['50%','18%','50%','82%'][position]);
      button.style.setProperty('--ingredient-y',position===0?'0px':'70px');
    });
    document.querySelector('#magicIngredientStatus').textContent=(language==='es'?'Seleccionado: ':'Selected: ')+text(headingIds[ingredient]);
    syncTrigger();
    if(animate && !reduced) panel.animate([{opacity:0},{opacity:1}],{duration:250,easing:'ease-out'});
  }
  function syncTrigger() {
    const trigger = document.querySelector('[data-project="magic-birthday"]');
    if(trigger){trigger.setAttribute('aria-controls','magicCase');trigger.setAttribute('aria-expanded',String(root.classList.contains('is-open')));}
    document.querySelector('#magicClose').setAttribute('aria-label',language==='es'?'Cerrar Magic Birthday':'Close Magic Birthday');
  }
  function bindTabs(containerId, count, getIndex, select, prefix) {
    const container = document.getElementById(containerId);
    container.addEventListener('click',event => {
      const button = event.target.closest('[role="tab"]'); if(!button) return;
      select(Number(button.dataset.index));render(true);
      const active = document.getElementById(prefix+getIndex()); active.focus({preventScroll:true});
      if(containerId==='magicIngredients') document.querySelector('#magicIngredientPanel').scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
    });
    container.addEventListener('keydown',event => {
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next=event.key==='Home'?0:event.key==='End'?count-1:(getIndex()+(event.key==='ArrowRight'?1:count-1))%count;
      select(next);render(true);document.getElementById(prefix+next).focus({preventScroll:true});
    });
  }
  bindTabs('magicIngredients',4,()=>ingredient,value=>{ingredient=value;},'magicIngredient');
  bindTabs('magicResponsibilityTabs',3,()=>responsibility,value=>{responsibility=value;},'magicResponsibility');
  bindTabs('magicMechanicTabs',4,()=>mechanic,value=>{mechanic=value;},'magicMechanic');
  function cycle(direction){
    if(ingredient===0) responsibility=(responsibility+direction+3)%3;
    if(ingredient===2) mechanic=(mechanic+direction+4)%4;
    render(true);
  }
  document.querySelector('#magicPrevious').addEventListener('click',()=>cycle(-1));
  document.querySelector('#magicNext').addEventListener('click',()=>cycle(1));

  function close(returnFocus=true) {
    clearTimeout(openTimer);root.classList.remove('is-open');root.setAttribute('aria-hidden','true');root.inert=true;syncTrigger();
    const trigger=document.querySelector('[data-project="magic-birthday"]');
    if(returnFocus && trigger){trigger.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});trigger.focus({preventScroll:true});}
  }
  document.querySelector('#projectGrid').addEventListener('click',event=>{
    const trigger=event.target.closest('[data-project]');if(!trigger)return;
    if(trigger.dataset.project!=='magic-birthday'){if(root.classList.contains('is-open'))close(false);return;}
    const mochis=document.querySelector('#mochisCase');
    mochis.classList.remove('is-open');mochis.setAttribute('aria-hidden','true');
    document.querySelector('[data-project="mochis"]')?.setAttribute('aria-expanded','false');
    root.inert=false;root.classList.add('is-open');root.setAttribute('aria-hidden','false');syncTrigger();
    clearTimeout(openTimer);openTimer=setTimeout(()=>root.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'}),reduced?0:850);
  });
  document.querySelector('#magicClose').addEventListener('click',()=>close());
  document.querySelector('#magicReturn').addEventListener('click',()=>close());
  document.addEventListener('portfolio:language',event=>{language=event.detail.lang;render();});
  render();
})();
