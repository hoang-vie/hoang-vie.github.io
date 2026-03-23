/* ═══════════════════════════════════════════
   H & S Lab — Navigation helpers
   Used by index.html (tab switching on home)
   and by sub-pages (tab switching within page)
   ═══════════════════════════════════════════ */

/* ── Sidebar sub-menu toggle ── */
function toggleSub(subId, el) {
    const sub = document.getElementById(subId);
    if (!sub) return;
    const opening = !sub.classList.contains('open');
    sub.classList.toggle('open', opening);
    el.classList.toggle('open', opening);
}

/* ── Mobile sidebar ── */
function toggleMob() {
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.toggle('open');
}

/* Close sidebar on mobile when clicking outside */
document.addEventListener('click', function (e) {
    const sb = document.getElementById('sidebar');
    const btn = document.querySelector('.mob-btn');
    if (!sb || !btn) return;
    if (window.innerWidth > 700) return;
    if (!sb.contains(e.target) && e.target !== btn) {
        sb.classList.remove('open');
    }
});

/* ── Tab switching (used inside sub-pages) ── */
function switchTab(tabId, el) {
    /* hide all panels in the same tab group */
    const group = el.closest('.tab-bar');
    if (!group) return;

    const container = group.parentElement;
    container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    el.classList.add('active');
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add('active');
}

/* ── Index page section switching ── */
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

/* ── Mark active nav link based on current page URL ── */
document.addEventListener('DOMContentLoaded', function () {
    const path = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item[data-page], .nav-sub-item[data-page]').forEach(el => {
        if (el.dataset.page === path) {
            el.classList.add('active');
            /* also open parent sub-menu if any */
            const sub = el.closest('.nav-sub');
            if (sub) {
                sub.classList.add('open');
                const parent = sub.previousElementSibling;
                if (parent && parent.classList.contains('nav-item')) {
                    parent.classList.add('open');
                }
            }
        }
    });

    /* activate first tab panel on sub-pages */
    document.querySelectorAll('.tab-bar').forEach(bar => {
        const firstTab = bar.querySelector('.tab');
        if (firstTab && !bar.querySelector('.tab.active')) {
            firstTab.classList.add('active');
            const panelId = firstTab.dataset.tab;
            const panel = document.getElementById(panelId);
            if (panel) panel.classList.add('active');
        }
    });
});