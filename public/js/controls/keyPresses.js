import GameCamera from '../game/camera.js';
import GameState from '../game/state.js';

let keyPresses = {

    process: () => {

        document.onkeypress = ( e ) => {

            e = e || window.event;
            console.log('Key Pressed: e.which = ' + e.which);

            // CAMERA

            // is it 'q' (113)
            if ( e.which === 113 ) {

                GameCamera.rotateCamera( -0.1 );

            }

            // is it 'e' (101)
            if ( e.which === 101 ) {

                GameCamera.rotateCamera( 0.1 );

            }

            // a 97
            if ( e.which == 97 ) {

                GameCamera.moveAlongSideVector( -0.1 );

            }
            // d 100
            if ( e.which == 100 ) {

                GameCamera.moveAlongSideVector( 0.1 );

            }

            // w 119
            if ( e.which == 119 ) {

                GameCamera.moveAlongFrontVector( 0.1 );

            }

            // s 115
            if ( e.which == 115 ) {

                GameCamera.moveAlongFrontVector( -0.1 );

            }

            // DEBUG

            // is it 'f'
            if ( e.which === 102 ) {

                if ( GameState.debug ) {

                    GameState.debug = false;

                } else {

                    GameState.debug = true;

                }

                console.log( `GameState.debug ${GameState.debug}` );

            }

            // g 103
            if ( e.which == 103 ) {

                GameState.players[ GameState.currentPlayer ].TurnPending = false;
                console.log( `Flagging [${GameState.currentPlayer}] as TurnPending = false` );

            }

        };
        
        const log = ( event ) => {

            console.log( event.type );
            console.log( event.key );

        }

        window.addEventListener( "keyup", log );
        window.addEventListener( "keypress", log );
        window.addEventListener( "keydown", log );

    }
    
};

export default keyPresses;
