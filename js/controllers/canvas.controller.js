'use strict'

var gCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function initMeme(imgId) {
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    // addEventListeners();
    updateSelectedId(imgId);
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    if (!gSavedMemes || gSavedMemes.length === 0) gSavedMemes = []
    renderMeme();
}

function renderMeme() {
    const meme = getMeme();
    console.log(meme, 'meme');
    const elImg = getElImgById(meme.selectedImgId)
    document.querySelector('.main-gallery-container').style.display = 'none';
    document.getElementById('about').style.display = 'none';
    document.querySelector('.canvas-page-container').style.display = 'grid';
    console.log(meme, 'meme');
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
    if (meme.lines.length) {
        meme.lines.forEach(line => drawTextLine(line))
        markSelectedTextLine(meme.lines[meme.selectedLineIdx]);
    }
}


// function addEventListeners() {
//     addMouseListeners();
//     addTouchListeners();
// }

// function addMouseListeners() {
//     gCanvas.addEventListener('mousemove', onMove)
//     gCanvas.addEventListener('mousedown', onDown)
//     gCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gCanvas.addEventListener('touchmove', onMove)
//     gCanvas.addEventListener('touchstart', onDown)
//     gCanvas.addEventListener('touchend', onUp)
// }

function onSetText(txt) {
    setLineTxt(txt);
    renderMeme();
}

function onSetColor(color, part) {
    setColor(color, part);
    renderMeme();
}

function onSetFontSize(diff) {
    setFontSize(+diff);
    renderMeme();
}

function onSwitchTextLine() {
    switchTextLine();
    renderMeme();
    document.focus = document.querySelector('input[name="txt"]')
}

function onSetFontFamily(fontFam) {
    setFontFamily(fontFam);
    renderMeme();
}

function onSetAlign(align) {
    setAlign(align);
    renderMeme();
}

function onAddTextLine() {
    addTextLine();
    renderMeme();
}

function onDeleteTextLine() {
    deleteTextLine();
    renderMeme();
}

function onDownloadMeme(elLink) {

    const data = gCanvas.toDataURL()
    elLink.href = data
    console.log(elLink, 'link');
    elLink.download = 'my-meme.jpg'
}

function drawTextLine(line) {
    const x = line.pos.x;
    const y = line.pos.y;
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = line.align;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.stroke;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillStyle = line.fill;
    gCtx.fillText(line.txt, x, y);
    gCtx.strokeText(line.txt, x, y);
}

function markSelectedTextLine(line) {
    const x = line.pos.x;
    const y = line.pos.y;
    console.log(line.pos.x, 'line.pos.x');
    console.log(line.pos.y, 'line.pos.y');
    const lineHeight = line.size + 20;
    const lineWidth = gCtx.measureText(line.txt).width + 20;
    gCtx.beginPath();
    if (line.align === 'start') {
        gCtx.rect(x, y - (lineHeight / 2), lineWidth, lineHeight);
    } else if (line.align === 'center') {
        gCtx.rect(x - (lineWidth / 2), y - (lineHeight / 2), lineWidth, lineHeight);
    } else if (line.align === 'end') {
        gCtx.rect(x - lineWidth, y - (lineHeight / 2), lineWidth, lineHeight);
    }
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.closePath();
}