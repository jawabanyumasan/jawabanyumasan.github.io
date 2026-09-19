# Blogjak Theme — Version 2.1

> A clean, native Jekyll theme for pure Markdown blogging with dark mode, gallery grid, dynamic pagination, search, related posts, and SEO optimization.
>
> _Tema Jekyll native yang bersih untuk blogging pure Markdown dengan dark mode, gallery grid, pagination dinamis, pencarian, artikel terkait, dan optimasi SEO._

![Jekyll](https://img.shields.io/badge/Jekyll-4.3+-1e3a8a?logo=jekyll&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-f97316)
![Theme](https://img.shields.io/badge/Theme-Blogjak%20v2.1-0a0a0a)
![Markdown](https://img.shields.io/badge/Content-Pure%20Markdown-1e3a8a)

---

## 🇬🇧 English

### ✨ Overview

**Blogjak Theme Version 2.1** is a native Jekyll theme built for writers who want a **frictionless Markdown-first workflow**. Drop a `.md` file into `_posts/`, and it's instantly rendered as a gallery card with its own detail page. No JSON edits. No manual HTML. No database.

Designed with a bold **royal blue / orange / black / white** palette, it's perfect for personal blogs, portfolios, documentation sites, and photo galleries.

---

### 🚀 Features

#### Core Features
| Feature | Description |
|---|---|
| 📝 **Pure Markdown Workflow** | Add articles by simply creating `.md` files in `_posts/`. No JSON or HTML editing required. |
| 🌗 **Dark Mode Toggle** | Auto-detects system preference, manual toggle with SVG icon, persists choice in `localStorage`. |
| 🖼️ **Image Gallery Grid** | Responsive, interactive card grid on the homepage with hover zoom and category badges. |
| 📄 **Native Pagination** | Full navigation controls: First («), Previous (‹), Page Numbers, Next (›), Last (»). Powered by `jekyll-paginate`. |
| 📱 **Fully Responsive** | Mobile hamburger menu, adaptive grid columns, fluid typography. |

## 📝 Changelog

### v2.1 (Current)
- 🔍 **Client-side search** with fuzzy matching & keyboard shortcuts
- 🔗 **Related posts** widget (by categories → tags → recent)
- ⚡ **SEO optimization**: Open Graph, Twitter Card, JSON-LD, sitemap, robots.txt
- 🎨 **SVG social icons** in footer (no FontAwesome dependency for socials)
- 🐛 **Fixes**: double post content, search button layering, related posts logic
- 📚 Updated README with troubleshooting section

### v2.0
- 🌗 Dark mode toggle with localStorage
- 🖼️ Gallery grid homepage
- 📄 Native pagination with full nav controls
- 📱 Fully responsive with hamburger menu
- 🎨 Royal Blue / Orange / Black / White palette

### v1.0
- Initial release
- 
#### New in v2.1
| Feature | Description |
|---|---|
| 🔍 **Client-Side Search** | Fast, fuzzy search with keyboard shortcuts (`Ctrl/Cmd + K`, `/`, `Esc`). No server needed. |
| 🔗 **Related Posts** | Smart recommendations based on shared categories → tags → recent posts. |
| ⚡ **SEO Optimized** | Complete meta tags, Open Graph, Twitter Card, JSON-LD structured data, sitemap, and `robots.txt`. |
| 📊 **Rich Snippets** | Google-friendly structured data for blog posts (author, date, publisher). |
| 🎨 **Modern Social Footer** | FontAwesome icons for GitHub, Twitter/X, Facebook, Instagram, YouTube, LinkedIn, TikTok, Telegram, WhatsApp, Pinterest, Reddit, Discord, Medium, Dev.to, and RSS. |

#### Content Features
- ✅ Rich Markdown support (tables, blockquotes, fenced code blocks)
- ✅ Collapsible `<details>` sections
- ✅ Task checklists
- ✅ Auto-generated reading time
- ✅ Previous/Next post navigation
- ✅ RSS feed via `jekyll-feed`
- ✅ Custom 404 page

---

### 📁 Project Structure

```
blogjak-theme/
├── _config.yml               # Jekyll configuration
├── Gemfile                   # Ruby dependencies
├── index.html                # Homepage with gallery grid + pagination
├── about.md                  # About page
├── archive.md                # Archive page (grouped by year)
├── contact.md                # Contact page
├── 404.html                  # Custom 404 page
├── robots.txt                # SEO robots.txt
├── search.json               # Search index (auto-generated)
├── README.md                 # This file
├── _layouts/
│   ├── default.html          # Base layout (head, header, footer, scripts)
│   └── post.html             # Post detail layout
├── _includes/
│   ├── head.html             # SEO meta tags, JSON-LD, CSS links
│   ├── header.html           # Navbar + hamburger + search + theme toggle
│   ├── footer.html           # Footer with social icons
│   ├── search-modal.html     # Search modal overlay
│   └── related-posts.html    # Related posts widget
├── _posts/
│   └── 2026-03-05-contoh-artikel.md
└── assets/
    ├── css/
    │   └── styles.css        # All theme styles
    ├── js/
    │   ├── main.js           # Dark mode + hamburger logic
    │   └── search.js         # Search engine logic
    └── images/
        └── favicon.svg
```

> ⚠️ **Important:** Place `main.js` and `search.js` in `assets/js/`, and `styles.css` in `assets/css/`. Wrong placement causes 404 errors.

---

### ⚙️ Installation

#### 1. Clone or download

```bash
git clone https://github.com/username/blogjak-theme.git
cd blogjak-theme
```

#### 2. Install dependencies

```bash
bundle install
```

#### 3. Configure `_config.yml`

Set `url` and `baseurl` according to your deployment target:

**A. Deploying to a project repo** (e.g. `username.github.io/blogjak-theme/`):
```yaml
url: "https://username.github.io"
baseurl: "/blogjak-theme"
```

**B. Deploying to a user/org root site** (e.g. `username.github.io`):
```yaml
url: "https://username.github.io"
baseurl: ""
```

**C. Deploying with a custom domain**:
```yaml
url: "https://yourdomain.com"
baseurl: ""
```

#### 4. Run locally

```bash
# Option 1 — Override baseurl for local development
bundle exec jekyll serve --baseurl ""

# Option 2 — Keep baseurl
bundle exec jekyll serve
# → http://localhost:4000/blogjak-theme/
```

---

### ✍️ Writing an Article

Create a new file in `_posts/` using the format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "My First Post"
description: "A short summary shown on the gallery card and used for SEO."
date: 2026-03-05 09:00:00 +0700
categories: [Tutorial, Jekyll]
tags: [markdown, jekyll, blog]
author: Your Name
image: "https://example.com/cover.jpg"
---

Write your article content here in Markdown.
```

**Front matter fields:**

| Field | Required | Description |
|---|:---:|---|
| `layout` | ✅ | Always `post` |
| `title` | ✅ | Article title |
| `date` | ✅ | Publication timestamp |
| `description` | ❌ | Short summary for cards & SEO |
| `categories` | ❌ | Array; first one becomes the badge |
| `tags` | ❌ | Array of tags (used for related posts) |
| `author` | ❌ | Falls back to `site.author` |
| `image` | ❌ | Cover image URL (gallery card + hero) |

---

### 🔍 Search Feature

The search is **client-side**, no backend needed:

- **Trigger:** Click 🔍 icon in navbar, or press `Ctrl/Cmd + K` or `/`
- **Navigation:** `↑` `↓` to move, `Enter` to open, `Esc` to close
- **Scope:** Searches title, description, content, categories, and tags
- **Ranking:** Title matches > tags > categories > description > content

**Customize in `_config.yml`:**
```yaml
search:
  enabled: true
  placeholder: "Cari artikel..."
  max_results: 10
```

---

### 🔗 Related Posts

Related posts appear **below the article content** and use this priority:

1. **Same categories** → highest priority
2. **Same tags** → medium priority
3. **Recent posts** → fallback

**Customize in `_config.yml`:**
```yaml
related:
  enabled: true
  count: 3
```

---

### ⚡ SEO Features

Out of the box:

- ✅ Dynamic `<title>` and `<meta description>`
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Card (summary_large_image)
- ✅ JSON-LD structured data (`BlogPosting` / `WebSite`)
- ✅ Canonical URLs
- ✅ `sitemap.xml` (via `jekyll-sitemap`)
- ✅ `robots.txt`
- ✅ RSS feed (via `jekyll-feed`)
- ✅ Article meta (published time, author, section, tags)
- ✅ Theme color meta for light/dark modes

**Verify with:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

### 🎨 Customization

#### Change colors

Edit `assets/css/styles.css`:

```css
:root {
  --royal-blue: #1e3a8a;
  --orange:     #f97316;
  --black:      #0a0a0a;
  --white:      #ffffff;
}
```

#### Change posts per page

```yaml
paginate: 6
```

#### Add social links

```yaml
social:
  github: "https://github.com/yourname"
  twitter: "https://twitter.com/yourname"
  facebook: "https://facebook.com/yourname"
  instagram: "https://instagram.com/yourname"
  youtube: "https://youtube.com/@yourname"
  # ... leave blank to hide any icon
```

#### Change logo text

Edit `_includes/header.html` and replace `Blogjak` / `Theme` inside `.logo-text`.

---

### 🚀 Deployment

#### GitHub Pages

1. Push your project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Source: `main` branch, `/ (root)`.
4. Site will be live at:
   - `https://username.github.io/` (root), or
   - `https://username.github.io/repo-name/` (project)

#### Netlify / Vercel / Cloudflare Pages

- **Build command**: `bundle exec jekyll build`
- **Publish directory**: `_site`
- **Environment**: Ruby 3.x

#### Manual build

```bash
bundle exec jekyll build
# Output in _site/
```

---

### 📋 Requirements

- Ruby 3.0+
- Jekyll 4.3+
- Bundler

---

### 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| **404 on `search.js`** | Ensure file is at `assets/js/search.js`, not `assets/search.js` |
| **Icon toggle not visible** | Ensure `main.js` is at `assets/js/main.js` and check Console for errors |
| **Double post content** | Check `_layouts/post.html` has only **one** `{{ content }}` |
| **FontAwesome not loading** | Unregister Service Worker in DevTools → Application |
| **Search button unclickable** | Check `search-modal.html` is included in `default.html` |
| **Subfolder links broken** | Ensure all links use `\| relative_url` and `baseurl` is set |

---

### 📄 License

MIT — free for personal and commercial use.

---

### 🙏 Credits

- Theme by **Blogjak**
- Icons by [Font Awesome](https://fontawesome.com/)
- Fonts: [Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

## 🇮🇩 Bahasa Indonesia

### ✨ Ringkasan

**Blogjak Theme Versi 2.1** adalah tema Jekyll native yang dibuat untuk penulis yang menginginkan **alur kerja Markdown tanpa hambatan**. Cukup letakkan berkas `.md` di folder `_posts/`, dan artikel akan otomatis dirender sebagai kartu galeri dengan halaman detailnya sendiri. Tanpa menyunting JSON. Tanpa menulis HTML manual. Tanpa database.

Menggunakan palet warna **royal blue / orange / black / white** yang berani, tema ini cocok untuk blog pribadi, portofolio, situs dokumentasi, dan galeri foto.

---

### 🚀 Fitur Unggulan

#### Fitur Inti
| Fitur | Deskripsi |
|---|---|
| 📝 **Alur Kerja Pure Markdown** | Tambah artikel hanya dengan membuat berkas `.md` di `_posts/`. Tidak perlu edit JSON atau HTML. |
| 🌗 **Toggle Dark Mode** | Deteksi otomatis preferensi sistem, tombol manual dengan ikon SVG, tersimpan di `localStorage`. |
| 🖼️ **Gallery Grid Gambar** | Grid kartu interaktif yang responsif di halaman utama dengan efek zoom saat hover dan badge kategori. |
| 📄 **Pagination Native** | Kontrol navigasi lengkap: First («), Previous (‹), Nomor Halaman, Next (›), Last (»). Didukung `jekyll-paginate`. |
| 📱 **Fully Responsive** | Hamburger menu di mobile, grid adaptif, dan tipografi fluid. |

#### Baru di v2.1
| Fitur | Deskripsi |
|---|---|
| 🔍 **Pencarian Client-Side** | Pencarian cepat dengan fuzzy matching & shortcut keyboard (`Ctrl/Cmd + K`, `/`, `Esc`). Tanpa server. |
| 🔗 **Artikel Terkait** | Rekomendasi cerdas berdasarkan kategori → tag → post terbaru. |
| ⚡ **SEO Optimized** | Meta tag lengkap, Open Graph, Twitter Card, JSON-LD, sitemap, dan `robots.txt`. |
| 📊 **Rich Snippets** | Structured data ramah Google (author, tanggal, publisher). |
| 🎨 **Footer Sosial Modern** | Ikon FontAwesome untuk GitHub, Twitter/X, Facebook, Instagram, YouTube, LinkedIn, TikTok, Telegram, WhatsApp, Pinterest, Reddit, Discord, Medium, Dev.to, dan RSS. |

#### Fitur Konten
- ✅ Dukungan Markdown kaya (tabel, blockquote, code block)
- ✅ Section `<details>` yang bisa dilipat
- ✅ Checklist tugas
- ✅ Estimasi waktu baca otomatis
- ✅ Navigasi Previous/Next post
- ✅ RSS feed via `jekyll-feed`
- ✅ Halaman 404 kustom

---

### 📁 Struktur Proyek

```
blogjak-theme/
├── _config.yml               # Konfigurasi Jekyll
├── Gemfile                   # Dependensi Ruby
├── index.html                # Homepage + gallery grid + pagination
├── about.md                  # Halaman Tentang
├── archive.md                # Halaman Arsip (grouped by year)
├── contact.md                # Halaman Kontak
├── 404.html                  # Halaman 404 kustom
├── robots.txt                # robots.txt untuk SEO
├── search.json               # Index pencarian (auto-generated)
├── README.md                 # Berkas ini
├── _layouts/
│   ├── default.html          # Layout induk (head, header, footer, scripts)
│   └── post.html             # Layout detail postingan
├── _includes/
│   ├── head.html             # Meta tag SEO, JSON-LD, link CSS
│   ├── header.html           # Navbar + hamburger + search + theme toggle
│   ├── footer.html           # Footer dengan ikon sosial media
│   ├── search-modal.html     # Modal pencarian
│   └── related-posts.html    # Widget artikel terkait
├── _posts/
│   └── 2026-03-05-contoh-artikel.md
└── assets/
    ├── css/
    │   └── styles.css        # Semua gaya tema
    ├── js/
    │   ├── main.js           # Logika dark mode + hamburger
    │   └── search.js         # Logika pencarian
    └── images/
        └── favicon.svg
```

> ⚠️ **Penting:** Letakkan `main.js` dan `search.js` di `assets/js/`, dan `styles.css` di `assets/css/`. Salah lokasi menyebabkan error 404.

---

### ⚙️ Cara Instalasi

#### 1. Clone atau unduh

```bash
git clone https://github.com/username/blogjak-theme.git
cd blogjak-theme
```

#### 2. Install dependensi

```bash
bundle install
```

#### 3. Konfigurasi `_config.yml`

Sesuaikan `url` dan `baseurl` sesuai target deployment:

**A. Deploy ke repo proyek** (contoh: `username.github.io/blogjak-theme/`):
```yaml
url: "https://username.github.io"
baseurl: "/blogjak-theme"
```

**B. Deploy ke root site user/org** (contoh: `username.github.io`):
```yaml
url: "https://username.github.io"
baseurl: ""
```

**C. Deploy dengan custom domain**:
```yaml
url: "https://domain-anda.com"
baseurl: ""
```

#### 4. Jalankan secara lokal

```bash
# Opsi 1 — Override baseurl untuk pengembangan lokal
bundle exec jekyll serve --baseurl ""

# Opsi 2 — Biarkan baseurl
bundle exec jekyll serve
# → http://localhost:4000/blogjak-theme/
```

---

### ✍️ Menulis Artikel

Buat berkas baru di `_posts/` dengan format `YYYY-MM-DD-judul.md`:

```markdown
---
layout: post
title: "Artikel Pertama Saya"
description: "Ringkasan singkat untuk kartu galeri dan SEO."
date: 2026-03-05 09:00:00 +0700
categories: [Tutorial, Jekyll]
tags: [markdown, jekyll, blog]
author: Nama Anda
image: "https://example.com/cover.jpg"
---

Tulis konten artikel di sini menggunakan Markdown.
```

**Field front matter:**

| Field | Wajib | Deskripsi |
|---|:---:|---|
| `layout` | ✅ | Selalu `post` |
| `title` | ✅ | Judul artikel |
| `date` | ✅ | Timestamp publikasi |
| `description` | ❌ | Ringkasan untuk kartu & SEO |
| `categories` | ❌ | Array; kategori pertama jadi badge |
| `tags` | ❌ | Array tag (dipakai untuk related posts) |
| `author` | ❌ | Fallback ke `site.author` |
| `image` | ❌ | URL gambar cover (kartu + hero) |

---

### 🔍 Fitur Pencarian

Pencarian **client-side**, tidak butuh backend:

- **Trigger:** Klik ikon 🔍 di navbar, atau tekan `Ctrl/Cmd + K` atau `/`
- **Navigasi:** `↑` `↓` untuk pindah, `Enter` untuk buka, `Esc` untuk tutup
- **Cakupan:** Mencari di judul, deskripsi, konten, kategori, dan tag
- **Ranking:** Judul > tag > kategori > deskripsi > konten

**Kustomisasi di `_config.yml`:**
```yaml
search:
  enabled: true
  placeholder: "Cari artikel..."
  max_results: 10
```

---

### 🔗 Artikel Terkait

Artikel terkait muncul **di bawah konten artikel** dengan prioritas:

1. **Kategori sama** → prioritas tertinggi
2. **Tag sama** → prioritas menengah
3. **Post terbaru** → fallback

**Kustomisasi di `_config.yml`:**
```yaml
related:
  enabled: true
  count: 3
```

---

### ⚡ Fitur SEO

Siap pakai tanpa konfigurasi tambahan:

- ✅ `<title>` dan `<meta description>` dinamis
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Card (summary_large_image)
- ✅ JSON-LD structured data (`BlogPosting` / `WebSite`)
- ✅ Canonical URL
- ✅ `sitemap.xml` (via `jekyll-sitemap`)
- ✅ `robots.txt`
- ✅ RSS feed (via `jekyll-feed`)
- ✅ Article meta (published time, author, section, tags)
- ✅ Theme color meta untuk light/dark modes

**Verifikasi dengan:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

### 🎨 Kustomisasi

#### Mengubah warna

Edit `assets/css/styles.css`:

```css
:root {
  --royal-blue: #1e3a8a;
  --orange:     #f97316;
  --black:      #0a0a0a;
  --white:      #ffffff;
}
```

#### Mengubah jumlah post per halaman

```yaml
paginate: 6
```

#### Menambah tautan media sosial

```yaml
social:
  github: "https://github.com/namaanda"
  twitter: "https://twitter.com/namaanda"
  facebook: "https://facebook.com/namaanda"
  instagram: "https://instagram.com/namaanda"
  youtube: "https://youtube.com/@namaanda"
  # ... biarkan kosong untuk menyembunyikan ikon
```

#### Mengubah teks logo

Edit `_includes/header.html` dan ganti `Blogjak` / `Theme` di dalam `.logo-text`.

---

### 🚀 Deployment

#### GitHub Pages

1. Push proyek ke repositori GitHub.
2. Buka **Settings → Pages**.
3. Source: branch `main`, `/ (root)`.
4. Situs akan live di:
   - `https://username.github.io/` (root), atau
   - `https://username.github.io/nama-repo/` (proyek)

#### Netlify / Vercel / Cloudflare Pages

- **Build command**: `bundle exec jekyll build`
- **Publish directory**: `_site`
- **Environment**: Ruby 3.x

#### Build manual

```bash
bundle exec jekyll build
# Hasil di folder _site/
```

---

### 📋 Persyaratan

- Ruby 3.0+
- Jekyll 4.3+
- Bundler

---

### 🐛 Troubleshooting

| Masalah | Solusi |
|---|---|
| **404 pada `search.js`** | Pastikan file ada di `assets/js/search.js`, bukan `assets/search.js` |
| **Ikon toggle tidak terlihat** | Pastikan `main.js` ada di `assets/js/main.js`, cek Console untuk error |
| **Konten post double** | Cek `_layouts/post.html` hanya punya **satu** `{{ content }}` |
| **FontAwesome tidak load** | Unregister Service Worker di DevTools → Application |
| **Tombol search tidak bisa diklik
