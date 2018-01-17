import * as InputEvent from "input-event"
import * as event from "events"

//needed to get default logger configured in app.ts, default logger is shared between each require
var logger = require('winston');

export class CardReader {
    keyCodes = { '11': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, '10': 9 };
    memberId: number[] = [];
    cardReaderDevice: InputEvent;

    constructor() {
        try {
            let input = new InputEvent("/dev/input/event0");

            this.cardReaderDevice = new InputEvent.Keyboard(input);
            this.cardReaderDevice.on('keypress', this.processInput);

            //to catch cardReader errors because input-event does not catch them in current version
            process.on('uncaughtException', this.logEventError);

            logger.info("card reader initialized succesfully")
        } catch (error) {
            logger.error("something went wrong initializing the card reader:", error)
        }
    }

    private logEventError = (error) => {
        logger.error("Uncaught exception!: ", error);
        throw (error);
    }

    private processInput = (event) => { // need this in event handler: https://stackoverflow.com/questions/40822109/typescript-how-to-keep-class-methods-event-handlers-context-to-this-instance
        let code: string = event.code;
        console.log('code:' + code);

        if (code in this.keyCodes) {
            this.memberId.push(Number(this.keyCodes[code]));
        }
        else if (code == '28') {
            console.log(this.memberId.join(""));
            this.memberId = [];
        }
        else {
            console.log('unknown keycode');
        }
    }
}