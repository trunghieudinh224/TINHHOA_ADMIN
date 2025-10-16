/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/
import * as D from './dom.js';
import * as Pr from '../data/param.js';

/* view item */
const sidebar = D.getSelector('.sidebar');
const navbar = D.getSelector('.navbar');
const mainContent = D.getSelector('.main-content');
const pageOverlay = D.getSelector('.pageOverlay');


/**
    * TOGGLE SIDEBAR HANDLE
*/
function toggleSidebar() {
    sidebar.classList.toggle('expanded');
    navbar.classList.toggle('expanded');
    mainContent.classList.toggle('expanded');

    if ((window.innerWidth >= 1200 && window.innerWidth <= 1600) || window.innerWidth <= 768) {
        pageOverlay.style.display = "flex";
    } else {
        pageOverlay.style.display = "none";
    }
}


/**
    * CLOSE SIDEBAR HANDLE
*/
function closeSidebar() {
    sidebar.classList.remove('expanded');
    navbar.classList.remove('expanded');
    mainContent.classList.remove('expanded');
    if (pageOverlay) {
        pageOverlay.style.display = "none";
    }
}


/**
    * BUTTON HANDLE
*/
function buttonHandle() {
    const toggleButton = D.getSelector('.toggle-btn');
    const closeButton = D.getSelector('.close-btn-sidebar');
    toggleButton.addEventListener('click', toggleSidebar);
    if (closeButton) {
        closeButton.addEventListener('click', closeSidebar);
    }
}

/**
    * SET USER DATA
*/
export function setUserData() {
    try {
        let user_login_data = JSON.parse(sessionStorage.getItem(Pr.USER_LOGIN));
        D.$dom.getElementById("username-option").innerHTML = user_login_data.name;
        D.$dom.getElementById("image-option").src = user_login_data.avatar;
    } catch (error) {
    }
}

/**
    * NAVBAR INITIATION
*/
export function navbarInit() {
    buttonHandle();
    setUserData();
}