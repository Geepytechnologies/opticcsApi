import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

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

const customColors: Record<string, string> = {
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

export default developmentLogger;
