/**
 * YOGITHA SRI — CINEMATIC BIRTHDAY EXPERIENCE
 * Main Configuration & Timeline Engine
 */

const CONFIG = {
    // === PLACE YOUR IMAGE PATHS HERE ===
    //photo1: "C:\\Users\\kanch\\OneDrive\\Desktop\\mahi\\assets\\photo1.jpg", // Portrait Photo of Yogitha
    photo1: "photo2.jpg", // Taj Mahal Photo
    photo2: "C:photo1.jpg",


    // Personal Letter Content
    letterText: `Dear Yogitha,

I know I could've simply wished you Happy Birthaaday...

But you're worth making something a little different for.

Thank you for all the random conversations, stupid jokes, annoying moments and memories.

You might be 5'0", but somehow your personality takes up an entire room. 😂

I hope this year gives you everything you're wishing for.

Stay beautiful.
Stay chaotic.
Stay you.

Happy Birthday, Yogitha Sri. ❤️`
};

// State Variables
let currentScene = 1;
let clickCount = 0;
let audioPlaying = false;

// DOM Elements
const audio = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

// Initialize Setup
document.addEventListener("DOMContentLoaded", () => {
    // Inject Image Sources
    document.getElementById("portrait-photo").src = CONFIG.photo1;
    document.getElementById("taj-photo").src = CONFIG.photo2;

    initParticles();
    setupEventListeners();
});

// Scene Router Function
function goToScene(sceneNumber) {
    const current = document.querySelector(`.scene.active`);
    const next = document.getElementById(`scene-${sceneNumber}`);

    if (current) {
        current.classList.remove("active");
    }

    setTimeout(() => {
        next.classList.add("active");
        currentScene = sceneNumber;
        triggerSceneAnimations(sceneNumber);
    }, 400);
}

// GSAP Scene Specific Animation Routines
// GSAP Scene Specific Animation Routines
function triggerSceneAnimations(scene) {
    if (scene === 2) {
        // Airplane Scene Timeline — Crash/Pop occurs dead-center on screen
        const tl = gsap.timeline();
        tl.fromTo("#airplane",
            { x: "-20vw", y: "20vh", scale: 1 },
            { x: "0vw", y: "0vh", scale: 0.5, duration: 2.5, ease: "power1.inOut" }
        )
            .to("#airplane", {
                x: "0vw", y: "0vh", scale: 0.1, duration: 0.3,
                onComplete: () => {
                    const impact = document.getElementById("crash-impact");
                    // Center the POP impact dead-center on screen
                    impact.style.position = "fixed";
                    impact.style.left = "50%";
                    impact.style.top = "50%";
                    impact.style.transform = "translate(-50%, -50%)";

                    gsap.to(impact, { opacity: 1, scale: 1.4, duration: 0.2 });
                    gsap.to("body", { x: 10, y: -10, duration: 0.05, repeat: 5, yoyo: true });
                }
            })
            .to("#app", { opacity: 0, duration: 0.2, delay: 0.6 })
            .to("#app", { opacity: 1, duration: 0.2, onComplete: () => goToScene(3) });
    }

    if (scene === 3) {
        // Name Reveal Sequence — "HAPPY BIRTHDAY" displays first at top
        const tl = gsap.timeline();
        tl.fromTo(".happy-bday-text", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 })
            .fromTo(".part-1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "+=0.2")
            .fromTo(".part-2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
            .fromTo(".light-sweep", { left: "-100%" }, { left: "200%", duration: 1.5, ease: "power2.inOut" }, "-=0.2");

        setTimeout(() => goToScene(4), 5000);
    }

    if (scene === 4) {
        gsap.fromTo("#taj-photo", { scale: 1.3, filter: "blur(10px)" }, { scale: 1, filter: "blur(0px)", duration: 2 });
        setTimeout(() => goToScene(5), 4500);
    }

    if (scene === 5) {
        // Exec Stats Animations
        const fills = document.querySelectorAll(".progress-bar .fill");
        fills.forEach(f => f.style.width = "100%");

        // Animate Beauty Counter
        let counterObj = { val: 0 };
        gsap.to(counterObj, {
            val: 9999,
            duration: 2,
            onUpdate: () => {
                document.getElementById("beauty-counter").innerText = Math.floor(counterObj.val);
            },
            onComplete: () => {
                document.getElementById("beauty-counter").innerText = "∞";
                document.getElementById("system-warning").classList.remove("hidden");
                setTimeout(() => goToScene(6), 3500);
            }
        });
    }

    if (scene === 6) {
        // Height Expansion Pack Failure Timeline
        setTimeout(() => {
            document.getElementById("roast-progress").style.width = "40%";
            setTimeout(() => {
                document.getElementById("error-404").classList.remove("hidden");
                document.getElementById("roast-next-btn").classList.remove("hidden");
            }, 2000);
        }, 500);
    }
}

// DOM Event Handling Setup
function setupEventListeners() {
    // Audio Controls
    musicBtn.addEventListener("click", toggleAudio);

    // Scene 1 Enter Button
    document.getElementById("enter-btn").addEventListener("click", () => {
        if (!audioPlaying) toggleAudio();
        goToScene(2);
    });

    // Scene 6 Roast Next
    document.getElementById("roast-next-btn").addEventListener("click", () => goToScene(7));

    // Scene 7 Memory Next
    document.getElementById("memory-next-btn").addEventListener("click", () => goToScene(9));

    // Scene 9 Letter Open
    document.getElementById("open-letter-btn").addEventListener("click", () => {
        document.getElementById("envelope").classList.add("hidden");
        const modal = document.getElementById("letter-modal");
        modal.classList.remove("hidden");

        // Typewriter / Inject Text
        document.getElementById("letter-text-target").innerText = CONFIG.letterText;
        document.getElementById("close-letter-btn").classList.remove("hidden");
    });

    // Scene 9 Letter Close
    document.getElementById("close-letter-btn").addEventListener("click", () => goToScene(10));

    // Scene 10 Gift Reveal
    document.getElementById("open-gift-btn").addEventListener("click", triggerFinalSurprise);
    document.getElementById("gift-trigger").addEventListener("click", triggerFinalSurprise);

    // Easter Egg Click Counter
    document.getElementById("easter-egg-name").addEventListener("click", () => {
        clickCount++;
        if (clickCount === 5) {
            document.getElementById("easter-egg-modal").classList.remove("hidden");
            gsap.fromTo("#easter-egg-modal", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
        }
    });

    // Tilt Card Parallax Effect for Mouse Moving
    document.addEventListener("mousemove", (e) => {
        const cards = document.querySelectorAll(".tilt-card");
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 15;

        cards.forEach(card => {
            card.style.transform = `rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
        });
    });
}

function triggerFinalSurprise() {
    document.getElementById("surprise-pre").classList.add("hidden");
    document.getElementById("surprise-main").classList.remove("hidden");

    // Launch Confetti Explosion
    if (typeof confetti === "function") {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
        });
    }
}

function toggleAudio() {
    if (audioPlaying) {
        audio.pause();
        musicBtn.innerHTML = '<span class="audio-icon">null</span>';
        musicBtn.querySelector('.audio-icon').innerText = '🔇';
        audioPlaying = false;
    } else {
        audio.play().then(() => {
            musicBtn.querySelector('.audio-icon').innerText = '🔊';
            audioPlaying = true;
        }).catch(() => {
            console.log("Audio play blocked by browser policy");
        });
    }
}

// Particle Canvas Background Engine
function initParticles() {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        speedY: -Math.random() * 0.3 - 0.1
    }));

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();

            p.y += p.speedY;
            if (p.y < 0) {
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
}
