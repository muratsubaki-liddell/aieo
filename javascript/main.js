// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {

    // === Hamburger Menu ===
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('js-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('is-open');
            nav.classList.toggle('is-open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-open');
                nav.classList.remove('is-open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'メニューを開く');
                document.body.style.overflow = '';
            });
        });
    }

    // Get all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // === Hero Catch Animation ===
    const heroCatch = document.getElementById('js-hero-catch');
    if (heroCatch) {
        const text = heroCatch.textContent;
        heroCatch.textContent = '';

        const words = text.trim().split(' ');
        const spans = words.map((word, i, arr) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.classList.add('hero__char');
            if (word.endsWith('.')) span.classList.add('hero__char--dot');
            heroCatch.appendChild(span);
            if (i < arr.length - 1) heroCatch.appendChild(document.createTextNode(' '));
            return span;
        });

        // Group 1: "New Era of", Group 2: "SEO."
        const group1 = spans.slice(0, -1);
        const group2 = spans.slice(-1);
        const group2Start = 500;
        const animDuration = 900;

        group1.forEach((span, i) => {
            setTimeout(() => span.classList.add('hero__char--revealed'), i * 80);
        });
        group2.forEach(span => {
            setTimeout(() => span.classList.add('hero__char--revealed'), group2Start);
        });

        // Glow flash after all words are visible, then reveal subcopy/description
        const allDoneAt = group2Start + animDuration;
        const glowDuration = 900;
        setTimeout(() => heroCatch.classList.add('hero__main-catch--glowing'), allDoneAt);

        const subcopy     = document.getElementById('js-hero-subcopy');
        const description = document.getElementById('js-hero-description');
        const cta         = document.getElementById('js-hero-cta');
        const platforms   = document.getElementById('js-hero-platforms');

        const descRevealAt = allDoneAt + glowDuration + 500;
        const descDuration = 750;

        if (subcopy)     setTimeout(() => subcopy.classList.add('hero__subcopy--revealed'),         allDoneAt + glowDuration + 100);
        if (description) setTimeout(() => description.classList.add('hero__description--revealed'), descRevealAt);
        if (cta)         setTimeout(() => cta.classList.add('hero__cta--revealed'),                 descRevealAt + descDuration + 200);
        if (platforms)   setTimeout(() => platforms.classList.add('hero__platforms--revealed'),     descRevealAt + descDuration + 200);
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 0) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
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
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add fade-in class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
