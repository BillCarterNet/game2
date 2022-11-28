// TODO
// Sort out duplication in init and update methods

import Css from './css.js';
import Html from './html.js';
import GameConfig from '../../game/config.js';
import GameState from '../../game/state.js';
import Players from '../../characters/players.js';

const playerStatsHeadings = [ 'STATS' ]
Object.keys( GameConfig.stats ).forEach( stat => {

    playerStatsHeadings.push( GameConfig.stats[stat].displayName );

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
    const playerStatsHeading = document.createElement( 'h1' );
    playerStatsHeading.setAttribute( 'id', 'playerStatsHeading' );
    playerStatsHeading.innerText = 'Stats';
    playerStatsContainer.appendChild( playerStatsHeading );

    // Table
    const playerStatsTable = Html.createTable( null, 'playerStatsTable', 6, playerStatsHeadings.length, playerStatsHeadings );
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

}

// Dont call until player models are loaded and players initialised
const updatePlayerStatsTable = () => {
    
    const playerStatsData = {
        baseValues: [ 'Base' ],
        itemModifiers: [ 'Items' ],
        buffModifiers: [ 'Buffs' ],
        debuffModifiers: [ 'Debuffs' ],
        environmentModifiers: [ 'Environment' ],
        current: [ 'Current' ],
    };

    // Heading 
    const playerStatsHeading = document.getElementById( 'playerStatsHeading' );
    playerStatsHeading.innerText = `${GameState.players[ GameState.currentPlayer ].Name} Stats`;

    // Base Values
    Object.keys( Players.getBaseStats( GameState.currentPlayer ) ).forEach( stat => {

        playerStatsData.baseValues.push( GameState.players[ GameState.currentPlayer ].BaseStats[ stat ] );

    });

    // Items
    Object.keys( Players.getItemStats( GameState.currentPlayer ) ).forEach( stat => {

        playerStatsData.itemModifiers.push( GameState.players[ GameState.currentPlayer ].ItemStats[ stat ] );

    });

    // Buff Modifiers
    Object.keys( Players.getBuffStats( GameState.currentPlayer ) ).forEach( stat => {

        playerStatsData.buffModifiers.push( GameState.players[ GameState.currentPlayer ].BuffStats[ stat ] );

    });

    // Debuff Modifiers
    Object.keys( Players.getDebuffStats( GameState.currentPlayer ) ).forEach( stat => {

        playerStatsData.debuffModifiers.push( GameState.players[ GameState.currentPlayer ].DebuffStats[ stat ] );

    });

    // Environment Modifiers
    Object.keys( Players.getEnvironmentStats( GameState.currentPlayer ) ).forEach( stat => {

        playerStatsData.environmentModifiers.push( GameState.players[ GameState.currentPlayer ].EnvironmentStats[ stat ] );

    });

    // Environment Modifiers
    Object.keys( Players.getCurrentStats( GameState.currentPlayer ) ).forEach( stat => {

        playerStatsData.current.push( GameState.players[ GameState.currentPlayer ].CurrentStats[ stat ] );

    });

    // Set values in the table
    let rowIndex = 0;
    Object.keys( playerStatsData ).forEach( row => {
        
        for ( let i = 0; i < playerStatsHeadings.length; i++ ) {

            const td = document.getElementById( `playerStatsTable_row_${rowIndex}_col_${i}` );
            if (
                ( playerStatsData[ row ][ i ] === 0) && 
                ( row !== 'baseValues' )
            ) {

                // Dont display zero's unless its the 'current' row
                if ( row !== 'current' ) {

                    td.innerText = '';
                    
                } else {

                    td.innerText = playerStatsData[ row ][ i ];

                }

            } else {

                // Display non zero value
                td.innerText = playerStatsData[ row ][ i ];

            }
    
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