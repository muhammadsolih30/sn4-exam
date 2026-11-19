const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

document.querySelector('.announcement-close').addEventListener('click', () => {
  document.querySelector('.announcement').remove();
});

const cartCount = document.querySelector('.cart-count');
const toast = document.querySelector('.toast');
let cart = 0;
let toastTimer;
document.querySelectorAll('.add-cart').forEach(button => {
  button.addEventListener('click', () => {
    cartCount.textContent = ++cart;
    toast.textContent = `${button.dataset.book} savatga qo‘shildi ✨`;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2300);
  });
});

document.querySelectorAll('.wishlist').forEach(button => {
  button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '♥' : '♡';
    button.style.color = saved ? '#b65f48' : '';
    button.setAttribute('aria-label', saved ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo‘shish');
  });
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.product-card').forEach(card => {
      card.hidden = tab.dataset.filter !== 'all' && card.dataset.type !== tab.dataset.filter;
    });
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('shown');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

document.querySelector('.newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.form-success').classList.add('visible');
  event.currentTarget.reset();
});

document.querySelector('.search-toggle').addEventListener('click', () => {
  const query = window.prompt('Qaysi kitobni izlayapsiz?');
  if (!query) return;
  document.querySelector('#books').scrollIntoView({ behavior: 'smooth' });
  const normalized = query.toLocaleLowerCase('uz');
  document.querySelectorAll('.product-card').forEach(card => {
    card.hidden = !card.textContent.toLocaleLowerCase('uz').includes(normalized);
  });
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
});

document.querySelector('.cart-button').addEventListener('click', () => {
  if (cart === 0) {
    toast.textContent = 'Savatingiz hozircha bo‘sh';
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2300);
  } else {
    toast.textContent = `Savatingizda ${cart} ta kitob bor`;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2300);
  }
});
