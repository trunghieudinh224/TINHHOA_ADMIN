
import * as D from './common/dom.js';
import * as Mess from './common/message.js';
import * as CM from './common/common.js';
import * as FM from './common/format.js';
import * as Nav from './common/navbar.js';
import * as Toast from './common/toast.js';
import * as Dialog from './dialog/dialog.js';
import * as Model from './data/model.js';
import * as SS from './common/session.js';
import * as Pr from './data/param.js';

/* view item */
// upload image input elements
const img_upload = D.getById("img-upload");
const saveData_dom = D.getById("saveData");

const web_name = D.getById("web_name");
const address = D.getById("address");
const phone = D.getById("phone");
const mail = D.getById("mail");
const copyright = D.getById("copyright");
const facebook = D.getById("facebook");
const instagram = D.getById("instagram");
const linkedin = D.getById("linkedin");
const behance = D.getById("behance");

const menuGrid = D.getById("menuGrid");
const menu_header_id = D.getById("menu_header_id");
const menu_header_text = D.getById("menu_header_text");
const menu_header_position = D.getById("menu_header_position");

const banner_header = D.getById("banner_header");
const banner_footer = D.getById("banner_footer");
const logo_menu_1 = D.getById("logo_menu_1");
const logo_menu_2 = D.getById("logo_menu_2");
const logo_footer = D.getById("logo_footer");

const btn_reset_slideshow = D.getById("btn_reset_slideshow");

/* variable */
var mData = null;
var companyInfoData, imageData, menuData, socialData;
var menuItemSelected = null;
var currentImg = null;

/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-company",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);

            companyInfoData = structuredClone(mData.lstCompanyInformation);
            imageData = structuredClone(mData.lstImages);
            menuData = structuredClone(mData.lstMenus);
            socialData = structuredClone(mData.lstSocialInformation);

            handleImageUpload();
            renderMenuGrid();
            setData();

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
    * SET DATA
*/
function setData() {
    setCompanyInfo();
    setSocialInfo();
    setImageData();
}


/**
    * SET COMPANY INFORMATION
*/
function setCompanyInfo() {
    web_name.value = CM.getDataByKeyValue(companyInfoData, "website_url");
    address.value = CM.getDataByKeyValue(companyInfoData, "address");
    phone.value = CM.getDataByKeyValue(companyInfoData, "phone");
    mail.value = CM.getDataByKeyValue(companyInfoData, "mail");
    copyright.value = CM.getDataByKeyValue(companyInfoData, "copyright");
}



/**
    * SET SOCIAL DATA
*/
function setSocialInfo() {
    facebook.value = FM.nullToString(socialData.find(obj => obj.social_id.includes("facebook")).social_url);
    instagram.value = FM.nullToString(socialData.find(obj => obj.social_id.includes("instagram")).social_url);
    linkedin.value = FM.nullToString(socialData.find(obj => obj.social_id.includes("linkedin")).social_url);
    behance.value = FM.nullToString(socialData.find(obj => obj.social_id.includes("behance")).social_url);
}


/**
    * UPLOAD IMAGE HANDLE
*/
function handleImageUpload() {
    D.getSelectorAll('.change-img').forEach(img => {
        img.addEventListener('click', () => {
            currentImg = img;
            img_upload.click();
        });
    });

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
                    if (currentImg) {
                        currentImg.src = e.target.result;
                        currentImg = null;
                    }
                };

                reader.readAsDataURL(file);
            });

            img_upload.value = '';
        } catch (exception) {
            console.log(exception);
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    });
}


/**
    * RENDER MENU GRID
*/
function renderMenuGrid() {
    menuGrid.innerHTML = "";
    if (menuData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "Không có dữ liệu";
        menuGrid.append(status);
    }

    menuData.map((image, index) => createMenuGridRow(image, index));
    new Sortable(menuGrid, {
        animation: 150,
        handle: ".mn-item",
        ghostClass: 'blue-background-class',
        onEnd: function (evt) {
            const rows = menuGrid.querySelectorAll(".row");
            rows.forEach((row, index) => {
                row.dataset.pos = index + 1;
                row.querySelector(".mn-pos").textContent = index + 1;
                let itemData = menuData.find(obj => obj.menu_id == row.dataset.id);
                itemData.position = index + 1;
            });
            menuData.sort((a, b) => a.position - b.position);
            if (menuItemSelected != null) {
                setMenuItemInfo(menuData.find(obj => obj.menu_id == menuItemSelected));
            }
            Toast.show(Mess.getMess("I00009"));
        }
    });

    btn_reset_slideshow.onclick = function () {
        Dialog.setDialog("confirm", Mess.getMess("Q00003"), "No", "Reset");
        D.getById("pos-btn").onclick = function (evt) {
            menuData = structuredClone(mData.lstMenus);
            renderMenuGrid();
            Toast.show(Mess.getMess("I00010"));
            Dialog.close();
        };
    };
};


/**
    * ADD ROW FOR SLIDESHOWS GRID
    * 
    * @param image: image data
    * @param index: index
*/
function createMenuGridRow(itemData, index) {
    let row = D.create("div");
    row.setAttribute("class", "row mn-item");
    row.setAttribute("data-id", itemData.menu_id);
    row.setAttribute("data-pos", index + 1);

    let stt = D.create("div");
    stt.setAttribute("class", "col-2 text ta-c mn-pos");
    stt.textContent = index + 1;

    let menu_id = D.create("div");
    menu_id.setAttribute("class", "col-3 text ta-l mn-id");
    menu_id.textContent = FM.nullToString(itemData.menu_id);

    let menu_text = D.create("div");
    menu_text.setAttribute("class", "col-4 text ta-l mn-name");
    menu_text.textContent = FM.nullToString(itemData.menu_name_vi);

    let btn_div = D.create("div");
    btn_div.setAttribute("class", "col-3 col-buttons");

    let btn_edit = D.create("button");
    btn_edit.setAttribute("class", "edit-ns-btn ic-btn");
    btn_edit.setAttribute("data-id", itemData.menu_id);
    let btn_edit_ic = D.create("i");
    btn_edit_ic.setAttribute("class", "fa-solid fa-pen-to-square");
    btn_edit.append(btn_edit_ic);
    btn_div.append(btn_edit);

    let btn_del = D.create("button");
    btn_del.setAttribute("class", "del-img-btn ic-btn");
    btn_del.setAttribute("data-id", itemData.menu_id);
    let btn_del_ic = D.create("i");
    btn_del_ic.setAttribute("class", "fas fa-trash");
    btn_del.append(btn_del_ic);
    btn_div.append(btn_del);

    row.append(stt);
    row.append(menu_id);
    row.append(menu_text);
    row.append(btn_div);
    menuGrid.append(row);

    btn_edit.onclick = function (evt) {
        const rows = D.$dom.querySelectorAll(".mn-item");
        rows.forEach((row) => {
            if (row.dataset.id == this.dataset.id) {
                if (!row.classList.contains("highlight")) {
                    row.classList.add("highlight");
                }
                menuItemSelected = this.dataset.id;
                setMenuItemInfo(menuData.find(obj => obj.menu_id == this.dataset.id));
            } else {
                row.classList.remove("highlight");
            }
        });
    };

    btn_del.onclick = function (evt) {
        menuData = menuData.filter(obj => obj.menu_id != evt.target.parentElement.dataset.id);
        if (menuItemSelected == this.dataset.id) {
            menuItemSelected = null;
        }
        renderMenuGrid();
        setMenuItemInfo(menuItemSelected);
        Toast.show(Mess.getMess("I00009"));
    };
}


/**
    * SET SOCIAL DATA
    * 
    * @param data: item data
*/
function setMenuItemInfo(data) {
    if (data != null) {
        menu_header_id.value = FM.nullToString(data.menu_id);
        menu_header_text.value = FM.nullToString(data.menu_name_vi);
        menu_header_position.value = FM.nullToString(data.position);
    } else {
        menu_header_id.value = "";
        menu_header_text.value = "";
        menu_header_position.value = "";
    }
}


/**
    * SET IMAGE DATA
*/
function setImageData() {
    banner_header.src = FM.nullToString(imageData.find(obj => obj.image_id.includes("banner_header")).image_url);
    banner_footer.src = FM.nullToString(imageData.find(obj => obj.image_id.includes("banner_footer")).image_url);
    logo_menu_1.src = FM.nullToString(imageData.find(obj => obj.image_id.includes("logo_menu")).image_url);
    logo_menu_2.src = FM.nullToString(imageData.find(obj => obj.image_id.includes("logo_menu_scroll")).image_url);
    logo_footer.src = FM.nullToString(imageData.find(obj => obj.image_id.includes("logo_footer")).image_url);
}


/**
    * ONCLICK ACTION 
*/
function onclickAction() {
    saveData_dom.onclick = () => {
        saveData();
    };
}


/**
    * INIT PAGE
*/
function init() {
    Nav.navbarInit();
    getData();
    onclickAction();
}

window.onload = init;