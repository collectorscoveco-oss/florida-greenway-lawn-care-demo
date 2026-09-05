const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const menu = document.querySelector('[data-menu-toggle]');
const glow = document.querySelector('.cursor-glow');
const form = document.querySelector('[data-estimator]');
const estimate = document.querySelector('[data-estimate]');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 18);
});

menu?.addEventListener('click', () => {
  nav?.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach((anchor) => {
  anchor.addEventListener('click', () => nav.classList.remove('open'));
});

if (glow) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => io.observe(element));

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const button = form.querySelector('button');
  const originalText = button.textContent;
  const name = form.name?.value?.trim();

  if (estimate) {
    estimate.textContent = name ? `${name} saved as demo lead` : 'Demo lead saved';
  }

  button.textContent = 'Demo lead saved to CRM preview';
  button.disabled = true;
  form.classList.add('saved');

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    form.classList.remove('saved');
    if (estimate) estimate.textContent = 'New quote request';
  }, 2400);
});
