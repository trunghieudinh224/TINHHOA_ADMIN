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
const history_list = D.getById("update-history-list");
const error_row = D.getById("error-row");

/* variable */
var mData = null;
var errorData, historyData, statisticData;

/**
    * GET DATA
*/
function getData() {
    Dialog.setDialog("load", Mess.getMess("I00001"), null, null, null);
    axios({
        method: "GET",
        url: Pr.URL_API + "/mgmt-dashboard",
        headers: {
            'Authorization': SS.getCookie(Pr.TOKEN),
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (res) {
        try {
            mData = structuredClone(res.data);
            errorData = structuredClone(mData.lstErrorHistories);
            historyData = structuredClone(mData.lstUpdateHistories);
            statisticData = structuredClone(mData.lstStatistics);
            statisticCardInit();
            historyWidgetInit();
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
    * INIT STATISTIC CARD
*/
function statisticCardInit() {
    if (statisticData == null) {
        return;
    }
    Object.keys(statisticData).forEach(key => {
        let card = D.getSelector(".card[data-card='" + key + "']");
        card.querySelector('p').textContent = statisticData[key].quantity;
        card.querySelector('h3').textContent = statisticData[key].title;
        card.querySelector('.card-status').textContent = statisticData[key].message;
    });
}


/**
    * INIT HISTORY WIDGET
*/
function historyWidgetInit() {
    if (historyData != null && historyData.length > 0) {
        let recentElement = history_list.querySelectorAll(".his-item");
        recentElement.forEach(item => item.remove());

        let recentDate = null;
        let hisDiv = null;
        for (let i = 0; i < historyData.length; i++) {
            if (recentDate == null || recentDate != moment(FM.string2Date(historyData[i].updated_date)).format('DD/MM/YYYY')) {
                hisDiv = D.create('div');
                hisDiv.setAttribute("class", "his-item");

                recentDate = moment(FM.string2Date(historyData[i].updated_date)).format('DD/MM/YYYY');
                let dateDiv = D.create('div');
                dateDiv.setAttribute("class", "his-date text fw-b");
                dateDiv.textContent = recentDate;
                history_list.append(hisDiv);
                hisDiv.append(dateDiv);
            }

            let detailDiv = D.create('div');
            detailDiv.setAttribute("class", "his-detail");
            hisDiv.append(detailDiv);
            detailDiv.innerHTML = `
                <div class="row">
                    <div class="col-3 text his-time">${historyData[i].updated_time}</div>
                        <div class="col-1 pd-0 his-space">
                            <div class="circle"></div>
                            <div class="line"></div>
                        </div>
                    <div class="col-8 text his-detail">${historyData[i].message}</div>
                </div>`;
        }
    }
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
            <td class="text ta-c">${moment(FM.string2Date(errorData[i].detected_at)).format('DD/MM/YYYY')}</td>
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
    * ONCLICK ACTION
*/
function onclickAction() {
    D.getById("history_detail").onclick = function () {
        CM.move("history-update");
    };
    D.getById("error_detail").onclick = function () {
        CM.move("error-management");
    };
}



/**
    * INIT PAGE
*/
function init() {
    Nav.navbarInit();
    if (CM.checkTokenExist()) {
        getData();
    }
    onclickAction();
}

window.onload = init;