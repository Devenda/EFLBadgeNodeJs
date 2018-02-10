import * as reader from './cardReader';
import * as winston from 'winston';
import * as memberDB from './database';
import { ENGINE_METHOD_NONE, POINT_CONVERSION_COMPRESSED } from 'constants';

var logger = require('winston'); //needed to get default logger 
logger.add(winston.transports.File, { filename: 'badger.log', level: "info" });
logger.info('Logger initialized');

//Card reader
let cr = new reader.CardReader();
function memberBadged(id) {
    logger.info('received id:' + id)
}
cr.on('memberBadged', memberBadged);

//DB
let db = new memberDB.MemberDB();

db.connectionIsActive().then((state => {
    if (state) {
        logger.info('connection active');
    }
    else {
        logger.info('connection inactive');
    }
}))

//db.connectionIsActive().then(respons => console.log(respons));
//db.searchMembers().then(rows => console.log(rows)); // async instead of then? https://stackoverflow.com/questions/46515764/how-can-i-use-async-await-at-the-top-level

// logger.info("end");
