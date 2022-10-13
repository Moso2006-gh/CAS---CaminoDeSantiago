import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Experience from '../Experience';
import Environment from './Environment';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.environment = new Environment();

        //Test mesh
        const loader = new THREE.TextureLoader();
        const img = loader.load('Textures/Backed.png')
    
        console.log(img);
        this.texture = img;

        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            '/Models/Terreno.glb',
            (gltf) => {
                console.log(this.texture);
                const terrainGeometry = gltf.scene.children[0].geometry;
                const terrainMaterial = new THREE.MeshStandardMaterial({map: this.texture})
                this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial)
                this.scene.add(this.terrain);
                this.terrain.scale.multiplyScalar(.01)
                console.log(this.terrain);
            }
        )
    }
}