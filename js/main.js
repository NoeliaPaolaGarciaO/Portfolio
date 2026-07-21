/*=========================================================
    PORTFOLIO NOELIA GARCIA
    main.js
=========================================================*/

"use strict";

/*=========================================================
    SELECTORES
=========================================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");

const header = document.querySelector(".header");

const backToTop = document.getElementById("backToTop");

const sections = document.querySelectorAll("section");

/*=========================================================
    MENÚ MÓVIL
=========================================================*/

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});

/*=========================================================
    HEADER STICKY
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.06)";

    } else {

        header.style.boxShadow = "none";

    }

});

/*=========================================================
    BOTÓN VOLVER ARRIBA
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*=========================================================
    SCROLL SUAVE
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});

/*=========================================================
    ANIMACIÓN AL HACER SCROLL
=========================================================*/

const animatedElements = document.querySelectorAll(

    ".about-card, .project-card, .skill-card, .contact-card, .timeline-content"

);

animatedElements.forEach(item => {

    item.classList.add("fade-up");

});

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: .15

});

animatedElements.forEach(item => {

    observer.observe(item);

});

/*=========================================================
    MENÚ ACTIVO SEGÚN LA SECCIÓN
=========================================================*/

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;

        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*=========================================================
    EFECTO PARALLAX SUAVE HERO
=========================================================*/

const heroImage = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {

    if (!heroImage) return;

    const value = window.scrollY * 0.08;

    heroImage.style.transform = `translateY(${value}px)`;

});

/*=========================================================
    REVELAR HERO
=========================================================*/

window.addEventListener("load", () => {

    const heroContent = document.querySelector(".hero-content");

    const heroPhoto = document.querySelector(".hero-image");

    if (heroContent) {

        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(30px)";

    }

    if (heroPhoto) {

        heroPhoto.style.opacity = "0";
        heroPhoto.style.transform = "translateY(30px)";

    }

    setTimeout(() => {

        if (heroContent) {

            heroContent.style.transition = ".8s ease";

            heroContent.style.opacity = "1";

            heroContent.style.transform = "translateY(0)";

        }

    }, 150);

    setTimeout(() => {

        if (heroPhoto) {

            heroPhoto.style.transition = ".8s ease";

            heroPhoto.style.opacity = "1";

            heroPhoto.style.transform = "translateY(0)";

        }

    }, 350);

});

/*=========================================================
    EFECTO HOVER PROYECTOS
=========================================================*/

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

/*=========================================================
    PRELOAD IMÁGENES
=========================================================*/

const preloadImages = () => {

    const images = document.querySelectorAll("img");

    images.forEach(img => {

        const image = new Image();

        image.src = img.src;

    });

};

window.addEventListener("load", preloadImages);

/*=========================================================
    AÑO AUTOMÁTICO FOOTER
=========================================================*/

const footerText = document.querySelector(".footer-bottom p");

if (footerText) {

    const year = new Date().getFullYear();

    footerText.innerHTML = `© ${year} Noelia García. Todos los derechos reservados.`;

}

/*=========================================================
    CONSOLA
=========================================================*/

console.log("%cPortfolio Noelia García", "color:#5B3B8C;font-size:18px;font-weight:bold;");

console.log("%cHTML + CSS + JavaScript", "color:#1FA89A;font-size:14px;");

console.log("%cDesarrollado sin frameworks.", "color:#666;");