/**
 * Pahala Ngalik V1 Engine
 * Architecture: UI -> Parser (Longest Match) -> Character DB -> Image Renderer (RTL)
 */

document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = {
        db: [],             // Character entries loaded from characters.json
        sortedDb: [],       // Sorted by latin length descending for Longest Match
        debugMode: false,   // Debug panel visibility flag
        lastParsedTokens: []// Cache last parsed token result
    };

    // DOM Elements
    const latinInput = document.getElementById('latinInput');
    const outputContainer = document.getElementById('outputContainer');
    const debugSection = document.getElementById('debugSection');
    const debugOutput = document.getElementById('debugOutput');
    const btnClear = document.getElementById('btnClear');
    const btnToggleDebug = document.getElementById('btnToggleDebug');
    const btnCopyDebug = document.getElementById('btnCopyDebug');
    const characterCatalog = document.getElementById('characterCatalog');

    // 1. Initialize Application & Load JSON Database
    async function init() {
        try {
            const response = await fetch('data/characters.json');
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            const data = await response.json();
            
            // Validate & Store Database
            state.db = data.characters || [];
            
            // Prepare Longest Match DB: Sort by length descending, then alphabetically
            state.sortedDb = [...state.db].sort((a, b) => {
                if (b.latin.length !== a.latin.length) {
                    return b.latin.length - a.latin.length;
                }
                return a.latin.localeCompare(b.latin);
            });

            // Populate Catalog Grid
            renderCatalog();

            // Setup Event Listeners
            setupEventListeners();

            // Trigger initial render if input has default text
            handleInput();
        } catch (error) {
            console.error('Gagal memuat database karakter:', error);
            outputContainer.innerHTML = `<span style="color:red;">Error: Gagal memuat data/characters.json. Pastikan aplikasi dijalankan via HTTP server (misal Web Server / Live Server / GitHub Pages).</span>`;
        }
    }

    // 2. Event Listeners Setup
    function setupEventListeners() {
        latinInput.addEventListener('input', handleInput);

        btnClear.addEventListener('click', () => {
            latinInput.value = '';
            handleInput();
            latinInput.focus();
        });

        btnToggleDebug.addEventListener('click', () => {
            state.debugMode = !state.debugMode;
            btnToggleDebug.textContent = `Debug: ${state.debugMode ? 'ON' : 'OFF'}`;
            btnToggleDebug.classList.toggle('btn-outline', !state.debugMode);
            btnToggleDebug.classList.toggle('btn-secondary', state.debugMode);
            debugSection.classList.toggle('hidden', !state.debugMode);
        });

        btnCopyDebug.addEventListener('click', () => {
            if (!debugOutput.textContent) return;
            navigator.clipboard.writeText(debugOutput.textContent)
                .then(() => alert('Hasil debug berhasil disalin ke clipboard!'))
                .catch(err => console.error('Gagal menyalin:', err));
        });
    }

    // 3. Parser Core: Longest Match Algorithm
    function parseLatinText(text) {
        const tokens = [];
        if (!text) return tokens;

        let cursor = 0;
        const lowerText = text.toLowerCase(); // Case-insensitive matching

        while (cursor < lowerText.length) {
            const char = lowerText[cursor];

            // Handle Whitespace (preserve as word breaks)
            if (/\s/.test(char)) {
                tokens.push({
                    type: 'space',
                    raw: char,
                    latin: '[spasi]',
                    matched: true
                });
                cursor++;
                continue;
            }

            // Attempt Longest Match search
            let matched = false;
            for (const entry of state.sortedDb) {
                const targetLen = entry.latin.length;
                const subStr = lowerText.substring(cursor, cursor + targetLen);

                if (subStr === entry.latin.toLowerCase()) {
                    tokens.push({
                        type: 'char',
                        raw: text.substring(cursor, cursor + targetLen),
                        latin: entry.latin,
                        image: entry.image,
                        label: entry.label,
                        matched: true
                    });
                    cursor += targetLen;
                    matched = true;
                    break;
                }
            }

            // Fallback for unmatched character
            if (!matched) {
                tokens.push({
                    type: 'unmatched',
                    raw: text[cursor],
                    latin: text[cursor],
                    matched: false
                });
                cursor++;
            }
        }

        return tokens;
    }

    // 4. Controller Input Handler
    function handleInput() {
        const rawText = latinInput.value;
        const tokens = parseLatinText(rawText);
        state.lastParsedTokens = tokens;

        renderOutput(tokens);
        renderDebug(tokens);
    }

    // 5. Renderer Component: Visual RTL Output
    function renderOutput(tokens) {
        outputContainer.innerHTML = '';

        if (tokens.length === 0) {
            outputContainer.innerHTML = `<span class="placeholder-text">Hasil visual aksara akan muncul di sini...</span>`;
            return;
        }

        // Group tokens into words separated by spaces
        let currentWordDiv = createWordGroupElement();
        outputContainer.appendChild(currentWordDiv);

        tokens.forEach(token => {
            if (token.type === 'space') {
                // New word container for spaces
                currentWordDiv = createWordGroupElement();
                outputContainer.appendChild(currentWordDiv);
            } else if (token.matched) {
                const img = document.createElement('img');
                img.src = `img/${token.image}`;
                img.alt = token.latin;
                img.title = `${token.image} (${token.latin})`;
                img.className = 'char-img';
                // Fallback handling for missing image file
                img.onerror = () => {
                    img.replaceWith(createMissingElement(token.raw, `File gambar tidak ditemukan: ${token.image}`));
                };
                currentWordDiv.appendChild(img);
            } else {
                // Unmatched character placeholder
                const missingSpan = createMissingElement(token.raw, `Karakter belum tersedia: ${token.raw}`);
                currentWordDiv.appendChild(missingSpan);
            }
        });
    }

    function createWordGroupElement() {
        const div = document.createElement('div');
        div.className = 'word-group';
        return div;
    }

    function createMissingElement(rawChar, tooltipText) {
        const span = document.createElement('span');
        span.className = 'missing-char';
        span.textContent = '?';
        span.title = tooltipText;
        return span;
    }

    // 6. Debug Panel Renderer
    function renderDebug(tokens) {
        if (tokens.length === 0) {
            debugOutput.textContent = 'Belum ada input untuk didebug.';
            return;
        }

        const debugLines = tokens.map((t, idx) => {
            if (t.type === 'space') {
                return `${idx}: [spasi]`;
            } else if (t.matched) {
                return `${idx}: ${t.raw} → ${t.image}`;
            } else {
                return `${idx}: ${t.raw} → BELUM TERSEDIA`;
            }
        });

        debugOutput.textContent = debugLines.join('\n');
    }

    // 7. Catalog Renderer
    function renderCatalog() {
        characterCatalog.innerHTML = '';
        state.db.forEach(item => {
            const card = document.createElement('div');
            card.className = 'catalog-item';
            
            const img = document.createElement('img');
            img.src = `img/${item.image}`;
            img.alt = item.latin;
            img.onerror = () => {
                img.style.display = 'none';
            };

            const latin = document.createElement('span');
            latin.className = 'latin-label';
            latin.textContent = item.latin;

            const file = document.createElement('span');
            file.className = 'file-label';
            file.textContent = item.image;

            card.appendChild(img);
            card.appendChild(latin);
            card.appendChild(file);
            characterCatalog.appendChild(card);
        });
    }

    // Run app
    init();
});
