function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

function convertCoords(type) {
    const x = parseFloat(document.getElementById('coordX').value) || 0;
    const z = parseFloat(document.getElementById('coordZ').value) || 0;
    
    if (type === 'toNether') {
        document.getElementById('resX').innerText = (x / 8).toFixed(1);
        document.getElementById('resZ').innerText = (z / 8).toFixed(1);
    } else {
        document.getElementById('resX').innerText = (x * 8).toFixed(1);
        document.getElementById('resZ').innerText = (z * 8).toFixed(1);
    }
}

function calcStacks() {
    const blocks = parseInt(document.getElementById('totalBlocks').value) || 0;
    const stacks = Math.floor(blocks / 64);
    const rem = blocks % 64;
    document.getElementById('stackResult').innerText = `${stacks} стак(ов) и ${rem} блок(ов)`;
}

function generateMcGradient() {
    const text = document.getElementById('mcText').value;
    const c1 = document.getElementById('color1').value;
    const c2 = document.getElementById('color2').value;
    const isBold = document.getElementById('boldCheck').checked ? '&l' : '';
    
    if (!text) return;

    const hexToRgb = hex => hex.match(/\w\w/g).map(x => parseInt(x, 16));
    const rgb1 = hexToRgb(c1);
    const rgb2 = hexToRgb(c2);

    let output = "";
    let previewHtml = "";

    for (let i = 0; i < text.length; i++) {
        let ratio = text.length > 1 ? i / (text.length - 1) : 0;
        let r = Math.round(rgb1[0] + ratio * (rgb2[0] - rgb1[0]));
        let g = Math.round(rgb1[1] + ratio * (rgb2[1] - rgb1[1]));
        let b = Math.round(rgb1[2] + ratio * (rgb2[2] - rgb1[2]));

        let hexR = r.toString(16).padStart(2, '0');
        let hexG = g.toString(16).padStart(2, '0');
        let hexB = b.toString(16).padStart(2, '0');

        output += `&#${hexR}${hexG}${hexB}${isBold}${text[i]}`;
        previewHtml += `<span style="color: rgb(${r},${g},${b}); ${isBold ? 'font-weight:bold;' : ''}">${text[i]}</span>`;
    }

    document.getElementById('mcOutput').value = output;
    document.getElementById('mcPreview').innerHTML = previewHtml;
}

function updateWebGradient() {
    const c1 = document.getElementById('webC1').value;
    const c2 = document.getElementById('webC2').value;
    const angle = document.getElementById('webAngle').value;
    
    const gradStr = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
    document.getElementById('webPreview').style.background = gradStr;
    document.getElementById('webCssCode').value = `background: ${gradStr};`;
}

function copyToClipboard(id) {
    const el = document.getElementById(id);
    el.select();
    document.execCommand('copy');
    alert('Скопировано в буфер обмена!');
}

