/* ═══════════════════════════════════════════
   H & S Lab — nav.js
   Điều khiển Sidebar Menu và Tab Switching
   ═══════════════════════════════════════════ */

/* Đóng/mở menu trên điện thoại */
function toggleMob() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

/* Đóng/mở menu con (Profile, Projects, Files) */
function toggleSub(id, el) {
    const sub = document.getElementById(id);
    if (sub) sub.classList.toggle('open');
    if (el) el.classList.toggle('open');
}

/* Chuyển section ở trang chủ (index.html) */
function goSection(id, el) {
    // Ẩn tất cả các trang
    document.querySelectorAll('.page').forEach(function(p) {
        p.classList.remove('active');
    });
    // Hiện trang được chọn
    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    // Cập nhật trạng thái active trên sidebar
    document.querySelectorAll('.nav-section > .nav-item').forEach(function(i) {
        i.classList.remove('active');
    });
    if (el) el.classList.add('active');

    // Tự động đóng menu trên điện thoại sau khi chọn
    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
}

/* Chuyển Tab cho trang Hoang và Sang (Profile / Projects / Files) */
function switchTabById(tabId) {
    const tabBar = document.getElementById('hoang-tabs') || document.getElementById('sang-tabs');
    if (!tabBar) return;

    tabBar.querySelectorAll('.tab').forEach(function (t) {
        t.classList.toggle('active', t.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.toggle('active', p.id === tabId);
    });

    /* Đồng bộ trạng thái active của menu con trên sidebar */
    const subId = tabBar.id === 'hoang-tabs' ? 'sub-h' : 'sub-s';
    const subEl = document.getElementById(subId);
    if (subEl) {
        subEl.querySelectorAll('.nav-sub-item').forEach(function (i) { i.classList.remove('active'); });
        const idx = ['profile', 'projects', 'files'].indexOf(tabId);
        const items = subEl.querySelectorAll('.nav-sub-item');
        if (items[idx]) items[idx].classList.add('active');
    }

    history.replaceState(null, '', '#' + tabId);
}

/* Tự động mở tab dựa trên đường dẫn URL khi tải trang */
document.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash.replace('#', '');
    const valid = ['profile', 'projects', 'files'];
    if (document.getElementById('hoang-tabs') || document.getElementById('sang-tabs')) {
        switchTabById(valid.includes(hash) ? hash : 'profile');
    }
});