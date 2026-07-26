/* ======================================================
   HOME.JS — Slider do hero, partículas, carrossel de áreas,
   contador de impacto, filtro de cases
   Usado em: APENAS index.html
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================================
                        HERO SLIDER
    ====================================================== */
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".nav-dot");

    let current = 0;
    let interval;
    const TIME = 5050;

    function show(i) {
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        slides[i].classList.add("active");
        if (dots[i]) dots[i].classList.add("active");

        current = i;
    }

    function next() {
        show((current + 1) % slides.length);
    }

    function start() {
        interval = setInterval(next, TIME);
    }

    function stop() {
        clearInterval(interval);
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            show(parseInt(dot.dataset.index));
            start();
        });
    });

    const hero = document.querySelector("#hero");

    if (hero) {
        hero.addEventListener("mouseenter", stop);
        hero.addEventListener("mouseleave", start);
    }

    if (slides.length) {
        show(0);
        start();
    }

    /* ======================================================
                    HERO — GLOW ORBS (parallax rato)
    ====================================================== */

    document.addEventListener("mousemove", (e) => {
        const orbs = document.querySelectorAll(".glow-orb");
        if (!orbs.length) return;

        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        orbs.forEach(orb => {
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    /* ======================================================
                HERO PARTICLES (CANVAS ENGINE)
    ====================================================== */

    const canvas = document.getElementById("hero-particles");

    if (canvas) {
        const ctx = canvas.getContext("2d");

        let particles = [];
        const PARTICLE_COUNT = 50;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;

                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;

                this.radius = Math.random() * 2 + 1;
            }

            move() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(249, 115, 22, 0.8)";
                ctx.fill();
            }
        }

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {

                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;

                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = "rgba(59,130,246,0.15)";
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let p of particles) {
                p.move();
                p.draw();
            }

            connectParticles();

            requestAnimationFrame(animate);
        }

        init();
        animate();
    }

    /* ======================================================
        STACK DRAG (CARDS SWIPE — ÁREAS DE ATUAÇÃO)
    ====================================================== */

    const cards = document.querySelectorAll(".area-card");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");

    let index = 0;

    function updateStack() {
        cards.forEach((card, i) => {
            card.classList.remove("active", "next", "back", "hidden");

            const pos = (i - index + cards.length) % cards.length;

            if (pos === 0) card.classList.add("active");
            else if (pos === 1) card.classList.add("next");
            else if (pos === 2) card.classList.add("back");
            else card.classList.add("hidden");
        });
    }

    if (cards.length && nextBtn && prevBtn) {

        nextBtn.addEventListener("click", () => {
            index = (index + 1) % cards.length;
            updateStack();
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + cards.length) % cards.length;
            updateStack();
        });

        updateStack();
    }

    /* ======================================================
                    COUNTER ANIMATION
    ====================================================== */

    const impact = document.querySelector("#impact");

    if (impact) {

        const counters = document.querySelectorAll(".counter");

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                counters.forEach(counter => {

                    const target = +counter.dataset.target;

                    let value = 0;

                    const speed = target / 80;

                    function update() {

                        value += speed;

                        if (value < target) {

                            counter.innerText = Math.ceil(value);

                            requestAnimationFrame(update);

                        } else {

                            counter.innerText = target;

                        }

                    }

                    update();

                });

                observer.disconnect();

            });

        }, {

            threshold: 0.45

        });

        observer.observe(impact);

    }

    /* ======================================================
                CASE STUDY FILTER
        - "Em Alta": mostra apenas os 3 projetos em destaque (.featured)
          (filtro ativo por defeito)
        - Restantes: filtram por categoria (data-category),
          e os projetos em destaque continuam visíveis
          sempre que pertencerem à categoria escolhida.
        - A lógica "all" foi mantida no código apenas por segurança,
          mas já não existe nenhum botão a chamá-la.
    ====================================================== */

    const filterButtons = document.querySelectorAll(".cases-filters button");
    const caseCards = document.querySelectorAll(".case-card");

    function applyFilter(filter) {

        caseCards.forEach(card => {

            const categories = card.dataset.category || "";
            const isFeatured = card.classList.contains("featured");

            let visible = false;

            if (filter === "all") {
                visible = true;
            } else if (filter === "featured") {
                visible = isFeatured;
            } else {
                visible = categories.includes(filter);
            }

            card.style.display = visible ? "block" : "none";
        });
    }

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            applyFilter(button.dataset.filter);

        });

    });

    if (filterButtons.length) {
        applyFilter("featured");
    }

});
