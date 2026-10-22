const ASSETS_MEDIA = {
  heroBackground: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=80",
  aboutBackground: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920&q=80",
  ctaBackground: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80",
  logo: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80",

  gallery: [
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  ]
};

const SHOP_INFO = {
  name: "Kopi Seduh Jiwa",
  tagline: "Seduhan Otentik Biji Kopi Nusantara",
  description: "Menghadirkan kehangatan cita rasa kopi asli tanah air yang disangrai dengan presisi dan diseduh sepenuh hati oleh barista lokal.",
  address: "Jl. Rinjani No. 24, Kawasan Kreatif Kota",
  operatingHours: "Setiap Hari: 08.00 - 23.00 WIB",
  phone: "+62 812-3456-7890",
  whatsappNumber: "6281234567890", 
  qrisImage: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021226580016ID.CO.QRIS.WWW01189360091100000000005204581253033605802ID5914KopiSeduhJiwa6007Bandung6304ABCD"
};

const CATEGORIES = [
  { id: "all", name: "Semua Menu", icon: "bi-grid-fill" },
  { id: "signature", name: "Signature Coffee", icon: "bi-star-fill" },
  { id: "espresso-based", name: "Espresso Based", icon: "bi-cup-hot-fill" },
  { id: "manual-brew", name: "Manual Brew", icon: "bi-droplet-fill" },
  { id: "non-coffee", name: "Non Coffee & Tea", icon: "bi-cup-straw" },
  { id: "pastry", name: "Pastry & Snacks", icon: "bi-cake2-fill" }
];

const PRODUCTS = [
  {
    id: 1,
    name: "Kopi Susu Jiwa Nusantara",
    category: "signature",
    price: 24000,
    rating: 4.9,
    soldCount: "1.2k+",
    isBestseller: true,
    badge: "Terfavorit",
    description: "Espresso house blend robusta-arabika dipadu gula aren organik kelapa dan susu creamy khas nusantara.",
    tasteNotes: "Brown Sugar, Creamy, Dark Cocoa",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Caramel Macchiato Velvet",
    category: "espresso-based",
    price: 28000,
    rating: 4.8,
    soldCount: "850+",
    isBestseller: true,
    badge: "Best Seller",
    description: "Double shot espresso dengan sirup vanilla lembut, steamed fresh milk, dan drizzle karamel gurih tebal.",
    tasteNotes: "Sweet Caramel, Buttery, Vanilla Bean",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "V60 Single Origin Gayo Natural",
    category: "manual-brew",
    price: 30000,
    rating: 5.0,
    soldCount: "420+",
    isBestseller: false,
    badge: "Specialty",
    description: "Diseduh manual menggunakan metode pour-over V60 dengan biji Arabika Aceh Gayo proses Natural.",
    tasteNotes: "Jasmine, Peach, Medium Acidity, Sweet Honey",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Affogato Al Cioccolato",
    category: "espresso-based",
    price: 26000,
    rating: 4.9,
    soldCount: "630+",
    isBestseller: false,
    badge: "Dessert Coffee",
    description: "Satu scoop gelato vanilla artisan premium disiram single shot espresso panas pekat dan taburan cokelat.",
    tasteNotes: "Rich Bitter-Sweet, Creamy Gelato, Nutty",
    image: "https://images.unsplash.com/photo-1594910075574-d47509f7a759?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Matcha Latte Uji Kyoto",
    category: "non-coffee",
    price: 27000,
    rating: 4.8,
    soldCount: "740+",
    isBestseller: true,
    badge: "Favorit Non-Kopi",
    description: "Bubuk teh hijau matcha grade ceremonial dari Uji, dilarutkan sempurna bersama susu murni oat/fresh milk.",
    tasteNotes: "Earthy, Umami, Sweet Milky finish",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Cold Brew Citrus Sparkle",
    category: "signature",
    price: 29000,
    rating: 4.7,
    soldCount: "310+",
    isBestseller: false,
    badge: "Segar",
    description: "Kopi cold brew diekstraksi 18 jam dengan soda tonik dingin dan perasan jeruk lemon segar menyegarkan.",
    tasteNotes: "Crisp Citrus, Sparkling, Low Bitter",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    name: "Artisan Butter Croissant",
    category: "pastry",
    price: 22000,
    rating: 4.9,
    soldCount: "920+",
    isBestseller: true,
    badge: "Fresh Baked",
    description: "Pastry renyah berlapis dengan French butter wangi, dipanggang hangat tiap pagi.",
    tasteNotes: "Flaky, Golden Crispy, Rich Butter",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    name: "Fudgy Dark Choco Brownie",
    category: "pastry",
    price: 20000,
    rating: 4.8,
    soldCount: "510+",
    isBestseller: false,
    badge: "Pasangan Kopi",
    description: "Brownie padat cokelat belgian 70% dengan tekstur fudgy lumer di mulut dan sea salt sprinkle.",
    tasteNotes: "Intense Chocolate, Melt-in-mouth, Slight Salty",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"
  }
];

const REVIEWS = [
  {
    name: "Dimas Pratama",
    role: "Pelanggan Harian",
    rating: 5,
    comment: "Kopi Susu Jiwanya legit parah! Gula arennya harum dan nggak bikin eneg. Tempat andalan buat WFC mingguan.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Sarah Wijaya",
    role: "Penikmat Kopi Manual",
    rating: 5,
    comment: "V60 Gayo Natural-nya clean banget note buahnya terasa jelas. Baristanya ramah dan paham banget profiling rasa.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    name: "Reza & Tim",
    role: "Komunitas Kreatif",
    rating: 5,
    comment: "Pesan langsung dari web tanpa ribet ngantre di kasir. Tinggal ambil pas siap atau diantar ke meja. Mantap!",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
  }
];
