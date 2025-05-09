// Mobile Menu
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Scrolling Header
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Animation
function checkScroll() {
    const elements = document.querySelectorAll('.section-title, .feature-card, .pricing-card, .testimonial-card, .faq-item, .course-card, .about-image, .about-text, .cta-title, .cta-text, .cta-buttons');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.85;

        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll);
window.addEventListener('load', checkScroll);

// FAQ Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Form Submission
const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por registrarte! Te contactaremos pronto.');
        this.reset();
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animated Trading Background
const canvas = document.getElementById('tradingCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Candlestick Animation
const candlesticks = [];
const numCandles = 20;
let candleWidth = canvas.width / numCandles;
const maxHeight = canvas.height * 0.4;

function createCandlestick() {
    const open = Math.random() * maxHeight + canvas.height * 0.3;
    const close = open + (Math.random() * 100 - 50);
    const high = Math.max(open, close) + Math.random() * 50;
    const low = Math.min(open, close) - Math.random() * 50;
    const isBullish = close > open;
    return {
        x: canvas.width,
        open,
        close,
        high,
        low,
        isBullish
    };
}

for (let i = 0; i < numCandles; i++) {
    candlesticks.push(createCandlestick());
    candlesticks[i].x = i * candleWidth;
}

let frameCount = 0;
const speed = 4; // A mayor valor, más lenta la animación

function animateCandlesticks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frameCount++;

    if (frameCount % speed === 0) {
        candlesticks.forEach((candle, index) => {
            candle.x -= 1;

            if (candle.x < -candleWidth) {
                candlesticks[index] = createCandlestick();
                candlesticks[index].x = canvas.width;
            }
        });
    }

    // Redibujar todas las velas en cada fotograma
    candlesticks.forEach((candle) => {
        // Draw shadow (wick)
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.moveTo(candle.x + candleWidth / 2, candle.high);
        ctx.lineTo(candle.x + candleWidth / 2, candle.low);
        ctx.stroke();

        // Draw body
        ctx.fillStyle = candle.isBullish ? '#4CAF50' : '#ff0000';
        const bodyHeight = Math.abs(candle.open - candle.close) || 1; // Evitar altura 0
        ctx.fillRect(
            candle.x,
            Math.min(candle.open, candle.close),
            candleWidth - 2,
            bodyHeight
        );
    });

    requestAnimationFrame(animateCandlesticks);
}

// Actualizar candleWidth al redimensionar
window.addEventListener('resize', () => {
    resizeCanvas();
    candleWidth = canvas.width / numCandles;
    candlesticks.forEach((candle, index) => {
        candle.x = index * candleWidth;
    });
});

animateCandlesticks();