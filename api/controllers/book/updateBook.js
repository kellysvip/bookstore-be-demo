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

const paramSchema = Joi.object({
  bookId: Joi.string().required(),
})

function updateBook(req, res, next) {
  try {
    const { ...updates } =
      validateSchema(requestSchema, req.body);

    const { bookId } = validateSchema(paramSchema, req.params);
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
