// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: "Cashmere Cable Knit Sweater",
    brand: "LUXE Essentials",
    price: 285,
    oldPrice: null,
    image: "assets/sweater.png",
    category: "tops",
    badge: "new",
    description: "Luxuriously soft Italian cashmere knit sweater with intricate cable patterns. Perfect layering piece for the transitional season."
  },
  {
    id: 2,
    name: "Italian Leather Biker Jacket",
    brand: "LUXE Noir",
    price: 895,
    oldPrice: null,
    image: "assets/jacket.png",
    category: "outerwear",
    badge: "new",
    description: "Hand-finished Italian leather jacket with asymmetric zip closure. A timeless icon of rebellious elegance."
  },
  {
    id: 3,
    name: "Tailored Navy Trousers",
    brand: "LUXE Atelier",
    price: 245,
    oldPrice: 320,
    image: "assets/trousers.png",
    category: "bottoms",
    badge: "sale",
    description: "Impeccably tailored trousers in premium Italian wool. Slim fit with pressed crease and subtle stretch for comfort."
  },
  {
    id: 4,
    name: "Silk Burgundy Maxi Dress",
    brand: "LUXE Couture",
    price: 650,
    oldPrice: null,
    image: "assets/dress.png",
    category: "dresses",
    badge: "new",
    description: "Flowing silk maxi dress in deep burgundy. Delicate spaghetti straps with tiered skirt for graceful movement."
  },
  {
    id: 5,
    name: "Oxford Cotton Dress Shirt",
    brand: "LUXE Essentials",
    price: 165,
    oldPrice: null,
    image: "assets/shirt.png",
    category: "tops",
    badge: null,
    description: "Classic button-down Oxford shirt in premium cotton. Clean lines and impeccable fit for every occasion."
  },
  {
    id: 6,
    name: "Wool Overcoat — Charcoal",
    brand: "LUXE Noir",
    price: 1150,
    oldPrice: 1400,
    image: "assets/jacket.png",
    category: "outerwear",
    badge: "sale",
    description: "Double-breasted overcoat in heavyweight Italian wool. Expertly structured shoulders with a relaxed, contemporary silhouette."
  },
  {
    id: 7,
    name: "Cashmere Blend Turtleneck",
    brand: "LUXE Essentials",
    price: 225,
    oldPrice: null,
    image: "assets/sweater.png",
    category: "tops",
    badge: null,
    description: "Ultra-soft cashmere blend turtleneck in a versatile cream tone. A wardrobe essential for modern minimalists."
  },
  {
    id: 8,
    name: "Draped Silk Evening Gown",
    brand: "LUXE Couture",
    price: 980,
    oldPrice: null,
    image: "assets/dress.png",
    category: "dresses",
    badge: "new",
    description: "Show-stopping evening gown in lustrous silk charmeuse. Elegantly draped bodice with a dramatic floor-length skirt."
  }
];

// ===== STATE =====
let cart = [];
let activeFilter = 'all';
let currentModalProduct = null;

// ===== DOM ELEMENTS =====
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartFooter = document.getElementById('cart-footer');
const cartCount = document.getElementById('cart-count');
const cartSubtotalAmount = document.getElementById('cart-subtotal-amount');
const cartTotalAmount = document.getElementById('cart-total-amount');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toast-text');
const nav = document.getElementById('main-nav');
const backToTop = document.getElementById('back-to-top');
const pageLoader = document.getElementById('page-loader');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    pageLoader.classList.add('hidden');
  }, 2000);
});

// ===== RENDER PRODUCTS =====
function renderProducts(filter = 'all') {
  const filtered = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  productsGrid.innerHTML = filtered.map((product, index) => `
    <div class="product-card reveal reveal-delay-${(index % 4) + 1}" data-id="${product.id}" data-category="${product.category}">
      <div class="product-image">
        ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-quick-actions">
          <button class="quick-action-btn" onclick="openQuickView(${product.id})" aria-label="Quick view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          <button class="quick-action-btn" onclick="addToCart(${product.id})" aria-label="Add to bag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
          <button class="quick-action-btn" onclick="showToast('Added to wishlist')" aria-label="Add to wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-brand">${product.brand}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-row">
          <span class="product-price">$${product.price.toLocaleString()}</span>
          ${product.oldPrice ? `<span class="product-price-old">$${product.oldPrice.toLocaleString()}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe for scroll animations
  observeElements();
}

// ===== FILTER PRODUCTS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts(activeFilter);
  });
});

// ===== CART FUNCTIONS =====
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  showToast(`${product.name} added to bag`);
  closeModal();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Update cart count badge
  cartCount.textContent = totalItems;
  if (totalItems > 0) {
    cartCount.classList.add('visible');
  } else {
    cartCount.classList.remove('visible');
  }

  // Update cart items
  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartFooter.style.display = 'none';
    cartItems.innerHTML = '';
    cartItems.appendChild(cartEmpty);
  } else {
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div>
            <div class="cart-item-brand">${item.brand}</div>
            <div class="cart-item-name">${item.name}</div>
          </div>
          <div class="cart-item-bottom">
            <span class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</span>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button class="qty-btn" onclick="updateQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Update totals
  cartSubtotalAmount.textContent = `$${subtotal.toLocaleString()}`;
  cartTotalAmount.textContent = `$${subtotal.toLocaleString()}`;
}

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ===== QUICK VIEW MODAL =====
function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentModalProduct = product;

  document.getElementById('modal-image').src = product.image;
  document.getElementById('modal-image').alt = product.name;
  document.getElementById('modal-brand').textContent = product.brand;
  document.getElementById('modal-name').textContent = product.name;
  document.getElementById('modal-price').textContent = `$${product.price.toLocaleString()}`;
  document.getElementById('modal-desc').textContent = product.description;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  if (!cartDrawer.classList.contains('open')) {
    document.body.style.overflow = '';
  }
  currentModalProduct = null;
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.getElementById('modal-add-to-cart').addEventListener('click', () => {
  if (currentModalProduct) {
    addToCart(currentModalProduct.id);
  }
});

document.getElementById('modal-wishlist').addEventListener('click', () => {
  showToast('Added to wishlist');
});

// Size buttons
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

// ===== TOAST =====
let toastTimeout;
function showToast(message) {
  clearTimeout(toastTimeout);
  toastText.textContent = message;
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000);
}

// ===== NAVIGATION SCROLL =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Nav background
  if (scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Back to top
  if (scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MOBILE MENU =====
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

function closeMobileNav() {
  mobileMenuBtn.classList.remove('active');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== NEWSLETTER =====
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('newsletter-success');
  
  form.style.display = 'none';
  success.classList.add('visible');
  showToast('Welcome to the LUXE family!');
});

// ===== SCROLL REVEAL ANIMATIONS =====
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('visible')) {
      observer.observe(el);
    }
  });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCart();
    closeMobileNav();
  }
});

// ===== CHECKOUT BUTTON =====
document.getElementById('checkout-btn').addEventListener('click', () => {
  showToast('Checkout coming soon!');
});

// ===== INITIALIZE =====
renderProducts();
observeElements();
