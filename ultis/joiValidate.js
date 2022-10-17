const Joi = require("joi");

function validateSchema(schema, parameters) {
    return Joi.attempt(parameters, schema)
} 

module.exports = {validateSchema}

 