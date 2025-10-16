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


/* view item */
// upload image input elements
const img_upload = D.getById("img-upload");
// language selection elements
const languageSelect = D.getSelector('.select-box');
const optionsContainer = D.getSelector('.options');
const options = D.getSelectorAll('.option');
// news elements
const newsGrid = D.getById("newsGrid");
const news_image_val = D.getById("news_image_val");
const news_id_val = D.getById("news_id_val");
const news_title_val = D.getById("news_title_val");
const news_description_val = D.getById("news_description_val");
const btn_reset_news = D.getById("btn_reset_news");
const btn_cancel_ns = D.getById("btn_cancel_ns");
const btn_save_ns = D.getById("btn_save_ns");
const btn_save_news = D.getById("btn-save-news");
// layout setting elements
const sortable_list = D.getById("sortable-list");
const btn_add_text = D.getById('add-text');
const btn_add_image = D.getById('add-image');

/* variable */
var mData = null;
var newsData;
var selectedLanguage = "vi";
var currentImg = null;
var newsSelected = null;
var newsDetailSelected = null;



/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-news",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);
            if (mData.lstNews != null) {
                for (let i = 0; i < mData.lstNews.length; i++) {
                    mData.lstNews[i].news_position = i + 1;
                }
            }
            newsData = structuredClone(mData.lstNews);

            handleImageUpload();
            renderNewsGrid();
            layoutSettingInit();

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
    * LANGUAGE SELECTION INIT
*/
function languageSelectionInit() {
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (option.dataset.value != selectedLanguage) {
                languageOnchangeNews(option);
            } else {
                optionsContainer.classList.remove('show');
            }
        });
    });

    languageSelect.addEventListener('click', () => {
        optionsContainer.classList.toggle('show');
    });

    D.$dom.addEventListener('click', (e) => {
        if (!languageSelect.contains(e.target) && !optionsContainer.contains(e.target)) {
            optionsContainer.classList.remove('show');
        }
    });
}



/**
    * LANGUAGE ONCHANGE NEWS
    * 
    * @param option: selected language option
*/
function languageOnchangeNews(option) {
    if (D.getSelector(".editing-field") != null) {
        Dialog.setDialog("error", Mess.getMess("E00007") + "'Chi tiết tin tức'", null, null, "Confirm");
        return;
    }

    if (!news_image_val.src.includes("image_default.png") || news_id_val.value.length > 0 || news_title_val.value.length > 0 || news_description_val.value.length > 0) {
        if (newsSelected == null) {
            Dialog.setDialog("confirm", Mess.getMess("Q00004"), "Không", "Lưu");
            D.getById("neg-btn").onclick = function (evt) {
                refreshLanguageSelection(option);
                resetNewsForm();
                renderNewsGrid();
                layoutSettingInit();
                newsSelected = null;
                Toast.show(Mess.getMess("I00011"));
                Dialog.close();
            };

            D.getById("pos-btn").onclick = function (evt) {
                let newData = null;
                let id = FM.nullToString(news_id_val.value);
                let name = FM.nullToString(news_title_val.value);
                let des = FM.nullToString(news_description_val.value);
                if (id.length == 0 || name.length == 0 || des.length == 0) {
                    Dialog.setDialog("error", Mess.getMess("E00005"), null, null, "Confirm");
                    return;
                }

                if (newsSelected == null) {
                    newData.news_position = newsData.length + 1;
                    newsData.unshift(newData);
                } else {
                    if (newsSelected.news_no != 0) {
                        newData = newsSelected;
                    } else {
                        const checkIndex = newsData.findIndex(object => {
                            return object.news_position === newsSelected.news_position && object.news_no === newsSelected.news_no;
                        });
                        if (checkIndex == -1) {
                            newData = new Model.News().parseData(structuredClone(newsSelected));
                            newData.news_position = newsData.length + 1;
                            newsData.unshift(newData);
                        } else {
                            newData = newsData.find(obj => obj.news_position == newsSelected.news_position);
                        }
                    }
                }

                if (newData.news_no == 0) {
                    newData.mode = 0;
                } else {
                    newData.mode = 1;
                }

                if (news_image_val.src.includes("data:image")) {
                    newData.news_image_base64 = news_image_val.src;
                }
                newData.news_id = id;
                newData["news_title_" + selectedLanguage] = name;
                newData["news_description_" + selectedLanguage] = des;
                newsSelected = null;
                resetLayoutSetting();

                refreshLanguageSelection(option);
                resetNewsForm();
                renderNewsGrid();
                layoutSettingInit();
                Toast.show(Mess.getMess("I00011"));
                Dialog.close();
            };
        } else {
            if ((news_image_val.src.trim() != newsSelected.news_image_path && FM.nullToString(newsSelected.news_image_path).length > 0) ||
                (news_image_val.src.trim() != newsSelected.news_image_base64 && FM.nullToString(newsSelected.news_image_base64).length > 0) ||
                news_id_val.value.trim() != newsSelected.news_id ||
                news_title_val.value.trim() != newsSelected["news_title_" + selectedLanguage] ||
                news_description_val.value.trim() != newsSelected["news_description_" + selectedLanguage].replaceAll("\n", "<br>")) {

                Dialog.setDialog("confirm", Mess.getMess("Q00004"), "Không", "Lưu");
                D.getById("neg-btn").onclick = function (evt) {
                    refreshLanguageSelection(option);
                    resetNewsForm();
                    renderNewsGrid();
                    resetLayoutSetting();
                    layoutSettingInit();
                    setNewsItem(newsSelected);

                    Toast.show(Mess.getMess("I00011"));
                    Dialog.close();
                };

                D.getById("pos-btn").onclick = function (evt) {
                    let newData = null;
                    let id = FM.nullToString(news_id_val.value);
                    let name = FM.nullToString(news_title_val.value);
                    let des = FM.nullToString(news_description_val.value);
                    if (id.length == 0 || name.length == 0 || des.length == 0) {
                        Dialog.setDialog("error", Mess.getMess("E00005"), null, null, "Confirm");
                        return;
                    }

                    if (newsSelected == null) {
                        newData.news_position = newsData.length + 1;
                        newsData.unshift(newData);
                    } else {
                        if (newsSelected.news_no != 0) {
                            newData = newsSelected;
                        } else {
                            const checkIndex = newsData.findIndex(object => {
                                return object.news_position === newsSelected.news_position && object.news_no === newsSelected.news_no;
                            });
                            if (checkIndex == -1) {
                                newData = new Model.News().parseData(structuredClone(newsSelected));
                                newData.news_position = newsData.length + 1;
                                newsData.unshift(newData);
                            } else {
                                newData = newsData.find(obj => obj.news_position == newsSelected.news_position);
                            }
                        }
                    }

                    if (newData.news_no == 0) {
                        newData.mode = 0;
                    } else {
                        newData.mode = 1;
                    }

                    if (news_image_val.src.includes("data:image")) {
                        newData.news_image_base64 = news_image_val.src;
                    }
                    newData["news_title_" + selectedLanguage] = name;
                    newData["news_description_" + selectedLanguage] = des;
                    resetLayoutSetting();

                    refreshLanguageSelection(option);
                    resetNewsForm();
                    renderNewsGrid();
                    layoutSettingInit();
                    setNewsItem(newsSelected);
                    Toast.show(Mess.getMess("I00011"));
                    Dialog.close();
                };
            } else {
                refreshLanguageSelection(option);
                resetNewsForm();
                renderNewsGrid();
                layoutSettingInit();
                setNewsItem(newsSelected);
                Toast.show(Mess.getMess("I00011"));
                Dialog.close();
            }
        }
    } else {
        newsSelected = null;
        newsDetailSelected = null;
        refreshLanguageSelection(option);
        renderNewsGrid();
        layoutSettingInit();
        Toast.show(Mess.getMess("I00011"));
    }
}


/**
    * REFRESH LANGUAGE SELECTION
    * 
    * @param recent_option: selected language option
*/
function refreshLanguageSelection(recent_option) {
    const imgSrc = recent_option.querySelector('img').src;
    const text = recent_option.querySelector('span').textContent;
    languageSelect.querySelector('img').src = imgSrc;
    languageSelect.querySelector('span').textContent = text;
    optionsContainer.classList.remove('show');
    selectedLanguage = recent_option.dataset.value;
    currentImg = null;
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
    * RENDER NEWS GRID
*/
function renderNewsGrid() {
    newsGrid.innerHTML = "";
    if (newsData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "Không có dữ liệu";
        newsGrid.append(status);
    }

    // create news list view
    newsData.map((news, index) => createNewsRow(news, index));

    // news list reset button click event
    btn_reset_news.onclick = function () {
        Dialog.setDialog("confirm", Mess.getMess("Q00003"), "Không", "Đặt lại");
        D.getById("pos-btn").onclick = function (evt) {
            newsData = structuredClone(mData.lstNews);
            renderNewsGrid();
            resetNewsForm();
            resetLayoutSetting();
            Toast.show(Mess.getMess("I00010"));
            Dialog.close();
        };
    };

    setNewsFormButton();
};


/**
    * ADD ROW FOR NEWS GRID
    * 
    * @param itemData: news data
    * @param index: index
*/
function createNewsRow(itemData, index) {
    let image_src = "../assets/icon/image_default.png";
    if (FM.nullToString(itemData.news_image_base64).length > 0) {
        image_src = itemData.news_image_base64;
    } else if (FM.nullToString(itemData.news_image_path).length > 0) {
        image_src = itemData.news_image_path;
    }

    let row = D.create("div");
    row.setAttribute("class", "row ns-item");
    row.setAttribute("data-id", itemData.news_no);

    let stt = D.create("div");
    stt.setAttribute("class", "col-1 text ta-c ns-pos");
    stt.textContent = index + 1;
    itemData.news_position = index + 1;

    let img_div = D.create("div");
    img_div.setAttribute("class", "col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 ns-img");
    let img = D.create("img");
    img.setAttribute("alt", itemData.news_image_name);
    img.src = image_src;
    img_div.append(img);

    let name = D.create("div");
    name.setAttribute("class", "col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-2 text ellipsis ns-name");
    name.textContent = FM.nullToString(itemData["news_title_" + selectedLanguage]);

    let des = D.create("div");
    des.setAttribute("class", "col-3 col-sm-3 col-md-3 col-lg-4 col-xl-4 col-xxl-4 text ellipsis ns-des");
    des.textContent = FM.nullToString(itemData["news_description_" + selectedLanguage]);

    let btn_div = D.create("div");
    btn_div.setAttribute("class", "col-2 col-sm-2 col-md-3 col-lg-2 col-xl-2 col-xxl-2 col-buttons");
    btn_div.setAttribute("data-pos", itemData.news_position);

    let btn_edit = D.create("button");
    btn_edit.setAttribute("class", "edit-ns-btn ic-btn");
    btn_edit.setAttribute("data-id", itemData.news_no);
    let btn_edit_ic = D.create("i");
    btn_edit_ic.setAttribute("class", "fa-solid fa-pen-to-square");
    btn_edit.append(btn_edit_ic);
    btn_div.append(btn_edit);

    let btn_del = D.create("button");
    btn_del.setAttribute("class", "del-img-btn ic-btn");
    btn_del.setAttribute("data-id", itemData.news_no);
    let btn_del_ic = D.create("i");
    btn_del_ic.setAttribute("class", "fas fa-trash");
    btn_del.append(btn_del_ic);
    btn_div.append(btn_del);

    row.append(stt);
    row.append(img_div);
    row.append(name);
    row.append(des);
    row.append(btn_div);
    newsGrid.append(row);


    // edit news button click event
    btn_edit.onclick = function (evt) {
        const rows = D.$dom.querySelectorAll(".ns-item");
        rows.forEach((row) => {
            if (this.dataset.id != 0) {
                if (row.dataset.id == this.dataset.id) {
                    row.querySelector(".edit-ns-btn").disabled = true;
                    if (!row.classList.contains("highlight")) {
                        row.classList.add("highlight");
                    }
                    newsSelected = newsData.find(obj => obj.news_no == this.dataset.id);
                    setNewsFormButton();
                    setNewsItem(newsData.find(obj => obj.news_no == this.dataset.id), "\n");
                } else {
                    row.classList.remove("highlight");
                    row.querySelector(".edit-ns-btn").disabled = false;
                }
            } else {
                if (row.querySelector(".ns-pos").textContent == this.parentElement.dataset.pos) {
                    row.querySelector(".edit-ns-btn").disabled = true;
                    if (!row.classList.contains("highlight")) {
                        row.classList.add("highlight");
                    }
                    newsSelected = newsData.find(obj => obj.news_position == row.querySelector(".ns-pos").textContent);
                    setNewsFormButton();
                    setNewsItem(newsSelected, "\n");
                } else {
                    row.classList.remove("highlight");
                    row.querySelector(".edit-ns-btn").disabled = false;
                }
            }
        });
    };

    // delete news button click event
    btn_del.onclick = function (evt) {
        if (this.dataset.id == 0) {
            newsData = newsData.filter(obj => obj.news_position != this.parentElement.dataset.pos);
            newsSelected = null;
        } else {
            newsData = newsData.filter(obj => obj.news_no != this.dataset.id);
            newsSelected = null;
        }

        setNewsFormButton();
        resetNewsForm();
        resetLayoutSetting();
        renderNewsGrid();
        Toast.show(Mess.getMess("I00009"));
    };
}


/**
    * SET NEWS FORM BUTTON
*/
function setNewsFormButton() {
    // set text for news button
    if (newsSelected == null) {
        btn_save_ns.textContent = "Thêm";
        btn_cancel_ns.textContent = "Hủy";
    } else {
        btn_save_ns.textContent = "Cập nhật";
        btn_cancel_ns.textContent = "Bỏ chọn";
    }

    // cancel news button click event
    btn_cancel_ns.onclick = function (evt) {
        if (newsSelected != null) {
            const rows = D.$dom.querySelectorAll(".ns-item");
            rows.forEach((row) => {
                if (row.dataset.id == newsSelected.news_no) {
                    row.querySelector(".edit-ns-btn").disabled = false;
                }
                row.classList.remove("highlight");
            });
            newsSelected = null;
            resetNewsForm();
            setNewsFormButton();
            resetLayoutSetting();
        } else {
            resetNewsForm();
        }

    };

    // save news button click event
    btn_save_ns.onclick = function () {
        if (D.getSelector(".editing-field") != null) {
            Dialog.setDialog("error", Mess.getMess("E00007") + "'Chi tiết tin tức'", null, null, "Confirm");
            return;
        }

        let newData = null;
        let id = FM.nullToString(news_id_val.value);
        let name = FM.nullToString(news_title_val.value);
        let des = FM.nullToString(news_description_val.value);
        if (id.length == 0 || name.length == 0 || des.length == 0) {
            Dialog.setDialog("error", Mess.getMess("E00005") + " tin tức !", null, null, "Confirm");
            return;
        }
        if (news_id_val.value.includes(" ")) {
            Dialog.setDialog("error", Mess.getMess("E00008"), null, null, "Confirm");
            return;
        }

        if (newsSelected == null) {
            newData = new Model.News();
            newData.news_position = newsData.length + 1;
            newsData.unshift(newData);
        } else {
            if (newsSelected.news_no != 0) {
                newData = newsSelected;
            } else {
                const checkIndex = newsData.findIndex(object => {
                    return object.news_position === newsSelected.news_position && object.news_no === newsSelected.news_no;
                });
                if (checkIndex == -1) {
                    newData = new Model.News().parseData(structuredClone(newsSelected));
                    newData.news_position = newsData.length + 1;
                    newsData.unshift(newData);
                } else {
                    newData = newsData.find(obj => obj.news_position == newsSelected.news_position);
                }
            }
        }

        if (newData.news_no == 0) {
            newData.mode = 0;
        } else {
            newData.mode = 1;
        }

        if (news_image_val.src.includes("data:image")) {
            newData.news_image_base64 = news_image_val.src;
        }
        newData.news_id = news_id_val.value;
        newData["news_title_" + selectedLanguage] = name;
        newData["news_description_" + selectedLanguage] = des;
        newsSelected = null;

        renderNewsGrid();
        resetNewsForm();
        resetLayoutSetting();
        newsGrid.scrollTop = newsGrid.scrollHeight;
        Toast.show(Mess.getMess("I00009"));
    };
}


/**
    * SET NEWS ITEM DATA
    * 
    * @param data: news item data
    * @param replaceValue: replace value
*/
function setNewsItem(data, replaceValue) {
    // set news data
    let img_src = "../assets/icon/image_default.png";
    if (data.news_image_base64 != null) {
        img_src = data.news_image_base64;
    } else if (data.news_image_path != null) {
        img_src = data.news_image_path;
    }
    news_image_val.src = img_src;
    news_id_val.value = data.news_id;
    news_title_val.value = data["news_title_" + selectedLanguage];
    if (replaceValue != null) {
        news_description_val.value = FM.nullToString(data["news_description_" + selectedLanguage]).replaceAll("<br>", replaceValue);
    } else {
        news_description_val.value = FM.nullToString(data["news_description_" + selectedLanguage]);
    }

    // set news detail 
    if (data.news_detail != null) {
        createItemLayoutSetting(data.news_detail);
    }
    layoutSettingInit();
}


/**
    * RESET NEWS FORM
*/
function resetNewsForm() {
    news_image_val.src = "../assets/icon/image_default.png";
    news_id_val.value = "";
    news_title_val.value = "";
    news_description_val.value = "";
}


/**
    * LAYOUT SETTING INIT
*/
function layoutSettingInit() {
    layoutSettingFormInit();
    btn_add_text.onclick = function () {
        addTextItem();
    };
    btn_add_image.onclick = function () {
        addImageItem();
    };
}


/**
    * LAYOUT SETTING FORM INIT
*/
function layoutSettingFormInit() {
    new Sortable(sortable_list, {
        animation: 150,
        ghostClass: 'blue-background-class',
        filter: '.button-container',
        onEnd: function (evt) {
            const rows = sortable_list.querySelectorAll(".item");
            rows.forEach((row, index) => {
                let itemData = newsSelected.news_detail.find(obj => obj.news_detail_no == row.dataset.id && obj.position == row.dataset.pos);
                row.dataset.pos = index + 1;
                itemData.position = index + 1;
            });

            newsSelected.news_detail.sort((a, b) => a.position - b.position);
        }
    });
}


/**
    * KEEP IMAGE UPLOAD PROCESSING FUNCTION
    * 
    * @param imageContent: image element
*/
function bindUploadEvents(imageContent) {
    const uploadArea = imageContent.querySelector('.upload-area');
    const input = imageContent.querySelector('input[type="file"]');
    if (uploadArea && input) {
        uploadArea.addEventListener('click', () => input.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.background = '#d0d0d0';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.background = '';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.background = '';
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                input.files = e.dataTransfer.files;
                const reader = new FileReader();
                reader.onload = function (e) {
                    imageContent.innerHTML = `
                            <div class="image-edit">
                                <img src="${e.target.result}" alt="Hình ảnh">
                                <span class="remove-image">X</span>
                            </div>`;

                    const removeBtn = imageContent.querySelector('.remove-image');
                    if (removeBtn) {
                        removeBtn.addEventListener('click', function () {
                            imageContent.innerHTML = `
                                <div class="upload-area">Kéo thả hoặc nhấn để tải ảnh lên</div>
                                <input type="file" accept="image/*">`;
                            bindUploadEvents(imageContent);
                        });
                    }
                };
                reader.readAsDataURL(file);
            }
        });
        input.addEventListener('change', () => {
            if (input.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imageContent.innerHTML = `
                            <div class="image-edit">
                                <img src="${e.target.result}" alt="Hình ảnh">
                                <span class="remove-image">X</span>
                            </div>`;

                    const removeBtn = imageContent.querySelector('.remove-image');
                    if (removeBtn) {
                        removeBtn.addEventListener('click', function () {
                            imageContent.innerHTML = `
                                <div class="upload-area">Kéo thả hoặc nhấn để tải ảnh lên</div>
                                <input type="file" accept="image/*">`;
                            bindUploadEvents(imageContent);
                        });
                    }
                };
                reader.readAsDataURL(input.files[0]);
            }
        });
    }
}


/**
    * ADD TEXT ITEM
    * 
    * @param data: item data
*/
function addTextItem(data) {
    const newItem = D.create('div');
    newItem.className = 'item';
    newItem.setAttribute('data-id', data != null ? FM.nullToInt(data.news_detail_no) : 0);
    newItem.setAttribute('type', "text");

    if (data == null) { // create new news detail (type = "text")
        let newData = new Model.NewsDetail();
        newData.type = "text";
        newData.position = sortable_list.querySelectorAll(".item").length + 1;
        if (newsSelected == null) {
            newsSelected = new Model.News();
        }
        newsSelected.news_detail.push(newData);

        newItem.classList.add("editing-field");
        newItem.setAttribute('data-pos', newData.position);
        newItem.innerHTML = `
                <textarea class="text"></textarea>
                <div class="actions">
                    <span class="ic-btn stb-btn edit-btn-layout"><i class='fa-solid fa-check'></i></span>
                    <span class="ic-btn stb-btn del-btn-layout"><i class="fa-solid fa-trash"></i></span>
                </div>`;
        const textarea = newItem.querySelector('textarea');
        textarea.focus();
        newsDetailSelected = newData;
        setDisableLayoutButton(true);
        setButtonRowLayout(0, newItem.querySelector(".edit-btn-layout"));
    } else { // set news detail (type = "text")
        newItem.setAttribute('data-pos', data.position);
        newItem.innerHTML = `
                <div class="text-content text">${FM.nullToString(data["value_" + selectedLanguage]) == "" ? "..." : data["value_" + selectedLanguage]}</div>
                <div class="actions">
                    <span class="ic-btn stb-btn edit-btn-layout"><i class="fa-solid fa-pen-to-square"></i></span>
                    <span class="ic-btn stb-btn del-btn-layout"><i class="fa-solid fa-trash"></i></span>
                </div>`;
        data["value_" + selectedLanguage] = FM.nullToString(data["value_" + selectedLanguage]).replaceAll(/\n/g, "<br>");
    }
    sortable_list.insertBefore(newItem, D.getSelector('.button-container'));
    sortable_list.scrollTop = sortable_list.scrollHeight;

    setButtonAddText(newItem);
}


/**
    * SET BUTTON TEXT ITEM EVENT
    * 
    * @param newItem: new item element
*/
function setButtonAddText(newItem) {
    newItem.querySelector('.del-btn-layout').addEventListener('click', function () {
        newsSelected.news_detail = newsSelected.news_detail.filter(obj => obj.position != this.closest('.item').dataset.pos);
        newsSelected.news_detail = newsSelected.news_detail.map((obj, index) => ({ ...obj, position: index + 1 }));
        newsDetailSelected = null;
        this.closest('.item').remove();
        setDisableLayoutButton(false);
        setButtonRowLayout(1);
    });
    newItem.querySelector('.edit-btn-layout').addEventListener('click', function () {
        const textContent = newItem.querySelector('.text-content');
        if (textContent && textContent.textContent.length == 0) {   // news detail (type = "text") no data
            if (textContent.textContent.length > 0) {
                this.closest('.item').remove();
            }
            newsDetailSelected = null;

            setDisableLayoutButton(false);
            setButtonRowLayout(1);
        } else if (newItem.querySelector('textarea')) { // news detail (type = "text") is editing
            const textArea = newItem.querySelector('textarea');
            if (FM.nullToString(textArea.value).length == 0 && newsDetailSelected.news_detail_no == 0) { // editing news detail (type = "text") no data
                newItem.innerHTML = `
                <div class="text-content text">${textArea.value.replace(/\n/g, '<br>') == "" ? "..." : textArea.value.replace(/\n/g, '<br>')}</div>
                <div class="actions">
                    <span class="ic-btn stb-btn edit-btn-layout"><i class="fa-solid fa-pen-to-square"></i></span>
                    <span class="ic-btn stb-btn del-btn-layout"><i class="fa-solid fa-trash"></i></span>
                </div>`;
                setButtonAddText(newItem);
            } else {    // editing news detail (type = "text") has data
                if (newsDetailSelected["value_" + selectedLanguage] != FM.nullToString(textArea.value).trim() || FM.nullToString(newsDetailSelected["value_" + selectedLanguage]).length == 0) {
                    newsDetailSelected["value_" + selectedLanguage] = FM.nullToString(textArea.value).trim();
                }
                newItem.innerHTML = `
                <div class="text-content text">${textArea.value.replace(/\n/g, '<br>') == "" ? "..." : textArea.value.replace(/\n/g, '<br>')}</div>
                <div class="actions">
                    <span class="ic-btn stb-btn edit-btn-layout"><i class="fa-solid fa-pen-to-square"></i></span>
                    <span class="ic-btn stb-btn del-btn-layout"><i class="fa-solid fa-trash"></i></span>
                </div>`;
                newsDetailSelected["value_" + selectedLanguage] = FM.nullToString(newsDetailSelected["value_" + selectedLanguage]).replaceAll(/\n/g, "<br>");
                setButtonAddText(newItem);
            }

            newsDetailSelected = null;
            newItem.classList.remove("editing-field");
            setDisableLayoutButton(false);
            setButtonRowLayout(1);
        } else {    // create editing news detail (type = "text")
            newItem.classList.add("editing-field");
            const currentText = textContent.innerHTML.replace(/<br\s*\/?>/gi, '\n');
            textContent.innerHTML = `<textarea class="text">${currentText}</textarea>`;
            const textarea = textContent.querySelector('textarea');
            this.innerHTML = "<i class='fa-solid fa-check'></i>";
            if (textarea.value == "...") {
                textarea.value = "";
            }
            textarea.focus();
            newsDetailSelected = newsSelected.news_detail.find(obj => obj.position == newItem.dataset.pos);

            setDisableLayoutButton(true);
            setButtonRowLayout(0, this);
        }
    });
}


/**
    * ADD IMAGE ITEM
    * 
    * @param data: item data
*/
function addImageItem(data) {
    const newItem = D.create('div');
    newItem.className = 'item';
    newItem.setAttribute('data-id', data != null ? FM.nullToInt(data.news_detail_no) : 0);
    newItem.setAttribute('type', "image");
    if (data == null) { // create new news detail (type = "image")
        let newData = new Model.NewsDetail();
        newData.type = "image";
        newData.position = sortable_list.querySelectorAll(".item").length + 1;
        if (newsSelected == null) {
            newsSelected = new Model.News();
        }
        newsSelected.news_detail.push(newData);
        newsDetailSelected = newData;

        newItem.classList.add("editing-field");
        newItem.setAttribute('data-pos', newData.position);
        newItem.innerHTML = `
            <div class="image-content">
                <div class="upload-area text">Kéo thả hoặc nhấn để tải ảnh lên</div>
                <input type="file" accept="image/*">
            </div>
            <div class="actions">
                <span class="ic-btn stb-btn edit-btn-layout"><i class='fa-solid fa-check'></i></span>
                <span class="ic-btn stb-btn del-btn-layout"><i class="fa-solid fa-trash"></i></span>
            </div>`;

        const imageContent = newItem.querySelector('.image-content');
        bindUploadEvents(imageContent);
        setButtonAddImage(newItem);
        setButtonRowLayout(0, newItem.querySelector(".edit-btn-layout"));
        setDisableLayoutButton(true);
    } else {    // set news detail (type = "image")
        let img_name = "";
        if (newsSelected != null) {
            if (newsSelected.news_no != 0) {
                img_name = newsData.find(obj => obj.news_no == newsSelected.news_no)["news_title_" + selectedLanguage];
            }
        }

        newItem.setAttribute('data-pos', data.position);
        let imageDataSrc = null;
        if (data["value_base64"]) {
            imageDataSrc = data["value_base64"];
        } else {
            imageDataSrc = data["value_" + selectedLanguage];
        }
        newItem.innerHTML = `
            <div class="image-content">
                <img src="${FM.nullToString(imageDataSrc)}" alt="${img_name}">
            </div>
            <div class="actions">
                <span class="ic-btn stb-btn edit-btn-layout"><i class="fa-solid fa-pen-to-square"></i></span>
                <span class="ic-btn stb-btn del-btn-layout"><i class="fa-solid fa-trash"></i></span>
            </div>`;
        setButtonAddImage(newItem);
    }
    sortable_list.insertBefore(newItem, D.getSelector('.button-container'));
    sortable_list.scrollTop = sortable_list.scrollHeight;
}


/**
    * SET BUTTON IMAGE ITEM EVENT
    * 
    * @param newItem: new item element
*/
function setButtonAddImage(newItem) {
    newItem.querySelector('.del-btn-layout').addEventListener('click', function () {
        newsSelected.news_detail = newsSelected.news_detail.filter(obj => obj.position != this.closest('.item').dataset.pos);
        newsSelected.news_detail = newsSelected.news_detail.map((obj, index) => ({ ...obj, position: index + 1 }));
        newsDetailSelected = null;
        this.closest('.item').remove();
        setDisableLayoutButton(false);
        setButtonRowLayout(1);
    });
    newItem.querySelector('.edit-btn-layout').addEventListener('click', function () {
        const imageContent = newItem.querySelector('.image-content');
        if (imageContent.querySelector('.image-edit')) {    // news detail (type = "image") is editing
            const img = imageContent.querySelector('img');
            if (img) {  // editing news detail (type = "image") has data
                let img_name = "";
                if (newsSelected != null) {
                    if (newsSelected.news_no != 0) {
                        img_name = newsData.find(obj => obj.news_no == newsSelected.news_no)["news_title_" + selectedLanguage];
                    } else {
                        newsSelected.news_image_base64 = img.src;
                    }
                }
                if (img.src.includes("data:image")) {
                    newsDetailSelected["value_base64"] = img.src;
                }
                newItem.innerHTML = `
                    <div class="image-content">
                        <img src="${img.src}" alt="${img_name}">
                    </div>
                    <div class="actions">
                        <span class="ic-btn stb-btn edit-btn-layout"><i class="fa-solid fa-pen-to-square"></i></span>
                        <span class="ic-btn stb-btn del-btn-layout"><i class="fa-solid fa-trash"></i></span>
                    </div>`;
            } else {    // editing news detail (type = "image") no data
                this.closest('.item').remove();
            }
            newsDetailSelected = null;

            newItem.classList.remove("editing-field");
            setDisableLayoutButton(false);
            setButtonAddImage(newItem);
            setButtonRowLayout(1);
        } else {    // uploading image for news detail (type = "image")
            if (imageContent.querySelector('.upload-area')) {   // delete news detail (type = "image") if upload area has no data.
                this.closest('.item').remove();
                newsSelected.news_detail = newsSelected.news_detail.filter(obj => obj.news_detail_no != newsDetailSelected.news_detail_no && obj.position != newsDetailSelected.position);
                newsDetailSelected = null;

                setDisableLayoutButton(false);
                setButtonRowLayout(1);
            } else {    // news detail (type = "image") has data
                const img = imageContent.querySelector('img');
                if (img) {  // news detail (type = "image") has data
                    imageContent.innerHTML = `
                            <div class="image-edit">
                                <img src="${img.src}" alt="Hình ảnh">
                                <span class="remove-image">X</span>
                            </div>`;
                    imageContent.nextElementSibling.querySelector(".edit-btn-layout i").setAttribute("class", "fa-solid fa-check");
                    const removeBtn = imageContent.querySelector('.remove-image');
                    if (removeBtn) {
                        removeBtn.addEventListener('click', function () {
                            imageContent.innerHTML = `
                                <div class="upload-area">Kéo thả hoặc nhấn để tải ảnh lên</div>
                                <input type="file" accept="image/*">`;
                            bindUploadEvents(imageContent);
                        });
                    }
                    newsDetailSelected = newsSelected.news_detail.find(obj => obj.position == newItem.dataset.pos);

                    setDisableLayoutButton(true);
                    setButtonRowLayout(0, this);
                }
            }
        }
    });
}


/**
    * CREATE ITEM LAYOUT SETTING
    * 
    * @param data: item data
*/
function createItemLayoutSetting(data) {
    let items = sortable_list.querySelectorAll(".item");
    items.forEach(item => item.remove());
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i]["value_base64"]) {
                addImageItem(data[i]);
            } else {
                if (data[i].type == "text") {
                    addTextItem(data[i]);
                } else {
                    addImageItem(data[i]);
                }
            }
        }
    }
}


/**
    * SET DISABLE FOR LAYOUT BUTTON
    * 
    * @param disable_val: disable value
*/
function setDisableLayoutButton(disable_val) {
    btn_add_text.disabled = disable_val;
    btn_add_image.disabled = disable_val;
}


/**
    * SET DISPLAY FOR BUTTON EACH ROW
    * 
    * @param display: display value
    * @param recent_btn: recent button
*/
function setButtonRowLayout(display, recent_btn) {
    let buttonArr = sortable_list.querySelectorAll(".stb-btn");
    buttonArr.forEach((btn) => {
        if (display == 0) {
            if (btn != recent_btn && btn != recent_btn.nextElementSibling) {
                btn.style.display = "none";
            } else {
                btn.style.display = "block";
            }
        } else {
            btn.style.display = "block";
        }
    });
}


/**
    * RESET LAYOUT SETTING
*/
function resetLayoutSetting() {
    let items = sortable_list.querySelectorAll(".item");
    items.forEach(item => item.remove());
    setDisableLayoutButton(false);
}


/**
    * PREPARE DATA
*/
function prepareDataNews() {
    // Variable All Data
    newsData.forEach((item, index) => {
        item.news_image_base64 = item.news_image_base64?.includes("data:image") ? item.news_image_base64 : "";
    });
    let sendData = {
        lstNews: newsData,
    };

    return sendData;
}


/**
    * SAVE DATA
*/
function saveDataNews() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);

    axios.post(Pr.URL_API + "/mgmt-news", prepareDataNews(), {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        mData.lstNews = structuredClone(res.data.lstNews);
        if (mData.lstNews != null) {
            for (let i = 0; i < mData.lstNews.length; i++) {
                mData.lstNews[i].news_position = i + 1;
            }
        }
        newsData = structuredClone(mData.lstNews);
        newsDetailSelected = null;
        newsDetailSelected = null;
        renderNewsGrid();
        resetNewsForm();
        resetLayoutSetting();
        setNewsFormButton();

        Dialog.close();
        Toast.show(Mess.getMess("I00014"));
    }).catch(function (error) {
        console.log(error);
    });
}


/**
    * ONCLICK ACTION 
*/
function onclickAction() {
    btn_save_news.onclick = () => {
        if (newsSelected || (news_id_val.value.trim() != "" || news_title_val.value.trim() != "" || news_description_val.value.trim() != "")) {
            Dialog.setDialog("confirm", Mess.getMess("Q00007"), "Không", "Lưu");
            D.getById("neg-btn").onclick = function (evt) {
                Dialog.close();
            };

            D.getById("pos-btn").onclick = function (evt) {
                Dialog.close();
                saveDataNews();
            };
        } else {
            if (!CM.checkDifferencesInArray(newsData, mData.lstNews)) {
                saveDataNews();
            } else {
                Dialog.setDialog("info", Mess.getMess("I00015"), null, null, "Confirm");
            }
        }
    };
}


/**
    * INIT PAGE
*/
function init() {
    Nav.navbarInit();
    languageSelectionInit();
    if (CM.checkTokenExist()) {
        getData();
    }
    onclickAction();
}

window.onload = init;