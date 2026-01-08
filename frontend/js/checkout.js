const summaryItems = document.getElementById("summaryItems");
const summaryTotal = document.getElementById("summaryTotal");
const form = document.getElementById("checkoutForm");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// Render summary
cart.forEach(item => {
  total += item.price;

  const div = document.createElement("div");
  div.className = "summary-item";
  div.innerHTML = `
    <span>${item.title}</span>
    <span>₹${item.price}</span>
  `;
  summaryItems.appendChild(div);
});

summaryTotal.innerText = `Total: ₹${total}`;

// Submit order
form.addEventListener("submit", async e => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const orderData = {
    customer: {
      name: form.elements[0].value,
      email: form.elements[1].value,
      phone: form.elements[2].value,
      address: form.elements[3].value,
      city: form.elements[4].value,
      pincode: form.elements[5].value,
    },
    items: cart.map(item => ({
      bookId: item._id,   // ✅ FIXED
      title: item.title,
      price: item.price,
      quantity: 1
    })),
    totalAmount: total
  };

  await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });

  alert("✅ Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});
