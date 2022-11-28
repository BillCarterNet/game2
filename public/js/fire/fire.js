import * as THREE from '/build/three.module.js';

import textureLoader from '../assets/textureLoader.js';

// var camera, scene, renderer;
// var mesh;
// var clock, controller, fire;

// init();

// https://codepen.io/sjcobb/pen/gmjVqb?editors=0010

//function init() {

    // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);
    // camera.position.z = 2;

    // scene = new THREE.Scene();

    // renderer = new THREE.WebGLRenderer();
    // renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );

    // var loader = new THREE.TextureLoader();
    // loader.crossOrigin = '';

    //var fireTex = loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/212131/Fire.png");
    const fireTexture = textureLoader.getTextureByName( `Fire` );

    const wireframeMat = new THREE.MeshBasicMaterial({
        color : new THREE.Color(0xffffff),
        wireframe : true
    });

    const fireThree = new THREE.Fire( fireTexture );

    const wireframe = new THREE.Mesh( fireThree.geometry, wireframeMat.clone() );
    fireThree.add( wireframe );
    wireframe.visible = true;
    wireframe.visible = false;
    
    console.log(fireThree);
    fireThree.position.set(0, 0, 0);
    fireThree.position.set(0, 0.25, 1.3);
    //scene.add(fireThree);

    //clock = new THREE.Clock();

    //window.addEventListener( 'resize', onWindowResize, false );

//}

// function onWindowResize() {

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize( window.innerWidth, window.innerHeight );

// }

// (function loop() {
//      requestAnimationFrame(loop);

//      var delta = clock.getDelta();

//      //var t = clock.elapsedTime * controller.speed;
//      var t = clock.elapsedTime;
//      fire.update(t);
     
//      renderer.render(scene, camera);
// })();

const fire = {

    addToScene: ( scene ) => {

        scene.add( fireThree );

    },

    update: () => {



    }
    
}

export default fire;