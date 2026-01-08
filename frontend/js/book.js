const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add book (Admin)
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json({ message: "Book added successfully" });
});

module.exports = router;
