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
const error_row = D.getById("error-row");

/* variable */
var mData = null;
var errorData;




/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-error-histories",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);
            errorData = structuredClone(mData.lstErrorHistories);
            errorWidgetInit();

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
    * INIT ERROR WIDGET
*/
function errorWidgetInit() {
    if (errorData != null && errorData.length > 0) {
        let recentElement = error_row.querySelectorAll(".tb-item");
        recentElement.forEach(item => item.remove());

        error_row.querySelector(".status-item").style.display = "none";
        for (let i = 0; i < errorData.length; i++) {
            let row = D.create('tr');
            error_row.append(row);
            row.setAttribute("class", "tb-item");
            let status = "Unchecked";
            if (errorData[i].status == "1") {
                status = "In progress";
            } else if (errorData[i].status == "2") {
                status = "Completed";
            }
            row.innerHTML = `
            <td class="text ta-c">${moment(FM.string2Date(FM.getShortDate(errorData[i].created_at))).format('DD/MM/YYYY')}</td>
            <td class="text ta-c">${errorData[i].error_code}</td>
            <td class="text ta-l des-err">${errorData[i].error_description}</td>
            <td>
                <div class="status-frame" status="${errorData[i].status}">
                    <span class="text ta-c fw-b">${status}</span>
                </div>
            </td>`;
        }
    } else {
        error_row.querySelector(".status-item").style.display = "block";
    }
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