function generateMinecraftGradient(text, startColor, endColor) {
    if (!text) return '';

    // Преобразуем HEX в RGB
    const hexToRgb = (hex) => {
        const cleanHex = hex.replace('#', '');
        return {
            r: parseInt(cleanHex.substring(0, 2), 16),
            g: parseInt(cleanHex.substring(2, 4), 16),
            b: parseInt(cleanHex.substring(4, 6), 16)
        };
    };

    const rgbToHex = (r, g, b) => {
        const toHex = (c) => Math.round(c).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const start = hexToRgb(startColor);
    const end = hexToRgb(endColor);

    let result = '';
    const length = text.length;

    for (let i = 0; i < length; i++) {
        const char = text[i];

        // Если символ — пробел, просто добавляем его без цвета
        if (char === ' ') {
            result += ' ';
            continue;
        }

        // Вычисляем интерполяцию цвета для видимых символов
        const factor = length > 1 ? i / (length - 1) : 0;
        const r = start.r + factor * (end.r - start.r);
        const g = start.g + factor * (end.g - start.g);
        const b = start.b + factor * (end.b - start.b);

        const colorHex = rgbToHex(r, g, b);

        // Для формата &#RRGGBB (или меняй под нужный формат вашего скрипта)
        result += `&#${colorHex.replace('#', '')}${char}`;
    }

    return result;
}

function toggleMenu() {
    const nav = document.getElementById('navMenu');
    if (nav) {
        nav.classList.toggle('active');
    }
}
