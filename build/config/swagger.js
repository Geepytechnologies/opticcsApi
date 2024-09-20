"use strict";
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Optics",
            version: "1.0.0",
            description: "A description of your API",
        },
    },
    apis: ["../routes/*.ts"], // Path to your API routes
};
const specs = swaggerJsdoc(options);
module.exports = specs;
