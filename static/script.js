// 1. Переключение мобильного меню
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// 2. Вспомогательные функции цвета (HEX / RGB)
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

// 3. Генератор Minecraft Градиента
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

// 4. Генератор CSS Градиента
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

// 5. Калькулятор Nether Координат
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

// 6. Огромная база Крафтов (Crafting Database)
const craftDatabase = {
    // Оружие и инструменты
    diamond_sword: { name: 'Алмазный меч', yield: 1, res: { 'Алмаз': 2, 'Палка': 1 } },
    diamond_pickaxe: { name: 'Алмазная кирка', yield: 1, res: { 'Алмаз': 3, 'Палка': 2 } },
    diamond_axe: { name: 'Алмазный топор', yield: 1, res: { 'Алмаз': 3, 'Палка': 2 } },
    diamond_shovel: { name: 'Алмазная лопата', yield: 1, res: { 'Алмаз': 1, 'Палка': 2 } },
    shield: { name: 'Щит', yield: 1, res: { 'Железный слиток': 1, 'Любые доски': 6 } },
    bow: { name: 'Лук', yield: 1, res: { 'Палка': 3, 'Нить': 3 } },
    crossbow: { name: 'Арбалет', yield: 1, res: { 'Палка': 3, 'Железный слиток': 1, 'Нить': 2, 'Натяжной датчик': 1 } },
    arrow: { name: 'Стрела', yield: 4, res: { 'Кремень': 1, 'Палка': 1, 'Перо': 1 } },
    fishing_rod: { name: 'Удочка', yield: 1, res: { 'Палка': 3, 'Нить': 2 } },

    // Броня
    diamond_helmet: { name: 'Алмазный шлем', yield: 1, res: { 'Алмаз': 5 } },
    diamond_chestplate: { name: 'Алмазный нагрудник', yield: 1, res: { 'Алмаз': 8 } },
    diamond_leggings: { name: 'Алмазные поножи', yield: 1, res: { 'Алмаз': 7 } },
    diamond_boots: { name: 'Алмазные ботинки', yield: 1, res: { 'Алмаз': 4 } },
    iron_chestplate: { name: 'Железный нагрудник', yield: 1, res: { 'Железный слиток': 8 } },
    turtle_helmet: { name: 'Черепаший панцирь', yield: 1, res: { 'Щиток черепахи': 5 } },

    // Редстоун и механизмы
    piston: { name: 'Поршень', yield: 1, res: { 'Доски': 3, 'Булыжник': 4, 'Железный слиток': 1, 'Редстоун': 1 } },
    sticky_piston: { name: 'Липкий поршень', yield: 1, res: { 'Доски': 3, 'Булыжник': 4, 'Железный слиток': 1, 'Редстоун': 1, 'Сгусток слизи': 1 } },
    dispenser: { name: 'Раздатчик', yield: 1, res: { 'Булыжник': 7, 'Лук': 1, 'Редстоун': 1 } },
    dropper: { name: 'Выбрасыватель', yield: 1, res: { 'Булыжник': 7, 'Редстоун': 1 } },
    repeater: { name: 'Повторитель', yield: 1, res: { 'Камень': 3, 'Редстоун факел': 2, 'Редстоун': 1 } },
    comparator: { name: 'Компаратор', yield: 1, res: { 'Камень': 3, 'Редстоун факел': 3, 'Кварц Нижнего мира': 1 } },
    observer: { name: 'Наблюдатель', yield: 1, res: { 'Булыжник': 6, 'Кварц Нижнего мира': 1, 'Редстоун': 2 } },
    hopper: { name: 'Воронка', yield: 1, res: { 'Железный слиток': 5, 'Сундук': 1 } },
    redstone_torch: { name: 'Редстоун факел', yield: 1, res: { 'Редстоун': 1, 'Палка': 1 } },
    tnt: { name: 'ТНТ (Динамит)', yield: 1, res: { 'Песок / Красный песок': 4, 'Порох': 5 } },

    // Блоки и Мебель
    chest: { name: 'Сундук', yield: 1, res: { 'Доски': 8 } },
    ender_chest: { name: 'Сундук Эндера', yield: 1, res: { 'Обсидиан': 8, 'Око Эндера': 1 } },
    barrel: { name: 'Бочка', yield: 1, res: { 'Доски': 6, 'Деревянная плита': 2 } },
    crafting_table: { name: 'Верстак', yield: 1, res: { 'Доски': 4 } },
    furnace: { name: 'Печь', yield: 1, res: { 'Булыжник': 8 } },
    anvil: { name: 'Наковальня', yield: 1, res: { 'Железный блок': 3, 'Железный слиток': 4 } },
    bookshelf: { name: 'Книжный шкаф', yield: 1, res: { 'Доски': 6, 'Книга': 3 } },
    beacon: { name: 'Маяк', yield: 1, res: { 'Стекло': 5, 'Звезда Нижнего мира': 1, 'Обсидиан': 3 } },
    respawn_anchor: { name: 'Якорь возрождения', yield: 1, res: { 'Плачущий обсидиан': 6, 'Светокамень': 3 } },

    // Еда и Предметы
    golden_apple: { name: 'Золотое яблоко', yield: 1, res: { 'Яблоко': 1, 'Золотой слиток': 8 } },
    enchanted_golden_apple: { name: 'Зачарованное золотое яблоко (1.8)', yield: 1, res: { 'Яблоко': 1, 'Золотой блок': 8 } },
    golden_carrot: { name: 'Золотая морковь', yield: 1, res: { 'Морковь': 1, 'Кусочек золота': 8 } },
    glistering_melon: { name: 'Сверкающий ломтик арбуза', yield: 1, res: { 'Ломтик арбуза': 1, 'Кусочек золота': 8 } },
    eye_of_ender: { name: 'Око Эндера', yield: 1, res: { 'Жемчуг Эндера': 1, 'Огненный порошок': 1 } },
    firework_rocket: { name: 'Фейерверк', yield: 3, res: { 'Порох': 1, 'Бумага': 1 } }
};

function calculateCraft() {
    const itemKey = document.getElementById('craftItem')?.value;
    const amountInput = document.getElementById('craftAmount')?.value;
    const resultBox = document.getElementById('craftResult');

    if (!itemKey || !resultBox) return;

    const targetAmount = Math.max(1, parseInt(amountInput) || 1);
    const itemData = craftDatabase[itemKey];

    if (!itemData) return;

    const craftSets = Math.ceil(targetAmount / itemData.yield);
    const totalYield = craftSets * itemData.yield;

    let html = `<strong style="color: #a259ff;">Для получения ${totalYield} шт. (${itemData.name}):</strong>`;

    for (const [resName, count] of Object.entries(itemData.res)) {
        const totalNeeded = count * craftSets;
        const stacks = Math.floor(totalNeeded / 64);
        const remainder = totalNeeded % 64;

        let stackStr = '';
        if (stacks > 0) {
            stackStr = ` <span style="color:var(--text-muted); font-size:0.85rem;">(${stacks} ст. ${remainder > 0 ? '+ ' + remainder + ' шт.' : ''})</span>`;
        }

        html += `<span style="font-size:0.95rem;">• <strong>${totalNeeded}x</strong> ${resName}${stackStr}</span>`;
    }

    resultBox.innerHTML = html;
}

// 7. Полный База Зельеварения (All Potions & Base Chains)
const potionRecipes = {
    strength: { name: 'Зелье Силы', ing: 'Огненный порошок (Blaze Powder)', base: 'awkward' },
    speed: { name: 'Зелье Скорости', ing: 'Сахар (Sugar)', base: 'awkward' },
    healing: { name: 'Зелье Лечения', ing: 'Сверкающий ломтик арбуза', base: 'awkward' },
    harming: { name: 'Зелье Урона', ing: 'Маринованный паучий глаз', base: 'healing' },
    fire_res: { name: 'Зелье Огнестойкости', ing: 'Магмовый сгусток (Magma Cream)', base: 'awkward' },
    night_vision: { name: 'Зелье Ночного зрения', ing: 'Золотая морковь (Golden Carrot)', base: 'awkward' },
    invisibility: { name: 'Зелье Невидимости', ing: 'Маринованный паучий глаз', base: 'night_vision' },
    swiftness: { name: 'Зелье Прыгучести', ing: 'Лапка кролика (Rabbit\'s Foot)', base: 'awkward' },
    slowness: { name: 'Зелье Замедления', ing: 'Маринованный паучий глаз', base: 'swiftness' },
    poison: { name: 'Зелье Отравления', ing: 'Паучий глаз (Spider Eye)', base: 'awkward' },
    regeneration: { name: 'Зелье Регенерации', ing: 'Слеза гаста (Ghast Tear)', base: 'awkward' },
    water_breathing: { name: 'Зелье Водного дыхания', ing: 'Иглобрюх (Pufferfish)', base: 'awkward' },
    turtle_master: { name: 'Зелье Черепашьего панциря', ing: 'Черепаший панцирь', base: 'awkward' },
    slow_falling: { name: 'Зелье Плавного падения', ing: 'Мембрана фантома (Phantom Membrane)', base: 'awkward' },
    weakness: { name: 'Зелье Слабости', ing: 'Маринованный паучий глаз', base: 'water' }
};

function calculateBrewing() {
    const type = document.getElementById('potionType')?.value;
    const level = document.getElementById('potionLevel')?.value;
    const form = document.getElementById('potionForm')?.value;
    const countInput = document.getElementById('potionCount')?.value;
    const resultBox = document.getElementById('brewingResult');

    if (!type || !resultBox) return;

    const totalBottles = Math.max(1, parseInt(countInput) || 1);
    const brewingRounds = Math.ceil(totalBottles / 3); // 1 варка = 3 бутылочки

    const potion = potionRecipes[type];
    if (!potion) return;

    let steps = [];
    let requiredIngs = {
        'Колба с водой': totalBottles
    };

    const addIng = (name, amount) => {
        requiredIngs[name] = (requiredIngs[name] || 0) + amount;
    };

    // Строим пошаговый порядок варки
    let stepNumber = 1;
    steps.push(`${stepNumber++}. Залейте <strong>${totalBottles} колб(ы) водой</strong> в варочную стойку.`);

    if (potion.base === 'water') {
        steps.push(`${stepNumber++}. Добавьте <strong>${potion.ing}</strong> напрямую в воду ➔ получается <em>Зелье Слабости</em>.`);
        addIng(potion.ing, brewingRounds);
    } else {
        steps.push(`${stepNumber++}. Добавьте <strong>Адский нарост (Nether Wart)</strong> ➔ получается <em>Грубое зелье (Awkward Potion)</em>.`);
        addIng('Адский нарост', brewingRounds);

        if (potion.base !== 'awkward') {
            const basePotion = potionRecipes[potion.base];
            steps.push(`${stepNumber++}. Добавьте <strong>${basePotion.ing}</strong> ➔ получается <em>${basePotion.name}</em>.`);
            addIng(basePotion.ing, brewingRounds);
        }

        steps.push(`${stepNumber++}. Добавьте <strong>${potion.ing}</strong> ➔ получается <em>${potion.name}</em>.`);
        addIng(potion.ing, brewingRounds);
    }

    // Модификаторы уровня/длительности
    if (level === 'long') {
        steps.push(`${stepNumber++}. Добавьте <strong>Редстоун (Redstone)</strong> ➔ увеличение времени действия.`);
        addIng('Редстоун', brewingRounds);
    } else if (level === 'strong') {
        steps.push(`${stepNumber++}. Добавьте <strong>Светящуюся пыль (Glowstone Dust)</strong> ➔ усиливает до II уровня.`);
        addIng('Светящаяся пыль', brewingRounds);
    }

    // Модификаторы формы
    if (form === 'splash') {
        steps.push(`${stepNumber++}. Добавьте <strong>Порох (Gunpowder)</strong> ➔ делает зелье Взрывным (Splash).`);
        addIng('Порох', brewingRounds);
    } else if (form === 'lingering') {
        steps.push(`${stepNumber++}. Добавьте <strong>Порох (Gunpowder)</strong> ➔ делает зелье Взрывным (Splash).`);
        steps.push(`${stepNumber++}. Добавьте <strong>Драконье дыхание (Dragon's Breath)</strong> ➔ делает зелье Оседающим (Lingering).`);
        addIng('Порох', brewingRounds);
        addIng('Драконье дыхание', brewingRounds);
    }

    // Топливо (1 Огненный порошок хватает на 20 варок)
    const blazeFuel = Math.ceil(brewingRounds / 20);
    addIng('Огненный порошок (для топлива)', blazeFuel);

    // Отрисовка
    let html = `<strong style="color:#6366f1;">Инструкция на ${totalBottles} колб (${brewingRounds} заходов варки):</strong>`;
    steps.forEach(step => {
        html += `<span style="font-size:0.92rem;">${step}</span>`;
    });

    html += `<hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); width:100%; margin:6px 0;">`;
    html += `<strong style="font-size:0.88rem; color:var(--text-muted);">Итого ингредиентов:</strong>`;
    
    for (const [ingName, count] of Object.entries(requiredIngs)) {
        html += `<span style="font-size:0.9rem;">• <strong>${count}x</strong> ${ingName}</span>`;
    }

    resultBox.innerHTML = html;
}

// 8. Копирование в буфер
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

// Автозапуск
document.addEventListener('DOMContentLoaded', () => {
    generateMcGradient();
    generateWebGradient();
    calculateCraft();
    calculateBrewing();
    calculatePvpHits();
});
// Advanced PvP Damage & Hit Counter Calculator
function calculatePvpHits() {
    const weapon = document.getElementById('pvpWeapon')?.value;
    const sharp = parseInt(document.getElementById('pvpSharpness')?.value || 0);
    const isCrit = document.getElementById('pvpCrit')?.checked;
    const isSat = document.getElementById('pvpSat')?.checked;
    
    const isSwap = document.getElementById('pvpSwap')?.checked;
    const breach = parseInt(document.getElementById('pvpBreach')?.value || 0);

    const swapBlock = document.getElementById('swapSettings');
    if (swapBlock) swapBlock.style.display = isSwap ? 'block' : 'none';

    // Таблица защиты брони (Armor, Toughness)
    const armorStats = {
        none: { armor: 0, toughness: 0 },
        iron: { armor: 2, toughness: 0 },
        diamond: { armor: 3, toughness: 2 },
        netherite: { armor: 3, toughness: 3 }
    };

    // Базовый урон оружия
    let baseDmg = 8;
    if (weapon === 'diamond_sword') baseDmg = 7;
    if (weapon === 'netherite_axe') baseDmg = 10;
    if (weapon === 'mace') baseDmg = 6;

    // Острота: I = +1, каждые следующие +0.5
    let sharpDmg = sharp > 0 ? 0.5 * sharp + 0.5 : 0;
    let totalBase = baseDmg + sharpDmg;

    // Крит (x1.5 к урону)
    if (isCrit) totalBase *= 1.5;

    // Сбор брони целями
    const hType = armorStats[document.getElementById('helmType')?.value || 'none'];
    const cType = armorStats[document.getElementById('chestType')?.value || 'none'];
    const lType = armorStats[document.getElementById('legType')?.value || 'none'];
    const bType = armorStats[document.getElementById('bootType')?.value || 'none'];

    const armorValues = {
        helm: hType.armor,
        chest: document.getElementById('chestType')?.value === 'iron' ? 6 : (document.getElementById('chestType')?.value === 'none' ? 0 : 8),
        leg: document.getElementById('legType')?.value === 'iron' ? 5 : (document.getElementById('legType')?.value === 'none' ? 0 : 6),
        boot: bType.armor
    };
    let totalArmor = armorValues.helm + armorValues.chest + armorValues.leg + armorValues.boot;
    let totalToughness = hType.toughness + cType.toughness + lType.toughness + bType.toughness;

    // Учёт Breach (каждый уровень урезает 15% брони)
    if (isSwap && breach > 0) {
        let breachReduction = breach * 0.15;
        totalArmor = totalArmor * (1 - breachReduction);
    }

    // Формула поглощения брони
    let armorDefense = Math.max(totalArmor / 5, totalArmor - totalBase / (2 + totalToughness / 4));
    armorDefense = Math.min(20, Math.max(0, armorDefense));
    let damageAfterArmor = totalBase * (1 - armorDefense / 25);

    // Учёт зачарования Защита (Protection I-V)
    let p1 = parseInt(document.getElementById('helmProt')?.value || 0);
    let p2 = parseInt(document.getElementById('chestProt')?.value || 0);
    let p3 = parseInt(document.getElementById('legProt')?.value || 0);
    let p4 = parseInt(document.getElementById('bootProt')?.value || 0);
    let totalEPF = Math.min(20, p1 + p2 + p3 + p4);

    let finalDamagePerHit = damageAfterArmor * (1 - (totalEPF * 0.04));

    // Насыщение (Saturation regen)
    let effectiveDmg = finalDamagePerHit;
    if (isSat) {
        effectiveDmg = Math.max(0.5, finalDamagePerHit - 0.7);
    }

    let hitsToKill = Math.ceil(20 / effectiveDmg);

    const resultBox = document.getElementById('pvpResult');
    if (resultBox) {
        resultBox.innerHTML = `
            <strong style="color: #a259ff; font-size: 1.1rem;">Ударов для убийства: ${hitsToKill} hit(s)</strong>
            <span>• Урон до брони: <strong>${totalBase.toFixed(1)} HP</strong> (${(totalBase/2).toFixed(1)} сердец)</span>
            <span>• Итоговый урон за 1 удар: <strong style="color:#00f0ff;">${finalDamagePerHit.toFixed(2)} HP</strong></span>
            <span>• Защита брони: <strong>${totalArmor.toFixed(1)} Armor</strong> / EPF Чаров: <strong>${totalEPF}/20</strong></span>
            ${isSwap ? `<span style="color:#ff007f;">• Пробитие Breach ${breach}: Броня урезана на ${breach * 15}%</span>` : ''}
            ${isSat ? `<span>• Учтено насыщение: враг восстанавливает здоровье между хитами</span>` : ''}
        `;
    }
}
