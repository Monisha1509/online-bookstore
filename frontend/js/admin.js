const adminBooks = document.getElementById("adminBooks");

// LOAD ALL BOOKS
fetch("http://localhost:5000/api/books")
  .then(res => res.json())
  .then(books => {
    adminBooks.innerHTML = "";

    books.forEach(book => {
      adminBooks.innerHTML += `
        <div class="cart-item">
          <img src="${book.image}" width="60">
          <div>
            <h4>${book.title}</h4>
            <p>₹${book.price}</p>
            <button onclick='editBook(${JSON.stringify(book)})'>Edit</button>
            <button onclick="deleteBook('${book._id}')">Delete</button>
          </div>
        </div>
      `;
    });
  });

// ADD BOOK
function addBook() {
  const book = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value
  };

  fetch("http://localhost:5000/api/admin/add-book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  }).then(() => {
    alert("Book added");
    location.reload();
  });
}

// LOAD BOOK INTO EDIT FORM
function editBook(book) {
  document.getElementById("editId").value = book._id;
  document.getElementById("editTitle").value = book.title;
  document.getElementById("editDescription").value = book.description;
  document.getElementById("editPrice").value = book.price;
  document.getElementById("editImage").value = book.image;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// UPDATE BOOK
function updateBook() {
  const id = document.getElementById("editId").value;

  const updatedBook = {
    title: document.getElementById("editTitle").value,
    description: document.getElementById("editDescription").value,
    price: document.getElementById("editPrice").value,
    image: document.getElementById("editImage").value
  };

  fetch(`http://localhost:5000/api/admin/edit-book/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedBook)
  }).then(() => {
    alert("Book updated");
    location.reload();
  });
}

// DELETE BOOK
function deleteBook(id) {
  if (!confirm("Delete this book?")) return;

  fetch(`http://localhost:5000/api/admin/delete-book/${id}`, {
    method: "DELETE"
  }).then(() => {
    alert("Book deleted");
    location.reload();
  });
}
