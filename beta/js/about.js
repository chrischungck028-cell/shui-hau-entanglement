(() => {
  const panels = Array.from(document.querySelectorAll('.reader-content section'));
  const controls = document.querySelector('.reader-controls');
  const previous = controls.querySelector('.reader-prev');
  const next = controls.querySelector('.reader-next');
  const heading = document.querySelector('#readerTitle');
  let current = 0;

  function render(moveFocus) {
    current = Math.max(0, panels.findIndex(panel => '#' + panel.id === location.hash));
    panels.forEach((panel, index) => { panel.hidden = index !== current; });
    previous.hidden = current === 0;
    next.hidden = current === panels.length - 1;
    if (!previous.hidden) previous.hash = panels[current - 1].id;
    if (!next.hidden) next.hash = panels[current + 1].id;
    document.querySelector('#pageStatus').textContent = '，第 ' + (current + 1) + ' 頁，共 ' + panels.length + ' 頁';
    controls.hidden = false;
    if (moveFocus) heading.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) return;
    if (!heading.closest('main').contains(event.target) && event.target !== document.body) return;
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step || !panels[current + step]) return;
    event.preventDefault();
    location.hash = panels[current + step].id;
  });
  window.addEventListener('hashchange', () => render(true));
  render(false);
})();
