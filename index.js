// Enhanced JavaScript for modern 2026 bio page
class BioPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupDynamicYear();
        this.setupEnhancedInteractions();
        this.setupSmoothScrolling();
        this.setupLoadingAnimation();
        this.setupKeyboardNavigation();
        this.setupAnalytics();
        this.setupThemeToggle();
        this.setupCopyToClipboard();
        this.setupTooltips();
        this.setupProgressIndicator();
        this.setupMicroInteractions();
        this.setupPerformanceOptimizations();
    }

    // Enhanced dynamic year display with smooth transitions
    setupDynamicYear() {
        const yearElement = document.getElementById('year');
        if (!yearElement) return;

        const updateYearDisplay = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            
            let displayYear;
            if (month >= 10) { // November onwards
                displayYear = `${year}-${year + 1}`;
            } else {
                displayYear = year.toString();
            }

            // Smooth transition for year change
            if (yearElement.textContent !== displayYear) {
                yearElement.style.opacity = '0';
                yearElement.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    yearElement.textContent = displayYear;
                    yearElement.style.opacity = '1';
                    yearElement.style.transform = 'translateY(0)';
                }, 300);
            }
        };

        updateYearDisplay();
        
        // Check every hour for year changes (optimised from every minute)
        setInterval(updateYearDisplay, 3600000);
    }

    // Enhanced interactions with modern UX patterns
    setupEnhancedInteractions() {
        const links = document.querySelectorAll('.link-btn');
        
        links.forEach((link, index) => {
            // Staggered animation on load
            link.style.animationDelay = `${index * 0.1}s`;
            
            // Enhanced hover effects with better performance
            link.addEventListener('mouseenter', this.handleLinkHover.bind(this));
            link.addEventListener('mouseleave', this.handleLinkLeave.bind(this));
            
            // Touch-optimized interactions for mobile
            link.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            link.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
            
            // Enhanced ripple effect
            link.addEventListener('click', this.createRippleEffect.bind(this));
            
            // Analytics tracking
            link.addEventListener('click', this.trackLinkClick.bind(this));
        });
    }

    handleLinkHover(e) {
        const link = e.currentTarget;
        link.style.transform = 'translateY(-6px) scale(1.02)';
        link.style.boxShadow = 'var(--shadow-2xl)';
        
        // Add subtle glow effect
        link.style.boxShadow += ', 0 0 20px rgba(99, 102, 241, 0.3)';
    }

    handleLinkLeave(e) {
        const link = e.currentTarget;
        link.style.transform = 'translateY(0) scale(1)';
        link.style.boxShadow = 'var(--shadow-md)';
    }

    handleTouchStart(e) {
        const link = e.currentTarget;
        link.style.transform = 'scale(0.98)';
    }

    handleTouchEnd(e) {
        const link = e.currentTarget;
        link.style.transform = 'scale(1)';
    }

    createRippleEffect(e) {
        const link = e.currentTarget;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = link.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        link.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    // Enhanced smooth scrolling with intersection observer
    setupSmoothScrolling() {
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Optimized intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.category').forEach(category => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(20px)';
            category.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(category);
        });
    }

    // Enhanced loading animation with performance optimization
    setupLoadingAnimation() {
        // Add loading state class
        document.body.classList.add('loading');
        
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Staggered animation for categories with performance optimization
            requestAnimationFrame(() => {
                document.querySelectorAll('.category').forEach((category, index) => {
                    setTimeout(() => {
                        category.style.animationDelay = `${index * 0.1}s`;
                    }, 50);
                });
            });
        });
    }

    // Enhanced keyboard navigation with better accessibility
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        // Enhanced focus trap for better navigation
        const focusableElements = document.querySelectorAll('.link-btn, [tabindex="0"]');
        focusableElements.forEach((element, index) => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextElement = focusableElements[index + 1] || focusableElements[0];
                    nextElement.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevElement = focusableElements[index - 1] || focusableElements[focusableElements.length - 1];
                    prevElement.focus();
                }
            });
        });
    }

    // Enhanced analytics with privacy-focused tracking
    setupAnalytics() {
        const trackLinkClick = (e) => {
            const link = e.currentTarget;
            const linkName = link.querySelector('h3').textContent;
            const linkUrl = link.href;
            
            // Privacy-focused analytics (only store locally)
            const clicks = JSON.parse(localStorage.getItem('linkClicks') || '{}');
            clicks[linkName] = (clicks[linkName] || 0) + 1;
            localStorage.setItem('linkClicks', JSON.stringify(clicks));
            
            // Console logging for development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log(`Link clicked: ${linkName} - ${linkUrl}`);
            }
        };

        document.querySelectorAll('.link-btn').forEach(link => {
            link.addEventListener('click', trackLinkClick);
        });
    }

    // Enhanced theme toggle with system preference detection
    setupThemeToggle() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        } else if (prefersDark) {
            document.body.setAttribute('data-theme', 'dark');
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }

    // Enhanced copy to clipboard with better fallbacks
    setupCopyToClipboard() {
        const emailLink = document.querySelector('a[href^="mailto:"]');
        if (emailLink) {
            emailLink.addEventListener('click', async (e) => {
                e.preventDefault();
                const email = emailLink.href.replace('mailto:', '');
                
                try {
                    await navigator.clipboard.writeText(email);
                    this.showNotification('Email copied to clipboard!');
                    // Open email client after a short delay
                    setTimeout(() => {
                        window.location.href = emailLink.href;
                    }, 500);
                } catch (err) {
                    // Fallback for older browsers
                    this.fallbackCopyToClipboard(email);
                    window.location.href = emailLink.href;
                }
            });
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('Email copied to clipboard!');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }

    // Enhanced tooltips with better UX
    setupTooltips() {
        document.querySelectorAll('.link-btn').forEach(link => {
            const title = link.querySelector('h3').textContent;
            const description = link.querySelector('p').textContent;
            
            // Set native tooltip for accessibility
            link.setAttribute('title', `${title}: ${description}`);
            
            // Add data attributes for custom tooltips
            link.setAttribute('data-tooltip', description);
        });
    }

    // Enhanced progress indicator with smooth animations
    setupProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--accent-color), var(--primary-gradient-end));
            z-index: 9999;
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 0 3px 3px 0;
        `;
        document.body.appendChild(progressBar);

        // Simulate loading progress with better performance
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    progressBar.style.opacity = '0';
                    progressBar.style.transform = 'translateX(-100%)';
                    setTimeout(() => progressBar.remove(), 300);
                }, 500);
            }
            progressBar.style.width = progress + '%';
        }, 100);
    }

    // Enhanced micro-interactions for better UX
    setupMicroInteractions() {
        // Add hover sound effect simulation (visual feedback)
        document.querySelectorAll('.link-btn').forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Subtle visual feedback instead of sound
                link.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });

        // Add scroll-based parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('body::before');
            if (parallax) {
                const speed = 0.5;
                parallax.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });

        // Add magnetic effect to profile image
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.addEventListener('mousemove', (e) => {
                const rect = profileImg.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = rect.width / 2;
                
                if (distance < maxDistance) {
                    const angle = Math.atan2(y, x);
                    const force = (maxDistance - distance) / maxDistance;
                    const moveX = Math.cos(angle) * force * 10;
                    const moveY = Math.sin(angle) * force * 10;
                    
                    profileImg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
                }
            });
            
            profileImg.addEventListener('mouseleave', () => {
                profileImg.style.transform = 'translate(0, 0) scale(1)';
            });
        }
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Debounce scroll events for better performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                // Scroll-based animations here
            });
        });

        // Preload critical resources
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        // Preload important images
        const importantImages = document.querySelectorAll('.icon');
        importantImages.forEach(img => {
            if (img.src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.src;
                document.head.appendChild(link);
            }
        });
    }

    // Enhanced notification system
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--bg-glass);
            backdrop-filter: blur(10px);
            padding: 12px 24px;
            border-radius: 12px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: var(--font-size-sm);
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Track link clicks for analytics
    trackLinkClick(e) {
        const link = e.currentTarget;
        const linkName = link.querySelector('h3').textContent;
        const linkUrl = link.href;
        
        // Store click data locally
        const clicks = JSON.parse(localStorage.getItem('linkClicks') || '{}');
        clicks[linkName] = (clicks[linkName] || 0) + 1;
        localStorage.setItem('linkClicks', JSON.stringify(clicks));
        
        // Development logging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`Link clicked: ${linkName} - ${linkUrl}`);
        }
    }
}

// Additional CSS animations and enhancements
const additionalStyles = `
    @keyframes slideUp {
        from { transform: translate(-50%, 100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes slideDown {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, 100%); opacity: 0; }
    }
    
    .keyboard-nav *:focus {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
    }
    
    body.loaded .category {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    .notification {
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    body.loading {
        overflow: hidden;
    }
    
    body.loading .category {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .progress-bar {
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }
    
    .ripple {
        pointer-events: none;
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Enhanced hover states */
    .link-btn {
        will-change: transform, box-shadow;
    }
    
    .profile-img {
        will-change: transform;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        -webkit-tap-highlight-color: transparent;
    }
    
    /* Better focus styles for accessibility */
    .link-btn:focus-visible {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
    }
    
    /* Loading skeleton animation */
    @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
    }
    
    .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new BioPage();
});

// Enhanced Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
                
                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60 * 60 * 1000); // Check every hour
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'measure') {
                console.log(`Performance: ${entry.name}: ${entry.duration.toFixed(2)}ms`);
            }
        }
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BioPage;
}

// Global access for debugging
window.BioPage = BioPage;
