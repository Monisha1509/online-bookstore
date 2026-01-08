fetch("http://localhost:5000/api/books")
  .then(res => res.json())
  .then(books => {
    const container = document.getElementById("books");

    books.forEach(book => {
      container.innerHTML += `
        <div class="book">
          <img src="${book.image}">
          <h3>${book.title}</h3>
          <p>${book.description}</p>
          <p>₹${book.price}</p>
          <button onclick="location.href='book.html?id=${book._id}'">
            View
          </button>
        </div>
      `;
    });
  });
