/* =========================================================
   My Cafe - Lab 12 Shared Vanilla JavaScript
   Author: Anas Shahid (26i-3113, Section E)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("My Cafe website initialized - Lab 12 (Anas Shahid, 26i-3113)");

    // 1. Mobile Navigation Toggle
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");
    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // 2. Menu Category Filter & Live Search (menu.html)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuSearch = document.getElementById("menuSearch");
    const menuSections = document.querySelectorAll(".menu-category-section");

    function filterMenu() {
        const activeBtn = document.querySelector(".filter-btn.active");
        const selectedCategory = activeBtn ? activeBtn.getAttribute("data-category") : "all";
        const query = menuSearch ? menuSearch.value.trim().toLowerCase() : "";

        menuSections.forEach(section => {
            const sectionCat = section.getAttribute("data-category");
            const categoryMatch = (selectedCategory === "all" || selectedCategory === sectionCat);
            const rows = section.querySelectorAll("tbody tr");
            let visibleRowCount = 0;

            rows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                const textMatch = rowText.includes(query);
                if (categoryMatch && textMatch) {
                    row.style.display = "";
                    visibleRowCount++;
                } else {
                    row.style.display = "none";
                }
            });

            section.style.display = (categoryMatch && visibleRowCount > 0) ? "" : "none";
        });
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                filterMenu();
            });
        });
    }

    if (menuSearch) {
        menuSearch.addEventListener("input", filterMenu);
    }

    // 3. Gallery Interactive Lightbox (gallery.html)
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDesc = document.getElementById("lightboxDesc");
    const lightboxClose = document.getElementById("lightboxClose");

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const img = item.querySelector("img");
                const title = item.querySelector("h4").textContent;
                const desc = item.querySelector("p").textContent;
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxTitle.textContent = title;
                lightboxDesc.textContent = desc;
                lightbox.classList.add("open");
            });
        });

        lightboxClose.addEventListener("click", () => {
            lightbox.classList.remove("open");
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("open");
            }
        });
    }

    // 4. FAQ Accordion & Search (faq.html)
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const isOpen = item.classList.toggle("open");
            header.setAttribute("aria-expanded", String(isOpen));
            const icon = header.querySelector(".acc-icon");
            if (icon) icon.textContent = isOpen ? "−" : "+";
        });
    });

    const faqSearch = document.getElementById("faqSearch");
    if (faqSearch) {
        faqSearch.addEventListener("input", () => {
            const term = faqSearch.value.trim().toLowerCase();
            const items = document.querySelectorAll(".accordion-item");
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(term) ? "" : "none";
            });
        });
    }

    // 5. Reservation Form Validation & Demo Confirmation (reservation.html)
    const reservationForm = document.getElementById("reservationForm");
    if (reservationForm) {
        reservationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let valid = true;

            const name = document.getElementById("resName");
            const email = document.getElementById("resEmail");
            const phone = document.getElementById("resPhone");
            const date = document.getElementById("resDate");
            const time = document.getElementById("resTime");
            const guests = document.getElementById("resGuests");

            document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");

            if (name.value.trim().length < 2) {
                document.getElementById("errName").textContent = "Please enter your full name.";
                valid = false;
            }
            if (!email.value.includes("@") || !email.value.includes(".")) {
                document.getElementById("errEmail").textContent = "Please enter a valid email address.";
                valid = false;
            }
            if (phone.value.trim().length < 7) {
                document.getElementById("errPhone").textContent = "Please enter a valid phone number.";
                valid = false;
            }
            if (!date.value) {
                document.getElementById("errDate").textContent = "Please select a reservation date.";
                valid = false;
            }
            if (!time.value) {
                document.getElementById("errTime").textContent = "Please select a preferred time.";
                valid = false;
            }
            if (Number(guests.value) < 1 || Number(guests.value) > 20) {
                document.getElementById("errGuests").textContent = "Guests must be between 1 and 20.";
                valid = false;
            }

            if (valid) {
                const resResult = document.getElementById("reservationResult");
                resResult.style.display = "block";
                resResult.innerHTML = `<strong>Demonstration Reservation Confirmed!</strong><br>
                Thank you, <strong>${name.value.trim()}</strong>. Your sample table request for <strong>${guests.value} guest(s)</strong> on <strong>${date.value}</strong> at <strong>${time.value}</strong> has been recorded for demonstration purposes.`;
                alert("Thank you for your reservation enquiry at My Cafe!");
                reservationForm.reset();
            }
        });
    }

    // 6. Contact Form Validation & Demo Confirmation (contact.html)
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const cName = document.getElementById("contactName").value.trim();
            const cEmail = document.getElementById("contactEmail").value.trim();
            const cMsg = document.getElementById("contactMessage").value.trim();
            const cResult = document.getElementById("contactResult");

            if (cName.length < 2 || !cEmail.includes("@") || cMsg.length < 5) {
                alert("Please complete all required fields with valid information before submitting.");
                return;
            }

            cResult.style.display = "block";
            cResult.innerHTML = `<strong>Sample Message Received!</strong> Thank you, ${cName}. This is a demonstration confirmation for the My Cafe Lab 12 project.`;
            contactForm.reset();
        });
    }
});

// Preserved original Lab 11 order button function
function triggerOrderAlert(itemName) {
    if (itemName) {
        alert("Thank you for ordering " + itemName + " at My Cafe!");
    } else {
        alert("Thank you for ordering!");
    }
}
