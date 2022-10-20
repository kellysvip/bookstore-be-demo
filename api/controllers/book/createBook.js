const Joi = require("joi");
const { validateSchema } = require("../../../ultis/joiValidate");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
var createError = require('http-errors')

const requestSchema = Joi.object({
  author: Joi.string().required(),
  country: Joi.string().required(),
  language: Joi.string().required(),
  title: Joi.string().required(),
  pages: Joi.number().default(1),
  year: Joi.number().default(2022),
  limit: Joi.number().default(10),
  imageLink: Joi.string().required(),
  id: Joi.string(),
});

/**
 * params: /
 * description: post a book
 * query:
 * method: post
 */

function createBook(req, res, next) {
  try {
    const { author, country, language, title, pages, year, imageLink } = { value, error  } =
      validateSchema(requestSchema, req.body);

      
    //post processing
    const newBook = {
      author,
      country,
      imageLink,
      language,
      pages,
      title,
      year,
      id: crypto.randomBytes(4).toString("hex"),
    };
    const filePath = path.join(__dirname, "../../../db.json");
    //Read data from db.json then parse to JSobject
    let { books } = (db = JSON.parse(fs.readFileSync(filePath, "utf-8")));

    //Add new book to book JS object
    books.push(newBook);
    //Add new book to db JS object                           
    db.books = books;
    //write and save to db.json
    fs.writeFileSync(filePath, JSON.stringify(db));
    
    //post send response
    res.status(200).send(newBook);
  } catch (error) {
    next(createError(401, error))
  }
}

module.exports = { createBook };
