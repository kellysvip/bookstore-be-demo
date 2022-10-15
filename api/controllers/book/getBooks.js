const lodash = require('lodash')
const { validateSchema } = require("../../../ultis/joiValidate")
const fs = require("fs");
const Joi = require("joi");
const path = require('path');
const requestSchema = Joi.object({
  author: Joi.string(),
  country: Joi.string(),
  language: Joi.string(),
  title: Joi.string(),
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
});

/**
 * params: /
 * description: get all books
 * query:
 * method: get
 */

 function getBooks(req, res, next) {
  try {
    const { page, limit, ...filterQuery } = validateSchema(
      requestSchema,
      req.query
    );

    const filePath = path.join(__dirname, '../../../db.json');

    //processing logic
    //Number of items skip for selection
    const offset = limit * (page - 1);

    //Read data from db.json then parse to JSobject
    const { books } = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    //Filter data by title
    
    
    if (lodash.isEmpty(filterQuery)) {
        console.log('clg if isEmpty')
      res.status(200).send(books);
    }

    let result = [];
    Object.keys(filterQuery).forEach((condition) => {
      result = result.length
        ? result.filter((book) => book[condition] === filterQuery[condition])
        : books.filter((book) => book[condition] === filterQuery[condition]);
    });

    //then select number of result by offset
    result = result.slice(offset, offset + limit);
    console.log('result', result)
    //send response
    res.status(200).send(result);
  } catch (error) {
    console.log('error', error)
    next(error);
  }
}

module.exports = {getBooks};
