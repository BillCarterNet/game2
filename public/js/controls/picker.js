// want mouse hover to highlight any playable cell
// want mouse touch to select that playable cell

// https://r105.threejsfundamentals.org/threejs/lessons/threejs-picking.html

// Probably need to pass in
// normalizedPosition, scene, camera, time
import * as THREE from '/build/three.module.js';
import GameCamera from '../game/camera.js';
import GameState from '../game/state.js';

// Getting 'Info' div in js hands
//const canvas = document.getElementById('canvasContainer');
//console.log(canvas);
let canvasX = 0;
let canvasY = 0;
let canvasWidth = 0;
let canvasHeight = 0;
// Initial position outside canvas
let normalX = -2;
let normalY = -2;
let intersectedObject = '';
// Element the mouse is over
let element;

// Creating function that will tell the position of cursor
// PageX and PageY will getting position values and show them in P
const getMouseInfo = ( p ) => {

  const canvas = document.getElementById( 'canvasContainer' );
  canvasX = p.pageX;
  canvasY = p.pageY;
  canvasWidth = canvas.offsetWidth;
  canvasHeight = canvas.offsetHeight;
  normalX = ( ( canvasX / canvasWidth ) * 2 ) - 1;
  normalY = ( ( canvasY / canvasHeight ) * -2 ) + 1;
  element = document.elementFromPoint( p.clientX, p.clientY );

}

window.addEventListener( 'mousemove', getMouseInfo, false );

const setTarget = () => {

    GameState.currentTargetGridId = GameState.currentPickedGridId;

}

const filterObjects = ( list ) => {

    let filteredList = [];
    list.forEach( item => {

        // We only want grid hexagons
        if ( 
            item.object.name.includes( 'hexagon' ) &&
            !item.object.name.includes( 'highlight' )
        ) {

            filteredList.push( item );

        }

    });
    return filteredList;

}

// Module
const picker = {

    getCanvasX: () => {

        return canvasX;

    },
    
    getCanvasY: () => {

        return canvasY;

    },

    getNormalX: () => {

        return normalX.toFixed( 2 );

    },

    getNormalY: () => {

        return normalY.toFixed( 2 );

    },

    getCanvasWidth: () => {

        return canvasWidth;

    },

    getCanvasHeight: () => {

        return canvasHeight;

    },

    getIntersectedObjects: ( scene ) => {

        const raycaster = new THREE.Raycaster();

        raycaster.setFromCamera(
            { x: normalX, y: normalY }, 
            GameCamera.getCamera()
        );

        // get the list of objects the ray intersected
        const intersectedObjects = raycaster.intersectObjects( scene.children );

        // Process those objects
        if ( intersectedObjects.length ) {

            const filteredList = filterObjects( intersectedObjects );
            let names = ``;
            filteredList.forEach( item => {

                names = `${names} ${item.object.name}`;

            });

            if ( !filteredList[ 0 ].object.name.includes( 'wall' ) ) {

                intersectedObject = filteredList[ 0 ].object.name;

            } else {

                intersectedObject = 'No visible hexagon';

            }

        }
    
    },

    getIntersectedObject: () => {

        return intersectedObject;

    },

    getElement: () => {

        return element;

    },

    getTarget: () => {

        document.getElementById( 'draggableArea' ).onclick = setTarget;

    },

}

export default picker;