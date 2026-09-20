/* Fixed data for Roastoria Specialty Coffee */
const SITE = {
  name: "Roastoria",
  nameEn: "Roastoria",
  tagline: "Freshly roasted specialty coffee, delivered in 24 hours",
  phone: "+20254878787",
  email: "hello@roastoria-coffee.com",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
};

const SKIN_TYPES = [
  { id: "all", label: "All Origins" },
  { id: "filter", label: "Drip & V60" },
  { id: "espresso", label: "Espresso & Milk" },
  { id: "sets", label: "Tasting Sets" },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Colombia Huila — Washed Single Origin",
    short: "Bright & crisp with notes of red apple, caramel sweetness, and honey finish.",
    description: "Hand-picked from the high altitudes of Huila, Colombia. Carefully washed and roasted medium-light to highlight vibrant red fruit acidity balanced with smooth cane sugar sweetness. Perfect for V60, Chemex, and pour-overs.",
    price: 260,
    volume: "250g Whole Bean / Ground",
    skin: ["filter", "all"],
    featured: true,
    rating: 4.9,
    reviewsCount: 84,
    image: "images/products/p1.jpg",
    benefits: ["Medium-light roast profile", "Clean, sweet cup profile", "Freshly roasted in small batches"],
    ingredients: ["100% Arabica Specialty Coffee", "Altitude: 1,750m", "Process: Fully Washed"],
    howToUse: "Recommended ratio: 1:16 (15g coffee to 240ml hot water at 92°C). Brew time: 2:45 mins.",
  },
  {
    id: "p2",
    name: "Brazil Cerrado — Natural Roast",
    short: "Rich body with comforting dark chocolate, roasted hazelnut, and toasted almond.",
    description: "Sourced from Minas Gerais, Brazil. Naturally processed to preserve maximum body and deep, rich chocolate notes with minimal acidity. Exceptional as an espresso shot or as a velvety base for lattes and flat whites.",
    price: 240,
    volume: "250g Whole Bean / Ground",
    skin: ["espresso", "all"],
    featured: true,
    rating: 4.8,
    reviewsCount: 92,
    image: "images/products/p2.jpg",
    benefits: ["Heavy body with rich crema", "Low acidity, milk-friendly", "Direct trade ethically sourced"],
    ingredients: ["100% Arabica Specialty Coffee", "Altitude: 1,150m", "Process: Natural Sun-Dried"],
    howToUse: "Espresso dose: 18g in, 36g out in 28–30 seconds at 9 bar pressure.",
  },
  {
    id: "p3",
    name: "Ethiopia Yirgacheffe — Floral & Bergamot",
    short: "Delicate floral fragrance with jasmine tea, citrus zest, and peach notes.",
    description: "The birthplace of coffee at its finest. Grown in high-altitude shade in Yirgacheffe, Ethiopia. Roasted light to celebrate fragrant jasmine aromatics, bergamot zest, and sweet stone fruit complexity.",
    price: 290,
    volume: "250g Whole Bean / Ground",
    skin: ["filter", "all"],
    featured: true,
    rating: 5.0,
    reviewsCount: 110,
    image: "images/products/p3.jpg",
    benefits: ["Exquisite floral cup profile", "Light roast for connoisseurs", "Single-origin micro-lot"],
    ingredients: ["100% Arabica Heirloom", "Altitude: 2,100m", "Process: Washed"],
    howToUse: "Best enjoyed black using pour-over (V60/Kalita) or Cold Brew.",
  },
  {
    id: "p4",
    name: "The Discovery Trio Box — Complete Taste Flight",
    short: "Explore Colombia, Brazil, and Ethiopia in one curated tasting experience.",
    description: "Can't decide which profile fits your mornings best? The Discovery Trio brings you 250g of each of our signature single-origin roasts in one elegant box. Experience the full spectrum of specialty coffee flavors.",
    price: 699,
    volume: "3 x 250g Full Set",
    skin: ["sets", "filter", "espresso", "all"],
    featured: true,
    rating: 5.0,
    reviewsCount: 145,
    image: "images/products/p4.jpg",
    benefits: ["Three 250g bags included", "Save 15% vs individual bags", "Ideal gift for coffee enthusiasts"],
    ingredients: ["1x Colombia Huila (250g)", "1x Brazil Cerrado (250g)", "1x Ethiopia Yirgacheffe (250g)"],
    howToUse: "Fresh roast date stamped on each bag. Best brewed within 4–6 weeks from roasting.",
  }
];

const ARTICLES = [
  {
    id: "a1",
    title: "How to Grind Coffee for V60, Espresso, and French Press",
    excerpt: "Grind size determines whether your coffee tastes sweet and balanced or bitter and sour. Here is how to nail it.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=75",
    date: "September 15, 2026",
    readTime: "4 min read",
    body: [
      "Specialty coffee is all about extraction. Grind too fine, and your cup extracts too fast and tastes bitter. Grind too coarse, and the water rushes through, leaving it hollow and sour.",
      "For V60 and pour-over methods, aim for a medium-fine grind resembling sea salt. Water should pass through in 2.5 to 3 minutes.",
      "For Espresso, your grind must be powdery and fine to create the 9 bars of pressure needed for rich crema. French press, on the other hand, demands coarse, chunky grounds to avoid sediment.",
      "At Roastoria, we can custom-grind your bag specifically for your favorite gear right before shipping."
    ]
  },
  {
    id: "a2",
    title: "Why Freshly Roasted Coffee Changes Everything",
    excerpt: "Supermarket coffee sits on shelves for months losing aroma. Here is why our 24-hour roast guarantee matters.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=75",
    date: "September 8, 2026",
    readTime: "5 min read",
    body: [
      "Coffee beans are fresh agricultural produce. Once roasted, beans degas and develop peak flavor between day 4 and day 30.",
      "Commercial mass-brand coffees often spend 6 to 12 months in shipping containers and warehouse shelves, losing delicate aromatics.",
      "Roastoria roasts in small artisan batches in Cairo and ships within 24 hours, ensuring you experience genuine notes of fruit, chocolate, and caramel."
    ]
  },
  {
    id: "a3",
    title: "Understanding Coffee Flavor Notes: It's Not Artificial Flavoring",
    excerpt: "When we say 'Jasmine and Peach', we didn't add syrup. Discover how altitude, soil, and processing create real flavor.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=75",
    date: "August 28, 2026",
    readTime: "4 min read",
    body: [
      "A common misconception about specialty coffee is that tasting notes come from added flavors. In reality, our coffee is 100% pure coffee beans.",
      "Just like wine, coffee takes its distinct notes from terroir: altitude, volcanic soil, rainfall, and fermentation processing.",
      "High altitude slows bean maturation, concentrating natural sugars and acids that unlock crisp floral and fruity profiles."
    ]
  }
];

const TESTIMONIALS = [
  {
    name: "Tarek S.",
    city: "New Cairo",
    text: "The Colombia Huila is easily the freshest roast I've ordered in Egypt. Ordered on Monday, delivered roasted on Tuesday.",
    rating: 5,
  },
  {
    name: "Mariam F.",
    city: "Zamalek",
    text: "The Discovery Trio Box made our weekend mornings so much better. You can genuinely taste the distinct profiles between the origins.",
    rating: 5,
  },
  {
    name: "Omar N.",
    city: "Maadi",
    text: "Brazil Cerrado with my home espresso machine pulls thick crema and tastes like melted dark chocolate. Excellent quality.",
    rating: 5,
  }
];