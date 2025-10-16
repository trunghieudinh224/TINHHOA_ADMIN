/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/

/* variable */
// Document object model
export const $dom = document;

/**
    * GET ELEMENT BY ALL ATTRIBUTE
    * 
    * @param attribute: element's attribute
    * @return Element | Element array
*/
export function getSelectorAll(attribute) {
    return $dom.querySelectorAll(attribute);
}

/**
    * GET FIRST ELEMENT BY ALL ATTRIBUTE
    * 
    * @param attribute: element's attribute
    * @return Element | Element array
*/
export function getSelector(attribute) {
    return $dom.querySelector(attribute);
}

/**
    * GET ELEMENT BY ID
    * 
    * @param id: element's id
    * @return Element
*/
export function getById(id) {
    return $dom.getElementById(id);
}

/**
    * GET ELEMENT BY CLASSNAME
    * 
    * @param id: element's classname
    * @return Element array
*/
export function getByClass(classname) {
    return $dom.getElementsByClassName(classname);
}

/**
    * CREATE ELEMENT BY ATTRIBUTE
    * 
    * @param attr: element's attribute
    * @return element
*/
export function create(attr) {
    return $dom.createElement(attr);
}