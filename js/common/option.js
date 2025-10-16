/*
    _ created by: Phi
    _ created date: 2025/07/07
*/
import * as OP_INFO from '../dialog/option_menu/information.js';
import * as OP_PASS from '../dialog/option_menu/change-password.js';
import * as D from '../common/dom.js';
import * as SS from '../common/session.js';
import * as FM from '../common/format.js';
import * as Pr from '../data/param.js';
import * as Dialog from '../dialog/dialog.js';
import * as Mess from '../common/message.js';
import * as Toast from '../common/toast.js';
import * as CM from '../common/common.js';
import * as Nav from '../common/navbar.js';

// Variable DOM
const $dom = document;
const option_info = $dom.getElementById("option_info");
const option_change_pass = $dom.getElementById("option_change_pass");
const logout = $dom.getElementById("option_logout");
const fileImageOption = $dom.getElementById("fileImageOption");
const old_pass = $dom.getElementById("old_pass");
const new_pass = $dom.getElementById("new_pass");
const new_pass_re = $dom.getElementById("new_pass_re");

/* Form information */
const imgInfo = $dom.getElementById("imgInfo");
const nameInfo = $dom.getElementById("nameInfo");
const phoneInfo = $dom.getElementById("phoneInfo");
const emailInfo = $dom.getElementById("emailInfo");

// SET DATA
const setData = () => {
    let user_login = JSON.parse(sessionStorage.getItem(Pr.USER_LOGIN));
    imgInfo.src = user_login.avatar;
    nameInfo.value = FM.nullToString(user_login.name);
    phoneInfo.value = FM.nullToString(user_login.phone);
    emailInfo.value = FM.nullToString(user_login.email);
};

const updateInfoLogin = (data) => {
    let user_login = JSON.parse(sessionStorage.getItem(Pr.USER_LOGIN));
    user_login.avatar = data.avatar;
    user_login.name = data.name;
    user_login.phone = data.phone;
    user_login.email = data.email;
    sessionStorage.setItem(Pr.USER_LOGIN, JSON.stringify(user_login));
};

// SET EVENT
/* OPTION INFORMATION */
option_info.onclick = () => {
    setData();
    OP_INFO.open();
};

imgInfo.onclick = function () {
    fileImageOption.click();
};

fileImageOption.onchange = function (evt) {
    const file = evt.target.files[0];
    if (!file) {
        return;
    }

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const base64String = e.target.result;
        imgInfo.src = base64String;
    };

    reader.onerror = function (e) {
        console.error("Error reading file:", e);
    };

    reader.readAsDataURL(file);
};

const saveDataInfo = () => {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);

    let regex_email = new RegExp('^[\\w.\\-]+@[a-zA-Z0-9\\-]+\\.[a-zA-Z]{2,}$');
    if (!regex_email.test(emailInfo.value)) {
        Dialog.close();
        Toast.show(Mess.getMess("E00013"));
        return;
    }

    let user_login = JSON.parse(sessionStorage.getItem(Pr.USER_LOGIN));
    let sendData = {
        user: {
            name: nameInfo.value,
            phone: phoneInfo.value,
            email: emailInfo.value,
            avatar: user_login.avatar,
            ...(imgInfo.src.includes("data:image") ? { avatar_base64: imgInfo.src } : {}),
        }
    };

    axios.post(Pr.URL_API + "/mgmt-user-information", sendData, {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then(function (response) {
            updateInfoLogin(response.data.user);
            Nav.setUserData();
            Dialog.close();
            Toast.show(Mess.getMess("I00014"));
        })
        .catch(function (error) {
            console.log(error);
        });
};

D.getSelector('#closeInfoDialog').addEventListener('click', OP_INFO.close);
D.getSelectorAll("#infoDialog .cancel-custom")[0].addEventListener('click', OP_INFO.close);
D.getSelectorAll("#infoDialog .save-custom")[0].addEventListener('click', saveDataInfo);

/* OPTION CHANGE PASSWORD */
option_change_pass.onclick = () => {
    OP_PASS.open();
};

const saveDataChangePass = () => {
    if (old_pass.value.length == 0 || new_pass.value.length == 0 || new_pass_re.value.length == 0) {
        Dialog.setDialog("error", Mess.getMess("E00005"), null, null, "Confirm");
        return;
    } else if (old_pass.value == new_pass.value) {
        Dialog.setDialog("error", Mess.getMess("E00010"), null, null, "Confirm");
        return;
    } else if (new_pass.value != new_pass_re.value) {
        Dialog.setDialog("error", Mess.getMess("E00011"), null, null, "Confirm");
        return;
    }

    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    let sendData = {
        user: {
            current_password: old_pass.value,
            new_password: new_pass.value,
        }
    };

    axios.post(Pr.URL_API + "/mgmt-change-password", sendData, {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (response) {
        Dialog.close();
        Toast.show(Mess.getMess("I00013"));
    }).catch(function (error) {
        console.log(error);
        if (error.response.data.code == -3) {
            Dialog.setDialog("error", Mess.getMess("E00012"), null, null, "Confirm");
        }
    });
};

D.getSelector('#closeChangeDialog').addEventListener('click', OP_PASS.close);
D.getSelectorAll("#changeDialog .cancel-custom")[0].addEventListener('click', OP_PASS.close);
D.getSelectorAll("#changeDialog .save-custom")[0].addEventListener('click', saveDataChangePass);

/* LOGOUT */
logout.onclick = () => {
    Dialog.setDialog("confirm", Mess.getMess("Q00001"), "No", "Yes");
    D.getById("pos-btn").onclick = function (evt) {
        axios.post(Pr.URL_API + "/mgmt-logout", {}, {
            headers: {
                'Authorization': SS.getCookie(Pr.TOKEN),
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function (response) {
            SS.removeCookie(Pr.TOKEN);
            Dialog.close();
            CM.move("login");
        }).catch(function (error) {
            console.log(error);
        });
    };
};