/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/

/**
    * SET STRING IF DATA IS NULL
    * 
    * @param str: string input
    * @return String
*/
export function nullToString(str) {
    return str == null ? "" : String(str);
}


/**
    * SET NUMBER IF DATA IS NULL
    * 
    * @param str: number input
    * @return Number
*/
export function nullToInt(num) {
    return nullToString(num) == "" ? 0 : parseInt(num);
}


/**
    * GET SHORT DATE
    * 
    * @param dateString: date string input
*/
export function getShortDate(dateString) {
    let datePart = dateString.split(" ");
    if (datePart.length > 0) {
        if (datePart[0].includes("/") || datePart[0].includes("-")) {
            return datePart[0];
        }
        return datePart[1];
    }
}


/**
    * GET TIME FROM DATA
    * 
    * @param dateString: date string input
*/
export function getTimeFromData(dateString) {
    let datePart = dateString.split(" ");
    if (datePart.length > 0) {
        if (datePart[0].includes(":")) {
            return datePart[0];
        }
        return datePart[1];
    }
}


/**
    * STRING TO DATE
    * 
    * @param dateString: date string input
*/
export function string2Date(dateString) {
    let dateParts = dateString.split("/");
    if (dateParts.length == 1) {
        dateParts = dateString.split("-");
    }
    let hour = new Date().getHours();
    let min = new Date().getMinutes();

    // month is 0-based, that's why we need dataParts[1] - 1
    let dateObject = new Date();
    dateObject = new Date(dateParts[0], parseInt(dateParts[1]) - 1, dateParts[2], hour, min, 0);
    return dateObject;
}