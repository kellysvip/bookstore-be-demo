const Joi = require("joi");
const { validateSchema } = require("../../../ultis/joiValidate");
const path = require("path");
const fs = require("fs");

const requestSchema = Joi.object({
  author: Joi.string(),
  country: Joi.string(),
  language: Joi.string(),
  title: Joi.string(),
  pages: Joi.number().default(1),
  year: Joi.number().default(0),
  imageLink: Joi.string(),
});

function updateBook(req, res, next) {
  try {
    const { author, country, imageLink, language, pages, title, year } =
      validateSchema(requestSchema, req.body);

    const { bookId } = req.params;
    const updates = req.body;
    const filePath = path.join(__dirname, "../../../db.json");

    //put processing
    //Read data from db.json then parse to JSobject
    let db = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const { books } = db;
    //find book by id
    const targetIndex = books.findIndex((book) => book.id === bookId);
    if (targetIndex < 0) {
      const exception = new Error(`Book not found`);
      exception.statusCode = 404;
      throw exception;
    }
    //Update new content to db book JS object
    const updatedBook = { ...db.books[targetIndex], ...updates };
    db.books[targetIndex] = updatedBook;

    //db JSobject to JSON string
    //write and save to db.json
    fs.writeFileSync(filePath, JSON.stringify(db));
    //put send response
    res.status(200).send(updatedBook);
  } catch (error) {
    next(error);
  }
}

module.exports = { updateBook };
