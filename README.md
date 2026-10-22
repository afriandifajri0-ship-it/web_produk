# ☕ Kopi Seduh Jiwa - Website Penjualan UMKM Kedai Kopi

Website penjualan kedai kopi modern yang dirancang khusus dengan pendekatan **psikologi konsumen** dan **UX frictionless checkout**. Konsumen dapat menelusuri katalog, menambahkan menu ke keranjang, dan menyelesaikan pemesanan langsung di dalam website tanpa harus chat manual satu per satu.

---

## 📁 Struktur Berkas

```
Web_produk/
├── index.html        # Struktur antarmuka semantik, Hero, Menu, Drawer, & Modals
├── style.css         # Desain visual warm espresso, layout responsif & animasi
├── data.js           # PUSAT DATA: Ganti semua foto, info toko, dan menu di sini
├── app.js            # Keranjang belanja, form checkout, kalkulasi & nota otomatis
└── README.md         # Petunjuk penggunaan & kustomisasi
```

---

## 🖼️ Cara Mengganti Foto & Background (Sangat Mudah!)

Seluruh tautan foto **tidak di-hardcode** di HTML, melainkan dipusatkan di file [`data.js`](file:///c:/vscode/Web_produk/data.js).

Cukup buka [`data.js`](file:///c:/vscode/Web_produk/data.js), cari komentar `, lalu ganti URL fotonya:

1. **Background Hero Utama:**
   ```javascript
   heroBackground: "https://images.unsplash.com/photo-..." 
   ```
2. **Background Kisah Kami (About Section):**
   ```javascript
   aboutBackground: "https://images.unsplash.com/photo-..." 
   ```
3. **Background Banner Promo (CTA Section):**
   ```javascript
   ctaBackground: "https://images.unsplash.com/photo-..." 
   ```
4. **Foto Menu Produk:**
   Setiap objek produk di array `PRODUCTS` memiliki field `image` dengan komentar `// TODO: ganti dengan foto asli`.

---

## 🛒 Alur Pembelian Langsung (Fitur Utama)

1. **Eksplorasi:** Konsumen melihat menu dengan kategori filter (*Signature*, *Espresso*, *Manual Brew*, *Non-Coffee*, *Pastry*).
2. **Tambah ke Keranjang:** Klik tombol "Pesan", produk langsung masuk keranjang, muncul toast konfirmasi, dan drawer/badge otomatis terupdate.
3. **Drawer Keranjang:** Konsumen bisa menambah/mengurangi jumlah atau menghapus item, serta melihat subtotal + pajak 10% secara *real-time*.
4. **Checkout Terpadu:** 
   * Pilihan Tipe: **Dine In** (dengan input No. Meja), **Take Away**, atau **Delivery** (dengan input Alamat).
   * Data Pembeli: Nama & Nomor WhatsApp.
   * Metode Bayar: **QRIS Instan** (muncul QR code), **Transfer Bank** (BCA/Mandiri), atau **Bayar Tunai di Kasir**.
5. **Konfirmasi & Nota Berhasil:**
   * Menampilkan Nomor Order unik (misal: `#KSJ-84291`).
   * Rincian nota transaksi lengkap.
   * Tombol satu-klik **"Kirim Bukti / Konfirmasi ke WhatsApp Kedai"** dengan format pesan rapi siap kirim ke kasir/barista.

---

## 🚀 Cara Menjalankan Website

Cukup klik dua kali berkas [`index.html`](file:///c:/vscode/Web_produk/index.html) untuk membukanya di browser apa saja (Google Chrome, Edge, Safari, Firefox), atau gunakan ekstensi *Live Server* di VS Code.
