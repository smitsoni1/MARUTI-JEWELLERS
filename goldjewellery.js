// ================================
// GOLD JEWELLERY JS
// ================================

// 1. Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 2. Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// 3. Wishlist Toggle
const wishlistBtns = document.querySelectorAll(".wishlist");

wishlistBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    if (btn.classList.contains("active")) {
      btn.innerHTML = '<i class="fas fa-heart"></i>';
      alert("Added to Wishlist!");
    } else {
      btn.innerHTML = '<i class="far fa-heart"></i>';
      alert("Removed from Wishlist!");
    }
  });
});

// 4. Add to Cart Button
const addCartBtns = document.querySelectorAll(".add-cart");

addCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productTitle = btn.closest(".card").querySelector(".title").textContent;
    alert(`${productTitle} added to cart!`);
  });
});

// 5. Filters Logic
const categoryFilter = document.getElementById("categoryFilter");
const weightFilter = document.getElementById("weightFilter");
const cards = document.querySelectorAll(".grid .card");

function filterCards() {
  const categoryValue = categoryFilter.value.toLowerCase();
  const weightValue = weightFilter.value;

  cards.forEach((card) => {
    const titleText = card.querySelector(".title").textContent.toLowerCase();
    const weightText = card.querySelector(".wt").textContent.match(/\d+(\.\d+)?/)[0];
    let showCard = true;

    // Filter by category
    if (categoryValue && !titleText.includes(categoryValue)) showCard = false;

    // Filter by weight
    if (weightValue) {
      const weight = parseFloat(weightText);
      if (weightValue === "1-5" && !(weight >= 1 && weight <= 5)) showCard = false;
      if (weightValue === "5-10" && !(weight > 5 && weight <= 10)) showCard = false;
      if (weightValue === "10-20" && !(weight > 10 && weight <= 20)) showCard = false;
      if (weightValue === "20+" && !(weight > 20)) showCard = false;
    }

    card.style.display = showCard ? "block" : "none";
  });
}

categoryFilter.addEventListener("change", filterCards);
weightFilter.addEventListener("change", filterCards);

// 6. Search Box Functionality (Only Title Search)
const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");

function performSearch() {
  const query = searchInput.value.toLowerCase().trim();

  // Filter only by title
  cards.forEach((card) => {
    const titleText = card.querySelector(".title").textContent.toLowerCase();
    card.style.display = titleText.includes(query) || query === "" ? "block" : "none";
  });
}

// Live search on typing
searchInput.addEventListener("input", performSearch);

// Search on button click
searchBtn.addEventListener("click", performSearch);

// Search on Enter key press
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

// 7. Subscribe Button
const subscribeBtn = document.querySelector(".subscribe-box button");
const subscribeInput = document.querySelector(".subscribe-box input");

subscribeBtn.addEventListener("click", () => {
  const email = subscribeInput.value.trim();
  if (email) {
    alert(`Thank you for subscribing with ${email}!`);
    subscribeInput.value = "";
  } else {
    alert("Please enter a valid email.");
  }
});

// 8. Footer Year
document.getElementById("year").textContent = new Date().getFullYear();
