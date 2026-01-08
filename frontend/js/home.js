fetch("http://localhost:5000/api/books")
  .then(res => res.json())
  .then(books => {
    const div = document.getElementById("books");
    books.forEach(b => {
      div.innerHTML += `
        <div class="book">
          <img src="${b.image}">
          <h3>${b.title}</h3>
          <p>${b.description}</p>
          <p>₹${b.price}</p>
          <button onclick="location.href='book.html?id=${b._id}'">View</button>
        </div>
      `;
    });
  });
