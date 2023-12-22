const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const path = require("path");

const logsFolder = "opticcslogs";

const productionLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(timestamp({ format: "HH:mm:ss" }), myFormat),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: path.join(logsFolder, "error.log"),
        level: "error",
      }),
      new transports.File({ filename: path.join(logsFolder, "combined.log") }),
    ],
  });
};

module.exports = productionLogger;
