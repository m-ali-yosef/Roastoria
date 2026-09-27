/* Roastoria — Central Data Store with Dynamic Articles & Products */
const SITE = {
  name: "Roastoria",
  nameEn: "Roastoria",
  tagline: "Freshly roasted specialty coffee, delivered in 24 hours",
  phone: "+20254878787",
  email: "hello@roastoria-coffee.com",
};

const DEFAULT_PRODUCTS = [
  { id: 1, nameEn: "Colombia Huila — Washed Single Origin", category: "filter", price: 320, tag: "Drip & V60", shortEn: "Bright & crisp with notes of red apple, caramel sweetness, and honey finish.", image: "images/products/p1.jpg" },
  { id: 2, nameEn: "Brazil Cerrado — Natural Roast", category: "espresso", price: 290, tag: "Espresso & Milk", shortEn: "Rich body with comforting dark chocolate, roasted hazelnut, and buttery crema.", image: "images/products/p2.jpg" },
  { id: 3, nameEn: "Ethiopia Yirgacheffe — Floral & Bergamot", category: "filter", price: 350, tag: "Drip & V60", shortEn: "Delicate floral fragrance with jasmine tea, citrus zest, and peach notes.", image: "images/products/p3.jpg" },
  { id: 4, name: "The Discovery Trio Box — Complete Taste Flight", category: "sets", price: 890, tag: "Tasting Sets", shortEn: "Explore Colombia, Brazil, and Ethiopia in one curated tasting experience.", image: "images/products/p4.jpg" }
];

const DEFAULT_ARTICLES = [
  { id: 1, titleEn: "How to Grind Coffee for V60, Espresso, and French Press", readTime: "4 min read", excerptEn: "Grind size determines whether your coffee tastes sweet and balanced or bitter and sour.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=75" },
  { id: 2, titleEn: "Why Freshly Roasted Coffee Changes Everything", readTime: "5 min read", excerptEn: "Supermarket coffee sits on shelves for months losing aroma. Here is why freshness matters.", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=75" },
  { id: 3, titleEn: "Understanding Coffee Flavor Notes: It's Not Artificial", readTime: "4 min read", excerptEn: "When we say 'Jasmine and Peach', discover how altitude and processing create real flavor.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=75" }
];

function getProducts() {
  try {
    const saved = localStorage.getItem("roastoria_products_v3");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  localStorage.setItem("roastoria_products_v3", JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem("roastoria_products_v3", JSON.stringify(products));
}

// دالة جلب المقالات الموحدة والمربوطة بلوحة التحكم
function getArticles() {
  try {
    const saved = localStorage.getItem("roastoria_articles_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  localStorage.setItem("roastoria_articles_v1", JSON.stringify(DEFAULT_ARTICLES));
  return DEFAULT_ARTICLES;
}

function saveArticles(articles) {
  localStorage.setItem("roastoria_articles_v1", JSON.stringify(articles));
}

function getOrders() {
  try {
    const saved = localStorage.getItem("roastoria_orders_v1");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {}
  return [];
}

function saveOrders(orders) {
  localStorage.setItem("roastoria_orders_v1", JSON.stringify(orders));
}