/* =========================================================
   BIG BRAIN WAY
   FACEBOOK — LOCAL TRUST & PROOF
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       FACEBOOK GOOGLE APPS SCRIPT
       This endpoint belongs ONLY to Facebook.
    ===================================================== */

    const FACEBOOK_GOOGLE_APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzlzaukquVLoaQJlkAUXOVIFjGzPNmnPEOA61NfBgaUoi9UrAy39z3gis8iAde3Fl2O/exec";


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

        if (!scrollProgress) {
            return;
        }

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

        if (!backToTop) {
            return;
        }

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

    const setMinimumDate = () => {

        if (!preferredDate) {
            return;
        }

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
    };


    setMinimumDate();


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

        if (!input) {
            return;
        }

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

            if (!field) {
                return;
            }


            if (field.type === "checkbox") {

                if (!field.checked) {

                    valid = false;

                    markInvalid(field);

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
       FACEBOOK → GOOGLE APPS SCRIPT → GOOGLE SHEETS
    ===================================================== */

    if (auditForm) {

        auditForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                clearFormError();


                /* -----------------------------------------
                   VALIDATE
                ----------------------------------------- */

                if (!validateForm()) {
                    return;
                }


                /* -----------------------------------------
                   BUTTON LOADING STATE
                   Keep the arrow span intact.
                ----------------------------------------- */

                if (formSubmit) {

                    formSubmit.disabled = true;

                    const submitText =
                        formSubmit.querySelector(
                            ".submit-text"
                        );

                    if (submitText) {

                        submitText.textContent =
                            "Sending Request...";

                    }

                }


                try {

                    /* -------------------------------------
                       COLLECT FORM DATA
                    ------------------------------------- */

                    const data = {

                        firstName:
                            document
                                .getElementById("firstName")
                                .value
                                .trim(),

                        lastName:
                            document
                                .getElementById("lastName")
                                .value
                                .trim(),

                        business:
                            document
                                .getElementById("business")
                                .value
                                .trim(),

                        email:
                            document
                                .getElementById("email")
                                .value
                                .trim(),

                        phone:
                            document
                                .getElementById("phone")
                                .value
                                .trim(),

                        website:
                            document
                                .getElementById("website")
                                .value
                                .trim(),

                        service:
                            document
                                .getElementById("service")
                                .value,

                        serviceArea:
                            document
                                .getElementById("serviceArea")
                                .value
                                .trim(),

                        preferredDate:
                            document
                                .getElementById("preferredDate")
                                .value,

                        preferredTime:
                            document
                                .getElementById("preferredTime")
                                .value,

                        consent:
                            document
                                .getElementById("consent")
                                .checked
                                ? "Yes"
                                : "No",

                        source:
                            "Facebook"

                    };


                    /* -------------------------------------
                       SEND TO FACEBOOK APPS SCRIPT
                    ------------------------------------- */

                    const response =
                        await fetch(
                            FACEBOOK_GOOGLE_APPS_SCRIPT_URL,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "text/plain;charset=utf-8"
                                },

                                body:
                                    JSON.stringify(data)
                            }
                        );


                    /* -------------------------------------
                       READ RESPONSE
                    ------------------------------------- */

                    if (!response.ok) {

                        throw new Error(
                            `Server returned HTTP ${response.status}.`
                        );

                    }


                    const result =
                        await response.json();


                    /* -------------------------------------
                       CHECK APPS SCRIPT RESULT
                    ------------------------------------- */

                    if (!result.success) {

                        throw new Error(
                            result.error ||
                            "Submission failed."
                        );

                    }


                    /* -------------------------------------
                       SUCCESS STATE
                    ------------------------------------- */

                    if (successName) {

                        successName.textContent =
                            data.firstName;

                    }


                    auditForm.hidden = true;


                    if (formSuccess) {

                        formSuccess.hidden = false;

                    }


                    auditForm.reset();

                    setMinimumDate();


                } catch (error) {

                    console.error(
                        "Facebook form submission error:",
                        error
                    );


                    if (formError) {

                        formError.textContent =
                            "Something went wrong while sending your request. Please try again.";

                    }

                } finally {

                    /* -------------------------------------
                       RESTORE BUTTON
                    ------------------------------------- */

                    if (formSubmit) {

                        formSubmit.disabled = false;

                        const submitText =
                            formSubmit.querySelector(
                                ".submit-text"
                            );

                        if (submitText) {

                            submitText.textContent =
                                "Request My Free Audit";

                        }

                    }

                }

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

                if (
                    !auditForm ||
                    !formSuccess
                ) {
                    return;
                }


                auditForm.reset();

                auditForm.hidden = false;

                formSuccess.hidden = true;


                clearFormError();

                setMinimumDate();


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
       Desktop only.
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