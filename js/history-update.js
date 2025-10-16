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


/* view item */
const history_list = D.getById("update-history-list");

/* variable */
var mData = null;
var historyData;




/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-update-histories",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);
            historyData = structuredClone(mData.lstUpdateHistories);
            historyWidgetInit();

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
    * HISTORY UPDATE WIDGET
*/
function historyWidgetInit() {
    if (historyData != null && historyData.length > 0) {
        let recentElement = history_list.querySelectorAll(".tb-item");
        recentElement.forEach(item => item.remove());

        history_list.querySelector(".status-item").style.display = "none";
        for (let i = 0; i < historyData.length; i++) {
            let row = D.create('tr');
            history_list.append(row);
            row.setAttribute("class", "tb-item");
            let status = "Chưa kiểm tra";
            if (historyData[i].status == "1") {
                status = "Đang sửa";
            } else if (historyData[i].status == "1") {
                status = "Hoàn thành";
            }
            row.innerHTML = `
            <td class="text ta-c">${moment(FM.string2Date(FM.getShortDate(historyData[i].updated_date))).format('DD/MM/YYYY')}</td>
            <td class="text ta-c">${historyData[i].updated_time}</td>
            <td class="text ta-c">${historyData[i].updated_by_name}</td>
            <td class="text ta-l des-err">${historyData[i].message}</td>`;
        }
    } else {
        history_list.querySelector(".status-item").style.display = "block";
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