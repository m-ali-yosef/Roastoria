/* Roastoria — Main Application Scripts */
(function () {
  "use strict";

  // ==========================================
  // 1. Data Source
  // ==========================================
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

  // ==========================================
  // 2. Safe Cart Storage
  // ==========================================
  const CART_KEY = "roastoria_cart_v1";
  let fallbackCart = [];

  function getCart() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
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
    const product = PRODUCTS.find(function (p) { return p.id === pId; });
    if (!product) return;

    let cart = getCart();
    const item = cart.find(function (i) { return i.id === pId; });
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
    showToast('Added "' + product.name + '" to cart!');
    openCartDrawer();
  }

  function updateItemQty(productId, delta) {
    const pId = parseInt(productId, 10);
    let cart = getCart();
    const item = cart.find(function (i) { return i.id === pId; });
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(function (i) { return i.id !== pId; });
    }
    saveCart(cart);
  }

  function updateCartUI() {
    const cart = getCart();
    const count = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    const total = cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);

    // Badges
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? "grid" : "none";
    });

    // Drawer Elements
    const listEl = document.getElementById("cartList");
    const footEl = document.getElementById("cartFoot");
    const totalEl = document.getElementById("cartTotal");

    if (totalEl) totalEl.textContent = total + " EGP";

    if (listEl) {
      if (cart.length === 0) {
        listEl.innerHTML = '<div class="cart-empty"><p>Your coffee box is empty.</p></div>';
        if (footEl) footEl.style.display = "none";
      } else {
        if (footEl) footEl.style.display = "grid";
        listEl.innerHTML = cart
          .map(function (item) {
            return (
              '<div class="cart-item">' +
                '<img src="' + item.image + '" alt="' + item.name + '">' +
                '<div>' +
                  '<h4>' + item.name + '</h4>' +
                  '<div class="muted">' + item.price + ' EGP</div>' +
                  '<div class="qty">' +
                    '<button type="button" class="btn-qty" data-id="' + item.id + '" data-delta="-1">−</button>' +
                    '<span>' + item.qty + '</span>' +
                    '<button type="button" class="btn-qty" data-id="' + item.id + '" data-delta="1">+</button>' +
                  '</div>' +
                '</div>' +
                '<div class="price">' + (item.price * item.qty) + ' <small>EGP</small></div>' +
              '</div>'
            );
          })
          .join("");
      }
    }
  }

  // ==========================================
  // 3. UI Interactions & Modals
  // ==========================================
  const drawer = document.getElementById("cartDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  function openCartDrawer() {
    if (drawer && drawerOverlay) {
      drawer.classList.add("is-open");
      drawerOverlay.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
    }
  }

  function closeCartDrawer() {
    if (drawer && drawerOverlay) {
      drawer.classList.remove("is-open");
      drawerOverlay.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
    }
  }

  document.querySelectorAll("[data-cart-toggle]").forEach(function (btn) {
    btn.addEventListener("click", openCartDrawer);
  });

  const closeDrawerBtn = document.getElementById("closeCart");
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeCartDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeCartDrawer);

  const cartList = document.getElementById("cartList");
  if (cartList) {
    cartList.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-qty");
      if (!btn) return;
      const id = parseInt(btn.dataset.id, 10);
      const delta = parseInt(btn.dataset.delta, 10);
      updateItemQty(id, delta);
    });
  }

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
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
    setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  // Navigation
  const menuBtn = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const navOverlay = document.getElementById("navOverlay");

  if (menuBtn && mobileNav && navOverlay) {
    menuBtn.addEventListener("click", function () {
      mobileNav.classList.add("is-open");
      navOverlay.classList.add("is-open");
    });

    navOverlay.addEventListener("click", function () {
      mobileNav.classList.remove("is-open");
      navOverlay.classList.remove("is-open");
    });
  }

  // ==========================================
  // 4. Card Builder (Links are 100% verified: product.html?id=X)
  // ==========================================
  function createProductCardHTML(p) {
    return (
      '<article class="product-card" data-category="' + p.category + '">' +
        '<a href="product.html?id=' + p.id + '" class="product-card__media">' +
          '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
        '</a>' +
        '<div class="product-card__body">' +
          '<span class="badge">' + p.tag + '</span>' +
          '<h3><a href="product.html?id=' + p.id + '">' + p.name + '</a></h3>' +
          '<p>' + p.shortDesc + '</p>' +
          '<div class="product-card__price">' +
            '<span class="price">' + p.price + ' <small>EGP</small></span>' +
          '</div>' +
          '<div class="card-actions card-actions--dual">' +
            '<button type="button" class="btn btn--primary btn--sm js-add-cart" data-id="' + p.id + '">Add to Cart</button>' +
            '<a href="product.html?id=' + p.id + '" class="btn btn--ghost btn--sm">View Roast</a>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  // ==========================================
  // 5. Render Execution
  // ==========================================
  function renderAll() {
    // 1. Featured on Index (Render only if container exists)
    const featuredGrid = document.getElementById("featuredGrid");
    if (featuredGrid) {
      featuredGrid.innerHTML = PRODUCTS.slice(0, 4).map(createProductCardHTML).join("");
    }

    // 2. All Products on products.html
    const allProductsGrid = document.getElementById("allProductsGrid");
    if (allProductsGrid) {
      allProductsGrid.innerHTML = PRODUCTS.map(createProductCardHTML).join("");
    }

    // 3. Articles Grid
    const articlesGrid = document.getElementById("articlesGrid");
    if (articlesGrid) {
      articlesGrid.innerHTML = ARTICLES.map(function (a) {
        return (
          '<article class="article-card">' +
            '<a href="article.html?id=' + a.id + '" class="article-card__media">' +
              '<img src="' + a.image + '" alt="' + a.title + '" loading="lazy">' +
            '</a>' +
            '<div class="article-card__body">' +
              '<span class="badge">' + a.readTime + '</span>' +
              '<h3><a href="article.html?id=' + a.id + '">' + a.title + '</a></h3>' +
              '<p>' + a.excerpt + '</p>' +
              '<div class="card-actions">' +
                '<a href="article.html?id=' + a.id + '" class="btn btn--ghost btn--sm">Read Guide</a>' +
              '</div>' +
            '</div>' +
          '</article>'
        );
      }).join("");
    }

    // 4. Reviews Grid
    const reviewsGrid = document.getElementById("reviewsGrid");
    if (reviewsGrid) {
      reviewsGrid.innerHTML = REVIEWS.map(function (r) {
        return (
          '<article class="review-card">' +
            '<div class="stars">★★★★★</div>' +
            '<p>"' + r.text + '"</p>' +
            '<footer>' +
              '<div class="avatar">' + r.author.charAt(0) + '</div>' +
              '<div>' +
                '<strong>' + r.author + '</strong>' +
                '<span class="muted">' + r.location + '</span>' +
              '</div>' +
            '</footer>' +
          '</article>'
        );
      }).join("");
    }

    updateCartUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll);
  } else {
    renderAll();
  }

  // Global Add to Cart Listener
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".js-add-cart");
    if (btn) {
      e.preventDefault();
      addToCart(btn.dataset.id, 1);
    }
  });

  // Filter Buttons
  const filterBtns = document.querySelectorAll("[data-filter]");
  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");

        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll("#allProductsGrid .product-card");
        let visibleCount = 0;

        cards.forEach(function (card) {
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
    });
  }

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const successEl = document.getElementById("contactSuccess");
      if (successEl) successEl.classList.add("is-visible");
      contactForm.reset();
    });
  }
})();