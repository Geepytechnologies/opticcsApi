const developmentLogger = require("./developmentLogger");
const productionLogger = require("./productionLogger");

let logger = null;

const environment = process.env.NODE_ENV || "development";

if (environment === "production") {
  logger = productionLogger();
}
if (environment === "development") {
  logger = developmentLogger();
}

module.exports = logger;
