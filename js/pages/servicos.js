/* ======================================================
   SERVICOS.JS — Linha de progresso + revelação das etapas
   Usado em: APENAS servicos.html
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const timeline = document.getElementById("process-timeline");
    const fill = document.getElementById("timeline-fill");
    const steps = document.querySelectorAll(".process-step");

    if (!timeline || !fill || !steps.length) return;

    /* ======================================================
        LINHA DE PROGRESSO (enche conforme o scroll)
    ====================================================== */

    function updateFill() {
        const rect = timeline.getBoundingClientRect();
        const viewportH = window.innerHeight;

        // progresso: 0 quando o topo da timeline entra no ecrã,
        // 1 quando o fundo da timeline sai pelo topo do ecrã
        const total = rect.height + viewportH * 0.4;
        const visto = viewportH * 0.6 - rect.top;

        let progress = visto / total;
        progress = Math.max(0, Math.min(1, progress));

        fill.style.height = (progress * 100) + "%";
    }

    window.addEventListener("scroll", updateFill, { passive: true });
    window.addEventListener("resize", updateFill);
    updateFill();

    /* ======================================================
        REVELAÇÃO DE CADA ETAPA AO ENTRAR NO ECRÃ
    ====================================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            }
        });

    }, {
        threshold: 0.35
    });

    steps.forEach(step => observer.observe(step));

});
