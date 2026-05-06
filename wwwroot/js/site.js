// ==========================================================
// RAIN THEME PRO JS
// Animaciones modernas + interacción + efectos UI
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    /* ─────────────────────────────────────────────
       1. NAVBAR DINÁMICA
    ───────────────────────────────────────────── */
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });


    /* ─────────────────────────────────────────────
       2. SCROLL REVEAL (animación al aparecer)
    ───────────────────────────────────────────── */
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const trigger = window.innerHeight - 100;

        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;

            if (top < trigger) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();


    /* ─────────────────────────────────────────────
       3. EFECTO GLOW CON MOUSE
    ───────────────────────────────────────────── */
    const glow = document.createElement("div");
    glow.style.position = "fixed";
    glow.style.width = "300px";
    glow.style.height = "300px";
    glow.style.borderRadius = "50%";
    glow.style.pointerEvents = "none";
    glow.style.background = "radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%)";
    glow.style.filter = "blur(40px)";
    glow.style.zIndex = "1";
    glow.style.transition = "transform 0.1s linear";

    document.body.appendChild(glow);

    document.addEventListener("mousemove", (e) => {
        glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    });


    /* ─────────────────────────────────────────────
       4. RIPPLE REAL EN BOTONES (click)
    ───────────────────────────────────────────── */
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.position = "absolute";
            ripple.style.borderRadius = "50%";
            ripple.style.background = "rgba(255,255,255,0.3)";
            ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
            ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
            ripple.style.transform = "scale(0)";
            ripple.style.opacity = "1";
            ripple.style.pointerEvents = "none";
            ripple.style.transition = "transform 0.5s ease, opacity 0.6s ease";

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.style.transform = "scale(2)";
                ripple.style.opacity = "0";
            }, 10);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });


    /* ─────────────────────────────────────────────
       5. PARALLAX SUAVE (lluvia más viva)
    ───────────────────────────────────────────── */
    document.addEventListener("scroll", () => {
        const offset = window.scrollY * 0.3;

        document.body.style.backgroundPosition = `0px ${offset}px`;
    });


    /* ─────────────────────────────────────────────
       6. HOVER DINÁMICO EN CARDS
    ───────────────────────────────────────────── */
    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `
                radial-gradient(circle at ${x}px ${y}px,
                rgba(139,92,246,0.15),
                rgba(26,19,48,0.8))
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.background = "rgba(26,19,48,0.75)";
        });
    });


    /* ─────────────────────────────────────────────
       7. TEXTO CON EFECTO TYPEWRITER
    ───────────────────────────────────────────── */
    const typeElements = document.querySelectorAll(".typewriter");

    typeElements.forEach(el => {
        const text = el.innerText;
        el.innerText = "";
        let i = 0;

        const type = () => {
            if (i < text.length) {
                el.innerText += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        };

        type();
    });


    /* ─────────────────────────────────────────────
       8. SCROLL PROGRESS BAR (opcional)
    ───────────────────────────────────────────── */
    const progress = document.createElement("div");
    progress.style.position = "fixed";
    progress.style.top = "0";
    progress.style.left = "0";
    progress.style.height = "3px";
    progress.style.background = "linear-gradient(90deg,#8b5cf6,#a78bfa)";
    progress.style.zIndex = "9999";

    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const height = document.body.scrollHeight - window.innerHeight;

        const percent = (scrollTop / height) * 100;
        progress.style.width = percent + "%";
    });

});