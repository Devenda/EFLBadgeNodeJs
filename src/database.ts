import * as mysql from 'mysql'
import * as env from 'dotenv'

//needed to get default logger configured in app.ts, default logger is shared between each require
var logger = require('winston');
//import env file env
env.config(); 

export class MemberDB {
    private conn: mysql.Connection; 

    constructor() {
        this.conn = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASS
        });
        this.conn.on('error', this.logConnError); //needed because error is not thrown as promise??
    }

    private logConnError = (error) => {
        logger.error("Connection error: ", error);
        throw (error);
    }

    public async connectionIsActive() {
        try {
            var rows = await new Promise( (resolve, reject) => { //convert to promise: https://stackoverflow.com/questions/22519784/how-do-i-convert-an-existing-callback-api-to-promises
                this.conn.connect((err, rows) => {
                    if (err) reject(err);
                    resolve(rows)
                });
            });
            return true
        } catch (error) {
            logger.error("Connection error: ", error);
            return false
        }
    }

    public async searchMember(mId: string) {
        try {
            //Use arrow function to avoid loosing this ref 
            var rows = await new Promise( (resolve, reject) => {
                this.conn.query('SELECT * FROM ecofablab01.member WHERE member_id = ' + mysql.escape(mId), (err, rows) => {
                    if (err) reject(err);
                    resolve(rows)
                });
            });
            return rows
        } catch (error) {
            //TODO aanpassen
            logger.error(error)
        }
    }
}