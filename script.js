document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle icon between menu and x
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            header.style.padding = '0';
        }
    });

    // 3. Current Year in Footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 4. Form Submission - WhatsApp Integration
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const service = document.getElementById('service').value;
            const serviceName = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
            
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Abriendo WhatsApp...';
            btn.disabled = true;

            const phoneNumber = '573218162875';
            const message = `Hola Yeimi! 👋%0AMe gustaría agendar una cita.%0A%0A*Detalles:*%0A👤 *Nombre:* ${name}%0A📅 *Fecha:* ${date}%0A💅 *Servicio:* ${serviceName}%0A%0A¿Tienes disponibilidad?`;
            
            const url = `https://wa.me/${phoneNumber}?text=${message}`;

            // Simulate a brief delay for UX
            setTimeout(() => {
                window.open(url, '_blank');
                bookingForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 800);
        });
    }

    // 5. WhatsApp Button - Make it interactive
    const whatsappLink = document.querySelector('.floating-whatsapp');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', (e) => {
            e.preventDefault();
            const phoneNumber = '573218162875'; // Replace with actual number
            const message = 'Hola Yeimi, me gustaría agendar una cita.';
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }

    // Also update contact section whatsapp link
    const primaryWhatsappLink = document.querySelector('.primary-contact');
    if(primaryWhatsappLink) {
        primaryWhatsappLink.addEventListener('click', (e) => {
            e.preventDefault();
            const phoneNumber = '573218162875'; // Replace with actual number
            const message = 'Hola Yeimi, me gustaría obtener más información sobre tus servicios.';
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }

    // 6. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox && galleryItems) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.alt;
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // 7. Reveal on Scroll Logic
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once it's revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Reveal when 15% of the element is visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
