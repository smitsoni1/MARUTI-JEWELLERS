document.addEventListener("DOMContentLoaded", () => {

  // ========================== FOOTER YEAR ==========================
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ========================== SUBSCRIBE FUNCTIONALITY ==========================
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

  // ========================== BACK TO TOP BUTTON ==========================
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ========================== HAMBURGER MENU ==========================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show"); // toggle nav links
    });

    // Close menu when link clicked (optional)
    const navAnchors = navLinks.querySelectorAll("a");
    navAnchors.forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("show")) {
          navLinks.classList.remove("show");
        }
      });
    });
  }

  // ========================== SEARCH FUNCTIONALITY ==========================
  const searchBox = document.querySelector(".search-box input");
  const searchBtn = document.querySelector(".search-box button");
  const categoryCards = document.querySelectorAll(".grid .card");

  const filterCategories = () => {
    const query = searchBox.value.toLowerCase().trim();

    categoryCards.forEach(card => {
      const title = card.querySelector(".title").textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  // Trigger search on button click
  if (searchBtn) {
    searchBtn.addEventListener("click", filterCategories);
  }

  // Trigger search on Enter key
  if (searchBox) {
    searchBox.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        filterCategories();
      }
    });
  }

});
