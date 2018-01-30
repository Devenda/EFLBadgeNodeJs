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
            var me = this
            await new Promise(function (resolve, reject) {
                me.conn.query('SELECT * FROM ecofablab01.memberzzz', (err, rows) => {
                    if (err) reject(err);
                    resolve(rows)
                });
            });
        } catch (error) {
            console.log(error)
        }
    }

    public Disconnect() {
        this.conn.end();
    }
}