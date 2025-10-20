/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/

/* Variable */
// Message data
const messData = {
    // INFO MESSAGE
    "I00001": "Đang tải dữ liệu...",
    "I00002": "Data has been saved successfully.",
    "I00003": "Data has been deleted successfully.",
    "I00004": "Changes have been undone.",
    "I00005": "Changes have been redone.",
    "I00006": "Data has been created successfully.",
    "I00007": "Data has been deleted.",
    "I00008": "Data has been updated successfully.",
    "I00009": "Temporary data has been updated.",
    "I00010": "Previous data has been restored.",
    "I00011": "Language version has been changed.",
    "I00012": "Your session has expired. Please log in again to continue.",
    "I00013": "Password has been saved successfully.",
    "I00014": "Information has been saved successfully.",
    "I00015": "No changes have been made.",

    // ERROR MESSAGE
    "E00001": "Incorrect account or password.",
    "E00002": "Account must not be empty and password must be at least 6 characters.",
    "E00003": "An error occurred while processing the data.",
    "E00004": "Unable to retrieve data.",
    "E00005": "Please fill in all required fields.",
    "E00006": "Failed to process the data.",
    "E00007": "Please save the data in section ",
    "E00008": "ID must not contain spaces.",
    "E00009": "This ID already exists.",
    "E00010": "New password cannot be the same as the current password.",
    "E00011": "Confirmation password does not match.",
    "E00012": "Current password is incorrect.",
    "E00013": "Invalid email format.",

    // QUESTION MESSAGE
    "Q00001": "Do you want to log out?",
    "Q00002": "Are you sure you want to delete this data?",
    "Q00003": "Do you want to restore the previous data?",
    "Q00004": "Unsaved changes (if any) will be lost.\nDo you want to save before changing the language?",
    "Q00005": "Unsaved changes will be reverted to the original state. Do you want to continue?",
    "Q00006": "Unsaved changes (if any) will be lost. Do you really want to go back?",
    "Q00007": "Saving will update the product list and reset the edit form. Do you want to continue?",
    "Q00008": "Saving will update the category list and reset the edit form. Do you want to continue?"
};


/**
    * GET MESSAGE
    * 
    * @param key: message's key
    * @return String
*/
export function getMess(key) {
    return messData[key];
}
