// Three
import * as THREE from '/build/three.module.js';

const gameClock = new THREE.Clock();

const clock = {

    // start: () => {

    //     gameClock.start();

    // },

    getDelta: () => {

        //console.log(gameClock.getDelta());
        return gameClock.getDelta();

    }

}

export default clock;