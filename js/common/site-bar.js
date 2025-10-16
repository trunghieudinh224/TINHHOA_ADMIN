(function () {
    const sidebar = document.getElementById("sidebar-menu");
    if (!sidebar) {
        console.error("Không tìm thấy phần tử #sidebar-menu");
        return;
    }

    const items = sidebar.querySelectorAll(".sidebar-item[id]:not([id=''])");
    items.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.id;
            if (/^[a-zA-Z0-9_-]+$/.test(id)) {
                window.location.href = `../html/${id}.html`;
            } else {
                console.error(`ID không hợp lệ cho URL: ${id}`);
            }
        });
    });
})();