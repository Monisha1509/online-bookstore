fetch("http://localhost:5000/api/orders")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("orders");

    data.forEach(order => {
      const div = document.createElement("div");
      div.className = "order-card";

      div.innerHTML = `
        <h3><i class="fa-solid fa-user"></i> ${order.customer.name}</h3>
        <p><i class="fa-solid fa-envelope"></i> ${order.customer.email}</p>
        <p><i class="fa-solid fa-phone"></i> ${order.customer.phone}</p>
        <p><i class="fa-solid fa-location-dot"></i>
          ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}
        </p>
        <div class="items">
          ${order.items.map(i => `<p>📘 ${i.title} - ₹${i.price}</p>`).join("")}
        </div>
        <strong>Total: ₹${order.totalAmount}</strong>
      `;

      container.appendChild(div);
    });
  });
