// Three
import * as THREE from '/build/three.module.js';
import * as DAT from '/dat/dat.gui.module.js';
//import * as dat from '/jsm/libs/dat.gui.module.js';

// Game
import GameConfig from './config.js';
import GameState from './state.js';

//Create a PointLight and turn on shadows for the light
const light = new THREE.PointLight( 
    //0xffffff,
    //0xe25822, // color
    0xad4413,
    3.5, // intesity
    100, // distance
    5, // decay
);
light.position.set( 0, 5, 5 );
// light.castShadow = true; // default false


// // Set up shadow properties for the light
// light.shadow.mapSize.width = 512; // default
// light.shadow.mapSize.height = 512; // default
// light.shadow.camera.near = 0.1; // default
// light.shadow.camera.far = 500; // default

const gui = new DAT.GUI( { autoPlace: false } );
const lightDebug = gui.addFolder( 'light' );
lightDebug.add( light.position, 'x', -30, 30, 1 );
lightDebug.add( light.position, 'y', 0, 30, 1 );
lightDebug.add( light.position, 'z', -30, 30, 1 );

lightDebug.add( light, 'intensity', 0, 5, 0.01 );

lightDebug.add( light, 'distance', 0, 250, 1 );

lightDebug.add( light, 'decay', 0, 50, 1 );

// Cube to place at light position
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.scale.set( 0.25, 0.25, 0.25 );

const pointLights = {

    addToScene: ( scene ) => {

        scene.add( light );
        scene.add( cube );

    },

    addDat: () => {

        const datContainer = document.getElementById( 'datContainer' );
        datContainer.appendChild( gui.domElement );

    },

    updateLights: () => {

        cube.position.copy( light.position );
        if ( GameState.debug ) {

            cube.visible = true;

        } else {

            cube.visible = false;

        }

    }

}

export default pointLights;