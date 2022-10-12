export default class EventHandler {
    constructor () {
        this.event = {};
    }

    on (trig, callBack) {
        if(this.event[trig]){
            this.event[trig].push(callBack);
            return;
        }
        else {
            this.event[trig] = [callBack];
            return;
        }
    }

    trigger (trig) {

        if(!this.event[trig]){
            return;
        }

        this.event[trig].forEach(callBack => {
           callBack(); 
        });
    }

    off (trig) {
        delete this.event[trig]
    }
}