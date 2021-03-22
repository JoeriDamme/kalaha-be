import winston, { createLogger, format } from 'winston';
import httpContext from 'express-http-context';
import config from 'config';

export const logger = createLogger({
  level: config.get('logger.level'),
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.printf(info => {
      return `{ "level": "${info.level}", "timestamp": "${info.timestamp}", "requestId": "${httpContext.get('requestId')}", "method": "${info.method}", "message": "${info.message.replace(/[\\"']/g, '\\$&').replace(/(\r\n|\n|\r)/gm, '')}"}`;
    }),
  ),
  transports: [
    new winston.transports.File({
      filename: `${config.get('logger.path')}${config.get('logger.fileName')}`,
    }),
    new (winston.transports.Console)({
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
      ),
    }),
  ],
});
