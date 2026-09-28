// 1. Data Aksara Dasar & Akhiran/Sufiks
const daftarAksara = [
    "p", "b", "h", "ng", "l", "r", "s", "z", 
    "d", "t", "dh", "th", "y", "w", "n", "m", 
    "j", "c", "g", "k", "ny"
];

const daftarSufiks = [
    "a", "i", "u", "e", "o", 
    "ai", "au", 
    "ar", "ir", "ur", "er", "or", 
    "air", "aur", 
    "ang", "ing", "ung", "eng", "ong", 
    "aing", "aung", 
    "h", "ih", "uh", "eh", "oh", 
    "aih", "auh", 
    ""
];

// 2. Generate Daftar Karakter Otomatis
let database = [];

daftarAksara.forEach(aksara => {
    daftarSufiks.forEach(sufiks => {
        const nama = aksara + sufiks;
        database.push({
            aksara: aksara,
            nama: nama,
            file: `img/${nama}.png` // Sesuaikan ekstensi (.png / .jpg)
        });
    });
});

// 3. Inisialisasi Elemen HTML
const filterAksara = document.getElementById('filterAksara');
const searchInput = document.getElementById('searchInput');
const grid = document.getElementById('imageGrid');

// Populate Dropdown Aksara
if (filterAksara) {
    daftarAksara.forEach(aksara => {
        const option = document.createElement('option');
        option.value = aksara;
        option.textContent = aksara.toUpperCase();
        filterAksara.appendChild(option);
    });
}

// 4. Fungsi Render Galeri
function renderGaleri(items) {
    if (!grid) return;
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = '<div class="no-result">Gambar tidak ditemukan</div>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.file}" alt="${item.nama}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/100?text=Kosong';">
            <p>${item.nama}</p>
        `;
        grid.appendChild(card);
    });
}

// 5. Fungsi Filter & Pencarian
function filterData() {
    const selectedAksara = filterAksara ? filterAksara.value : 'all';
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const hasil = database.filter(item => {
        const matchAksara = selectedAksara === 'all' || item.aksara === selectedAksara;
        const matchKeyword = item.nama.toLowerCase().includes(keyword);
        return matchAksara && matchKeyword;
    });

    renderGaleri(hasil);
}

// Event Listener
if (filterAksara) filterAksara.addEventListener('change', filterData);
if (searchInput) searchInput.addEventListener('input', filterData);

// Jalankan pertama kali saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderGaleri(database);
});
