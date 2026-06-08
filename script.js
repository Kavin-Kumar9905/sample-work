document.addEventListener('DOMContentLoaded', () => {

    // 1. CAMERA APERTURE OVERLAY DISMISSAL SEQUENCER
    const shutterOverlay = document.getElementById('shutterOverlay');
    setTimeout(() => {
        shutterOverlay.classList.add('app-loaded');
        document.body.classList.add('app-ready');
    }, 800);


    // 2. SCROLL PROGRESS INDICATOR CONTROLLER
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }
    });


    // 3. CUSTOM LERP CURSOR SYSTEM WITH HOVER EXPANSION
    const cursor = document.getElementById('customCursor');
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const lerpFactor = 0.1;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function renderCursorLoop() {
        currentX += (targetX - currentX) * lerpFactor;
        currentY += (targetY - currentY) * lerpFactor;
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(renderCursorLoop);
    }
    requestAnimationFrame(renderCursorLoop);

    const interactiveTargets = document.querySelectorAll('a, .gallery-card, .service-card');
    interactiveTargets.forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('cursor-expand'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('cursor-expand'));
    });


    // 4. MAGNETIC BUTTON EMULATION INTERACTION
    const magneticButtons = document.querySelectorAll('.magnetic-target');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const bound = btn.getBoundingClientRect();
            const x = e.clientX - bound.left - (bound.width / 2);
            const y = e.clientY - bound.top - (bound.height / 2);
            btn.style.transform = `translate3d(${x / 3}px, ${y / 3}px, 0)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0px, 0px, 0px)';
        });
    });


    // 5. REALTIME CAMERA LENS PARALLAX SCROLL EFFECT
    const parallaxWraps = document.querySelectorAll('.parallax-wrap');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxWraps.forEach(wrap => {
            const img = wrap.querySelector('.parallax-img');
            const wrapTop = wrap.offsetTop;
            const wrapHeight = wrap.offsetHeight;
            const viewHeight = window.innerHeight;
            
            if ((scrolled + viewHeight > wrapTop) && (scrolled < wrapTop + wrapHeight)) {
                const delta = (scrolled + (viewHeight / 2) - (wrapTop + (wrapHeight / 2)));
                const speed = 0.08; 
                img.style.transform = `translate3d(0, ${delta * speed}px, 0) scale(1.05)`;
            }
        });
    });


    // 6. GLOBAL INTERSECTION OBSERVER SYSTEM
    const revealOptions = { root: null, threshold: 0.15 };
    const globalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal-container')) {
                    const children = entry.target.querySelectorAll('.reveal-left, .reveal-right');
                    children.forEach(child => child.classList.add('is-revealed'));
                } else {
                    entry.target.classList.add('is-revealed');
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-item, .reveal-container');
    elementsToReveal.forEach(el => globalObserver.observe(el));


    // 7. STAGGERED GALLERY GRID OBSERVER
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.05 });

    if (galleryGrid) {
        galleryObserver.observe(galleryGrid);
    }
});