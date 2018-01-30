import * as reader from './cardReader';
import * as winston from 'winston';
import * as memberDB from './database';

var logger = require('winston'); //needed to get default logger 
logger.add(winston.transports.File, { filename: 'badger.log', level: "info" });
logger.info('Logger initialized');

//card reader
// let cr = new reader.CardReader();

//DB
let db = new memberDB.MemberDB();
db.searchMembers().then(rows => console.log(rows)); // async instead of then? https://stackoverflow.com/questions/46515764/how-can-i-use-async-await-at-the-top-level

logger.info("end");
