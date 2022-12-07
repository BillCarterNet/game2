import Css from './css.js';
import Html from './html.js';
import GameCamera from '../../game/camera.js';
import GameState from '../../game/state.js';
import Picker from '../../controls/picker.js';

//import process from '/modules/process';
//import process from 'node:process';
//import process from '../../../../node_modules/process';
//import process from './process';
//const process = require('process');

const countNodes = ( element = document.body ) => {
    let count = 0; let child = element.firstElementChild;    
    while ( child ) { count += countNodes(child);
        if ( child.shadowRoot ) { count += countNodes( child.shadowRoot ); }
        child = child.nextElementSibling; count++;
    } 
    return count;
}

const updateDebugValues = ( renderer ) => {

    Html.writeElementValue( 'camera_row_0_col_0', 'Position' );
    Html.writeElementValue( 'camera_row_0_col_1', GameCamera.getPosVector().x.toFixed( 2 ).toString() );
    Html.writeElementValue( 'camera_row_0_col_2', GameCamera.getPosVector().y.toFixed( 2 ).toString() );
    Html.writeElementValue( 'camera_row_0_col_3', GameCamera.getPosVector().z.toFixed( 2 ).toString() );

    Html.writeElementValue( 'camera_row_1_col_0', 'Look At' );
    Html.writeElementValue( 'camera_row_1_col_1', GameCamera.getLookAtVector().x.toFixed( 2 ).toString() );
    Html.writeElementValue( 'camera_row_1_col_2', GameCamera.getLookAtVector().y.toFixed( 2 ).toString() );
    Html.writeElementValue( 'camera_row_1_col_3', GameCamera.getLookAtVector().z.toFixed( 2 ).toString() );

    Html.writeElementValue( 'camera_row_2_col_0', 'Look At P' );
    Html.writeElementValue( 'camera_row_2_col_1', GameCamera.getLookAtPVector().x.toFixed( 2 ).toString() );
    Html.writeElementValue( 'camera_row_2_col_2', GameCamera.getLookAtPVector().y.toFixed( 2 ).toString() );
    Html.writeElementValue( 'camera_row_2_col_3', GameCamera.getLookAtPVector().z.toFixed( 2 ).toString() );

    Html.writeElementValue( 'mouse_row_0_col_0', 'Canvas-Pos' );
    Html.writeElementValue( 'mouse_row_0_col_1', Picker.getCanvasX() );
    Html.writeElementValue( 'mouse_row_0_col_2', Picker.getCanvasY() );

    Html.writeElementValue( 'mouse_row_1_col_0', 'Canvas-Size' );
    Html.writeElementValue( 'mouse_row_1_col_1', Picker.getCanvasWidth() );
    Html.writeElementValue( 'mouse_row_1_col_2', Picker.getCanvasHeight() );

    Html.writeElementValue( 'mouse_row_2_col_0', 'Normalised' );
    Html.writeElementValue( 'mouse_row_2_col_1', Picker.getNormalX() );
    Html.writeElementValue( 'mouse_row_2_col_2', Picker.getNormalY() );

    Html.writeElementValue( 'performance_row_0_col_0', GameState.frame );
    Html.writeElementValue( 'performance_row_0_col_1', GameState.gameTime.toFixed(1).toString() );
    Html.writeElementValue( 'performance_row_0_col_2', GameState.gameTimeDelta.toFixed(6).toString() );

    Html.writeElementValue( 'hexagon_row_0_col_0', Picker.getIntersectedObject() );

    Html.writeElementValue( 'element_row_0_col_0', Picker.getElement() ? Picker.getElement().id : 'None' );

    //Html.writeElementValue( 'dom_row_0_col_0', document.getElementsByTagName('*').length );
    Html.writeElementValue( 'dom_row_0_col_0', countNodes() );

    Html.writeElementValue( 'memory_row_0_col_0', renderer.info.memory.geometries );
    Html.writeElementValue( 'memory_row_0_col_1', renderer.info.memory.textures );

    Html.writeElementValue( 'render_row_0_col_0', renderer.info.render.calls );
    Html.writeElementValue( 'render_row_0_col_1', renderer.info.render.triangles );
    Html.writeElementValue( 'render_row_0_col_2', renderer.info.render.points );
    Html.writeElementValue( 'render_row_0_col_3', renderer.info.render.lines );
    Html.writeElementValue( 'render_row_0_col_4', renderer.info.render.frame );

}

const html = () => {

    // Container 1

    const debugContainer = document.createElement( 'div' );
    debugContainer.setAttribute( 'id', 'debugContainer' );
    document.body.appendChild( debugContainer );
    
    const title = document.createElement( 'h1' );
    title.innerText = 'GAME DEBUG';
    debugContainer.appendChild( title );

    const headingsCamera = [ 'VECTOR', 'X', 'Y', 'Z', ];
    const cameraTable = Html.createTable( 'CAMERA', 'camera', 3, headingsCamera.length, headingsCamera );
    cameraTable.setAttribute( 'class', 'debugTable' );
    debugContainer.appendChild( cameraTable );

    const headingPerformance = [ 'FRAME', 'TIME (s)', 'DELTA (s)', ];
    const performanceTable = Html.createTable( 'PERFORMANCE', 'performance', 1, headingPerformance.length, headingPerformance );
    debugContainer.appendChild( performanceTable );

    const mouseHeadings = [ 'Ordinate', 'X', 'Y', ];
    const mouseTable = Html.createTable( 'MOUSE', 'mouse', 3, mouseHeadings.length, mouseHeadings );
    debugContainer.appendChild( mouseTable );

    const hexHeading = [ 'Picked Hexagon' ]
    const hexTable = Html.createTable( 'HEXAGON', 'hexagon', 1, hexHeading.length, hexHeading );
    debugContainer.appendChild( hexTable );

    const elHeading = [ 'Over Element' ]
    const elTable = Html.createTable( 'MOUSEOVER', 'element', 1, elHeading.length, elHeading );
    debugContainer.appendChild( elTable );

    // Container 2

    const debugContainer2 = document.createElement( 'div' );
    debugContainer2.setAttribute( 'id', 'debugContainer2' );
    document.body.appendChild( debugContainer2 );

    const title2 = document.createElement( 'h1' );
    title2.innerText = 'MORE DEBUG';
    debugContainer2.appendChild( title2 );

    const domHeading = [ 'Element Count' ]
    const domTable = Html.createTable( 'DOM', 'dom', 1, domHeading.length, domHeading );
    debugContainer2.appendChild( domTable );

    const memoryHeadings = [ 'Geometries', 'Textures', ];
    const memoryTable = Html.createTable( 'MEMORY', 'memory', 1, memoryHeadings.length, memoryHeadings );
    debugContainer2.appendChild( memoryTable );

    const renderHeadings = [ 'Calls', 'Triangles', 'Points', 'Lines', 'Frame' ];
    const renderTable = Html.createTable( 'RENDER', 'render', 1, renderHeadings.length, renderHeadings );
    debugContainer2.appendChild( renderTable );

}

const css = () => {

    // CSS

    Css.addRule( '#debugContainer', 'position: absolute;' );
    Css.addRule( '#debugContainer', 'bottom: 1%;' );
    Css.addRule( '#debugContainer', 'right: 1%;' );
    Css.addRule( '#debugContainer', 'font-size: 10px;' );
    Css.addRule( '#debugContainer', 'padding: 5px;' );

    Css.addRule( '#debugContainer2', 'position: absolute;' );
    Css.addRule( '#debugContainer2', 'bottom: 1%;' );
    Css.addRule( '#debugContainer2', 'right: 20%;' );
    Css.addRule( '#debugContainer2', 'font-size: 10px;' );
    Css.addRule( '#debugContainer2', 'padding: 5px;' );

    Css.addRule( '.table', 'align: center' );
    Css.addRule( '.table', 'width: 100%;' );
    Css.addRule( '.table', 'text-align: center;' );

    Css.addRule( 'h2', 'margin-top: 2px;' );
    Css.addRule( 'h2', 'margin-bottom: 5px;' );

    Css.addRule( '#debugContainer', 'border: 2px solid #d3d3d3;' );
    Css.addRule( '#debugContainer', 'color: white;' );
    Css.addRule( '#debugContainer', 'text-align: center;' );
    Css.addRule( '#debugContainer', 'background: rgba(0, 0, 0, 0.75);' );

    Css.addRule( '#debugContainer2', 'border: 2px solid #d3d3d3;' );
    Css.addRule( '#debugContainer2', 'color: white;' );
    Css.addRule( '#debugContainer2', 'text-align: center;' );
    Css.addRule( '#debugContainer2', 'background: rgba(0, 0, 0, 0.75);' );

}

const setUpDebug = {

    init: () => {

        html();
        css();

    },

    update: ( renderer ) => {

        updateDebugValues( renderer );

    }

}

export default setUpDebug;