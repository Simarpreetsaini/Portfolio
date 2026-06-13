// Mobile Menu Toggle
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuIcon.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
    } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuIcon.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.6)';
        navbar.style.boxShadow = 'none';
    }
});

// Typing Effect for Hero Section
const roles = ["Full-Stack Applications.", "AI & Computer Vision Models.", "RESTful APIs.", "Scalable Systems."];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
if(typingElement) {
    setTimeout(typeEffect, 1000);
}

// Scroll Reveal Animation
const fadeUpElements = document.querySelectorAll('.fade-up');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // observer.unobserve(entry.target); // Uncomment to only animate once
        }
    });
}, observerOptions);

fadeUpElements.forEach(el => {
    observer.observe(el);
});

// Dynamic tsParticles Network Background
tsParticles.load("bg-container", {
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
        number: {
            value: 80,
            density: { enable: true, value_area: 800 }
        },
        color: { value: "#818cf8" },
        links: {
            enable: true,
            color: "#6366f1",
            distance: 150,
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.5, // Speed of particles moving
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "bounce" }
        },
        size: { value: 3 },
        opacity: { value: 0.5 }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "grab" }, // Grabs nearby particles on hover
            onClick: { enable: true, mode: "push" }  // Adds more particles on click
        },
        modes: {
            grab: { distance: 180, links: { opacity: 0.8 } },
            push: { quantity: 3 }
        }
    },
    background: { color: "#000000" }
});

// Disable Trackpad / Mouse Pinch Zoom
document.addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });

// Disable Mobile Touch Pinch Zoom
document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Disable Double-Tap Zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// Disable Keyboard Zoom (Ctrl + '+' or Ctrl + '-')
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '+' || e.key === '_')) {
        e.preventDefault();
    }
});

// Custom Cursor Logic
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay to the outline using animate for a smooth trailing effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover effect for links and buttons
const interactables = document.querySelectorAll('a, .btn, .menu-icon, .map-btn, .scroll-to-top-btn');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.backgroundColor = 'rgba(129, 140, 248, 0.1)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// Scroll to Top Button Logic
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize Leaflet Map
let map;

function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Mukerian coordinates: [31.9507, 75.6192]
    const mukerianCoords = [31.9507, 75.6192];
    
    // Initialize map
    map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false
    }).setView(mukerianCoords, 13);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add marker
    const marker = L.marker(mukerianCoords).addTo(map);
    marker.bindPopup("<b>Mukerian</b><br>Punjab, India").openPopup();
}

// Global pan function linked to control buttons
window.panMap = function(direction) {
    if (!map) return;
    const offset = 120; // pan pixel offset
    switch(direction) {
        case 'up':
            map.panBy([0, -offset]);
            break;
        case 'down':
            map.panBy([0, offset]);
            break;
        case 'left':
            map.panBy([-offset, 0]);
            break;
        case 'right':
            map.panBy([offset, 0]);
            break;
    }
};

// Auto-run map initialization on page load
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});
