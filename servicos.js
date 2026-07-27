/* ======================================================
   SERVICOS.JS — Linha de progresso, revelação das etapas
   e popup "Ver mais" com detalhes + galeria de cada serviço
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

    /* ======================================================
        POPUP "VER MAIS" — DETALHES + GALERIA DE CADA SERVIÇO
    ====================================================== */

    const SERVICE_DETAILS = {
        consultoria: {
            tag: "Consultoria Tecnológica",
            title: "Consultoria Tecnológica",
            description: "Diagnóstico do estado atual da empresa, identificação de gargalos e definição de um plano de transformação digital realista e priorizado, com acompanhamento em cada fase.",
            items: [
                "Diagnóstico e auditoria tecnológica",
                "Definição de roadmap de transformação digital",
                "Otimização de processos internos",
                "Acompanhamento de gestão de mudança",
            ],
            images: [
                "assets/images/business-colleagues-watching-content-laptop.png",
                "assets/cases/Capa---Artigo-de-Blog_-Analise-de-dados.jpg",
            ],
        },
        web: {
            tag: "Desenvolvimento Web",
            title: "Desenvolvimento Web",
            description: "Websites institucionais, plataformas empresariais e portais à medida, pensados para performance, conversão e fácil manutenção no dia a dia.",
            items: [
                "Websites institucionais",
                "Plataformas e portais empresariais",
                "Lojas online / e-commerce",
                "Manutenção e otimização de performance",
            ],
            images: [
                "assets/cases/6325219.jpg",
                "assets/cases/7196876.jpg",
            ],
        },
        ciberseguranca: {
            tag: "Cibersegurança",
            title: "Cibersegurança",
            description: "Avaliação de vulnerabilidades, boas práticas de proteção de dados e políticas de segurança adaptadas à realidade de cada empresa.",
            items: [
                "Avaliação de vulnerabilidades",
                "Políticas de proteção de dados",
                "Formação de equipas em segurança",
                "Monitorização contínua",
            ],
            images: [
                "assets/cases/NFC-Payment2-blog.jpg",
                "assets/cases/30dc5ac05723-IOT_404538009.jpg",
            ],
        },
        redes: {
            tag: "Redes e Infraestrutura",
            title: "Redes e Infraestrutura",
            description: "Configuração de redes, servidores e infraestrutura local, com foco em estabilidade, segurança e escalabilidade para o crescimento do negócio.",
            items: [
                "Configuração de redes locais",
                "Gestão de servidores",
                "Cablagem estruturada",
                "Suporte técnico contínuo",
            ],
            images: [
                "assets/cases/compressed-architect-engineer-pointing-architectural-building-prototype-analyzing-construction-model-computer-businessman-designer-working-remote-from-home-real-estate-proje.jpg",
                "assets/cases/30dc5ac05723-IOT_404538009.jpg",
            ],
        },
        cloud: {
            tag: "Cloud Computing",
            title: "Cloud Computing",
            description: "Migração e gestão de ambientes cloud (Microsoft Azure, Microsoft 365), reduzindo custos de infraestrutura e aumentando a flexibilidade operacional.",
            items: [
                "Migração para a cloud",
                "Gestão de ambientes Azure / Microsoft 365",
                "Backup e recuperação de desastres",
                "Otimização de custos cloud",
            ],
            images: [
                "assets/cases/78685249-3d-aumentar-grafico-com-azul-robo-dirigido-por-ia-crescimento-analise-o-negocio-inteligencia-automatizado-dados-analise-produtividade-aumentar-inteligente-previsao-.jpg",
                "assets/cases/Capa---Artigo-de-Blog_-Analise-de-dados.jpg",
            ],
        },
        automacao: {
            tag: "Automação Empresarial",
            title: "Automação Empresarial",
            description: "Fluxos automatizados com n8n para eliminar tarefas repetitivas — de recrutamento a atendimento — libertando tempo para o que importa.",
            items: [
                "Automação de processos com n8n",
                "Integração entre sistemas",
                "Automação de RH e atendimento",
                "Relatórios automáticos",
            ],
            images: [
                "assets/cases/images.jpg",
                "assets/cases/inteligencia-articial.jpg",
            ],
        },
        ia: {
            tag: "Inteligência Artificial",
            title: "Inteligência Artificial",
            description: "Machine learning, chatbots e análise de dados aplicados a problemas concretos do negócio — não tecnologia pela tecnologia.",
            items: [
                "Chatbots e assistentes virtuais",
                "Análise preditiva de dados",
                "Machine learning aplicado",
                "Controlo de qualidade com IA",
            ],
            images: [
                "assets/cases/inteligencia-articial.jpg",
                "assets/cases/78685249-3d-aumentar-grafico-com-azul-robo-dirigido-por-ia-crescimento-analise-o-negocio-inteligencia-automatizado-dados-analise-produtividade-aumentar-inteligente-previsao-.jpg",
            ],
        },
        rfid: {
            tag: "RFID e Gestão de Inventário",
            title: "RFID e Gestão de Inventário",
            description: "Identificação por RFID/NFC, contagem e controlo de stock em tempo real, reduzindo erros manuais na gestão de inventário.",
            items: [
                "Identificação RFID/NFC",
                "Contagem e auditoria de stock",
                "Integração com sistemas de gestão",
                "Alertas automáticos de inventário",
            ],
            images: [
                "assets/cases/30dc5ac05723-IOT_404538009.jpg",
                "assets/cases/NFC-Payment2-blog.jpg",
            ],
        },
    };

    const modal = document.getElementById("serviceModal");
    const modalBackdrop = document.getElementById("serviceModalBackdrop");
    const modalClose = document.getElementById("serviceModalClose");
    const modalTag = document.getElementById("serviceModalTag");
    const modalTitle = document.getElementById("serviceModalTitle");
    const modalDesc = document.getElementById("serviceModalDesc");
    const modalList = document.getElementById("serviceModalList");
    const modalGallery = document.getElementById("serviceModalGallery");

    function openModal(key) {
        const data = SERVICE_DETAILS[key];
        if (!data || !modal) return;

        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;

        modalList.innerHTML = "";
        data.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            modalList.appendChild(li);
        });

        modalGallery.innerHTML = "";
        data.images.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = data.title;
            modalGallery.appendChild(img);
        });

        modal.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".step-more-btn").forEach(btn => {
        btn.addEventListener("click", () => openModal(btn.dataset.service));
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal && !modal.hidden) closeModal();
    });

});
