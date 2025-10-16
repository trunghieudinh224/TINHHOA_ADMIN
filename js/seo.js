/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/
import * as D from '../js/common/dom.js';
import * as Mess from '../js/common/message.js';
import * as FM from '../js/common/format.js';
import * as Nav from '../js/common/navbar.js';
import * as Toast from './common/toast.js';
import * as Dialog from '../js/dialog/dialog.js';
import * as SS from './common/session.js';
import * as Pr from './data/param.js';


/* view item */
// upload image input elements
const img_upload = D.getById("img-upload");

// language selection elements
const languageSelect = D.getSelector('.select-box');
const optionsContainer = D.getSelector('.options');
const options = D.getSelectorAll('.option');
const saveData_dom = D.getById("saveData");
const shop_name_dom = D.getById("shop_name_val");
const shop_logo_dom = D.getById("shop_logo_val");
const postal_code_dom = D.getById("postal_code_val");
const street_address_dom = D.getById("street_address_val");
const address_locality_dom = D.getById("address_locality_val");
const address_region_dom = D.getById("address_region_val");
const address_country_dom = D.getById("address_country_val");
const shop_phone_dom = D.getById("shop_phone_val");
const shop_email_dom = D.getById("shop_email_val");
const area_served_dom = D.getById("area_served_val");
const available_language_dom = D.getById("available_language_val");
const shop_url_dom = D.getById("shop_url_val");
const shop_facebook_dom = D.getById("shop_facebook_val");
const founding_date_dom = D.getById("founding_date_val");
const shop_description_dom = D.getById("shop_description_val");
const title_page_dom = D.getById("title_page_val");
const open_graph_image_dom = D.getById("open_graph_image_val");
const keywords_dom = D.getById("keywords_val");
const locale_dom = D.getById("locale_val");


/* variable */
var mData = null;
var lstSEOInformation;
var selectedLanguage = "vi";
var currentImg = null;


/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-seo-information",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);
            lstSEOInformation = structuredClone(res.data.lstSEOInformation);

            setDatePicker();
            handleImageUpload();
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
    * SET DATEPICKER
*/
function setDatePicker() {
    $(founding_date_dom).datepicker({
        dateFormat: "dd/mm/yy",
        showOtherMonths: true,
        selectOtherMonths: true,
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        onClose: function (date, datepicker) { }
    });
}

/**
    * LANGUAGE SELECTION INIT
*/
function languageSelectionInit() {
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (option.dataset.value != selectedLanguage) {
                Dialog.setDialog("confirm", Mess.getMess("Q00004"), "Không", "Đổi");
                D.getById("pos-btn").onclick = function (evt) {
                    const imgSrc = option.querySelector('img').src;
                    const text = option.querySelector('span').textContent;
                    languageSelect.querySelector('img').src = imgSrc;
                    languageSelect.querySelector('span').textContent = text;
                    optionsContainer.classList.remove('show');
                    selectedLanguage = option.dataset.value;
                    currentImg = null;
                    setData();
                    Dialog.close();
                };
            }
        });
    });
}


/**
    * CONVERT DATA FORMAT
    * 
    * dateStr: date String
*/
function convertDateFormat(dateStr) {
    try {
        const parts = dateStr.split('/');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    } catch (error) {
        console.log(error);
    }
}


/**
    * SET DATA
*/
function setData() {
    shop_name_dom.value = lstSEOInformation.find(obj => obj.key == ("shop_name")).value;
    shop_logo_dom.src = lstSEOInformation.find(obj => obj.key == "shop_logo").value;
    postal_code_dom.value = lstSEOInformation.find(obj => obj.key == "postal_code").value;
    street_address_dom.value = lstSEOInformation.find(obj => obj.key == ("street_address")).value;
    address_locality_dom.value = lstSEOInformation.find(obj => obj.key == ("address_locality")).value;
    address_region_dom.value = lstSEOInformation.find(obj => obj.key == ("address_region")).value;
    address_country_dom.value = lstSEOInformation.find(obj => obj.key == "address_country").value;
    shop_phone_dom.value = lstSEOInformation.find(obj => obj.key == "shop_phone").value;
    shop_email_dom.value = lstSEOInformation.find(obj => obj.key == "shop_email").value;
    area_served_dom.value = lstSEOInformation.find(obj => obj.key == "area_served").value;
    available_language_dom.value = lstSEOInformation.find(obj => obj.key == "available_language").value;
    shop_url_dom.value = lstSEOInformation.find(obj => obj.key == "shop_url").value;
    shop_facebook_dom.value = lstSEOInformation.find(obj => obj.key == "shop_facebook").value;
    $(founding_date_dom).datepicker("setDate", FM.string2Date(FM.getShortDate(lstSEOInformation.find(obj => obj.key == "founding_date").value)));
    shop_description_dom.value = lstSEOInformation.find(obj => obj.key == ("shop_description")).value;
    title_page_dom.value = lstSEOInformation.find(obj => obj.key == ("title_page")).value;
    open_graph_image_dom.src = lstSEOInformation.find(obj => obj.key == "open_graph_image").value;
    keywords_dom.value = lstSEOInformation.find(obj => obj.key == "keywords").value;
    locale_dom.value = lstSEOInformation.find(obj => obj.key == "locale").value;
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
    * PREPARE DATA
*/
function prepareData() {
    let dataSend = structuredClone(lstSEOInformation);
    dataSend.forEach(item => {
        if (item.key == ("shop_name")) {
            item.value = shop_name_dom.value;
        } else if (item.key == "shop_logo") {
            if (shop_logo_dom.src.includes("data:image")) {
                item.value_base64 = shop_logo_dom.src;
            }
        } else if (item.key == "postal_code") {
            item.value = postal_code_dom.value;
        } else if (item.key == ("street_address")) {
            item.value = street_address_dom.value;
        } else if (item.key == ("address_locality")) {
            item.value = address_locality_dom.value;
        } else if (item.key == ("address_region")) {
            item.value = address_region_dom.value;
        } else if (item.key == "address_country") {
            item.value = address_country_dom.value;
        } else if (item.key == "shop_phone") {
            item.value = shop_phone_dom.value;
        } else if (item.key == "shop_email") {
            item.value = shop_email_dom.value;
        } else if (item.key == "area_served") {
            item.value = area_served_dom.value;
        } else if (item.key == "available_language") {
            item.value = available_language_dom.value;
        } else if (item.key == "shop_url") {
            item.value = shop_url_dom.value;
        } else if (item.key == "shop_facebook") {
            item.value = shop_facebook_dom.value;
        } else if (item.key == "founding_date") {
            item.value = convertDateFormat(founding_date_dom.value);
        } else if (item.key == ("shop_description")) {
            item.value = shop_description_dom.value;
        } else if (item.key == ("title_page")) {
            item.value = title_page_dom.value;
        } else if (item.key == "open_graph_image") {
            if (open_graph_image_dom.src.includes("data:image")) {
                item.value_base64 = open_graph_image_dom.src;
            }
        } else if (item.key == "keywords") {
            item.value = keywords_dom.value;
        } else if (item.key == "locale") {
            item.value = locale_dom.value;
        }
    });
    return dataSend;
}

/**
    * SAVE DATA
*/
function saveData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);

    axios.post(Pr.URL_API + "/mgmt-seo-information", { lstSEOInformation: prepareData() }, {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        Dialog.close();
        mData = structuredClone(res.data);
        lstSEOInformation = structuredClone(res.data.lstSEOInformation);
        setData();
        Toast.show(Mess.getMess("I00014"));
    }).catch(function (error) {
        console.log(error);
        Dialog.setDialog("load", Mess.getMess("E00006"), null, null, "Confirm");
    });
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
    languageSelectionInit();
    getData();
    onclickAction();
}

window.onload = init;