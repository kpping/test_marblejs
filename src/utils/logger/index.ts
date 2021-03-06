import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.logstash(),
    transports: [new transports.Console()],
});
