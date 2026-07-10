// Navbar scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation with Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Simple mouse movement effect for the background blobs
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, index) => {
        const factor = index === 0 ? 30 : -30;
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});

// Interactive Simulator Logic
const simBrandInput = document.getElementById('sim-brand-input');
const simFontInput = document.getElementById('sim-font-input');
const simIndustryInput = document.getElementById('sim-industry-input');
const simLayoutInput = document.getElementById('sim-layout-input');
const simToneInput = document.getElementById('sim-tone-input');
const simColorBtns = document.querySelectorAll('.color-btn');

const simLogoPreview = document.getElementById('sim-logo-preview');
const simHeroPreview = document.getElementById('sim-hero-preview');
const simIconPreview = document.getElementById('sim-icon-preview');
const simHeroSection = document.querySelector('.sim-hero');
const simPreviewBody = document.getElementById('sim-preview-body');
const simBtnPreview = document.getElementById('sim-btn-preview');

function updateWhatsAppLink() {
    const brand = simBrandInput ? simBrandInput.value.trim() || 'Mi Empresa' : 'Mi Empresa';
    const text = encodeURIComponent(`Hola Seda Studio! Quiero una web para ${brand}. Me gusta el diseño que vi en su página.`);
    if(simBtnPreview) {
        simBtnPreview.href = `https://wa.me/543755706160?text=${text}`;
    }
}

// Update Brand Name
if(simBrandInput) {
    simBrandInput.addEventListener('input', (e) => {
        const value = e.target.value.trim() || 'Mi Empresa';
        simLogoPreview.textContent = value;
        updateWhatsAppLink();
    });
}

// Update Typography
if(simFontInput) {
    simFontInput.addEventListener('change', (e) => {
        const font = e.target.value;
        simHeroPreview.style.fontFamily = font;
        simLogoPreview.style.fontFamily = font;
    });
}

// Update Colors
if(simColorBtns) {
    simColorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            simColorBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            
            const color = e.target.getAttribute('data-color');
            
            // Apply color to CSS variables for the simulator
            simLogoPreview.style.color = color;
            simBtnPreview.style.backgroundColor = color;
            
            // Add a subtle tint to the mock browser background
            let r = 0, g = 0, b = 0;
            if (color.length === 7) {
                r = parseInt(color.slice(1, 3), 16);
                g = parseInt(color.slice(3, 5), 16);
                b = parseInt(color.slice(5, 7), 16);
            }
            simPreviewBody.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.05)`;
        });
    });
}

// Update Industry Icon
if (simIndustryInput) {
    simIndustryInput.addEventListener('change', (e) => {
        const val = e.target.value;
        let html = '';
        if (val === 'tienda') {
            html = '<i class="fa-solid fa-cart-shopping"></i>';
        } else if (val === 'agencia') {
            html = '<i class="fa-solid fa-briefcase"></i>';
        } else if (val === 'restaurante') {
            html = '<i class="fa-solid fa-utensils"></i>';
        }
        if (simIconPreview) {
            simIconPreview.style.opacity = '0';
            simIconPreview.style.transform = 'scale(0.8)';
            setTimeout(() => {
                simIconPreview.innerHTML = html;
                simIconPreview.style.opacity = '0.9';
                simIconPreview.style.transform = 'scale(1)';
            }, 200);
        }
    });
}

// Update Layout
if (simLayoutInput && simHeroSection) {
    simLayoutInput.addEventListener('change', (e) => {
        if (e.target.value === 'dividido') {
            simHeroSection.classList.add('layout-split');
        } else {
            simHeroSection.classList.remove('layout-split');
        }
    });
}

// Update Tone
if (simToneInput && simHeroPreview) {
    simToneInput.addEventListener('change', (e) => {
        const val = e.target.value;
        simHeroPreview.style.opacity = '0';
        simHeroPreview.style.transition = 'opacity 0.2s';
        setTimeout(() => {
            if (val === 'premium') {
                simHeroPreview.textContent = 'Diseño de alto impacto.';
            } else if (val === 'directo') {
                simHeroPreview.textContent = 'Vende más desde hoy.';
            } else if (val === 'creativo') {
                simHeroPreview.textContent = 'Creamos magia digital.';
            }
            simHeroPreview.style.opacity = '1';
        }, 200);
    });
}
