// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--fg)';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => observer.observe(s));

// Fade-in on scroll
const fadeTargets = document.querySelectorAll(
  '.project-card, .skill-group, .about-grid, .contact-container'
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeTargets.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Trigger any elements already in view on load
  fadeTargets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});

// Add CSS for the visible state via JS so it's paired with the animation setup
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
