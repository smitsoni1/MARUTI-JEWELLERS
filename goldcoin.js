document.addEventListener("DOMContentLoaded", () => {

  // ========================== UNIVERSAL SEARCH BOX FUNCTIONALITY ==========================
  const searchBox = document.querySelector(".search-box input");
  const searchBtn = document.querySelector(".search-box button");

  // Collect all cards from all sections (Gold, Silver, Categories, etc.)
  const allCards = document.querySelectorAll(".grid .card");

  function filterCards() {
    const query = searchBox.value.toLowerCase().trim();
    allCards.forEach(card => {
      const title = card.querySelector(".card-meta .title").textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Search on button click
  if (searchBtn) searchBtn.addEventListener("click", filterCards);

  // Search on enter key press
  if (searchBox) {
    searchBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        filterCards();
      }
    });

    // Clear search if input is empty
    searchBox.addEventListener("input", () => {
      if (searchBox.value === "") {
        allCards.forEach(card => card.style.display = "block");
      }
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

  // ========================== FOOTER YEAR UPDATE ==========================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========================== HAMBURGER MENU ==========================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Close nav when link clicked
  const navAnchors = navLinks ? navLinks.querySelectorAll("a") : [];
  navAnchors.forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("show")) navLinks.classList.remove("show");
    });
  });

  // ========================== FOOTER SUBSCRIBE FUNCTIONALITY ==========================
  const subscribeSection = document.querySelector(".subscribe-section");
  if (subscribeSection) {
    const subscribeInput = subscribeSection.querySelector("input[type='email']");
    const subscribeBtn = subscribeSection.querySelector("button");

    subscribeBtn.addEventListener("click", () => {
      const email = subscribeInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email === "") {
        alert("Please Enter Email!");
        return;
      } else if (!emailRegex.test(email)) {
        alert("Please Enter A Valid Email!");
        return;
      }

      alert(`Thank you! ${email} subscribed successfully.`);
      subscribeInput.value = "";
    });
  }
});
