// Data Aksara Dasar & Sufiks
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

// Pemetaan Tanda Baca ke Karakter/Unicode Arab
const arabPunctuation = {
    ',': '،',  // Koma Arab
    ';': '؛',  // Titik koma Arab
    '?': '؟',  // Tanda tanya Arab
    '.': '.',  // Titik
    '!': '!',  // Tanda seru
    '-': '-',
    '(': '(',
    ')': ')'
};

// Generate Semua Kemungkinan Kombinasi Pola Nama File
let validTokens = [];
daftarAksara.forEach(aksara => {
    daftarSufiks.forEach(sufiks => {
        validTokens.push(aksara + sufiks);
    });
});

// Urutkan token berdasarkan panjang (descending) agar token terpanjang diproses lebih dulu
validTokens.sort((a, b) => b.length - a.length);

// Elemen DOM
const inputText = document.getElementById('inputText');
const outputArea = document.getElementById('outputArea');
const imgSizeSlider = document.getElementById('imgSizeSlider');
const sizeValue = document.getElementById('sizeValue');
const darkModeToggle = document.getElementById('darkModeToggle');

// 1. Fungsi Tokenisasi Satu Kata/Suku Kata
function tokenizeWord(word) {
    let result = [];
    let i = 0;
    
    while (i < word.length) {
        let matched = false;
        
        // Cek jika karakter saat ini adalah Angka Latin
        if (/[0-9]/.test(word[i])) {
            result.push({ type: 'number', val: word[i] });
            i++;
            continue;
        }

        // Cek jika karakter saat ini adalah Tanda Baca
        if (arabPunctuation[word[i]]) {
            result.push({ type: 'punct', val: arabPunctuation[word[i]] });
            i++;
            continue;
        }

        // Cek pencocokan suku kata aksara dari pola terpanjang
        for (let token of validTokens) {
            if (word.toLowerCase().startsWith(token, i)) {
                result.push({ type: 'image', val: token });
                i += token.length;
                matched = true;
                break;
            }
        }

        // Jika tidak cocok dengan pola aksara apa pun, tampilkan Teks Latin asli
        if (!matched) {
            result.push({ type: 'text', val: word[i] });
            i++;
        }
    }
    return result;
}

// 2. Fungsi Utama Transliterasi Multi-Paragraf
function transliterate() {
    const text = inputText.value;
    outputArea.innerHTML = '';

    if (!text.trim()) return;

    // Split teks berdasarkan baris/paragraf
    const paragraphs = text.split('\n');

    paragraphs.forEach(paraText => {
        const paraDiv = document.createElement('div');
        paraDiv.className = 'paragraph';

        // Parse kata per kata
        const words = paraText.split(' ');
        words.forEach((word, wIdx) => {
            if (word === '') {
                // Tambahkan spasi antar kata jika ada spasi ganda
                const space = document.createElement('span');
                space.innerHTML = '&nbsp;';
                paraDiv.appendChild(space);
                return;
            }

            const tokens = tokenizeWord(word);
            tokens.forEach(token => {
                if (token.type === 'image') {
                    const span = document.createElement('span');
                    span.className = 'char-item';
                    span.innerHTML = `<img src="img/${token.val}.png" alt="${token.val}" onerror="this.onerror=null; this.parentNode.innerText='${token.val}';">`;
                    paraDiv.appendChild(span);
                } else {
                    // Angka, Tanda Baca Arab, atau Teks Latin Biasa
                    const span = document.createElement('span');
                    span.className = 'text-node';
                    span.textContent = token.val;
                    paraDiv.appendChild(span);
                }
            });

            // Beri spasi antar kata
            if (wIdx < words.length - 1) {
                const space = document.createElement('span');
                space.className = 'text-node';
                space.innerHTML = '&nbsp;';
                paraDiv.appendChild(space);
            }
        });

        outputArea.appendChild(paraDiv);
    });
}

// 3. Pengaturan Ukuran Gambar Dikecilkan/Diperbesar (Slider)
imgSizeSlider.addEventListener('input', (e) => {
    const size = e.target.value;
    sizeValue.textContent = `${size}px`;
    document.documentElement.style.setProperty('--img-size', `${size}px`);
});

// 4. Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// 5. Footer Tahun Otomatis
function setupFooter() {
    const currentYear = new Date().getFullYear();
    const startYear = 2026;
    const yearText = currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`;
    document.getElementById('footerText').textContent = `Created By Wahyudi © ${yearText}`;
}

// Event Listener Input
inputText.addEventListener('input', transliterate);

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    setupFooter();
    // Default ukuran awal (gambar kecil agar muat banyak)
    document.documentElement.style.setProperty('--img-size', '28px');
});
