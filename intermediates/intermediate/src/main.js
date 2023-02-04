import * as THREE from '../../../lib/three.js-r145/build/three.module.js';
import * as DAT from '../../../lib/dat.gui-0.7.9/build/dat.gui.module.js';
import * as CONTROLS from '../../../lib/three.js-r145/examples/jsm/controls/OrbitControls.js';
import Stats from "../../../lib/three.js-r145/examples/jsm/libs/stats.module.js";

import {updateAspectRatio} from './eventfunctions/updateAspectRatio.js';
import {executeRaycast} from './eventfunctions/executeRaycast.js';
import {keyUpAction, keyDownAction} from './eventfunctions/executeKeyAction.js';

import Turbine from "./objects/Turbine.js";
import TurbineFromFile from "./objects/TurbineFromFile.js";
import Floor from "./objects/Floor.js";
import Physics from "./physics/Physics.js";
import PowerBox from "./objects/PowerBox.js";
import PowerBoxTFF from "./objects/PowerBoxTFF.js";

function main() {
    window.scene = new THREE.Scene();

    window.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    window.camera.position.set(-70, 70, 70);

    window.renderer = new THREE.WebGLRenderer({antialias: true});
    window.renderer.setSize(window.innerWidth, window.innerHeight);
    window.renderer.setClearColor(0x829ed4);
    window.renderer.shadowMap.enabled = true;

    window.physics = new Physics();
    window.physics.setup(0, -200, 0, 1 / 240, true);

    document.getElementById('3d_content').appendChild(window.renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load('/Project_turbine/intermediates/intermediate/src/images/sky.jpg', function (texture) {
        window.scene.background = texture;
    });

    const stats = Stats();
    document.body.appendChild(stats.dom);

    const turbine = new Turbine();
    turbine.position.set(-10, 15, 0);
    turbine.addPhysics();
    turbine.animate();
    window.scene.add(turbine);

    const powbox = new PowerBox();
    powbox.position.set(-25, 150, 0);
    powbox.scale.set(2, 2, 2);
    powbox.addPhysics();
    window.scene.add(powbox);

    const powboxtff = new PowerBoxTFF();
    powboxtff.position.set(25, 150, 0);
    powboxtff.scale.set(2, 2, 2);
    powboxtff.addPhysics();
    window.scene.add(powboxtff);

    const turbineFromFile = new TurbineFromFile();
    turbineFromFile.position.set(10, 0, 0);
    turbineFromFile.scale.set(6, 6, 6);
    turbineFromFile.addPhysics();
    window.scene.add(turbineFromFile);
    turbineFromFile.name = 'TurbineFromFile';

    const floor = new Floor();
    floor.position.set(0, 0, 0);
    window.scene.add(floor);

    let ambientLight = new THREE.AmbientLight(0xfcefd4);
    ambientLight.intensity = 0.9;
    window.scene.add(ambientLight);

    let pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 50, 5);
    pointLight.intensity = 0.55;
    pointLight.castShadow = true;
    window.scene.add(pointLight);

    const gui = new DAT.GUI();
    gui.add(pointLight.position, 'x', -100, 100);
    gui.add(pointLight.position, 'y', 0, 100);
    gui.add(pointLight.position, 'z', -100, 100);

    let orbitControls = new CONTROLS.OrbitControls(window.camera, window.renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 0, 0);
    orbitControls.update();

    const clock = new THREE.Clock();

    window.powerOnTurbine = new Boolean();

    function mainLoop() {
        const delta = clock.getDelta();

        if (turbineFromFile.animationMixer !== null) {
            turbineFromFile.animationMixer.update(delta);
        }
        window.renderer.render(window.scene, window.camera);
        stats.update();
        requestAnimationFrame(mainLoop);

        window.physics.update(delta);
        renderer.setAnimationLoop(turbine.animate);
    }

    mainLoop();
}
    window.onload = main;

    window.onresize = updateAspectRatio;
    window.onclick = executeRaycast;
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;
