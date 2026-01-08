console.log("✅ NEW cart.js LOADED");

const cartItemsDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.querySelector(".checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartItemsDiv.innerHTML = `
    <div class="empty-cart">
      <h2>🛒 Your cart is empty</h2>
      <p>Add some books to continue shopping.</p>
      <a href="index.html" class="shop-btn">Browse Books</a>
    </div>
  `;
  totalPriceEl.textContent = "";
  checkoutBtn.style.display = "none";
} else {
  let total = 0;

  cart.forEach((book, index) => {
    total += book.price;

    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <img src="${book.image}" />
      <div>
        <h3>${book.title}</h3>
        <p>₹${book.price}</p>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(item);
  });

  totalPriceEl.textContent = `Total: ₹${total}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
