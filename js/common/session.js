/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/
import * as D from '../common/dom.js';
import * as CDat from '../data/const-data.js';
import * as Pr from '../data/param.js';
import * as FM from '../common/format.js';

/**
    * SET COOKIE
    * 
    * @param name: cookie's name
    * @param value: cookie's value
    * @param days: retention period
*/
export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    D.$dom.cookie = name + "=" + (value || "") + expires + ";";
}


/**
    * SET COOKIE
    * 
    * @param name: cookie's name
    * @return String
*/
export function getCookie(name) {
    let nameEQ = name + "=";
    let ca = D.$dom.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


/**
    * REMOVE COOKIE
    * 
    * @param name: cookie's name
*/
export function removeCookie(name) {
    D.$dom.cookie = name + '=; Max-Age=0';
}


/**
    * CHECK LOGIN COOKIE
    * @return Boolean
*/
export function checkLoginCookie() {
    let result = true;
    if (sessionStorage.getItem(Pr.USER_OBJ) == null) {
        result = false;
    } else if (getCookie(Pr.USER_OBJ) == null) {
        result = false;
    }
    return result;
}