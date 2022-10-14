import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import EventHandler from "./EventHandler";

export default class Resources extends EventHandler {
    constructor(sources) {
        super();

        this.sources = sources;

        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loadingManager = new THREE.LoadingManager();
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
    }

    startLoading() {
        for(const source of this.sources) {
            switch(source.type){
                case 'gltf':
                    this.loaders.gltfLoader.load(
                        source.path,
                        (file) => {
                            this.sourceLoaded(source, file);
                        }
                    )
                case 'texture':
                    this.loaders.textureLoader.load(
                        source.path,
                        (file) => {
                            this.sourceLoaded(source, file);
                        }
                    )
                default:
                    new Error();
            }
            
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;
        this.loaded++;

        if(this.loaded === this.toLoad) {
            this.trigger('ready')
        }
    } 
}