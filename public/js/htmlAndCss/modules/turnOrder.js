import Css from './css.js';
import Html from './html.js';
import GameConfig from '../../game/config.js';
import GameState from '../../game/state.js';
import Players from '../../characters/players.js';
import Methods from '../../characters/methods.js';
import Helper from '../../assets/helper.js';

const playerBackground = Helper.hexToRGBA( 
    GameConfig.colours.player, 
    GameConfig.opacity, 
);
const enemyBackground = Helper.hexToRGBA( 
    GameConfig.colours.enemy, 
    GameConfig.opacity, 
);
const activeBackground = Helper.hexToRGBA( 
    GameConfig.colours.active, 
    GameConfig.opacity, 
);

const html = () => {

    const draggableArea = document.getElementById( 'draggableArea' );

    // Container
    const turnOrderContainer = document.createElement( 'div' );
    turnOrderContainer.setAttribute( 'id', 'turnOrderContainer' );
    turnOrderContainer.setAttribute( 'draggable', 'true' );
    turnOrderContainer.classList.add( 'draggable' );
    turnOrderContainer.hidden = true;

    // Heading
    const turnOrderHeading = document.createElement( 'h1' );
    turnOrderHeading.setAttribute( 'id', 'turnOrderHeading' );
    turnOrderHeading.innerText = 'Turn [] Order';
    turnOrderContainer.appendChild( turnOrderHeading );

    // Table Container
    const turnOrderTableContainer = document.createElement( 'div' );
    turnOrderTableContainer.setAttribute( 'id', 'turnOrderTableContainer' );
    turnOrderContainer.appendChild( turnOrderTableContainer );

    // Add
    draggableArea.appendChild( turnOrderContainer );

}

const css = () => {

    Css.addRule( '#turnOrderContainer', 'position: absolute;' );
    Css.addRule( '#turnOrderContainer', 'top: 1%;' );
    Css.addRule( '#turnOrderContainer', 'left: 1%;' );
    Css.addRule( '#turnOrderContainer', 'font-size: 12px;' );

    Css.addRule( '#turnOrderContainer', 'border: 2px solid #d3d3d3;' );
    Css.addRule( '#turnOrderContainer', 'color: white;' );
    Css.addRule( '#turnOrderContainer', 'text-align: center;' );
    Css.addRule( '#turnOrderContainer', 'background: rgba(0, 0, 0, 0.75);' );

    Css.addRule( '#turnOrderTable, th, td', 'border: 1px solid grey' );
    Css.addRule( '#turnOrderTable, th, td', 'border-collapse: collapse' );
    Css.addRule( '#turnOrderTable, th, td', 'padding: 2px 4px 2px 4px' );

}

// Module
const turnOrder = {

    init: () => {

        html();
        css();

    },

    update: () => {

        const turnOrderHeading = document.getElementById( 'turnOrderHeading' );
        turnOrderHeading.innerText = `Turn ${GameState.turn} Order`;
        const turnOrderTableContainer = document.getElementById( 'turnOrderTableContainer' );
        const headings = [ 'Name', 'Class', 'Init', 'Turn' ];
        const characters = Methods.getTurnOrder();
        const table = Html.createTable( null, 'turnOrderTable', characters.length, headings.length, headings );
        turnOrderTableContainer.innerHTML = null;
        turnOrderTableContainer.appendChild( table );
        for ( let row = 0 ; row < characters.length ; row++ ) { // Table row

            let background;
            switch ( characters[row].Side ) {

                case 'player':
                    background = playerBackground;
                break;
                case 'enemy':
                    background = enemyBackground;
                break;

            }
            for ( let col = 0 ; col < headings.length ; col++ ) { // Table col

                const td = document.getElementById( `turnOrderTable_row_${row}_col_${col}` );
                td.style.background = background;
                switch ( col ) {

                    case 0:
                        td.innerText = characters[row].Name;
                    break;
                    case 1:
                        td.innerText = characters[row].Class;
                    break;
                    case 2:
                        td.innerText = characters[row].CurrentStats.Initiative;
                    break;
                    case 3:
                        if ( characters[row].TurnPending ) { td.innerText = 'Pending'; } 
                        else { td.innerText = 'Been'; }
                        if ( GameState.currentPlayer === characters[row].Model ) { 
                            
                            td.innerText = 'Active';
                            td.style.background = activeBackground; 
                        
                        }
                    break;

                }

            }

        }

    },

}

export default turnOrder;