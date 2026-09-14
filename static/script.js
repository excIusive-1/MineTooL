// 1. Мобильное меню
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Вспомогательные функции цвета
function hexToRgb(hex) {
    if (!hex) return { r: 255, g: 0, b: 127 };
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

// 2. Генератор Minecraft Градиента
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

        formattedResult += `&#${hexColor}${boldTag}${char}`;

        const safeChar = char === '<' ? '&lt;' : char === '>' ? '&gt;' : char;
        previewHtml += `<span style="color: #${hexColor}; ${fontWeight}">${safeChar}</span>`;
    }

    resultOutput.value = formattedResult;
    if (previewBox) {
        previewBox.innerHTML = previewHtml;
    }
}

// 3. Генератор CSS Градиента
function generateWebGradient() {
    const color1Input = document.getElementById('webColor1');
    const color2Input = document.getElementById('webColor2');
    const angleInput = document.getElementById('angleInput');
    const cssOutput = document.getElementById('cssOutput');
    const webPreview = document.getElementById('webPreview');

    if (!color1Input || !color2Input || !cssOutput) return;

    const color1 = color1Input.value;
    const color2 = color2Input.value;
    const angle = angleInput ? angleInput.value : 90;

    const cssCode = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;

    cssOutput.value = cssCode;
    if (webPreview) {
        webPreview.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    }
}

// 4. Калькулятор Nether Координат
function calculateNether(source) {
    const owX = document.getElementById('overworldX');
    const owZ = document.getElementById('overworldZ');
    const nX = document.getElementById('netherX');
    const nZ = document.getElementById('netherZ');

    if (!owX || !owZ || !nX || !nZ) return;

    if (source === 'ow') {
        const x = parseFloat(owX.value);
        const z = parseFloat(owZ.value);
        nX.value = !isNaN(x) ? Math.floor(x / 8) : '';
        nZ.value = !isNaN(z) ? Math.floor(z / 8) : '';
    } else if (source === 'nether') {
        const x = parseFloat(nX.value);
        const z = parseFloat(nZ.value);
        owX.value = !isNaN(x) ? Math.floor(x * 8) : '';
        owZ.value = !isNaN(z) ? Math.floor(z * 8) : '';
    }
}

// 5. Калькулятор Крафтов
const craftDatabase = {
    shield: { name: 'Щит', res: { 'Железный слиток': 1, 'Любые доски': 6 } },
    tnt: { name: 'ТНТ', res: { 'Песок / Красный песок': 4, 'Порох': 5 } },
    piston: { name: 'Поршень', res: { 'Доски': 3, 'Булыжник': 4, 'Железный слиток': 1, 'Редстоун': 1 } },
    sticky_piston: { name: 'Липкий поршень', res: { 'Доски': 3, 'Булыжник': 4, 'Железный слиток': 1, 'Редстоун': 1, 'Сгусток слизи': 1 } },
    diamond_pickaxe: { name: 'Алмазная кирка', res: { 'Алмаз': 3, 'Палка': 2 } },
    golden_apple: { name: 'Золотое яблоко', res: { 'Яблоко': 1, 'Золотой слиток': 8 } },
    anvil: { name: 'Наковальня', res: { 'Железный блок': 3, 'Железный слиток': 4 } },
    repeater: { name: 'Повторитель', res: { 'Камень': 3, 'Редстоун факел': 2, 'Редстоун': 1 } },
    comparator: { name: 'Компаратор', res: { 'Камень': 3, 'Редстоун факел': 3, 'Кварц Верхнего мира': 1 } }
};

function calculateCraft() {
    const itemKey = document.getElementById('craftItem')?.value;
    const amountInput = document.getElementById('craftAmount')?.value;
    const resultBox = document.getElementById('craftResult');

    if (!itemKey || !resultBox) return;

    const amount = Math.max(1, parseInt(amountInput) || 1);
    const itemData = craftDatabase[itemKey];

    if (!itemData) return;

    let html = `<strong style="color: #a259ff;">Для крафта ${amount} шт. (${itemData.name}):</strong>`;
    for (const [resName, count] of Object.entries(itemData.res)) {
        const total = count * amount;
        const stacks = Math.floor(total / 64);
        const rem = total % 64;
        let stackText = stacks > 0 ? ` (${stacks} ст. ${rem > 0 ? '+ ' + rem + ' шт.' : ''})` : '';

        html += `<span style="font-size:0.95rem;">• <strong>${total}x</strong> ${resName}${stackText}</span>`;
    }

    resultBox.innerHTML = html;
}

// 6. Калькулятор Зельеварения
const potionIngredients = {
    strength: 'Огненный порошок (Blaze Powder)',
    speed: 'Сахар (Sugar)',
    healing: 'Somatic Сверкающий арбуз',
    harming: 'Маринованный паучий глаз (К Зелью Лечения/Скорости)',
    fire_res: 'Магмовый сгусток (Magma Cream)',
    invisibility: 'Маринованный паучий глаз (К Зелью Ночного зрения)',
    swiftness: 'Мембрана фантома (Phantom Membrane)',
    poison: 'Паучий глаз (Spider Eye)',
    regeneration: 'Слеза гаста (Ghast Tear)',
    turtle_master: 'Черепаший панцирь (Turtle Shell)'
};

function calculateBrewing() {
    const type = document.getElementById('potionType')?.value;
    const level = document.getElementById('potionLevel')?.value;
    const form = document.getElementById('potionForm')?.value;
    const countInput = document.getElementById('potionCount')?.value;
    const resultBox = document.getElementById('brewingResult');

    if (!type || !resultBox) return;

    const count = Math.max(1, parseInt(countInput) || 1);
    const standsNeeded = Math.ceil(count / 3);
    const mainIng = potionIngredients[type] || 'Основной ингредиент';

    let html = `<strong style="color:#6366f1;">Рецепт на ${count} бутылочек (${standsNeeded} захода/стойки):</strong>`;
    html += `<span>1. Колбы с водой ➔ добавить <strong>Адский нарост</strong> = Неловкое зелье (Awkward)</span>`;
    html += `<span>2. Добавить <strong>${mainIng}</strong></span>`;

    let modifierList = [];
    if (level === 'long') modifierList.push('Редстоун (Redstone) — Увеличение времени');
    if (level === 'strong') modifierList.push('Светящаяся пыль (Glowstone) — Усиление II');

    if (form === 'splash') modifierList.push('Порох (Gunpowder) — Взрывное зелье');
    if (form === 'lingering') {
        modifierList.push('Порох (Gunpowder) — Взрывное зелье');
        modifierList.push('Драконье дыхание (Dragon\'s Breath) — Оседающее зелье');
    }

    modifierList.forEach((mod, idx) => {
        html += `<span>${idx + 3}. Добавить <strong>${mod}</strong></span>`;
    });

    html += `<hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); width:100%; margin:4px 0;">`;
    html += `<strong style="font-size:0.88rem; color:var(--text-muted);">Расходники на ${count} колб:</strong>`;
    html += `<span>• Колбы с водой: ${count} шт.</span>`;
    html += `<span>• Адский нарост: ${standsNeeded} шт.</span>`;
    html += `<span>• Огненный порошок (для варки): ${Math.ceil(standsNeeded / 20)} шт.</span>`;

    resultBox.innerHTML = html;
}

// Автозапуск
document.addEventListener('DOMContentLoaded', () => {
    generateMcGradient();
    generateWebGradient();
    calculateCraft();
    calculateBrewing();
});
