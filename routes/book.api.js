const express = require("express");
const { getBooks } = require("../api/controllers/book/getBooks");
const { createBook } = require("../api/controllers/book/createBook");
const { updateBook } = require("../api/controllers/book/updateBook");
const { deleteBook } = require("../api/controllers/book/deleteBook");
const router = express.Router();

router.get("/", getBooks);

router.post("/", createBook);

router.put("/:bookId", updateBook);

router.delete("/:bookId", deleteBook);

module.exports = router;
