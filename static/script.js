// Функция переключения выпадающего меню
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Конвертация HEX в RGB
function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    return {
        r: parseInt(cleanHex.substring(0, 2), 16),
        g: parseInt(cleanHex.substring(2, 4), 16),
        b: parseInt(cleanHex.substring(4, 6), 16)
    };
}

// Конвертация RGB в HEX
function rgbToHex(r, g, b) {
    const toHex = (c) => Math.round(c).toString(16).padStart(2, '0');
    return `${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Основная функция генерации градиента
function generateGradient() {
    const textInput = document.getElementById('textInput');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const resultOutput = document.getElementById('resultOutput');
    const previewBox = document.getElementById('previewBox');

    if (!textInput || !resultOutput) return;

    const text = textInput.value;
    const color1 = color1Input ? color1Input.value : '#a259ff';
    const color2 = color2Input ? color2Input.value : '#6366f1';

    if (!text) {
        resultOutput.value = '';
        if (previewBox) previewBox.innerHTML = '';
        return;
    }

    const start = hexToRgb(color1);
    const end = hexToRgb(color2);

    let formattedResult = '';
    let previewHtml = '';
    const length = text.length;

    for (let i = 0; i < length; i++) {
        const char = text[i];

        // Сохраняем пробелы без лишних цветовых тегов
        if (char === ' ') {
            formattedResult += ' ';
            previewHtml += ' ';
            continue;
        }

        const factor = length > 1 ? i / (length - 1) : 0;
        const r = start.r + factor * (end.r - start.r);
        const g = start.g + factor * (end.g - start.g);
        const b = start.b + factor * (end.b - start.b);

        const hexColor = rgbToHex(r, g, b);

        // Формат Minecraft (&#RRGGBBТекст)
        formattedResult += `&#${hexColor}${char}`;

        // HTML-превью для отображения на странице
        previewHtml += `<span style="color: #${hexColor}">${char === '<' ? '&lt;' : char === '>' ? '&gt;' : char}</span>`;
    }

    resultOutput.value = formattedResult;
    if (previewBox) {
        previewBox.innerHTML = previewHtml;
    }
}

// Функция копирования результата
function copyResult() {
    const resultOutput = document.getElementById('resultOutput');
    if (!resultOutput || !resultOutput.value) return;

    resultOutput.select();
    navigator.clipboard.writeText(resultOutput.value).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Скопировано!';
            setTimeout(() => {
                copyBtn.innerText = originalText;
            }, 2000);
        }
    });
}

// Навешиваем слушатели событий после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');

    if (textInput) textInput.addEventListener('input', generateGradient);
    if (color1Input) color1Input.addEventListener('input', generateGradient);
    if (color2Input) color2Input.addEventListener('input', generateGradient);

    // Запускаем первичный расчет, если в поле уже есть текст
    generateGradient();
});
    
