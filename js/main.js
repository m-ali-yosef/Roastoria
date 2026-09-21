/* Roastoria — Standalone Main Script (With Hero Carousel Slider) */
(function () {
  "use strict";

  // 1. Data Store
  const PRODUCTS = [
    {
      id: 1,
      name: "Colombia Huila — Washed Single Origin",
      category: "drip",
      price: 320,
      tag: "Drip & V60 · All Origins",
      shortDesc: "Bright & crisp with notes of red apple, caramel sweetness, and honey finish.",
      image: "images/products/p1.jpg"
    },
    {
      id: 2,
      name: "Brazil Cerrado — Natural Roast",
      category: "espresso",
      price: 290,
      tag: "Espresso & Milk · All Origins",
      shortDesc: "Rich body with comforting dark chocolate, roasted hazelnut, and buttery crema.",
      image: "images/products/p2.jpg"
    },
    {
      id: 3,
      name: "Ethiopia Yirgacheffe — Floral & Bergamot",
      category: "drip",
      price: 350,
      tag: "Drip & V60 · All Origins",
      shortDesc: "Delicate floral fragrance with jasmine tea, citrus zest, and peach notes.",
      image: "images/products/p3.jpg"
    },
    {
      id: 4,
      name: "The Discovery Trio Box — Complete Taste Flight",
      category: "bundles",
      price: 890,
      tag: "Tasting Sets · Drip & V60 · Espresso & Milk",
      shortDesc: "Explore Colombia, Brazil, and Ethiopia in one curated tasting experience.",
      image: "images/products/p4.jpg"
    }
  ];

  const ARTICLES = [
    {
      id: 1,
      title: "How to Grind Coffee for V60, Espresso, and French Press",
      readTime: "September 15, 2026 · 4 min read",
      excerpt: "Grind size determines whether your coffee tastes sweet and balanced or bitter and sour. Here is how to nail it.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=75"
    },
    {
      id: 2,
      title: "Why Freshly Roasted Coffee Changes Everything",
      readTime: "September 8, 2026 · 5 min read",
      excerpt: "Supermarket coffee sits on shelves for months losing aroma. Here is why our 24-hour roast guarantee matters.",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=75"
    },
    {
      id: 3,
      title: "Understanding Coffee Flavor Notes: It's Not Artificial Flavoring",
      readTime: "August 28, 2026 · 4 min read",
      excerpt: "When we say 'Jasmine and Peach', we didn't add syrup. Discover how altitude, soil, and processing create real flavor.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=75"
    }
  ];

  const REVIEWS = [
    {
      id: 1,
      author: "Omar K.",
      location: "Zamalek, Cairo",
      text: "The Colombia Huila blew me away on my morning V60. Clean, bright, and genuinely freshly roasted."
    },
    {
      id: 2,
      author: "Nouran E.",
      location: "New Cairo",
      text: "Roastoria's Brazil Cerrado makes the thickest espresso crema with silky milk notes. Super fast delivery!"
    },
    {
      id: 3,
      author: "Tarek H.",
      location: "Maadi, Cairo",
      text: "Packaging is airtight and beautiful. The tasting notes are actually accurate and not just marketing words."
    }
  ];

  // 2. Safe Cart Manager
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

  function addToCart(productId, qty) {
    qty = qty || 1;
    const pId = parseInt(productId, 10);
    const product = PRODUCTS.find(p => p.id === pId);
    if (!product) return;

    let cart = getCart();
    const item = cart.find(i => i.id === pId);
    if (item) {
      item.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty
      });
    }

    saveCart(cart);
    showToast(`Added "${product.name}" to cart!`);
    openCartDrawer();
  }

  function updateItemQty(productId, delta) {
    const pId = parseInt(productId, 10);
    let cart = getCart();
    const item = cart.find(i => i.id === pId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== pId);
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

  // 3. Cart Drawer & UI Controls
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
      updateItemQty(parseInt(btn.dataset.id, 10), parseInt(btn.dataset.delta, 10));
    });
  }

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Thank you for choosing Roastoria! Your order has been placed.");
      saveCart([]);
      closeCartDrawer();
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

  // Mobile Navigation
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

  // 4. Hero Slider Controller
  function initHeroSlider() {
    const slider = document.getElementById("heroSlider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".hero__slide");
    const dots = slider.querySelectorAll(".slider-dot");
    const prevBtn = document.getElementById("slidePrev");
    const nextBtn = document.getElementById("slideNext");

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let timer = null;

    function goToSlide(index) {
      slides[currentIndex].classList.remove("is-active");
      if (dots[currentIndex]) dots[currentIndex].classList.remove("is-active");

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.add("is-active");
      if (dots[currentIndex]) dots[currentIndex].classList.add("is-active");
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      timer = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      if (timer) clearInterval(timer);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoPlay();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const slideIndex = parseInt(dot.dataset.slide, 10);
        goToSlide(slideIndex);
        startAutoPlay();
      });
    });

    slider.addEventListener("mouseenter", stopAutoPlay);
    slider.addEventListener("mouseleave", startAutoPlay);

    startAutoPlay();
  }

  // 5. Global Cart Delegations
  document.addEventListener("click", e => {
    const btn = e.target.closest(".js-add-cart");
    if (btn) {
      e.preventDefault();
      addToCart(btn.dataset.id, 1);
    }
  });

  // Filter Buttons
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;

    document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filter = btn.dataset.filter;
    const cards = document.querySelectorAll("#allProductsGrid .product-card");
    let visibleCount = 0;

    cards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === "all" || cat === filter) {
        card.classList.remove("is-hidden");
        visibleCount++;
      } else {
        card.classList.add("is-hidden");
      }
    });

    const empty = document.getElementById("productsEmpty");
    if (empty) {
      if (visibleCount === 0) empty.classList.add("is-visible");
      else empty.classList.remove("is-visible");
    }
  });

  // Init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initHeroSlider();
      updateCartUI();
    });
  } else {
    initHeroSlider();
    updateCartUI();
  }
})();