/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/
import * as D from '../common/dom.js';
import * as ICData from '../data/fas-icon.js';

/* view item */
const iconList = D.getById('icon-list');
const noResults = D.getById('no-results');
const dialog = D.getById('iconDialog');
const dialogOverlay = D.getById('dialogOverlay');

/* variable */
const icons = ICData.short_icon;
var selectedTab = 1;


/**
    * CREATE ICON DIALOG
    * 
    * @param selectedIcon: selected icon
    * @param tabIndex: tab index
    * @param iconArray: icond data
*/
export function createIconsDialog(selectedIcon, tabIndex, iconArray) {
    selectedTab = tabIndex;
    iconList.innerHTML = '';
    if (iconArray.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        iconArray.forEach(icon => {
            const li = D.create('li');
            li.innerHTML = `<i class="fa-solid ${icon}"></i>`;
            if (selectedIcon != null && icon === selectedIcon) {
                li.classList.add('selected');
            }
            li.onclick = () => {
                D.getSelector(".tab-item.active i").setAttribute("class", icon);
                D.getSelector("#icon-btn" + selectedTab + " i").setAttribute("class", icon);
                D.getById("icon" + selectedTab).value = icon;
                close();
            };
            iconList.appendChild(li);
        });
    }

    D.getById('filterIcon').addEventListener('input', filterIcons);

    dialogOverlay.addEventListener('click', (e) => {
        if (e.target === dialogOverlay) {
            close();
        }
    });

    D.getSelector('#closeIconDialog').addEventListener('click', close);
}


/**
    * FILTER ICONS
*/
function filterIcons() {
    const filterValue = D.getSelector('.filter-input').value.toLowerCase();
    const filteredIcons = icons.filter(icon => icon.toLowerCase().includes(filterValue));
    createIconsDialog(null, selectedTab, filteredIcons);
}


/**
    * OPEN
*/
export function open() {
    dialogOverlay.style.display = 'flex';
    dialog.style.display = 'block';
}


/**
    * CLOSE
*/
export function close() {
    dialogOverlay.style.display = 'none';
    dialog.style.display = 'none';
}