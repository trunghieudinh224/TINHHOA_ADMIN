/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/07/14
*/
import * as D from './common/dom.js';
import * as CM from './common/common.js';
import * as Pr from './data/param.js';
import * as Mess from './common/message.js';
import * as SS from './common/session.js';
import * as FM from './common/format.js';
import * as Nav from './common/navbar.js';
import * as Toast from './common/toast.js';
import * as Dialog from './dialog/dialog.js';

// upload image input elements
const img_upload = D.getById("img-upload");

/* view item */
const record_info = D.getById("recordInfo");
const contact_list = D.getById('contactList');
const save_btn = D.getById('saveBtn');
const reset_btn = D.getById('resetBtn');

/* variable */
var mData = null;
var contactData = null, contactTypeData = null;

/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-contacts",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);
            contactData = structuredClone(mData.lstContacts);
            contactTypeData = structuredClone(mData.lstContactTypes);

            renderTable();
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
    record_info.textContent = "Total record: " + contactData.length;
}

/**
    * RENDER TABLE FOR A SPECIFIC PAGE
*/
function renderTable() {
    contact_list.innerHTML = "";
    if (contactData.length == 0) {
        let status = D.create("div");
        status.setAttribute("class", "text status-grid");
        status.textContent = "No data available";
        contact_list.append(status);
    }

    // create contact list view
    contactData.map((contact, index) => createsContactRow(contact, index));
    updateRecordInfo();
};

/**
    * ADD ROW FOR CONTACT GRID
    * 
    * @param itemData: contact data
    * @param index: index
*/
function createsContactRow(itemData, index) {
    let row = D.create("div");
    row.setAttribute("class", "cg-row");
    row.setAttribute("data-id", itemData.contact_no);
    row.setAttribute("data-no", index + 1);

    let contact_type = contactTypeData[itemData.contact_type - 1];
    if (itemData.contact_type != 1) {
        itemData.full_name = itemData.first_name + " " + itemData.last_name;
    }

    let status = "Unchecked";
    if (itemData.status == "1") {
        status = "In progress";
    } else if (itemData.status == "2") {
        status = "Completed";
    }

    row.innerHTML = `
        <div class="text ta-c cg-item cg-no">
            <div class="text ta-c w-100">${index + 1}</div>
        </div>
        <div class="text cg-item cg-fullname">
            <div class="text ta-l w-100">${FM.nullToString(itemData.full_name)}</div>
        </div>
        <div class="text cg-item cg-email">
            <div class="text ta-l w-100">${FM.nullToString(itemData.email)}</div>
        </div>
        <div class="text cg-item cg-phone">
            <div class="text ta-r w-100">${FM.nullToString(itemData.phone)}</div>
        </div>
        <div class="text cg-item cg-address">
            <div class="text ta-l w-100">${FM.nullToString(itemData.address)}</div>
        </div>
        <div class="text cg-item cg-type">
            <div class="text ta-l w-100">${contact_type}</div>
        </div>
        <div class="status-frame cg-item cg-status" status="${itemData.status}">
            <span class="text ta-c fw-b">${status}</span>
        </div>
        <div class="col-buttons cg-item cg-btn">
            <button class="edit-cg-btn ic-btn" data-id="${itemData.contact_no}">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="del-cg-btn ic-btn" data-id="${itemData.contact_no}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    contact_list.append(row);
}

/**
    * INIT PAGE
*/
function init() {
    Nav.navbarInit();
    if (CM.checkTokenExist()) {
        getData();
    }
}

window.onload = init;