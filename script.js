document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // GOLD RATE DISPLAY
  const goldEl = document.getElementById("goldRate");
  const updatedEl = document.getElementById("rateUpdated");

  const manualRate = 99000; // Today's 22K / 10 gm rate
  goldEl.textContent = `₹ ${manualRate}`;
  goldEl.dataset.rate = manualRate;

  const now = new Date();
  updatedEl.textContent = `Last Updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  // ==========================
  // FOOTER YEAR
  document.getElementById("year").textContent = new Date().getFullYear();

  // ==========================
  // FOOTER SUBSCRIBE FUNCTIONALITY WITH EMAIL VALIDATION
  const subscribeSection = document.querySelector(".subscribe-section");
  if (subscribeSection) {
    const subscribeInput = subscribeSection.querySelector("input[type='email']");
    const subscribeBtn = subscribeSection.querySelector("button");

    subscribeBtn.addEventListener("click", () => {
      const email = subscribeInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(email === "") {
        alert("Please Enter Email !");
        return;
      } 
      else if(!emailRegex.test(email)) {
        alert("Please Enter A Valid Email!");
        return;
      }

      console.log("Subscribed Email:", email); // Demo: console log
      alert(`Thank you! ${email} subscribed successfully.`);
      subscribeInput.value = ""; // Reset input
    });
  }

  // ==========================
  // BACK TO TOP BUTTON FUNCTIONALITY
  const backToTopBtn = document.getElementById("backToTop");

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

  // ==========================
  // STICKY / SHRINK NAVBAR ON SCROLL
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("shrink");
    } else {
      navbar.classList.remove("shrink");
    }
  });

  // ==========================
  // HAMBURGER MENU TOGGLE
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if(hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  const navAnchors = navLinks.querySelectorAll("a");
  navAnchors.forEach(link => {
    link.addEventListener("click", () => {
      if(navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
      }
    });
  });

  // ==========================
  // SEARCH BOX FUNCTIONALITY
  const searchBox = document.querySelector(".search-box input");
  const searchBtn = document.querySelector(".search-box button");

  function handleSearch() {
    const query = searchBox.value.trim().toLowerCase();
    const allCards = document.querySelectorAll(".card");

    // If search box empty → show all cards
    if(query === "") {
      allCards.forEach(card => card.style.display = "block");
      return;
    }

    // FILTER CARDS
    let found = false;
    allCards.forEach(card => {
      const title = card.querySelector(".title").textContent.toLowerCase();
      if(title.includes(query)) {
        card.style.display = "block";
        found = true;
      } else {
        card.style.display = "none";
      }
    });

    if(!found) alert(`No products found for: "${query}"`);
  }

  // ENTER KEY PRESS
  searchBox.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });

  // BUTTON CLICK
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleSearch();
  });

  // LIVE CLEAR: જો વપરાશકર્તા input દૂર કરે → બધા cards પાછા
  searchBox.addEventListener("input", () => {
    if(searchBox.value.trim() === "") {
      const allCards = document.querySelectorAll(".card");
      allCards.forEach(card => card.style.display = "block");
    }
  });

});
