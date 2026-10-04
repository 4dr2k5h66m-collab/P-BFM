const background = document.querySelector('.hero-background');
const toggle = document.querySelector('.background-toggle');
const videos = [...document.querySelectorAll('video:not(.hero-background)')];
function updateToggle() {
  toggle.textContent = background.paused ? 'Play background' : 'Pause background';
  toggle.setAttribute('aria-pressed', String(!background.paused));
}
background.addEventListener('play', updateToggle);
background.addEventListener('pause', updateToggle);
toggle.addEventListener('click', () => {
  if (background.paused) background.play().catch(updateToggle);
  else background.pause();
});
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) background.play().catch(updateToggle);
for (const video of videos) video.addEventListener('play', () => {
  background.pause();
  for (const other of videos) if (other !== video) other.pause();
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (!entry.isIntersecting) entry.target.pause();
  });
  for (const video of [...videos, background]) observer.observe(video);
}

// Closing a gallery also stops any media hidden inside it.
for (const gallery of document.querySelectorAll('.more-clips')) {
  gallery.addEventListener('toggle', () => {
    if (!gallery.open) for (const video of gallery.querySelectorAll('video')) video.pause();
  });
}
