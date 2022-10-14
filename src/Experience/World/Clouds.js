import * as THREE from 'three'
import Experience from '../Experience';

export default class clouds {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources.items;
        this.clouds = []

        const nClouds = 10;
        this.cloudTexture = this.resources.cloud1;
        this.cloudMaterial = new THREE.MeshBasicMaterial({map: this.cloudTexture, transparent: true})
        for (let i = 0; i < nClouds; i++) {
            this.setCloud();
        }
    }

    setCloud() {
        const cloudGeometry = new THREE.PlaneGeometry(.2, .07)
        const cloud = new THREE.Mesh(
            cloudGeometry,
            this.cloudMaterial
        )

        const camera = this.experience.camera.instance;
        cloud.position.x = camera.position.x;
        cloud.position.y = camera.position.y - .4;
        cloud.lookAt(camera.position);

        cloud.position.x += Math.random() - .5;
        cloud.position.z += (Math.random() - .5) - .3;
        
        this.experience.scene.add(cloud)
        this.clouds.push({
            mesh: cloud,
            speed: (Math.max(0.1, Math.random())  - 0.5) * .0001 * 0.5
        })
    }

    update() {
        this.clouds.forEach(cloud => {
            cloud.mesh.position.x += cloud.speed * this.experience.time.delta;
            if(Math.abs(cloud.mesh.position.x) > .4) {
                cloud.speed *= -1;
                cloud.mesh.position.x += cloud.speed * this.experience.time.delta;
            }
        });
    }
}