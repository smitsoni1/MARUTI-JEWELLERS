// ================================
// SILVER JEWELLERY JS - LIVE SEARCH + FILTER
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
  hamburger.classList.toggle("active");
});

// 3. Filters
const categoryFilter = document.getElementById("categoryFilter");
const weightFilter = document.getElementById("weightFilter");
const cards = document.querySelectorAll(".grid .card");

// Function to filter cards based on category, weight, and search query
function filterCards() {
  const categoryValue = categoryFilter.value.toLowerCase();
  const weightValue = weightFilter.value;
  const query = searchInput.value.toLowerCase().trim();

  cards.forEach((card) => {
    const titleText = card.querySelector(".title").textContent.toLowerCase();
    const weightText = card.querySelector(".wt").textContent.match(/\d+(\.\d+)?/)[0];
    const weight = parseFloat(weightText);

    let showCard = true;

    // Filter by category
    if (categoryValue && !titleText.includes(categoryValue)) showCard = false;

    // Filter by weight
    if (weightValue) {
      if (weightValue === "1-5" && !(weight >= 1 && weight <= 5)) showCard = false;
      if (weightValue === "5-10" && !(weight > 5 && weight <= 10)) showCard = false;
      if (weightValue === "10-20" && !(weight > 10 && weight <= 20)) showCard = false;
      if (weightValue === "20+" && !(weight > 20)) showCard = false;
    }

    // Filter by live search query
    if (query && !titleText.includes(query)) showCard = false;

    card.style.display = showCard ? "block" : "none";
  });
}

categoryFilter.addEventListener("change", filterCards);
weightFilter.addEventListener("change", filterCards);

// 4. Wishlist Toggle
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

// 5. Add to Cart Button
const addCartBtns = document.querySelectorAll(".add-cart");

addCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productTitle = btn.closest(".card").querySelector(".title").textContent;
    alert(`${productTitle} added to cart!`);
  });
});

// 6. Live Search Box Functionality
const searchInput = document.querySelector(".search-box input");

// Listen to input for live search
searchInput.addEventListener("input", filterCards);

// Optional: Search button (click) also triggers filter
const searchBtn = document.querySelector(".search-box button");
searchBtn.addEventListener("click", filterCards);

// 7. Subscribe Button
const subscribeBtn = document.querySelector(".subscribe-box button");
const subscribeInput = document.querySelector(".subscribe-box input");

subscribeBtn.addEventListener("click", () => {
  const email = subscribeInput.value.trim();
  if (email) {
    alert(`Thank you for subscribing with ${email}!`);
    subscribeInput.value = ""; // clear input
  } else {
    alert("Please enter a valid email.");
  }
});

// 8. Footer Year
document.getElementById("year").textContent = new Date().getFullYear();
