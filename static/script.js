// 1. Мобильное меню
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Вспомогательные функции для работы с цветом
function hexToRgb(hex) {
    if (!hex) return { r: 162, g: 89, b: 255 };
    const cleanHex = hex.replace('#', '');
    return {
        r: parseInt(cleanHex.substring(0, 2), 16) || 0,
        g: parseInt(cleanHex.substring(2, 4), 16) || 0,
        b: parseInt(cleanHex.substring(4, 6), 16) || 0
    };
}

function rgbToHex(r, g, b) {
    const toHex = (c) => Math.round(c).toString(16).padStart(2, '0');
    return `${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// 2. Генератор Градиента Minecraft (с полной поддержкой пробелов)
function generateMinecraftGradient() {
    const textInput = document.getElementById('mcText') || document.getElementById('textInput');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const resultOutput = document.getElementById('mcResult') || document.getElementById('resultOutput');
    const previewBox = document.getElementById('mcPreview') || document.getElementById('previewBox');

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

        // Точная обработка пробелов: сохраняем пробел, не вычисляя цвет
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

        // Формат цветового кода Minecraft: &#RRGGBB
        formattedResult += `&#${hexColor}${char}`;

        // Безопасное отображение спецсимволов в превью
        const safeChar = char === '<' ? '&lt;' : char === '>' ? '&gt;' : char;
        previewHtml += `<span style="color: #${hexColor}">${safeChar}</span>`;
    }

    resultOutput.value = formattedResult;
    if (previewBox) {
        previewBox.innerHTML = previewHtml;
    }
}

// 3. Генератор CSS Градиента
function generateWebGradient() {
    const color1Input = document.getElementById('webColor1') || document.getElementById('color1');
    const color2Input = document.getElementById('webColor2') || document.getElementById('color2');
    const angleInput = document.getElementById('angleInput') || document.getElementById('angle');
    const cssResult = document.getElementById('cssResult') || document.getElementById('resultOutput');
    const webPreview = document.getElementById('webPreview') || document.getElementById('previewBox');

    if (!color1Input || !color2Input) return;

    const color1 = color1Input.value;
    const color2 = color2Input.value;
    const angle = angleInput ? angleInput.value : '90';

    const cssCode = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;

    if (cssResult) cssResult.value = cssCode;
    if (webPreview) webPreview.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

// 4. Универсальная функция копирования
function copyText(elementId, btnElement) {
    const target = document.getElementById(elementId);
    if (!target) return;

    const textToCopy = target.value || target.innerText;
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy).then(() => {
        if (btnElement) {
            const originalText = btnElement.innerText;
            btnElement.innerText = 'Скопировано!';
            setTimeout(() => {
                btnElement.innerText = originalText;
            }, 2000);
        }
    });
}

// 5. Автоматическое связывание событий после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    // Слушатели для Minecraft Градиента
    const mcInputs = ['mcText', 'textInput', 'color1', 'color2'];
    mcInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', generateMinecraftGradient);
    });

    // Слушатели для CSS Градиента
    const webInputs = ['webColor1', 'webColor2', 'angleInput', 'angle'];
    webInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', generateWebGradient);
    });

    // Первичный запуск для отрисовки при открытии
    generateMinecraftGradient();
    generateWebGradient();
});
