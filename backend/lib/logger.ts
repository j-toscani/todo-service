import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";

dotenv.config();

const LOGGER_TIMESTAMP_FORMAT = process.env.LOGGER_ERROR_FILE ?? 'YYYY-MM-DD HH:mm:ss';
const LOGGER_ERROR_FILE = process.env.LOGGER_ERROR_FILE ?? '../logs/error.log';
const LOGGER_COMBINED_FILE = process.env.LOGGER_COMBINED_FILE ?? '../logs/combined.log';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: LOGGER_TIMESTAMP_FORMAT
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'todo-backend' },
  transports: [
    new transports.File({ filename: LOGGER_ERROR_FILE, level: 'error' }),
    new transports.File({ filename: LOGGER_COMBINED_FILE })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

export default logger;