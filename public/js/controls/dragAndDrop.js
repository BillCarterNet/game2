// https://stackoverflow.com/questions/6230834/html5-drag-and-drop-anywhere-on-the-screen
// TODO - Tidy formatting of code

const dragAndDrop = {

    process: () => {

        // Get all draggable elements
        const draggables = document.querySelectorAll( '.draggable' );

        // Set dragover listener for draggable area (document body)
        document.body.addEventListener(
            'dragover',
            ( event ) => {

                event.preventDefault();
                return false; 

            },
            false,
        );

        // Set drop listener for draggable area (document body)
        document.body.addEventListener(
            'drop',
            ( event ) => {

                const offset = event.dataTransfer.getData( "text/plain" ).split( ',' );
                const dm = document.querySelector('.dragging');
                dm.style.left = ( event.clientX + parseInt( offset[ 0 ], 10 ) ) + 'px';
                dm.style.top = ( event.clientY + parseInt( offset[ 1 ], 10 ) ) + 'px';
                dm.classList.remove( 'dragging' );
                dm.style.background = 'rgba(0, 0, 0, 0.75)';
                event.preventDefault();
                return false;

            },
            false,
        )

        // Set event listeners for draggable elements
        draggables.forEach( draggable => {

            draggable.addEventListener( 
                'dragstart', 
                ( event ) => {

                    const style = window.getComputedStyle( event.target, null );
                    event.dataTransfer.setData(
                        "text/plain",
                        ( parseInt( style.getPropertyValue( "left" ), 10 ) - event.clientX ) + 
                        ',' + 
                        ( parseInt( style.getPropertyValue( "top" ), 10 ) - event.clientY )
                    );
                    draggable.classList.add( 'dragging' );
                    draggable.style.background = 'rgba(0, 0, 0, 1.0)';

                }, 
                false, 
            );

        });

    }

}

export default dragAndDrop;