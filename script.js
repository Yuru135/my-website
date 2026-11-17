const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const cartButton = document.querySelector('.cart-button');
const cartCount = document.querySelector('.cart-count');
const toast = document.querySelector('.toast');
const modal = document.querySelector('.product-modal');
let itemCount = 0;
let toastTimer;

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '開啟導覽選單' : '關閉導覽選單');
  mainNav.classList.toggle('open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  mainNav.classList.remove('open');
}));

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-button.active')?.classList.remove('active');
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

function addToBag(name) {
  itemCount += 1;
  cartCount.textContent = `(${itemCount})`;
  cartButton.setAttribute('aria-label', `購物車，${itemCount} 件商品`);
  toast.textContent = `${name} 已加入購物袋`;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => addToBag(button.dataset.name));
});

const productDetails = {
  '01': { name: 'NIGHT SHIFT JACKET', price: 'NT$ 3,280', image: './images/01.jpg', alt: 'NIGHT SHIFT JACKET 黑色機能外套' },
  '02': { name: 'STATIC OVERSIZED TEE', price: 'NT$ 1,280', image: './images/02.jpg', alt: 'STATIC OVERSIZED TEE 寬版短袖上衣' },
  '03': { name: 'AFTER HOURS VEST', price: 'NT$ 2,480', image: './images/03.jpg', alt: 'AFTER HOURS VEST 多口袋背心' },
  '04': { name: 'NO SIGNAL CAP', price: 'NT$ 980', image: './images/04.jpg', alt: 'NO SIGNAL CAP 黑色刺繡帽' }
};

document.querySelectorAll('.product-image').forEach((button) => {
  button.addEventListener('click', () => {
    const product = productDetails[button.dataset.product];
    modal.querySelector('img').src = product.image;
    modal.querySelector('img').alt = product.alt;
    modal.querySelector('h2').textContent = product.name;
    modal.querySelector('.modal-price').textContent = product.price;
    modal.querySelector('.modal-add').onclick = () => {
      addToBag(product.name);
      modal.close();
    };
    modal.showModal();
  });
});

document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

document.querySelectorAll('img').forEach((image) => {
  image.addEventListener('error', () => { image.hidden = true; });
});

