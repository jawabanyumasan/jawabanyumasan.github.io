# Pahala Ngalik V1

**Pahala Ngalik** adalah aplikasi transliterator web client-side untuk mengubah teks Latin menjadi deretan gambar karakter aksara buatan. Aksara ini diadopsi dari konsep aksara Jawa yang dibalik dan ditulis secara Right-to-Left (RTL).

---

## 🚀 Fitur Utama

- **Parsing Longest Match Engine**: Mengutamakan pencocokan string Latin terpanjang (misal: `pung` > `pa`, `paih` > `p` + `a` + `i` + `h`).
- **Tampilan Visual RTL (Right-to-Left)**: Output gambar disusun secara otomatis dari kanan ke kiri.
- **Dynamic Character Database**: Berbasis `data/characters.json`, mendukung ekspansi hingga 580+ karakter tanpa mengubah kode JavaScript utama.
- **Karakter Placeholder (?)**: Penanganan aman jika karakter belum terdaftar di database.
- **Mode Debug & Copy**: Memudahkan penelusuran hasil transliterasi dan penyalinan status tokenization.
- **100% Client-Side Static App**: Dapat dijalankan tanpa build tool, tanpa backend server, dan tanpa dependensi eksternal.

---

## 📁 Struktur Folder

```
pahala-ngalik-v1/
│
├── index.html           # Struktur antarmuka web
├── style.css            # Desain tampilan & tata letak RTL
├── app.js               # Logic parser Longest Match & renderer
├── README.md            # Dokumentasi proyek
│
├── data/
│   └── characters.json  # Database pemetaan Latin -> File Gambar
│
└── img/                 # Direktori gambar karakter dummy/final
    ├── img1800.png
    ├── img1801.png
    ├── ...
    └── img2107.png
```

---

## 💻 Cara Menjalankan Aplikasi

Aplikasi ini bersifat statis dan dapat langsung dijalankan dengan beberapa cara:

### 1. Localhost (Recommended for local dev)
Gunakan HTTP server sederhana untuk menghindari keterbatasan CORS browser saat membaca file JSON lokal:
- **VS Code Live Server**: Klik kanan `index.html` -> *Open with Live Server*.
- **Python HTTP Server**:
  ```bash
  python -m http.server 8000
  ```
  Lalu buka `http://localhost:8000` di browser.

### 2. Hosting Statis (GitHub Pages / Cloudflare Pages / Vercel)
- Upload/push seluruh direktori proyek ke repository GitHub.
- Aktifkan **GitHub Pages** (Branch: `main`, Folder: `/root`).
- Atau sambungkan repositori ke **Cloudflare Pages** / **Vercel** tanpa konfigurasi build step khusus.

---

## ⚙️ Cara Menambahkan Karakter Baru & Mengganti Gambar

### 1. Mengganti Gambar Dummy dengan Gambar Asli
Cukup ganti file di dalam folder `img/` (misalnya `img2100.png`) dengan gambar aksara asli Anda. Selama nama file tetap sama, aplikasi akan langsung memuat gambar baru tanpa perlu mengubah kode.

### 2. Menambah Karakter Baru ke Database (`characters.json`)
Buka file `data/characters.json` dan tambahkan objek baru pada array `characters`:

```json
{
  "latin": "kombinasi_latin",
  "image": "nama_file_gambar.png",
  "label": "Label Deskripsi"
}
```

*Catatan: Anda tidak perlu mengurutkan JSON secara manual. Algoritma `app.js` secara otomatis mengurutkan semua karakter berdasarkan panjang string Latin terpanjang secara otomatis.*

---

## 📊 Algoritma Parsing (Longest Match)

1. Parser membaca input string dari kiri ke kanan.
2. Pada setiap posisi kursor, parser mencocokkan sub-string dengan seluruh daftar `latin` di database (yang sudah diurutkan dari yang paling panjang).
3. Karakter terpanjang yang cocok akan langsung diproses menjadi 1 token gambar.
4. Karakter yang belum terdaftar di database akan ditampilkan sebagai `?` dengan tooltip kustom.

---

## 📜 Lisensi & Versi
- **Versi**: V1 (Prototype transliterator aksara gambar · RTL)
- **Lisensi**: Open Source / Personal Project
