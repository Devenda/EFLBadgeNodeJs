import { Logger, transports } from 'winston';

var logger = new Logger({
    level: "info",
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'badger.log' })
    ]
});

logger.warn("Warning logged")
console.log("test")
