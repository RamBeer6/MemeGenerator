'use strict'

const STORAGE_KEY = 'memeDB'

var gSavedMemes;
var nextLine = true;

var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['funny', 'shocked', 'akward'] },
    { id: 2, url: 'images/2.jpg', keywords: ['baby', 'funny', 'mad'] },
    { id: 3, url: 'images/3.jpg', keywords: ['baby', 'funny', 'happy'] },
    { id: 4, url: 'images/4.jpg', keywords: ['animal', 'baby', 'cute'] }, //Keywords:
    { id: 5, url: 'images/5.jpg', keywords: ['mad', 'funny', 'akward'] },
    { id: 6, url: 'images/6.jpg', keywords: ['dance', 'happy', 'cute'] }, // funny,akward,celeb
    { id: 7, url: 'images/7.jpg', keywords: ['funny', 'mad', 'celeb'] },
    { id: 8, url: 'images/8.jpg', keywords: ['cute', 'baby', 'akward'] }, //baby,animal,dance
    { id: 9, url: 'images/9.jpg', keywords: ['animal', 'shocked', 'akward'] },
    { id: 10, url: 'images/10.jpg', keywords: ['funny', 'happy', 'celeb'] }, //shock,happy,success,mad
    { id: 11, url: 'images/11.jpg', keywords: ['funny', 'mad', 'shocked'] },
    { id: 12, url: 'images/12.jpg', keywords: ['funny', 'animal', 'cute'] }, //scared,love,cute
    { id: 13, url: 'images/13.jpg', keywords: ['animal', 'love', 'cute'] },
    { id: 14, url: 'images/14.jpg', keywords: ['celeb', 'success', 'happy'] },
    { id: 15, url: 'images/15.jpg', keywords: ['mad', 'shocked', 'scared'] },
    { id: 16, url: 'images/16.jpg', keywords: ['happy', 'success', 'dance'] },
    { id: 17, url: 'images/17.jpg', keywords: ['celeb', 'happy'] },
    { id: 18, url: 'images/18.jpg', keywords: ['celeb', 'success', 'akward'] },
    { id: 19, url: 'images/19.jpg', keywords: ['funny', 'cute', 'akward'] },
    { id: 20, url: 'images/20.jpg', keywords: ['celeb', 'success'] },
    { id: 21, url: 'images/21.jpg', keywords: ['funny', 'celeb', 'mad'] },
    { id: 22, url: 'images/22.jpg', keywords: ['funny', 'akward', 'love'] },
    { id: 23, url: 'images/23.jpg', keywords: ['mad', 'shocked', 'scared'] },
    { id: 24, url: 'images/24.jpg', keywords: ['celeb', 'success', 'scared'] },
    { id: 25, url: 'images/25.jpg', keywords: ['funny', 'celeb', 'akward'] },
];

var gCountKeywords = {
    'akward': 7,
    'shocked': 5,
    'funny': 12,
    'baby': 4,
    'mad': 7,
    'happy': 6,
    'animal': 4,
    'cute': 6,
    'dance': 2,
    'celeb': 9,
    'love': 2,
    'success': 5
};

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
        txt: 'insert Your Flafel Here Flafel Here',
        font: 'impact',
        stroke: 'black',
        fill: 'white',
        size: 30,
        align: 'center',
        isDrag: false,
        isSelected: false,

        pos: {
            x: 250,
            y: 50
        },
    }]
};

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function updateSelectedId(imgId) {
    return gMeme.selectedImgId = imgId;
}

function getElImgById(imgId) {
    // console.log(imgId, 'imgId');
    return document.querySelector(`[src="images/${imgId}.jpg"]`);
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setColor(color, part) {
    gMeme.lines[gMeme.selectedLineIdx][part] = color;
}

function setFontSize(diff) {
    if ((gMeme.lines[gMeme.selectedLineIdx].size + diff) === 5 ||
        (gMeme.lines[gMeme.selectedLineIdx].size + diff) === 100) return;
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function switchTextLine(lineIdx) {
    if (lineIdx || lineIdx === 0) gMeme.selectedLineIdx = lineIdx;
    else gMeme.selectedLineIdx = (gMeme.selectedLineIdx === (gMeme.lines.length - 1)) ? 0 : gMeme.selectedLineIdx + 1;
}

function setFontFamily(fontFam) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontFam;
}

function setAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
    let x;
    if (align === 'start') x = 10;
    else if (align === 'center') x = gCanvas.width / 2;
    else if (align === 'end') x = gCanvas.width - 10;
    gMeme.lines[gMeme.selectedLineIdx].pos.x = x;
}

function addTextLine() {
    const line = {
        txt: 'Add New Flafel Here 🥙!',
        font: 'impact',
        stroke: 'black',
        fill: 'white',
        size: 30,
        align: 'center',
        isDrag: false,
        isSelected: false,

        pos: {
            x: gCanvas.width / 2,
            y: gCanvas.height / 2
        }
    };
    if (nextLine) line.pos.y = 400;
    nextLine = false;
    gMeme.lines.push(line);
}

function deleteTextLine() {
    if (!gMeme.lines[gMeme.selectedLineIdx]) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
}

function saveMeme() {
    const meme = new Image()
    meme.src = gCanvas.toDataURL()
    gSavedMemes.push(meme.src)
    saveToStorage(STORAGE_KEY, gSavedMemes)
}

function setDisplayMemes() {
    document.getElementById('memesPage').style.display = 'grid';
    document.querySelector('.main-gallery-container').style.display = 'none';
    document.querySelector('.canvas-page-container').style.display = 'none';
    document.getElementById('about').style.display = 'none';
    renderMemesPage()
}

function ShowGalleryPage() {
    document.querySelector('.main-gallery-container').style.display = 'grid';
    document.getElementById('about').style.display = 'block';
    document.querySelector('.canvas-page-container').style.display = 'none';
    document.getElementById('memesPage').style.display = 'none';
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}


function isLineClicked(clickedPos) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx];
    const posX = currLine.pos.x;
    const posY = currLine.pos.y;
    var textWidth = gCtx.measureText(currLine.txt).width + 20;
    var textHight = currLine.size + 20;
    return Math.abs(clickedPos.x - posX) <= textWidth / 2 && Math.abs(clickedPos.y - posY) <= textHight / 2
}


function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag;
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy

}