const path = require("path");
const Joi = require("joi");
const fs = require("fs");
const { validateSchema } = require("../../../ultis/joiValidate");


const paramSchema = Joi.object({
  bookId: Joi.string().required(),
})
function deleteBook(req, res, next) {
  //delete input validation
  try {
    const { bookId } = validateSchema(paramSchema, req.params);
    const filePath = path.join(__dirname, "../../../db.json");
    //delete processing

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
    //filter db books object
    db.books = books.filter((book) => book.id !== bookId);
    //db JSobject to JSON string
    //write and save to db.json
    fs.writeFileSync(filePath, JSON.stringify(db));
    //delete send response
    res.status(200).send({});
  } catch (error) {
    next(error);
  }
}

module.exports = { deleteBook };
