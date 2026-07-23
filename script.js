// ===========================
// HOTEL HARITAJ
// script.js
// ===========================

// Sticky Navbar
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.style.background = "#0b0b0b";
        header.style.padding = "14px 8%";
        header.style.boxShadow = "0 5px 25px rgba(0,0,0,.35)";
    } else {
        header.style.background = "rgba(0,0,0,.35)";
        header.style.padding = "18px 8%";
        header.style.boxShadow = "none";
    }
});

// Active Menu
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "home";

    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.clientHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Fade Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: .20
});

document.querySelectorAll(".fade").forEach((el) => {
    observer.observe(el);
});

// Scroll To Top
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.className = "top-btn";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        topBtn.classList.add("showTop");
    } else {
        topBtn.classList.remove("showTop");
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Mobile Menu
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

if (menu && nav) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

// Smooth Anchor Scroll
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId && targetId !== "#") {
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
                nav.classList.remove("open");
            }
        }
    });
});

// Loading Animation
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// WhatsApp Button Animation
const whatsapp = document.querySelector(".btn2");

if (whatsapp) {
    setInterval(() => {
        whatsapp.classList.toggle("pulse");
    }, 2000);
}

// Floating CTA
const openDialogBtn = document.querySelector("#openDialog");
const dialog = document.querySelector("#bookingDialog");

if (openDialogBtn && dialog) {
    openDialogBtn.addEventListener("click", () => {
        dialog.showModal();
    });
}

// Booking Dialog
const closeDialogBtn = document.querySelector("#closeDialog");

if (dialog && closeDialogBtn) {
    closeDialogBtn.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (event) => {
        const rect = dialog.getBoundingClientRect();
        const clickedInside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!clickedInside) {
            dialog.close();
        }
    });
}

// Gallery Modal
const galleryCards = document.querySelectorAll(".gallery-card");
const galleryModal = document.querySelector("#galleryModal");
const galleryModalImage = document.querySelector("#galleryModalImage");
const galleryModalTitle = document.querySelector("#galleryModalTitle");
const closeGalleryModal = document.querySelector("#closeGalleryModal");

if (galleryCards.length && galleryModal && galleryModalImage && galleryModalTitle && closeGalleryModal) {
    galleryCards.forEach((card) => {
        card.addEventListener("click", () => {
            galleryModalImage.src = card.dataset.img;
            galleryModalTitle.textContent = card.dataset.title;
            galleryModal.showModal();
        });
    });

    closeGalleryModal.addEventListener("click", () => galleryModal.close());

    galleryModal.addEventListener("click", (event) => {
        const rect = galleryModal.getBoundingClientRect();
        const clickedInside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!clickedInside) {
            galleryModal.close();
        }
    });
}

// Toast helper
const toast = document.querySelector("#toast");

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// Booking Form Submission
const bookingForm = document.querySelector("#bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(bookingForm);
        const guestName = formData.get("guestName");
        const mobile = formData.get("mobile");
        const checkin = formData.get("checkin");
        const checkout = formData.get("checkout");
        const roomType = formData.get("roomType");
        const guests = formData.get("guests");
        const message = formData.get("message") || "No additional message";

        if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
            showToast("Check-out date should be after check-in date.");
            return;
        }

        const whatsappText = encodeURIComponent(
            `Hello Hotel Haritaj, I would like to make a booking enquiry.\n\nGuest Name: ${guestName}\nMobile Number: ${mobile}\nCheck-in Date: ${checkin}\nCheck-out Date: ${checkout}\nRoom Type: ${roomType}\nGuests: ${guests}\nMessage: ${message}`
        );

        window.open(`https://wa.me/919236015197?text=${whatsappText}`, "_blank");
        bookingForm.reset();
        showToast("Your enquiry has been prepared on WhatsApp.");
    });
}