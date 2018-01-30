import * as mysql from 'mysql'
import * as env from 'dotenv'
//needed to get default logger configured in app.ts, default logger is shared between each require
var logger = require('winston');
env.config(); //import env file env

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

    public async searchMembers() {
        try {
            var me = this //important as otherwise the this context is lost: https://stackoverflow.com/questions/32547735/javascript-promises-how-to-access-variable-this-inside-a-then-scope
            var rows = await new Promise(function (resolve, reject) { //convert to promise: https://stackoverflow.com/questions/22519784/how-do-i-convert-an-existing-callback-api-to-promises
                me.conn.query('SELECT * FROM ecofablab01.member', (err, rows) => {
                    if (err) reject(err);
                    resolve(rows)
                });
            });
            return rows
        } catch (error) {
            console.log(error)
        }
    }

    public Disconnect() {
        this.conn.end();
    }
}