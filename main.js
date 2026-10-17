// Personal Workspace Application Script
(function () {
    'use strict';

    // Theme Management
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function getInitialTheme() {
        const savedTheme = localStorage.getItem('pw_theme');
        if (savedTheme) return savedTheme;
        return prefersDark.matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('pw_theme', theme);
    }

    applyTheme(getInitialTheme());

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    // Clock & Date Management
    const clockEl = document.getElementById('current-clock');
    const dateEl = document.getElementById('current-date');

    function updateDateTime() {
        const now = new Date();

        if (clockEl) {
            clockEl.textContent = now.toLocaleTimeString('ko-KR', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }

        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Scratchpad Auto-save
    const scratchpad = document.getElementById('scratchpad');
    const saveStatus = document.getElementById('note-save-status');
    const STORAGE_KEY = 'pw_scratchpad_content';

    if (scratchpad) {
        // Load existing
        scratchpad.value = localStorage.getItem(STORAGE_KEY) || '';

        let saveTimeout;
        scratchpad.addEventListener('input', () => {
            if (saveStatus) saveStatus.textContent = '저장 중...';
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                localStorage.setItem(STORAGE_KEY, scratchpad.value);
                if (saveStatus) saveStatus.textContent = '자동 저장됨';
            }, 400);
        });
    }
})();
