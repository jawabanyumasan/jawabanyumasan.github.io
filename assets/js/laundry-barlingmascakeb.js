/**
 * JS SCOPED: Halaman Laundry Listing Barlingmascakeb
 * Memastikan data wilayah dan desa dimuat tuntas sebelum render untuk menghindari loading ganda.
 */
(function () {
  'use strict';

  const appContainer = document.getElementById('laundry-app');
  if (!appContainer) return;

  const MODULE = 'laundry-barlingmascakeb';
  const CONFIG_URL = window.location.origin + '/config.csv';
  const CSV_DISTRICTS = "https://raw.githubusercontent.com/prodhokter/dataset-wilayah-indonesia/master/districts.csv";
  const CSV_VILLAGES = "https://raw.githubusercontent.com/prodhokter/dataset-wilayah-indonesia/master/villages.csv";

  const TARGET_REGIONS = [
    { id: "3304", name: "Kabupaten Banjarnegara", slug: "kabupaten-banjarnegara" },
    { id: "3303", name: "Kabupaten Purbalingga",  slug: "kabupaten-purbalingga" },
    { id: "3302", name: "Kabupaten Banyumas",     slug: "kabupaten-banyumas" },
    { id: "3301", name: "Kabupaten Cilacap",      slug: "kabupaten-cilacap" },
    { id: "3305", name: "Kabupaten Kebumen",      slug: "kabupaten-kebumen" }
  ];
  const TARGET_IDS = new Set(TARGET_REGIONS.map(r => r.id));

  const state = {
    districtsByRegency: new Map(),
    villagesByDistrict: new Map(),
    targetDistrictIds: new Set(),
    isInitialized: false,
    phone: "085773009666"
  };

  function slugify(str) {
    return String(str).toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-+|-+$)/g, '');
  }

  function toTitleCase(str) {
    return String(str).toLowerCase().split(' ').filter(Boolean).map(w => {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(' ');
  }

  function parseCsvLine(line) {
    const first = line.indexOf(',');
    if (first === -1) return null;
    const second = line.indexOf(',', first + 1);
    if (second === -1) return [line.slice(0, first).trim(), line.slice(first + 1).trim()];
    return [line.slice(0, first).trim(), line.slice(first + 1, second).trim(), line.slice(second + 1).trim()];
  }

  async function fetchLines(url) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      return text.split('\n').map(l => l.trim()).filter(Boolean);
    } catch (e) {
      return [];
    }
  }

  // Load Config (opsional jika ada config.csv)
  async function loadConfig() {
    const lines = await fetchLines(CONFIG_URL);
    lines.forEach(line => {
      const parts = parseCsvLine(line);
      if (parts && parts[0].toLowerCase() === 'phone' && parts[1]) {
        state.phone = parts[1];
      }
    });
  }

  // Load Districts & Villages Sekaligus di awal agar data tuntas ter-load
  async function loadAllGeographicData(statusCallback) {
    if (state.isInitialized) return;

    if (statusCallback) statusCallback('Memuat data kecamatan Barlingmascakeb...');
    const dLines = await fetchLines(CSV_DISTRICTS);
    dLines.forEach(line => {
      const parts = parseCsvLine(line);
      if (!parts || !TARGET_IDS.has(parts[1])) return;
      const name = toTitleCase(parts[2]);
      const item = { id: parts[0], regencyId: parts[1], name, slug: slugify(name) };
      if (!state.districtsByRegency.has(item.regencyId)) state.districtsByRegency.set(item.regencyId, []);
      state.districtsByRegency.get(item.regencyId).push(item);
      state.targetDistrictIds.add(item.id);
    });

    if (statusCallback) statusCallback('Memuat data seluruh desa/kelurahan...');
    const vLines = await fetchLines(CSV_VILLAGES);
    vLines.forEach(line => {
      const parts = parseCsvLine(line);
      if (!parts || !state.targetDistrictIds.has(parts[1])) return;
      const name = toTitleCase(parts[2]);
      if (!state.villagesByDistrict.has(parts[1])) state.villagesByDistrict.set(parts[1], []);
      state.villagesByDistrict.get(parts[1]).push(name);
    });

    state.isInitialized = true;
  }

  function getHashParams() {
    let hash = window.location.hash.replace(/^#/, '');
    const parts = hash.split('/').filter(Boolean);
    if (parts.length === 0) return [];
    if (parts[0] !== MODULE) return null;
    return parts.slice(1);
  }

  window.addEventListener('hashchange', renderRouter);

  function renderRouter() {
    const params = getHashParams();
    if (params === null) return;

    if (params.length === 0) {
      hideBreadcrumb();
      appContainer.innerHTML = renderHomeView();
      return;
    }

    const region = TARGET_REGIONS.find(r => r.slug === params[0]);
    if (!region) { renderNotFound(); return; }

    if (params.length === 1) {
      showBreadcrumb([
        { name: 'Home', path: '' },
        { name: region.name, path: region.slug }
      ]);
      appContainer.innerHTML = renderKabupatenView(region);
      return;
    }

    const distList = state.districtsByRegency.get(region.id) || [];
    const district = distList.find(d => d.slug === params[1]);
    if (!district) { renderNotFound(); return; }

    if (params.length === 2) {
      showBreadcrumb([
        { name: 'Home', path: '' },
        { name: region.name, path: region.slug },
        { name: district.name, path: `${region.slug}/${district.slug}` }
      ]);
      appContainer.innerHTML = renderKecamatanView(region, district);
      return;
    }

    renderNotFound();
  }

  function showBreadcrumb(items) {
    const wrap = document.getElementById('laundry-breadcrumb-wrap');
    const bc = document.getElementById('laundry-breadcrumb');
    if (!wrap || !bc) return;

    bc.innerHTML = items.map((item, idx) => {
      if (idx === items.length - 1) return `<span><strong>${item.name}</strong></span>`;
      return `<a href="#${MODULE}/${item.path}" onclick="event.preventDefault(); window.location.hash='#${MODULE}/${item.path}';">${item.name}</a> <span>/</span>`;
    }).join(' ');
    wrap.style.display = 'block';
  }

  function hideBreadcrumb() {
    const wrap = document.getElementById('laundry-breadcrumb-wrap');
    if (wrap) wrap.style.display = 'none';
  }

  function renderHomeView() {
    let html = `
      <div class="laundry-hero">
        <h1>Direktori Laundry Kiloan Barlingmascakeb</h1>
        <p>Pilih wilayah kabupaten dan kecamatan tujuan Anda untuk menemukan layanan laundry kiloan &amp; express terdekat.</p>
      </div>
    `;

    TARGET_REGIONS.forEach(region => {
      const dists = state.districtsByRegency.get(region.id) || [];
      html += `
        <div class="kab-block">
          <div class="kab-block-head">
            <h3>🧺 ${region.name}</h3>
            <a class="kab-link-all" href="#${MODULE}/${region.slug}" onclick="event.preventDefault(); window.location.hash='#${MODULE}/${region.slug}';">Lihat Kabupaten &rarr;</a>
          </div>
          <div class="laundry-grid">
            ${dists.map(d => `
              <a href="#${MODULE}/${region.slug}/${d.slug}" class="laundry-card" onclick="event.preventDefault(); window.location.hash='#${MODULE}/${region.slug}/${d.slug}';">
                <div class="laundry-icon">📍</div>
                <div>
                  <div class="laundry-card-title">${d.name}</div>
                  <div class="laundry-card-sub">Klik untuk daftar desa</div>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    });
    return html;
  }

  function renderKabupatenView(region) {
    const dists = state.districtsByRegency.get(region.id) || [];
    return `
      <div class="laundry-hero">
        <h1>Laundry Kiloan ${region.name}</h1>
        <p>Melayani seluruh kecamatan di ${region.name}. Pilih kecamatan di bawah ini:</p>
      </div>
      <div class="laundry-grid">
        ${dists.map(d => `
          <a href="#${MODULE}/${region.slug}/${d.slug}" class="laundry-card" onclick="event.preventDefault(); window.location.hash='#${MODULE}/${region.slug}/${d.slug}';">
            <div class="laundry-icon">📍</div>
            <div>
              <div class="laundry-card-title">${d.name}</div>
              <div class="laundry-card-sub">${region.name}</div>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }

  function renderKecamatanView(region, district) {
    const villages = state.villagesByDistrict.get(district.id) || [];
    return `
      <div class="laundry-hero">
        <h1>Laundry Kiloan Kecamatan ${district.name}</h1>
        <p>Solusi cuci pakaian bersih, wangi, dan rapi di ${district.name}, ${region.name}.</p>
      </div>
      <div class="kab-block">
        <h3>Daftar Desa / Kelurahan di Kecamatan ${district.name}:</h3>
        <div class="laundry-grid" style="margin-top: 1rem;">
          ${villages.length ? villages.map(v => `
            <div class="laundry-card" style="cursor: default;">
              <div class="laundry-icon">✨</div>
              <div>
                <div class="laundry-card-title">${v}</div>
                <div class="laundry-card-sub">Antar Jemput Tersedia</div>
              </div>
            </div>
          `).join('') : '<p style="color:var(--text-muted)">Belum ada data desa untuk kecamatan ini.</p>'}
        </div>
      </div>
    `;
  }

  function renderNotFound() {
    appContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <h2>Wilayah Tidak Ditemukan</h2>
        <p style="color: var(--text-muted); margin: 1rem 0;">Maaf, data wilayah yang Anda tuju tidak tersedia dalam direktori kami.</p>
        <a href="#${MODULE}" class="btn btn-primary" onclick="event.preventDefault(); window.location.hash='#${MODULE}';">Kembali ke Direktori</a>
      </div>
    `;
  }

  async function boot() {
    // Tampilkan status loading awal satu kali saja
    appContainer.innerHTML = `
      <div style="text-align:center; padding: 4rem 1rem;">
        <div class="spinner"></div>
        <p id="loading-status-text" style="color: var(--text-muted); margin-top: 1rem;">Memuat konfigurasi &amp; data wilayah...</p>
      </div>
    `;

    await loadConfig();
    await loadAllGeographicData(function(msg) {
      const statusEl = document.getElementById('loading-status-text');
      if (statusEl) statusEl.innerText = msg;
    });

    // Jika hash belum diatur, set default ke modul utama
    if (!window.location.hash || window.location.hash === '#' || !window.location.hash.startsWith(`#${MODULE}`)) {
      window.location.hash = `#${MODULE}`;
    } else {
      renderRouter();
    }
  }

  boot();
})();
