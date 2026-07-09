// Cinematic Portfolio Logic - All modules integrated
document.addEventListener('DOMContentLoaded', () => {

    const projectData = {
        'project1': {
            title: 'urban aerial cinematic',
            category: 'drone footage',
            desc: 'a fast-paced aerial exploration of city life, capturing the bustling energy of busy intersections and urban landscapes from a unique perspective.',
            heroImg: 'Busy intersection aerial view - Free Stock Video.mp4',
            isVideo: true,
            gallery: [
                'Busy intersection aerial view - Free Stock Video.mp4',
                'Shooting With Drones Videos Videos- Download 7,486+ Free 4K & HD Stock Footage Clips_3.mp4',
                'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800'
            ],
            tools: ['dji mavic 3 cine', 'premiere pro', 'davinci resolve']
        },
        'project2': {
            title: 'night shift cinematic',
            category: 'video editing',
            desc: 'a cinematic document of the dar-mbeya-mbalizi journey, capturing the unique rhythm and atmosphere of long-distance transit through high-energy editing and visual storytelling.',
            heroImg: 'Night_Shift__Dar-Mbeya-Mbalizi_Kila_siku_Saa_8_00_Mchana__God_Bless_Our_Journey🙏.mp4',
            isVideo: true,
            gallery: [
                'Night_Shift__Dar-Mbeya-Mbalizi_Kila_siku_Saa_8_00_Mchana__God_Bless_Our_Journey🙏.mp4',
                'Equipment for video and photography in a close shot - Free Stock Video.mp4',
                'https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&q=80&w=800'
            ],
            tools: ['sony fx3', 'after effects', 'premiere pro']
        },
        'project3': {
            title: 'portrait retouching',
            category: 'photo editing',
            desc: 'advanced retouching and color grading for a beautiful outdoor portrait session. maintained natural skin texture while achieving a cinematic lighting finish.',
            heroImg: 'project3_1.jpg',
            gallery: [
                {
                    before: 'project3_1.jpg',
                    after: 'project3_1.jpg',
                    isComparison: true
                },
                'project3_2.jpg',
                'project3_3.jpg',
                'project3_4.jpg'
            ],
            tools: ['photoshop', 'lightroom']
        },
        'project4': {
            title: 'featured artwork',
            category: 'photo editing',
            desc: 'a creative exploration of color and light in a studio environment. this project showcases advanced compositing techniques and high-end commercial retouching.',
            heroImg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
            gallery: [
                'https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'
            ],
            tools: ['Sony FX3', 'After Effects', 'Premiere Pro']
        }
    };

    // NAVBAR
    const initNavbar = () => {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-menu a');

        const toggleMobileMenu = () => {
            const isOpen = mobileMenu.classList.toggle('open');
            hamburger.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        const closeMobileMenu = () => {
            if (mobileMenu) mobileMenu.classList.remove('open');
            if (hamburger) hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            document.body.style.overflow = '';
        };

        if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

        window.addEventListener('scroll', () => {
            if (navbar) {
                if (window.scrollY > 50) navbar.classList.add('scrolled');
                else navbar.classList.remove('scrolled');
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMobileMenu();
        });
    };

    // ANIMATIONS
    const initAnimations = () => {
        const reveals = document.querySelectorAll('.reveal');
        const scrollReveal = () => {
            const triggerBottom = (window.innerHeight / 5) * 4.2;
            reveals.forEach(reveal => {
                const revealTop = reveal.getBoundingClientRect().top;
                if (revealTop < triggerBottom) reveal.classList.add('active');
            });
        };
        window.addEventListener('scroll', scrollReveal);
        scrollReveal();
    };

    // SLIDER
    const initSliders = () => {
        const containers = document.querySelectorAll('.ba-container');
        containers.forEach(container => {
            const slider = container.querySelector('.ba-slider');
            const beforeWrapper = container.querySelector('.ba-img-before-wrapper');
            const sliderLine = container.querySelector('.ba-slider-line');
            const sliderButton = container.querySelector('.ba-slider-button');
            const moveSlider = (e) => {
                let pos = e.target.value;
                if (beforeWrapper) beforeWrapper.style.width = `${pos}%`;
                if (sliderLine) sliderLine.style.left = `${pos}%`;
                if (sliderButton) sliderButton.style.left = `${pos}%`;
            };
            if (slider) slider.addEventListener('input', moveSlider);
        });
    };

    // UTILS
    const initUtils = () => {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        const contactForm = document.getElementById('contactForm');
        const formResponse = document.getElementById('form-response');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Capture the submitted message before resetting
                const messageInput = contactForm.querySelector('textarea');
                const sentMessageSpan = document.getElementById('sent-message-text');
                if (messageInput && sentMessageSpan) {
                    sentMessageSpan.textContent = messageInput.value;
                }
                
                contactForm.reset();
                
                if (formResponse) {
                    formResponse.style.display = 'block';
                    setTimeout(() => formResponse.style.opacity = '1', 10);
                    
                    // Hide after 5 seconds
                    setTimeout(() => {
                        formResponse.style.opacity = '0';
                        setTimeout(() => formResponse.style.display = 'none', 500);
                    }, 5000);
                }
            });
        }
    };

    // PORTFOLIO
    const initPortfolio = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalClose = document.querySelector('.modal-close');
        const modalContainer = document.querySelector('.modal-container');
        const lightboxOverlay = document.querySelector('.lightbox-overlay');
        const lightboxImg = lightboxOverlay?.querySelector('img');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('active'), 100);
                    } else {
                        item.classList.remove('active');
                        setTimeout(() => item.style.display = 'none', 600);
                    }
                });
            });
        });

        const openProjectModal = (projectId) => {
            const p = projectData[projectId];
            if (!p) return;

            const galleryHTML = p.gallery.map(item => {
                if (typeof item === 'object' && item.isComparison) {
                    return `
                        <div class="modal-ba ba-container">
                            <img src="${item.after}" class="ba-img-after">
                            <div class="ba-img-before-wrapper"><img src="${item.before}" class="ba-img-before" style="filter: grayscale(100%) brightness(0.7) contrast(0.8) blur(1px);"></div>
                            <input type="range" class="ba-slider" min="0" max="100" value="50">
                            <div class="ba-slider-line"><div class="ba-slider-button"><i class="fa-solid fa-arrows-left-right"></i></div></div>
                        </div>
                    `;
                }
                if (typeof item === 'string' && (item.endsWith('.mp4') || item.includes('pexels.com/video') || item.includes('Shift'))) {
                    return `
                        <div class="modal-video-wrapper">
                            <video src="${item}" autoplay muted loop playsinline class="modal-gallery-video"></video>
                        </div>
                    `;
                }
                return `<img src="${item}" alt="Gallery image" class="lightbox-trigger" style="cursor: zoom-in;">`;
            }).join('');

            const heroHTML = p.isVideo || p.heroImg.endsWith('.mp4') || p.heroImg.includes('pexels.com/video') || p.heroImg.includes('Shift')
                ? `<video src="${p.heroImg}" autoplay muted loop playsinline class="modal-img-hero"></video>`
                : `<img src="${p.heroImg}" alt="${p.title}" class="modal-img-hero">`;

            const html = `
                <div class="modal-content-inner">
                    ${heroHTML}
                    <div class="modal-body">
                        <span class="modal-category">${p.category}</span>
                        <h2 class="modal-title">${p.title}</h2>
                        <p class="modal-desc">${p.desc}</p>
                        <div class="modal-tools">
                            <h5 class="section-subtitle">production tools</h5>
                            <div class="skill-tags">${p.tools.map(t => `<span><i class="fa-solid fa-check"></i> ${t}</span>`).join('')}</div>
                        </div>
                        <div class="modal-gallery">${galleryHTML}</div>
                    </div>
                </div>
            `;

            if (modalContainer) modalContainer.innerHTML = html;
            if (modalOverlay) modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            initSliders();
            modalContainer.querySelectorAll('.lightbox-trigger').forEach(img => {
                img.addEventListener('click', () => openLightbox(img.src));
            });
        };

        const openLightbox = (src) => {
            if (lightboxImg && lightboxOverlay) {
                lightboxImg.src = src;
                lightboxOverlay.classList.add('active');
            }
        };

        const closeAll = () => {
            if (modalOverlay) modalOverlay.classList.remove('active');
            if (lightboxOverlay) lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                if (id) openProjectModal(`project${id}`);
            });
        });

        if (modalClose) modalClose.addEventListener('click', closeAll);
        if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeAll();
        });
        if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeAll);
        
        // Expose functions to the global scope for HTML onclick handlers
        window.openLightbox = openLightbox;
        window.openProjectModal = openProjectModal;
        window.closeProjectModal = closeAll;
        window.closeLightbox = closeAll;
    };

    // PAGE TRANSITIONS
    const initPageTransitions = () => {
        // Create the transition overlay dynamically so we don't have to edit all HTML files
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.backgroundColor = '#050a1f'; // Matches var(--bg-dark)
        overlay.style.zIndex = '999999';
        overlay.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        overlay.style.pointerEvents = 'none';
        overlay.style.opacity = '1'; // Start fully opaque
        
        document.body.appendChild(overlay);
        
        // Fade out on page load natively
        requestAnimationFrame(() => {
            setTimeout(() => {
                overlay.style.opacity = '0';
            }, 100); 
        });
        
        // Intercept link clicks to other pages
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetUrl = link.getAttribute('href');
                
                // Only intercept internal page navigation (not pure hashes or external links)
                if (targetUrl && !targetUrl.startsWith('#') && !targetUrl.startsWith('http') && !targetUrl.startsWith('mailto') && !targetUrl.startsWith('tel') && targetUrl !== '#') {
                    // Check if the link opens in a new tab; if so, let it be.
                    if (link.getAttribute('target') === '_blank') return;
                    
                    e.preventDefault();
                    
                    overlay.style.pointerEvents = 'all';
                    overlay.style.opacity = '1';
                    
                    // Navigate after animation
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 550);
                }
            });
        });
        
        // Handle browser back/forward buttons (pageshow event)
        window.addEventListener('pageshow', (e) => {
            if (e.persisted) { // if loaded from back/forward cache
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
            }
        });
    };

    // Run all
    initPageTransitions();
    initUtils();
    initNavbar();
    initAnimations();
    initSliders();
    initPortfolio();

});
