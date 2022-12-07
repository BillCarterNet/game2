// Three
import * as THREE from '/build/three.module.js';

// Internal
import ModelLoader from '../assets/modelLoader.js';
import AnimationLoader from '../assets/animationLoader.js';
import Grid from '../grid/grid.js';
import GameConfig from '../game/config.js';
import GameState from '../game/state.js';
import Methods from './methods.js';


// TODO
// Update switch statement so only different info is in it ( like ememies )

// Store for player models and other things
const playerObjects = [];
// These are more classes than names really
const playerNames = [
    'Archer',
    'Warrior',
    'Cleric',
    'Mage',
];

// Private
const getStatsitcs = ( playerName, statisticsType ) => {

    switch ( statisticsType ) {

        case 'BaseStats':
        case 'ItemStats':
        case 'BuffStats':
        case 'DebuffStats':
        case 'EnvironmentStats':
        case 'CurrentStats':
        break;
        default:
            console.log(`Error: ${statisticsType} is not a valid statstics type`);
        break;

    }

    if ( playerNames.includes( playerName ) ) {

        return GameState.players[ playerName ][ statisticsType ];

    } else {

        console.log( `Error getting [${statisticsType}] for [${ playerName }]` );

    }

};
const setCurrentStatistics = ( playerName ) => {

    GameState.players[ playerName ].CurrentStats = {};

    Object.keys( GameState.players[ playerName ].BaseStats ).forEach( stat => {

        GameState.players[ playerName ].CurrentStats[stat] = 
            GameState.players[ playerName ].BaseStats[stat] +
            GameState.players[ playerName ].ItemStats[stat] +
            GameState.players[ playerName ].BuffStats[stat] +
            GameState.players[ playerName ].DebuffStats[stat] +
            GameState.players[ playerName ].EnvironmentStats[stat];

    });

}

// Module

const players = {

    addToScene: ( scene ) => {

        // Need to make sure not called before models are loaded (handled in code.js)
        const playerModels = ModelLoader.getPlayers(); 
        console.log(`We have ${ playerModels.length } player models`);

        // Populate objects and add animation mixers
        playerModels.forEach(playerModel => {

            playerObjects.push({
                model: playerModel,
                mixer: new THREE.AnimationMixer( playerModel )
            });
        
        });

        let gridCoOrdinates;

        playerObjects.forEach( object => {

            // Specific player step up
            switch( object.model.name ) {

                case 'Archer':

                    Methods.initPlayerObjectState(
                        object.model.name,
                        GameConfig.players[ object.model.name ].startingGrid.Row,
                        GameConfig.players[ object.model.name ].startingGrid.Hex,
                        'Gargano',
                        'Archer',
                        GameConfig.players[ object.model.name ].scale,
                    )

                    // MODEL NOTES

                    // Disappears when animated due to duplicate vertex issue
                    // Maybe fix in Blender

                break;

                case 'Warrior':

                    Methods.initPlayerObjectState(
                        object.model.name,
                        GameConfig.players[ object.model.name ].startingGrid.Row,
                        GameConfig.players[ object.model.name ].startingGrid.Hex,
                        'Krogar',
                        'Warrior',
                        GameConfig.players[ object.model.name ].scale,
                    )

                    // Animate
                    const warriorAnimation = AnimationLoader.getAnimationByName('Idle4');
                    object.mixer.clipAction(warriorAnimation.animations[0]).play();

                break;

                case 'Cleric':

                    Methods.initPlayerObjectState(
                        object.model.name,
                        GameConfig.players[ object.model.name ].startingGrid.Row,
                        GameConfig.players[ object.model.name ].startingGrid.Hex,
                        'Paladeena',
                        'Cleric',
                        GameConfig.players[ object.model.name ].scale,
                    )

                    // Animate
                    // This is the only animation that seems to work, sometimes
                    const clericAnimation = AnimationLoader.getAnimationByName('Idle2');
                    const clericIdle = object.mixer.clipAction(clericAnimation.animations[0]);
                    clericIdle.play();

                break;

                case 'Mage':

                    Methods.initPlayerObjectState(
                        object.model.name,
                        GameConfig.players[ object.model.name ].startingGrid.Row,
                        GameConfig.players[ object.model.name ].startingGrid.Hex,
                        'Gothmog',
                        'Mage',
                        GameConfig.players[ object.model.name ].scale,
                    )

                    // Odd rotation and no T pose
                    object.model.rotation.y = - Math.PI / 3 * 1.8;

                    // MODEL NOTES

                    // Disappears maybe model is not rigged
                    // Maybe Fix in blender/mixamo?

                break;

            }

            // Common set up to all players

            // Init stats in game state
            Methods.initPlayerBaseStats( object.model.name );
            Methods.initPlayerItemStats( object.model.name );
            Methods.initPlayerBuffStats( object.model.name );
            Methods.initPlayerDebuffStats( object.model.name );
            Methods.initPlayerEnvironmentStats( object.model.name );
            //setCurrentStatistics( object.model.name );
            Methods.setCurrentStatistics( object.model.name, 'players' );

            // Shadows
            // Need to fix point shadows square (currently off in light source)
            object.model.traverse( child => {

                child.castShadow = true;

            });

            // Get co-ordinates based on grid position
            gridCoOrdinates = Grid.getHexCentre( 
                GameState.players[ object.model.name ].Row, 
                GameState.players[ object.model.name ].Hex,
            );

            // Set model position based on co-ordinates
            object.model.position.set( 
                gridCoOrdinates.x, 
                gridCoOrdinates.y, 
                gridCoOrdinates.z 
            );

            // Scale model according to config
            object.model.scale.set( 
                GameConfig.players[ object.model.name ].scale.x, 
                GameConfig.players[ object.model.name ].scale.y, 
                GameConfig.players[ object.model.name ].scale.z, 
            );

            // DEBUG
            console.log( `Adding ${object.model.name} to scene` );
            
            // Add 3D model to scene
            scene.add( object.model );

        });

        // DEBUG
        console.log('GameState players');
        console.log(GameState.players);

    },

    update: ( delta ) => {

        // Update animations
        playerObjects.forEach(object => {

            object.mixer.update( delta );

        });

    },

    getBaseStats: ( playerName ) => {

        return getStatsitcs( playerName, 'BaseStats' );

    },

    getItemStats: ( playerName ) => {

        return getStatsitcs( playerName, 'ItemStats' );

    },

    getBuffStats: ( playerName ) => {

        return getStatsitcs( playerName, 'BuffStats' );

    },

    getDebuffStats: ( playerName ) => {

        return getStatsitcs( playerName, 'DebuffStats' );

    },

    getEnvironmentStats: ( playerName ) => {

        return getStatsitcs( playerName, 'EnvironmentStats' );

    },

    getCurrentStats: ( playerName ) => {

        // Could maybe call setCurrentStatistics() here for good measure
        return getStatsitcs( playerName, 'CurrentStats' );

    },

    getHighestInitiativePlayerPendingTurn: () => {

        let nextPlayer = 'none';
        let playerInitiative = - 1;
        //console.log();
        Object.keys(GameState.players).forEach( player => {

            console.log(`Checking [${GameState.players[player].Name}]`);
            if ( GameState.players[player].TurnPending ) {

                // Ultimately needs to be current initiative
                if ( GameState.players[player].BaseStats.Initiative > playerInitiative ) {

                    nextPlayer = GameState.players[player].Class;
                    playerInitiative = GameState.players[player].BaseStats.Initiative;

                }

            }

        });
        return {
            player: nextPlayer,
            initiative: playerInitiative,
        };

    },

}

export default players;