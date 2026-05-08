/* ==========================================================
   ✦ ULTRA GAMER VISUAL BOOST PACK v4.0
   Agrega esto AL FINAL de tu site.js
   ========================================================== */


/* ─────────────────────────────────────────────────────
   17. FONDO RGB ANIMADO DINÁMICO
───────────────────────────────────────────────────── */
const rgbBg = document.createElement("div");

Object.assign(rgbBg.style, {
    position: "fixed",
    inset: "0",
    zIndex: "-2",
    pointerEvents: "none",
    background: `
        radial-gradient(circle at 20% 20%, rgba(0,245,255,.10), transparent 25%),
        radial-gradient(circle at 80% 30%, rgba(255,32,121,.10), transparent 25%),
        radial-gradient(circle at 50% 80%, rgba(191,0,255,.10), transparent 30%)
    `,
    filter: "blur(60px)",
    animation: "rgbMove 18s ease infinite alternate"
});

document.body.appendChild(rgbBg);

if (!document.getElementById("rgb-bg-style")) {
    const s = document.createElement("style");
    s.id = "rgb-bg-style";
    s.textContent = `
        @keyframes rgbMove{
            0%{
                transform:scale(1) translate(0,0);
            }
            100%{
                transform:scale(1.15) translate(-2%,2%);
            }
        }
    `;
    document.head.appendChild(s);
}


/* ─────────────────────────────────────────────────────
   18. EFECTO NEON PULSE EN BOTONES
───────────────────────────────────────────────────── */
document.querySelectorAll(".btn").forEach(btn => {

    btn.style.position = "relative";
    btn.style.overflow = "hidden";

    btn.addEventListener("mouseenter", () => {

        btn.animate([
            {
                boxShadow: `
                    0 0 8px rgba(0,245,255,.4),
                    0 0 18px rgba(0,245,255,.2)
                `
            },
            {
                boxShadow: `
                    0 0 16px rgba(255,32,121,.7),
                    0 0 36px rgba(255,32,121,.4)
                `
            }
        ], {
            duration: 800,
            iterations: Infinity,
            direction: "alternate"
        });

    });

});


/* ─────────────────────────────────────────────────────
   19. TITULOS CYBERPUNK CON RGB FLOAT
───────────────────────────────────────────────────── */
document.querySelectorAll("h1, h2").forEach(title => {

    title.style.position = "relative";

    title.addEventListener("mouseenter", () => {

        title.style.transition = "all .25s ease";

        title.style.textShadow = `
            -2px 0 #00f5ff,
            2px 0 #ff2079,
            0 0 18px rgba(0,245,255,.5)
        `;

        title.style.transform = "translateY(-2px) scale(1.02)";
        title.style.letterSpacing = ".08em";
    });

    title.addEventListener("mouseleave", () => {
        title.style.textShadow = "";
        title.style.transform = "";
        title.style.letterSpacing = "";
    });

});


/* ─────────────────────────────────────────────────────
   20. EFECTO POWER-UP EN CARDS
───────────────────────────────────────────────────── */
document.querySelectorAll(".card").forEach(card => {

    const glow = document.createElement("div");

    Object.assign(glow.style, {
        position: "absolute",
        inset: "-2px",
        borderRadius: "inherit",
        background: `
            linear-gradient(
                135deg,
                rgba(0,245,255,.35),
                rgba(255,32,121,.25),
                rgba(191,0,255,.35)
            )
        `,
        opacity: "0",
        transition: "opacity .3s ease",
        zIndex: "-1",
        filter: "blur(14px)"
    });

    card.style.position = "relative";
    card.appendChild(glow);

    card.addEventListener("mouseenter", () => {
        glow.style.opacity = "1";

        card.style.transform += " scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
        glow.style.opacity = "0";
    });

});


/* ─────────────────────────────────────────────────────
   21. BARRA SUPERIOR RGB FLUIDA
───────────────────────────────────────────────────── */
const topGlow = document.createElement("div");

Object.assign(topGlow.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "2px",
    zIndex: "999999",
    background: `
        linear-gradient(
            90deg,
            #00f5ff,
            #ff2079,
            #bf00ff,
            #00ffcc,
            #00f5ff
        )
    `,
    backgroundSize: "400% 100%",
    animation: "rgbFlow 6s linear infinite",
    boxShadow: `
        0 0 10px #00f5ff,
        0 0 20px #ff2079
    `
});

document.body.appendChild(topGlow);

if (!document.getElementById("rgb-flow-style")) {

    const style = document.createElement("style");

    style.id = "rgb-flow-style";

    style.textContent = `
        @keyframes rgbFlow{
            0%{
                background-position:0% 50%;
            }
            100%{
                background-position:400% 50%;
            }
        }
    `;

    document.head.appendChild(style);
}


/* ─────────────────────────────────────────────────────
   22. SCANLINES CRT REALES
───────────────────────────────────────────────────── */
const crt = document.createElement("div");

Object.assign(crt.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "9999",
    background: `
        repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,.02),
            rgba(255,255,255,.02) 1px,
            transparent 2px,
            transparent 4px
        )
    `,
    opacity: ".18",
    mixBlendMode: "overlay"
});

document.body.appendChild(crt);


/* ─────────────────────────────────────────────────────
   23. EFECTO SHOCKWAVE AL HACER CLICK
───────────────────────────────────────────────────── */
document.addEventListener("click", e => {

    const wave = document.createElement("div");

    Object.assign(wave.style, {
        position: "fixed",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        border: "2px solid #00f5ff",
        left: e.clientX - 10 + "px",
        top: e.clientY - 10 + "px",
        pointerEvents: "none",
        zIndex: "999999",
        boxShadow: "0 0 20px #00f5ff"
    });

    document.body.appendChild(wave);

    wave.animate([
        {
            transform: "scale(.3)",
            opacity: 1
        },
        {
            transform: "scale(12)",
            opacity: 0
        }
    ], {
        duration: 700,
        easing: "ease-out"
    });

    setTimeout(() => wave.remove(), 700);

});


/* ─────────────────────────────────────────────────────
   24. ICONOS FLOTANTES CYBER
───────────────────────────────────────────────────── */
document.querySelectorAll("i").forEach(icon => {

    icon.addEventListener("mouseenter", () => {

        icon.style.transition = "all .25s ease";

        icon.style.transform = "translateY(-4px) scale(1.2)";
        icon.style.textShadow = `
            0 0 10px #00f5ff,
            0 0 20px #ff2079
        `;
    });

    icon.addEventListener("mouseleave", () => {
        icon.style.transform = "";
        icon.style.textShadow = "";
    });

});


/* ─────────────────────────────────────────────────────
   25. EFECTO LOADING EN LINKS
───────────────────────────────────────────────────── */
document.querySelectorAll("a").forEach(link => {

    link.style.position = "relative";

    const underline = document.createElement("span");

    Object.assign(underline.style, {
        position: "absolute",
        left: "0",
        bottom: "-2px",
        width: "0%",
        height: "2px",
        background: "linear-gradient(90deg,#00f5ff,#ff2079)",
        transition: "width .3s ease",
        boxShadow: "0 0 10px #00f5ff"
    });

    link.appendChild(underline);

    link.addEventListener("mouseenter", () => {
        underline.style.width = "100%";
    });

    link.addEventListener("mouseleave", () => {
        underline.style.width = "0%";
    });

});