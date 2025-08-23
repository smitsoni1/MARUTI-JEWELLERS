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
  // BACK TO TOP BUTTON FUNCTIONALITY
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
  // HAMBURGER MENU FUNCTIONALITY
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");   // toggle nav links
    });
  }

  // ==========================
  // SEARCH BOX FUNCTIONALITY (CONTACT PAGE / ALL PAGES)
  const searchBox = document.querySelector(".search-box input");
  const searchBtn = document.querySelector(".search-box button");

  if(searchBox && searchBtn) {

    function handleSearch() {
      const query = searchBox.value.trim().toLowerCase();
      if(query === "") {
        alert("Please enter a search term!");
        return;
      }

      // CONTACT PAGE INFO CARDS
      const infoCards = document.querySelectorAll(".office-info, .contact-card"); 
      let found = false;

      infoCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if(text.includes(query)) {
          card.style.display = "block";
          found = true;
        } else {
          card.style.display = "none";
        }
      });

      if(!found) alert(`No results found for: "${query}"`);
    }

    // ENTER KEY
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
  }

});
