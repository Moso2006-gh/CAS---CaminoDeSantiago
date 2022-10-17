import * as THREE from 'three';
import Experience from "../Experience";

export default class Points {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera.instance;
        this.sizes = this.experience.sizes;

        this.points = [
            {
                position: new THREE.Vector3(.75, .22, -.25),
                element: document.querySelector('#Sarria')
            },
            {
                position: new THREE.Vector3(.57, .2, -.15),
                element: document.querySelector('#Puertomarin')
            },
            {
                position: new THREE.Vector3(.29, .17, .05),
                element: document.querySelector('#PalasDeRey')
            },
            {
                position: new THREE.Vector3(0, .17, .05),
                element: document.querySelector('#Arzua')
            },
            {
                position: new THREE.Vector3(-.23, .17, .05),
                element: document.querySelector('#OPedrouzo')
            },
            {
                position: new THREE.Vector3(-.38, .19, -.05),
                element: document.querySelector('#Santiago')
            },
        ]

        this.points.forEach(point => {
            console.log(point.element.id)
            point.element.addEventListener('click', () => this.setCartelVisible(point.element.id))
        })
    }

    update() {
        for(const point of this.points) {
            const screenPosition = point.position.clone();
            screenPosition.project(this.camera);
            screenPosition.multiplyScalar(.5);
            screenPosition.addScalar(.5);

            const translateX = screenPosition.x * this.sizes.width;
            const translateY = - screenPosition.y * this.sizes.height;
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }

    setPointsVisible() {
        console.log('a');
        for(const point of this.points) {
            point.element.classList.remove('inactive');
        }
    }

    setCartelVisible(PointName) {
        const cartel = document.getElementById('C'+ PointName)
        cartel.classList.add('active')
    }
}