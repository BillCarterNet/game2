// TODO
// Sort out duplication in init and update methods

import Css from './css.js';
import Html from './html.js';
import GameConfig from '../../game/config.js';
import GameState from '../../game/state.js';
import Helper from '../../assets/helper.js';

const playerBackground = Helper.hexToRGBA( 
    GameConfig.colours.player, 
    GameConfig.opacity, 
);
const enemyBackground = Helper.hexToRGBA( 
    GameConfig.colours.enemy, 
    GameConfig.opacity, 
);

const playerStatsHeadings = [ 'STATS' ];
const playerStatsInfo = [];
Object.keys( GameConfig.stats ).forEach( stat => {

    playerStatsHeadings.push( GameConfig.stats[stat].displayName );
    playerStatsInfo.push( {
        fullName: GameConfig.stats[stat].fullName,
        displayName: GameConfig.stats[stat].displayName,
        attrition: GameConfig.stats[stat].attrition,
    } );

});

const html = () => {

    const draggableArea = document.getElementById( 'draggableArea' );

    // Container
    const playerStatsContainer = document.createElement( 'div' );
    playerStatsContainer.setAttribute( 'id', 'playerStatsContainer' );
    playerStatsContainer.setAttribute( 'draggable', 'true' );
    playerStatsContainer.classList.add( 'draggable' );
    playerStatsContainer.hidden = true;

    // Heading
    const playerStatHeadingContainer = document.createElement( 'div' );
    playerStatHeadingContainer.setAttribute( 'id', 'playerStatHeadingContainer' );
    const playerStatsHeading = document.createElement( 'h1' );
    playerStatsHeading.setAttribute( 'id', 'playerStatsHeading' );
    playerStatsHeading.innerText = 'Stats';
    playerStatHeadingContainer.appendChild( playerStatsHeading );
    playerStatsContainer.appendChild( playerStatHeadingContainer );

    // Table
    const playerStatsTable = Html.createTable( 
        null, 
        'playerStatsTable', 
        GameConfig.statModifiers.length, 
        playerStatsHeadings.length, 
        playerStatsHeadings 
    );
    playerStatsContainer.appendChild( playerStatsTable );
    draggableArea.appendChild( playerStatsContainer );

}

const css = () => {

    Css.addRule( '#playerStatsContainer', 'position: absolute;' );
    Css.addRule( '#playerStatsContainer', 'top: 1%;' );
    Css.addRule( '#playerStatsContainer', 'left: 21%;' );
    Css.addRule( '#playerStatsContainer', 'font-size: 12px;' );

    Css.addRule( '#playerStatsContainer', 'border: 2px solid #d3d3d3;' );
    Css.addRule( '#playerStatsContainer', 'color: white;' );
    Css.addRule( '#playerStatsContainer', 'text-align: center;' );
    Css.addRule( '#playerStatsContainer', 'background: rgba(0, 0, 0, 0.75);' );

    Css.addRule( '#playerStatsTable th', 'width: 25px;' );
    Css.addRule( '#playerStatsTable, th, td', 'border: 1px solid grey' );
    Css.addRule( '#playerStatsTable, th, td', 'border-collapse: collapse' );
    Css.addRule( '#playerStatsTable, th, td', 'padding: 2px 4px 2px 4px' );

    Css.addRule( '#playerStatHeadingContainer', 'display: -webkit-flex;' );
    Css.addRule( '#playerStatHeadingContainer', 'display: flex;' );
    Css.addRule( '#playerStatHeadingContainer', 'align-items: center;' );
    Css.addRule( '#playerStatHeadingContainer', 'justify-content: center;' );
    Css.addRule( '#playerStatHeadingContainer h1', 'font-size: 18px;' );

}

// Dont call until player models are loaded and players initialised
const updatePlayerStatsTable = () => {

    // Heading 
    const playerStatsHeading = document.getElementById( 'playerStatsHeading' );
    playerStatsHeading.innerText = `${ GameState[ GameState.currentSide ][ GameState.currentCharacter ].Name } Stats`;
    const playerStatHeadingContainer = document.getElementById( 'playerStatHeadingContainer' );
    if ( GameState.currentSide === 'players' ) { playerStatHeadingContainer.style[ 'background-color' ] = playerBackground; }
    if ( GameState.currentSide === 'enemies' ) { playerStatHeadingContainer.style[ 'background-color' ] = enemyBackground; }

    // This will be used to populate the table
    // Each row will have an array
    // The first element will be The row name as it is displayed in the table
    // The subsequent elements will be the row values (html in a string) for each stat
    const playerStatsData = {

        BaseStats: [ 'Base' ],
        ItemStats: [ 'Items' ],
        BuffStats: [ 'Buffs' ],
        DebuffStats: [ 'Debuffs' ],
        EnvironmentStats: [ 'Environment' ],
        CurrentStats: [ 'Current' ],

    };

    // Get the Stats values into playerStatsData
    Object.keys( playerStatsData ).forEach( row => {

        //console.log( `row [${row}]`)
        playerStatsInfo.forEach ( stat => {

            //console.log( `stat [${stat.fullName}]`)
            const statValue = GameState[ GameState.currentSide ][ GameState.currentCharacter ][ row ][ stat.fullName ];

            // Prepare entry

            // Is it zero?
            if ( statValue === 0 ) { // Zero

                // Is it BaseStats row or CurrentStats row (display it)
                if ( row === 'BaseStats' || row === 'CurrentStats' ) {

                    // Add entry to playerStatsData
                    playerStatsData[ row ].push( statValue.toString() );

                } else {

                    // Display as blank
                    playerStatsData[ row ].push( ' ' );

                }

            } else { // None Zero
 
                // Is it CurrentStats and Attrition stat
                if ( row === 'CurrentStats' && stat.attrition ) {

                    const fraction = `${statValue.current} / ${statValue.max}`;
                    playerStatsData[ row ].push( fraction );

                } else {

                    playerStatsData[ row ].push( statValue.toString() );

                }

            }

        });

    });

    // Set values in the html table
    let rowIndex = 0;
    Object.keys( playerStatsData ).forEach( row => {
        
        for ( let i = 0; i < playerStatsHeadings.length; i++ ) {

            const td = document.getElementById( `playerStatsTable_row_${rowIndex}_col_${i}` );
            td.innerHTML = playerStatsData[ row ][ i ];

        }
        rowIndex++;

    });

}

// Module
const playerStats = {

    init: () => {

        html();
        css();

    },

    update: () => {

        updatePlayerStatsTable();

    },

}

export default playerStats;