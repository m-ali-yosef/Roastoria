/* Roastoria — Complete Main Script with Dynamic Products, Articles & Checkout */
(function () {
  "use strict";

  const CART_KEY = "roastoria_cart_v1";
  let fallbackCart = [];

  function getCart() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const val = localStorage.getItem(CART_KEY);
        return val ? JSON.parse(val) : [];
      }
    } catch (e) {}
    return fallbackCart;
  }

  function saveCart(cart) {
    fallbackCart = cart;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
      }
    } catch (e) {}
    updateCartUI();
  }

  // جلب المنتجات (الأصلية + المضافة من الأدمن)
  function getAllProducts() {
    const defaultStaticProducts = [
      { id: 1, name: "Colombia Huila — Washed Single Origin", category: "drip", price: 320, tag: "Drip & V60 · All Origins", short: "Bright & crisp with notes of red apple, caramel sweetness, and honey finish.", image: "images/products/p1.jpg" },
      { id: 2, name: "Brazil Cerrado — Natural Roast", category: "espresso", price: 290, tag: "Espresso & Milk · All Origins", short: "Rich body with comforting dark chocolate, roasted hazelnut, and buttery crema.", image: "images/products/p2.jpg" },
      { id: 3, name: "Ethiopia Yirgacheffe — Floral & Bergamot", category: "drip", price: 350, tag: "Drip & V60 · All Origins", short: "Delicate floral fragrance with jasmine tea, citrus zest, and peach notes.", image: "images/products/p3.jpg" },
      { id: 4, name: "The Discovery Trio Box — Complete Taste Flight", category: "bundles", price: 890, tag: "Tasting Sets · Drip & V60", short: "Explore Colombia, Brazil, and Ethiopia in one curated tasting experience.", image: "images/products/p4.jpg" }
    ];

    try {
      const saved = localStorage.getItem("roastoria_products_v3") || localStorage.getItem("roastoria_products_v1");
      if (saved) {
        const customProducts = JSON.parse(saved);
        if (customProducts && customProducts.length > 0) {
          return customProducts.map(p => ({
            id: p.id,
            name: p.nameEn || p.name || "Specialty Item",
            price: p.price || 320,
            category: p.category || "drip",
            tag: p.tag || "Specialty Roast",
            short: p.shortEn || p.short || p.description || "",
            image: p.image || "images/products/p1.jpg"
          }));
        }
      }
    } catch (e) {}
    return defaultStaticProducts;
  }

  // جلب المقالات (الأصلية + المضافة من الأدمن)
  function getAllArticles() {
    const defaultArticles = [
      { id: 1, titleEn: "How to Grind Coffee for V60, Espresso, and French Press", readTime: "4 min read", excerptEn: "Grind size determines whether your coffee tastes sweet and balanced or bitter and sour.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=75" },
      { id: 2, titleEn: "Why Freshly Roasted Coffee Changes Everything", readTime: "5 min read", excerptEn: "Supermarket coffee sits on shelves for months losing aroma. Here is why freshness matters.", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=75" },
      { id: 3, titleEn: "Understanding Coffee Flavor Notes: It's Not Artificial", readTime: "4 min read", excerptEn: "When we say 'Jasmine and Peach', discover how altitude and processing create real flavor.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=75" }
    ];

    try {
      const saved = localStorage.getItem("roastoria_articles_v2") || localStorage.getItem("roastoria_articles_v1");
      if (saved) {
        const customArticles = JSON.parse(saved);
        if (customArticles && customArticles.length > 0) {
          return customArticles.map(a => ({
            id: a.id,
            titleEn: a.titleEn || a.title || "Brew Guide",
            readTime: a.readTime || "4 min read",
            excerptEn: a.excerptEn || a.excerpt || "",
            image: a.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=75"
          }));
        }
      }
    } catch (e) {}
    return defaultArticles;
  }

  function addToCart(productId, qty) {
    qty = qty || 1;
    const products = getAllProducts();
    const product = products.find(p => p.id == productId);
    
    let cart = getCart();
    const item = cart.find(i => i.id == productId);
    if (item) {
      item.qty += qty;
    } else {
      cart.push({
        id: productId,
        name: product ? product.name : "Specialty Coffee Item",
        price: product ? product.price : 320,
        image: product ? product.image : "images/products/p1.jpg",
        qty: qty
      });
    }

    saveCart(cart);
    showToast("Added item to cart!");
    openCartDrawer();
  }

  function updateItemQty(productId, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id == productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id != productId);
    }
    saveCart(cart);
  }

  function updateCartUI() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    document.querySelectorAll(".cart-count").forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? "grid" : "none";
    });

    const listEl = document.getElementById("cartList");
    const footEl = document.getElementById("cartFoot");
    const totalEl = document.getElementById("cartTotal");

    if (totalEl) totalEl.textContent = `${total} EGP`;

    if (listEl) {
      if (cart.length === 0) {
        listEl.innerHTML = '<div class="cart-empty"><p>Your coffee box is empty.</p></div>';
        if (footEl) footEl.style.display = "none";
      } else {
        if (footEl) footEl.style.display = "grid";
        listEl.innerHTML = cart
          .map(item => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}">
              <div>
                <h4>${item.name}</h4>
                <div class="muted">${item.price} EGP</div>
                <div class="qty">
                  <button type="button" class="btn-qty" data-id="${item.id}" data-delta="-1">−</button>
                  <span>${item.qty}</span>
                  <button type="button" class="btn-qty" data-id="${item.id}" data-delta="1">+</button>
                </div>
              </div>
              <div class="price">${item.price * item.qty} <small>EGP</small></div>
            </div>
          `).join("");
      }
    }
  }

  const drawer = document.getElementById("cartDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  function openCartDrawer() {
    if (drawer && drawerOverlay) {
      drawer.classList.add("is-open");
      drawerOverlay.classList.add("is-open");
    }
  }

  function closeCartDrawer() {
    if (drawer && drawerOverlay) {
      drawer.classList.remove("is-open");
      drawerOverlay.classList.remove("is-open");
    }
  }

  document.querySelectorAll("[data-cart-toggle]").forEach(btn => {
    btn.addEventListener("click", openCartDrawer);
  });

  const closeDrawerBtn = document.getElementById("closeCart");
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeCartDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeCartDrawer);

  const cartList = document.getElementById("cartList");
  if (cartList) {
    cartList.addEventListener("click", e => {
      const btn = e.target.closest(".btn-qty");
      if (!btn) return;
      updateItemQty(btn.dataset.id, parseInt(btn.dataset.delta, 10));
    });
  }

  // عرض المنتجات ديناميكياً
  function renderDynamicProducts() {
    const grids = document.querySelectorAll("#featuredGrid, #allProductsGrid, .products-grid");
    if (grids.length === 0) return;

    const products = getAllProducts();
    const htmlContent = products.map(p => `
      <article class="product-card" data-category="${p.category}">
        <a href="product.html?id=${p.id}" class="product-card__media">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </a>
        <div class="product-card__body">
          <span class="badge">${p.tag}</span>
          <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <p>${p.short}</p>
          <div class="product-card__price">
            <span class="price">${p.price} <small>EGP</small></span>
          </div>
          <div class="card-actions card-actions--dual">
            <button type="button" class="btn btn--primary btn--sm js-add-cart" data-id="${p.id}">Add to Cart</button>
            <a href="product.html?id=${p.id}" class="btn btn--ghost btn--sm">View Roast</a>
          </div>
        </div>
      </article>
    `).join("");

    grids.forEach(grid => { grid.innerHTML = htmlContent; });
  }

  // عرض المقالات والدولات ديناميكياً في صفحة Brew Guides
  function renderDynamicArticles() {
    const grids = document.querySelectorAll("#articlesGrid, [data-blog]");
    if (grids.length === 0) return;

    const articles = getAllArticles();
    const htmlContent = articles.map(a => `
      <article class="article-card">
        <a href="article.html?id=${a.id}" class="article-card__media">
          <img src="${a.image}" alt="${a.titleEn}" loading="lazy">
        </a>
        <div class="article-card__body">
          <span class="badge">${a.readTime}</span>
          <h3><a href="article.html?id=${a.id}">${a.titleEn}</a></h3>
          <p>${a.excerptEn}</p>
          <div class="card-actions">
            <a href="article.html?id=${a.id}" class="btn btn--ghost btn--sm">Read Guide</a>
          </div>
        </div>
      </article>
    `).join("");

    grids.forEach(grid => { grid.innerHTML = htmlContent; });
  }

  // Checkout Handler
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = getCart();
      if (cart.length === 0) return;

      const name = prompt("Please enter your full name for delivery:", "Mohamed Ali");
      if (!name) return;
      const phone = prompt("Please enter your phone number / WhatsApp:", "+201000000000");
      if (!phone) return;
      const address = prompt("Please enter your delivery address:", "Cairo, Egypt");
      if (!address) return;

      const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
      const newOrder = {
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleString(),
        customer: { name, phone, address },
        items: cart,
        total: total,
        status: "Pending",
        adminMessage: "Thank you for your order! We are preparing your items."
      };

      let orders = [];
      try {
        const savedOrders = localStorage.getItem("roastoria_orders_v1");
        if (savedOrders) orders = JSON.parse(savedOrders);
      } catch (e) {}

      orders.unshift(newOrder);
      localStorage.setItem("roastoria_orders_v1", JSON.stringify(orders));

      saveCart([]);
      closeCartDrawer();
      alert(`Order placed successfully! Order ID: ${newOrder.id}\nYour request has been sent to the admin portal.`);
    });
  }

  function showToast(msg) {
    let toast = document.getElementById("siteToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "siteToast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 2500);
  }

  const menuBtn = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const navOverlay = document.getElementById("navOverlay");
  if (menuBtn && mobileNav && navOverlay) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.add("is-open");
      navOverlay.classList.add("is-open");
    });
    navOverlay.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      navOverlay.classList.remove("is-open");
    });
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest(".js-add-cart");
    if (btn) {
      e.preventDefault();
      addToCart(btn.dataset.id, 1);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      renderDynamicProducts();
      renderDynamicArticles();
      updateCartUI();
    });
  } else {
    renderDynamicProducts();
    renderDynamicArticles();
    updateCartUI();
  }
})();