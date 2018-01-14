import { Logger, transports } from 'winston';
import * as reader from './cardReader';

var logger = new Logger({
    level: "info",
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'badger.log' })
    ]
});

let cr = new reader.CardReader();

//logger.warn("Warning logged")

