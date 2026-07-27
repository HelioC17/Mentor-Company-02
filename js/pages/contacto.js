/* ======================================================
   CONTACTO.JS — Modo (FAQ / Serviço / Aberta) + sugestões
   Usado em: APENAS contacto.html

   IMPORTANTE: o envio do formulário aqui é só uma simulação
   no browser (mostra uma mensagem de sucesso). Para receber
   mensagens de verdade, é preciso ligar este formulário a um
   backend ou serviço de formulários (ex: Formspree, HubSpot).
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================================
                    BASE DE PERGUNTAS
    ====================================================== */

    const FAQS = [
        "Quanto tempo demora um projeto típico?",
        "Trabalham com empresas fora de Angola?",
        "Como funciona o processo de orçamentação?",
        "Oferecem suporte depois do projeto entregue?",
        "É possível começar com um projeto piloto pequeno?",
        "Que formas de pagamento aceitam?",
    ];

    const SERVICE_QUESTIONS = {
        consultoria: [
            "Como funciona o diagnóstico inicial?",
            "Quanto tempo demora uma consultoria?",
            "Trabalham com pequenas empresas?",
        ],
        web: [
            "Quanto custa um website institucional?",
            "Fazem manutenção depois do lançamento?",
            "Posso pedir alterações ao design?",
        ],
        ciberseguranca: [
            "Fazem auditorias de segurança?",
            "Como funciona uma avaliação de vulnerabilidades?",
            "Ajudam a cumprir políticas de proteção de dados?",
        ],
        redes: [
            "Fazem instalação de redes em escritórios?",
            "Dão suporte a servidores já existentes?",
            "Trabalham com Microsoft 365?",
        ],
        cloud: [
            "Ajudam a migrar para a cloud?",
            "Trabalham com Microsoft Azure?",
            "Como reduzem custos de infraestrutura?",
        ],
        automacao: [
            "O que é possível automatizar com n8n?",
            "Quanto tempo demora a implementar uma automação?",
            "Automatizam processos de RH?",
        ],
        ia: [
            "Que tipos de chatbot desenvolvem?",
            "Fazem análise preditiva de dados?",
            "Como aplicam IA ao controlo de qualidade?",
        ],
        rfid: [
            "Como funciona o RFID na gestão de stock?",
            "Fazem inventariação completa?",
            "Integra com sistemas já existentes?",
        ],
    };

    /* ======================================================
                    ELEMENTOS
    ====================================================== */

    const modeButtons = document.querySelectorAll(".mode-btn");
    const serviceWrap = document.getElementById("serviceSelectWrap");
    const serviceSelect = document.getElementById("cf-servico");
    const suggestionsWrap = document.getElementById("suggestions");
    const suggestionsList = document.getElementById("suggestionsList");
    const textarea = document.getElementById("cf-mensagem");

    if (!modeButtons.length) return;

    let currentMode = "faq";

    /* ======================================================
                    RENDERIZAR CHIPS
    ====================================================== */

    function renderChips(questions) {
        suggestionsList.innerHTML = "";

        questions.forEach(question => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "suggestion-chip";
            chip.textContent = question;

            chip.addEventListener("click", () => {
                textarea.value = question;
                textarea.focus();
            });

            suggestionsList.appendChild(chip);
        });

        suggestionsWrap.hidden = questions.length === 0;
    }

    /* ======================================================
                    TROCAR DE MODO
    ====================================================== */

    function setMode(mode) {
        currentMode = mode;

        modeButtons.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.mode === mode);
        });

        if (mode === "faq") {
            serviceWrap.hidden = true;
            renderChips(FAQS);

        } else if (mode === "servico") {
            serviceWrap.hidden = false;

            const selected = serviceSelect.value;
            renderChips(SERVICE_QUESTIONS[selected] || []);

        } else {
            // mensagem aberta
            serviceWrap.hidden = true;
            suggestionsWrap.hidden = true;
            suggestionsList.innerHTML = "";
        }
    }

    modeButtons.forEach(btn => {
        btn.addEventListener("click", () => setMode(btn.dataset.mode));
    });

    serviceSelect.addEventListener("change", () => {
        if (currentMode === "servico") {
            renderChips(SERVICE_QUESTIONS[serviceSelect.value] || []);
        }
    });

    // estado inicial: modo FAQ com as sugestões já visíveis
    setMode("faq");

    /* ======================================================
                    ENVIO DO FORMULÁRIO
    ====================================================== */

    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");

    if (form && feedback) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            feedback.textContent = "Mensagem enviada! Entraremos em contacto brevemente.";
            feedback.className = "form-feedback success";
            form.reset();
            setMode("faq");
        });
    }

});
