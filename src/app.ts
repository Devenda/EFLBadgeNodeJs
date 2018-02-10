import * as reader from './cardReader';
import * as winston from 'winston';
import * as memberDB from './database';

var logger = require('winston'); //needed to get default logger 
logger.add(winston.transports.File, { filename: 'badger.log', level: "info" });
logger.info('Logger initialized');

//Card reader, handle badge events
// let cr = new reader.CardReader();
// cr.on('memberBadged', memberBadged);

//DB
let db = new memberDB.MemberDB();

//flow
function memberBadged(id) {
    logger.info('Received id: ' + id);
    if (db.connectionIsActive()){
        logger.info('Conn test succes!')
    } else {
        logger.info('Conn test failed!')
    }
}

memberBadged(222222);

//db.connectionIsActive().then(respons => console.log(respons));
//db.searchMembers().then(rows => console.log(rows)); // async instead of then? https://stackoverflow.com/questions/46515764/how-can-i-use-async-await-at-the-top-level

// logger.info("end");
