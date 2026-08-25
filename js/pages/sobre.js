/* ======================================================
   SOBRE.JS — Contador animado da secção "Números"
   Usado em: APENAS sobre.html
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================================
                    COUNTER ANIMATION
    ====================================================== */

    const aboutStats = document.querySelector(".about-stats-inline");

    if (aboutStats) {

        const counters = aboutStats.querySelectorAll(".counter");

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

        observer.observe(aboutStats);

    }

});
