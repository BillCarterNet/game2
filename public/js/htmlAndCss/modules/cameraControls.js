import Css from './css.js';

const html = () => {

    // Container

    const canvasContainer = document.getElementById( 'canvasContainer' );
    const cameraControls = document.createElement( 'cameraControls' );
    canvasContainer.appendChild( cameraControls );
    cameraControls.setAttribute( 'id', 'cameraControls' );
    cameraControls.setAttribute( 'hidden', 'true' );

    // Buttons

    const turnLeft = document.createElement( 'input' );
    const forward = document.createElement( 'input' );
    const turnRight = document.createElement( 'input' );
    const zoomIn = document.createElement( 'input' );
    const left = document.createElement( 'input' );
    const backward = document.createElement( 'input' );
    const right = document.createElement( 'input' );
    const zoomOut = document.createElement( 'input' );

    const buttons = [

        {
            name: 'turnLeft',
            element: turnLeft,
            path: '../../../images/buttons/camera/turnLeft.png',
            id: 'cursorButtonTurnLeft'
        },
        {
            name: 'forward',
            element: forward,
            path: '../../../images/buttons/camera/up.png',
            id: 'cursorButtonForward'
        },
        {
            name: 'turnRight',
            element: turnRight,
            path: '../../../images/buttons/camera/turnRight.png',
            id: 'cursorButtonTurnRight'
        },
        {
            name: 'zoomIn',
            element: zoomIn,
            path: '../../../images/buttons/camera/plus.png',
            id: 'zoomInButton'
        },
        {
            name: 'left',
            element: left,
            path: '../../../images/buttons/camera/left.png',
            id: 'cursorButtonLeft'
        },
        {
            name: 'backward',
            element: backward,
            path: '../../../images/buttons/camera/down.png',
            id: 'cursorButtonBackward'
        },
        {
            name: 'right',
            element: right,
            path: '../../../images/buttons/camera/right.png',
            id: 'cursorButtonRight'
        },
        {
            name: 'zoomOut',
            element: zoomOut,
            path: '../../../images/buttons/camera/minus.png',
            id: 'zoomOutButton'
        },

    ]

    buttons.forEach(button => {

        button.element.setAttribute( 'type', 'image' );
        button.element.setAttribute( 'src', button.path );
        button.element.setAttribute( 'class', 'cursorButton' );
        button.element.setAttribute( 'id', button.id );
        cameraControls.appendChild( button.element );

    });

}

const css = () => {

    Css.addRule( '#cameraControls', 'position: absolute;' );
    Css.addRule( '#cameraControls', 'bottom: 1.5%;' );
    Css.addRule( '#cameraControls', 'left: 1%;' );
    Css.addRule( '#cameraControls', 'width: 235px;' );
    Css.addRule( '#cameraControls', 'font-size: 10px;' );
    Css.addRule( '.cursorButton', 'width: 50px;' );
    Css.addRule( '.cursorButton', 'height: 50px;' );
    Css.addRule( '.cursorButton', 'background-color: white;' );
    Css.addRule( '.cursorButton', 'margin: 3px;' );
    Css.addRule( '.cursorButton', 'filter: invert(100%);' );
    Css.addRule( '.cursorButton', 'border: 1px solid black;' );

}

const setUpCameraControls = {

    init: () => {

        html();
        css();

    },

}

export default setUpCameraControls;