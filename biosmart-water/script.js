/* ===========================================================
   MENU MOBILE
=========================================================== */
const menuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


/* ===========================================================
   REVEAL ANIMATION
=========================================================== */
const reveals = document.querySelectorAll(".section, .card, .stat-card, .future-card, .ethic-card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

reveals.forEach(r => observer.observe(r));


/* ===========================================================
   3D HOVER EFFECT
=========================================================== */
document.querySelectorAll(".hover-3d").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        card.style.transform = `rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
});


/* ===========================================================
   BOTÕES QUE ABREM SUBÁREAS (ACCORDION PREMIUM)
=========================================================== */
document.querySelectorAll("[data-target]").forEach(btn => {
    btn.addEventListener("click", () => {
        const area = document.getElementById(btn.dataset.target);

        // Se já estiver aberto → fechar
        if (area.classList.contains("open")) {
            area.classList.remove("open");
            area.style.maxHeight = null;
            return;
        }

        // Fechar todas as subáreas
        document.querySelectorAll(".subarea").forEach(a => {
            a.classList.remove("open");
            a.style.maxHeight = null;
        });

        // Abrir subárea
        area.classList.add("open");
        // Add a buffer of 50px to account for padding and potential calculation errors
        area.style.maxHeight = (area.scrollHeight + 50) + "px";
    });
});


/* ===========================================================
   CURSOR DE BOLHAS PROFISSIONAL
=========================================================== */

// Criar o cursor no DOM
const bubbleCursor = document.createElement("div");
bubbleCursor.classList.add("bubble-cursor");
document.body.appendChild(bubbleCursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// Track do mouse
document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Loop suave
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    bubbleCursor.style.left = cursorX + "px";
    bubbleCursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
}
animateCursor();


/* ===========================================================
   BOLHAS QUE SE SOLTAM DO CURSOR
=========================================================== */
function spawnBubble() {
    const b = document.createElement("span");
    b.classList.add("floating-bubble");

    b.style.left = mouseX + "px";
    b.style.top = mouseY + "px";

    document.body.appendChild(b);

    setTimeout(() => b.remove(), 1200);
}

// Criar bolha a cada 150ms
setInterval(spawnBubble, 150);


/* ===========================================================
   WATER PARTICLE BACKGROUND
=========================================================== */
const canvas = document.getElementById("water-bg");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

if (canvas) {
    initParticles();
    animateParticles();
}


/* ===========================================================
   FORM SUBMISSION (SIMULADO)
=========================================================== */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector("button");
        const originalText = btn.innerText;

        btn.innerText = "Enviando...";
        btn.style.opacity = "0.7";

        setTimeout(() => {
            btn.innerText = "Mensagem Enviada!";
            btn.style.background = "rgba(0, 255, 100, 0.2)";
            btn.style.borderColor = "#00ff64";
            contactForm.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.borderColor = "";
                btn.style.opacity = "1";
            }, 3000);
        }, 1500);
    });
}
const stats = document.querySelectorAll(".stat-number");
let started = false; // Function started ? No

function startCount(el) {
    const target = el.innerText;
    const isPercentage = target.includes("%");
    const goal = parseInt(target.replace(/\D/g, ""));

    let count = 0;
    const speed = 2000 / goal; // Adjust speed

    const counter = setInterval(() => {
        count++;
        el.innerText = count + (isPercentage ? "%" : " min");

        if (count == goal) {
            clearInterval(counter);
            el.innerText = target; // Ensure exact final value
        }
    }, 50); // Fixed interval for smoothness, logic can be improved
}

// Trigger when scrolled to
const resultsSection = document.getElementById("resultados");
if (resultsSection) {
    window.addEventListener("scroll", () => {
        if (window.scrollY >= resultsSection.offsetTop - 500 && !started) {
            stats.forEach(stat => startCount(stat));
            started = true;

            // Initialize charts when section is visible
            initCharts();
        }
    });
}


/* ===========================================================
   HOTSPOTS INTERACTION
=========================================================== */
const hotspots = document.querySelectorAll('.hotspot');

hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
        const targetId = hotspot.getAttribute('data-target');
        const targetCard = document.getElementById('card-' + targetId);

        if (targetCard) {
            // Scroll to solution section
            document.getElementById('solucao').scrollIntoView({ behavior: 'smooth' });

            // Highlight card
            setTimeout(() => {
                targetCard.style.transform = "scale(1.05)";
                targetCard.style.borderColor = "#00f2ff";
                targetCard.style.boxShadow = "0 0 30px rgba(0, 242, 255, 0.3)";

                setTimeout(() => {
                    targetCard.style.transform = "";
                    targetCard.style.borderColor = "";
                    targetCard.style.boxShadow = "";
                }, 1500);
            }, 800);
        }
    });
});


/* ===========================================================
   CHARTS (Chart.js)
=========================================================== */
let chartsInitialized = false;

function initCharts() {
    if (chartsInitialized) return;

    if (typeof Chart === 'undefined') {
        console.warn("Chart.js not loaded");
        return;
    }

    // Cost Reduction Chart
    const ctxCost = document.getElementById('costChart');
    if (ctxCost) {
        new Chart(ctxCost, {
            type: 'bar',
            data: {
                labels: ['Antes', 'Depois'],
                datasets: [{
                    label: 'Custo Operacional ($)',
                    data: [100, 70],
                    backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(0, 242, 255, 0.5)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(0, 242, 255, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#fff' } },
                    x: { grid: { display: false }, ticks: { color: '#fff' } }
                }
            }
        });
    }

    // Water Savings Chart
    const ctxWater = document.getElementById('waterChart');
    if (ctxWater) {
        new Chart(ctxWater, {
            type: 'doughnut',
            data: {
                labels: ['Economia', 'Consumo'],
                datasets: [{
                    data: [20, 80],
                    backgroundColor: ['rgba(0, 242, 255, 0.8)', 'rgba(255, 255, 255, 0.1)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#fff' } }
                }
            }
        });
    }

    chartsInitialized = true;
}

// =======================================================
// HERO PARALLAX & BUTTONS
// =======================================================

document.addEventListener('mousemove', (e) => {
    const heroImg = document.querySelector('.hero-illustration');
    if (heroImg) {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;
        heroImg.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

const startBtn = document.querySelector('.hero-buttons .btn-primary');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        // Simulate a "loading" or "starting" effect
        const originalText = startBtn.innerText;
        startBtn.innerText = "Iniciando...";
        startBtn.style.opacity = "0.8";

        setTimeout(() => {
            document.querySelector('#solucao').scrollIntoView({ behavior: 'smooth' });
            startBtn.innerText = originalText;
            startBtn.style.opacity = "1";
        }, 800);
    });
}

const demoBtn = document.querySelector('.hero-buttons .btn-ghost');
if (demoBtn) {
    demoBtn.addEventListener('click', () => {
        openDashboard();
    });
}

// =======================================================
// DASHBOARD LOGIC
// =======================================================

let dashboardIntervals = [];

function openDashboard() {
    const modal = document.getElementById('dashboard-modal');
    if (modal) {
        modal.classList.add('active');
        initDashboardCharts();
        startLiveSimulation();
    }
}

function closeDashboard() {
    const modal = document.getElementById('dashboard-modal');
    if (modal) {
        modal.classList.remove('active');
        stopLiveSimulation();
    }
}

const closeDashboardBtn = document.getElementById('close-dashboard');
if (closeDashboardBtn) {
    closeDashboardBtn.addEventListener('click', closeDashboard);
}

// Close on click outside
const dashboardModal = document.getElementById('dashboard-modal');
if (dashboardModal) {
    dashboardModal.addEventListener('click', (e) => {
        if (e.target.id === 'dashboard-modal') {
            closeDashboard();
        }
    });
}

let qualityChartInstance = null;

function initDashboardCharts() {
    if (qualityChartInstance) return; // Prevent re-init

    const ctx = document.getElementById('qualityChart');
    if (!ctx) return;

    const context = ctx.getContext('2d');

    // Initial Data
    const initialData = Array.from({ length: 20 }, () => 90 + Math.random() * 10);
    const labels = Array.from({ length: 20 }, (_, i) => i);

    qualityChartInstance = new Chart(context, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pureza da Água (%)',
                data: initialData,
                borderColor: '#00f2ff',
                backgroundColor: 'rgba(0, 242, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            interaction: { intersect: false },
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: {
                    min: 80,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#888' }
                }
            }
        }
    });
}

function startLiveSimulation() {
    // Clear existing intervals just in case
    stopLiveSimulation();

    // Simulate Live Data Updates (Chart & Metrics)
    const dataInterval = setInterval(() => {
        if (!qualityChartInstance) return;

        // Update Chart
        const newData = 92 + Math.random() * 7;
        qualityChartInstance.data.datasets[0].data.push(newData);
        qualityChartInstance.data.datasets[0].data.shift();
        qualityChartInstance.update('none');

        // Update Metrics
        const phEl = document.getElementById('ph-value');
        const turbEl = document.getElementById('turbidity-value');
        const savEl = document.getElementById('savings-value');

        if (phEl) phEl.innerText = (7.0 + Math.random() * 0.5).toFixed(1);
        if (turbEl) turbEl.innerText = (0.2 + Math.random() * 0.3).toFixed(1) + ' NTU';

        // Update Savings
        if (savEl) {
            const currentSavings = parseFloat(savEl.innerText.replace('R$ ', '').replace('.', '').replace(',', '.'));
            const newSavings = currentSavings + (Math.random() * 5);
            savEl.innerText = 'R$ ' + newSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

    }, 2000);
    dashboardIntervals.push(dataInterval);

    // Simulate Logs
    const messages = [
        "Ajuste fino de pressão realizado.",
        "Qualidade da água estável.",
        "Otimizando consumo energético...",
        "Backup de dados realizado com sucesso.",
        "Sensor #42 calibrado automaticamente."
    ];

    const logInterval = setInterval(() => {
        const list = document.getElementById('system-logs');
        if (!list) return;

        const li = document.createElement('li');
        const time = new Date().toLocaleTimeString();
        const msg = messages[Math.floor(Math.random() * messages.length)];

        li.innerHTML = `<span class="log-time">${time}</span> <span class="log-msg">${msg}</span>`;
        list.insertBefore(li, list.firstChild);

        if (list.children.length > 5) list.removeChild(list.lastChild);
    }, 4500);
    dashboardIntervals.push(logInterval);
}

function stopLiveSimulation() {
    dashboardIntervals.forEach(interval => clearInterval(interval));
    dashboardIntervals = [];
}
