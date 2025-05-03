var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: -10,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
});

/* navbar */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
});

function openSimplePopup(name, price, image) {
  document.getElementById("simplePopupName").textContent = name;
  document.getElementById("simplePopupPrice").textContent = price;
  document.getElementById("simplePopupImage").src = image;
  document.getElementById("simplePopupDrinkInput").value = name;
  document.getElementById("simplePopup").style.display = "block";
  popup.style.animation = "popupAnimation 0.3s forwards";
}

// PRODUCT RATING & LABEL

document.addEventListener("DOMContentLoaded", function () {
  const productPopups = document.querySelectorAll(".product-popup");

  productPopups.forEach((popup) => {
    const radios = popup.querySelectorAll('input[name="rating"]');

    const selectedRatingDiv = popup.querySelector('div[id^="selectedRating"]');

    radios.forEach((radio) => {
      radio.addEventListener("change", function () {
        const selectedValue = this.value;
        if (selectedRatingDiv) {
          selectedRatingDiv.textContent = `You selected: ${selectedValue} star(s)`;
        }
      });
    });
  });
});

//BUY POP-UP
// Show order popup when buy button is clicked
document.getElementById("buybtn").addEventListener("click", function () {
  document.getElementById("orderPopup").style.display = "block";
});

// Quantity controls
let quantity = 1;
const unitPrice = 49; // Base price

document.getElementById("increaseBtn").addEventListener("click", function () {
  quantity++;
  updateDisplay();
});

document.getElementById("decreaseBtn").addEventListener("click", function () {
  if (quantity > 1) {
    quantity--;
    updateDisplay();
  }
});

function updateDisplay() {
  document.getElementById("quantityDisplay").textContent = quantity;
  document.getElementById("totalPrice").textContent = (
    unitPrice * quantity
  ).toFixed(2);
}

// Close popup
document.getElementById("cancelOrder").addEventListener("click", function () {
  document.getElementById("orderPopup").style.display = "none";
});

// Confirm order
// Function to save order to history
function saveOrderToHistory(drinkName, quantity, customerName) {
  let history = JSON.parse(localStorage.getItem("orderHistory") || "[]");
  const timestamp = new Date().toLocaleString();

  history.unshift({
    drink: drinkName,
    quantity: quantity,
    total: (49 * quantity).toFixed(2),
    customerName: customerName,
    timestamp: timestamp,
  });

  localStorage.setItem("orderHistory", JSON.stringify(history));
  updateHistoryDisplay();
}

// Function to update the history display
function updateHistoryDisplay() {
  const historyList = document.getElementById("historyList");
  const history = JSON.parse(localStorage.getItem("orderHistory") || "[]");

  historyList.innerHTML = history
    .map(
      (item) => `
    <div class="history-item">
      <div>
        <p><strong>${item.customerName}</strong></p>
        <p><strong>${item.drink}</strong></p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: ₱${item.total}</p>
      </div>
      <p>${item.timestamp}</p>
    </div>
  `
    )
    .join("");
}

// Function to open history popup
function openHistoryPopup() {
  document.getElementById("orderHistoryPopup").style.display = "block";
  updateHistoryDisplay();
}

// Function to close history popup
function closeHistoryPopup() {
  document.getElementById("orderHistoryPopup").style.display = "none";
}

// Update confirm order function
document.getElementById("confirmOrder").addEventListener("click", function () {
  const drinkName = document.getElementById("simplePopupName").textContent;
  const customerName = document.getElementById("customerName").value;

  if (!customerName) {
    alert("Please enter your name before placing the order");
    return;
  }

  saveOrderToHistory(drinkName, quantity, customerName);
  alert("Order confirmed! Quantity: " + quantity);
  document.getElementById("orderPopup").style.display = "none";
});

// Close popup when clicking outside
document.getElementById("orderPopup").addEventListener("click", function (e) {
  if (e.target === this) {
    this.style.display = "none";
  }
});
