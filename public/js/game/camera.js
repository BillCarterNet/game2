// Three
import * as THREE from '/build/three.module.js';

// Game
import GameConfig from './config.js';
import gameConfig from './config.js';

const camera = new THREE.PerspectiveCamera(

    GameConfig.camera.fov, // fov
    window.innerWidth / window.innerHeight, // aspect ratio
    GameConfig.camera.nearClip, // near clipping plane
    GameConfig.camera.farClip // far clipping plane

);

// Initial Config
camera.position.x = GameConfig.camera.xStart;
camera.position.y = GameConfig.camera.height;
camera.position.z = GameConfig.camera.zStart;
camera.lookForward = GameConfig.camera.lookForward;

// Angle between z axis and where the camera is looking in the xz plane
// I.e. 0 is looking straight ahead along the z axis
camera.xzAngle = 0;

// How quickly the camera moves/rotates (write into game config later)
camera.moveFactor = 0.5;
camera.rotateFactor = 0.5;
camera.zoomFactor = 0.5;

camera.matrixAutoUpdate = true;

/*

Main vectors in use:

CP - the position of the camera
CG - Directly underneath the camera, on the ground
LA - where the camera is looking
LAP - Perpendicular to where ther camera is looking

Some interesting values:

lf - lookforward 
ch - camera height

These form triangle that governs the angle the camera look at the XZ plane

This diagram is in the XZ plane (looking down at the ground from from above)

                                O           \
                                 +---------- X
                 lf * sin a      |          /
                 _____. LA       |
                |    /           |
                |   /           \|/ Z  Comes out of screen
   lf * cos a   |__/   lf
                | / a    
             CP ./________________             LA = x = CPx + lf * sin a
                |\/ a |                           = y = CPy
                | \   | lf * sin a                = z = CPz - lf * cos a
                |  \  |
                |   \ |
                |____\. LAP                   LAP = x = CPx + lf cos a
                                                  = y = CPy
                lf * cos a                        = z = CPz + lf sin a

So the dot product of LA and LAP should be zero

If I want to move from CP along the line joining CP and LA I must find the vector CP -> LA and add it to CP

CP -> LA  = -CP + LA
CP -> LAP = -CP + LAP

This is diagram perpendicular to the XZ plane

             CP ./________________            
                |\/ a |                  
                | \   |              
             ch |  \  |
                |   \ |
             CG .____\. LA 
                
                  lf

*/


const getLookAtVector = () => {

    return new THREE.Vector3(

        camera.position.x + camera.lookForward * Math.sin( camera.xzAngle ),
        0,
        camera.position.z - camera.lookForward * Math.cos( camera.xzAngle ),

    );

}

const getLookAtPerp = () => {

    // This should be perpendicular to the LookAtVect (relative to CP)
    return new THREE.Vector3(

        camera.position.x + camera.lookForward * Math.cos( camera.xzAngle ),
        0,
        camera.position.z + camera.lookForward * Math.sin( camera.xzAngle ),

    );

}

const getCameraGroundVector = () => {

    // This is in the XZ plane with the look at vector
    return new THREE.Vector3(

        camera.position.x,
        0,
        camera.position.z,

    );

}

const getCameraVector = () => {

    return new THREE.Vector3(

        camera.position.x,
        camera.position.y,
        camera.position.z,

    );

}

const getMoveSidewaysVector = () => {

    return new THREE.Vector3().addVectors(
        getCameraGroundVector().multiplyScalar( -1 ), 
        getLookAtPerp()
    );

}

const getMoveForwardVector = () => {

    return new THREE.Vector3().addVectors(
        getCameraGroundVector().multiplyScalar( -1 ), 
        getLookAtVector()
    );

}

const getZoomVector = () => {

    return new THREE.Vector3().addVectors(
        getCameraVector().multiplyScalar( -1 ),
        getLookAtVector()
    );

}



const gameCamera = {

    moveAlongFrontVector: ( direction ) => {

        // +ve direction is forward
        const deltaVector = getMoveForwardVector().multiplyScalar( camera.moveFactor * direction );
        const postitionVector = getCameraVector();
        const newPosition = new THREE.Vector3().addVectors( postitionVector, deltaVector );
        camera.position.x = newPosition.x;
        camera.position.y = newPosition.y;
        camera.position.z = newPosition.z;

    },

    moveAlongSideVector: ( direction ) => {

        // +ve direction if rightward
        const deltaVector = getMoveSidewaysVector().multiplyScalar( camera.moveFactor * direction );
        camera.position.x += deltaVector.x;
        camera.position.y += deltaVector.y;
        camera.position.z += deltaVector.z;

    },

    zoom: ( direction ) => {

        // +ve direction is zoom in
        const deltaVector = getZoomVector().multiplyScalar( camera.zoomFactor * direction );
        const postitionVector = getCameraVector();
        const newPosition = new THREE.Vector3().addVectors( postitionVector, deltaVector );
        camera.position.x = newPosition.x;
        camera.position.y = newPosition.y;
        camera.position.z = newPosition.z;
        const vector = getLookAtVector();
        camera.lookAt( vector );

    },

    rotateCamera: ( angle ) => {

        // +ve is closkwise
        camera.xzAngle += camera.rotateFactor * angle;
        const vector = getLookAtVector();
        camera.lookAt( vector );

    },

    getCameraXZAngle: () => {

        return camera.xzAngle;

    },

    init: () => {

        camera.position.x = GameConfig.camera.xStart;
        camera.position.y = GameConfig.camera.height;
        camera.position.z = GameConfig.camera.zStart;
        camera.lookForward = gameConfig.camera.lookForward;

    },

    getPosVector: () => {

        return new THREE.Vector3(

            camera.position.x,
            camera.position.y,
            camera.position.z,

        );

    },

    movePosVector: ( x, y ,z ) => {

        camera.position.x += x;
        camera.position.y += y;
        camera.position.z += z;

    },

    getLookAtVector: () => {

        return getLookAtVector();

    },

    getLookAtPVector: () => {

        return getLookAtPerp();

    },

    setLookAtVector: () => {

        const vector = getLookAtVector();
        camera.lookAt( vector );

    },

    render: ( renderer, scene ) => {

        renderer.render( scene, camera );

    },

    getXYCoords: ( position ) => {

        camera.updateMatrixWorld();
        let vector = position.project( camera );
        vector.x = ( vector.x + 1 ) / 2 * window.innerWidth;
        vector.y = -( vector.y - 1 ) / 2 * window.innerHeight;
        return vector;

    },

    getCanvasXY: () => {



    },

    setAspect: ( aspect ) => {

        camera.aspect = aspect;

    },

    updateProjectionMatrix: () => {

        camera.updateProjectionMatrix();

    },

    getCamera: () => {

        return camera;

    }
}

export default gameCamera;