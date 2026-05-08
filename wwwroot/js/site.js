// ==========================================================
// GAMER NEON THEME — site.js  v3.0
// Fuentes: Orbitron · Rajdhani · Share Tech Mono
// RGB · Glitch · Matrix · CRT · Neon por sección
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    // ── Paleta neon (debe coincidir con site.css) ──────────
    const NEON = {
        cyan: "#00f5ff",
        magenta: "#ff2079",
        green: "#7fff00",
        orange: "#ff6b00",
        purple: "#bf00ff",
        yellow: "#ffff00",
        pink: "#ff00aa",
        teal: "#00ffcc",
        red: "#ff1e1e",
        blue: "#2979ff",
    };

    // ── Helper: parsear hex → rgb ──────────────────────────
    const hexRgb = hex =>
        hex.replace("#", "").match(/.{2}/g).map(x => parseInt(x, 16)).join(",");


    /* ─────────────────────────────────────────────────────
       1. NAVBAR DINÁMICA — efecto HUD al hacer scroll
    ───────────────────────────────────────────────────── */
    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {
        if (!navbar) return;
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle("scrolled", scrolled);
        navbar.style.borderBottomColor = scrolled
            ? `rgba(${hexRgb(NEON.cyan)}, 0.5)`
            : `rgba(${hexRgb(NEON.cyan)}, 0.15)`;
        navbar.style.boxShadow = scrolled
            ? `0 0 30px rgba(${hexRgb(NEON.cyan)}, 0.2), 0 2px 0 rgba(${hexRgb(NEON.cyan)}, 0.15)`
            : "";
    };

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();


    /* ─────────────────────────────────────────────────────
       2. SCROLL REVEAL — entrada con efecto boot gamer
    ───────────────────────────────────────────────────── */
    const reveals = document.querySelectorAll(".reveal");

    // Asignar color neon rotativo a cada elemento
    const neonKeys = Object.keys(NEON);
    reveals.forEach((el, i) => {
        el.dataset.neon = neonKeys[i % neonKeys.length];
        el.style.opacity = "0";
        el.style.transform = "translateY(18px) skewX(-1deg)";
        el.style.transition = "opacity 0.4s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)";
    });

    const revealOnScroll = () => {
        const trigger = window.innerHeight - 80;
        reveals.forEach((el, i) => {
            if (el.getBoundingClientRect().top < trigger && !el.classList.contains("active")) {
                el.classList.add("active");
                setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0) skewX(0)";
                    // Flash neon al aparecer
                    const c = NEON[el.dataset.neon];
                    el.style.boxShadow = `0 0 24px rgba(${hexRgb(c)}, 0.4)`;
                    setTimeout(() => el.style.boxShadow = "", 600);
                }, i * 60);
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll, { passive: true });
    revealOnScroll();


    /* ─────────────────────────────────────────────────────
       3. CURSOR CROSSHAIR — aura RGB que sigue al mouse
    ───────────────────────────────────────────────────── */
    const aura = document.createElement("div");
    Object.assign(aura.style, {
        position: "fixed",
        width: "340px",
        height: "340px",
        borderRadius: "50%",
        pointerEvents: "none",
        background: `radial-gradient(circle, rgba(${hexRgb(NEON.cyan)},0.18), transparent 70%)`,
        filter: "blur(50px)",
        zIndex: "9990",
        transition: "background 1.2s ease",
        mixBlendMode: "screen",
    });
    document.body.appendChild(aura);

    // Cursor custom tipo crosshair gamer
    const cursor = document.createElement("div");
    Object.assign(cursor.style, {
        position: "fixed",
        width: "18px",
        height: "18px",
        border: `1.5px solid ${NEON.cyan}`,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: "99999",
        boxShadow: `0 0 8px ${NEON.cyan}`,
        transition: "transform 0.08s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        mixBlendMode: "screen",
    });
    document.body.appendChild(cursor);

    // Punto central del cursor
    const cursorDot = document.createElement("div");
    Object.assign(cursorDot.style, {
        position: "fixed",
        width: "4px",
        height: "4px",
        background: NEON.cyan,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: "99999",
        boxShadow: `0 0 6px ${NEON.cyan}`,
        transition: "background 0.3s ease",
    });
    document.body.appendChild(cursorDot);

    // Paleta RGB cíclica para el aura
    const auraColors = [NEON.cyan, NEON.magenta, NEON.purple, NEON.green, NEON.teal];
    let auraIdx = 0;
    setInterval(() => {
        auraIdx = (auraIdx + 1) % auraColors.length;
        const c = auraColors[auraIdx];
        aura.style.background = `radial-gradient(circle, rgba(${hexRgb(c)},0.16), transparent 70%)`;
    }, 2400);

    let mx = 0, my = 0, ax = 0, ay = 0;
    document.addEventListener("mousemove", e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = (mx - 9) + "px";
        cursor.style.top = (my - 9) + "px";
        cursorDot.style.left = (mx - 2) + "px";
        cursorDot.style.top = (my - 2) + "px";
    });

    // Aura con lag suave
    const animAura = () => {
        ax += (mx - 170 - ax) * 0.07;
        ay += (my - 170 - ay) * 0.07;
        aura.style.left = ax + "px";
        aura.style.top = ay + "px";
        requestAnimationFrame(animAura);
    };
    animAura();

    // Cursor se expande al hover sobre interactivos
    document.querySelectorAll("a, button, .btn, .card, .nav-link").forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform = "scale(1.8)";
            cursor.style.borderColor = NEON.magenta;
            cursor.style.boxShadow = `0 0 14px ${NEON.magenta}`;
            cursorDot.style.background = NEON.magenta;
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.transform = "scale(1)";
            cursor.style.borderColor = NEON.cyan;
            cursor.style.boxShadow = `0 0 8px ${NEON.cyan}`;
            cursorDot.style.background = NEON.cyan;
        });
    });


    /* ─────────────────────────────────────────────────────
       4. RIPPLE NEON EN BOTONES
    ───────────────────────────────────────────────────── */
    document.querySelectorAll(".btn").forEach(btn => {
        // Detectar qué color neon tiene el botón
        const bc = getComputedStyle(btn).borderColor;

        btn.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;

            Object.assign(ripple.style, {
                position: "absolute",
                borderRadius: "50%",
                width: size + "px",
                height: size + "px",
                left: (e.clientX - rect.left - size / 2) + "px",
                top: (e.clientY - rect.top - size / 2) + "px",
                transform: "scale(0)",
                opacity: "0.7",
                pointerEvents: "none",
                background: `radial-gradient(circle, rgba(${hexRgb(NEON.magenta)},0.5), transparent 70%)`,
                boxShadow: `0 0 20px rgba(${hexRgb(NEON.magenta)},0.6)`,
                transition: "transform 0.55s ease, opacity 0.6s ease",
                zIndex: "0",
            });

            this.appendChild(ripple);
            requestAnimationFrame(() => {
                ripple.style.transform = "scale(1)";
                ripple.style.opacity = "0";
            });
            setTimeout(() => ripple.remove(), 650);

            // Flash en el texto del botón
            const origColor = this.style.color;
            this.style.color = "#fff";
            this.style.textShadow = `0 0 14px #fff`;
            setTimeout(() => {
                this.style.color = origColor;
                this.style.textShadow = "";
            }, 250);
        });
    });


    /* ─────────────────────────────────────────────────────
       5. PARALLAX + CUADRÍCULA HOLOGRÁFICA AL SCROLL
    ───────────────────────────────────────────────────── */
    window.addEventListener("scroll", () => {
        const offset = window.scrollY * 0.25;
        document.body.style.backgroundPosition = `0px ${offset}px`;
    }, { passive: true });


    /* ─────────────────────────────────────────────────────
       6. CARDS — efecto holo 3D + luz neon al mouse
    ───────────────────────────────────────────────────── */
    document.querySelectorAll(".card").forEach((card, i) => {
        // Asignar color neon único por card
        const cardColor = Object.values(NEON)[i % Object.values(NEON).length];

        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            // Rotación 3D tilt
            const rotX = ((y - cy) / cy) * -8;
            const rotY = ((x - cx) / cx) * 8;

            card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
            card.style.background = `
                radial-gradient(circle at ${x}px ${y}px,
                rgba(${hexRgb(cardColor)}, 0.12),
                rgba(8, 14, 24, 0.92) 65%)
            `;
            card.style.borderColor = `rgba(${hexRgb(cardColor)}, 0.55)`;
            card.style.boxShadow = `
                0 0 20px rgba(${hexRgb(cardColor)}, 0.25),
                0 0 50px rgba(${hexRgb(cardColor)}, 0.1)
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.style.background = "";
            card.style.borderColor = "";
            card.style.boxShadow = "";
            card.style.transition = "all 0.4s ease";
        });

        card.addEventListener("mouseenter", () => {
            card.style.transition = "border-color 0.1s, box-shadow 0.1s";
        });
    });


    /* ─────────────────────────────────────────────────────
       7. TYPEWRITER con cursor parpadeante tipo terminal
    ───────────────────────────────────────────────────── */
    document.querySelectorAll(".typewriter").forEach(el => {
        const text = el.textContent.trim();
        el.textContent = "";
        el.style.fontFamily = "'Share Tech Mono', monospace";

        // Cursor parpadeante
        const blink = document.createElement("span");
        blink.textContent = "█";
        blink.style.cssText = `
            display: inline-block;
            color: ${NEON.green};
            text-shadow: 0 0 6px ${NEON.green};
            animation: blink-cursor 0.7s step-end infinite;
        `;

        // Inyectar keyframe si no existe
        if (!document.getElementById("tw-style")) {
            const s = document.createElement("style");
            s.id = "tw-style";
            s.textContent = `
                @keyframes blink-cursor {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
            `;
            document.head.appendChild(s);
        }

        el.appendChild(blink);
        let i = 0;

        const type = () => {
            if (i < text.length) {
                blink.insertAdjacentText("beforebegin", text[i]);
                i++;
                // Variación de velocidad para realismo
                const delay = text[i - 1] === " " ? 60 : Math.random() > 0.9 ? 120 : 28;
                setTimeout(type, delay);
            } else {
                // Quitar cursor al terminar (opcional: mantenerlo)
                setTimeout(() => blink.remove(), 1800);
            }
        };

        // Observar visibilidad para arrancar al entrar en pantalla
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { type(); obs.disconnect(); }
            });
        }, { threshold: 0.3 });
        obs.observe(el);
    });


    /* ─────────────────────────────────────────────────────
       8. BARRA DE PROGRESO GLOBAL — RGB cycling
    ───────────────────────────────────────────────────── */
    const progressBar = document.createElement("div");
    Object.assign(progressBar.style, {
        position: "fixed",
        top: "0",
        left: "0",
        height: "3px",
        width: "0%",
        zIndex: "99999",
        pointerEvents: "none",
        transition: "width 0.1s linear",
        background: `linear-gradient(90deg, ${NEON.cyan}, ${NEON.magenta}, ${NEON.purple})`,
        backgroundSize: "200% 100%",
        boxShadow: `0 0 8px ${NEON.cyan}`,
    });
    document.body.appendChild(progressBar);

    // Animar gradiente del progress
    let pgAngle = 0;
    const progressColors = [NEON.cyan, NEON.magenta, NEON.purple, NEON.green, NEON.teal];
    let pgIdx = 0;
    setInterval(() => {
        pgIdx = (pgIdx + 1) % progressColors.length;
        const a = progressColors[pgIdx];
        const b = progressColors[(pgIdx + 1) % progressColors.length];
        progressBar.style.background = `linear-gradient(90deg, ${a}, ${b})`;
        progressBar.style.boxShadow = `0 0 10px ${a}, 0 0 20px rgba(${hexRgb(a)}, 0.4)`;
    }, 1200);

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const height = document.body.scrollHeight - window.innerHeight;
        if (height <= 0) return;
        progressBar.style.width = ((scrollTop / height) * 100) + "%";
    }, { passive: true });


    /* ─────────────────────────────────────────────────────
       9. EFECTO GLITCH EN HEADINGS (hover)
    ───────────────────────────────────────────────────── */
    document.querySelectorAll("h1, h2, h3").forEach(heading => {
        heading.addEventListener("mouseenter", () => {
            let t = 0;
            const glitchColors = [NEON.cyan, NEON.magenta, NEON.green, NEON.yellow];
            const interval = setInterval(() => {
                const c = glitchColors[Math.floor(Math.random() * glitchColors.length)];
                heading.style.textShadow = `
                    ${(Math.random() - 0.5) * 6}px ${(Math.random() - 0.5) * 3}px 0 rgba(${hexRgb(NEON.cyan)},0.8),
                    ${(Math.random() - 0.5) * 6}px ${(Math.random() - 0.5) * 3}px 0 rgba(${hexRgb(NEON.magenta)},0.8),
                    0 0 20px rgba(${hexRgb(c)}, 0.6)
                `;
                heading.style.transform = `skewX(${(Math.random() - 0.5) * 3}deg) translateX(${(Math.random() - 0.5) * 3}px)`;
                t++;
                if (t > 8) {
                    clearInterval(interval);
                    heading.style.textShadow = "";
                    heading.style.transform = "";
                }
            }, 55);
        });
    });


    /* ─────────────────────────────────────────────────────
       10. MATRIX RAIN CANVAS (fondo opcional)
    ───────────────────────────────────────────────────── */
    const matrixCanvas = document.getElementById("matrix-bg");
    if (matrixCanvas) {
        const ctx = matrixCanvas.getContext("2d");
        const resize = () => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const chars = "アイウエオカキクケコ0123456789ABCDEF</>{}[]▸◈⬡◉▣◬█▌";
        const colW = 18;
        const cols = Math.floor(window.innerWidth / colW);
        const drops = Array(cols).fill(1);
        const colors = [NEON.cyan, NEON.green, NEON.magenta, NEON.purple, NEON.teal];

        const drawMatrix = () => {
            ctx.fillStyle = "rgba(3, 6, 13, 0.05)";
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            drops.forEach((y, i) => {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const color = colors[Math.floor(Math.random() * colors.length)];

                ctx.font = `${colW - 2}px 'Share Tech Mono', monospace`;
                ctx.fillStyle = color;
                ctx.shadowBlur = 6;
                ctx.shadowColor = color;
                ctx.fillText(char, i * colW, y * colW);

                if (y * colW > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        };

        const matrixInterval = setInterval(drawMatrix, 50);

        // Pausar si no es visible (performance)
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) clearInterval(matrixInterval);
        });
    }


    /* ─────────────────────────────────────────────────────
       11. SCANLINE DINÁMICA EN HOVER DE INPUTS
    ───────────────────────────────────────────────────── */
    document.querySelectorAll(".form-control, .form-select").forEach(input => {
        const scanEl = document.createElement("span");
        Object.assign(scanEl.style, {
            position: "absolute",
            top: "0",
            left: "-60%",
            width: "40%",
            height: "100%",
            background: `linear-gradient(90deg, transparent, rgba(${hexRgb(NEON.green)}, 0.15), transparent)`,
            pointerEvents: "none",
            transition: "none",
            zIndex: "0",
            borderRadius: "inherit",
        });

        // Necesita posición relativa en el padre
        const wrap = input.parentElement;
        if (wrap) {
            const prev = getComputedStyle(wrap).position;
            if (prev === "static") wrap.style.position = "relative";
            wrap.appendChild(scanEl);
        }

        let scanAnim = null;
        const startScan = () => {
            let pos = -60;
            clearInterval(scanAnim);
            scanAnim = setInterval(() => {
                pos += 4;
                scanEl.style.left = pos + "%";
                if (pos > 120) pos = -60;
            }, 16);
        };
        const stopScan = () => {
            clearInterval(scanAnim);
            scanEl.style.left = "-60%";
        };

        input.addEventListener("focus", startScan);
        input.addEventListener("blur", stopScan);
    });


    /* ─────────────────────────────────────────────────────
       12. ALERTS — auto-dismiss con cuenta regresiva neon
    ───────────────────────────────────────────────────── */
    document.querySelectorAll(".alert.auto-dismiss").forEach(alert => {
        const duration = parseInt(alert.dataset.duration || "4000");
        const colorMap = {
            "alert-primary": NEON.purple,
            "alert-success": NEON.teal,
            "alert-warning": NEON.orange,
            "alert-danger": NEON.red,
        };
        let alertColor = NEON.cyan;
        for (const [cls, col] of Object.entries(colorMap)) {
            if (alert.classList.contains(cls)) { alertColor = col; break; }
        }

        // Barra de cuenta regresiva
        const timer = document.createElement("div");
        Object.assign(timer.style, {
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "2px",
            width: "100%",
            background: alertColor,
            boxShadow: `0 0 6px ${alertColor}`,
            transition: `width ${duration}ms linear`,
        });
        alert.style.position = "relative";
        alert.appendChild(timer);

        requestAnimationFrame(() => timer.style.width = "0%");

        setTimeout(() => {
            alert.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            alert.style.opacity = "0";
            alert.style.transform = "translateX(20px)";
            setTimeout(() => alert.remove(), 520);
        }, duration);
    });


    /* ─────────────────────────────────────────────────────
       13. EFECTO BOOT — secuencia de inicio al cargar
    ───────────────────────────────────────────────────── */
    const bootOverlay = document.createElement("div");
    Object.assign(bootOverlay.style, {
        position: "fixed",
        inset: "0",
        background: "var(--g-void, #03060d)",
        zIndex: "999999",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Share Tech Mono', monospace",
        color: NEON.cyan,
        fontSize: "0.82rem",
        letterSpacing: "0.08em",
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
    });

    const bootLines = [
        "SYSTEM BOOT v3.0 ........ [OK]",
        "LOADING NEON CORE ........ [OK]",
        "RGB SYNC ................. [OK]",
        "MATRIX PROTOCOL .......... [OK]",
        "GAMER THEME .............. [READY]",
    ];

    const bootLog = document.createElement("div");
    Object.assign(bootLog.style, {
        width: "320px",
        textAlign: "left",
    });
    bootOverlay.appendChild(bootLog);
    document.body.appendChild(bootOverlay);

    let lineIdx = 0;
    const showBootLine = () => {
        if (lineIdx < bootLines.length) {
            const p = document.createElement("p");
            p.textContent = bootLines[lineIdx];
            p.style.margin = "4px 0";
            p.style.textShadow = `0 0 6px ${NEON.cyan}`;
            p.style.opacity = "0";
            p.style.transition = "opacity 0.2s ease";
            bootLog.appendChild(p);
            requestAnimationFrame(() => p.style.opacity = "1");

            // Colorear [OK] y [READY]
            if (p.textContent.includes("[OK]")) {
                p.innerHTML = p.innerHTML.replace("[OK]", `<span style="color:${NEON.teal};text-shadow:0 0 8px ${NEON.teal}">[OK]</span>`);
            }
            if (p.textContent.includes("[READY]")) {
                p.innerHTML = p.innerHTML.replace("[READY]", `<span style="color:${NEON.magenta};text-shadow:0 0 8px ${NEON.magenta}">[READY]</span>`);
            }

            lineIdx++;
            setTimeout(showBootLine, 280);
        } else {
            // Cerrar boot overlay
            setTimeout(() => {
                bootOverlay.style.opacity = "0";
                setTimeout(() => bootOverlay.remove(), 520);
            }, 400);
        }
    };

    showBootLine();


    /* ─────────────────────────────────────────────────────
       14. TOOLTIPS NEON CUSTOM
    ───────────────────────────────────────────────────── */
    const tooltipColors = {
        "primary": NEON.purple,
        "success": NEON.teal,
        "warning": NEON.orange,
        "danger": NEON.red,
        "info": NEON.cyan,
        "default": NEON.cyan,
    };

    document.querySelectorAll("[data-neon-tooltip]").forEach(el => {
        const text = el.dataset.neonTooltip;
        const type = el.dataset.neonTooltipType || "default";
        const color = tooltipColors[type] || NEON.cyan;

        const tip = document.createElement("div");
        Object.assign(tip.style, {
            position: "fixed",
            background: "rgba(6, 10, 20, 0.97)",
            border: `1px solid rgba(${hexRgb(color)}, 0.5)`,
            color: color,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.76rem",
            letterSpacing: "0.06em",
            padding: "6px 12px",
            boxShadow: `0 0 14px rgba(${hexRgb(color)}, 0.3)`,
            textShadow: `0 0 6px ${color}`,
            pointerEvents: "none",
            zIndex: "99998",
            opacity: "0",
            transition: "opacity 0.18s ease, transform 0.18s ease",
            transform: "translateY(6px)",
            whiteSpace: "nowrap",
        });
        tip.textContent = "> " + text;
        document.body.appendChild(tip);

        el.addEventListener("mouseenter", e => {
            const r = el.getBoundingClientRect();
            tip.style.left = r.left + "px";
            tip.style.top = (r.bottom + 8) + "px";
            tip.style.opacity = "1";
            tip.style.transform = "translateY(0)";
        });
        el.addEventListener("mouseleave", () => {
            tip.style.opacity = "0";
            tip.style.transform = "translateY(6px)";
        });
    });


    /* ─────────────────────────────────────────────────────
       15. BORDES ACTIVOS RGB en focus (formularios)
    ───────────────────────────────────────────────────── */
    const focusColors = [NEON.green, NEON.cyan, NEON.teal, NEON.green];
    let focusIdx = 0;

    document.querySelectorAll(".form-control, .form-select").forEach(input => {
        input.addEventListener("focus", () => {
            const c = focusColors[focusIdx % focusColors.length];
            focusIdx++;
            input.style.borderColor = c;
            input.style.boxShadow = `0 0 0 1px ${c}, 0 0 16px rgba(${hexRgb(c)}, 0.35)`;
        });
        input.addEventListener("blur", () => {
            input.style.borderColor = "";
            input.style.boxShadow = "";
        });
    });


    /* ─────────────────────────────────────────────────────
       16. PARTÍCULAS NEON AL CLICK (explosión de píxeles)
    ───────────────────────────────────────────────────── */
    document.addEventListener("click", e => {
        const particleColors = Object.values(NEON);
        const count = 10;

        for (let i = 0; i < count; i++) {
            const p = document.createElement("span");
            const c = particleColors[Math.floor(Math.random() * particleColors.length)];
            const angle = (Math.random() * 360);
            const dist = 30 + Math.random() * 50;
            const size = 2 + Math.random() * 3;

            Object.assign(p.style, {
                position: "fixed",
                left: e.clientX + "px",
                top: e.clientY + "px",
                width: size + "px",
                height: size + "px",
                background: c,
                borderRadius: "50%",
                boxShadow: `0 0 ${size * 2}px ${c}`,
                pointerEvents: "none",
                zIndex: "99998",
                transition: "transform 0.6s ease, opacity 0.6s ease",
                opacity: "1",
            });
            document.body.appendChild(p);

            const rad = (angle * Math.PI) / 180;
            requestAnimationFrame(() => {
                p.style.transform = `translate(${Math.cos(rad) * dist}px, ${Math.sin(rad) * dist}px)`;
                p.style.opacity = "0";
            });
            setTimeout(() => p.remove(), 650);
        }
    });

});