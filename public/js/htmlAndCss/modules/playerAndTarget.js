import Css from './css.js';
import Html from './html.js';
import GameState from '../../game/state.js';
import GameConfig from '../../game/config.js';
import Grid from '../../grid/grid.js';
import Helper from '../../assets/helper.js';

// CSS constants
const playerAndTargetContainerWidthInPx = 230;
const playerAndTargetContainerHeightInPx = 575;
const statLabelWidthInPx = 40; 
const statValueWidthInPx = 175;
const playerBackground = Helper.hexToRGBA( 
    GameConfig.colours.player, 
    GameConfig.opacity, 
);
const enemyBackground = Helper.hexToRGBA( 
    GameConfig.colours.enemy, 
    GameConfig.opacity, 
);

/**
 * 
 * @param {int} value Number of values (coloured)
 * @param {int} maxValue Number of possible values (blank)
 * @param {string} id 
 */
const insertValue = ( value, maxValue, id ) => {

    const valueContainer = document.getElementById( id );
    valueContainer.innerHTML = null;
    const ul = document.createElement( 'ul' );
    ul.setAttribute( 'class', 'valueUl' );
    valueContainer.appendChild( ul );

    const blockWidth = statValueWidthInPx / maxValue;

    for( let i = 0; i < maxValue; i++ ) {

        const block = document.createElement( 'li' );
        block.setAttribute( 'class', 'block' );
        ul.appendChild( block );
        // Add some CSS too
        block.style.left = (i * blockWidth + statLabelWidthInPx + 5) + 'px';
        block.style.width = `${blockWidth}px`;
        if ( i < value ) {

            block.style.background = 'blue';

        } 

    }

}

const createStatHtml = ( stat, type ) => {

    const labels = {
        'actionPoint': 'AP',
        'health': 'Health',
        'buffs': 'Buffs',
        'debuffs': 'Debuffs',
    }

    const statContainer = document.createElement( 'div' );
    statContainer.setAttribute( 'id', `${stat}Container_${type}` );
    statContainer.setAttribute( 'class', 'innerPlayerAndTargetContainer' );

    const statLabel = document.createElement( 'div' );
    statLabel.setAttribute( 'id', `${stat}Label_${type}` );
    statLabel.setAttribute( 'class', 'innerPlayerAndTargetLabel' );

    const innerStatLabel = document.createElement( 'div' );
    innerStatLabel.setAttribute( 'id', `inner_${stat}Label_${type}` );
    innerStatLabel.setAttribute( 'class', 'innerInnerPlayerAndTargetLabel' );
    statLabel.appendChild( innerStatLabel );
    innerStatLabel.innerText = labels[ stat ];
    statContainer.appendChild( statLabel );

    const statValue = document.createElement( 'div' );
    statValue.setAttribute( 'id', `${stat}Value_${type}` );
    statValue.setAttribute( 'class', 'innerPlayerAndTargetValue' );
    statContainer.appendChild( statValue );

    switch( type ) {

        case 'player':
            playerContainer.appendChild( statContainer );
        break;
        case 'target':
            targetContainer.appendChild( statContainer );
        break;

    }

    insertValue( 4, 10, `${stat}Value_${type}` );

}

const html = () => {

    // Main Container

    const canvasContainer = document.getElementById( 'canvasContainer' );
    const playerAndTargetContainer = document.createElement( 'div' );
    playerAndTargetContainer.setAttribute( 'id', 'playerAndTargetContainer' );
    canvasContainer.appendChild( playerAndTargetContainer );

    // Info

    const infoContainer = document.createElement( 'div' );
    infoContainer.setAttribute( 'id', 'infoContainer' );
    // infoContainer.setAttribute( 'class', 'playerAndTargetContainer' );
    const turnContainer = document.createElement( 'div' );
    turnContainer.setAttribute( 'id', 'turnContainer' );
    const turnLabel = document.createElement( 'div' );
    turnLabel.setAttribute( 'id', 'turnLabel' );
    turnLabel.innerText = 'Turn';
    const turnValue = document.createElement( 'div' );
    turnValue.setAttribute( 'id', 'turnValue' );
    turnValue.innerText = '1000';
    turnContainer.appendChild( turnLabel );
    turnContainer.appendChild( turnValue );
    infoContainer.appendChild( turnContainer );
    playerAndTargetContainer.appendChild( infoContainer );

    // Info buttons
    const infoButtonContainer = document.createElement( 'div' );
    infoButtonContainer.setAttribute( 'id', 'infoButtonContainer' );
    const infoTurnOrderButton = document.createElement( 'button' );
    infoTurnOrderButton.setAttribute( 'id', 'infoTurnOrderButton' );
    infoTurnOrderButton.setAttribute( 'class', 'playerButton' );
    infoTurnOrderButton.innerText = 'ORDER';
    infoButtonContainer.appendChild( infoTurnOrderButton );
    const infoSettingsButton = document.createElement( 'button' );
    infoSettingsButton.setAttribute( 'id', 'infoSettingsButton' );
    infoSettingsButton.setAttribute( 'class', 'playerButton' );
    infoSettingsButton.innerText = 'SETTINGS';
    infoButtonContainer.appendChild( infoSettingsButton );
    const infoConsoleButton = document.createElement( 'button' );
    infoConsoleButton.setAttribute( 'id', 'infoConsoleButton' );
    infoConsoleButton.setAttribute( 'class', 'playerButton' );
    infoConsoleButton.innerText = 'CONSOLE';
    infoButtonContainer.appendChild( infoConsoleButton );
    infoContainer.appendChild( infoButtonContainer );

    // Player; title, info container, name

    const playerTitle = document.createElement( 'h1' );
    playerTitle.setAttribute( 'id', 'playerTitle' );
    playerTitle.innerText = 'ACTIVE CHARACTER';
    playerAndTargetContainer.appendChild( playerTitle );

    const playerContainer = document.createElement( 'div' );
    playerContainer.setAttribute( 'id', 'playerContainer' );
    playerContainer.setAttribute( 'class', 'playerAndTargetContainer' );
    playerAndTargetContainer.appendChild( playerContainer );

    const playerNameContainer = document.createElement( 'div' );
    playerNameContainer.setAttribute( 'id', 'playerNameContainer' );
    playerNameContainer.setAttribute( 'class', 'innerPlayerAndTargetContainer' );
    const playerName = document.createElement( 'h2' );
    playerName.setAttribute( 'id', 'playerName' );
    playerName.innerText = GameState.players[ GameState.currentPlayer ].Name;
    playerNameContainer.appendChild( playerName );
    playerContainer.appendChild( playerNameContainer );

    // Target; title, info container, name

    const targetTitle = document.createElement( 'h1' );
    targetTitle.setAttribute( 'id', 'targetTitle' );
    targetTitle.innerText = 'TARGET';
    playerAndTargetContainer.appendChild( targetTitle );

    const targetContainer = document.createElement( 'div' );
    targetContainer.setAttribute( 'id', 'targetContainer' );
    targetContainer.setAttribute( 'class', 'playerAndTargetContainer' );
    playerAndTargetContainer.appendChild( targetContainer );

    const targetNameContainer = document.createElement( 'div' );
    targetNameContainer.setAttribute( 'id', 'targetNameContainer' );
    targetNameContainer.setAttribute( 'class', 'innerPlayerAndTargetContainer' );
    const targetName = document.createElement( 'h2' );
    targetName.setAttribute( 'id', 'targetName' );
    targetName.innerText = 'Empty Grid';
    targetNameContainer.appendChild( targetName );
    targetContainer.appendChild( targetNameContainer );

    createStatHtml( 'actionPoint', 'player' );
    createStatHtml( 'health', 'player' );
    createStatHtml( 'buffs', 'player' );
    createStatHtml( 'debuffs', 'player' );
    createStatHtml( 'actionPoint', 'target' );
    createStatHtml( 'health', 'target' );
    createStatHtml( 'buffs', 'target' );
    createStatHtml( 'debuffs', 'target' );

    // Buttons - Player

    const playerButtonContainer = document.createElement( 'div' );
    playerButtonContainer.setAttribute( 'id', 'playerButtonContainer' );
    const playerStatsButton = document.createElement( 'button' );
    playerStatsButton.setAttribute( 'id', 'playerStatsButton' );
    playerStatsButton.setAttribute( 'class', 'playerButton' );
    playerStatsButton.innerText = 'STATS';
    playerButtonContainer.appendChild( playerStatsButton );
    const playerItemsButton = document.createElement( 'button' );
    playerItemsButton.setAttribute( 'id', 'playerItemsButton' );
    playerItemsButton.setAttribute( 'class', 'playerButton' );
    playerItemsButton.innerText = 'ITEMS';
    playerButtonContainer.appendChild( playerItemsButton );
    const playerActionsButton = document.createElement( 'button' );
    playerActionsButton.setAttribute( 'id', 'playerActionsButton' );
    playerActionsButton.setAttribute( 'class', 'playerButton' );
    playerActionsButton.innerText = 'ACTIONS';
    playerButtonContainer.appendChild( playerActionsButton );
    playerContainer.appendChild( playerButtonContainer );

}

const css = () => { 

    // Turn Counter

    Css.addRule( '#infoContainer', 'border: 1px solid #d3d3d3;' );
    Css.addRule( '#infoContainer', 'margin: 4px;' );
    Css.addRule( '#infoContainer', 'height: 77px;' );
    Css.addRule( '#turnContainer', 'border: 1px solid #d3d3d3;' );
    Css.addRule( '#turnContainer', 'margin: 4px;' );
    Css.addRule( '#turnContainer', 'height: 24px;' );
    Css.addRule( '#turnContainer', 'display: flex;' );
    Css.addRule( '#turnContainer', 'font-size: 20px;' );
    Css.addRule( '#turnContainer', 'justify-content: center;' );
    Css.addRule( '#turnLabel', `width: 50%;` );
    Css.addRule( '#turnLabel', `left: 0;` );
    Css.addRule( '#turnLabel', 'height: 40px;' );
    Css.addRule( '#turnValue', `width: 50%;` );
    Css.addRule( '#turnValue', `right: 0;` );
    Css.addRule( '#turnValue', 'height: 40px;' );

    // Player Title

    Css.addRule( '#playerTitle', 'font-size: 14px;' );
    Css.addRule( '#playerTitle', `background: ${ 
        Helper.hexToRGBA( 
            GameConfig.colours.active, 
            GameConfig.opacity, 
        ) 
    }`); 
    Css.addRule( '#playerTitle', 'margin-left: 5px;' );
    Css.addRule( '#playerTitle', 'margin-right: 5px;' );
    Css.addRule( '#playerTitle', 'padding: 5px;' );
    Css.addRule( '#playerTitle', 'border: 1px solid #d3d3d3;' );

    // Player Name

    Css.addRule( '#playerName', 'font-size: 12px;' );
    Css.addRule( '#playerNameContainer', 'display: -webkit-flex;' );
    Css.addRule( '#playerNameContainer', 'display: flex;' );
    Css.addRule( '#playerNameContainer', 'align-items: center;' );
    Css.addRule( '#playerNameContainer', 'justify-content: center;' );

    Css.addRule( '#playerAndTargetContainer', 'position: absolute;' );
    Css.addRule( '#playerAndTargetContainer', 'top: 1.5%;' );
    Css.addRule( '#playerAndTargetContainer', 'left: 1%;' );
    Css.addRule( '#playerAndTargetContainer', 'font-size: 10px;' );
    Css.addRule( '#playerAndTargetContainer', `width: ${playerAndTargetContainerWidthInPx}px;` );
    Css.addRule( '#playerAndTargetContainer', `height: ${playerAndTargetContainerHeightInPx}px;` );
    Css.addRule( '#playerAndTargetContainer', 'border: 2px solid #d3d3d3;' );
    Css.addRule( '#playerAndTargetContainer', 'color: white;' );
    Css.addRule( '#playerAndTargetContainer', 'text-align: center;' );
    Css.addRule( '#playerAndTargetContainer', 'background: rgba(0, 0, 0, 0.75);' );

    Css.addRule( '.playerAndTargetContainer', 'border: 1px solid #d3d3d3;' );
    Css.addRule( '.playerAndTargetContainer', 'margin: 4px;' );
    Css.addRule( '.playerAndTargetContainer', 'height: 195px;' );

    // Player Stats

    Css.addRule( '.innerPlayerAndTargetContainer', 'border: 1px solid #d3d3d3;' );
    Css.addRule( '.innerPlayerAndTargetContainer', 'margin: 2px;' );
    Css.addRule( '.innerPlayerAndTargetContainer', 'height: 26px;' );
    Css.addRule( '.innerPlayerAndTargetContainer', 'display: -webkit-flex;' );
    Css.addRule( '.innerPlayerAndTargetContainer', 'display: flex;' );
    Css.addRule( '.innerPlayerAndTargetContainer', 'align-items: center;' );
    Css.addRule( '.innerPlayerAndTargetContainer', 'justify-content: center;' );

    // Player Stat Labels

    Css.addRule( '.innerPlayerAndTargetLabel', 'height: 26px;' );
    Css.addRule( '.innerPlayerAndTargetLabel', 'border-right: 1px solid #d3d3d3;' );
    Css.addRule( '.innerPlayerAndTargetLabel', `width: ${statLabelWidthInPx}px;` );
    Css.addRule( '.innerPlayerAndTargetLabel', 'height: 26px;' );
    Css.addRule( '.innerPlayerAndTargetLabel', 'display: inline-block;' );
    Css.addRule( '.innerPlayerAndTargetLabel', 'left: 0;' );
    Css.addRule( '.innerPlayerAndTargetLabel', 'text-align: center;' );

    // Css.addRule( '.innerInnerPlayerAndTargetLabel', 'display: table-cell;' );
    Css.addRule( '.innerInnerPlayerAndTargetLabel', 'text-align: center;' );
    Css.addRule( '.innerInnerPlayerAndTargetLabel', 'padding: 15% 0;' );

    // Player Stat Values

    Css.addRule( '.innerPlayerAndTargetValue', 'display: inline-block;' );
    Css.addRule( '.innerPlayerAndTargetValue', `width: ${statValueWidthInPx}px;` );
    Css.addRule( '.innerPlayerAndTargetValue', 'height: 26px;' );
    Css.addRule( '.innerPlayerAndTargetValue', 'right: 0;' );

    Css.addRule( '.valueUl', 'height: 26px' );
    Css.addRule( '.valueUl', 'margin: 0px;' );

    Css.addRule( '.block', 'position: absolute;' );
    Css.addRule( '.block', 'list-style: none;' );
    //Css.addRule( '.block', 'width: 15px;' );
    Css.addRule( '.block', 'height: 26px;' );
    Css.addRule( '.block', 'border-left: 1px solid #d3d3d3;' );
    Css.addRule( '.block', 'border-right: 1px solid #d3d3d3;' );
    Css.addRule( '.block', 'margin: 0px;' );

    // Buttons

    Css.addRule( '.playerButton', 'width: 33%' );
    Css.addRule( '.playerButton', 'height: 40px' );
    Css.addRule( '.playerButton', 'filter: invert(0%)' );
    Css.addRule( '.playerButton', 'font-size: 12px' );

    // Target Title

    Css.addRule( '#targetTitle', 'font-size: 14px;' );
    Css.addRule( '#targetTitle', `background: ${ 
        Helper.hexToRGBA( 
            GameConfig.colours.target, 
            GameConfig.opacity, 
        ) 
    }` ); 
    Css.addRule( '#targetTitle', 'margin-left: 5px;' );
    Css.addRule( '#targetTitle', 'margin-right: 5px;' );
    Css.addRule( '#targetTitle', 'padding: 5px;' );
    Css.addRule( '#targetTitle', 'border: 1px solid #d3d3d3;' );

    // Target Name

    Css.addRule( '#targetName', 'font-size: 12px;' );
    Css.addRule( '#targetNameContainer', 'display: -webkit-flex;' );
    Css.addRule( '#targetNameContainer', 'display: flex;' );
    Css.addRule( '#targetNameContainer', 'align-items: center;' );
    Css.addRule( '#targetNameContainer', 'justify-content: center;' );

}

const playerAndTarget = {

    init: () => {

        html();
        css();

    },

    update: () => {

        // UPDATE INFO
        const turnValue = document.getElementById( 'turnValue' );
        turnValue.innerText = GameState.turn;
        
        // UPDATE PLAYER
        const playerContainer = document.getElementById( 'playerContainer' );
        if ( GameState.playerSelected ) {

            playerContainer.hidden = false;
            playerName.innerText = 
                `${ GameState.players[ GameState.currentPlayer ].Name } ` + 
                `[${ GameState.players[ GameState.currentPlayer ].Class }] `;
            const playerNameContainer = document.getElementById( 'playerNameContainer' );
            playerNameContainer.style.background = playerBackground;
            //insertValue( 1, GameState.players[ GameState.currentPlayer ].BaseStats.ActionPoints, 'actionPointValue' );
            insertValue( 1, GameState.players[ GameState.currentPlayer ].BaseStats.ActionPoints, `actionPointValue_player` );

        } else {

            playerContainer.hidden = true;

        }

        // UPDATE TARGET
        const targetGridContent = Grid.getHexContent( '', '', GameState.currentTargetGridId );
        // Why this no work?
        const actionPointContainer_target = document.getElementById( 'actionPointContainer_target' );

        const targetName = document.getElementById( 'targetName' );
        targetName.innerText = targetGridContent.name;
        const targetNameContainer = document.getElementById( 'targetNameContainer' );

        switch ( targetGridContent.type ) {

            case 'player':

                targetContainer.hidden = false;
                const playerClass = Object.keys( GameState.players ).find( c => GameState.players[ c ].Name === targetGridContent.name);
                insertValue( 1, GameState.players[ playerClass ].BaseStats.ActionPoints, `actionPointValue_target` );
                targetName.innerText = `${targetGridContent.name} [${playerClass}]`;
                targetNameContainer.style.background = playerBackground;

            break;

            case 'enemy':

                targetContainer.hidden = false;
                const enemyModel = Object.keys( GameState.enemies ).find( m => GameState.enemies[ m ].Name === targetGridContent.name);
                insertValue( 1, GameState.enemies[ enemyModel ].BaseStats.ActionPoints, `actionPointValue_target` );
                targetName.innerText = `${targetGridContent.name} [${GameState.enemies[ enemyModel ].Class}]`;
                targetNameContainer.style.background = enemyBackground;

            break;

            case 'empty':

                targetContainer.hidden = true;

            break;

        }

    },

}

export default playerAndTarget;