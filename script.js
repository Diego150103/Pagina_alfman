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
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileToggleBtn.classList.remove('open');
            sheetOverlay.classList.remove('active');
            sheetContent.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', toggleMenu);
    }
    
    if (sheetOverlay) {
        sheetOverlay.addEventListener('click', toggleMenu); // Click outside to close
    }

    // Close menu when a link is clicked
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



    // Intersection Observer for Scroll Animations (Fade-in)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position considering navbar height
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                if (this.classList.contains('nav-links')) {
                    this.classList.add('active');
                }
            }
        });
    });
});
