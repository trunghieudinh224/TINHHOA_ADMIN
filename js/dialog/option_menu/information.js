/*
    _ created by: Phi
    _ created date: 2025/07/07
*/
import * as D from '../../common/dom.js';

/* view item */
const dialog = D.getById('infoDialog');
const dialogOverlay = D.getById('dialogOverlay');


/**
    * OPEN
*/
export function open() {
    dialogOverlay.style.display = 'flex';
    dialog.style.display = 'block';
}


/**
    * CLOSE
*/
export function close() {
    dialogOverlay.style.display = 'none';
    dialog.style.display = 'none';
}