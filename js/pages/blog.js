/* ======================================================
   BLOG.JS — Formulário de subscrição da newsletter
   Usado em: APENAS blog.html

   IMPORTANTE: isto é só validação no browser. Para a
   subscrição funcionar de verdade, é preciso ligar este
   formulário a um serviço real (ex: HubSpot, Mailchimp),
   que já consta das tecnologias usadas pela empresa.
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("newsletterForm");
    const feedback = document.getElementById("newsletterFeedback");

    if (!form || !feedback) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            feedback.textContent = "Introduza um email válido.";
            feedback.className = "newsletter-feedback error";
            return;
        }

        // Aqui entraria a chamada real ao serviço de newsletter (ex: HubSpot API).
        feedback.textContent = "Obrigado! Verifique o seu email para confirmar a subscrição.";
        feedback.className = "newsletter-feedback success";
        form.reset();
    });

});
