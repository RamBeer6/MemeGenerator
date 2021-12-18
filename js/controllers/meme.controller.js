'use strict'

var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d');

function onInit() {
    renderGallery();
    gSavedMemes = loadFromStorage(STORAGE_KEY)
    if (!gSavedMemes || gSavedMemes.length === 0) gSavedMemes = []
}

function renderGallery() {
    const imgs = getImgs();
    var strHTMLs = imgs.map((img) => {
        return `<div class="img" onclick="onClickedImg(${img.id})"><img src="images/${img.id}.jpg" alt=""></div>`
    });
    const elGallery = document.querySelector('.main-gallery-container');
    elGallery.innerHTML = strHTMLs.join('');
}


function onClickedImg(imgId) {
    console.log(imgId, 'imgId');
    initMeme(imgId);
    // resizeCanvas();
}

function onNavToggle() {
    document.body.classList.toggle('menu-open');
}

function onSaveMeme() {
    saveMeme();
}

function onShowMemesPage() {
    setDisplayMemes();
}

function onShowGalleryPage() {
    ShowGalleryPage();
}

function onShowAboutSection() {
    ShowGalleryPage();
}

function renderMemesPage() {
    const imgs = gSavedMemes
    const strHTML = imgs.map((img, idx) => {
        return `<div class="img-container"><img src="${img}"> <br>
         <button class="memes-page-delete-btn" onclick="onDeleteMeme(${idx})">Delete Meme</button>
        </div>`
    });
    document.querySelector('.saved-meme-container').innerHTML = strHTML.join('');
}

function onDeleteMeme(idx) {
    gSavedMemes.splice(idx, 1);
    saveToStorage(STORAGE_KEY, gSavedMemes);
    renderMemesPage();
}