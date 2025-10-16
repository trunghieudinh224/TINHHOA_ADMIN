/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/
import * as D from '../common/dom.js';
import * as SS from '../common/session.js';
import * as Dialog from '../dialog/dialog.js';
import * as Pr from '../data/param.js';
import * as Mess from '../common/message.js';
/**
    * MOVE PAGE
    * 
    * @param page_name: page's name
*/
export function move(page_name) {
    window.location.href = "../html/" + page_name + ".html";
}


/**
    * BACK TO PREVIOUS PAGE
*/
export function back() {
    history.back();
}


/**
    * CHECK PAGE'S DATA
*/
export function checkPageData() {
    let path = window.location.pathname;
    let page = path.split("/").pop().replace(".html", "");
    if (!SS.checkLoginCookie()) {
        if (page != "login") {
            move("login");
        }
    } else {
        move("dashboard");
    }
}


/**
    * CHECK TOKEN EXITS
*/
export function checkTokenExist() {
    if (SS.getCookie(Pr.TOKEN) === null) {
        Dialog.setDialog("info", Mess.getMess("I00012"), null, null, "Confirm");
        D.getById("con-btn").onclick = function (evt) {
            move("login");
            Dialog.close();
        };
        return false;
    }
    return true;
}


/**
    * CHECK DIFFERENCES IN ARRAY
    * 
    * @param arr1: array 1
    * @param arr2: array 2
*/
export function checkDifferencesInArray(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        const obj1 = arr1[i];
        const obj2 = arr2[i];

        if (JSON.stringify(obj1) !== JSON.stringify(obj2)) {
            return false;
        }
    }

    return true;
}