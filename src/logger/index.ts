import developmentLogger from "./developmentLogger";
import productionLogger from "./productionLogger";

let logger: any = null; // Adjust the type based on your logger implementation

const environment: string = process.env.NODE_ENV || "development";

if (environment === "production") {
  logger = productionLogger();
}

if (environment === "development") {
  logger = developmentLogger();
}

export default logger;
