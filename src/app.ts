import * as reader from './cardReader';
import * as winston from 'winston';


var logger = require('winston'); //needed to get default logger 
logger.add(winston.transports.File, { filename: 'badger.log', level: "info" });
logger.info('Logger initialized');
module.exports = logger;

let cr = new reader.CardReader();

logger.info("Start application");
