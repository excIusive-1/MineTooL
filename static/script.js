// Переключение меню
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Конвертация HEX в RGB
function hexToRgb(hex) {
    if (!hex) return { r: 255, g: 0, b: 127 };
    const cleanHex = hex.replace('#', '');
    return {
        r: parseInt(cleanHex.substring(0, 2), 16) || 0,
        g: parseInt(cleanHex.substring(2, 4), 16) || 0,
        b: parseInt(cleanHex.substring(4, 6), 16) || 0
    };
}

// Конвертация RGB в HEX
function rgbToHex(r, g, b) {
    const toHex = (c) => Math.round(c).toString(16).padStart(2, '0');
    return `${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Генератор градиента
function generateMcGradient() {
    const textInput = document.getElementById('mcText');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const boldCheck = document.getElementById('boldCheck');
    const resultOutput = document.getElementById('mcOutput');
    const previewBox = document.getElementById('mcPreview');

    if (!textInput || !resultOutput) return;

    const text = textInput.value;
    const color1 = color1Input ? color1Input.value : '#ff007f';
    const color2 = color2Input ? color2Input.value : '#00f0ff';
    const isBold = boldCheck ? boldCheck.checked : false;

    if (!text) {
        resultOutput.value = '';
        if (previewBox) previewBox.innerHTML = '...';
        return;
    }

    const start = hexToRgb(color1);
    const end = hexToRgb(color2);

    let formattedResult = '';
    let previewHtml = '';
    const length = text.length;

    for (let i = 0; i < length; i++) {
        const char = text[i];

        // Пробелы остаются пробелами
        if (char === ' ') {
            formattedResult += ' ';
            previewHtml += '&nbsp;';
            continue;
        }

        const factor = length > 1 ? i / (length - 1) : 0;
        const r = start.r + factor * (end.r - start.r);
        const g = start.g + factor * (end.g - start.g);
        const b = start.b + factor * (end.b - start.b);

        const hexColor = rgbToHex(r, g, b);
        const boldTag = isBold ? '&l' : '';
        const fontWeight = isBold ? 'font-weight: bold;' : '';

        // Формат Minecraft
        formattedResult += `&#${hexColor}${boldTag}${char}`;

        // Превью
        const safeChar = char === '<' ? '&lt;' : char === '>' ? '&gt;' : char;
        previewHtml += `<span style="color: #${hexColor}; ${fontWeight}">${safeChar}</span>`;
    }

    resultOutput.value = formattedResult;
    if (previewBox) {
        previewBox.innerHTML = previewHtml;
    }
}

// Копирование в буфер
function copyToClipboard(elementId) {
    const input = document.getElementById(elementId);
    if (!input || !input.value) return;

    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
        if (event && event.target) {
            const btn = event.target;
            const originalText = btn.innerText;
            btn.innerText = 'Скопировано!';
            setTimeout(() => {
                btn.innerText = originalText;
            }, 2000);
        }
    });
}

// Автозапуск после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    generateMcGradient();
});
