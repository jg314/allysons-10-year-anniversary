// Confetti configuration
const confettiDefaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#cd4632', '#f39c12', '#2c3e50', '#FFE66D', '#FF6B6B', '#4ECDC4']
};

// Trigger standard confetti
function triggerConfetti() {
    confetti({
        ...confettiDefaults,
        particleCount: 100,
        origin: { y: 0.6 }
    });
}

// Create big confetti celebration
function createBigConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    let skew = 1;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return;
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Confetti from left
        confetti({
            ...confettiDefaults,
            particleCount: particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        
        // Confetti from right
        confetti({
            ...confettiDefaults,
            particleCount: particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });

        requestAnimationFrame(frame);
    }());
}

// Trigger confetti on page load after a delay
window.addEventListener('load', () => {
    setTimeout(() => {
        confetti({
            ...confettiDefaults,
            particleCount: 150,
            spread: 180,
            origin: { y: 0.3 }
        });
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply observer to timeline items and message cards
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.timeline-item, .message-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Random confetti on timeline year click
document.querySelectorAll('.timeline-year').forEach(year => {
    year.style.cursor = 'pointer';
    year.addEventListener('click', function() {
        const rect = this.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
            ...confettiDefaults,
            particleCount: 50,
            origin: { x, y }
        });
    });
});

// Image loading animation
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    }
});

// Add hover effect to message cards
document.querySelectorAll('.message-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const rect = this.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
            particleCount: 10,
            spread: 60,
            origin: { x, y },
            colors: ['#cd4632', '#f39c12'],
            ticks: 30,
            gravity: 0.3,
            scalar: 0.5
        });
    });
});