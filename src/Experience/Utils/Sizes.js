import EventHandler from "./EventHandler";

export default class Sizes extends EventHandler {
    constructor(canvas) {
        super();
        
        //Setup
        this.canvas = canvas;

        this.width = this.canvas.getBoundingClientRect().width;
        this.height = this.canvas.getBoundingClientRect().height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2); 

        window.addEventListener('resize', () => {
            this.resize();
            this.trigger('resize');
        })
        console.log(this);
    }

    resize() {
        this.width = this.canvas.getBoundingClientRect().width;
        this.height = this.canvas.getBoundingClientRect().height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    }
}