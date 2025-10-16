/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/
import * as D from '../common/dom.js';
import * as FM from '../common/format.js';

/* view item */
const dialogOverlay = D.getById('dialogOverlay');
const dialog = D.getById('multiImageDialog');
const selectedImage = D.getById('selectedImage');
const imageName = D.getById('imageName');
const closeDialog = D.getById('closeDialog');
const prevImage = D.getById('prevImage');
const nextImage = D.getById('nextImage');

/* variable */
var currentImageIndex = 0;
var imageData;


/**
    * OPEN IMAGE DIALOG
    * 
    * @param index: image index
    * @param data: image data
*/
export function openDialog(index, data) {
    imageData = null;
    currentImageIndex = 0;
    imageData = structuredClone(data);
    if (imageData.length == 1) {
        prevImage.style.display = "none";
        nextImage.style.display = "none";
    } else {
        prevImage.style.display = "block";
        nextImage.style.display = "block";
    }
    currentImageIndex = index;
    updateDialogContent();
    dialogOverlay.style.display = 'flex';
    dialog.style.display = 'block';
    imageDialogHandle();
}


/**
    * UPDATE DIALOG CONTENT
*/
export function updateDialogContent() {
    selectedImage.src = imageData[currentImageIndex].src;
    selectedImage.alt = FM.nullToString(imageData[currentImageIndex].name);
    imageName.textContent = FM.nullToString(imageData[currentImageIndex].name);
}


/**
    * IMAGE DIALOG HANDLE
*/
export function imageDialogHandle() {
    closeDialog.addEventListener('click', () => {
            dialogOverlay.style.display = 'none';
            dialog.style.display = 'none';
    });

    dialogOverlay.addEventListener('click', (e) => {
        if (e.target === dialogOverlay) {
            dialogOverlay.style.display = 'none';
            dialog.style.display = 'none';
        }
    });

    prevImage.onclick = function() {
        currentImageIndex = (currentImageIndex - 1 + imageData.length) % imageData.length;
        updateDialogContent();
    };

    nextImage.onclick = function() {
        currentImageIndex = (currentImageIndex + 1) % imageData.length;
        updateDialogContent();
    };
}