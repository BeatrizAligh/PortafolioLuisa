// Shared video slots.
// <div class="vplayer" data-video="mochis-trailer"></div>            -> poster + play button, loads the MP4 on click
// <div class="vplayer" data-video="a|b" data-labels="A|B"></div>     -> same, with chips to switch between videos
// <div class="vplayer" data-video=""></div>                           -> "video coming soon" placeholder
(() => {
  const copy = {
    es: { play: 'Reproducir video', soon: 'Video próximamente', soonText: 'Este espacio está reservado para el video del proyecto.' },
    en: { play: 'Play video', soon: 'Video coming soon', soonText: 'This space is reserved for the project video.' }
  };
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
  const ring = '<span class="vplayer__ring" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span>';

  function pauseOthers(current) {
    document.querySelectorAll('.vplayer video').forEach(video => { if (video !== current) video.pause(); });
  }

  function render(slot, index = Number(slot.dataset.index || 0)) {
    const names = (slot.dataset.video || '').split('|').filter(Boolean);
    const labels = (slot.dataset.labels || '').split('|');
    const t = copy[lang()];
    slot.dataset.index = index;
    slot.classList.toggle('vplayer--pending', !names.length);
    if (!names.length) {
      slot.innerHTML = `<div class="vplayer__stage"><div class="vplayer__soon">${ring}<strong>${t.soon}</strong><span>${t.soonText}</span></div></div>`;
      return;
    }
    const name = names[Math.min(index, names.length - 1)];
    const title = labels[index] || slot.dataset.title || '';
    slot.innerHTML = `<div class="vplayer__stage">
        <button class="vplayer__poster" type="button" aria-label="${t.play}${title ? `: ${title}` : ''}">
          <img src="media/poster/${name}.webp" alt="" loading="lazy" decoding="async">${ring}
        </button>
      </div>` + (names.length > 1 ? `<div class="vplayer__chips" role="tablist">${names.map((_, i) => `<button type="button" role="tab" aria-selected="${i === index}" data-index="${i}">${labels[i] || i + 1}</button>`).join('')}</div>` : '');
    slot.querySelector('.vplayer__poster').addEventListener('click', () => play(slot, name));
    slot.querySelectorAll('.vplayer__chips button').forEach(chip => chip.addEventListener('click', () => {
      const keepPlaying = !!slot.querySelector('video');
      render(slot, Number(chip.dataset.index));
      if (keepPlaying) play(slot, names[Number(chip.dataset.index)]);
    }));
  }

  function play(slot, name) {
    const stage = slot.querySelector('.vplayer__stage');
    const video = document.createElement('video');
    video.src = `media/video/${name}.mp4`;
    video.poster = `media/poster/${name}.webp`;
    video.controls = true; video.playsInline = true; video.preload = 'auto';
    video.addEventListener('play', () => pauseOthers(video));
    stage.replaceChildren(video);
    video.play().catch(() => {});
  }

  function set(slot, names, labels = '') {
    slot.dataset.video = names; slot.dataset.labels = labels; render(slot, 0);
  }

  function init(root = document) { root.querySelectorAll('.vplayer').forEach(slot => { if (!slot.dataset.ready) { slot.dataset.ready = '1'; render(slot); } }); }

  // Re-render placeholders/labels when the language changes (videos already playing are kept).
  new MutationObserver(() => document.querySelectorAll('.vplayer').forEach(slot => { if (!slot.querySelector('video')) render(slot); }))
    .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  window.VideoSlots = { init, set, pauseAll: () => pauseOthers(null) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();
})();
