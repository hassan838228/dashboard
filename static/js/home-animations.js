// Home Page Animations and Statistics
document.addEventListener('DOMContentLoaded', function() {
    // Odometer Configuration
    window.odometerOptions = {
        auto: false,
        selector: '.odometer',
        format: '(,ddd)',
        theme: 'default',
        duration: 2000,
        animation: 'count'
    };

    // Load Odometer library
    if (!window.Odometer) {
        const script = document.createElement('script');
        script.src = 'https://github.hubspot.com/odometer/odometer.js';
        script.onload = initializeCounters;
        document.head.appendChild(script);
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://github.hubspot.com/odometer/themes/odometer-theme-default.css';
        document.head.appendChild(link);
    } else {
        initializeCounters();
    }

    function initializeCounters() {
        // Random number generators for live stats
        function randomNum2(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Get initial values
        const membersElement = document.getElementById("odometer");
        const serversElement = document.getElementById("odometer2");
        const sizeInput = document.getElementById("size");
        const size2Input = document.getElementById("size2");

        if (membersElement && serversElement && sizeInput && size2Input) {
            // Members counter animation
            setInterval(function () {
                const size = parseInt(sizeInput.value) || 180000;
                const max2 = size + 2000;
                const random2 = randomNum2(size, max2);
                
                if (window.Odometer) {
                    membersElement.innerHTML = random2;
                }
            }, 3000);

            // Servers counter animation  
            setInterval(function () {
                const size2 = parseInt(size2Input.value) || 1000;
                const max = size2 + 10;
                const random = randomNum(size2, max);
                
                if (window.Odometer) {
                    serversElement.innerHTML = random;
                }
            }, 4000);
        }
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .nav-btn');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section::before');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add dynamic loading effect to buttons
    const buttons = document.querySelectorAll('.main-btn, .nav-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add loading states for external links
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="/invite"], a[href^="/login"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Add floating animation to logo
    const logo = document.querySelector('.hero-logo');
    if (logo) {
        setInterval(() => {
            logo.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                logo.style.transform = 'translateY(0px)';
            }, 1000);
        }, 3000);
    }

    // Add typewriter effect to hero title (optional)
    function typeWriterEffect(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        typeWriter();
    }

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // Add scroll-based animations here
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Update scroll indicator opacity
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const opacity = Math.max(0, 1 - scrollTop / windowHeight);
            scrollIndicator.style.opacity = opacity;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
});

// Utility function for number formatting
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Error handling for failed animations
window.addEventListener('error', (e) => {
    console.warn('Animation error:', e.error);
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.8s ease;
    }
`;
document.head.appendChild(rippleStyle);