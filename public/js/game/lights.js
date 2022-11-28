// Three
import * as THREE from '/build/three.module.js';
import * as DAT from '/dat/dat.gui.module.js';
//import * as dat from '/jsm/libs/dat.gui.module.js';

// Game
import GameConfig from './config.js';
import GameState from './state.js';


// Lights
const amibientLight = new THREE.AmbientLight( 0x404040, 0.25 );
const light = new THREE.DirectionalLight( 0xFFFFFF, 0.75 );

// Config
light.position.set( 10, 20, 10 );
light.target.position.set( 0, 0, 0 );
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;

// Debug GUI
const gui = new DAT.GUI();
const lightDebug = gui.addFolder( 'light' );
lightDebug.add( light.position, 'x', -30, 30, 1 );
lightDebug.add( light.position, 'y', 0, 30, 1 );
lightDebug.add( light.position, 'z', -30, 30, 1 );

lightDebug.add( light.target.position, 'x', -30, 30, 1 );
lightDebug.add( light.target.position, 'y', 0, 30, 1 );
lightDebug.add( light.target.position, 'z', -30, 30, 1 );

lightDebug.add( light, 'intensity', 0, 3, 0.01 );

// Need to investigate what is going on here
const setValue = () => {}
lightDebug.addColor( light, 'color' ).onChange( setValue );



const ambientLightDebug = gui.addFolder( 'ambientLight' );
ambientLightDebug.add( light, 'intensity', 0, 3, 0.01 );

// Debug Position
const length = 4; // Axis length

// X Axis
const lineMaterialX = new THREE.LineBasicMaterial( { color: 0xff0000 } );

const pointsX = [];
pointsX.push( new THREE.Vector3( length, 0, 0 ) );
pointsX.push( new THREE.Vector3( -length, 0, 0 ) );

const lineGeometryX = new THREE.BufferGeometry().setFromPoints( pointsX );
const lineX1 = new THREE.Line( lineGeometryX, lineMaterialX );
const lineX2 = new THREE.Line( lineGeometryX, lineMaterialX );

// Y Axis
const lineMaterialY = new THREE.LineBasicMaterial( { color: 0x00ff00 } );

const pointsY = [];
pointsY.push( new THREE.Vector3( 0, length, 0 ) );
pointsY.push( new THREE.Vector3( 0, -length, 0 ) );

const lineGeometryY = new THREE.BufferGeometry().setFromPoints( pointsY );
const lineY1 = new THREE.Line( lineGeometryY, lineMaterialY );
const lineY2 = new THREE.Line( lineGeometryY, lineMaterialY );

// Z Axis
const lineMaterialZ = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const pointsZ = [];
pointsZ.push( new THREE.Vector3( 0, 0, length ) );
pointsZ.push( new THREE.Vector3( 0, 0, -length ) );

const lineGeometryZ = new THREE.BufferGeometry().setFromPoints( pointsZ );
const lineZ1 = new THREE.Line( lineGeometryZ, lineMaterialZ );
const lineZ2 = new THREE.Line( lineGeometryZ, lineMaterialZ );

// Cube to place at light position
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

cube.scale.set( 0.25, 0.25, 0.25 );
cube.add( lineX1 );
cube.add( lineY1 );
cube.add( lineZ1 );

// Cube to place at target position
const cubeTarget = new THREE.Mesh( cubeGeometry, cubeMaterial );
cubeTarget.scale.set( 0.25, 0.25, 0.25 );
cubeTarget.add( lineX2 );
cubeTarget.add( lineY2 );
cubeTarget.add( lineZ2 );

// Camera Direction Line
const lineCamDirMaterial = new THREE.LineDashedMaterial( { color: 0xffffff } );
const pointsCamDir = [];
pointsCamDir.push( light.position );
pointsCamDir.push( light.target.position );
const lineGeometryCamDir = new THREE.BufferGeometry().setFromPoints( pointsCamDir );
const lineCamDir = new THREE.Line( lineGeometryCamDir, lineCamDirMaterial );

const updateLinePositions = ( line, point1, point2 ) => {

    const positions = line.geometry.attributes.position.array;

    positions[ 0 ] = point1.x;
    positions[ 1 ] = point1.y;
    positions[ 2 ] = point1.z;

    positions[ 3 ] = point2.x;
    positions[ 4 ] = point2.y;
    positions[ 5 ] = point2.z;

}

const lights = {

    addToScene: ( scene ) => {

        scene.add( amibientLight );
        scene.add( light, light.target ); // If we want to update the target
        scene.add( cube );
        scene.add( cubeTarget );
        scene.add( lineCamDir );

    },

    addDat: () => {

        const datContainer = document.getElementById( 'datContainer' );
        datContainer.appendChild( gui.domElement );

    },

    updateLights: () => {

        cube.position.copy( light.position );
        cubeTarget.position.copy ( light.target.position );
        lineCamDir.geometry.attributes.position.needsUpdate = true;
        updateLinePositions( lineCamDir, light.position, light.target.position );

        if ( GameState.debug ) {

            cube.visible = true;
            cubeTarget.visible = true;
            lineCamDir.visible = true;

        } else {

            cube.visible = false;
            cubeTarget.visible = false;
            lineCamDir.visible = false;

        }

    }

}

export default lights;

/*
https://observablehq.com/@bumbeishvili/three-js-dat-gui-controls
https://codepen.io/webhacck/pen/QyxVpw

var data = document.getElementById('data');
var text;

//GUIパラメータの準備
var sampleText = function() {
  this.message = "dat.guiのサンプル";
  this.color = "#ff0000";
  this.fontSize = 24;
  this.border = false;
  this.fontFamily = "sans-serif";
};

//GUI表示
window.onload = function() {
  text = new sampleText();
  setValue();
  var gui = new dat.GUI();
  gui.add(text, 'message').onChange(setValue);
  gui.addColor(text, 'color').onChange(setValue);
  gui.add(text, 'fontSize', 6, 48).onChange(setValue);
  gui.add(text, 'border').onChange(setValue);
  gui.add(text, 'fontFamily',["sans-serif", "serif", "cursive", "ＭＳ 明朝", "monospace"]).onChange(setValue);
};

//設定更新処理
function setValue() {
  data.innerHTML = text.message;
  data.style.color = text.color;
  data.style.fontSize = text.fontSize+"px";
  data.style.fontFamily = text.fontFamily;
  if(text.border) {
    data.style.border = "solid 1px black";
    data.style.padding = "10px";
  }
  else {
    data.style.border = "none";
    data.style.padding = "0px";
  }
}
*/
