import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Experience from '../Experience';
import clouds from './Clouds';
import Environment from './Environment';
import Points from './Points';
import Terrain from './Terrain';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        
        this.environment = new Environment();
        this.terrain = new Terrain();
        this.points = new Points();
        // this.clouds = new clouds();

        this.terrain.on('TerrainReady', () => {
            this.points.setPointsVisible();
            console.log('a');
        })
    }

    update() {
        // this.clouds.update();
        this.points.update();
    }
}