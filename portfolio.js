// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Button click animation
    const buttons = document.querySelectorAll(".button, .fixedbutton");
    buttons.forEach(btn => {
        btn.addEventListener("click", function () {
            this.classList.add("active");
            setTimeout(() => this.classList.remove("active"), 200);
        });
    });

    // Form submission validation
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // prevent reloading

        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();

        if (name === "" || email === "") {
            alert("⚠️ Please fill out both Name and Email fields before submitting.");
            return;
        }

        alert(`✅ Thank you, ${name}! Your form has been submitted successfully.`);
        form.reset();
    });

    // Scroll to top button visibility
    const topButton = document.querySelector(".fixedbutton");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    });

    // Image hover animation (optional)
    const profileImg = document.querySelector("#about img");
    if (profileImg) {
        profileImg.addEventListener("mouseover", () => {
            profileImg.style.transform = "scale(1.05)";
            profileImg.style.transition = "transform 0.3s ease";
        });
        profileImg.addEventListener("mouseout", () => {
            profileImg.style.transform = "scale(1)";
        });
    }
});
