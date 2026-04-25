document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile Sheet Drawer Toggle
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const sheetOverlay = document.getElementById('sheet-overlay');
    const sheetContent = document.getElementById('sheet-content');
    const sheetLinks = sheetContent ? sheetContent.querySelectorAll('a') : [];
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileToggleBtn.classList.add('open');
            sheetOverlay.classList.add('active');
            sheetContent.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileToggleBtn.classList.remove('open');
            sheetOverlay.classList.remove('active');
            sheetContent.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', toggleMenu);
    if (sheetOverlay) sheetOverlay.addEventListener('click', toggleMenu);

    sheetLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =====================================================================
    // 3D Container Scroll Animation (Vanilla JS — replicates Framer Motion)
    // =====================================================================
    const scrollCard = document.getElementById('historyScrollCard');
    const scrollWrapper = document.getElementById('historyScrollWrapper');

    function clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    function lerp(start, end, t) {
        return start + (end - start) * t;
    }

    function updateCardTransform() {
        if (!scrollCard || !scrollWrapper) return;

        const rect = scrollWrapper.getBoundingClientRect();
        const windowH = window.innerHeight;
        const isMobile = window.innerWidth <= 768;

        // progress 0 → card entering, 1 → card has scrolled past center
        const progress = clamp(1 - rect.bottom / (windowH + rect.height), 0, 1);
        const t = clamp(progress * 2, 0, 1);

        const maxRotate = isMobile ? 10 : 18;
        const minScale  = isMobile ? 0.90 : 0.88;

        const rotateX = lerp(maxRotate, 0, t);
        const scale   = lerp(minScale, 1, t);

        scrollCard.style.transform = `rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    }

    window.addEventListener('scroll', updateCardTransform, { passive: true });
    window.addEventListener('resize', updateCardTransform, { passive: true });
    updateCardTransform();

    // =====================================================================
    // Carousel Logic — arrows, dots, auto-play, touch swipe
    // =====================================================================
    const carouselTrack = document.getElementById('scrollCarouselTrack');
    const carouselDots  = document.querySelectorAll('.carousel-dot');
    const prevBtn       = document.getElementById('carouselPrev');
    const nextBtn       = document.getElementById('carouselNext');
    const totalSlides   = 4;
    let currentSlide    = 0;
    let autoPlayTimer;

    function goToSlide(index) {
        currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${currentSlide * 25}%)`;
        }
        carouselDots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => goToSlide(currentSlide + 1), 4200);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });

    carouselDots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index, 10));
            resetAutoPlay();
        });
    });

    // Touch swipe
    let touchStartX = 0;
    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        carouselTrack.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
                resetAutoPlay();
            }
        });
    }

    resetAutoPlay(); // Start auto-play

    // =====================================================================
    // Intersection Observer — Fade-in on scroll
    // =====================================================================
    const fadeElements = document.querySelectorAll('.fade-in');
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => appearOnScroll.observe(el));

    // =====================================================================
    // Smooth Scrolling for anchor links
    // =====================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
});
