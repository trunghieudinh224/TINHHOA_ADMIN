/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/
import * as D from '../common/dom.js';
import * as FM from '../common/format.js';

/* view item */
const dialog = D.getById("alert-dialog");
const icon = D.getById("icon-alert-dialog");
const title = D.getById("alert-title");
const mess = D.getById("alert-mess");
const alert_button_area = D.getById("alert-button-area");
const neg_btn = D.getById("neg-btn");
const pos_btn = D.getById("pos-btn");
const con_btn = D.getById("con-btn");

/**
    * SET DIALOG
    * 
    * @param status: dialog status
    * @param message: the message content
    * @param negBtn: negative button text
    * @param posBtn: positive button text
    * @param conBtn: confirm button text
*/
export function setDialog(status, message, negBtn, posBtn, conBtn) {
    alert_button_area.style.display = "flex";
    switch (status) {
        case "load":
            icon.src = "../assets/icon/load-mess-md.png";
            title.style.display = "none";
            alert_button_area.style.display = "none";
            break;
        case "success":
            icon.src = "../assets/icon/success-mess-md.png";
            title.style.display = "none";
            break;
        case "error":
            icon.src = "../assets/icon/error-mess-md.png";
            title.textContent = "Error";
            title.style.display = "block";
            break;
        case "confirm":
            icon.src = "../assets/icon/question-mess-md.png";
            title.textContent = "Confirmation";
            title.style.display = "block";
            break;
        case "info":
            icon.src = "../assets/icon/info-mess-md.png";
            title.textContent = "Information";
            title.style.display = "block";
            break;
    }

    mess.textContent = message;

    neg_btn.style.display = negBtn == null ? "none" : "block";
    neg_btn.textContent = FM.nullToString(negBtn);
    pos_btn.style.display = posBtn == null ? "none" : "block";
    pos_btn.textContent = FM.nullToString(posBtn);
    con_btn.style.display = conBtn == null ? "none" : "block";
    con_btn.textContent = FM.nullToString(conBtn);

    D.getSelectorAll(".al-btn").forEach(btn => {
        btn.addEventListener('click', () => {
            close();
        });
    });

    dialog.style.display = "block";
}


/**
    * CLOSE DIALOG
*/
export function close() {
    dialog.style.display = "none";
}