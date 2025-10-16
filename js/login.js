/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/
import * as D from '../js/common/dom.js';
import * as CM from '../js/common/common.js';
import * as Pr from '../js/data/param.js';
import * as Dialog from '../js/dialog/dialog.js';
import * as Mess from '../js/common/message.js';
import * as SS from '../js/common/session.js';

/* view item */
const m_username_val = D.getById("username-val");
const m_password_val = D.getById("password-val");
const m_err_mess_area = D.getById("err-mess-area");
const m_remember_ckb = D.getById("remember-ckb");
const m_login_btn = D.getById("login-btn");


/**
    * ONKEYUP ACTION
*/
function onKeyupAction() {
    m_username_val.onkeyup = function (evt) {
        if (evt.key === "Enter") {
            evt.preventDefault();
            if (validateInput()) {
                m_login_btn.click();
            }
        } else {
            validateInput();
        }
    };

    m_password_val.onkeyup = function (evt) {
        if (evt.key === "Enter") {
            evt.preventDefault();
            if (validateInput()) {
                m_login_btn.click();
            }
        } else {
            validateInput();
        }
    };
}


/**
    * ONFOCUS ACTION
*/
function onFocusAction() {
    m_username_val.onfocus = function () {
        m_err_mess_area.style.display = "none";
    };

    m_password_val.onfocus = function () {
        m_err_mess_area.style.display = "none";
    };
}


/**
    * VALIDATE INPUT
*/
function validateInput() {
    let user_length = m_username_val.value.trim().length;
    let pass_length = m_password_val.value.trim().length;
    if ((user_length == 0 || pass_length == 0) || (user_length > 0 && pass_length < 4)) {
        $("#login-btn").addClass("cm-btn-disabled");
        $("#login-btn").attr("disabled", "disabled");
        return false;
    } else {
        $("#login-btn").removeClass("cm-btn-disabled");
        $("#login-btn").removeAttr("disabled");
        return true;
    }
}


/**
    * ONCLICK ACTION
*/
function onClickAction() {
    m_login_btn.onclick = function () {
        if (validateInput() == true) {  // validate without error
            let sendData = {
                username: m_username_val.value.trim(),
                password: m_password_val.value.trim()
            };
            validateUser(sendData);
        } else {    //validate error
            let user_length = m_username_val.value.trim().length;
            let pass_length = m_password_val.value.trim().length;
            if ((user_length == 0 || pass_length == 0) || (user_length > 0 && pass_length < 4)) {
                $("#err-mess-area").css("display", "block");
                $("#err-mess").text(Mess.getMess("E00002"));
            } else {
                $("#err-mess-area").css("display", "none");
                $("#err-mess").text("");
            }
        }
    };
}


/**
    * VALIDATE USER
    * 
    * @param data: user data
*/
function validateUser(data) {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "POST",
        url: Pr.URL_API + "/mgmt-login",
        data: data
    }).then(function (res) {
        try {
            Dialog.close();
            let token = "Bearer " + res.data.token;
            if (res.data.success) {
                $("#err-mess-area").css("display", "none");
                SS.setCookie(Pr.TOKEN, String(token), m_remember_ckb.checked ? 1 : 0.1);
                sessionStorage.setItem(Pr.USER_LOGIN, JSON.stringify(res.data.user));
                CM.move("dashboard");
            } else {
                $("#err-mess-area").css("display", "block");
                $("#err-mess").text(Mess.getMess("E00001"));
            }
        } catch (ex) {
            console.log(ex);
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    }).catch(function (err) {
        console.log(err);
        Dialog.setDialog("error", Mess.getMess("E00004"), null, null, "Confirm");
    });
}


/**
    * CHECK LOGIN USER
*/
function checkLoginUser() {
    if (SS.getCookie(Pr.TOKEN) != null && sessionStorage.getItem(Pr.USER_LOGIN) != null) {
        CM.move("dashboard");
    }
}


/**
    * ONLOAD PAGE
*/
function onLoadPage() {
    checkLoginUser();
    onKeyupAction();
    onFocusAction();
    onClickAction();
    CM.checkPageData();
}

window.onload = onLoadPage;