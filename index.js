// VeerNeo - AI-Powered 3D Model Generation
// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    console.log('VeerNeo website loaded');
    
    // Initialize all features
    initializeNavigation();
    initializeButtons();
    initializeScrollAnimations();
    logPageMetrics();
});

/**
 * Initialize Navigation
 */
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 217, 255, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Initialize Buttons
 */
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Log button click
            console.log('Button clicked:', this.textContent.trim());
        });
    });
}

/**
 * Initialize Scroll Animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Observe founder cards
    document.querySelectorAll('.founder-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Observe steps
    document.querySelectorAll('.step').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s ease';
        observer.observe(step);
    });
}

/**
 * Log Page Metrics
 */
function logPageMetrics() {
    const metrics = {
        timestamp: new Date().toISOString(),
        pageTitle: document.title,
        userAgent: navigator.userAgent,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        documentHeight: document.documentElement.scrollHeight
    };
    
    console.log('VeerNeo Metrics:', metrics);
    console.log('🤖 VeerNeo AI-Powered 3D Model Generation');
    console.log('Founded by: Garima and Nilesh');
}

/**
 * Utility: Scroll to section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Add ripple animation to style
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Track page visibility
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User left the page');
    } else {
        console.log('User is back on the page');
    }
});

// Track user interactions
let interactions = {
    clicks: 0,
    scrolls: 0,
    mouseMovements: 0
};

document.addEventListener('click', function() {
    interactions.clicks++;
    if (interactions.clicks % 10 === 0) {
        console.log(`User interactions - Clicks: ${interactions.clicks}`);
    }
});

let scrollTimeout;
window.addEventListener('scroll', function() {
    interactions.scrolls++;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        if (interactions.scrolls > 5) {
            console.log(`Page scrolled ${interactions.scrolls} times`);
        }
    }, 1000);
});

// Log performance metrics
window.addEventListener('load', function() {
    setTimeout(function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }, 0);
});
