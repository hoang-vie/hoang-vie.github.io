/* ═══════════════════════════════════════════
   H & S Lab — modal.js
   Handles:
     · Project detail modal  (openProject / closeProject)
     · File viewer modal     (viewFile)
     · Shared Escape / backdrop close
   nav.js handles sidebar toggles & tab switching
   ═══════════════════════════════════════════ */

/* ─────────────────────────────────────
   SHARED MODAL UTILITIES
───────────────────────────────────── */

/** Lock / unlock body scroll when any modal is open */
function _lockScroll()   { document.body.style.overflow = 'hidden'; }
function _unlockScroll() {
    /* only unlock if NO modal is still open */
    if (!document.querySelector('.modal-backdrop.open')) {
        document.body.style.overflow = '';
    }
}

/** Close backdrop on outside click */
function closeOnBackdrop(event, el) {
    if (event.target === el) closeModal(el.id);
}

/** Generic close — works for any modal-backdrop by id */
function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    _unlockScroll();
}

/** Escape key closes any open modal */
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal-backdrop.open').forEach(function (el) {
        el.classList.remove('open');
    });
    _unlockScroll();
});

/* ─────────────────────────────────────
   PROJECT MODAL
───────────────────────────────────── */

/**
 * openProject('proj-scad')  — pass the modal id
 * called from card onclick in HTML
 */
function openProject(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    _lockScroll();
}

/* ─────────────────────────────────────
   FILE VIEWER MODAL
───────────────────────────────────── */

/**
 * viewFile('../project/Hoang/Install_Geant4.txt', 'Install_Geant4.txt')
 * called from file-row buttons in HTML
 */
async function viewFile(path, name) {
    const backdrop = document.getElementById('file-viewer');
    const titleEl  = document.getElementById('fv-title');
    const subtitleEl = document.getElementById('fv-subtitle');
    const dlBtn    = document.getElementById('fv-dl');
    const toolbar  = document.getElementById('fv-toolbar');
    const langEl   = document.getElementById('fv-lang');
    const linesEl  = document.getElementById('fv-lines');
    const preEl    = document.getElementById('fv-pre');
    const noteEl   = document.getElementById('fv-note');

    /* reset state */
    titleEl.textContent    = name;
    subtitleEl.textContent = path;
    dlBtn.href             = path;
    dlBtn.download         = name;
    preEl.textContent      = 'Loading…';
    linesEl.textContent    = '';
    noteEl.style.display   = 'none';

    /* detect language from extension */
    const ext = name.split('.').pop().toLowerCase();
    const langMap = {
        txt:'plain text', cpp:'C++', c:'C', py:'Python',
        scad:'OpenSCAD', ino:'Arduino / C++', pdf:'PDF', md:'Markdown'
    };
    langEl.textContent = langMap[ext] || ext;

    backdrop.classList.add('open');
    _lockScroll();

    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const text = await res.text();
        preEl.textContent  = text;
        linesEl.textContent = text.split('\n').length + ' lines';
    } catch (err) {
        preEl.textContent = '⚠  ' + err.message;
        if (location.protocol === 'file:') {
            noteEl.style.display = 'block';
        }
    }
}

/* ─────────────────────────────────────
   HOANG PAGE — TAB SWITCHING
   (page-specific; sang.html has its own)
───────────────────────────────────── */

function switchTabById(tabId) {
    const tabBar = document.getElementById('hoang-tabs') ||
                   document.getElementById('sang-tabs');
    if (!tabBar) return;

    tabBar.querySelectorAll('.tab').forEach(function (t) {
        t.classList.toggle('active', t.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.toggle('active', p.id === tabId);
    });

    /* sync sidebar sub-item highlight */
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

/* activate tab from URL hash on page load */
document.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash.replace('#', '');
    const valid = ['profile', 'projects', 'files'];
    switchTabById(valid.includes(hash) ? hash : 'profile');
});