import * as THREE from 'three';

import Experience from "../Experience";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;

        if(this.debug.active === true) {
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        this.setAmbientLight();
        this.setFog();
    }

    setAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0x404040, 2.2);
        this.scene.add(this.ambientLight);
        
        if(this.debug.active === true) {
            const ambientLightDebugFolder = this.debugFolder.addFolder('AmbientLight');
            ambientLightDebugFolder.add(this.ambientLight, 'intensity')
                .min(0).max(3);
        }
    }

    setFog() {
        this.fog = new THREE.Fog('#67aad3', 1.4, 1.8)
        this.scene.fog = this.fog

        if(this.debug.active === true) {
            const fogFolder = this.debugFolder.addFolder('Fog');
            fogFolder.add(this.fog, 'near').min(0).max(3)
            fogFolder.add(this.fog, 'far').min(1).max(5)

            const debugObject = {
                fogColor: '#67aad3'
            }
            fogFolder.addColor(debugObject, 'fogColor').onChange((color) => {
                this.fog.color = new THREE.Color(color);
                this.experience.renderer.instance.setClearColor(new THREE.Color(color))
            })
        }
    }
}