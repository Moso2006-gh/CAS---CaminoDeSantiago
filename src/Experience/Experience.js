import * as THREE from 'three';

import Camera from './Camera';
import Renderer from './Renderer';
import sources from './sources';
import Debug from './Utils/Debug';
import Resources from './Utils/Resources';
import Sizes from "./Utils/Sizes";
import Time from './Utils/Time';
import World from './World/World';

let instance = null;

export default class Experience {
    constructor(canvas) {
        //Singleton
        if(instance) {
            return instance;
        }
        instance = this;
        
        //Setup
        this.canvas = canvas;
        this.debug = new Debug();
        this.sizes = new Sizes(this.canvas); 
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.renderer = new Renderer();

        this.resources.on('ready', () => {
            this.world = new World();
        })

        /**
         * Handle events
         */
        this.sizes.on('resize', () => {
            this.resize();
        })

        this.time.on('tick', () => {
            this.update();
        })
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();

        if(this.world) {
            this.world.update();
        }
    }
}