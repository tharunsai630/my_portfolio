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

/* Particles with connecting lines — responsive and performant */

(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let particles = [];
    let width = 0;
    let height = 0;
    let DPR = Math.max(1, window.devicePixelRatio || 1);
    let animationId = null;
    let paused = false;

    function setSize() {
        DPR = Math.max(1, window.devicePixelRatio || 1);
        width = window.innerWidth;
        height = window.innerHeight;
        // Set backing store size for sharpness
        canvas.width = Math.round(width * DPR);
        canvas.height = Math.round(height * DPR);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        // Reset transform then scale
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(DPR, DPR);
        // Regenerate particle count based on area
        initParticles();
    }

    function initParticles() {
        const area = Math.max(1, width * height);
        // density controls how many particles per px^2 (lower => more particles)
        const density = 9000;
        let count = Math.round(area / density);
        // clamp for performance
        count = Math.max(20, Math.min(140, count));
        // If screen is narrow, reduce further
        if (width < 600) count = Math.max(12, Math.round(count * 0.6));
        // If we already have similar count, reuse particles
        if (particles.length > count) {
            particles = particles.slice(0, count);
            return;
        }
        while (particles.length < count) {
            particles.push(createParticle());
        }
    }

    function createParticle() {
        const speedBase = Math.max(0.2, Math.min(width / 1200, 1)); // scale speed with width
        const maxR = 2.2;
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.9 * speedBase,
            vy: (Math.random() - 0.5) * 0.9 * speedBase,
            r: Math.random() * maxR + 0.6,
            hue: 200 + Math.random() * 40 // slightly bluish-white
        };
    }

    function update(dt) {
        for (let p of particles) {
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            // wrap around edges for continuous field
            if (p.x < -10) p.x = width + 10;
            else if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            else if (p.y > height + 10) p.y = -10;
        }
    }

    function draw() {
        // clear canvas
        ctx.clearRect(0, 0, width, height);

        // draw connections
        const connectDist = Math.max(90, Math.min(200, (width + height) / 20)); // adaptive
        for (let i = 0; i < particles.length; i++) {
            const pi = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const pj = particles[j];
                const dx = pi.x - pj.x;
                const dy = pi.y - pj.y;
                const d2 = dx * dx + dy * dy;
                if (d2 <= connectDist * connectDist) {
                    const d = Math.sqrt(d2);
                    const alpha = 0.28 * (1 - d / connectDist);
                    ctx.beginPath();
                    ctx.moveTo(pi.x, pi.y);
                    ctx.lineTo(pj.x, pj.y);
                    ctx.strokeStyle = `rgba(200,220,255,${alpha * 0.9})`;
                    ctx.lineWidth = 1 * (1 - d / (connectDist * 1.2));
                    ctx.stroke();
                }
            }
        }

        // draw particles
        for (let p of particles) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(230,240,255,0.9)`;
            ctx.globalCompositeOperation = 'lighter';
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }
    }

    let last = performance.now();
    function loop(now) {
        if (paused) {
            animationId = requestAnimationFrame(loop);
            last = now;
            return;
        }
        const dt = Math.min(40, now - last) / 16.67; // normalize to ~60fps steps
        last = now;
        update(dt);
        draw();
        animationId = requestAnimationFrame(loop);
    }

    // Resize handling (debounced)
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setSize, 120);
    });

    // Pause animation on hidden tab to save CPU
    document.addEventListener('visibilitychange', () => {
        paused = document.hidden;
    });

    // Start
    setSize();
    last = performance.now();
    animationId = requestAnimationFrame(loop);

    // Expose a small API if needed
    window.__particles = {
        pause: () => (paused = true),
        resume: () => (paused = false),
        add: (n = 1) => { for (let i = 0; i < n; i++) particles.push(createParticle()); },
        clear: () => { particles = []; }
    };
})();

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