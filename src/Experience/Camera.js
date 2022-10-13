import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Experience from "./Experience";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setInstance();
        // this.setControls();

        window.addEventListener('mousemove', (event) => {
            const canvasRect = this.canvas.getBoundingClientRect();
            this.cursor = new THREE.Vector2(
                (event.clientX - canvasRect.left) / canvasRect.width - 0.5, 
                (event.clientY - canvasRect.top) / canvasRect.height - 0.5
            );
        })
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
        this.scene.add(this.instance);

        this.initalCameraPos = new THREE.Vector3(0.03, 0.56, -1.06)
        this.instance.position.copy(this.initalCameraPos);
        
        this.instance.rotation.set(-2.7, 0.05, 3.11, 'XYZ')
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true;
    }

    //Envents
    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        if(this.cursor) {
            const idealPosition = new THREE.Vector3(
                this.initalCameraPos.x - this.cursor.x * 0.1,
                this.initalCameraPos.y,
                this.initalCameraPos.z - this.cursor.y * 0.1
            )

            this.instance.position.set(
                this.instance.position.x + (idealPosition.x - this.instance.position.x) / 10,
                this.initalCameraPos.y,
                this.instance.position.z + (idealPosition.z - this.instance.position.z) / 10
            )
        }
    }
}