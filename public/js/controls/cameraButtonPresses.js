import GameCamera from '../game/camera.js';

const cameraButtonPresses = {

    process: () => {

        // Get the HTML elements
        const turnLeft = document.getElementById( 'cursorButtonTurnLeft' );
        const forward = document.getElementById( 'cursorButtonForward' );
        const turnRight = document.getElementById( 'cursorButtonTurnRight' );
        const zoomIn = document.getElementById( 'zoomInButton' );
        const left = document.getElementById( 'cursorButtonLeft' );
        const backward = document.getElementById( 'cursorButtonBackward' );
        const right = document.getElementById( 'cursorButtonRight' );
        const zoomOut = document.getElementById( 'zoomOutButton' );

        // TURN LEFT
        turnLeft.onmousedown = () => {

            turnLeft.style.filter = 'invert(0%)';
            GameCamera.rotateCamera( -0.1 );

        };
        turnLeft.onmouseup = () => {

            turnLeft.style.filter = 'invert(100%)';

        };

        // FORWARD
        forward.onmousedown = () => {

            forward.style.filter = 'invert(0%)';
            GameCamera.moveAlongFrontVector( 0.1 );
        
        };
        forward.onmouseup = () => {
        
            forward.style.filter = 'invert(100%)';
        
        };

        // TURN RIGHT
        turnRight.onmousedown = () => {

            turnRight.style.filter = 'invert(0%)';
            GameCamera.rotateCamera( 0.1 ) ;

        };
        turnRight.onmouseup = () => {

            turnRight.style.filter = 'invert(100%)';

        };

        // ZOOM IN
        zoomIn.onmousedown = () => {

            zoomIn.style.filter = 'invert(0%)';
            GameCamera.zoom( 0.1 ) ;

        };
        zoomIn.onmouseup = () => {

            zoomIn.style.filter = 'invert(100%)';

        };

        // LEFT
        left.onmousedown = () => {

            left.style.filter = 'invert(0%)';
            GameCamera.moveAlongSideVector( -0.1 );

        };
        left.onmouseup = () => {

            left.style.filter = 'invert(100%)';

        };

        // BACKWARDS
        backward.onmousedown = () => {

            backward.style.filter = 'invert(0%)';
            GameCamera.moveAlongFrontVector( -0.1 );

        };
        backward.onmouseup = () => {

            backward.style.filter = 'invert(100%)';

        };

        // MOVE RIGHT
        right.onmousedown = () => {

            right.style.filter = 'invert(0%)';
            GameCamera.moveAlongSideVector( 0.1 );

        };
        right.onmouseup = () => {

            right.style.filter = 'invert(100%)';

        };

        // ZOOM OUT
        zoomOut.onmousedown = () => {

            zoomOut.style.filter = 'invert(0%)';
            GameCamera.zoom( -0.1 ) ;

        };
        zoomOut.onmouseup = () => {

            zoomOut.style.filter = 'invert(100%)';

        };

    }

}

export default cameraButtonPresses;