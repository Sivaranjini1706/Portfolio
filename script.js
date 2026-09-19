// ===== 1. Mobile menu =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the menu after choosing a link
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== 2. Skill bars fill when they scroll into view =====
const skills = document.querySelectorAll('.skill');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.4 });

  skills.forEach((skill) => observer.observe(skill));
} else {
  // Older browsers: just show the bars
  skills.forEach((skill) => skill.classList.add('in-view'));
}

// ===== 3. Contact form =====
// A plain HTML site has no server, so this opens the visitor's email app
// with the message already filled in.
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const MY_EMAIL = 'sivaranjinipr1706@gmail.com'; // <-- change this to your email

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in your name, email and message.';
    return;
  }
  if (!emailInput.checkValidity()) {
    formStatus.textContent = 'Please enter a valid email address.';
    return;
  }

  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');

  formStatus.textContent = 'Opening your email app...';
  window.location.href = 'mailto:' + MY_EMAIL + '?subject=' + subject + '&body=' + body;
});

// ===== 4. Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
