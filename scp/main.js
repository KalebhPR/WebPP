function toggleMenu() {
  const nav = document.getElementById('nav');

  if (nav) {
    nav.classList.toggle('active');
  }
}

function closeMenu() {
  const nav = document.getElementById('nav');

  if (nav) {
    nav.classList.remove('active');
  }
}
 
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});