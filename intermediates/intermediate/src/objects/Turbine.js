import * as THREE from '../../../../lib/three.js-r145/build/three.module.js';

export default class Turbine extends THREE.Group {
  constructor() {
    super();
    this.addParts();
    this.animate();
  }

  addParts() {

    //Material
    const corpusMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeeeae3,
      flatShading: true,
      roughness: 0.199,
      reflectivity: 0.95,
      metalness: 0.5

    });
    const footMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfa6c00,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });
    const envMap = new THREE.TextureLoader().load('/Project_turbine/intermediates/intermediate/src/images/sky.jpg');
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    envMap.encoding = THREE.sRGBEncoding;

    corpusMaterial.envMap = envMap;
    corpusMaterial.envMapIntensity = 0.9;

    footMaterial.envMap = envMap;
    footMaterial.envMapIntensity = 0.9;

    const corpusGeometry = new THREE.CylinderGeometry(0.33, 0.8, 30, 128);
    const corpus = new THREE.Mesh(corpusGeometry, corpusMaterial);
    corpus.position.set(0, 0.2, 0);
    corpus.name = 'corpus';
    corpus.castShadow = true;
    corpus.recieveShadow = true;
    this.add(corpus);

    const foot1Geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.9, 128);
    const foot1 = new THREE.Mesh(foot1Geometry, footMaterial);
    foot1.position.set(0, -14.5, 0);
    foot1.name = 'foot1';
    foot1.castShadow = true;
    foot1.recieveShadow = true;

    const foot2Geometry = new THREE.CylinderGeometry(1.0, 1.0, 1.8, 128);
    const foot2 = new THREE.Mesh(foot2Geometry, footMaterial);
    foot2.position.set(0, -13.3, 0);
    foot2.name = 'foot2';
    foot2.castShadow = true;
    foot2.recieveShadow = true;

    const foot3Geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.9, 128);
    const foot3 = new THREE.Mesh(foot3Geometry, footMaterial);
    foot3.position.set(0, -12.0, 0);
    foot3.name = 'foot3';
    foot3.castShadow = true;
    foot3.recieveShadow = true;

    const foot = new THREE.Group();
    foot.add(foot1, foot2, foot3);
    foot.name = 'foot';
    this.add(foot);

    const headGeometry = new THREE.CylinderGeometry(0.9, 0.85, 0.5, 128,);
    const head1 = new THREE.Mesh(headGeometry, footMaterial);
    head1.position.set(0, 16, 1.9);
    head1.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    head1.name = 'head1';
    head1.castShadow = true;
    head1.receiveShadow = true;

    const head2Geometry = new THREE.CylinderGeometry(0.85, 0.6, 3, 128,);
    const head2 = new THREE.Mesh(head2Geometry, corpusMaterial);
    head2.position.set(0, 16, 0.5);
    head2.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    head2.name = 'head2';
    head2.castShadow = true;
    head2.receiveShadow = true;

    const headGeometry3 = new THREE.CylinderGeometry(0.6, 0.6, 0.4, 128,);
    const head3 = new THREE.Mesh(headGeometry3, footMaterial);
    head3.position.set(0, 16, -1);
    head3.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    head3.name = 'head3';
    head3.castShadow = true;
    head3.receiveShadow = true;

    const head4Geometry = new THREE.CylinderGeometry(0.6, 0.85, 0.6, 128,);
    const head4 = new THREE.Mesh(head4Geometry, corpusMaterial);
    head4.position.set(0, 16, -1.5);
    head4.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    head4.name = 'head4';
    head4.castShadow = true;
    head4.receiveShadow = true;

    const head = new THREE.Group();
    head.add(head1, head2, head3, head4);
    head.name = 'head';
    this.add(head);

    //small blades

    const smallbladeround = new THREE.MeshPhysicalMaterial({
      color: 0xa3020a,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });

    smallbladeround.envMap = envMap;
    smallbladeround.envMapIntensity = 0.9;

    const phiStart2 = 0;
    const phiEnd2 = Math.PI * 2;
    const thetaStart2 = 0;
    const thetaEnd2 = Math.PI / 2;

    const sphere2geometry = new THREE.SphereGeometry(0.9, 64, 32, phiStart2, phiEnd2, thetaStart2, thetaEnd2);
    window.sphere2 = new THREE.Mesh(sphere2geometry, smallbladeround);
    sphere2.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    sphere2.name = 'sphere2';
    sphere2.castShadow = true;
    sphere2.receiveShadow = true;
    sphere2.position.set(-10, 31, 2.17);


    const smallbladeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xef6767,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });

    smallbladeMaterial.envMap = envMap;
    smallbladeMaterial.envMapIntensity = 0.9;

    //Small Blade
    const SmallBlade = new THREE.Shape();
    SmallBlade.moveTo(0.3, 0);
    SmallBlade.lineTo(0.24, 0.5);
    SmallBlade.lineTo(0, 0);
    SmallBlade.lineTo(0, 0);
    SmallBlade.lineTo(0, 0);

    const extrudeSettings2 = {
      steps: 15,
      depth: 1.5,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 0.2,
      bevelOffset: 0,
      bevelSegments: 8
    };

    const geometrySmallBlade1 = new THREE.ExtrudeGeometry(SmallBlade, extrudeSettings2);
    const smallBlade1 = new THREE.Mesh(geometrySmallBlade1, smallbladeMaterial);
    smallBlade1.position.set(0, 0, -5);
    smallBlade1.rotation.set(THREE.MathUtils.degToRad(0), 0, 0);
    smallBlade1.name = 'smallBlade1';
    smallBlade1.castShadow = true;
    smallBlade1.receiveShadowShadow = true;

    const geometrySmallBlade2 = new THREE.ExtrudeGeometry(SmallBlade, extrudeSettings2);
    const smallBlade2 = new THREE.Mesh(geometrySmallBlade2, smallbladeMaterial);
    smallBlade2.position.set(2.8, 0, 1.3);
    smallBlade2.rotation.set(THREE.MathUtils.degToRad(0), (45), 0);
    smallBlade2.name = 'smallBlade2';
    smallBlade2.castShadow = true;
    smallBlade2.receiveShadowShadow = true;

    const geometrySmallBlade3 = new THREE.ExtrudeGeometry(SmallBlade, extrudeSettings2);
    const smallBlade3 = new THREE.Mesh(geometrySmallBlade3, smallbladeMaterial);
    smallBlade3.position.set(-2.9, 0, 1.2);
    smallBlade3.rotation.set(THREE.MathUtils.degToRad(0), (-45), 0);
    smallBlade3.name = 'smallBlade3';
    smallBlade3.castShadow = true;
    smallBlade3.receiveShadowShadow = true;


    sphere2.add(smallBlade1,smallBlade2,smallBlade3);
    sphere2.position.x = 0;
    sphere2.position.y = 16;
    sphere2.position.z = 2.15;
    this.add(sphere2);


    const bigbladeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb1c6f7,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });


    bigbladeMaterial.envMap = envMap;
    bigbladeMaterial.envMapIntensity = 0.9;

    const BigBlade = new THREE.Shape();
    BigBlade.moveTo(0.4, 0);
    BigBlade.lineTo(0.34, 0.7);
    BigBlade.lineTo(0, 0);
    BigBlade.lineTo(0, 0);
    BigBlade.lineTo(0, 0);

    const extrudeSettings = {
      steps: 15,
      depth: 3,
      bevelEnabled: true,
      bevelThickness: 4,
      bevelSize: 0.2,
      bevelOffset: 0,
      bevelSegments: 8
    };
    //Big Blades
    const bigbladeround = new THREE.MeshPhysicalMaterial({
      color: 0x170f6e,
      flatShading: true,
      roughness: 0.199,
      metalness: 0.5,
      reflectivity: 0.95
    });

    bigbladeround.envMap = envMap;
    bigbladeround.envMapIntensity = 0.9;

    const phiStart = 0;
    const phiEnd = Math.PI * 2;
    const thetaStart = 0;
    const thetaEnd = Math.PI / 2;

    const sphere1geometry = new THREE.SphereGeometry(0.85, 64, 32, phiStart, phiEnd, thetaStart, thetaEnd);
    window.sphere1 = new THREE.Mesh(sphere1geometry, bigbladeround);
    sphere1.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    sphere1.name = 'sphere1';
    sphere1.castShadow = true;
    sphere1.receiveShadow = true;

    const geometryBlade1 = new THREE.ExtrudeGeometry(BigBlade, extrudeSettings);
    const bigBlade1 = new THREE.Mesh(geometryBlade1, bigbladeMaterial);
    bigBlade1.position.set(0, -0.4, 4.35);
    bigBlade1.rotation.set(THREE.MathUtils.degToRad(0), 0, 0);
    bigBlade1.name = 'bigBlade1';
    bigBlade1.castShadow = true;
    bigBlade1.receiveShadowShadow = true;

    const geometryBlade2 = new THREE.ExtrudeGeometry(BigBlade, extrudeSettings);
    const bigBlade2 = new THREE.Mesh(geometryBlade2, bigbladeMaterial);
    bigBlade2.position.set(-6.5, 0, -4);
    bigBlade2.rotation.set(THREE.MathUtils.degToRad(0), (45), 0);
    bigBlade2.name = 'bigBlade2';
    bigBlade2.castShadow = true;
    bigBlade2.receiveShadowShadow = true;

    const geometryBlade3 = new THREE.ExtrudeGeometry(BigBlade, extrudeSettings);
    const bigBlade3 = new THREE.Mesh(geometryBlade3, bigbladeMaterial);
    bigBlade3.position.set(6.5, 0, -4);
    bigBlade3.rotation.set(THREE.MathUtils.degToRad(0), (-45), 0);
    bigBlade3.name = 'bigBlade3';
    bigBlade3.castShadow = true;
    bigBlade3.receiveShadowShadow = true;

    sphere1.add(bigBlade1,bigBlade2,bigBlade3);
    sphere1.position.x = 0;
    sphere1.position.y = 16;
    sphere1.position.z = -1.8;
    this.add(sphere1);
  }

  addPhysics() {
    window.physics.addBox(this, 700, 0.8, 32, 0.8, 0, 1, 0, false);
  }

  animate()
  {
    if (window.powerOnTurbine === true) {
      sphere1.rotateY(0.06);
      sphere2.rotateY(0.035);
    } else {
      sphere1.rotateY(0);
      sphere2.rotateY(0);
    }
  }
}