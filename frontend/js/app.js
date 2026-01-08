const booksContainer = document.getElementById("books");

fetch("http://localhost:5000/api/books")
  .then(res => res.json())
  .then(books => {
    booksContainer.innerHTML = "";

    books.forEach(book => {
      const card = document.createElement("div");
      card.className = "book-card";

      card.innerHTML = `
        <img src="${book.image}">
        <h3>${book.title}</h3>
        <p>₹${book.price}</p>
        <button>Add to Cart</button>
      `;

      // ✅ ADD TO CART — FULL OBJECT
      card.querySelector("button").onclick = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(book); // ✅ FULL BOOK
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart");
      };

      // open details
      card.onclick = () => {
        window.location.href = `book.html?id=${book._id}`;
      };

      booksContainer.appendChild(card);
    });
  });


