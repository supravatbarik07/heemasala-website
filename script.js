/* Bheemasala Website Interactions */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(255, 247, 240, 0.98)';
            navLinks.style.padding = '1rem';
            
            // Adjust styles for links in mobile view
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = 'var(--color-primary)';
                link.style.padding = '0.5rem 0';
            });
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if(target) {
                // Close mobile menu if open
                if(window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll reveal (Intersection Observer)
    const reveals = document.querySelectorAll('.fade-up, .reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                // Force triggering reflow to restart animation if needed, or just keep class
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        // initially set opacity to 0
        reveal.style.opacity = '0';
        revealObserver.observe(reveal);
    });

    // Gallery Slider Functionality
    const slider = document.getElementById('gallerySlider');
    const sliderWrapper = document.querySelector('.gallery-slider-wrapper');
    
    if (slider && sliderWrapper) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoPlayInterval;

        const startAutoPlay = () => {
            stopAutoPlay(); // clear any existing interval
            autoPlayInterval = setInterval(() => {
                // If reached the end, scroll back to start, otherwise keep scrolling right
                if (sliderWrapper.scrollLeft >= (slider.scrollWidth - sliderWrapper.clientWidth - 10)) {
                    sliderWrapper.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    sliderWrapper.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }, 3000); // Change slide every 3 seconds
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        // Mouse Events
        sliderWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            sliderWrapper.classList.add('active');
            startX = e.pageX - sliderWrapper.offsetLeft;
            scrollLeft = sliderWrapper.scrollLeft;
            stopAutoPlay(); // Pause autoplay when user interacts
        });

        sliderWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            sliderWrapper.classList.remove('active');
            startAutoPlay(); // Resume autoplay when mouse leaves
        });

        sliderWrapper.addEventListener('mouseup', () => {
            isDown = false;
            sliderWrapper.classList.remove('active');
            startAutoPlay(); // Resume autoplay after drag
        });

        sliderWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - sliderWrapper.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            sliderWrapper.scrollLeft = scrollLeft - walk;
        });

        // Touch Events for Mobile
        sliderWrapper.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - sliderWrapper.offsetLeft;
            scrollLeft = sliderWrapper.scrollLeft;
            stopAutoPlay();
        }, { passive: true });

        sliderWrapper.addEventListener('touchend', () => {
            isDown = false;
            startAutoPlay();
        });

        sliderWrapper.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - sliderWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            sliderWrapper.scrollLeft = scrollLeft - walk;
        }, { passive: true });

        // Add hover effects for individual slides
        const slides = document.querySelectorAll('.gallery-slide');
        slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => {
                slide.classList.add('scale-up');
            });
            slide.addEventListener('mouseleave', () => {
                slide.classList.remove('scale-up');
            });
        });

        // Start autoplay initially
        startAutoPlay();
    }
});
