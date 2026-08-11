"use strict";


const menuToggle =
    document.querySelector(".menu-toggle");

const navbar =
    document.querySelector(".navbar");

const navLinks =
    document.querySelectorAll(".navbar a");

const header =
    document.querySelector(".header");

const backToTop =
    document.getElementById("backToTop");

const sections =
    document.querySelectorAll("main section[id]");

const animatedElements =
    document.querySelectorAll(
        ".about-card, .project-card, .timeline-content, .skill-card, .contact-card"
    );


/* =====================================================
   MENÚ MÓVIL
===================================================== */

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navbar.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Cerrar menú"
                : "Abrir menú"
        );

    });

}


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar?.classList.remove("active");

        menuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle?.setAttribute(
            "aria-label",
            "Abrir menú"
        );

    });

});


/* =====================================================
   HEADER + BOTÓN VOLVER ARRIBA
===================================================== */

const updateScrollUI = () => {

    const scrollY =
        window.scrollY;


    header?.classList.toggle(
        "scrolled",
        scrollY > 30
    );


    backToTop?.classList.toggle(
        "show",
        scrollY > 600
    );

};


window.addEventListener(
    "scroll",
    updateScrollUI,
    {
        passive: true
    }
);


updateScrollUI();


/* =====================================================
   VOLVER ARRIBA
===================================================== */

backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =====================================================
   SCROLL SUAVE
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const targetId =
                    anchor.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    });


/* =====================================================
   ANIMACIONES AL HACER SCROLL
===================================================== */

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");


                            observer
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(
        element => {

            element.classList.add(
                "fade-up"
            );

            observer.observe(
                element
            );

        }
    );

} else {

    animatedElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =====================================================
   SECCIÓN ACTIVA EN EL MENÚ
===================================================== */

if ("IntersectionObserver" in window) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        navLinks.forEach(
                            link => {

                                link.classList.toggle(

                                    "active",

                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${entry.target.id}`

                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0
            }
        );


    sections.forEach(
        section => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */

const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}