const Joi = require("joi");

function validateSchema(schema, parameters) {
    const result = Joi.attempt(parameters, schema)
    return result;
} 

module.exports = {validateSchema}

 