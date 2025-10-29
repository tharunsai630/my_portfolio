// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message, ' + name + '! I will get back to you soon.');
    contactForm.reset();
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item, .contact-form').forEach(el => {
    observer.observe(el);
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'var(--shadow)';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

/* Particle canvas code removed */

/* Scroll reveal, header effects and simple hero parallax */
(function () {
    // Intersection Observer to reveal elements with .fade-in
    const revealElements = Array.from(document.querySelectorAll('.fade-in'));
    if (revealElements.length) {
        const obsOptions = {
            root: null,
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.06
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target); // reveal once; remove to save work
                }
            });
        }, obsOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    // Header background toggle on scroll for a nicer transition
    const header = document.querySelector('header');
    const headerToggle = () => {
        if (!header) return;
        if (window.scrollY > 12) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    headerToggle();
    window.addEventListener('scroll', throttle(headerToggle, 120), { passive: true });

    // Simple parallax for hero image (subtle)
    const heroImg = document.querySelector('.hero-image');
    if (heroImg) {
        const onParallax = () => {
            const rect = heroImg.getBoundingClientRect();
            const windowH = window.innerHeight;
            // how far the element is from the center of viewport (normalized -1..1)
            const centerOffset = (rect.top + rect.height / 2 - windowH / 2) / (windowH / 2);
            const maxTranslate = 18; // px
            const translateY = Math.max(-maxTranslate, Math.min(maxTranslate, -centerOffset * maxTranslate));
            heroImg.style.transform = `translateY(${translateY}px)`;
        };
        onParallax();
        window.addEventListener('scroll', throttle(onParallax, 18), { passive: true });
        window.addEventListener('resize', throttle(onParallax, 120));
    }

    // Lightweight throttle helper
    function throttle(fn, wait) {
        let last = 0, t;
        return function (...args) {
            const now = Date.now();
            const remaining = wait - (now - last);
            if (remaining <= 0) {
                clearTimeout(t);
                last = now;
                fn.apply(this, args);
            } else {
                clearTimeout(t);
                t = setTimeout(() => {
                    last = Date.now();
                    fn.apply(this, args);
                }, remaining);
            }
        };
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close mobile menu when a nav link is clicked (so anchors work)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // Optimize gradient animation performance
    const gradient = document.querySelector('.animated-gradient');
    if (gradient) {
        gradient.style.willChange = 'background-position';
    }
});