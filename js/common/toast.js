/*
    _ created by: Dinh Trung Hieu
    _ created date: 2025/06/30
*/

/**
    * SHOW TOAST
    * 
    * @param mess: Message to be displayed
    * @param time: Time for which the toast should be displayed
    * @param classname: custom class value
*/
export function show(mess, time, classname) {
    Toastify({
        text: mess,
        className: (classname == null ? "note" : classname) + " toast-w",
        duration: time == null ? 3000 : time,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, var(--toastify-color-1) 0%, var(--toastify-color-2), var(--toastify-color-3) 100%)",
            color: "white",
            display: "flex"
        },
        onClick: function () { } // Callback after click
    }).showToast();
}



