import * as THREE from 'three'
import Experience from '../Experience'

export default class Terrain {
    constructor() {
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
    }
}