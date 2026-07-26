/* ======================================================
   PROJETOS.JS — Revelação ao scroll (bento tiles + stepper)
   Usado em: APENAS projetos.html
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const revealTargets = document.querySelectorAll(".bento-tile, .stepper-step");

    if (!revealTargets.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.15
    });

    revealTargets.forEach(el => observer.observe(el));

});
