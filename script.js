document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // GOLD RATE DISPLAY
  const goldEl = document.getElementById("goldRate");
  const updatedEl = document.getElementById("rateUpdated");
  if (goldEl && updatedEl) {
    const manualRate = 102500; // Today's 22K / 10 gm rate
    goldEl.textContent = `₹ ${manualRate}`;
    goldEl.dataset.rate = manualRate;

    const now = new Date();
    updatedEl.textContent = `Last Updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }

  // ==========================
  // FOOTER YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==========================
  // FOOTER SUBSCRIBE (GOOGLE SHEET)
  const subscribeSection = document.querySelector(".subscribe-section");
  if (subscribeSection) {
    const subscribeInput = subscribeSection.querySelector("input[type='email']");
    const subscribeBtn = subscribeSection.querySelector("button");

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbx8EGWE4hou1hUxcTzAYI_Vh3trMTfkPDuMi2FDFWcx2HVGLPbM_heWNLh_PwIMisecBA/exec";

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

      // ✅ Send to Google Sheet
      fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      })
        .then(() => {
          alert(`✅ Thank you! ${email} subscribed successfully.`);
          subscribeInput.value = "";
        })
        .catch((err) => {
          console.error("Error saving email:", err);
          alert("Error subscribing. Please try again later.");
        });
    });
  }

  // ==========================
  // BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) backToTopBtn.style.display = "block";
    else backToTopBtn.style.display = "none";
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ==========================
  // STICKY / SHRINK NAVBAR
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) navbar.classList.add("shrink");
    else navbar.classList.remove("shrink");
  });

  // ==========================
  // HAMBURGER MENU
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      hamburger.classList.toggle("active");
    });

    const navAnchors = navLinks.querySelectorAll("a");
    navAnchors.forEach((link) =>
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburger.classList.remove("active");
      })
    );
  }

  // ==========================
  // SEARCH BOX - MAIN + SILVER CARDS
  const searchBox = document.querySelector(".search-box input");
  const searchBtn = document.querySelector(".search-box button");

  function handleSearch() {
    const query = searchBox.value.trim().toLowerCase();
    const allCards = document.querySelectorAll(".small-card, .card"); // support both layouts

    if (query === "") {
      allCards.forEach((card) => (card.style.display = "block"));
      return;
    }

    let found = false;
    allCards.forEach((card) => {
      const titleEl = card.querySelector(".title");
      if (!titleEl) return;
      const title = titleEl.textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "block";
        found = true;
      } else card.style.display = "none";
    });

    if (!found) alert(`No products found for: "${query}"`);
  }

  if (searchBox) {
    searchBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
    searchBox.addEventListener("input", () => {
      if (searchBox.value.trim() === "") {
        const allCards = document.querySelectorAll(".small-card, .card");
        allCards.forEach((card) => (card.style.display = "block"));
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleSearch();
    });
  }

  // ==========================
  // SILVER JEWELLERY FILTERS (CATEGORY + WEIGHT)
  const categoryFilter = document.getElementById("categoryFilter");
  const weightFilter = document.getElementById("weightFilter");
  const silverCards = document.querySelectorAll(".small-card, .card");

  function filterSilverCards() {
    const categoryVal = categoryFilter ? categoryFilter.value.toLowerCase() : "";
    const weightVal = weightFilter ? weightFilter.value : "";
    const query = searchBox ? searchBox.value.trim().toLowerCase() : "";

    silverCards.forEach((card) => {
      const titleText = card.querySelector(".title")?.textContent.toLowerCase() || "";
      const weightText = card.querySelector(".wt")?.textContent.match(/\d+(\.\d+)?/);
      const weight = weightText ? parseFloat(weightText[0]) : 0;

      let show = true;

      // Category filter
      if (categoryVal && !titleText.includes(categoryVal)) show = false;

      // Weight filter
      if (weightVal) {
        if (weightVal === "1-5" && !(weight >= 1 && weight <= 5)) show = false;
        if (weightVal === "5-10" && !(weight > 5 && weight <= 10)) show = false;
        if (weightVal === "10-20" && !(weight > 10 && weight <= 20)) show = false;
        if (weightVal === "20+" && !(weight > 20)) show = false;
      }

      // Search query filter
      if (query && !titleText.includes(query)) show = false;

      card.style.display = show ? "block" : "none";
    });
  }

  if (categoryFilter) categoryFilter.addEventListener("change", filterSilverCards);
  if (weightFilter) weightFilter.addEventListener("change", filterSilverCards);
  if (searchBox) searchBox.addEventListener("input", filterSilverCards);
  if (searchBtn) searchBtn.addEventListener("click", filterSilverCards);

  // ==========================
  // ==========================
  // ADD TO CART BUTTON
  const addCartBtns = document.querySelectorAll(".add-cart");
  addCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productTitle = btn.closest(".small-card, .card").querySelector(".title").textContent;
      alert(`${productTitle} added to cart!`);
    });
  });
});
