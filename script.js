document.addEventListener("DOMContentLoaded", function () {

    /* HERO SLIDER */
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
    show(0);
    start();

    /* NOVO HERO */

    document.addEventListener("mousemove", (e) => {
    const orbs = document.querySelectorAll(".glow-orb");

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

            // cor tech (laranja + azul suave)
            ctx.fillStyle = "rgba(177, 80, 44, 0.8)";
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




    /* ICONS */
    if (window.lucide) lucide.createIcons();

    /* SEARCH */
    const searchToggle = document.getElementById("searchToggle");
    const searchBox = document.querySelector(".search-box");

    if (searchToggle) {
        searchToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            searchBox.classList.toggle("active");
        });

        document.addEventListener("click", () => {
            searchBox.classList.remove("active");
        });
    }

    /* LANGUAGE */
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

});
document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");

    /*
    ======================================================
            HEADER SCROLL EFFECT
    ======================================================
    */

    if (header) {

        const updateHeaderState = () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        // corre logo ao carregar a página (corrige refresh/âncoras a meio da página)
        updateHeaderState();

        window.addEventListener("scroll", updateHeaderState);
    }

    /*
    ======================================================
            MOBILE MENU
    ======================================================
    */

    const mobileButton = document.querySelector(".mobile-toggle");
    const navigation = document.querySelector(".main-navigation");

    if (mobileButton && navigation) {
        mobileButton.addEventListener("click", () => {
            navigation.classList.toggle("active");
            mobileButton.classList.toggle("open");
        });
    }

    /*
    ======================================================
            MEGA MENU MOBILE
    ======================================================
    */

    const dropdown = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");

    if (dropdown && dropdownToggle) {
        dropdownToggle.addEventListener("click", (event) => {
            if (window.innerWidth <= 950) {
                event.preventDefault();
                dropdown.classList.toggle("open");
            }
        });
    }

    /*
    ======================================================
            FECHAR MENU AO CLICAR FORA
    ======================================================
    */

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".site-header")) {
            document.querySelectorAll(".dropdown.open").forEach(item => {
                item.classList.remove("open");
            });
        }
    });

    /*
    ======================================================
            FECHAR MENU AO CLICAR NUM LINK
    ======================================================
    */

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            if (navigation) {
                navigation.classList.remove("active");
            }
            if (mobileButton) {
                mobileButton.classList.remove("open");
            }
        });
    });

});

/* ======================================================
        STACK DRAG (CARDS SWIPE MODERNO)
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

nextBtn.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    updateStack();
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + cards.length) % cards.length;
    updateStack();
});

updateStack();


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

        threshold:0.45

    });

    observer.observe(impact);

}

// ================================
// CASE STUDY FILTER
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".cases-filters button");
    const cards = document.querySelectorAll(".case-card");

    function showFeaturedCards() {

        cards.forEach(card => {
            if (card.classList.contains("featured")) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    function applyFilter(filter) {

        if (filter === "all") {
            showFeaturedCards();
            return;
        }

        cards.forEach(card => {

            const categories = card.dataset.category || "";

            if (categories.includes(filter)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });
    }

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            applyFilter(button.dataset.filter);

        });

    });

    applyFilter("all");

});

/* ======================================================
ACADEMY DRAG SLIDER
====================================================== */

const academyCards = document.querySelectorAll(".academy-card");
const academyNext = document.querySelector(".academy-next");
const academyPrev = document.querySelector(".academy-prev");
const academyTrack = document.querySelector(".academy-track");

let academyCurrent = 0;

function academyUpdate() {
    academyCards.forEach((card, index) => {
        card.classList.remove("active", "next", "prev", "hidden");

        if (index === academyCurrent) {
            card.classList.add("active");
        } else if (index === (academyCurrent + 1) % academyCards.length) {
            card.classList.add("next");
        } else if (index === (academyCurrent - 1 + academyCards.length) % academyCards.length) {
            card.classList.add("prev");
        } else {
            card.classList.add("hidden");
        }
    });
}

if (academyCards.length && academyNext && academyPrev && academyTrack) {

    academyNext.onclick = () => {
        academyCurrent++;
        if (academyCurrent >= academyCards.length) academyCurrent = 0;
        academyUpdate();
    };

    academyPrev.onclick = () => {
        academyCurrent--;
        if (academyCurrent < 0) academyCurrent = academyCards.length - 1;
        academyUpdate();
    };

    /* DRAG */
    let startX = 0;

    academyTrack.addEventListener("mousedown", e => {
        startX = e.clientX;
    });

    academyTrack.addEventListener("mouseup", e => {
        let diff = e.clientX - startX;
        if (diff > 80) academyPrev.click();
        if (diff < -80) academyNext.click();
    });

    /* MOBILE */
    academyTrack.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    academyTrack.addEventListener("touchend", e => {
        let diff = e.changedTouches[0].clientX - startX;
        if (diff > 80) academyPrev.click();
        if (diff < -80) academyNext.click();
    });

    academyUpdate();
}