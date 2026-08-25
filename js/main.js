document.addEventListener('DOMContentLoaded', () => {


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const header =
        document.querySelector('.header');

    const menuToggle =
        document.querySelector('.menu-toggle');

    const navbar =
        document.querySelector('.navbar');

    const backToTop =
        document.querySelector('#backToTop');

    const currentYear =
        document.querySelector('#currentYear');

    const navLinks =
        document.querySelectorAll('.navbar a');

    const sections =
        document.querySelectorAll('main section[id]');



    /* =====================================================
       AÑO DEL FOOTER
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       MENÚ MOBILE
    ===================================================== */

    if (menuToggle && navbar) {


        menuToggle.addEventListener('click', () => {

            const isOpen =
                navbar.classList.toggle('active');


            menuToggle.setAttribute(
                'aria-expanded',
                String(isOpen)
            );


            menuToggle.setAttribute(
                'aria-label',
                isOpen
                    ? 'Cerrar menú'
                    : 'Abrir menú'
            );

        });



        navLinks.forEach(link => {

            link.addEventListener('click', () => {

                navbar.classList.remove('active');


                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );


                menuToggle.setAttribute(
                    'aria-label',
                    'Abrir menú'
                );

            });

        });

    }



    /* =====================================================
       CERRAR MENÚ AL CAMBIAR A DESKTOP
    ===================================================== */

    window.addEventListener('resize', () => {

        if (
            window.innerWidth > 850 &&
            navbar &&
            menuToggle
        ) {

            navbar.classList.remove('active');

            menuToggle.setAttribute(
                'aria-expanded',
                'false'
            );

            menuToggle.setAttribute(
                'aria-label',
                'Abrir menú'
            );

        }

    });



    /* =====================================================
       HEADER AL HACER SCROLL
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;


        if (window.scrollY > 30) {

            header.classList.add('scrolled');

        } else {

            header.classList.remove('scrolled');

        }

    };



    /* =====================================================
       BOTÓN VOLVER ARRIBA
    ===================================================== */

    const updateBackToTop = () => {

        if (!backToTop) return;


        if (window.scrollY > 500) {

            backToTop.classList.add('show');

        } else {

            backToTop.classList.remove('show');

        }

    };



    if (backToTop) {

        backToTop.addEventListener(
            'click',
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: 'smooth'

                });

            }
        );

    }



    /* =====================================================
       NAVEGACIÓN ACTIVA
    ===================================================== */

    const updateActiveSection = () => {


        /*
         * Si estamos en una página de proyecto
         * con navegación hacia el index principal,
         * no intentamos marcar secciones del proyecto
         * como si fueran secciones del portfolio.
         */

        const hasLocalSectionNavigation =
            Array.from(navLinks).some(link => {

                const href =
                    link.getAttribute('href');

                return href &&
                    href.startsWith('#');

            });


        if (!hasLocalSectionNavigation) {
            return;
        }



        let currentSection = '';



        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.id;

            }

        });



        navLinks.forEach(link => {

            link.classList.remove('active');


            const href =
                link.getAttribute('href');


            if (
                href === `#${currentSection}`
            ) {

                link.classList.add('active');

            }

        });

    };



    /* =====================================================
       ANIMACIONES DE ENTRADA
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            `
            .section-header,
            .project-card,
            .about-card,
            .timeline-item,
            .skill-card,
            .contact-card,
            .process-card,
            .project-gallery-item,
            .project-collection-card
            `
        );



    if (
        'IntersectionObserver' in window
    ) {


        const animationObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                'visible'
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );



        animatedElements.forEach(
            (element, index) => {

                element.classList.add(
                    'fade-up'
                );


                /*
                 * Retraso escalonado.
                 */

                if (
                    element.classList.contains(
                        'project-card'
                    ) ||
                    element.classList.contains(
                        'about-card'
                    ) ||
                    element.classList.contains(
                        'process-card'
                    ) ||
                    element.classList.contains(
                        'project-gallery-item'
                    )
                ) {

                    element.style.transitionDelay =
                        `${(index % 4) * 0.08}s`;

                }


                animationObserver.observe(
                    element
                );

            }
        );


    } else {


        animatedElements.forEach(
            element => {

                element.classList.add(
                    'visible'
                );

            }
        );

    }



    /* =====================================================
       SMOOTH SCROLL PARA ANCLAS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                'click',
                event => {

                    const targetId =
                        link.getAttribute('href');


                    if (
                        !targetId ||
                        targetId === '#'
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight -
                        10;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: 'smooth'

                    });

                }
            );

        });



    /* =====================================================
       SCROLL
    ===================================================== */

    const handleScroll = () => {

        updateHeader();

        updateBackToTop();

        updateActiveSection();

    };



    window.addEventListener(
        'scroll',
        handleScroll,
        {
            passive: true
        }
    );



    /* =====================================================
       ESTADO INICIAL
    ===================================================== */

    handleScroll();

});