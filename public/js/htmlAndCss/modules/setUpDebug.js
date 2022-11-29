import Css from './css.js';
import Html from './html.js';
import GameCamera from '../../game/camera.js';
import GameState from '../../game/state.js';
import Picker from '../../controls/picker.js';

const updateDebugValues = () => {

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

}

const html = () => {

    // HTML

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

}

const css = () => {

    // CSS

    Css.addRule( '#debugContainer', 'position: absolute;' );
    Css.addRule( '#debugContainer', 'bottom: 1%;' );
    Css.addRule( '#debugContainer', 'right: 1%;' );
    Css.addRule( '#debugContainer', 'font-size: 10px;' );
    Css.addRule( '#debugContainer', 'padding: 5px;' );

    Css.addRule( '.table', 'align: center' );
    Css.addRule( '.table', 'width: 100%;' );
    Css.addRule( '.table', 'text-align: center;' );

    Css.addRule( 'h2', 'margin-top: 2px;' );
    Css.addRule( 'h2', 'margin-bottom: 5px;' );

    Css.addRule( '#debugContainer', 'border: 2px solid #d3d3d3;' );
    Css.addRule( '#debugContainer', 'color: white;' );
    Css.addRule( '#debugContainer', 'text-align: center;' );
    Css.addRule( '#debugContainer', 'background: rgba(0, 0, 0, 0.75);' );

}

const setUpDebug = {

    init: () => {

        html();
        css();

    },

    update: () => {

        updateDebugValues();

    }

}

export default setUpDebug;