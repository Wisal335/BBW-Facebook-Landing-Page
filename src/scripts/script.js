/* =========================================================
   BIG BRAIN WAY
   FACEBOOK — LOCAL TRUST & PROOF
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const scrollProgress =
        document.getElementById("scrollProgress");

    const backToTop =
        document.getElementById("backToTop");

    const auditForm =
        document.getElementById("auditForm");

    const formSuccess =
        document.getElementById("formSuccess");

    const successName =
        document.getElementById("successName");

    const successReset =
        document.getElementById("successReset");

    const formError =
        document.getElementById("formError");

    const formSubmit =
        document.getElementById("formSubmit");

    const preferredDate =
        document.getElementById("preferredDate");


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const updateScrollProgress = () => {

        if (!scrollProgress) return;

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {

            scrollProgress.style.width = "0%";

            return;

        }

        const percentage =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width =
            `${Math.min(percentage, 100)}%`;

    };


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const updateBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 700) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    };


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       PROBLEM CARD MOUSE POSITION
    ===================================================== */

    const problemCards =
        document.querySelectorAll(".problem-card");


    problemCards.forEach((card) => {

        card.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    });


    /* =====================================================
       LOCAL LISTING INTERACTION
    ===================================================== */

    const listings =
        document.querySelectorAll(".local-listing");


    listings.forEach((listing) => {

        listing.addEventListener(
            "mouseenter",
            () => {

                listings.forEach((item) => {

                    item.classList.remove(
                        "active"
                    );

                });

                listing.classList.add(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       MINIMUM DATE
    ===================================================== */

    if (preferredDate) {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        preferredDate.min =
            `${year}-${month}-${day}`;

    }


    /* =====================================================
       FORM VALIDATION
    ===================================================== */

    const requiredFields = [
        "firstName",
        "lastName",
        "business",
        "email",
        "phone",
        "service",
        "serviceArea",
        "preferredDate",
        "preferredTime",
        "consent"
    ];


    const clearFormError = () => {

        if (formError) {

            formError.textContent = "";

        }


        document
            .querySelectorAll(".form-field.invalid")
            .forEach((field) => {

                field.classList.remove(
                    "invalid"
                );

            });

    };


    const markInvalid = (input) => {

        if (!input) return;

        const field =
            input.closest(".form-field");

        if (field) {

            field.classList.add(
                "invalid"
            );

        }

    };


    const isValidEmail = (email) => {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    };


    const validateForm = () => {

        clearFormError();

        let valid = true;

        let firstInvalid = null;


        requiredFields.forEach((fieldName) => {

            const field =
                document.getElementById(
                    fieldName
                );

            if (!field) return;


            if (field.type === "checkbox") {

                if (!field.checked) {

                    valid = false;

                    if (!firstInvalid) {
                        firstInvalid = field;
                    }

                }

                return;

            }


            if (!field.value.trim()) {

                valid = false;

                markInvalid(field);

                if (!firstInvalid) {
                    firstInvalid = field;
                }

            }

        });


        const email =
            document.getElementById("email");


        if (
            email &&
            email.value.trim() &&
            !isValidEmail(email.value.trim())
        ) {

            valid = false;

            markInvalid(email);

            if (!firstInvalid) {

                firstInvalid = email;

            }

        }


        if (!valid) {

            if (formError) {

                formError.textContent =
                    "Please complete the required fields before continuing.";

            }


            if (firstInvalid) {

                firstInvalid.focus();

            }

        }


        return valid;

    };


    /* =====================================================
       REMOVE INVALID STATE WHILE TYPING
    ===================================================== */

    if (auditForm) {

        auditForm
            .querySelectorAll(
                "input, select"
            )
            .forEach((input) => {

                input.addEventListener(
                    "input",
                    () => {

                        const field =
                            input.closest(
                                ".form-field"
                            );

                        if (field) {

                            field.classList.remove(
                                "invalid"
                            );

                        }

                        if (formError) {

                            formError.textContent =
                                "";

                        }

                    }
                );

                input.addEventListener(
                    "change",
                    () => {

                        const field =
                            input.closest(
                                ".form-field"
                            );

                        if (field) {

                            field.classList.remove(
                                "invalid"
                            );

                        }

                    }
                );

            });

    }


    /* =====================================================
       FORM SUBMISSION
       
       IMPORTANT:
       - No Calendly.
       - If data-endpoint is supplied, the form attempts
         a POST request.
       - If no endpoint exists, it displays a transparent
         development-ready success state.
    ===================================================== */

    if (auditForm) {

        auditForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                const honeypot =
                    document.getElementById(
                        "website-check"
                    );


                if (
                    honeypot &&
                    honeypot.value.trim() !== ""
                ) {

                    return;

                }


                if (!validateForm()) {

                    return;

                }


                const endpoint =
                    auditForm.dataset.endpoint?.trim();


                const submitText =
                    formSubmit?.querySelector(
                        ".submit-text"
                    );


                if (formSubmit) {

                    formSubmit.classList.add(
                        "loading"
                    );

                }


                if (submitText) {

                    submitText.textContent =
                        "Preparing your request...";

                }


                /*
                   Small delay gives the interface a
                   polished response without requiring
                   an external library.
                */

                await new Promise((resolve) => {

                    setTimeout(
                        resolve,
                        650
                    );

                });


                /*
                   If a real backend endpoint has been
                   configured, send the form data.
                */

                if (endpoint) {

                    try {

                        const formData =
                            new FormData(
                                auditForm
                            );


                        const response =
                            await fetch(
                                endpoint,
                                {
                                    method: "POST",
                                    body: formData,
                                    headers: {
                                        "Accept":
                                            "application/json"
                                    }
                                }
                            );


                        if (!response.ok) {

                            throw new Error(
                                "Submission failed"
                            );

                        }

                    } catch (error) {

                        console.error(
                            "Audit form submission error:",
                            error
                        );


                        if (formError) {

                            formError.textContent =
                                "We could not send the request right now. Please try again.";

                        }


                        if (formSubmit) {

                            formSubmit.classList.remove(
                                "loading"
                            );

                        }


                        if (submitText) {

                            submitText.textContent =
                                "Request My Free Audit";

                        }


                        return;

                    }

                }


                /* =========================================
                   SUCCESS UI
                ========================================= */

                const firstName =
                    document.getElementById(
                        "firstName"
                    );


                if (successName) {

                    successName.textContent =
                        firstName?.value.trim() ||
                        "there";

                }


                auditForm.hidden = true;

                formSuccess.hidden = false;


                if (formSubmit) {

                    formSubmit.classList.remove(
                        "loading"
                    );

                }


                if (submitText) {

                    submitText.textContent =
                        "Request My Free Audit";

                }


                formSuccess.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );

    }


    /* =====================================================
       RESET SUCCESS STATE
    ===================================================== */

    if (successReset) {

        successReset.addEventListener(
            "click",
            () => {

                if (!auditForm || !formSuccess) {
                    return;
                }


                auditForm.reset();

                auditForm.hidden = false;

                formSuccess.hidden = true;


                clearFormError();


                if (preferredDate) {

                    const today =
                        new Date();

                    const year =
                        today.getFullYear();

                    const month =
                        String(
                            today.getMonth() + 1
                        ).padStart(2, "0");

                    const day =
                        String(
                            today.getDate()
                        ).padStart(2, "0");

                    preferredDate.min =
                        `${year}-${month}-${day}`;

                }


                const booking =
                    document.getElementById(
                        "booking"
                    );

                if (booking) {

                    booking.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       HERO PARALLAX
       
       Subtle living interaction for desktop.
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        heroVisual &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        heroVisual.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;


                const interfaceCard =
                    heroVisual.querySelector(
                        ".search-interface"
                    );


                if (!interfaceCard) {
                    return;
                }


                interfaceCard.style.transform =
                    `
                    perspective(1200px)
                    rotateY(${x * -7}deg)
                    rotateX(${y * 5}deg)
                    translateY(-3px)
                    `;

            }
        );


        heroVisual.addEventListener(
            "pointerleave",
            () => {

                const interfaceCard =
                    heroVisual.querySelector(
                        ".search-interface"
                    );


                if (!interfaceCard) {
                    return;
                }


                interfaceCard.style.transform =
                    `
                    perspective(1200px)
                    rotateY(-4deg)
                    rotateX(2deg)
                    `;

            }
        );

    }


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }


            document
                .querySelectorAll(
                    ".problem-card"
                )
                .forEach((card) => {

                    card.style.removeProperty(
                        "--mouse-x"
                    );

                    card.style.removeProperty(
                        "--mouse-y"
                    );

                });

        }
    );


});