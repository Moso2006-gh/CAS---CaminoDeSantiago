import EventHandler from "./EventHandler";

export default class Time extends EventHandler {
    constructor() {
        super();

        //Setup
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;

        window.requestAnimationFrame(() => this.tick());
    }

    tick() {
        //Update Local Variables
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        //Trigger all tick
        this.trigger('tick');

        //Call animation frame
        window.requestAnimationFrame(() => this.tick());
    }
}