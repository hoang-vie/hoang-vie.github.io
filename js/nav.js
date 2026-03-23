/* ═══════════════════════════════════════════
   H & S Lab — Navigation & Core Logic
   ═══════════════════════════════════════════ */

/* ── 1. SIDEBAR & MOBILE MENU ── */
function toggleSub(subId, el) {
    const sub = document.getElementById(subId);
    if (!sub) return;
    const opening = !sub.classList.contains('open');
    sub.classList.toggle('open', opening);
    el.classList.toggle('open', opening);
}

function toggleMob() {
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.toggle('open');
}

// Đóng sidebar trên mobile khi click ra ngoài
document.addEventListener('click', function (e) {
    const sb = document.getElementById('sidebar');
    const btn = document.querySelector('.mob-btn');
    if (!sb || !btn || window.innerWidth > 700) return;
    if (!sb.contains(e.target) && e.target !== btn) {
        sb.classList.remove('open');
    }
});

/* ── 2. ĐIỀU HƯỚNG TRANG CHỦ (index.html) ── */
function goSection(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item, .nav-sub-item').forEach(i => i.classList.remove('active'));
    
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    if (el) el.classList.add('active');

    if (window.innerWidth <= 700) {
        const sb = document.getElementById('sidebar');
        if (sb) sb.classList.remove('open');
    }
}

/* ── 3. QUẢN LÝ TABS (hoang.html, sang.html) ── */
function switchTabById(tabId) {
    // Ẩn/hiện nội dung tab
    document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === tabId));
    
    // Đồng bộ highlight với Sidebar
    document.querySelectorAll('.nav-sub-item').forEach(i => i.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-sub-item[onclick*="${tabId}"]`);
    if(activeNav) activeNav.classList.add('active');

    // Cập nhật URL mà không reload trang
    history.replaceState(null, '', '#' + tabId);
}

// Khôi phục trạng thái khi load trang
document.addEventListener('DOMContentLoaded', () => {
    // Kích hoạt nav-item hiện tại
    const path = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item[data-page], .nav-sub-item[data-page]').forEach(el => {
        if (el.dataset.page === path) el.classList.add('active');
    });

    // Kích hoạt tab từ URL Hash
    const hash = window.location.hash.replace('#','');
    if (['profile','projects','files'].includes(hash)) {
        switchTabById(hash);
    }
});

/* ── 4. QUẢN LÝ MODALS (Dùng chung) ── */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Khoá scroll nền
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = ''; // Mở lại scroll nền
    }
}

// Uỷ quyền sự kiện (Event Delegation) để đóng modal khi click ra ngoài hoặc nhấn ESC
document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-backdrop')) {
        closeModal(e.target.id);
    }
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
    }
});

/* ── 5. FILE VIEWER (Trình xem file) ── */
async function viewFile(path, name) {
    const pre = document.getElementById('viewer-content');
    const title = document.getElementById('viewer-filename');
    const note = document.getElementById('viewer-note');
    
    title.textContent = name;
    pre.textContent = 'Đang tải nội dung file...';
    if (note) note.style.display = 'none';
    
    openModal('viewer-modal');

    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('HTTP Error: ' + res.status);
        pre.textContent = await res.text();
    } catch(e) {
        pre.textContent = '⚠ Lỗi tải file: ' + e.message;
        // Cảnh báo nếu chạy ở chế độ file:// cục bộ (CORS block)
        if (location.protocol === 'file:' && note) {
            note.style.display = 'block';
        }
    }
}