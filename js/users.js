/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/07/14
*/
import * as D from './common/dom.js';
import * as CM from './common/common.js';
import * as Pr from './data/param.js';
import * as Mess from './common/message.js';
import * as SS from './common/session.js';
import * as Model from './data/model.js';
import * as FM from './common/format.js';
import * as Nav from './common/navbar.js';
import * as Toast from './common/toast.js';
import * as Dialog from './dialog/dialog.js';

// upload image input elements
const img_upload = D.getById("img-upload");

/* view item */
const record_info = D.getById("recordInfo");
const user_list = D.getById('userList');
const save_btn = D.getById('saveBtn');
const reset_btn = D.getById('resetBtn');

const user_img_val = D.getById('user_img');
const username_val = D.getById('username_val');
const user_name_val = D.getById('user_name_val');
const user_note_val = D.getById('user_note_val');
const btn_reset_user = D.getById('btn_reset_user');
const btn_clear_img = D.getById('btn_clear_img');
const btn_cancel = D.getById('btn_cancel');
const btn_save = D.getById('btn_save');

/* variable */
var mData = null;
var userData = null;
var editingUser = new Model.User();
var sendData = null;

/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-users",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);
            userData = structuredClone(mData.lstUsers);
            renderTable();
            handleImageUpload();

            Dialog.close();
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
    * UPDATE RECORD INFO (e.g., 10/50)
*/
function updateRecordInfo() {
    record_info.textContent = "Total record: " + userData.length;
}


/**
    * RENDER TABLE FOR A SPECIFIC PAGE
*/
function renderTable() {
    user_list.innerHTML = "";
    if (userData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "No data available";
        user_list.append(status);
    }

    // create user list view
    userData.map((user, index) => createsUserRow(user, index));
    updateRecordInfo();
};


/**
    * ADD ROW FOR USER GRID
    * 
    * @param itemData: user data
    * @param index: index
*/
function createsUserRow(itemData, index) {
    let row = D.create("div");
    row.setAttribute("class", "cg-row");
    row.setAttribute("data-id", itemData.user_no);
    row.setAttribute("data-no", index + 1);

    let role = "Staff";
    if (itemData.role == 1) {
        role = "Admin";
    }

    let disabled = itemData.user_no == 1 ? "disabled" : "";

    row.innerHTML = `
        <div class="text ta-c cg-item cg-no">
            <div class="text ta-c w-100">${index + 1}</div>
        </div>
        <div class="text cg-item cg-name">
            <div class="text ta-l w-100">${FM.nullToString(itemData.name)}</div>
        </div>
        <div class="text cg-item cg-avatar">
            <div class="text ta-c w-100">
                <img class="user-avatar" src="${FM.nullToString(itemData.avatar)}" />
            </div>
        </div>
        <div class="text cg-item cg-role">
            <div class="text ta-c w-100">${role}</div>
        </div>
        <div class="text cg-item cg-note">
            <div class="text ta-l w-100">${FM.nullToString(itemData.note)}</div>
        </div>
        <div class="col-buttons cg-item cg-btn">
            <button class="edit-cg-btn ic-btn" data-id="${itemData.user_no}" ${disabled}>
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="del-cg-btn ic-btn" data-id="${itemData.user_no}" ${disabled}>
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    user_list.append(row);

    // edit category button click event
    row.querySelector(".edit-cg-btn").onclick = function (evt) {
        this.disabled = true;
        const rows = D.$dom.querySelectorAll(".cg-row");
        rows.forEach((row) => {
            let btn = row.querySelector(".edit-cg-btn");
            if (btn.dataset.id != parseInt(this.dataset.id) && btn.dataset.id != 1) {
                btn.disabled = false;
            }
        });

        let data = userData.find(obj => obj.user_no == parseInt(this.dataset.id));
        editingUser = structuredClone(data);
        if (data != null) {
            setUserItemData(data);
        }
    };

    // delete user button click event
    row.querySelector(".del-cg-btn").onclick = function (evt) {
        userData = userData.filter(row => row.user_no !== parseInt(this.dataset.id));
        resetUserForm();
        renderTable();
        Toast.show(Mess.getMess("I00009"));
    };
}

/**
    * SET USER ITEM DATA
    * 
    * @param data: user data
*/
function setUserItemData(data) {
    let img_src = "../assets/icon/image_default.png";
    if (data.avatar != null && data.avatar.length > 0) {
        img_src = data.avatar;
        btn_clear_img.style.display = "block";
    } else {
        btn_clear_img.style.display = "none";
    }
    user_img_val.src = img_src;
    username_val.value = FM.nullToString(data.username);
    username_val.disabled = "true";
    user_name_val.value = FM.nullToString(data.name);
    user_note_val.value = FM.nullToString(data.note);
    setUserForm(1);
}

/**
    * SET USER FORM
    * 
    * @param mode: 0 - create, 1 - edit
*/
function setUserForm(mode) {
    if (mode == 0) {
        btn_cancel.onclick = function () {
            resetUserForm();
            editingUser = new Model.User();
            btn_save.textContent = "Create";
        };
    } else {
        btn_cancel.textContent = "Cancel";
        btn_cancel.onclick = function () {
            const rows = D.$dom.querySelectorAll(".cg-row");
            rows.forEach((row) => {
                let btn = row.querySelector(".edit-cg-btn");
                btn.disabled = false;
            });
            editingUser = new Model.User();
            resetUserForm();
            btn_save.textContent = "Create";
        };

        btn_save.textContent = "Save";
        btn_save.onclick = function () {
            saveUserForm();
            btn_save.textContent = "Create";
        };
    }

    btn_reset_user.onclick = function (evt) {
        if (editingUser.user_no == 0) {
            resetUserForm();
        } else {
            Dialog.setDialog("confirm", Mess.getMess("Q00003"), "Cancel", "Reset");

            D.getById("neg-btn").onclick = function (evt) {
                Dialog.close();
            };
            D.getById("pos-btn").onclick = function (evt) {
                editingUser = structuredClone(userData.find(obj => obj.user_no == editingUser.user_no));
                setUserItemData(editingUser);
                Toast.show(Mess.getMess("I00009"));
                Dialog.close();
            };
        }
    };
}

/**
    * HANDLE RESET USER FORM
*/
function resetUserForm() {
    user_img_val.src = "../assets/icon/image_default.png";
    username_val.value = "";
    username_val.disabled = false;
    user_name_val.value = "";
    user_note_val.value = "";
    btn_cancel.textContent = "Clear";
    btn_clear_img.style.display = "none";
}

/**
    * PREPARE USER ITEM DATA
*/
function prepareUserItemData() {
    if (FM.nullToString(username_val.value).length == 0 ||
        FM.nullToString(user_name_val.value).length == 0 ||
        (editingUser.avatar == null && editingUser.avatar_base64 == null)) {
        Dialog.setDialog("load", Mess.getMess("E00005"), null, null, "Confirm");
        return false;
    }

    editingUser.username = FM.nullToString(username_val.value);
    editingUser.name = FM.nullToString(user_name_val.value);
    editingUser.note = FM.nullToString(user_note_val.value);

    sendData = {
        user: editingUser
    };
    return true;
}

/**
    * HANDLE SAVE USER FORM
*/
function saveUserForm() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    if (prepareUserItemData() == false) {
        return;
    }
    axios.post(Pr.URL_API + "/mgmt-users", sendData, {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            Dialog.close();
            mData = structuredClone(res.data);
            userData = structuredClone(mData.lstUsers);
            renderTable();
            resetUserForm();
            Toast.show(Mess.getMess("I00014"));
        } catch (error) {
            console.log(error);
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    }).catch(function (error) {
        console.log(error);
        if (error.response.data.code == -3) {
            Dialog.setDialog("error", error.response.data.message, null, null, "Confirm");
        } else {
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    });
}

/**
    * HANDLE RESET CATEGORY LIST
*/
function handleReset() {
    Dialog.setDialog("confirm", Mess.getMess("Q00003"), "Cancel", "Reset");
    D.getById("neg-btn").onclick = function (evt) {
        Dialog.close();
    };
    D.getById("pos-btn").onclick = function (evt) {
        userData = structuredClone(mData.lstUsers);
        renderTable();
        Toast.show(Mess.getMess("I00009"));
        Dialog.close();
    };
}

/**
    * UPLOAD IMAGE HANDLE
*/
function handleImageUpload() {
    user_img_val.onclick = function () {
        img_upload.click();
    };

    img_upload.addEventListener('change', (event) => {
        try {
            const files = event.target.files;

            if (files.length === 0) {
                Dialog.setDialog("info", Mess.getMess("I00001"), null, null, "OK");
                return;
            }

            Array.from(files).forEach((file) => {
                const reader = new FileReader();

                reader.onload = function (e) {
                    editingUser.avatar_base64 = e.target.result;
                    user_img_val.src = e.target.result;
                    btn_clear_img.style.display = "block";
                };

                reader.readAsDataURL(file);
            });

            img_upload.value = '';
        } catch (exception) {
            console.log(exception);
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    });

    btn_clear_img.onclick = function (evt) {
        user_img_val.src = "../assets/icon/image_default.png";
        editingUser.avatar = null;
        editingUser.avatar_base64 = null;
        btn_clear_img.style.display = "none";
    };
}

/**
    * HANDLE SAVE CATEGORY LIST
*/
function handleSave() {
    sendData = {
        lstUsers: userData
    };

    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios.post(Pr.URL_API + "/mgmt-users", sendData, {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            Dialog.close();
            mData = structuredClone(res.data);
            userData = structuredClone(mData.lstUsers);
            renderTable();
            resetUserForm();
            sendData = null;
            Toast.show(Mess.getMess("I00014"));
        } catch (error) {
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
            console.log(error);
        }
    }).catch(function (error) {
        console.log(error);
        if (error.response.data.code == -3) {
            Dialog.setDialog("error", error.response.data.message, null, null, "Confirm");
        } else {
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    });
}

/**
    * ONCLICK ACTION
*/
function onclickAction() {
    btn_cancel.onclick = function () {
        resetUserForm();
    };

    btn_save.onclick = function () {
        saveUserForm();
    };

    save_btn.addEventListener('click', handleSave);
    reset_btn.addEventListener('click', handleReset);
}

/**
    * INIT PAGE
*/
function init() {
    Nav.navbarInit();
    if (CM.checkTokenExist()) {
        getData();
        onclickAction();
    }
}

window.onload = init;;