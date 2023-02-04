import * as THREE from '../../../../lib/three.js-r145/build/three.module.js';

export default class PowerBoxTFF extends THREE.Group {
  constructor() {
    super();
    this.addParts();
  }

  addParts() {
    const powerOnMaterialtff = new THREE.MeshPhysicalMaterial({
      color: 0xff8c00,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });
    const powerOffMaterialtff = new THREE.MeshPhysicalMaterial({
      color: 0x4f00d6,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });
    const powerBoxMaterialtff = new THREE.MeshPhysicalMaterial({
      color: 0x1b1a1a,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });
    const pbMaterialtff = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });
    pbMaterialtff.map = new THREE.TextureLoader().load('/Project_turbine/intermediates/intermediate/src/images/texturefront.png');
    const panmapArraytff = [powerBoxMaterialtff, powerBoxMaterialtff, powerBoxMaterialtff, powerBoxMaterialtff, pbMaterialtff, powerBoxMaterialtff];

    const envMaptff = new THREE.TextureLoader().load('/Project_turbine/intermediates/intermediate/src/images/sky.jpg');
    envMaptff.mapping = THREE.EquirectangularReflectionMapping;
    envMaptff.encoding = THREE.sRGBEncoding;

    powerOnMaterialtff.envMaptff = envMaptff;
    powerOnMaterialtff.envMapIntensity = 0.9;

    powerOffMaterialtff.envMaptff = envMaptff;
    powerOffMaterialtff.envMapIntensity = 0.9;

    powerBoxMaterialtff.envMaptff = envMaptff;
    powerBoxMaterialtff.envMapIntensity = 0.9;

    const PowerOntff = new THREE.CylinderGeometry(0.6, 0.85, 0.6, 128,);
    const powerOntff = new THREE.Mesh(PowerOntff, powerOnMaterialtff);
    powerOntff.position.set(0, 2, 2);
    powerOntff.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    powerOntff.name = 'powerOntff';
    powerOntff.castShadow = true;
    powerOntff.receiveShadow = true;

    const PowerOfftff = new THREE.CylinderGeometry(0.6, 0.85, 0.6, 128,);
    const powerOfftff = new THREE.Mesh(PowerOfftff, powerOffMaterialtff);
    powerOfftff.position.set(0, -2.0, 2);
    powerOfftff.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    powerOfftff.name = 'powerOfftff';
    powerOfftff.castShadow = true;
    powerOfftff.receiveShadow = true;

    const PowerBoxtff = new THREE.BoxGeometry(4, 8.575, 4);
    const powerboxtff = new THREE.Mesh(PowerBoxtff, panmapArraytff);
    powerboxtff.position.set(0, 0, 0);
    powerboxtff.name = 'powerBoxtff';
    powerboxtff.castShadow = true;
    powerboxtff.receiveShadow = true;

    const pbtff = new THREE.Group();
    pbtff.add(powerboxtff, powerOntff, powerOfftff);
    pbtff.name = 'POWERBOXTFF';
    this.add(pbtff);
  }

  addPhysics() {
    window.physics.addBox(this,3,8,17.15,8,0,0,0,false);
  }
}