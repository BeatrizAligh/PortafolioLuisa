// Landing touches shared by the portfolio pages: drifting sparkles and staggered card entrance.
(() => {
  document.querySelectorAll('.landing-sparkles').forEach(layer => {
    layer.innerHTML = Array.from({ length: 28 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--y:${(i * 53) % 92}%;--s:${2 + (i % 4)}px;--d:${4 + (i % 5)}s;--delay:${-(i % 7) * .8}s"></i>`).join('');
  });
  const stagger = grid => grid.querySelectorAll('.project-card').forEach((card, i) => card.style.setProperty('--n', i));
  document.querySelectorAll('.project-grid').forEach(grid => {
    stagger(grid);
    new MutationObserver(() => stagger(grid)).observe(grid, { childList: true });
  });
})();
