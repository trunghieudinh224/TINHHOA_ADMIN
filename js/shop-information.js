
import * as D from '../js/common/dom.js';
import * as Mess from '../js/common/message.js';
import * as FM from '../js/common/format.js';
import * as Nav from '../js/common/navbar.js';
import * as Toast from './common/toast.js';
import * as Dialog from '../js/dialog/dialog.js';
import * as MID from './dialog/multi-image-dialog.js';
import * as Model from './data/model.js';
import * as SS from './common/session.js';
import * as Pr from './data/param.js';

/* view item */
// upload image input elements
const img_upload = D.getById("img-upload");
const multi_img_upload = D.getById("multi-img-upload");

const saveData_dom = D.getById("saveData");

// Shop information elements
const logo = D.getById("shop_logo_val");
const icon_logo = D.getById("shop_icon_logo_val");
const text_logo = D.getById("shop_text_logo_val");
const logo_with_text = D.getById("shop_logo_with_text_val");
const shop_name = D.getById("shop_name_val");
const shop_phone = D.getById("shop_phone_val");
const shop_email = D.getById("shop_email_val");
const shop_address = D.getById("shop_address_val");
const google_map = D.getById("google_map_val");
const facebook = D.getById("facebook_val");
const instagram = D.getById("instagram_val");
const website = D.getById("website_val");

// Shop introduction elements
const shop_introduction_img = D.getById("shop_introduction_image_val");
const shop_introduction_title = D.getById("shop_introduction_title_val");
const shop_introduction_content = D.getById("shop_introduction_content_val");

// Slideshows elements
const imageSlide = D.getById('imageSlide');
const shopImageGrid = D.getById("shopImageGrid");
const slideshows_title = D.getById('slideshows_title_val');
const slideshows_content = D.getById('slideshows_content_val');
const btn_add_slideshow = D.getById("btn_add_slideshow");
const btn_reset_slideshow = D.getById("btn_reset_slideshow");

/* variable */
var mData = null;
var shopIntroductionData, slideshowsData, shopInformationData;
var lastSlideshowNo;
var lastSlideshowNoDefault;
var currentImg = null;

/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-shop",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);

            shopInformationData = structuredClone(mData.lstShopInformation);
            slideshowsData = structuredClone(mData.lstSlideshows);
            shopIntroductionData = structuredClone(mData.lstShopIntroductions);
            lastSlideshowNo = structuredClone(mData.lastSlideshowNo);
            lastSlideshowNoDefault = structuredClone(mData.lastSlideshowNo);

            handleImageUpload();
            renderSlideshowsGrid();
            createSlideshows();
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
    setShopIntroduction();
}


/**
    * SET SHOP INFORMATION
*/
function setCompanyInfo() {
    let shop_logo = shopInformationData.find(obj => obj.key.includes("shop_logo")).value;
    let shop_icon_logo = shopInformationData.find(obj => obj.key.includes("shop_icon_logo")).value;
    let shop_text_logo = shopInformationData.find(obj => obj.key.includes("shop_text_logo")).value;
    let shop_logo_with_text = shopInformationData.find(obj => obj.key.includes("shop_logo_with_text")).value;

    logo.src = shop_logo != null ? shop_logo : "../assets/icon/image_default.png";
    icon_logo.src = shop_icon_logo != null ? shop_icon_logo : "../assets/icon/image_default.png";
    text_logo.src = shop_text_logo != null ? shop_text_logo : "../assets/icon/image_default.png";
    logo_with_text.src = shop_logo_with_text != null ? shop_logo_with_text : "../assets/icon/image_default.png";
    shop_name.value = shopInformationData.find(obj => obj.key.includes("shop_name")).value;
    shop_phone.value = shopInformationData.find(obj => obj.key.includes("shop_phone")).value;
    shop_email.value = shopInformationData.find(obj => obj.key.includes("shop_email")).value;
    shop_address.value = shopInformationData.find(obj => obj.key.includes("shop_address")).value;
    google_map.value = shopInformationData.find(obj => obj.key.includes("ggmaps_url")).value;
    facebook.value = shopInformationData.find(obj => obj.key.includes("facebook_url")).value;
    instagram.value = shopInformationData.find(obj => obj.key.includes("instagram_url")).value;
    website.value = shopInformationData.find(obj => obj.key.includes("website_url")).value;
}

/**
    * SET SHOP INTRODUCTION DATA
*/
function setShopIntroduction() {
    let img_src = shopIntroductionData.find(obj => obj.key.includes("image_path")).value;

    shop_introduction_img.src = img_src != null ? img_src : "../assets/icon/image_default.png";
    shop_introduction_title.value = FM.nullToString(shopIntroductionData.find(obj => obj.key.includes("title")).value).replaceAll("<br>", "\n");
    shop_introduction_content.value = FM.nullToString(shopIntroductionData.find(obj => obj.key.includes("content")).value).replaceAll("<br>", "\n");
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


    btn_add_slideshow.addEventListener("click", () => {
        multi_img_upload.click();
    });

    multi_img_upload.addEventListener('change', (event) => {
        try {

            const files = event.target.files;

            if (files.length === 0) {
                Dialog.setModal("info", Mess.getMess("I00001"), null, null, "Confirm");
                return;
            }

            Array.from(files).forEach((file, index) => {
                const reader = new FileReader();

                reader.onload = function (e) {
                    let newItem = new Model.SlideshowImage();
                    newItem.slideshow_no = lastSlideshowNo + 1;
                    lastSlideshowNo++;
                    newItem.slideshow_base64 = e.target.result;
                    newItem.slideshow_position = 1;
                    slideshowsData.unshift(newItem);
                    renderSlideshowsGrid();
                    createSlideshows();
                    const rows = shopImageGrid.querySelectorAll(".row");
                    rows.forEach((row, index) => {
                        row.dataset.pos = index + 1;
                        let itemData = slideshowsData.find(obj => obj.slideshow_no == row.dataset.id);
                        itemData.slideshow_position = index + 1;
                    });
                    slideshowsData.sort((a, b) => a.slideshow_position - b.slideshow_position);
                };

                reader.readAsDataURL(file);
            });

            multi_img_upload.value = '';
        } catch (exception) {
            console.log(exception);
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    });
}

/**
    * RENDER SLIDESHOWS GRID
*/
function renderSlideshowsGrid() {
    shopImageGrid.innerHTML = "";
    if (slideshowsData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "No data available";
        shopImageGrid.append(status);
    }

    slideshowsData.map((image, index) => createSlideshowsRow(image, index));
    new Sortable(shopImageGrid, {
        animation: 150,
        handle: ".ci-item",
        ghostClass: 'blue-background-class',
        onEnd: function (evt) {
            const rows = shopImageGrid.querySelectorAll(".row");
            rows.forEach((row, index) => {
                row.dataset.pos = index + 1;
                let itemData = slideshowsData.find(obj => obj.slideshow_no == row.dataset.id);
                itemData.slideshow_position = index + 1;
            });
            slideshowsData.sort((a, b) => a.slideshow_position - b.slideshow_position);
            createSlideshows();
            Toast.show(Mess.getMess("I00009"));
        }
    });

    btn_reset_slideshow.onclick = function () {
        Dialog.setDialog("confirm", Mess.getMess("Q00003"), "No", "Reset");
        D.getById("pos-btn").onclick = function (evt) {
            slideshowsData = structuredClone(mData.lstSlideshows);
            renderSlideshowsGrid();
            createSlideshows();
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
function createSlideshowsRow(image, index) {
    let image_src = "../assets/icon/image_default.png";
    if (FM.nullToString(image.slideshow_base64).length > 0) {
        image_src = image.slideshow_base64;
    } else if (FM.nullToString(image.slideshow_url).length > 0) {
        image_src = image.slideshow_url;
    }

    let row = D.create("div");
    row.setAttribute("class", "row ci-item");
    row.setAttribute("data-id", image.slideshow_no);
    row.setAttribute("data-pos", index + 1);

    let stt = D.create("div");
    stt.setAttribute("class", "col-1 text ta-c ci-pos");
    let stt_ic = D.create("i");
    stt_ic.setAttribute("class", "fa-solid fa-up-down-left-right");
    stt.append(stt_ic);

    let img_div = D.create("div");
    img_div.setAttribute("class", "col-4  ci-img");
    let img = D.create("img");
    img.setAttribute("class", "img-wh");
    img.setAttribute("alt", "Slideshow");
    img.src = image_src;
    img_div.append(img);

    let btn_div = D.create("div");
    btn_div.setAttribute("class", "col-5 col-buttons");
    let btn_del = D.create("button");
    btn_del.setAttribute("class", "del-img-btn ic-btn");
    btn_del.setAttribute("data-id", image.slideshow_no);
    let btn_del_ic = D.create("i");
    btn_del_ic.setAttribute("class", "fas fa-trash");
    btn_del.append(btn_del_ic);
    btn_div.append(btn_del);

    row.append(stt);
    row.append(img_div);
    row.append(btn_div);
    shopImageGrid.append(row);

    btn_del.onclick = function (evt) {
        slideshowsData = slideshowsData.filter(obj => obj.slideshow_no != evt.target.parentElement.dataset.id);
        renderSlideshowsGrid();
        createSlideshows();
        Toast.show(Mess.getMess("I00009"));
    };
}

/**
    * CREATE SLIDESHOWS
*/
function createSlideshows() {
    imageSlide.innerHTML = "";
    slideshowsData.forEach((image, index) => {
        const img = D.create('img');

        let image_src = "../assets/icon/image_default.png";
        if (FM.nullToString(image.slideshow_base64).length > 0) {
            image_src = image.slideshow_base64;
        } else if (FM.nullToString(image.slideshow_url).length > 0) {
            image_src = image.slideshow_url;
        }
        image.src = image.slideshow_url;
        img.src = image_src;
        img.dataset.no = image.slideshow_no;
        img.addEventListener('click', () => MID.openDialog(index, slideshowsData));
        imageSlide.appendChild(img);
    });

    slideshows_title.value = shopInformationData.find(obj => obj.key.includes("slideshows_title")).value.replaceAll("<br>", "\n");
    slideshows_content.value = shopInformationData.find(obj => obj.key.includes("slideshows_content")).value.replaceAll("<br>", "\n");

    MID.imageDialogHandle();
}

/**
    * PREPARE DATA
*/
function prepareData() {
    // Shop information
    let logo_shop_val = logo.src;
    let icon_logo_shop_val = icon_logo.src;
    let text_logo_shop_val = text_logo.src;
    let logo_with_text_shop_val = logo_with_text.src;
    let shop_name_val = shop_name.value;
    let shop_phone_val = shop_phone.value;
    let shop_email_val = shop_email.value;
    let shop_address_val = shop_address.value;
    let google_map_val = google_map.value;
    let facebook_val = facebook.value;
    let instagram_val = instagram.value;
    let website_val = website.value;
    let slideshow_title_val = slideshows_title.value;
    let slideshow_content_val = slideshows_content.value;
    let shopInformationClone = structuredClone(shopInformationData);
    shopInformationClone.forEach(item => {
        if (item.key == "shop_name") {
            item.value = shop_name_val;
        } else if (item.key == "shop_logo") {
            if (logo_shop_val.includes("data:image")) {
                item.value_base64 = logo_shop_val;
            }
        } else if (item.key == "shop_logo_with_text") {
            if (logo_with_text_shop_val.includes("data:image")) {
                item.value_base64 = logo_with_text_shop_val;
            }
        } else if (item.key == "shop_text_logo") {
            if (text_logo_shop_val.includes("data:image")) {
                item.value_base64 = text_logo_shop_val;
            }
        } else if (item.key == "shop_icon_logo") {
            if (icon_logo_shop_val.includes("data:image")) {
                item.value_base64 = icon_logo_shop_val;
            }
        } else if (item.key == "shop_email") {
            item.value = shop_email_val;
        } else if (item.key == "shop_address") {
            item.value = shop_address_val;
        } else if (item.key == "shop_phone") {
            item.value = shop_phone_val;
        } else if (item.key == "facebook_url") {
            item.value = facebook_val;
        } else if (item.key == "instagram_url") {
            item.value = instagram_val;
        } else if (item.key == "website_url") {
            item.value = website_val;
        } else if (item.key == "ggmaps_url") {
            item.value = google_map_val;
        } else if (item.key == "slideshows_title") {
            item.value = slideshow_title_val;
        } else if (item.key == "slideshows_content") {
            item.value = slideshow_content_val;
        }
    });

    // Shop introductions
    let introduction_img_val = shop_introduction_img.src;
    let introduction_title_val = shop_introduction_title.value;
    let introduction_content_val = shop_introduction_content.value;

    let shopIntroductionsClone = structuredClone(shopIntroductionData);
    shopIntroductionsClone.forEach((item) => {
        if (item.key == "shop_introduction_image_path") {
            if (introduction_img_val.includes("data:image")) {
                item.value_base64 = introduction_img_val;
            }
        } else if (item.key == "shop_introduction_title") {
            item.value = introduction_title_val;
        } else if (item.key == "shop_introduction_content") {
            item.value = introduction_content_val;
        }
    });

    // Slideshows
    let shopImageSlideDataTemp = slideshowsData.map(item => ({ ...item, slideshow_no: parseInt(item.slideshow_no) > parseInt(lastSlideshowNoDefault) ? 0 : item.slideshow_no }));

    // Variable All Data
    let sendData = {
        lstShopInformation: shopInformationClone,
        lstShopIntroductions: shopIntroductionsClone,
        lstSlideshows: shopImageSlideDataTemp,
    };

    return sendData;
}

/**
    * SET DATA RESET API
*/
function setDataResetApi() {
    try {
        let shop_logo_val = shopInformationData.find(obj => obj.key.includes("shop_logo")).value;
        let shop_icon_logo_val = shopInformationData.find(obj => obj.key.includes("shop_icon_logo")).value;
        let shop_text_logo_val = shopInformationData.find(obj => obj.key.includes("shop_text_logo")).value;
        let shop_logo_with_text_val = shopInformationData.find(obj => obj.key.includes("shop_logo_with_text")).value;
        let shop_introduction_image_val = shopIntroductionData.find(obj => obj.key.includes("image_path")).value;

        logo.src = shop_logo_val != null ? shop_logo_val : "../assets/icon/image_default.png";
        icon_logo.src = shop_icon_logo_val != null ? shop_icon_logo_val : "../assets/icon/image_default.png";
        text_logo.src = shop_text_logo_val != null ? shop_text_logo_val : "../assets/icon/image_default.png";
        logo_with_text.src = shop_logo_with_text_val != null ? shop_logo_with_text_val : "../assets/icon/image_default.png";
        shop_introduction_img.src = shop_introduction_image_val != null ? shop_introduction_image_val : "../assets/icon/image_default.png";

        renderSlideshowsGrid();
        createSlideshows();
    } catch (error) {
        console.log(error);
    }
}

/**
    * SAVE DATA
*/
function saveData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);

    axios.post(Pr.URL_API + "/mgmt-shop", prepareData(), {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        Dialog.close();
        mData = structuredClone(res.data);

        shopInformationData = structuredClone(mData.lstShopInformation);
        slideshowsData = structuredClone(mData.lstSlideshows);
        shopIntroductionData = structuredClone(mData.lstShopIntroductions);
        lastSlideshowNo = structuredClone(mData.lastSlideshowNo);
        lastSlideshowNoDefault = structuredClone(mData.lastSlideshowNo);

        setDataResetApi();
        Toast.show(Mess.getMess("I00014"));
    }).catch(function (error) {
        console.log(error);
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
    getData();
    onclickAction();
}

window.onload = init;