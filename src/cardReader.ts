import * as InputEvent from "input-event"
import * as event from "events"
import { EventEmitter } from "events";

//needed to get default logger configured in app.ts, default logger is shared between each require
var logger = require('winston');

export class CardReader extends event.EventEmitter{
    keyCodes = { '11': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, '10': 9 };
    memberNrs: number[] = [];
    cardReaderDevice: InputEvent;

    constructor() {
        super();
        try {
            let input = new InputEvent("/dev/input/event0");

            this.cardReaderDevice = new InputEvent.Keyboard(input);
            this.cardReaderDevice.on('keypress', this.ProcessInput);

            //to catch cardReader errors because input-event does not catch them in current version
            process.on('uncaughtException', this.LogEventError);

            logger.info("card reader initialized succesfully")
        } catch (error) {
            logger.error("something went wrong initializing the card reader:", error)
        }
    }

    private ProcessInput = (eventInput) => { // need this in event handler: https://stackoverflow.com/questions/40822109/typescript-how-to-keep-class-methods-event-handlers-context-to-this-instance
        let code: string = eventInput.code;
        //logger.info('code:' + code);

        if (code in this.keyCodes) {
            this.memberNrs.push(Number(this.keyCodes[code]));
        }
        else if (code == '28') {
            let memberId = this.memberNrs.join("")

            //raise event, handle in app
            this.emit('memberBadged', memberId)

            logger.info('Member ' + memberId + ' badged');
            this.memberNrs = [];
        }
        else {
            logger.warning('unknown keycode');
        }
    }

    private LogEventError = (error) => {
        logger.error("Uncaught exception!: ", error);
        throw (error);
    }
}