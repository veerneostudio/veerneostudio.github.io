// VeerNeo Studio - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('VeerNeo Studio website loaded');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize page
    initializeHeader();
    initializeContent();
});

/**
 * Initialize header functionality
 */
function initializeHeader() {
    const header = document.querySelector('header');
    
    // Add active state on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

/**
 * Initialize content interactions
 */
function initializeContent() {
    const containers = document.querySelectorAll('.container');
    
    containers.forEach((container, index) => {
        // Add staggered animation
        container.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effect
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

/**
 * Log page metrics
 */
function logPageMetrics() {
    const metrics = {
        timestamp: new Date().toISOString(),
        pageTitle: document.title,
        userAgent: navigator.userAgent,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`
    };
    
    console.log('Page Metrics:', metrics);
}

// Log metrics when page loads
window.addEventListener('load', logPageMetrics);

/**
 * Utility function to check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Enable view tracking for elements
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.container');
    elements.forEach(el => {
        if (isInViewport(el)) {
            el.classList.add('in-view');
        }
    });
});
