import * as THREE from 'three'
import gsap from 'gsap'
import {Power4} from "gsap";

import Experience from '../Experience'
import EventHandler from '../Utils/EventHandler';

export default class Terrain extends EventHandler {
    constructor() {
        super();

        this.experience = new Experience();
        this.resources = this.experience.resources.items;

        this.setInstance();
    }

    setInstance() {
        const terrainModel = this.resources.terrainModel;
        this.terrainGeometry = terrainModel.scene.children[0].geometry;

        const terrainTexture = this.resources.terrainTexture;
        terrainTexture.encoding = THREE.sRGBEncoding;
        this.terrainMaterial = new THREE.MeshStandardMaterial({map: terrainTexture});

        this.instance = new THREE.Mesh(
            this.terrainGeometry,
            this.terrainMaterial
        )
        this.experience.scene.add(this.instance)
        this.instance.position.y = -.7
        gsap.to(this.instance.position, {
            y: 0, 
            duration: 3, 
            ease: Power4.easeInOut, 
            onComplete: () => {
                this.trigger('TerrainReady');
            }
        } )
    }
}