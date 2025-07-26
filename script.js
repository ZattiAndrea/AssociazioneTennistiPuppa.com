// Script JavaScript per Associazione Tennis Tipuppa

// Gestione caricamento pagina
document.addEventListener('DOMContentLoaded', function() {
    // Inizializzazione
    init();
    
    // Gestione navigazione
    setupNavigation();
    
    // Effetti scroll
    setupScrollEffects();
    
    // Animazioni elementi
    setupAnimations();
    
    // Particelle fluttuanti
    createFloatingParticles();
    
    // Interattività cards
    setupCardInteractions();
    
    // Counter animato per statistiche
    setupCounters();
    
    // Tooltip personalizzati
    setupTooltips();
});

// Funzione di inizializzazione
function init() {
    // Mostra loader iniziale
    showLoader();
    
    // Simula caricamento
    setTimeout(() => {
        hideLoader();
        // Anima l'entrata degli elementi
        animatePageEntry();
    }, 1000);
}

// Loader
function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);
    loader.style.display = 'block';
}

function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
        loader.remove();
    }
}

// Navigazione migliorata
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Rimuovi classe active da tutti i link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Effetto ripple sul click
            createRipple(e, this);
        });
    });
}

// Funzione per mostrare sezioni con animazione
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const targetSection = document.getElementById(sectionId);
    
    // Nascondi tutte le sezioni con fadeOut
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            section.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                section.classList.remove('active');
                section.style.animation = '';
            }, 300);
        }
    });
    
    // Mostra la sezione target con fadeIn
    setTimeout(() => {
        if (targetSection) {
            targetSection.classList.add('active');
            animateSectionElements(targetSection);
            
            // Scroll smooth to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, 350);
    
    // Chiudi menu mobile
    closeMenu();
}

// Animazione elementi sezione
function animateSectionElements(section) {
    const elements = section.querySelectorAll('p, h2, h3, table, .albo-card, .torneo-card, .product-card');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.5s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Toggle menu mobile con animazione
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Anima le voci del menu
    if (navMenu.classList.contains('active')) {
        const menuItems = navMenu.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Effetti scroll
function setupScrollEffects() {
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Header che si riduce allo scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effect per hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${currentScroll * 0.5}px)`;
        }
        
        // Reveal elements on scroll
        revealOnScroll();
        
        lastScroll = currentScroll;
    });
}

// Reveal elements quando entrano nel viewport
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Particelle fluttuanti
function createFloatingParticles() {
    const particleCount = 5;
    const symbols = ['🎾', '✨', '🏆', '⭐'];
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.fontSize = Math.random() * 20 + 20 + 'px';
            particle.style.animationDuration = Math.random() * 10 + 10 + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            document.body.appendChild(particle);
            
            // Rimuovi dopo l'animazione
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        }, i * 2000);
    }
    
    // Ricrea particelle periodicamente
    setInterval(createFloatingParticles, 20000);
}

// Effetto ripple sui click
function createRipple(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Stile inline per l'effetto ripple
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Animazione contatori per statistiche
function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;
        
        function updateCounter() {
            const current = +counter.innerText;
            
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        }
        
        // Inizia l'animazione quando l'elemento è visibile
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Setup interazioni cards
function setupCardInteractions() {
    // Product cards 3D effect
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // Click effect
        card.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
    
    // Albo cards hover effect
    const alboCards = document.querySelectorAll('.albo-card');
    
    alboCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.year').style.animation = 'bounce 1s ease infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.year').style.animation = '';
        });
    });
}

// Tooltips personalizzati
function setupTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 14px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1000;
        `;
        
        element.addEventListener('mouseenter', (e) => {
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        });
    });
}

// Animazione entrata pagina
function animatePageEntry() {
    const hero = document.querySelector('.hero');
    const header = document.querySelector('header');
    
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 1s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Aggiungi palla da tennis animata nell'hero
    const tennisBall = document.createElement('div');
    tennisBall.className = 'tennis-ball';
    tennisBall.style.top = '50%';
    tennisBall.style.left = '10%';
    hero.appendChild(tennisBall);
}

// Funzione per creare notifiche toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Gestione form negozio (esempio)
function handleProductClick(productName) {
    showToast(`Hai selezionato: ${productName}`, 'success');
}

// Funzione per animare la classifica
function animateRankingTable() {
    const table = document.querySelector('.classifica-table');
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease-out';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    showToast('🎾 Modalità Campione Attivata! 🏆', 'success');
    
    // Aggiungi effetti speciali
    document.body.style.animation = 'glow 2s ease-in-out';
    
    // Pioggia di trofei
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const trophy = document.createElement('div');
            trophy.textContent = '🏆';
            trophy.style.cssText = `
                position: fixed;
                top: -50px;
                left: ${Math.random() * 100}%;
                font-size: 30px;
                animation: fall 3s linear;
                z-index: 9999;
            `;
            document.body.appendChild(trophy);
            
            setTimeout(() => trophy.remove(), 3000);
        }, i * 100);
    }
}

// CSS per animazione caduta
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fall {
        to {
            top: 100vh;
            transform: rotate(360deg);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Inizializza tutto quando il DOM è pronto
window.addEventListener('load', () => {
    // Rimuovi eventuali loader residui
    hideLoader();
    
    // Attiva le animazioni della sezione attiva
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
        animateSectionElements(activeSection);
    }
});
