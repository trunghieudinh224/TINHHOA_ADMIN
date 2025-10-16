/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/07/07
*/
import * as D from './common/dom.js';
import * as CM from '../js/common/common.js';
import * as Pr from './data/param.js';
import * as Mess from './common/message.js';
import * as SS from './common/session.js';
import * as Model from './data/model.js';
import * as FM from './common/format.js';
import * as Nav from './common/navbar.js';
import * as Toast from './common/toast.js';
import * as Dialog from './dialog/dialog.js';
import * as MID from './dialog/multi-image-dialog.js';



// upload image input elements
const img_upload = D.getById("img-upload");
const multi_img_upload = D.getById("multi-img-upload");

/* view item */
const record_info = D.getById("recordInfo");
const category_list = D.getById('categoryList');
const btn_save_list = D.getById('btn_save_list');
const btn_reset_list = D.getById('btn_reset_list');

const category_img = D.getById('category_img');
const category_id = D.getById('category_id');
const category_name = D.getById('category_name');
const category_note = D.getById('category_note');
const product_image_list = D.getById('productImageList');
const item_count = D.getById('item_count');
const btn_add_img = D.getById('btn_add_img');
const btn_reset_category = D.getById('btn_reset_category');
const btn_clear_img = D.getById('btn_clear_img');
const btn_cancel = D.getById('btn_cancel');
const btn_save_form = D.getById('btn_save_form');

/* variable */
var mData = null;
var categoryData = null;
var editingCategory = new Model.Category();
var sendData = null;

/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-categories",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);
            categoryData = structuredClone(mData.lstCategories);
            renderTable();
            buttonHandleCategoryList();
            handleImageUpload();
            handleMultiImageUpload();

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
    record_info.textContent = "Total record: " + categoryData.length;
}


/**
    * RENDER TABLE FOR A SPECIFIC PAGE
    * 
    * @param page: specific page
*/
function renderTable() {
    category_list.innerHTML = "";
    if (categoryData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "No data available";
        category_list.append(status);
    }

    // create category grid row
    categoryData.map((category, index) => createCategoryRow(category, index));

    new Sortable(category_list, {
        animation: 150,
        // handle: ".cg-pos",
        ghostClass: 'blue-background-class',
        onEnd: function (evt) {
            const rows = category_list.querySelectorAll(".cg-row");
            rows.forEach((row, index) => {
                row.querySelector(".cg-pos").textContent = index + 1;
                let itemData = null;
                itemData = categoryData.find(obj => obj.category_id == row.dataset.id);
                row.dataset.pos = index + 1;
                itemData.category_position = index + 1;
            });

            categoryData.sort((a, b) => a.category_position - b.category_position);
            Toast.show(Mess.getMess("I00009"));
        }
    });
    updateRecordInfo();
};


/**
    * ADD ROW FOR CATEGORY GRID
    * 
    * @param itemData: news data
    * @param index: index
*/
function createCategoryRow(itemData, index) {
    let row = D.create("div");
    row.setAttribute("class", "cg-row");
    row.setAttribute("data-id", FM.nullToString(itemData.category_id));
    row.setAttribute("data-pos", index + 1);

    row.innerHTML = `
        <div class="text ta-c cg-item cg-pos">
            <div class="text ta-c w-100">${index + 1}</div>
        </div>
        <div class="text ellipsis cg-item cg-id">
            <div class="text ta-l w-100">${FM.nullToString(itemData.category_id)}</div>
        </div>
        <div class="text ellipsis cg-item cg-name">
            <div class="text ta-l w-100">${FM.nullToString(itemData.category_name)}</div>
        </div>
        <div class="text ellipsis cg-item cg-note">
            <div class="text ta-l w-100">${FM.nullToString(itemData.note)}</div>
        </div>
        <div class="col-buttons cg-item cg-btn">
            <button class="edit-cg-btn ic-btn" data-id="${FM.nullToString(itemData.category_id)}">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="del-cg-btn ic-btn" data-id="${FM.nullToString(itemData.category_id)}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    category_list.append(row);


    // edit category button click event
    row.querySelector(".edit-cg-btn").onclick = function (evt) {
        this.disabled = true;
        const rows = D.$dom.querySelectorAll(".cg-row");
        rows.forEach((row) => {
            let btn = row.querySelector(".edit-cg-btn");
            if (btn.dataset.id != this.dataset.id) {
                btn.disabled = false;
            }
        });

        let data = categoryData.find(obj => obj.category_id == this.dataset.id);
        editingCategory = structuredClone(data);
        if (data != null) {
            setCategoryItemData(data);
            renderProductImageList(data.category_images);
        }
    };

    // delete category button click event
    row.querySelector(".del-cg-btn").onclick = function (evt) {
        categoryData = categoryData.filter(row => row.category_id !== this.dataset.id);
        categoryData = categoryData.map((obj, index) => ({ ...obj, category_position: index + 1 }));
        resetCategoryForm();
        renderTable();
        Toast.show(Mess.getMess("I00009"));
    };
}


/**
    * BUTTON HANDLE CATEGORY LIST
*/
function buttonHandleCategoryList() {
    btn_save_list.addEventListener('click', handleSave);
    btn_reset_list.addEventListener('click', handleReset);
}


/**
    * HANDLE SAVE CATEGORY LIST
*/
function handleSave() {
    sendData = {
        lstCategories: categoryData
    };

    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios.post(Pr.URL_API + "/mgmt-categories", sendData, {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            Dialog.close();
            mData = structuredClone(res.data);
            categoryData = structuredClone(mData.lstCategories);
            renderTable();
            resetCategoryForm();
            renderProductImageList();
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
    * SET CATEGORY ITEM DATA
    * 
    * @param data: category data
*/
function setCategoryItemData(data) {
    let img_src = "../assets/icon/image_default.png";
    if (data.category_image_url != null && data.category_image_url.length > 0) {
        img_src = data.category_image_url;
        btn_clear_img.style.display = "block";
    } else {
        btn_clear_img.style.display = "none";
    }
    category_img.src = img_src;
    category_id.value = FM.nullToString(data.category_id);
    category_name.value = FM.nullToString(data.category_name);
    category_note.value = FM.nullToString(data.note);
    setCategoryForm(1);
}


/**
    * SET CATEGORY ITEM DATA
    * 
    * @param mode: 0 - create, 1 - edit
*/
function setCategoryForm(mode) {
    if (mode == 0) {
        btn_cancel.textContent = "Clear";
        btn_cancel.onclick = function () {
            resetCategoryForm();
            editingCategory = new Model.Category();
            btn_save_form.textContent = "Create";
        };

        btn_save_form.textContent = "Create";
    } else {
        btn_cancel.textContent = "Cancel";
        btn_cancel.onclick = function () {
            const rows = D.$dom.querySelectorAll(".cg-row");
            rows.forEach((row) => {
                let btn = row.querySelector(".edit-cg-btn");
                btn.disabled = false;
            });
            editingCategory = new Model.Category();
            resetCategoryForm();
            btn_save_form.textContent = "Create";
        };

        btn_save_form.textContent = "Save";
        btn_save_form.onclick = function () {
            saveCategoryForm();
            btn_save_form.textContent = "Create";
        };
    }

    btn_reset_category.onclick = function (evt) {
        if (editingCategory.category_no == 0) {
            resetCategoryForm();
        } else {
            Dialog.setDialog("confirm", Mess.getMess("Q00003"), "Cancel", "Reset");

            D.getById("neg-btn").onclick = function (evt) {
                Dialog.close();
            };
            D.getById("pos-btn").onclick = function (evt) {
                editingCategory = structuredClone(categoryData.find(obj => obj.category_id == editingCategory.category_id));
                setCategoryItemData(editingCategory);
                renderProductImageList(editingCategory.category_images);
                Toast.show(Mess.getMess("I00009"));
                Dialog.close();
            };
        }
    };
}


/**
    * HANDLE RESET CATEGORY FORM
*/
function resetCategoryForm() {
    category_img.src = "../assets/icon/image_default.png";
    category_id.value = "";
    category_name.value = "";
    category_note.value = "";
    btn_cancel.textContent = "Clear";
    btn_clear_img.style.display = "none";
    renderProductImageList(null);
}


/**
    * PREPARE CATEGORY ITEM DATA
*/
function prepareCategoryItemData() {
    if (FM.nullToString(category_id.value).length == 0 ||
        FM.nullToString(category_name.value).length == 0 ||
        (editingCategory.category_image_url == null && editingCategory.category_image_base64 == null)) {
        Dialog.setDialog("load", Mess.getMess("E00005"), null, null, "Confirm");
        return false;
    }

    editingCategory.category_id = FM.nullToString(category_id.value);
    editingCategory.category_name = FM.nullToString(category_name.value);
    editingCategory.note = FM.nullToString(category_note.value);
    if (editingCategory.category_no == 0) {
        editingCategory.category_position = categoryData.length + 1;
    } else {
        editingCategory.category_position = categoryData.find(obj => obj.category_no == editingCategory.category_no).category_position;
    }

    sendData = {
        category: editingCategory
    };
    return true;
}


/**
    * RENDER PRODUCT IMAGE LIST
    * 
    * @param data: image product list
*/
function renderProductImageList(data) {
    product_image_list.innerHTML = "";
    if (data == null || data.length == 0) {
        item_count.textContent = "";
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "No data available";
        product_image_list.append(status);
        return;
    }

    // create product image list
    data.map((product, index) => createProductImageRow(product, index));
    new Sortable(product_image_list, {
        animation: 150,
        ghostClass: 'blue-background-class',
        onEnd: function (evt) {
            const rows = product_image_list.querySelectorAll(".pr-row");
            rows.forEach((row, index) => {
                row.querySelector(".pr-pos").textContent = index + 1;
                let itemData = null;
                itemData = editingCategory.category_images.find(obj => obj.category_image_no == row.dataset.id);
                row.dataset.pos = index + 1;
                itemData.category_image_pos = index + 1;
            });

            editingCategory.category_images.sort((a, b) => a.category_image_pos - b.category_image_pos);
            Toast.show(Mess.getMess("I00009"));
        }
    });
    item_count.textContent = "(" + data.length + ")";
};


/**
    * ADD ROW FOR PRODUCT IMAGE ROW
    * 
    * @param itemData: product image item
    * @param index: index
*/
function createProductImageRow(itemData, index) {
    let row = D.create("div");
    row.setAttribute("class", "pr-row");
    row.setAttribute("data-id", FM.nullToString(itemData.category_image_no));
    row.setAttribute("data-pos", index + 1);

    let img_product_val = "../assets/icon/image_default.png";
    if (FM.nullToString(itemData.category_image_url).length > 0) {
        img_product_val = itemData.category_image_url;
    }
    if (FM.nullToString(itemData.category_image_base64).length > 0) {
        img_product_val = itemData.category_image_base64;
    }

    row.innerHTML = `
        <div class="text ta-c pr-item pr-pos">
            <div class="text ta-c w-100">${index + 1}</div>
        </div>
        <div class="text ellipsis pr-item pr-name">
            <div class="text ellipsis ta-l w-100">${FM.nullToString(itemData.category_image_name)}</div>
        </div>
        <div class="text ellipsis pr-item pr-img">
            <img class="product-img-item" src="${img_product_val}"/>
        </div>
        <div class="col-buttons pr-item pr-btn">
            <button class="del-pr-btn ic-btn" data-id="${FM.nullToString(itemData.category_image_no)}" data-pos="${index + 1}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    product_image_list.append(row);

    // image product button click event
    row.querySelector(".product-img-item").onclick = function (evt) {
        let position = this.parentElement.parentElement.dataset.pos - 1;
        showImageDialog(position);
    };


    // delete product button click event
    row.querySelector(".del-pr-btn").onclick = function (evt) {
        editingCategory.category_images = editingCategory.category_images.filter(row => row.category_image_pos != this.dataset.pos);
        editingCategory.category_images = editingCategory.category_images.map((obj, index) => ({ ...obj, category_image_pos: index + 1 }));
        renderProductImageList(editingCategory.category_images);
        Toast.show(Mess.getMess("I00009"));
    };
}



/**
    * SHOW IMAGE DIALOG
    * 
    * @param position: position of image
*/
function showImageDialog(position) {
    let data = structuredClone(editingCategory.category_images);

    data.forEach((image) => {
        let image_src = "../assets/icon/image_default.png";
        if (FM.nullToString(image.category_image_base64).length > 0) {
            image_src = image.category_image_base64;
        } else if (FM.nullToString(image.category_image_url).length > 0) {
            image_src = image.category_image_url;
        }
        image.src = image_src;
        image.name = image.category_image_name;
    });
    MID.openDialog(position, data);
    MID.imageDialogHandle();
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
        categoryData = structuredClone(mData.lstCategories);
        renderTable();
        Toast.show(Mess.getMess("I00009"));
        Dialog.close();
    };
}


/**
    * HANDLE SAVE CATEGORY FORM
*/
function saveCategoryForm() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    if (prepareCategoryItemData() == false) {
        return;
    }
    axios.post(Pr.URL_API + "/mgmt-categories", sendData, {
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            Dialog.close();
            mData = structuredClone(res.data);
            categoryData = structuredClone(res.data.lstCategories);
            renderTable();
            resetCategoryForm();
            renderProductImageList();
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
    * UPLOAD IMAGE HANDLE
*/
function handleImageUpload() {
    category_img.onclick = function () {
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
                    editingCategory.category_image_url = null;
                    editingCategory.category_image_base64 = e.target.result;
                    category_img.src = e.target.result;
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
        category_img.src = "../assets/icon/image_default.png";
        editingCategory.category_image_url = null;
        editingCategory.category_image_base64 = null;
        btn_clear_img.style.display = "none";
    };
}


/**
    * UPLOAD MULTI IMAGE HANDLE
*/
function handleMultiImageUpload() {
    btn_add_img.onclick = function () {
        multi_img_upload.click();
    };

    multi_img_upload.addEventListener('change', (event) => {
        try {
            const files = event.target.files;

            if (files.length === 0) {
                Dialog.setDialog("info", Mess.getMess("I00001"), null, null, "OK");
                return;
            }

            for (let i = 0; i < files.length; i++) {
                files[i].pos = i + 1;
                files[i].total = files.length;
                const file = files[i];
                const reader = new FileReader();

                reader.onload = function (e) {
                    editingCategory.category_images.push({
                        category_image_no: 0,
                        category_image_pos: editingCategory.category_images.length + 1,
                        category_image_name: file.name,
                        category_image_base64: e.target.result
                    });
                    if (file.pos == file.total) {
                        renderProductImageList(editingCategory.category_images);
                    }
                };

                reader.readAsDataURL(file);
            }

            multi_img_upload.value = '';
        } catch (exception) {
            console.log(exception);
            Dialog.setDialog("error", Mess.getMess("E00003"), null, null, "Confirm");
        }
    });
}

/**
    * ONCLICK ACTION
*/
function onclickAction() {
    btn_cancel.onclick = function () {
        resetCategoryForm();
    };

    btn_save_form.onclick = function () {
        saveCategoryForm();
    };

    btn_save_list.addEventListener('click', handleSave);
    btn_reset_list.addEventListener('click', handleReset);
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

window.onload = init;