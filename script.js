// ============================================
// PORTFOLIO WEBSITE JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initTabs();
    initAboutToggle();
    initPortfolioFilter();
    initContactForm();
    initScrollEffects();
    initPhoneCopy();
    initCurrentYear();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.close-menu-btn');
    const overlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function openMenu() {
        navMenu.classList.add('active');
        overlay.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    menuToggle?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// TABS
// ============================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetId);
            
            // Update button states
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            
            // Update panel states
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.hidden = true;
            });
            targetPanel.classList.add('active');
            targetPanel.hidden = false;
        });
    });
}

// ============================================
// ABOUT TOGGLE
// ============================================
function initAboutToggle() {
    const toggleBtn = document.getElementById('toggle-about');
    const expandedContent = document.getElementById('about-expanded');
    
    if (!toggleBtn || !expandedContent) return;
    
    toggleBtn.addEventListener('click', () => {
        const isExpanded = expandedContent.classList.toggle('expanded');
        toggleBtn.setAttribute('aria-expanded', isExpanded);
        
        const label = toggleBtn.querySelector('.btn-text-label');
        const icon = toggleBtn.querySelector('i');
        
        if (isExpanded) {
            label.textContent = 'Read Less';
            icon.classList.remove('fa-arrow-down');
            icon.classList.add('fa-arrow-up');
        } else {
            label.textContent = 'Read More';
            icon.classList.remove('fa-arrow-up');
            icon.classList.add('fa-arrow-down');
        }
    });
}

// ============================================
// PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = form?.querySelector('button[type="submit"]');
    
    if (!form) return;
    
    // Form validation
    const validators = {
        name: (value) => value.length >= 2 ? '' : 'Name must be at least 2 characters',
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email',
        message: (value) => value.length >= 10 ? '' : 'Message must be at least 10 characters'
    };
    
    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    function validateField(field) {
        const validator = validators[field.name.toLowerCase()];
        const errorSpan = field.parentElement.querySelector('.form-error');
        
        if (!validator) return true;
        
        const error = validator(field.value);
        errorSpan.textContent = error;
        
        if (error) {
            field.classList.add('error');
            field.style.borderColor = '#ff6b6b';
            return false;
        } else {
            field.classList.remove('error');
            field.style.borderColor = '';
            return true;
        }
    }
    
    function validateForm() {
        let isValid = true;
        form.querySelectorAll('input[required], textarea[required]').forEach(field => {
            if (!validateField(field)) isValid = false;
        });
        return isValid;
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        const formData = new FormData(form);
        
        try {
            // Replace with your Google Apps Script URL
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxMk_8v3vo9x1t49Hyxio5h3A0NmpUdpjjgW2OkuVuCERb_Vk3ECT4uRlY7vTqmJ96U/exec';
            
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                showToast('Message sent successfully!');
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            showStatus('Failed to send message. Please try again or email me directly.', 'error');
            console.error('Form error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = `form-status ${type}`;
        statusDiv.style.display = 'block';
        
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }
}

// ============================================
// PHONE COPY
// ============================================
function initPhoneCopy() {
    const copyBtn = document.getElementById('copy-phone');
    const phoneDisplay = document.getElementById('phone-display');
    
    if (!copyBtn || !phoneDisplay) return;
    
    copyBtn.addEventListener('click', async () => {
        const phone = phoneDisplay.textContent.trim();
        
        try {
            await navigator.clipboard.writeText(phone);
            showToast('Phone number copied to clipboard!');
            
            // Visual feedback
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
            copyBtn.style.color = 'var(--accent)';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                copyBtn.style.color = '';
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = phone;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('Phone number copied to clipboard!');
        }
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .timeline-item, .skill-item'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add visible class style
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ============================================
// CURRENT YEAR
// ============================================
function initCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// TYPING EFFECT (Optional - for hero section)
// ============================================
function initTypingEffect() {
    const element = document.querySelector('.typing-effect');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(element);
}

// ============================================
// DARK MODE TOGGLE (Optional)
// ============================================
function initDarkMode() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    });
}

// ============================================
// PRELOADER (Optional)
// ============================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

// ============================================
// PARALLAX EFFECT (Optional)
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const handleScroll = throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 16); // ~60fps
    
    window.addEventListener('scroll', handleScroll);
}

// ============================================
// BACK TO TOP BUTTON (Optional)
// ============================================
function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;
    
    const toggleVisibility = throttle(() => {
        if (window.pageYOffset > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }, 100);
    
    window.addEventListener('scroll', toggleVisibility);
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// FORM AUTO-SAVE (Optional)
// ============================================
function initFormAutoSave() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const formId = 'contact-form-data';
    
    // Load saved data
    const savedData = localStorage.getItem(formId);
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) field.value = data[key];
        });
    }
    
    // Save on input
    const saveData = debounce(() => {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        localStorage.setItem(formId, JSON.stringify(data));
    }, 1000);
    
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', saveData);
    });
    
    // Clear on successful submit
    form.addEventListener('submit', () => {
        localStorage.removeItem(formId);
    });
}

// ============================================
// ANALYTICS (Optional - Privacy Friendly)
// ============================================
function initAnalytics() {
    // Simple page view tracking
    const trackEvent = (eventName, data = {}) => {
        // Replace with your analytics endpoint
        console.log('Analytics:', eventName, data);
    };
    
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const viewedSections = new Set();
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !viewedSections.has(entry.target.id)) {
                viewedSections.add(entry.target.id);
                trackEvent('section_view', { section: entry.target.id });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => sectionObserver.observe(section));
    
    // Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', (e) => {
            trackEvent('outbound_click', {
                url: link.href,
                text: link.textContent.trim()
            });
        });
    });
}

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send to error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ============================================
// SERVICE WORKER REGISTRATION (PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

// ============================================
// EXPORT FOR TESTING (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        showToast
    };
}