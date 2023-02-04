import * as THREE from '../../../../lib/three.js-r145/build/three.module.js';
import {GLTFLoader} from "../../../../lib/three.js-r145/examples/jsm/loaders/GLTFLoader.js";

export default class TurbineFromFile extends THREE.Group {
  constructor() {
    super();
    this.gltfLoader = new GLTFLoader();
    this.animationMixer = null;
    this.animations = new Map();
    this.load(this);

  }
  load(thisTurbine) {
    this.gltfLoader.load('src/models/turbine.gltf', function (gltf) {
      gltf.scene.traverse(function (child){
        child.castShadow = true;
        if(child.isMesh) {
          console.log(child.name);
        }
      });

      thisTurbine.animationMixer = new THREE.AnimationMixer(gltf.scene);

        window.action = thisTurbine.animationMixer.clipAction(gltf.animations[0]);
          thisTurbine.animations.set(gltf.animations[0].name, window.action);
          thisTurbine.add(gltf.scene);
    });
  }   addPhysics() {
    window.physics.addBox(this, 700, 1, 32, 1, 0, 16, 0, false);
  }
}
