// URL Dasar Gambar di GitHub Pages
const BASE_IMAGE_URL = 'https://jawabanyumasan.github.io/pahala-ngalik/img/';

// Data Aksara Dasar & Sufiks
const daftarAksara = [
    "p", "b", "h", "ng", "l", "r", "s", "z", 
    "d", "t", "dh", "th", "y", "w", "n", "m", 
    "j", "c", "g", "k", "ny", "a", "i", "u", "e", "o"
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

// Pemetaan Tanda Baca ke Karakter Arab
const arabPunctuation = {
    ',': '،',
    ';': '؛',
    '?': '؟',
    '.': '.',
    '!': '!',
    '-': '-',
    '(': '(',
    ')': ')'
};

// Generate Kombinasi Pola Nama File
let validTokens = [];
daftarAksara.forEach(aksara => {
    daftarSufiks.forEach(sufiks => {
        validTokens.push(aksara + sufiks);
    });
});

validTokens.sort((a, b) => b.length - a.length);

// Elemen DOM
const inputText = document.getElementById('inputText');
const outputArea = document.getElementById('outputArea');
const imgSizeSlider = document.getElementById('imgSizeSlider');
const sizeValue = document.getElementById('sizeValue');
const darkModeToggle = document.getElementById('darkModeToggle');
const saveImgBtn = document.getElementById('saveImgBtn');

// 1. Tokenisasi Kata
function tokenizeWord(word) {
    let result = [];
    let i = 0;
    
    while (i < word.length) {
        let matched = false;
        
        // Angka Latin
        if (/[0-9]/.test(word[i])) {
            result.push({ type: 'number', val: word[i] });
            i++;
            continue;
        }

        // Tanda Baca Arab
        if (arabPunctuation[word[i]]) {
            result.push({ type: 'punct', val: arabPunctuation[word[i]] });
            i++;
            continue;
        }

        // Pencocokan Pola Aksara
        for (let token of validTokens) {
            if (word.toLowerCase().startsWith(token, i)) {
                result.push({ type: 'image', val: token });
                i += token.length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            result.push({ type: 'text', val: word[i] });
            i++;
        }
    }
    return result;
}

// 2. Transliterasi Multi-Paragraf (Urut Kanan ke Kiri)
function transliterate() {
    const text = inputText.value;
    outputArea.innerHTML = '';

    if (!text.trim()) return;

    const paragraphs = text.split('\n');

    paragraphs.forEach(paraText => {
        const paraDiv = document.createElement('div');
        paraDiv.className = 'paragraph';

        const words = paraText.split(' ');
        words.forEach(word => {
            if (word === '') return;

            const wordBox = document.createElement('div');
            wordBox.className = 'word-box';

            const tokens = tokenizeWord(word);
            
            // Masukkan token sesuai urutan pengetikan
            tokens.forEach(token => {
                if (token.type === 'image') {
                    const span = document.createElement('span');
                    span.className = 'char-item';
                    const imgUrl = `${BASE_IMAGE_URL}${token.val}.jpg`;
                    
                    span.innerHTML = `<img src="${imgUrl}" alt="${token.val}" crossorigin="anonymous" onerror="this.onerror=null; this.parentNode.innerText='${token.val}';">`;
                    wordBox.appendChild(span);
                } else {
                    const span = document.createElement('span');
                    span.className = 'text-node';
                    span.textContent = token.val;
                    wordBox.appendChild(span);
                }
            });

            paraDiv.appendChild(wordBox);
        });

        outputArea.appendChild(paraDiv);
    });
}

// 3. Control Slider Ukuran Gambar
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

// 5. Simpan Hasil sebagai Gambar (Selalu Background Putih)
saveImgBtn.addEventListener('click', () => {
    if (!outputArea.hasChildNodes()) {
        alert('Tidak ada teks untuk disimpan!');
        return;
    }

    html2canvas(outputArea, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'aksara-transliteration.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => {
        console.error('Gagal mengunduh gambar:', err);
        alert('Gagal mengunduh gambar.');
    });
});

// 6. Footer Tahun
function setupFooter() {
    const currentYear = new Date().getFullYear();
    const startYear = 2026;
    const yearText = currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`;
    document.getElementById('footerText').textContent = `Created By Wahyudi © ${yearText}`;
}

// Event Listener
inputText.addEventListener('input', transliterate);

document.addEventListener('DOMContentLoaded', () => {
    setupFooter();
    document.documentElement.style.setProperty('--img-size', '28px');
});
