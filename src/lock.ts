import * as gpio from 'onoff'

export class raspberrypi{
    relay: gpio.Gpio;


    constructor(relayPin) {
        this.relay = new gpio.Gpio(relayPin,'out');
    }

    public OpenDoor(){
        this.relay.writeSync(1);
    }

    public CloseDoor(){
        this.relay.writeSync(0);
    }
}