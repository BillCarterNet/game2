import * as THREE from '/build/three.module.js';

const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.scale.set( 0.25, 0.25, 0.25 );

const movingObject = {

    AddToScene: ( scene ) => {

        scene.add( cube );

    },

    update: ( delta ) => {


        
    }

}