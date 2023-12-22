const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});
const customColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "white",
};

const developmentLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      colorize({ colors: customColors }),
      timestamp({ format: "HH:mm:ss" }),
      myFormat
    ),
    transports: [new transports.Console()],
  });
};

module.exports = developmentLogger;
