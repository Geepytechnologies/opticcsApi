import { createLogger, format, transports } from "winston";
import path from "path";

const { combine, timestamp, printf } = format;

interface LogMessage {
  level: string;
  message: string | Record<string, any>;
  timestamp: string;
}

const myFormat = printf(({ level, message, timestamp }: LogMessage | any) => {
  if (typeof message === "object") {
    message = JSON.stringify(message, null, 3);
  }
  return `${timestamp} [${level}] ${message}`;
});

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

export default productionLogger;
