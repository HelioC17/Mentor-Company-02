/* ======================================================
   HEADER.JS — Ícones, idioma, scroll do header, menu mobile
   Usado em: TODAS as páginas
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ICONS */
    if (window.lucide) lucide.createIcons();

    /* ======================================================
                    LANGUAGE SWITCH
    ====================================================== */

    const langSwitch = document.getElementById("langSwitch");
    const langActive = document.querySelector(".lang-active");

    if (langSwitch) {
        langSwitch.addEventListener("click", (e) => {
            e.stopPropagation();
            langSwitch.classList.toggle("active");
        });

        document.querySelectorAll(".lang").forEach(l => {
            l.addEventListener("click", (e) => {
                e.stopPropagation();
                langActive.textContent = l.dataset.lang;
                langSwitch.classList.remove("active");
            });
        });

        document.addEventListener("click", () => {
            langSwitch.classList.remove("active");
        });
    }

    /* ======================================================
                    HEADER SCROLL EFFECT
    ====================================================== */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeaderState = () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        updateHeaderState();

        window.addEventListener("scroll", updateHeaderState);
    }

    /* ======================================================
                    MENU MOBILE (fluxo único)
    ====================================================== */

    const mobileToggle = document.getElementById("mobileToggle");
    const mainNavigation = document.querySelector(".main-navigation");
    const menuOverlay = document.querySelector(".menu-overlay");

    function openMenu() {
        mobileToggle.classList.add("active");
        mainNavigation.classList.add("active");
        if (menuOverlay) menuOverlay.classList.add("active");
    }

    function closeMenu() {
        mobileToggle.classList.remove("active");
        mainNavigation.classList.remove("active");
        if (menuOverlay) menuOverlay.classList.remove("active");

        document.querySelectorAll(".dropdown.open").forEach(item => {
            item.classList.remove("open");
        });
    }

    if (mobileToggle && mainNavigation) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = mainNavigation.classList.contains("active");
            isOpen ? closeMenu() : openMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    /* fecha o menu ao clicar num link (exceto o toggle do mega menu) */
    document.querySelectorAll(".nav-link:not(.dropdown-toggle)").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    /* ======================================================
                    MEGA MENU MOBILE
    ====================================================== */

    const dropdown = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");

    if (dropdown && dropdownToggle) {
        dropdownToggle.addEventListener("click", (event) => {
            if (window.innerWidth <= 991) {
                event.preventDefault();
                dropdown.classList.toggle("open");
            }
        });
    }

    /* fecha o mega menu/menu mobile ao clicar fora do header */
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".site-header")) {
            document.querySelectorAll(".dropdown.open").forEach(item => {
                item.classList.remove("open");
            });
        }
    });


});
