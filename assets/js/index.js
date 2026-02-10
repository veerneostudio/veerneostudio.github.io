// VeerNeo — Refined Intelligence
document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Reveal animations
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Apply reveal to sections and items
    document.querySelectorAll('.reveal, .bento-item, .feature-item, .team-member').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
        revealObserver.observe(el);
    });

    // Dynamic style addition for active state
    const style = document.createElement('style');
    style.textContent = `
        .active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 48;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Product Visual Parallax effect
    window.addEventListener('scroll', () => {
        const visual = document.querySelector('.product-visual');
        if (visual) {
            const speed = 0.05;
            const rect = visual.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(rect.top * speed);
                visual.style.transform = `translateY(${yPos}px)`;
            }
        }
    });

    console.log('%c VeerNeo ', 'background: #0066cc; color: #fff; font-size: 20px; font-weight: bold; border-radius: 4px; padding: 4px 8px;');
    console.log('Generative AI for 3D Modeling');
    console.log('Founded at DSU Bangalore by Garima & Nilesh');
});
