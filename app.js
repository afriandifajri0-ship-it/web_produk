let cart = [];
let activeCategory = "all";
let selectedOrderType = "dine-in";
let selectedPaymentMethod = "qris";

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

function initDynamicContent() {
  const heroSection = document.getElementById("hero");
  if (heroSection && ASSETS_MEDIA.heroBackground) {
    heroSection.style.backgroundImage = `url('${ASSETS_MEDIA.heroBackground}')`;
  }

  const storySection = document.getElementById("cerita");
  if (storySection && ASSETS_MEDIA.aboutBackground) {
    storySection.style.backgroundImage = `url('${ASSETS_MEDIA.aboutBackground}')`;
  }

  const ctaSection = document.getElementById("cta-banner");
  if (ctaSection && ASSETS_MEDIA.ctaBackground) {
    ctaSection.style.backgroundImage = `url('${ASSETS_MEDIA.ctaBackground}')`;
  }

  const navLogo = document.getElementById("nav-logo");
  if (navLogo && ASSETS_MEDIA.logo) {
    navLogo.src = ASSETS_MEDIA.logo;
  }

  const qrisImg = document.getElementById("checkout-qris-img");
  if (qrisImg && SHOP_INFO.qrisImage) {
    qrisImg.src = SHOP_INFO.qrisImage;
  }

  document.getElementById("footer-shop-name").textContent = SHOP_INFO.name;
  document.getElementById("footer-shop-desc").textContent = SHOP_INFO.description;
  document.getElementById("footer-shop-hours").innerHTML = `<i class="bi bi-clock me-2"></i> ${SHOP_INFO.operatingHours}`;
  document.getElementById("footer-shop-address").textContent = SHOP_INFO.address;
  document.getElementById("footer-shop-phone").textContent = SHOP_INFO.phone;

  renderGallery();
  renderReviews();
  renderCategories();
  renderProducts();
  loadCartFromStorage();
  updateCartUI();
}

function renderGallery() {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = ASSETS_MEDIA.gallery.map((imgUrl, idx) => `
    <div class="gallery-item">
      <!-- TODO: ganti dengan foto asli suasana kedai -->
      <img src="${imgUrl}" alt="Suasana Kedai Seduh Jiwa ${idx + 1}" loading="lazy" 
           onerror="this.src='https://placehold.co/600x400?text=Suasana+Kedai'" />
    </div>
  `).join("");
}

function renderReviews() {
  const reviewsGrid = document.getElementById("reviews-grid");
  if (!reviewsGrid) return;

  reviewsGrid.innerHTML = REVIEWS.map(rev => `
    <div class="review-card">
      <div class="review-stars">
        ${'<i class="bi bi-star-fill"></i> '.repeat(rev.rating)}
      </div>
      <p class="review-text">"${rev.comment}"</p>
      <div class="review-author">
        <img src="${rev.avatar}" alt="${rev.name}" class="review-avatar" 
             onerror="this.src='https://placehold.co/100x100?text=Avatar'" />
        <div>
          <div class="author-name">${rev.name}</div>
          <div class="author-role">${rev.role}</div>
        </div>
      </div>
    </div>
  `).join("");
}

function renderCategories() {
  const container = document.getElementById("category-tabs");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="tab-btn ${cat.id === activeCategory ? 'active' : ''}" data-cat="${cat.id}">
      <i class="bi ${cat.icon}"></i>
      <span>${cat.name}</span>
    </button>
  `).join("");

  container.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.getAttribute("data-cat");
      renderCategories();
      renderProducts();
    });
  });
}

function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const filtered = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
      Belum ada menu di kategori ini.
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="product-card" data-id="${item.id}">
      <div class="product-image-wrap">
        <!-- TODO: ganti dengan foto asli produk ${item.name} -->
        <img src="${item.image}" alt="${item.name}" class="product-img" loading="lazy"
             onerror="this.src='https://placehold.co/600x400?text=Menu+Kopi'" />
        ${item.badge ? `<div class="product-badge">${item.badge}</div>` : ""}
        <div class="product-rating">
          <i class="bi bi-star-fill"></i>
          <span>${item.rating}</span>
          <span style="color: #999; font-size: 0.7rem;">(${item.soldCount})</span>
        </div>
      </div>
      <div class="product-content">
        <h3 class="product-name">${item.name}</h3>
        <span class="product-notes">${item.tasteNotes}</span>
        <p class="product-desc">${item.description}</p>
        
        <div class="product-footer">
          <div class="product-price">${formatRupiah(item.price)}</div>
          <button class="btn-add-cart" onclick="addToCart(${item.id})">
            <i class="bi bi-bag-plus"></i>
            <span>Pesan</span>
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`"${product.name}" ditambahkan ke pesanan!`);
}

function updateCartItemQty(productId, delta) {
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

function removeCartItem(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  saveCartToStorage();
  updateCartUI();
}

function getCartTotals() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.10);
  const grandTotal = subtotal + tax;
  return { totalCount, subtotal, tax, grandTotal };
}

function updateCartUI() {
  const { totalCount, subtotal, tax, grandTotal } = getCartTotals();

  const navBadge = document.getElementById("nav-cart-badge");
  if (navBadge) navBadge.textContent = totalCount;

  const floatBtn = document.getElementById("btn-floating-cart");
  const floatCount = document.getElementById("float-cart-count");
  const floatSubtotal = document.getElementById("float-cart-subtotal");
  
  if (floatBtn) {
    if (totalCount > 0) {
      floatBtn.style.display = "flex";
      floatCount.textContent = totalCount;
      floatSubtotal.textContent = formatRupiah(grandTotal);
    } else {
      floatBtn.style.display = "none";
    }
  }

  const drawerBody = document.getElementById("cart-drawer-body");
  const drawerFooter = document.getElementById("cart-drawer-footer");
  const drawerSubtotal = document.getElementById("drawer-subtotal");
  const drawerTax = document.getElementById("drawer-tax");
  const drawerGrandTotal = document.getElementById("drawer-grand-total");

  if (!drawerBody) return;

  if (cart.length === 0) {
    drawerBody.innerHTML = `
      <div class="empty-cart-state">
        <i class="bi bi-cup-hot"></i>
        <h4>Keranjangmu Masih Kosong</h4>
        <p style="font-size: 0.88rem; margin-top: 6px;">Pilih kopi atau camilan favoritmu dari menu untuk mulai memesan.</p>
      </div>
    `;
    if (drawerFooter) drawerFooter.style.display = "none";
  } else {
    drawerBody.innerHTML = cart.map(item => `
      <div class="cart-item">
        <!-- TODO: ganti dengan foto asli produk -->
        <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img"
             onerror="this.src='https://placehold.co/100x100?text=Kopi'" />
        <div class="cart-item-details">
          <div class="cart-item-title">${item.product.name}</div>
          <div class="cart-item-price">${formatRupiah(item.product.price)}</div>
          
          <div class="cart-qty-control">
            <button class="qty-btn" onclick="updateCartItemQty(${item.product.id}, -1)">-</button>
            <span class="qty-display">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartItemQty(${item.product.id}, 1)">+</button>
          </div>
        </div>
        <button class="btn-remove-item" onclick="removeCartItem(${item.product.id})" title="Hapus menu">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    `).join("");

    if (drawerFooter) {
      drawerFooter.style.display = "block";
      drawerSubtotal.textContent = formatRupiah(subtotal);
      drawerTax.textContent = formatRupiah(tax);
      drawerGrandTotal.textContent = formatRupiah(grandTotal);
    }
  }
}

function saveCartToStorage() {
  localStorage.setItem("ksj_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("ksj_cart");
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    cart = [];
  }
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="bi bi-check2-circle" style="color: #22c55e;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  if (open) {
    drawer.classList.add("open");
    backdrop.classList.add("open");
  } else {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
  }
}

function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Keranjang belanja masih kosong!");
    return;
  }
  toggleCartDrawer(false);

  const { totalCount, subtotal, tax, grandTotal } = getCartTotals();
  document.getElementById("checkout-items-count").textContent = `${totalCount} Menu Dipesan`;
  document.getElementById("checkout-subtotal").textContent = formatRupiah(subtotal);
  document.getElementById("checkout-tax").textContent = formatRupiah(tax);
  document.getElementById("checkout-grand-total").textContent = formatRupiah(grandTotal);

  document.getElementById("checkout-modal").classList.add("open");
}

function closeCheckoutModal() {
  document.getElementById("checkout-modal").classList.remove("open");
}

function updatePaymentInfo() {
  const box = document.getElementById("payment-info-box");
  if (!box) return;

  if (selectedPaymentMethod === "qris") {
    box.innerHTML = `
      <p><strong>Scan QRIS Resmi Toko</strong></p>
      <!-- TODO: ganti dengan QRIS asli toko Anda -->
      <img id="checkout-qris-img" src="${SHOP_INFO.qrisImage}" alt="QRIS Kopi Seduh Jiwa" />
      <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 6px;">Mendukung GoPay, OVO, ShopeePay, DANA, BCA, Livin, dll.</p>
    `;
  } else if (selectedPaymentMethod === "transfer") {
    box.innerHTML = `
      <p><strong>Rekening Bank Resmi Kopi Seduh Jiwa</strong></p>
      <div style="background: #fff; padding: 10px; border-radius: 6px; margin: 8px 0; font-family: monospace; font-size: 1rem; font-weight: bold; color: var(--coffee-warm);">
        BCA: 8820-9128-4019
      </div>
      <p style="font-size: 0.78rem; color: var(--text-muted);">a.n. Kopi Seduh Jiwa Nusantara</p>
    `;
  } else {
    box.innerHTML = `
      <p><strong>Pembayaran Tunai / Di Kasir</strong></p>
      <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
        Silakan lakukan pembayaran langsung di meja kasir saat mengambil pesanan atau saat barista mengantarkan kopi ke meja Anda.
      </p>
    `;
  }
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("cust-name").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();
  const table = document.getElementById("cust-table").value.trim();
  const address = document.getElementById("cust-address").value.trim();
  const notes = document.getElementById("cust-notes").value.trim();

  if (!name || !phone) {
    alert("Harap lengkapi nama dan nomor WhatsApp Anda.");
    return;
  }

  const orderId = "KSJ-" + Math.floor(10000 + Math.random() * 90000);
  const { totalCount, subtotal, tax, grandTotal } = getCartTotals();
  const orderDate = new Date().toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "short"
  });

  document.getElementById("success-order-id").textContent = `NO. ORDER: #${orderId}`;
  
  let orderTypeLabel = "Dine In (Di Tempat)";
  if (selectedOrderType === "take-away") orderTypeLabel = "Take Away (Bawa Pulang)";
  if (selectedOrderType === "delivery") orderTypeLabel = `Delivery Lokal (${address})`;
  else if (selectedOrderType === "dine-in" && table) orderTypeLabel += ` - Meja: ${table}`;

  let paymentLabel = "QRIS Instan";
  if (selectedPaymentMethod === "transfer") paymentLabel = "Transfer Bank BCA";
  if (selectedPaymentMethod === "cash") paymentLabel = "Bayar Tunai di Kasir";

  const receiptBox = document.getElementById("success-receipt-box");
  receiptBox.innerHTML = `
    <div class="receipt-item-row">
      <span style="color: var(--text-muted);">Tanggal:</span>
      <strong>${orderDate}</strong>
    </div>
    <div class="receipt-item-row">
      <span style="color: var(--text-muted);">Nama Pemesan:</span>
      <strong>${name} (${phone})</strong>
    </div>
    <div class="receipt-item-row">
      <span style="color: var(--text-muted);">Layanan:</span>
      <strong>${orderTypeLabel}</strong>
    </div>
    <div class="receipt-item-row">
      <span style="color: var(--text-muted);">Metode Bayar:</span>
      <strong>${paymentLabel}</strong>
    </div>
    ${notes ? `
    <div class="receipt-item-row">
      <span style="color: var(--text-muted);">Catatan:</span>
      <em>"${notes}"</em>
    </div>
    ` : ""}
    <div class="receipt-divider"></div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 8px;">Daftar Pesanan:</div>
    ${cart.map(item => `
      <div class="receipt-item-row">
        <span>${item.product.name} &times; ${item.quantity}</span>
        <span>${formatRupiah(item.product.price * item.quantity)}</span>
      </div>
    `).join("")}
    <div class="receipt-divider"></div>
    <div class="receipt-item-row">
      <span>Subtotal</span>
      <span>${formatRupiah(subtotal)}</span>
    </div>
    <div class="receipt-item-row">
      <span>Pajak (10%)</span>
      <span>${formatRupiah(tax)}</span>
    </div>
    <div class="receipt-item-row" style="font-size: 1.1rem; font-weight: 800; color: var(--coffee-warm); margin-top: 6px;">
      <span>Total Akhir</span>
      <span>${formatRupiah(grandTotal)}</span>
    </div>
  `;

  const waItemsText = cart.map(i => `• ${i.product.name} (${i.quantity}x) = ${formatRupiah(i.product.price * i.quantity)}`).join("%0A");
  const waMessage = `Halo ${SHOP_INFO.name}, saya telah melakukan pemesanan via website:%0A%0A` +
    `*No. Order:* %23${orderId}%0A` +
    `*Nama:* ${encodeURIComponent(name)}%0A` +
    `*No. WA:* ${encodeURIComponent(phone)}%0A` +
    `*Tipe:* ${encodeURIComponent(orderTypeLabel)}%0A` +
    `*Metode Bayar:* ${encodeURIComponent(paymentLabel)}%0A` +
    (notes ? `*Catatan:* ${encodeURIComponent(notes)}%0A` : "") +
    `%0A*Rincian Menu:*%0A${waItemsText}%0A%0A` +
    `*Total Tagihan:* ${encodeURIComponent(formatRupiah(grandTotal))}%0A%0A` +
    `Mohon segera diproses ya, terima kasih!`;

  const btnWa = document.getElementById("btn-send-whatsapp");
  btnWa.href = `https://api.whatsapp.com/send?phone=${SHOP_INFO.whatsappNumber}&text=${waMessage}`;

  cart = [];
  saveCartToStorage();
  updateCartUI();

  closeCheckoutModal();
  document.getElementById("success-modal").classList.add("open");
}

function resetToNewOrder() {
  document.getElementById("success-modal").classList.remove("open");
  const menuSection = document.getElementById("menu");
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: "smooth" });
  }
}

  initDynamicContent();
  document.getElementById("btn-open-cart-nav").addEventListener("click", () => toggleCartDrawer(true));
  document.getElementById("btn-floating-cart").addEventListener("click", () => toggleCartDrawer(true));

  document.getElementById("btn-close-drawer").addEventListener("click", () => toggleCartDrawer(false));
  document.getElementById("cart-backdrop").addEventListener("click", () => toggleCartDrawer(false));

  document.getElementById("btn-proceed-checkout").addEventListener("click", openCheckoutModal);

  document.getElementById("btn-close-checkout").addEventListener("click", closeCheckoutModal);

  document.querySelectorAll(".type-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".type-option").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      selectedOrderType = opt.getAttribute("data-type");

      const tableField = document.getElementById("field-table-num");
      const addressField = document.getElementById("field-address");

      if (selectedOrderType === "dine-in") {
        tableField.style.display = "block";
        addressField.style.display = "none";
      } else if (selectedOrderType === "delivery") {
        tableField.style.display = "none";
        addressField.style.display = "block";
      } else {
        tableField.style.display = "none";
        addressField.style.display = "none";
      }
    });
  });

  document.querySelectorAll(".payment-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".payment-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      selectedPaymentMethod = card.getAttribute("data-pay");
      updatePaymentInfo();
    });
  });

  document.getElementById("checkout-form").addEventListener("submit", handleCheckoutSubmit);
  document.getElementById("btn-new-order").addEventListener("click", resetToNewOrder);
