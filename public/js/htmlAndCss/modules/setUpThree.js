import Css from './css.js';
import Html from './html.js';

const html = () => {

    // HTML

    const canvasContainer = document.createElement( 'div' );
    canvasContainer.setAttribute( 'id', 'canvasContainer' )
    document.body.appendChild( canvasContainer );

    const threeDebugContainer = document.createElement( 'div' );
    threeDebugContainer.setAttribute( 'id', 'threeDebugContainer' );
    const threeDebugTable = Html.createTable( 'THREE JS DEBUG', 'threeJsDebug', 1, 2, [ 'STATS', 'DATGUI' ] );
    threeDebugContainer.append( threeDebugTable );
    document.body.appendChild( threeDebugContainer );

    const statsContainer = document.createElement( 'div' );
    statsContainer.setAttribute( 'id', 'statsContainer' );
    const td1 = document.getElementById( 'threeJsDebug_row_0_col_0' );
    td1.appendChild( statsContainer );
    
    const stats = document.getElementById( 'statsContainer' ).children[ 0 ];
    // console.log( 'stats' );
    // console.log( stats );
    //stats.setAttribute( 'id', 'stats' );

    const datContainer = document.createElement( 'div' );
    datContainer.setAttribute( 'id', 'datContainer' );
    const td2 = document.getElementById( 'threeJsDebug_row_0_col_1' );
    td2.appendChild( datContainer );

    const draggableArea = document.createElement( 'div' );
    draggableArea.setAttribute( 'id', 'draggableArea' );
    canvasContainer.appendChild( draggableArea );

}

const css = () => {

    // CSS

    Css.addRule( '#canvasContainer', 'position: absolute;' );
    Css.addRule( '#canvasContainer', 'top: 0;' );
    Css.addRule( '#canvasContainer', 'left: 0;' );
    Css.addRule( '#canvasContainer', 'right: 0;' );
    Css.addRule( '#canvasContainer', 'bottom: 0;' );

    Css.addRule( '#threeDebugContainer', 'position: absolute;' );
    Css.addRule( '#threeDebugContainer', 'top: 1%;' );
    Css.addRule( '#threeDebugContainer', 'right: 1%;' );

    Css.addRule( '#statsContainer', 'left: 1%;' );
    Css.addRule( '#statsContainer', 'bottom: 1.5%;' );
    Css.addRule( '#statsContainer', 'width: 80px;' ); // Seems to be default size
    Css.addRule( '#statsContainer', 'height: 100px;' ); // Seems to be default size

    Css.addRule( '#threeDebugContainer', 'border: 2px solid #d3d3d3;' );
    Css.addRule( '#threeDebugContainer', 'color: white;' );
    Css.addRule( '#threeDebugContainer', 'text-align: center;' );
    Css.addRule( '#threeDebugContainer', 'background: rgba(0, 0, 0, 0.75);' );

    Css.addRule( '#threeJsDebug_row_0_col_0', 'width: 100px' );
    Css.addRule( '#threeJsDebug_row_0_col_0', 'text-align: center;' );
    Css.addRule( '#threeJsDebug_row_0_col_0', 'padding-left: 20px' );

    Css.addRule( '#threeJsDebug_row_0_col_1', 'width: 80px' );
    Css.addRule( '#threeJsDebug_row_0_col_1', 'padding-bottom: 20px' );
    Css.addRule( '#threeJsDebug_row_0_col_1', 'padding-right: 20px' );
    Css.addRule( '#threeJsDebug_row_0_col_1', 'text-align: center;' );

    Css.addRule( '#draggableArea', 'position: absolute;' );
    Css.addRule( '#draggableArea', 'left: 250px' );
    Css.addRule( '#draggableArea', 'top: 2%' );
    Css.addRule( '#draggableArea', 'bottom: 2%' );
    Css.addRule( '#draggableArea', 'right: 1%' );

}

const setUpThree = {

    init: () => {

        html();
        css();

    }

}

export default setUpThree;