document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // FOOTER YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================
  // FOOTER SUBSCRIBE FUNCTIONALITY
  const subscribeSection = document.querySelector(".subscribe-section");
  if (subscribeSection) {
    const subscribeInput = subscribeSection.querySelector("input[type='email']");
    const subscribeBtn = subscribeSection.querySelector("button");

    subscribeBtn.addEventListener("click", () => {
      const email = subscribeInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email === "") {
        alert("Please Enter Email !");
        return;
      } else if (!emailRegex.test(email)) {
        alert("Please Enter A Valid Email!");
        return;
      }

      alert(`Thank you! ${email} subscribed successfully.`);
      subscribeInput.value = "";
    });
  }

  // ==========================
  // BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================
  // HAMBURGER MENU TOGGLE
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Close nav on link click (for single page)
  if (navLinks) {
    const navAnchors = navLinks.querySelectorAll("a");
    navAnchors.forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("show")) {
          navLinks.classList.remove("show");
        }
      });
    });
  }

  // ==========================
  // SEARCH BOX FUNCTIONALITY
  const searchBox = document.querySelector(".search-box");
  if (searchBox) {
    const input = searchBox.querySelector("input");
    const btn = searchBox.querySelector("button");

    const filterProducts = () => {
      const query = input.value.trim().toLowerCase();
      const cards = document.querySelectorAll(".grid .card");

      cards.forEach(card => {
        const title = card.querySelector(".title").textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    };

    // On button click
    btn.addEventListener("click", filterProducts);

    // On Enter key
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") filterProducts();
    });
  }
});
