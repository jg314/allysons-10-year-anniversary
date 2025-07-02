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
    const duration = 2 * 1000; // Reduced from 3 to 2 seconds
    const animationEnd = Date.now() + duration;
    let frameCount = 0;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return;
        }

        // Only fire every 3rd frame to reduce load
        frameCount++;
        if (frameCount % 3 !== 0) {
            requestAnimationFrame(frame);
            return;
        }

        const particleCount = Math.max(15, 30 * (timeLeft / duration)); // Reduced particle count
        
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

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('.menu-overlay');

mobileMenuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
    });
});

// Close mobile menu when clicking on overlay
menuOverlay.addEventListener('click', function() {
    navMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
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
});

// Active navigation state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const navObserverOptions = {
    rootMargin: '-20% 0px -70% 0px'
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, navObserverOptions);

sections.forEach(section => {
    navObserver.observe(section);
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

// Apply observer to application content and message cards
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.application-letter, .message-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
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

// Easter Egg
const easterEggTrigger = document.querySelector('.easter-egg-trigger');
const easterEggModal = document.getElementById('easter-egg-modal');
const closeModal = document.querySelector('.close-modal');

easterEggTrigger.addEventListener('click', function() {
    easterEggModal.classList.add('active');
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#cd4632', '#f39c12', '#2c3e50']
    });
});

closeModal.addEventListener('click', function() {
    easterEggModal.classList.remove('active');
});

easterEggModal.addEventListener('click', function(e) {
    if (e.target === easterEggModal) {
        easterEggModal.classList.remove('active');
    }
});

