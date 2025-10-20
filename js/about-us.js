
import * as D from './common/dom.js';
import * as Mess from './common/message.js';
import * as CM from './common/common.js';
import * as FM from './common/format.js';
import * as Nav from './common/navbar.js';
import * as Toast from './common/toast.js';
import * as Dialog from './dialog/dialog.js';
import * as MID from './dialog/multi-image-dialog.js';
import * as Model from './data/model.js';
import * as SS from './common/session.js';
import * as Pr from './data/param.js';

/* view item */
// upload image input elements
const img_upload = D.getById("img-upload");
const saveData_dom = D.getById("saveData");

// page info
const banner_page = D.getById("banner_page");
const page_description = D.getById("page_description");


const license_image = D.getById("license_image");
const license_title = D.getById("license_title");
const license_type = D.getById("license_type");
const license_agency = D.getById("license_agency");
const license_no = D.getById("license_no");
const license_description = D.getById("license_description");
const license_date = D.getById("license_date");
const license_validity = D.getById("license_validity");


const banner_header = D.getById("banner_header");
const banner_footer = D.getById("banner_footer");
const logo_menu_1 = D.getById("logo_menu_1");
const logo_menu_2 = D.getById("logo_menu_2");
const logo_footer = D.getById("logo_footer");



/* variable */
var mData = null;
var aboutusData, imageData, licenseData, outstandingData, outstandingListData;
var currentImg = null;

/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-about-us",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);

            aboutusData = structuredClone(mData.lstAboutUsInformation);
            imageData = structuredClone(mData.lstImages);
            licenseData = structuredClone(mData.lstLicenseInformation);
            outstandingData = structuredClone(mData.lstOutstandingInformation);
            outstandingListData = structuredClone(mData.lstOutstandings);

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
    * SET DATA
*/
function setData() {
    setPageInfo();
    setLicenseInfo();
}


/**
    * SET PAGE INFORMATION
*/
function setPageInfo() {
    banner_page.src = FM.nullToString(imageData.find(obj => obj.image_id.includes("banner_page")).image_url);
    page_description.value = CM.getDataByKeyValue(aboutusData, "page_description");
}


/**
    * SET LICENSE DATA
*/
function setLicenseInfo() {
    license_image.src = FM.nullToString(imageData.find(obj => obj.image_id.includes("license_image")).image_url);
    license_title.value = CM.getDataByKeyValue(licenseData, "title_license");
    license_type.value = CM.getDataByKeyValue(licenseData, "type_license");
    license_agency.value = CM.getDataByKeyValue(licenseData, "agency_license");
    license_no.value = CM.getDataByKeyValue(licenseData, "no_license");
    license_date.value = CM.getDataByKeyValue(licenseData, "date_license");
    license_validity.value = CM.getDataByKeyValue(licenseData, "validity_license");
    license_description.value = CM.getDataByKeyValue(licenseData, "descripton_license");
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