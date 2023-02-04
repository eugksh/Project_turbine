import * as THREE from '../../../../lib/three.js-r145/build/three.module.js';

export default class Floor extends THREE.Group {

  constructor() {
    super();

    const floorGeometry = new THREE.CircleGeometry( 80, 32 );
    const floorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 1,
      reflectivity: 0.02
    });

    const floorTexture = new THREE.TextureLoader().load('src/images/grasslight-small.jpg');
    floorTexture.repeat.set(4, 4);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorMaterial.map = floorTexture;

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    floor.receiveShadow = true;
    floor.name = 'floor';
    this.add(floor);
  }
}