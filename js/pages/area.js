/* ======================================================
   AREA.JS — Template dinâmico para as páginas de área
   Usado em: APENAS area.html

   Como funciona: esta é UMA única página que serve as 8
   áreas de atuação. O conteúdo é escolhido pelo parâmetro
   ?id= na URL (ex: area.html?id=web) e vem todo daqui —
   assim evitamos ter 8 ficheiros HTML quase idênticos.
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const AREAS = {
        consultoria: {
            tag: "CONSULTORIA",
            title: "Consultoria Organizacional",
            subtitle: "Diagnóstico e estratégia para acelerar a transformação digital da sua empresa.",
            description: "Ajudamos a empresa a perceber onde está hoje e onde pode chegar: diagnóstico completo, identificação de gargalos e um plano de transformação digital realista, com apoio próximo em cada fase.",
            items: [
                "Diagnóstico organizacional completo",
                "Otimização de processos internos",
                "Gestão tecnológica contínua",
                "Apoio estratégico à tomada de decisão",
            ],
            image: "assets/images/business-colleagues-watching-content-laptop.png",
            gallery: [
                "assets/images/business-colleagues-watching-content-laptop.png",
                "assets/cases/Capa---Artigo-de-Blog_-Analise-de-dados.jpg",
            ],
        },
        marketing: {
            tag: "MARKETING",
            title: "Marketing Digital",
            subtitle: "Estratégia, conteúdo e performance orientados a resultados mensuráveis.",
            description: "Da estratégia de conteúdo à gestão de redes sociais, construímos presença digital consistente — com branding, campanhas e SEO pensados para gerar resultado, não só visibilidade.",
            items: [
                "Estratégia de conteúdo",
                "Gestão de redes sociais",
                "Branding e identidade visual",
                "SEO e otimização de performance",
            ],
            image: "assets/cases/Capa---Artigo-de-Blog_-Analise-de-dados.jpg",
            gallery: [
                "assets/cases/Capa---Artigo-de-Blog_-Analise-de-dados.jpg",
                "assets/cases/7196876.jpg",
            ],
        },
        iot: {
            tag: "IOT",
            title: "Automação e Casas Inteligentes",
            subtitle: "Controlo inteligente de espaços, com dispositivos IoT integrados num só sistema.",
            description: "Iluminação, tomadas, sensores de presença e som ambiente — tudo integrado e controlado de forma inteligente, para espaços residenciais e corporativos mais eficientes.",
            items: [
                "Iluminação e tomadas inteligentes",
                "Sensores de presença",
                "Som ambiente integrado",
                "Automação de espaços corporativos",
            ],
            image: "assets/cases/30dc5ac05723-IOT_404538009.jpg",
            gallery: [
                "assets/cases/30dc5ac05723-IOT_404538009.jpg",
                "assets/cases/NFC-Payment2-blog.jpg",
            ],
        },
        inventario: {
            tag: "INVENTÁRIO",
            title: "Gestão de Inventários",
            subtitle: "Contagem, organização e controlo de stock em tempo real.",
            description: "Executamos estratégias completas de inventário — da contagem inicial à organização contínua — reduzindo erros manuais e dando visibilidade real sobre o stock da empresa.",
            items: [
                "Contagem e auditoria de stock",
                "Identificação RFID/NFC",
                "Organização de armazém",
                "Relatórios de inventário",
            ],
            image: "assets/cases/NFC-Payment2-blog.jpg",
            gallery: [
                "assets/cases/NFC-Payment2-blog.jpg",
                "assets/cases/30dc5ac05723-IOT_404538009.jpg",
            ],
        },
        web: {
            tag: "WEB",
            title: "Desenvolvimento Web",
            subtitle: "Websites e plataformas à medida, pensados para performance.",
            description: "Websites corporativos, plataformas empresariais, portais e sistemas internos — construídos com tecnologias modernas e preparados para crescer com o negócio.",
            items: [
                "Websites corporativos",
                "Plataformas e portais empresariais",
                "Sistemas internos à medida",
                "Soluções cloud",
            ],
            image: "assets/cases/6325219.jpg",
            gallery: [
                "assets/cases/6325219.jpg",
                "assets/cases/7196876.jpg",
            ],
        },
        ia: {
            tag: "IA",
            title: "Inteligência Artificial",
            subtitle: "Machine learning e automação aplicados a problemas reais do negócio.",
            description: "Chatbots, análise preditiva e automação inteligente — aplicamos IA onde faz diferença real para o negócio, não como tecnologia pela tecnologia.",
            items: [
                "Chatbots e assistentes virtuais",
                "Machine learning aplicado",
                "Análise de dados",
                "Automatização inteligente de processos",
            ],
            image: "assets/cases/inteligencia-articial.jpg",
            gallery: [
                "assets/cases/inteligencia-articial.jpg",
                "assets/cases/78685249-3d-aumentar-grafico-com-azul-robo-dirigido-por-ia-crescimento-analise-o-negocio-inteligencia-automatizado-dados-analise-produtividade-aumentar-inteligente-previsao-.jpg",
            ],
        },
        infraestrutura: {
            tag: "INFRAESTRUTURA",
            title: "Redes & Sistemas",
            subtitle: "Redes, servidores e cloud, com suporte técnico contínuo.",
            description: "Configuração de redes, virtualização e ambientes cloud (incluindo Microsoft 365), com suporte empresarial pensado para minimizar tempo de inatividade.",
            items: [
                "Configuração de redes",
                "Servidores e virtualização",
                "Cloud e Microsoft 365",
                "Suporte técnico empresarial",
            ],
            image: "assets/cases/compressed-architect-engineer-pointing-architectural-building-prototype-analyzing-construction-model-computer-businessman-designer-working-remote-from-home-real-estate-proje.jpg",
            gallery: [
                "assets/cases/compressed-architect-engineer-pointing-architectural-building-prototype-analyzing-construction-model-computer-businessman-designer-working-remote-from-home-real-estate-proje.jpg",
                "assets/cases/Captura de ecrã 2026-07-18 213334.png",
            ],
        },
        saude: {
            tag: "HEALTH",
            title: "Saúde Digital",
            subtitle: "Tecnologia aplicada a hospitais e clínicas.",
            description: "Soluções de identificação RFID/NFC e gestão inteligente de recursos, pensadas para o contexto exigente de hospitais e clínicas.",
            items: [
                "Soluções para hospitais e clínicas",
                "Identificação RFID/NFC",
                "Gestão inteligente de recursos",
                "Inovação tecnológica em saúde",
            ],
            image: "assets/images/Gemini_Generated_Image_jtfz0wjtfz0wjtfz.png",
            gallery: [
                "assets/images/Gemini_Generated_Image_jtfz0wjtfz0wjtfz.png",
                "assets/cases/NFC-Payment2-blog.jpg",
            ],
        },
    };

    /* ======================================================
                    LER O ?id= DA URL
    ====================================================== */

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const area = AREAS[id];

    if (!area) {
        // id inválido ou em falta: volta à home
        window.location.href = "index.html#areas";
        return;
    }

    /* ======================================================
                    PREENCHER A PÁGINA
    ====================================================== */

    document.getElementById("pageTitle").textContent = area.title + " | Mentor Company";
    document.getElementById("areaTag").textContent = area.tag;
    document.getElementById("areaTitle").textContent = area.title;
    document.getElementById("areaSubtitle").textContent = area.subtitle;
    document.getElementById("areaBreadcrumb").textContent = area.title;
    document.getElementById("areaHeroImg").src = area.image;
    document.getElementById("areaHeroImg").alt = area.title;

    document.getElementById("areaHeading").textContent = area.title;
    document.getElementById("areaDescription").textContent = area.description;

    const list = document.getElementById("areaList");
    area.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });

    const gallery = document.getElementById("areaGallery");
    area.gallery.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = area.title;
        gallery.appendChild(img);
    });

    /* ======================================================
                    OUTRAS ÁREAS (excluindo a atual)
    ====================================================== */

    const related = document.getElementById("areaRelated");

    Object.keys(AREAS)
        .filter(key => key !== id)
        .slice(0, 4)
        .forEach(key => {
            const a = AREAS[key];

            const card = document.createElement("a");
            card.href = `area.html?id=${key}`;
            card.className = "related-card";
            card.style.backgroundImage = `url('${a.image}')`;

            card.innerHTML = `
                <div class="related-card-overlay"></div>
                <div class="related-card-content">
                    <span>${a.tag}</span>
                    <h3>${a.title}</h3>
                </div>
            `;

            related.appendChild(card);
        });

    // ícones inseridos dinamicamente (galeria/related) não precisam de lucide,
    // mas se algo novo usar data-lucide, garantimos que os ícones são criados
    if (window.lucide) lucide.createIcons();

});
