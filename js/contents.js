
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

// About us content elements
const about_us_image_val = D.getById("about_us_image_val");
const about_us_title_val = D.getById("about_us_title_val");
const about_us_content_val = D.getById("about_us_content_val");

// B2b ordering content elements
const b2b_ordering_section_1_image_val = D.getById("b2b_ordering_section_1_image_val");
const b2b_ordering_section_1_title_val = D.getById("b2b_ordering_section_1_title_val");
const b2b_ordering_section_1_sub_title_val = D.getById("b2b_ordering_section_1_sub_title_val");
const b2b_ordering_section_1_content_val = D.getById("b2b_ordering_section_1_content_val");

const b2b_ordering_section_2_title_val = D.getById("b2b_ordering_section_2_title_val");
const b2b_ordering_section_2_content_val = D.getById("b2b_ordering_section_2_content_val");

const b2b_ordering_section_3_image_val = D.getById("b2b_ordering_section_3_image_val");
const b2b_ordering_section_3_title_val = D.getById("b2b_ordering_section_3_title_val");
const b2b_ordering_section_3_sub_title_val = D.getById("b2b_ordering_section_3_sub_title_val");

const b2b_ordering_section_4_image_val = D.getById("b2b_ordering_section_4_image_val");

const b2b_ordering_section_5_image_val = D.getById("b2b_ordering_section_5_image_val");
const b2b_ordering_section_5_title_val = D.getById("b2b_ordering_section_5_title_val");
const b2b_ordering_section_5_content_val = D.getById("b2b_ordering_section_5_content_val");

const b2b_ordering_section_6_left_image_val = D.getById("b2b_ordering_section_6_left_image_val");
const b2b_ordering_section_6_left_button_val = D.getById("b2b_ordering_section_6_left_button_val");
const b2b_ordering_section_6_left_button_href_val = D.getById("b2b_ordering_section_6_left_button_href_val");
const b2b_ordering_section_6_center_image_val = D.getById("b2b_ordering_section_6_center_image_val");
const b2b_ordering_section_6_center_button_val = D.getById("b2b_ordering_section_6_center_button_val");
const b2b_ordering_section_6_center_button_href_val = D.getById("b2b_ordering_section_6_center_button_href_val");
const b2b_ordering_section_6_right_image_val = D.getById("b2b_ordering_section_6_right_image_val");
const b2b_ordering_section_6_right_button_val = D.getById("b2b_ordering_section_6_right_button_val");
const b2b_ordering_section_6_right_button_href_val = D.getById("b2b_ordering_section_6_right_button_href_val");

// Product personalisation elements
const product_personalisation_section_1_title_val = D.getById("product_personalisation_section_1_title_val");
const product_personalisation_section_1_sub_title_val = D.getById("product_personalisation_section_1_sub_title_val");
const product_personalisation_section_1_image_val = D.getById("product_personalisation_section_1_image_val");

const product_personalisation_section_2_title_val = D.getById("product_personalisation_section_2_title_val");
const product_personalisation_section_2_content_val = D.getById("product_personalisation_section_2_content_val");

const product_personalisation_section_3_title_val = D.getById("product_personalisation_section_3_title_val");
const product_personalisation_section_3_content_val = D.getById("product_personalisation_section_3_content_val");
const product_personalisation_section_3_sub_content_val = D.getById("product_personalisation_section_3_sub_content_val");
const product_personalisation_section_3_href_val = D.getById("product_personalisation_section_3_href_val");
const product_personalisation_section_3_button_val = D.getById("product_personalisation_section_3_button_val");
const product_personalisation_section_3_image_val = D.getById("product_personalisation_section_3_image_val");

const product_personalisation_section_4_title_val = D.getById("product_personalisation_section_4_title_val");
const product_personalisation_section_4_content_val = D.getById("product_personalisation_section_4_content_val");
const product_personalisation_section_4_sub_content_val = D.getById("product_personalisation_section_4_sub_content_val");
const product_personalisation_section_4_href_val = D.getById("product_personalisation_section_4_href_val");
const product_personalisation_section_4_button_val = D.getById("product_personalisation_section_4_button_val");

const product_personalisation_section_5_grid = D.getById("product_personalisation_section_5_grid");
const product_personalisation_section_5_slide = D.getById("product_personalisation_section_5_slide");
const product_personalisation_section_5_btn_reset = D.getById("product_personalisation_section_5_btn_reset");
const product_personalisation_section_5_btn_add = D.getById("product_personalisation_section_5_btn_add");
const product_personalisation_section_5_multi_img_upload = D.getById("production-personalisation-section-5-multi-img-upload");

const product_personalisation_section_6_title_val = D.getById("product_personalisation_section_6_title_val");
const product_personalisation_section_6_content_val = D.getById("product_personalisation_section_6_content_val");
const product_personalisation_section_6_sub_content_val = D.getById("product_personalisation_section_6_sub_content_val");
const product_personalisation_section_6_href_val = D.getById("product_personalisation_section_6_href_val");
const product_personalisation_section_6_button_val = D.getById("product_personalisation_section_6_button_val");
const product_personalisation_section_6_image_val = D.getById("product_personalisation_section_6_image_val");

const product_personalisation_section_7_grid = D.getById("product_personalisation_section_7_grid");
const product_personalisation_section_7_slide = D.getById("product_personalisation_section_7_slide");
const product_personalisation_section_7_btn_reset = D.getById("product_personalisation_section_7_btn_reset");
const product_personalisation_section_7_btn_add = D.getById("product_personalisation_section_7_btn_add");
const product_personalisation_section_7_multi_img_upload = D.getById("production-personalisation-section-7-multi-img-upload");

const product_personalisation_section_8_title_val = D.getById("product_personalisation_section_8_title_val");
const product_personalisation_section_8_content_val = D.getById("product_personalisation_section_8_content_val");
const product_personalisation_section_8_sub_content_val = D.getById("product_personalisation_section_8_sub_content_val");
const product_personalisation_section_8_href_val = D.getById("product_personalisation_section_8_href_val");
const product_personalisation_section_8_button_val = D.getById("product_personalisation_section_8_button_val");
const product_personalisation_section_8_image_val = D.getById("product_personalisation_section_8_image_val");

const product_personalisation_section_9_title_val = D.getById("product_personalisation_section_9_title_val");
const product_personalisation_section_9_content_val = D.getById("product_personalisation_section_9_content_val");
const product_personalisation_section_9_sub_content_val = D.getById("product_personalisation_section_9_sub_content_val");
const product_personalisation_section_9_href_val = D.getById("product_personalisation_section_9_href_val");
const product_personalisation_section_9_button_val = D.getById("product_personalisation_section_9_button_val");
const product_personalisation_section_9_image_val = D.getById("product_personalisation_section_9_image_val");

const product_personalisation_section_10_title_val = D.getById("product_personalisation_section_10_title_val");
const product_personalisation_section_10_content_val = D.getById("product_personalisation_section_10_content_val");
const product_personalisation_section_10_image_val = D.getById("product_personalisation_section_10_image_val");

const product_personalisation_section_11_title_val = D.getById("product_personalisation_section_11_title_val");
const product_personalisation_section_11_content_val = D.getById("product_personalisation_section_11_content_val");
const product_personalisation_section_11_grid = D.getById("productPersonalisationQuestionGrid");
const product_personalisation_section_11_question_val = D.getById("product_personalisation_section_11_question_val");
const product_personalisation_section_11_answer_val = D.getById("product_personalisation_section_11_answer_val");
const product_personalisation_section_11_btn_reset = D.getById("btn_reset_product_personalisation_question");
const product_personalisation_section_11_btn_cancel_cc = D.getById("product_personalisation_section_11_btn_cancel_cc");
const product_personalisation_section_11_btn_save_cc = D.getById("product_personalisation_section_11_btn_save_cc");

const product_personalisation_section_12_left_image_val = D.getById("product_personalisation_section_12_left_image_val");
const product_personalisation_section_12_left_button_val = D.getById("product_personalisation_section_12_left_button_val");
const product_personalisation_section_12_left_button_href_val = D.getById("product_personalisation_section_12_left_button_href_val");
const product_personalisation_section_12_center_image_val = D.getById("product_personalisation_section_12_center_image_val");
const product_personalisation_section_12_center_button_val = D.getById("product_personalisation_section_12_center_button_val");
const product_personalisation_section_12_center_button_href_val = D.getById("product_personalisation_section_12_center_button_href_val");
const product_personalisation_section_12_right_image_val = D.getById("product_personalisation_section_12_right_image_val");
const product_personalisation_section_12_right_button_val = D.getById("product_personalisation_section_12_right_button_val");
const product_personalisation_section_12_right_button_href_val = D.getById("product_personalisation_section_12_right_button_href_val");

// Shipping content elemens
const shipping_section_1_image_val = D.getById("shipping_section_1_image_val");

const shipping_section_2_grid = D.getById("shippingQuestionGrid");
const shipping_section_2_question_val = D.getById("shipping_section_2_question_val");
const shipping_section_2_answer_val = D.getById("shipping_section_2_answer_val");
const shipping_section_2_btn_reset = D.getById("btn_reset_shipping_question");
const shipping_section_2_btn_cancel_cc = D.getById("shipping_section_2_btn_cancel_cc");
const shipping_section_2_btn_save_cc = D.getById("shipping_section_2_btn_save_cc");

const shipping_section_3_image_val = D.getById("shipping_section_3_image_val");
const shipping_section_3_title_val = D.getById("shipping_section_3_title_val");
const shipping_section_3_content_val = D.getById("shipping_section_3_content_val");

const shipping_section_4_left_image_val = D.getById("shipping_section_4_left_image_val");
const shipping_section_4_left_button_val = D.getById("shipping_section_4_left_button_val");
const shipping_section_4_left_button_href_val = D.getById("shipping_section_4_left_button_href_val");
const shipping_section_4_center_image_val = D.getById("shipping_section_4_center_image_val");
const shipping_section_4_center_button_val = D.getById("shipping_section_4_center_button_val");
const shipping_section_4_center_button_href_val = D.getById("shipping_section_4_center_button_href_val");
const shipping_section_4_right_image_val = D.getById("shipping_section_4_right_image_val");
const shipping_section_4_right_button_val = D.getById("shipping_section_4_right_button_val");
const shipping_section_4_right_button_href_val = D.getById("shipping_section_4_right_button_href_val");

const saveData_dom = D.getById("saveData");

// /* variable */
var mData = null;
var aboutUsData, b2bOrderingData, shippingData, productPersonalisationData, productPersonalisationQuestionData, productPersonalisationSection5SlideshowData, productPersonalisationSection7SlideshowData, shippingQuestionData;
var productPersonalisationQuestionSelected, shippingQuestionSelected;
var lastProductPersonalisationSection5SlideshowNo, lastProductPersonalisationSection7SlideshowNo;
var lastProductPersonalisationSection5SlideshowNoDefault, lastProductPersonalisationSection7SlideshowNoDefault;
var currentImg = null;

/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-contents",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);

            aboutUsData = structuredClone(mData.lstAboutUsContents);
            b2bOrderingData = structuredClone(mData.lstB2bOrderingContents);
            productPersonalisationData = structuredClone(mData.lstProductPersonalisationContents);
            productPersonalisationQuestionData = structuredClone(mData.lstProductPersonalisationQuestions);
            productPersonalisationSection5SlideshowData = structuredClone(mData.lstProductPersonalisationSection5Slideshows);
            productPersonalisationSection7SlideshowData = structuredClone(mData.lstProductPersonalisationSection7Slideshows);
            lastProductPersonalisationSection5SlideshowNo = structuredClone(mData.lastProductPersonalisationSection5SlideshowNo);
            lastProductPersonalisationSection5SlideshowNoDefault = structuredClone(mData.lastProductPersonalisationSection5SlideshowNo);
            lastProductPersonalisationSection7SlideshowNo = structuredClone(mData.lastProductPersonalisationSection7SlideshowNo);
            lastProductPersonalisationSection7SlideshowNoDefault = structuredClone(mData.lastProductPersonalisationSection5SlideshowNo);
            shippingData = structuredClone(mData.lstShippingContents);
            shippingQuestionData = structuredClone(mData.lstShippingQuestions);

            handleImageUpload();
            renderProductionPersonalisationSection5SlideshowsGrid();
            createProductionPersonalisationSection5Slideshows();
            renderProductionPersonalisationSection7SlideshowsGrid();
            createProductionPersonalisationSection7Slideshows();
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
    setAboutUsContents();
    setB2bOrderingContents();
    setProductPersonalisationContents();
    setShippingContents();
}

/**
    * SET ABOUT US CONTENTS
*/
function setAboutUsContents() {
    let about_us_image = aboutUsData.find(obj => obj.key.includes("about_us_image_path")).value;

    about_us_image_val.src = about_us_image != null ? about_us_image : "../assets/icon/image_default.png";
    about_us_title_val.value = FM.nullToString(aboutUsData.find(obj => obj.key.includes("about_us_title")).value).replaceAll("<br>", "\n");
    about_us_content_val.value = FM.nullToString(aboutUsData.find(obj => obj.key.includes("about_us_content")).value).replaceAll("<br>", "\n");
}

/**
    * SET B2B ORDERING CONTENTS
*/
function setB2bOrderingContents() {
    let b2b_ordering_section_1_image = b2bOrderingData.find(obj => obj.key.includes("section_1_image_path")).value;
    let b2b_ordering_section_3_image = b2bOrderingData.find(obj => obj.key.includes("section_3_image_path")).value;
    let b2b_ordering_section_4_image = b2bOrderingData.find(obj => obj.key.includes("section_4_image_path")).value;
    let b2b_ordering_section_5_image = b2bOrderingData.find(obj => obj.key.includes("section_5_image_path")).value;
    let b2b_ordering_section_6_left_image = b2bOrderingData.find(obj => obj.key.includes("section_6_left_image_path")).value;
    let b2b_ordering_section_6_center_image = b2bOrderingData.find(obj => obj.key.includes("section_6_center_image_path")).value;
    let b2b_ordering_section_6_right_image = b2bOrderingData.find(obj => obj.key.includes("section_6_right_image_path")).value;

    b2b_ordering_section_1_image_val.src = b2b_ordering_section_1_image != null ? b2b_ordering_section_1_image : "../assets/icon/image_default.png";
    b2b_ordering_section_1_title_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_1_title")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_1_sub_title_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_1_sub_title")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_1_content_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_1_content")).value).replaceAll("<br>", "\n");

    b2b_ordering_section_2_title_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_2_title")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_2_content_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_2_content")).value).replaceAll("<br>", "\n");

    b2b_ordering_section_3_image_val.src = b2b_ordering_section_3_image != null ? b2b_ordering_section_3_image : "../assets/icon/image_default.png";
    b2b_ordering_section_3_title_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_3_title")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_3_sub_title_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_3_sub_title")).value).replaceAll("<br>", "\n");

    b2b_ordering_section_4_image_val.src = b2b_ordering_section_4_image != null ? b2b_ordering_section_4_image : "../assets/icon/image_default.png";

    b2b_ordering_section_5_image_val.src = b2b_ordering_section_5_image != null ? b2b_ordering_section_5_image : "../assets/icon/image_default.png";
    b2b_ordering_section_5_title_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_5_title")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_5_content_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_5_content")).value).replaceAll("<br>", "\n");

    b2b_ordering_section_6_left_image_val.src = b2b_ordering_section_6_left_image != null ? b2b_ordering_section_6_left_image : "../assets/icon/image_default.png";
    b2b_ordering_section_6_left_button_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_6_left_button")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_6_left_button_href_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_6_left_button_href")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_6_center_image_val.src = b2b_ordering_section_6_center_image != null ? b2b_ordering_section_6_center_image : "../assets/icon/image_default.png";
    b2b_ordering_section_6_center_button_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_6_center_button")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_6_center_button_href_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_6_center_button_href")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_6_right_image_val.src = b2b_ordering_section_6_right_image != null ? b2b_ordering_section_6_right_image : "../assets/icon/image_default.png";
    b2b_ordering_section_6_right_button_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_6_right_button")).value).replaceAll("<br>", "\n");
    b2b_ordering_section_6_right_button_href_val.value = FM.nullToString(b2bOrderingData.find(obj => obj.key.includes("section_6_right_button_href")).value).replaceAll("<br>", "\n");
}

/**
    * SET PRODUCT PERSONALISATION CONTENTS
*/
function setProductPersonalisationContents() {
    let product_personalisation_section_1_image = productPersonalisationData.find(obj => obj.key.includes("section_1_image_path")).value;
    let product_personalisation_section_3_image = productPersonalisationData.find(obj => obj.key.includes("section_3_image_path")).value;
    let product_personalisation_section_6_image = productPersonalisationData.find(obj => obj.key.includes("section_6_image_path")).value;
    let product_personalisation_section_8_image = productPersonalisationData.find(obj => obj.key.includes("section_8_image_path")).value;
    let product_personalisation_section_9_image = productPersonalisationData.find(obj => obj.key.includes("section_9_image_path")).value;
    let product_personalisation_section_10_image = productPersonalisationData.find(obj => obj.key.includes("section_10_image_path")).value;
    let product_personalisation_section_12_left_image = productPersonalisationData.find(obj => obj.key.includes("section_12_left_image_path")).value;
    let product_personalisation_section_12_center_image = productPersonalisationData.find(obj => obj.key.includes("section_12_center_image_path")).value;
    let product_personalisation_section_12_right_image = productPersonalisationData.find(obj => obj.key.includes("section_12_right_image_path")).value;

    product_personalisation_section_1_image_val.src = product_personalisation_section_1_image != null ? product_personalisation_section_1_image : "../assets/icon/image_default.png";
    product_personalisation_section_1_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_1_title")).value).replaceAll("<br>", "\n");
    product_personalisation_section_1_sub_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_1_sub_title")).value).replaceAll("<br>", "\n");

    product_personalisation_section_2_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_2_title")).value).replaceAll("<br>", "\n");
    product_personalisation_section_2_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_2_content")).value).replaceAll("<br>", "\n");

    product_personalisation_section_3_image_val.src = product_personalisation_section_3_image != null ? product_personalisation_section_3_image : "../assets/icon/image_default.png";
    product_personalisation_section_3_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_3_title")).value).replaceAll("<br>", "\n");
    product_personalisation_section_3_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_3_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_3_sub_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_3_sub_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_3_href_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_3_href")).value);
    product_personalisation_section_3_button_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_3_button")).value);

    product_personalisation_section_4_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_4_title")).value).replaceAll("<br>", "\n");
    product_personalisation_section_4_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_4_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_4_sub_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_4_sub_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_4_href_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_4_href")).value);
    product_personalisation_section_4_button_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_4_button")).value);

    product_personalisation_section_6_image_val.src = product_personalisation_section_6_image != null ? product_personalisation_section_6_image : "../assets/icon/image_default.png";
    product_personalisation_section_6_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_6_title")).value).replaceAll("<br>", "\n");
    product_personalisation_section_6_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_6_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_6_sub_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_6_sub_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_6_href_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_6_href")).value);
    product_personalisation_section_6_button_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_6_button")).value);

    product_personalisation_section_8_image_val.src = product_personalisation_section_8_image != null ? product_personalisation_section_8_image : "../assets/icon/image_default.png";
    product_personalisation_section_8_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_8_title")).value).replaceAll("<br>", "\n");
    product_personalisation_section_8_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_8_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_8_sub_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_8_sub_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_8_href_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_8_href")).value);
    product_personalisation_section_8_button_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_8_button")).value);

    product_personalisation_section_9_image_val.src = product_personalisation_section_9_image != null ? product_personalisation_section_9_image : "../assets/icon/image_default.png";
    product_personalisation_section_9_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_9_title")).value).replaceAll("<br>", "\n");
    product_personalisation_section_9_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_9_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_9_sub_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_9_sub_content")).value).replaceAll("<br>", "\n");
    product_personalisation_section_9_href_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_9_href")).value);
    product_personalisation_section_9_button_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_9_button")).value);

    product_personalisation_section_10_image_val.src = product_personalisation_section_10_image != null ? product_personalisation_section_10_image : "../assets/icon/image_default.png";
    product_personalisation_section_10_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_10_title")).value).replaceAll("<br>", "\n");
    product_personalisation_section_10_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_10_content")).value).replaceAll("<br>", "\n");

    product_personalisation_section_11_title_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_11_title")).value).replaceAll("<br>", "\n");
    product_personalisation_section_11_content_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_11_content")).value).replaceAll("<br>", "\n");

    product_personalisation_section_12_left_image_val.src = product_personalisation_section_12_left_image != null ? product_personalisation_section_12_left_image : "../assets/icon/image_default.png";
    product_personalisation_section_12_left_button_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_12_left_button")).value).replaceAll("<br>", "\n");
    product_personalisation_section_12_left_button_href_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_12_left_button_href")).value).replaceAll("<br>", "\n");
    product_personalisation_section_12_center_image_val.src = product_personalisation_section_12_center_image != null ? product_personalisation_section_12_center_image : "../assets/icon/image_default.png";
    product_personalisation_section_12_center_button_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_12_center_button")).value).replaceAll("<br>", "\n");
    product_personalisation_section_12_center_button_href_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_12_center_button_href")).value).replaceAll("<br>", "\n");
    product_personalisation_section_12_right_image_val.src = product_personalisation_section_12_right_image != null ? product_personalisation_section_12_right_image : "../assets/icon/image_default.png";
    product_personalisation_section_12_right_button_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_12_right_button")).value).replaceAll("<br>", "\n");
    product_personalisation_section_12_right_button_href_val.value = FM.nullToString(productPersonalisationData.find(obj => obj.key.includes("section_12_right_button_href")).value).replaceAll("<br>", "\n");

    renderProductPersonalisationQuestionGrid();
}

/**
    * RENDER PRODUCT PERSONALISATION QUESTION GRID
*/
function renderProductPersonalisationQuestionGrid() {
    product_personalisation_section_11_grid.innerHTML = "";
    if (productPersonalisationQuestionData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "No data available";
        product_personalisation_section_11_grid.append(status);
    }

    productPersonalisationQuestionData.map((question, index) => createProductPersonalisationQuestionRow(question, index));
    new Sortable(product_personalisation_section_11_grid, {
        animation: 150,
        handle: ".ci-item",
        ghostClass: 'blue-background-class',
        onEnd: function (evt) {
            const rows = product_personalisation_section_11_grid.querySelectorAll(".row");
            rows.forEach((row, index) => {
                row.dataset.pos = index + 1;
                let itemData = productPersonalisationQuestionData.find(obj => obj.question_no == row.dataset.id);
                itemData.question_position = index + 1;
            });
            productPersonalisationQuestionData.sort((a, b) => a.question_position - b.question_position);
            Toast.show(Mess.getMess("I00009"));
        }
    });

    product_personalisation_section_11_btn_reset.onclick = function () {
        Dialog.setDialog("confirm", Mess.getMess("Q00003"), "No", "Reset");
        D.getById("pos-btn").onclick = function (evt) {
            productPersonalisationQuestionData = structuredClone(mData.lstProductPersonalisationContents);
            renderProductPersonalisationQuestionGrid();
            Toast.show(Mess.getMess("I00010"));
            Dialog.close();
        };
    };
};

/**
    * ADD ROW FOR PRODUCT PERSONALISATION QUESTION GRID
    * 
    * @param question: question data
    * @param index: index
*/
function createProductPersonalisationQuestionRow(question, index) {
    let row = D.create("div");
    row.setAttribute("class", "row ci-item");
    row.setAttribute("data-id", question.question_no);
    row.setAttribute("data-pos", index + 1);

    let stt = D.create("div");
    stt.setAttribute("class", "col-1 text ta-c ci-pos");
    let stt_ic = D.create("i");
    stt_ic.setAttribute("class", "fa-solid fa-up-down-left-right");
    stt.append(stt_ic);

    let question_content = D.create("div");
    question_content.setAttribute("class", "col-4 col-sm-4 col-md-5 col-lg-4 col-xl-5  text ellipsis cc-tt");
    question_content.textContent = FM.nullToString(question.question_content);

    let answer_content = D.create("div");
    answer_content.setAttribute("class", "col-5 text ellipsis cc-tt");
    answer_content.textContent = FM.nullToString(question.answer_content);

    let btn_div = D.create("div");
    btn_div.setAttribute("class", "col-2 col-sm-2 col-md-1 col-lg-2 col-xl-1 col-buttons");
    let btn_edit = D.create("button");
    btn_edit.setAttribute("class", "edit-cc-btn ic-btn");
    btn_edit.setAttribute("data-id", question.question_no);
    let btn_edit_ic = D.create("i");
    btn_edit_ic.setAttribute("class", "fa-solid fa-pen-to-square");
    btn_edit.append(btn_edit_ic);
    btn_div.append(btn_edit);

    let btn_del = D.create("button");
    btn_del.setAttribute("class", "del-img-btn ic-btn");
    btn_del.setAttribute("data-id", question.question_no);
    let btn_del_ic = D.create("i");
    btn_del_ic.setAttribute("class", "fas fa-trash");
    btn_del.append(btn_del_ic);
    btn_div.append(btn_del);

    row.append(stt);
    row.append(question_content);
    row.append(answer_content);
    row.append(btn_div);
    product_personalisation_section_11_grid.append(row);

    btn_edit.onclick = function (evt) {
        const rows = D.$dom.querySelectorAll(".ci-item");
        rows.forEach((row) => {
            if (row.dataset.id == this.dataset.id) {
                if (!row.classList.contains("highlight")) {
                    row.classList.add("highlight");
                }
                productPersonalisationQuestionSelected = this.dataset.id;
                setProductPersonalisationQuestionFormButton();
                setProductPersonalisationQuestionItem(productPersonalisationQuestionData.find(obj => obj.question_no == this.dataset.id));
            } else {
                row.classList.remove("highlight");
            }
        });
    };

    btn_del.onclick = function (evt) {
        productPersonalisationQuestionData = productPersonalisationQuestionData.filter(obj => obj.question_no != evt.target.parentElement.dataset.id);
        renderProductPersonalisationQuestionGrid();
        Toast.show(Mess.getMess("I00009"));
    };
}

/**
    * SET PRODUCT PERSONALISATION QUESTION FORM BUTTON
*/
function setProductPersonalisationQuestionFormButton() {
    if (productPersonalisationQuestionSelected == null) {
        product_personalisation_section_11_btn_save_cc.textContent = "Create";
        product_personalisation_section_11_btn_cancel_cc.textContent = "Clear";
    } else {
        product_personalisation_section_11_btn_save_cc.textContent = "Save";
        product_personalisation_section_11_btn_cancel_cc.textContent = "Cancel";
    }

    product_personalisation_section_11_btn_cancel_cc.onclick = function (evt) {
        const rows = D.$dom.querySelectorAll(".ci-item");
        rows.forEach((row) => {
            row.classList.remove("highlight");
        });
        productPersonalisationQuestionSelected = null;
        resetProductPersonalisationQuestionForm();
        setProductPersonalisationQuestionFormButton();
    };

    product_personalisation_section_11_btn_save_cc.onclick = function () {
        let questionData = null;
        if (productPersonalisationQuestionSelected == null) {
            questionData = new Model.Question();
        } else {
            questionData = productPersonalisationQuestionData.find(obj => obj.question_no == productPersonalisationQuestionSelected);
        }

        questionData.question_position = questionData.question_position == 0 ? productPersonalisationQuestionData.length + 1 : questionData.question_position;
        let question_content = FM.nullToString(product_personalisation_section_11_question_val.value);
        let answer_content = FM.nullToString(product_personalisation_section_11_answer_val.value);
        if (question_content.length == 0 || answer_content.length == 0) {
            Dialog.setDialog("error", Mess.getMess("E00005"), null, null, "Confirm");
            return;
        }
        questionData.question_content = question_content;
        questionData.answer_content = answer_content;

        if (productPersonalisationQuestionSelected == null) {
            productPersonalisationQuestionData.push(questionData);
        }
        renderProductPersonalisationQuestionGrid();
        resetProductPersonalisationQuestionForm();

        // Reset button
        productPersonalisationQuestionSelected = null;
        product_personalisation_section_11_btn_save_cc.textContent = "Create";
        product_personalisation_section_11_btn_cancel_cc.textContent = "Clear";

        Toast.show(Mess.getMess("I00009"));
    };
}

/**
    * SET PRODUCT PERSONALISATION QUESTION ITEM DATA
    * 
    * @param data: product personalisation question item data
*/
function setProductPersonalisationQuestionItem(data) {
    product_personalisation_section_11_question_val.value = FM.nullToString(data.question_content).replaceAll("<br>", "\n");
    product_personalisation_section_11_answer_val.value = FM.nullToString(data.answer_content).replaceAll("<br>", "\n");
}

/**
    * RESET PRODUCT PERSONALISATION QUESTION FORM
*/
function resetProductPersonalisationQuestionForm() {
    product_personalisation_section_11_question_val.value = "";
    product_personalisation_section_11_answer_val.value = "";
}


/**
    * RENDER PRODUCTION PERSONALISATION SECTION 5 SLIDESHOWS GRID
*/
function renderProductionPersonalisationSection5SlideshowsGrid() {
    product_personalisation_section_5_grid.innerHTML = "";
    if (productPersonalisationSection5SlideshowData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "No data available";
        product_personalisation_section_5_grid.append(status);
    }

    productPersonalisationSection5SlideshowData.map((image, index) => createProductionPersonalisationSection5SlideshowsRow(image, index));
    new Sortable(product_personalisation_section_5_grid, {
        animation: 150,
        handle: ".ci-item",
        ghostClass: 'blue-background-class',
        onEnd: function (evt) {
            const rows = product_personalisation_section_5_grid.querySelectorAll(".row");
            rows.forEach((row, index) => {
                row.dataset.pos = index + 1;
                let itemData = productPersonalisationSection5SlideshowData.find(obj => obj.slideshow_no == row.dataset.id);
                itemData.slideshow_position = index + 1;
            });
            productPersonalisationSection5SlideshowData.sort((a, b) => a.slideshow_position - b.slideshow_position);
            createProductionPersonalisationSection5Slideshows();
            Toast.show(Mess.getMess("I00009"));
        }
    });

    product_personalisation_section_5_btn_reset.onclick = function () {
        Dialog.setDialog("confirm", Mess.getMess("Q00003"), "No", "Reset");
        D.getById("pos-btn").onclick = function (evt) {
            productPersonalisationSection5SlideshowData = structuredClone(mData.lstProductPersonalisationSection5Slideshows);
            renderProductionPersonalisationSection5SlideshowsGrid();
            createProductionPersonalisationSection5Slideshows();
            Toast.show(Mess.getMess("I00010"));
            Dialog.close();
        };
    };
};

/**
    * ADD ROW FOR PRODUCTION PERSONALISATION SECTION 5 SLIDESHOWS GRID
    * 
    * @param image: image data
    * @param index: index
*/
function createProductionPersonalisationSection5SlideshowsRow(image, index) {
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
    product_personalisation_section_5_grid.append(row);

    btn_del.onclick = function (evt) {
        productPersonalisationSection5SlideshowData = productPersonalisationSection5SlideshowData.filter(obj => obj.slideshow_no != evt.target.parentElement.dataset.id);
        renderProductionPersonalisationSection5SlideshowsGrid();
        createProductionPersonalisationSection5Slideshows();
        Toast.show(Mess.getMess("I00009"));
    };
}

/**
    * CREATE PRODUCTION PERSONALISATION SECTION 5 SLIDESHOWS
*/
function createProductionPersonalisationSection5Slideshows() {
    product_personalisation_section_5_slide.innerHTML = "";
    productPersonalisationSection5SlideshowData.forEach((image, index) => {
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
        img.addEventListener('click', () => MID.openDialog(index, productPersonalisationSection5SlideshowData));
        product_personalisation_section_5_slide.appendChild(img);
    });

    MID.imageDialogHandle();
}

/**
    * RENDER PRODUCTION PERSONALISATION SECTION 7 SLIDESHOWS GRID
*/
function renderProductionPersonalisationSection7SlideshowsGrid() {
    product_personalisation_section_7_grid.innerHTML = "";
    if (productPersonalisationSection7SlideshowData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "No data available";
        product_personalisation_section_7_grid.append(status);
    }

    productPersonalisationSection7SlideshowData.map((image, index) => createProductionPersonalisationSection7SlideshowsRow(image, index));
    new Sortable(product_personalisation_section_7_grid, {
        animation: 150,
        handle: ".ci-item",
        ghostClass: 'blue-background-class',
        onEnd: function (evt) {
            const rows = product_personalisation_section_7_grid.querySelectorAll(".row");
            rows.forEach((row, index) => {
                row.dataset.pos = index + 1;
                let itemData = productPersonalisationSection7SlideshowData.find(obj => obj.slideshow_no == row.dataset.id);
                itemData.slideshow_position = index + 1;
            });
            productPersonalisationSection7SlideshowData.sort((a, b) => a.slideshow_position - b.slideshow_position);
            createProductionPersonalisationSection7Slideshows();
            Toast.show(Mess.getMess("I00009"));
        }
    });

    product_personalisation_section_7_btn_reset.onclick = function () {
        Dialog.setDialog("confirm", Mess.getMess("Q00003"), "No", "Reset");
        D.getById("pos-btn").onclick = function (evt) {
            productPersonalisationSection7SlideshowData = structuredClone(mData.lstProductPersonalisationSection7Slideshows);
            renderProductionPersonalisationSection7SlideshowsGrid();
            createProductionPersonalisationSection7Slideshows();
            Toast.show(Mess.getMess("I00010"));
            Dialog.close();
        };
    };
};

/**
    * ADD ROW FOR PRODUCTION PERSONALISATION SECTION 7 SLIDESHOWS GRID
    * 
    * @param image: image data
    * @param index: index
*/
function createProductionPersonalisationSection7SlideshowsRow(image, index) {
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
    product_personalisation_section_7_grid.append(row);

    btn_del.onclick = function (evt) {
        productPersonalisationSection7SlideshowData = productPersonalisationSection7SlideshowData.filter(obj => obj.slideshow_no != evt.target.parentElement.dataset.id);
        renderProductionPersonalisationSection7SlideshowsGrid();
        createProductionPersonalisationSection7Slideshows();
        Toast.show(Mess.getMess("I00009"));
    };
}

/**
    * CREATE PRODUCTION PERSONALISATION SECTION 7 SLIDESHOWS
*/
function createProductionPersonalisationSection7Slideshows() {
    product_personalisation_section_7_slide.innerHTML = "";
    productPersonalisationSection7SlideshowData.forEach((image, index) => {
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
        img.addEventListener('click', () => MID.openDialog(index, productPersonalisationSection7SlideshowData));
        product_personalisation_section_7_slide.appendChild(img);
    });

    MID.imageDialogHandle();
}

/**
    * SET SHIPPING CONTENTS
*/
function setShippingContents() {
    let shipping_section_1_image = shippingData.find(obj => obj.key.includes("section_1_image_path")).value;
    let shipping_section_3_image = shippingData.find(obj => obj.key.includes("section_3_image_path")).value;
    let shipping_section_4_left_image = shippingData.find(obj => obj.key.includes("section_4_left_image_path")).value;
    let shipping_section_4_center_image = shippingData.find(obj => obj.key.includes("section_4_center_image_path")).value;
    let shipping_section_4_right_image = shippingData.find(obj => obj.key.includes("section_4_right_image_path")).value;

    shipping_section_1_image_val.src = shipping_section_1_image != null ? shipping_section_1_image : "../assets/icon/image_default.png";

    shipping_section_3_image_val.src = shipping_section_3_image != null ? shipping_section_3_image : "../assets/icon/image_default.png";
    shipping_section_3_title_val.value = FM.nullToString(shippingData.find(obj => obj.key.includes("section_3_title")).value).replaceAll("<br>", "\n");
    shipping_section_3_content_val.value = FM.nullToString(shippingData.find(obj => obj.key.includes("section_3_content")).value).replaceAll("<br>", "\n");

    shipping_section_4_left_image_val.src = shipping_section_4_left_image != null ? shipping_section_4_left_image : "../assets/icon/image_default.png";
    shipping_section_4_left_button_val.value = FM.nullToString(shippingData.find(obj => obj.key.includes("section_4_left_button")).value).replaceAll("<br>", "\n");
    shipping_section_4_left_button_href_val.value = FM.nullToString(shippingData.find(obj => obj.key.includes("section_4_left_button_href")).value).replaceAll("<br>", "\n");
    shipping_section_4_center_image_val.src = shipping_section_4_center_image != null ? shipping_section_4_center_image : "../assets/icon/image_default.png";
    shipping_section_4_center_button_val.value = FM.nullToString(shippingData.find(obj => obj.key.includes("section_4_center_button")).value).replaceAll("<br>", "\n");
    shipping_section_4_center_button_href_val.value = FM.nullToString(shippingData.find(obj => obj.key.includes("section_4_center_button_href")).value).replaceAll("<br>", "\n");
    shipping_section_4_right_image_val.src = shipping_section_4_right_image != null ? shipping_section_4_right_image : "../assets/icon/image_default.png";
    shipping_section_4_right_button_val.value = FM.nullToString(shippingData.find(obj => obj.key.includes("section_4_right_button")).value).replaceAll("<br>", "\n");
    shipping_section_4_right_button_href_val.value = FM.nullToString(shippingData.find(obj => obj.key.includes("section_4_right_button_href")).value).replaceAll("<br>", "\n");

    renderShippingQuestionGrid();
}

/**
    * RENDER SHIPPING QUESTION GRID
*/
function renderShippingQuestionGrid() {
    shipping_section_2_grid.innerHTML = "";
    if (shippingQuestionData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "No data available";
        shipping_section_2_grid.append(status);
    }

    shippingQuestionData.map((question, index) => createShippingQuestionRow(question, index));
    new Sortable(shipping_section_2_grid, {
        animation: 150,
        handle: ".ci-item",
        ghostClass: 'blue-background-class',
        onEnd: function (evt) {
            const rows = shipping_section_2_grid.querySelectorAll(".row");
            rows.forEach((row, index) => {
                row.dataset.pos = index + 1;
                let itemData = shippingQuestionData.find(obj => obj.question_no == row.dataset.id);
                itemData.question_position = index + 1;
            });
            shippingQuestionData.sort((a, b) => a.question_position - b.question_position);
            Toast.show(Mess.getMess("I00009"));
        }
    });

    shipping_section_2_btn_reset.onclick = function () {
        Dialog.setDialog("confirm", Mess.getMess("Q00003"), "No", "Reset");
        D.getById("pos-btn").onclick = function (evt) {
            shippingQuestionData = structuredClone(mData.lstShippingQuestions);
            renderShippingQuestionGrid();
            Toast.show(Mess.getMess("I00010"));
            Dialog.close();
        };
    };
};

/**
    * ADD ROW FOR SHIPPING QUESTION GRID
    * 
    * @param question: question data
    * @param index: index
*/
function createShippingQuestionRow(question, index) {
    let row = D.create("div");
    row.setAttribute("class", "row ci-item");
    row.setAttribute("data-id", question.question_no);
    row.setAttribute("data-pos", index + 1);

    let stt = D.create("div");
    stt.setAttribute("class", "col-1 text ta-c ci-pos");
    let stt_ic = D.create("i");
    stt_ic.setAttribute("class", "fa-solid fa-up-down-left-right");
    stt.append(stt_ic);

    let question_content = D.create("div");
    question_content.setAttribute("class", "col-4 col-sm-4 col-md-5 col-lg-4 col-xl-5  text ellipsis cc-tt");
    question_content.textContent = FM.nullToString(question.question_content);

    let answer_content = D.create("div");
    answer_content.setAttribute("class", "col-5 text ellipsis cc-tt");
    answer_content.textContent = FM.nullToString(question.answer_content);

    let btn_div = D.create("div");
    btn_div.setAttribute("class", "col-2 col-sm-2 col-md-1 col-lg-2 col-xl-1 col-buttons");
    let btn_edit = D.create("button");
    btn_edit.setAttribute("class", "edit-cc-btn ic-btn");
    btn_edit.setAttribute("data-id", question.question_no);
    let btn_edit_ic = D.create("i");
    btn_edit_ic.setAttribute("class", "fa-solid fa-pen-to-square");
    btn_edit.append(btn_edit_ic);
    btn_div.append(btn_edit);

    let btn_del = D.create("button");
    btn_del.setAttribute("class", "del-img-btn ic-btn");
    btn_del.setAttribute("data-id", question.question_no);
    let btn_del_ic = D.create("i");
    btn_del_ic.setAttribute("class", "fas fa-trash");
    btn_del.append(btn_del_ic);
    btn_div.append(btn_del);

    row.append(stt);
    row.append(question_content);
    row.append(answer_content);
    row.append(btn_div);
    shipping_section_2_grid.append(row);

    btn_edit.onclick = function (evt) {
        const rows = D.$dom.querySelectorAll(".ci-item");
        rows.forEach((row) => {
            if (row.dataset.id == this.dataset.id) {
                if (!row.classList.contains("highlight")) {
                    row.classList.add("highlight");
                }
                shippingQuestionSelected = this.dataset.id;
                setShippingQuestionFormButton();
                setShippingQuestionItem(shippingQuestionData.find(obj => obj.question_no == this.dataset.id));
            } else {
                row.classList.remove("highlight");
            }
        });
    };

    btn_del.onclick = function (evt) {
        shippingQuestionData = shippingQuestionData.filter(obj => obj.question_no != evt.target.parentElement.dataset.id);
        renderShippingQuestionGrid();
        Toast.show(Mess.getMess("I00009"));
    };
}

/**
    * SET SHIPPING QUESTION FORM BUTTON
*/
function setShippingQuestionFormButton() {
    if (shippingQuestionSelected == null) {
        shipping_section_2_btn_save_cc.textContent = "Create";
        shipping_section_2_btn_cancel_cc.textContent = "Clear";
    } else {
        shipping_section_2_btn_save_cc.textContent = "Save";
        shipping_section_2_btn_cancel_cc.textContent = "Cancel";
    }

    shipping_section_2_btn_cancel_cc.onclick = function (evt) {
        const rows = D.$dom.querySelectorAll(".ci-item");
        rows.forEach((row) => {
            row.classList.remove("highlight");
        });
        shippingQuestionSelected = null;
        resetShippingQuestionForm();
        setShippingQuestionFormButton();
    };

    shipping_section_2_btn_save_cc.onclick = function () {
        let questionData = null;
        if (shippingQuestionSelected == null) {
            questionData = new Model.Question();
        } else {
            questionData = shippingQuestionData.find(obj => obj.question_no == shippingQuestionSelected);
        }

        questionData.question_position = questionData.question_position == 0 ? shippingQuestionData.length + 1 : questionData.question_position;
        let question_content = FM.nullToString(shipping_section_2_question_val.value);
        let answer_content = FM.nullToString(shipping_section_2_answer_val.value);
        if (question_content.length == 0 || answer_content.length == 0) {
            Dialog.setDialog("error", Mess.getMess("E00005"), null, null, "Confirm");
            return;
        }
        questionData.question_content = question_content;
        questionData.answer_content = answer_content;

        if (shippingQuestionSelected == null) {
            shippingQuestionData.push(questionData);
        }
        renderShippingQuestionGrid();
        resetShippingQuestionForm();

        // Reset button
        shippingQuestionSelected = null;
        shipping_section_2_btn_save_cc.textContent = "Create";
        shipping_section_2_btn_cancel_cc.textContent = "Clear";

        Toast.show(Mess.getMess("I00009"));
    };
}

/**
    * SET SHIPPING QUESTION ITEM DATA
    * 
    * @param data: shipping question item data
*/
function setShippingQuestionItem(data) {
    shipping_section_2_question_val.value = FM.nullToString(data.question_content).replaceAll("<br>", "\n");
    shipping_section_2_answer_val.value = FM.nullToString(data.answer_content).replaceAll("<br>", "\n");
}

/**
    * RESET SHIPPING QUESTION FORM
*/
function resetShippingQuestionForm() {
    shipping_section_2_question_val.value = "";
    shipping_section_2_answer_val.value = "";
}

/**
    * PREPARE DATA
*/
function prepareData() {
    // ABOUT US
    let about_us_image = about_us_image_val.src;
    let about_us_title = about_us_title_val.value;
    let about_us_content = about_us_content_val.value;

    let aboutUsDataClone = structuredClone(aboutUsData);
    aboutUsDataClone.forEach(item => {
        if (item.key == "about_us_title") {
            item.value = about_us_title;
        } else if (item.key == "about_us_content") {
            item.value = about_us_content;
        } else if (item.key == "about_us_image_path") {
            if (about_us_image.includes("data:image")) {
                item.value_base64 = about_us_image;
            }
        }
    });

    // B2B ORDERING
    let b2b_ordering_section_1_image = b2b_ordering_section_1_image_val.src;
    let b2b_ordering_section_1_title = b2b_ordering_section_1_title_val.value;
    let b2b_ordering_section_1_sub_title = b2b_ordering_section_1_sub_title_val.value;
    let b2b_ordering_section_1_content = b2b_ordering_section_1_content_val.value;

    let b2b_ordering_section_2_title = b2b_ordering_section_2_title_val.value;
    let b2b_ordering_section_2_content = b2b_ordering_section_2_content_val.value;

    let b2b_ordering_section_3_image = b2b_ordering_section_3_image_val.src;
    let b2b_ordering_section_3_title = b2b_ordering_section_3_title_val.value;
    let b2b_ordering_section_3_sub_title = b2b_ordering_section_3_sub_title_val.value;

    let b2b_ordering_section_4_image = b2b_ordering_section_4_image_val.src;

    let b2b_ordering_section_5_image = b2b_ordering_section_5_image_val.src;
    let b2b_ordering_section_5_title = b2b_ordering_section_5_title_val.value;
    let b2b_ordering_section_5_content = b2b_ordering_section_5_content_val.value;

    let b2b_ordering_section_6_left_image = b2b_ordering_section_6_left_image_val.src;
    let b2b_ordering_section_6_left_button = b2b_ordering_section_6_left_button_val.value;
    let b2b_ordering_section_6_left_button_href = b2b_ordering_section_6_left_button_href_val.value;
    let b2b_ordering_section_6_center_image = b2b_ordering_section_6_center_image_val.src;
    let b2b_ordering_section_6_center_button = b2b_ordering_section_6_center_button_val.value;
    let b2b_ordering_section_6_center_button_href = b2b_ordering_section_6_center_button_href_val.value;
    let b2b_ordering_section_6_right_image = b2b_ordering_section_6_right_image_val.src;
    let b2b_ordering_section_6_right_button = b2b_ordering_section_6_right_button_val.value;
    let b2b_ordering_section_6_right_button_href = b2b_ordering_section_6_right_button_href_val.value;

    let b2bOrderingDataClone = structuredClone(b2bOrderingData);
    b2bOrderingDataClone.forEach(item => {
        if (item.key == "section_1_title") {
            item.value = b2b_ordering_section_1_title;
        } else if (item.key == "section_1_sub_title") {
            item.value = b2b_ordering_section_1_sub_title;
        } else if (item.key == "section_1_content") {
            item.value = b2b_ordering_section_1_content;
        } else if (item.key == "section_1_image_path") {
            if (b2b_ordering_section_1_image.includes("data:image")) {
                item.value_base64 = b2b_ordering_section_1_image;
            }
        } else if (item.key == "section_2_title") {
            item.value = b2b_ordering_section_2_title;
        } else if (item.key == "section_2_content") {
            item.value = b2b_ordering_section_2_content;
        } else if (item.key == "section_3_title") {
            item.value = b2b_ordering_section_3_title;
        } else if (item.key == "section_3_sub_title") {
            item.value = b2b_ordering_section_3_sub_title;
        } else if (item.key == "section_3_image_path") {
            if (b2b_ordering_section_3_image.includes("data:image")) {
                item.value_base64 = b2b_ordering_section_3_image;
            }
        } else if (item.key == "section_4_image_path") {
            if (b2b_ordering_section_4_image.includes("data:image")) {
                item.value_base64 = b2b_ordering_section_4_image;
            }
        } else if (item.key == "section_5_title") {
            item.value = b2b_ordering_section_5_title;
        } else if (item.key == "section_5_content") {
            item.value = b2b_ordering_section_5_content;
        } else if (item.key == "section_5_image_path") {
            if (b2b_ordering_section_5_image.includes("data:image")) {
                item.value_base64 = b2b_ordering_section_5_image;
            }
        } else if (item.key == "section_6_left_button") {
            item.value = b2b_ordering_section_6_left_button;
        } else if (item.key == "section_6_left_button_href") {
            item.value = b2b_ordering_section_6_left_button_href;
        } else if (item.key == "section_6_left_image_path") {
            if (b2b_ordering_section_6_left_image.includes("data:image")) {
                item.value_base64 = b2b_ordering_section_6_left_image;
            }
        } else if (item.key == "section_6_center_button") {
            item.value = b2b_ordering_section_6_center_button;
        } else if (item.key == "section_6_center_button_href") {
            item.value = b2b_ordering_section_6_center_button_href;
        } else if (item.key == "section_6_center_image_path") {
            if (b2b_ordering_section_6_center_image.includes("data:image")) {
                item.value_base64 = b2b_ordering_section_6_center_image;
            }
        } else if (item.key == "section_6_right_button") {
            item.value = b2b_ordering_section_6_right_button;
        } else if (item.key == "section_6_right_button_href") {
            item.value = b2b_ordering_section_6_right_button_href;
        } else if (item.key == "section_6_right_image_path") {
            if (b2b_ordering_section_6_right_image.includes("data:image")) {
                item.value_base64 = b2b_ordering_section_6_right_image;
            }
        }
    });

    // PRODUCT PERSONALISATION
    let product_personalisation_section_1_image = product_personalisation_section_1_image_val.src;
    let product_personalisation_section_1_title = product_personalisation_section_1_title_val.value;
    let product_personalisation_section_1_sub_title = product_personalisation_section_1_sub_title_val.value;

    let product_personalisation_section_2_title = product_personalisation_section_2_title_val.value;
    let product_personalisation_section_2_content = product_personalisation_section_2_content_val.value;

    let product_personalisation_section_3_image = product_personalisation_section_3_image_val.src;
    let product_personalisation_section_3_title = product_personalisation_section_3_title_val.value;
    let product_personalisation_section_3_content = product_personalisation_section_3_content_val.value;
    let product_personalisation_section_3_sub_content = product_personalisation_section_3_sub_content_val.value;
    let product_personalisation_section_3_href = product_personalisation_section_3_href_val.value;
    let product_personalisation_section_3_button = product_personalisation_section_3_button_val.value;

    let product_personalisation_section_4_title = product_personalisation_section_4_title_val.value;
    let product_personalisation_section_4_content = product_personalisation_section_4_content_val.value;
    let product_personalisation_section_4_sub_content = product_personalisation_section_4_sub_content_val.value;
    let product_personalisation_section_4_href = product_personalisation_section_4_href_val.value;
    let product_personalisation_section_4_button = product_personalisation_section_4_button_val.value;

    let product_personalisation_section_6_image = product_personalisation_section_6_image_val.src;
    let product_personalisation_section_6_title = product_personalisation_section_6_title_val.value;
    let product_personalisation_section_6_content = product_personalisation_section_6_content_val.value;
    let product_personalisation_section_6_sub_content = product_personalisation_section_6_sub_content_val.value;
    let product_personalisation_section_6_href = product_personalisation_section_6_href_val.value;
    let product_personalisation_section_6_button = product_personalisation_section_6_button_val.value;

    let product_personalisation_section_8_image = product_personalisation_section_8_image_val.src;
    let product_personalisation_section_8_title = product_personalisation_section_8_title_val.value;
    let product_personalisation_section_8_content = product_personalisation_section_8_content_val.value;
    let product_personalisation_section_8_sub_content = product_personalisation_section_8_sub_content_val.value;
    let product_personalisation_section_8_href = product_personalisation_section_8_href_val.value;
    let product_personalisation_section_8_button = product_personalisation_section_8_button_val.value;

    let product_personalisation_section_9_image = product_personalisation_section_9_image_val.src;
    let product_personalisation_section_9_title = product_personalisation_section_9_title_val.value;
    let product_personalisation_section_9_content = product_personalisation_section_9_content_val.value;
    let product_personalisation_section_9_sub_content = product_personalisation_section_9_sub_content_val.value;
    let product_personalisation_section_9_href = product_personalisation_section_9_href_val.value;
    let product_personalisation_section_9_button = product_personalisation_section_9_button_val.value;

    let product_personalisation_section_10_image = product_personalisation_section_10_image_val.src;
    let product_personalisation_section_10_title = product_personalisation_section_10_title_val.value;
    let product_personalisation_section_10_content = product_personalisation_section_10_content_val.value;

    let product_personalisation_section_11_title = product_personalisation_section_11_title_val.value;
    let product_personalisation_section_11_content = product_personalisation_section_11_content_val.value;

    let product_personalisation_section_12_left_image = product_personalisation_section_12_left_image_val.src;
    let product_personalisation_section_12_left_button = product_personalisation_section_12_left_button_val.value;
    let product_personalisation_section_12_left_button_href = product_personalisation_section_12_left_button_href_val.value;
    let product_personalisation_section_12_center_image = product_personalisation_section_12_center_image_val.src;
    let product_personalisation_section_12_center_button = product_personalisation_section_12_center_button_val.value;
    let product_personalisation_section_12_center_button_href = product_personalisation_section_12_center_button_href_val.value;
    let product_personalisation_section_12_right_image = product_personalisation_section_12_right_image_val.src;
    let product_personalisation_section_12_right_button = product_personalisation_section_12_right_button_val.value;
    let product_personalisation_section_12_right_button_href = product_personalisation_section_12_right_button_href_val.value;

    let productPersonalisationDataClone = structuredClone(productPersonalisationData);
    productPersonalisationDataClone.forEach(item => {
        if (item.key == "section_1_title") {
            item.value = product_personalisation_section_1_title;
        } else if (item.key == "section_1_sub_title") {
            item.value = product_personalisation_section_1_sub_title;
        } else if (item.key == "section_1_image_path") {
            if (product_personalisation_section_1_image.includes("data:image")) {
                item.value_base64 = product_personalisation_section_1_image;
            }
        } else if (item.key == "section_2_title") {
            item.value = product_personalisation_section_2_title;
        } else if (item.key == "section_2_content") {
            item.value = product_personalisation_section_2_content;
        } else if (item.key == "section_3_title") {
            item.value = product_personalisation_section_3_title;
        } else if (item.key == "section_3_content") {
            item.value = product_personalisation_section_3_content;
        } else if (item.key == "section_3_sub_content") {
            item.value = product_personalisation_section_3_sub_content;
        } else if (item.key == "section_3_href") {
            item.value = product_personalisation_section_3_href;
        } else if (item.key == "section_3_button") {
            item.value = product_personalisation_section_3_button;
        } else if (item.key == "section_3_image_path") {
            if (product_personalisation_section_3_image.includes("data:image")) {
                item.value_base64 = product_personalisation_section_3_image;
            }
        } else if (item.key == "section_4_title") {
            item.value = product_personalisation_section_4_title;
        } else if (item.key == "section_4_content") {
            item.value = product_personalisation_section_4_content;
        } else if (item.key == "section_4_sub_content") {
            item.value = product_personalisation_section_4_sub_content;
        } else if (item.key == "section_4_href") {
            item.value = product_personalisation_section_4_href;
        } else if (item.key == "section_4_button") {
            item.value = product_personalisation_section_4_button;
        } else if (item.key == "section_6_title") {
            item.value = product_personalisation_section_6_title;
        } else if (item.key == "section_6_content") {
            item.value = product_personalisation_section_6_content;
        } else if (item.key == "section_6_sub_content") {
            item.value = product_personalisation_section_6_sub_content;
        } else if (item.key == "section_6_href") {
            item.value = product_personalisation_section_6_href;
        } else if (item.key == "section_6_button") {
            item.value = product_personalisation_section_6_button;
        } else if (item.key == "section_6_image_path") {
            if (product_personalisation_section_6_image.includes("data:image")) {
                item.value_base64 = product_personalisation_section_6_image;
            }
        } else if (item.key == "section_8_title") {
            item.value = product_personalisation_section_8_title;
        } else if (item.key == "section_8_content") {
            item.value = product_personalisation_section_8_content;
        } else if (item.key == "section_8_sub_content") {
            item.value = product_personalisation_section_8_sub_content;
        } else if (item.key == "section_8_href") {
            item.value = product_personalisation_section_8_href;
        } else if (item.key == "section_8_button") {
            item.value = product_personalisation_section_8_button;
        } else if (item.key == "section_8_image_path") {
            if (product_personalisation_section_8_image.includes("data:image")) {
                item.value_base64 = product_personalisation_section_8_image;
            }
        } else if (item.key == "section_9_title") {
            item.value = product_personalisation_section_9_title;
        } else if (item.key == "section_9_content") {
            item.value = product_personalisation_section_9_content;
        } else if (item.key == "section_9_sub_content") {
            item.value = product_personalisation_section_9_sub_content;
        } else if (item.key == "section_9_href") {
            item.value = product_personalisation_section_9_href;
        } else if (item.key == "section_9_button") {
            item.value = product_personalisation_section_9_button;
        } else if (item.key == "section_9_image_path") {
            if (product_personalisation_section_9_image.includes("data:image")) {
                item.value_base64 = product_personalisation_section_9_image;
            }
        } else if (item.key == "section_10_title") {
            item.value = product_personalisation_section_10_title;
        } else if (item.key == "section_10_content") {
            item.value = product_personalisation_section_10_content;
        } else if (item.key == "section_10_image_path") {
            if (product_personalisation_section_10_image.includes("data:image")) {
                item.value_base64 = product_personalisation_section_10_image;
            }
        } else if (item.key == "section_11_title") {
            item.value = product_personalisation_section_11_title;
        } else if (item.key == "section_11_content") {
            item.value = product_personalisation_section_11_content;
        } else if (item.key == "section_12_left_button") {
            item.value = product_personalisation_section_12_left_button;
        } else if (item.key == "section_12_left_button_href") {
            item.value = product_personalisation_section_12_left_button_href;
        } else if (item.key == "section_12_left_image_path") {
            if (product_personalisation_section_12_left_image.includes("data:image")) {
                item.value_base64 = product_personalisation_section_12_left_image;
            }
        } else if (item.key == "section_12_center_button") {
            item.value = product_personalisation_section_12_center_button;
        } else if (item.key == "section_12_center_button_href") {
            item.value = product_personalisation_section_12_center_button_href;
        } else if (item.key == "section_12_center_image_path") {
            if (product_personalisation_section_12_center_image.includes("data:image")) {
                item.value_base64 = product_personalisation_section_12_center_image;
            }
        } else if (item.key == "section_12_right_button") {
            item.value = product_personalisation_section_12_right_button;
        } else if (item.key == "section_12_right_button_href") {
            item.value = product_personalisation_section_12_right_button_href;
        } else if (item.key == "section_12_right_image_path") {
            if (product_personalisation_section_12_right_image.includes("data:image")) {
                item.value_base64 = product_personalisation_section_12_right_image;
            }
        }
    });

    let productPersonalisationSection5SlideshowDataTemp = productPersonalisationSection5SlideshowData.map(item => ({ ...item, slideshow_no: parseInt(item.slideshow_no) > parseInt(lastProductPersonalisationSection5SlideshowNoDefault) ? 0 : item.slideshow_no }));
    let productPersonalisationSection7SlideshowDataTemp = productPersonalisationSection7SlideshowData.map(item => ({ ...item, slideshow_no: parseInt(item.slideshow_no) > parseInt(lastProductPersonalisationSection7SlideshowNoDefault) ? 0 : item.slideshow_no }));

    // SHIPPING
    let shipping_section_1_image = shipping_section_1_image_val.src;

    let shipping_section_3_image = shipping_section_3_image_val.src;
    let shipping_section_3_title = shipping_section_3_title_val.value;
    let shipping_section_3_content = shipping_section_3_content_val.value;

    let shipping_section_4_left_image = shipping_section_4_left_image_val.src;
    let shipping_section_4_left_button = shipping_section_4_left_button_val.value;
    let shipping_section_4_left_button_href = shipping_section_4_left_button_href_val.value;
    let shipping_section_4_center_image = shipping_section_4_center_image_val.src;
    let shipping_section_4_center_button = shipping_section_4_center_button_val.value;
    let shipping_section_4_center_button_href = shipping_section_4_center_button_href_val.value;
    let shipping_section_4_right_image = shipping_section_4_right_image_val.src;
    let shipping_section_4_right_button = shipping_section_4_right_button_val.value;
    let shipping_section_4_right_button_href = shipping_section_4_right_button_href_val.value;

    let shippingDataClone = structuredClone(shippingData);
    shippingDataClone.forEach(item => {
        if (item.key == "section_1_image_path") {
            if (shipping_section_1_image.includes("data:image")) {
                item.value_base64 = shipping_section_1_image;
            }
        } else if (item.key == "section_3_title") {
            item.value = shipping_section_3_title;
        } else if (item.key == "section_3_content") {
            item.value = shipping_section_3_content;
        } else if (item.key == "section_3_image_path") {
            if (shipping_section_3_image.includes("data:image")) {
                item.value_base64 = shipping_section_3_image;
            }
        } else if (item.key == "section_4_left_button") {
            item.value = shipping_section_4_left_button;
        } else if (item.key == "section_4_left_button_href") {
            item.value = shipping_section_4_left_button_href;
        } else if (item.key == "section_4_left_image_path") {
            if (shipping_section_4_left_image.includes("data:image")) {
                item.value_base64 = shipping_section_4_left_image;
            }
        } else if (item.key == "section_4_center_button") {
            item.value = shipping_section_4_center_button;
        } else if (item.key == "section_4_center_button_href") {
            item.value = shipping_section_4_center_button_href;
        } else if (item.key == "section_4_center_image_path") {
            if (shipping_section_4_center_image.includes("data:image")) {
                item.value_base64 = shipping_section_4_center_image;
            }
        } else if (item.key == "section_4_right_button") {
            item.value = shipping_section_4_right_button;
        } else if (item.key == "section_4_right_button_href") {
            item.value = shipping_section_4_right_button_href;
        } else if (item.key == "section_4_right_image_path") {
            if (shipping_section_4_right_image.includes("data:image")) {
                item.value_base64 = shipping_section_4_right_image;
            }
        }
    });

    // Variable All Data
    let sendData = {
        lstAboutUsContents: aboutUsDataClone,
        lstB2bOrderingContents: b2bOrderingDataClone,
        lstProductPersonalisationContents: productPersonalisationDataClone,
        lstProductPersonalisationQuestions: productPersonalisationQuestionData,
        lstProductPersonalisationSection5Slideshows: productPersonalisationSection5SlideshowDataTemp,
        lstProductPersonalisationSection7Slideshows: productPersonalisationSection7SlideshowDataTemp,
        lstShippingContents: shippingDataClone,
        lstShippingQuestions: shippingQuestionData,
    };

    return sendData;
}

/**
    * SET DATA RESET API
*/
function setDataResetApi() {
    try {
        renderProductionPersonalisationSection5SlideshowsGrid();
        createProductionPersonalisationSection5Slideshows();
        renderProductionPersonalisationSection7SlideshowsGrid();
        createProductionPersonalisationSection7Slideshows();
        setData();

    } catch (error) {
        console.log(error);
    }
}

/**
    * SAVE DATA
*/
function saveData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);

    axios.post(Pr.URL_API + "/mgmt-contents", prepareData(), {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        Dialog.close();
        mData = structuredClone(res.data);

        aboutUsData = structuredClone(mData.lstAboutUsContents);
        b2bOrderingData = structuredClone(mData.lstB2bOrderingContents);
        productPersonalisationData = structuredClone(mData.lstProductPersonalisationContents);
        productPersonalisationQuestionData = structuredClone(mData.lstProductPersonalisationQuestions);
        productPersonalisationSection5SlideshowData = structuredClone(mData.lstProductPersonalisationSection5Slideshows);
        productPersonalisationSection7SlideshowData = structuredClone(mData.lstProductPersonalisationSection7Slideshows);
        lastProductPersonalisationSection5SlideshowNo = structuredClone(mData.lastProductPersonalisationSection5Slideshows);
        lastProductPersonalisationSection5SlideshowNoDefault = structuredClone(mData.lastProductPersonalisationSection5SlideshowNo);
        lastProductPersonalisationSection7SlideshowNo = structuredClone(mData.lastProductPersonalisationSection7Slideshows);
        lastProductPersonalisationSection7SlideshowNoDefault = structuredClone(mData.lastProductPersonalisationSection7SlideshowNo);
        shippingData = structuredClone(mData.lstShippingContents);
        shippingQuestionData = structuredClone(mData.lstShippingQuestions);
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

    product_personalisation_section_11_btn_save_cc.onclick = function () {
        let questionData = null;
        if (productPersonalisationQuestionSelected == null) {
            questionData = new Model.Question();
        } else {
            questionData = productPersonalisationQuestionData.find(obj => obj.question_no == productPersonalisationQuestionSelected);
        }

        questionData.question_position = questionData.question_position == 0 ? productPersonalisationQuestionData.length + 1 : questionData.question_position;
        let question_content = FM.nullToString(product_personalisation_section_11_question_val.value);
        let answer_content = FM.nullToString(product_personalisation_section_11_answer_val.value);
        if (question_content.length == 0 || answer_content.length == 0) {
            Dialog.setDialog("error", Mess.getMess("E00005"), null, null, "Confirm");
            return;
        }
        questionData.question_content = question_content;
        questionData.answer_content = answer_content;

        if (productPersonalisationQuestionSelected == null) {
            productPersonalisationQuestionData.push(questionData);
        }
        renderProductPersonalisationQuestionGrid();
        resetProductPersonalisationQuestionForm();

        // Reset button
        productPersonalisationQuestionSelected = null;
        product_personalisation_section_11_btn_save_cc.textContent = "Create";
        product_personalisation_section_11_btn_cancel_cc.textContent = "Clear";

        Toast.show(Mess.getMess("I00009"));
    };
    product_personalisation_section_11_btn_cancel_cc.addEventListener('click', resetProductPersonalisationQuestionForm);

    shipping_section_2_btn_save_cc.onclick = function () {
        let questionData = null;
        if (shippingQuestionSelected == null) {
            questionData = new Model.Question();
        } else {
            questionData = shippingQuestionData.find(obj => obj.question_no == shippingQuestionSelected);
        }

        questionData.question_position = questionData.question_position == 0 ? shippingQuestionData.length + 1 : questionData.question_position;
        let question_content = FM.nullToString(shipping_section_2_question_val.value);
        let answer_content = FM.nullToString(shipping_section_2_answer_val.value);
        if (question_content.length == 0 || answer_content.length == 0) {
            Dialog.setDialog("error", Mess.getMess("E00005"), null, null, "Confirm");
            return;
        }
        questionData.question_content = question_content;
        questionData.answer_content = answer_content;

        if (shippingQuestionSelected == null) {
            shippingQuestionData.push(questionData);
        }
        renderShippingQuestionGrid();
        resetShippingQuestionForm();

        // Reset button
        shippingQuestionSelected = null;
        shipping_section_2_btn_save_cc.textContent = "Create";
        shipping_section_2_btn_cancel_cc.textContent = "Clear";

        Toast.show(Mess.getMess("I00009"));
    };
    shipping_section_2_btn_cancel_cc.addEventListener('click', resetShippingQuestionForm);
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

    product_personalisation_section_5_btn_add.addEventListener("click", () => {
        product_personalisation_section_5_multi_img_upload.click();
    });

    product_personalisation_section_5_multi_img_upload.addEventListener('change', (event) => {
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
                    newItem.slideshow_no = lastProductPersonalisationSection5SlideshowNo + 1;
                    lastProductPersonalisationSection5SlideshowNo++;
                    newItem.slideshow_base64 = e.target.result;
                    newItem.slideshow_position = 1;
                    productPersonalisationSection5SlideshowData.unshift(newItem);
                    renderProductionPersonalisationSection5SlideshowsGrid();
                    createProductionPersonalisationSection5Slideshows();
                    const rows = product_personalisation_section_5_grid.querySelectorAll(".row");
                    rows.forEach((row, index) => {
                        row.dataset.pos = index + 1;
                        let itemData = productPersonalisationSection5SlideshowData.find(obj => obj.slideshow_no == row.dataset.id);
                        itemData.slideshow_position = index + 1;
                    });
                    productPersonalisationSection5SlideshowData.sort((a, b) => a.slideshow_position - b.slideshow_position);
                };

                reader.readAsDataURL(file);
            });

            product_personalisation_section_5_multi_img_upload.value = '';
        } catch (exception) {
            console.log(exception);
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    });

    product_personalisation_section_7_btn_add.addEventListener("click", () => {
        product_personalisation_section_7_multi_img_upload.click();
    });

    product_personalisation_section_7_multi_img_upload.addEventListener('change', (event) => {
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
                    newItem.slideshow_no = lastProductPersonalisationSection7SlideshowNo + 1;
                    lastProductPersonalisationSection7SlideshowNo++;
                    newItem.slideshow_base64 = e.target.result;
                    newItem.slideshow_position = 1;
                    productPersonalisationSection7SlideshowData.unshift(newItem);
                    renderProductionPersonalisationSection7SlideshowsGrid();
                    createProductionPersonalisationSection7Slideshows();
                    const rows = product_personalisation_section_7_grid.querySelectorAll(".row");
                    rows.forEach((row, index) => {
                        row.dataset.pos = index + 1;
                        let itemData = productPersonalisationSection7SlideshowData.find(obj => obj.slideshow_no == row.dataset.id);
                        itemData.slideshow_position = index + 1;
                    });
                    productPersonalisationSection7SlideshowData.sort((a, b) => a.slideshow_position - b.slideshow_position);
                };

                reader.readAsDataURL(file);
            });

            product_personalisation_section_7_multi_img_upload.value = '';
        } catch (exception) {
            console.log(exception);
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    });
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