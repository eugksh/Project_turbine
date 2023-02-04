import * as THREE from '../../../../lib/three.js-r145/build/three.module.js';

export default class PowerBox extends THREE.Group {
  constructor() {
    super();
    this.addParts();
  }

  addParts() {
    const powerOnMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x37b951,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });
    const powerOffMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdf1111,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });
    const powerBoxMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1b1a1a,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });
    const pbMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });
    pbMaterial.map = new THREE.TextureLoader().load('/Project_turbine/intermediates/intermediate/src/images/texturefront.png');
    const panmapArray = [powerBoxMaterial, powerBoxMaterial, powerBoxMaterial, powerBoxMaterial, pbMaterial, powerBoxMaterial];

    const envMap = new THREE.TextureLoader().load('/Project_turbine/intermediates/intermediate/src/images/sky.jpg');
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    envMap.encoding = THREE.sRGBEncoding;

    powerOnMaterial.envMap = envMap;
    powerOnMaterial.envMapIntensity = 0.9;

    powerOffMaterial.envMap = envMap;
    powerOffMaterial.envMapIntensity = 0.9;

    powerBoxMaterial.envMap = envMap;
    powerBoxMaterial.envMapIntensity = 0.9;

    const PowerOn = new THREE.CylinderGeometry(0.6, 0.85, 0.6, 128,);
    const powerOn = new THREE.Mesh(PowerOn, powerOnMaterial);
    powerOn.position.set(0, 2, 2);
    powerOn.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    powerOn.name = 'powerOn';
    powerOn.castShadow = true;
    powerOn.receiveShadow = true;

    const PowerOff = new THREE.CylinderGeometry(0.6, 0.85, 0.6, 128,);
    const powerOff = new THREE.Mesh(PowerOff, powerOffMaterial);
    powerOff.position.set(0, -2.0, 2);
    powerOff.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    powerOff.name = 'powerOff';
    powerOff.castShadow = true;
    powerOff.receiveShadow = true;

    const PowerBox = new THREE.BoxGeometry(4, 8.575, 4);
    const powerbox = new THREE.Mesh(PowerBox, panmapArray);
    powerbox.position.set(0, 0, 0);
    powerbox.name = 'powerBox';
    powerbox.castShadow = true;
    powerbox.receiveShadow = true;

    const pb = new THREE.Group();
    pb.add(powerbox, powerOn, powerOff);
    pb.name = 'POWERBOX';
    this.add(pb);
  }

  addPhysics() {
    window.physics.addBox(this,3,8,17.15,8,0,0,0,false);
  }
}