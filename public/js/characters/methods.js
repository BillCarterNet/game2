import GameState from "../game/state.js";
import GameConfig from "../game/config.js";

// Internal methods for characters

const methods = {

    // Initialise enemy
    initEnemyObjectState: ( enemy, row, hex, name, enemyClass, scale, ) => {

        // Array initially empty first object in array
        GameState.enemies[ enemy ] = {};

        GameState.enemies[ enemy ].Model = enemy;
        GameState.enemies[ enemy ].Side = 'enemies';
        GameState.enemies[ enemy ].Row = row;
        GameState.enemies[ enemy ].Hex = hex;
        GameState.enemies[ enemy ].TurnPending = true;
        GameState.enemies[ enemy ].Name = name;
        GameState.enemies[ enemy ].Class = enemyClass;
        GameState.enemies[ enemy ].scale = scale;

    },

    initPlayerObjectState: ( player, row, hex, name, playerClass, scale, ) => {

        // Array initially empty first object in array
        GameState.players[ player ] = {};

        GameState.players[ player ].Model = player;
        GameState.players[ player ].Side = 'players';
        GameState.players[ player ].Row = row;
        GameState.players[ player ].Hex = hex;
        GameState.players[ player ].TurnPending = true;
        GameState.players[ player ].Name = name;
        GameState.players[ player ].Class = playerClass;
        GameState.players[ player ].scale = scale;

    },

    // Set base stats as per config values
    // Need template and name as we have many instances from template
    initEnemyBaseStats: ( enemyTemplate, enemyName ) => {

        if ( GameConfig.enemies[ enemyTemplate ] ) {

            GameState.enemies[ enemyName ].BaseStats = {};
            // Use template as basis and apply random variations
            Object.keys( GameConfig.enemies[ enemyTemplate ].BaseStats ).forEach( stat => {

                const randomVar = 1 - ( Math.random() - 0.5 ) * 50/100 // between +/- 25%
                const variedValueUnrounded = randomVar * GameConfig.enemies[ enemyTemplate ].BaseStats[ stat ];
                const variedValue = Math.round(variedValueUnrounded); // Nearest int
                GameState.enemies[ enemyName ].BaseStats[ stat ] = variedValue;

            });

        } else {

            console.log( `No template for ${ enemyTemplate } in GameConfig` );

        }

    },

    // Set base stats as per config values
    // Just need player as we have a model for each player
    initPlayerBaseStats: ( player ) => {

        if ( GameConfig.players[ player ] ) {

            GameState.players[ player ].BaseStats = {};
            Object.keys( GameConfig.players[ player ].BaseStats ).forEach( stat => {

                GameState.players[ player ].BaseStats[ stat ] = 
                    GameConfig.players[ player ].BaseStats[ stat ];

            });

        } else {

            console.log( `No record for ${ player } in GameConfig` );

        }

    },

    initEnemyItemStats: ( enemyTemplate, enemyName ) => {

        // Ultimately will need to scan enemies starting items and calculate modifications
        // For now just set everything to zero

        if ( !GameConfig.enemies[ enemyTemplate ] ) {

            console.log(`ERROR: No enemy template in game config for ${enemyTemplate}`);

        }

        if ( !GameState.enemies[ enemyName ] ) {

            console.log(`ERROR: No record in game state for ${enemyName}`)

        }       

        GameState.enemies[ enemyName ].ItemStats = {};
        Object.keys( GameConfig.enemies[ enemyTemplate ].BaseStats ).forEach( stat => {

            GameState.enemies[ enemyName ].ItemStats[ stat ] = 0;

        });

    },

    initPlayerItemStats: ( player ) => {

        // Ultimately will need to scan players starting items and calculate modifications
        // For now just set everything to zero

        if ( GameConfig.players[ player ] ) {        

            GameState.players[ player ].ItemStats = {};
            Object.keys( GameConfig.players[ player ].BaseStats ).forEach( stat => {

                GameState.players[ player ].ItemStats[ stat ] = 0;

            });

        } else {

            console.log( `No record for ${ player } in GameConfig` );

        }

    },

    initEnemyBuffStats: ( enemyTemplate, enemyName ) => {

        // Ultimately will need to scan enemy starting buffs (if any) and calculate modifications
        // For now just set everything to zero

        if ( !GameConfig.enemies[ enemyTemplate ] ) {

            console.log(`ERROR: No enemy template in game config for ${enemyTemplate}`);

        }

        if ( !GameState.enemies[ enemyName ] ) {

            console.log(`ERROR: No record in game state for ${enemyName}`)

        }       

        GameState.enemies[ enemyName ].BuffStats = {};
        Object.keys( GameConfig.enemies[ enemyTemplate ].BaseStats ).forEach( stat => {

            GameState.enemies[ enemyName ].BuffStats[ stat ] = 0;

        });

    },

    initPlayerBuffStats: ( player ) => {

        // Ultimately will need to scan players starting buffs (if any) and calculate modifications
        // For now just set everything to zero

        if ( GameConfig.players[ player ] ) {        

            GameState.players[ player ].BuffStats = {};
            Object.keys( GameConfig.players[ player ].BaseStats ).forEach( stat => {

                GameState.players[ player ].BuffStats[ stat ] = 0;

            });

        } else {

            console.log( `No record for ${ player } in GameConfig` );

        }

    },

    initEnemyDebuffStats: ( enemyTemplate, enemyName ) => {

        // Ultimately will need to scan enemies starting debuffs (if any) and calculate modifications
        // For now just set everything to zero

        if ( !GameConfig.enemies[ enemyTemplate ] ) {

            console.log(`ERROR: No enemy template in game config for ${enemyTemplate}`);

        }

        if ( !GameState.enemies[ enemyName ] ) {

            console.log(`ERROR: No record in game state for ${enemyName}`)

        }       

        GameState.enemies[ enemyName ].DebuffStats = {};
        Object.keys( GameConfig.enemies[ enemyTemplate ].BaseStats ).forEach( stat => {

            GameState.enemies[ enemyName ].DebuffStats[ stat ] = 0;

        });

    },

    initPlayerDebuffStats: ( player ) => {

        // Ultimately will need to scan players starting debuffs (if any) and calculate modifications
        // For now just set everything to zero

        if ( GameConfig.players[ player ] ) {        

            GameState.players[ player ].DebuffStats = {};
            Object.keys( GameConfig.players[ player ].BaseStats ).forEach( stat => {

                GameState.players[ player ].DebuffStats[ stat ] = 0;

            });

        } else {

            console.log( `No record for ${ player } in GameConfig` );

        }

    },

    initEnemyEnvironmentStats: ( enemyTemplate, enemyName ) => {

        // Ultimately will need to scan enemies starting debuffs (if any) and calculate modifications
        // For now just set everything to zero

        if ( !GameConfig.enemies[ enemyTemplate ] ) {

            console.log(`ERROR: No enemy template in game config for ${enemyTemplate}`);

        }

        if ( !GameState.enemies[ enemyName ] ) {

            console.log(`ERROR: No record in game state for ${enemyName}`)

        }       

        GameState.enemies[ enemyName ].EnvironmentStats = {};
        Object.keys( GameConfig.enemies[ enemyTemplate ].BaseStats ).forEach( stat => {

            GameState.enemies[ enemyName ].EnvironmentStats[ stat ] = 0;

        });

    },

    initPlayerEnvironmentStats: ( player ) => {

        // Ultimately will need to scan players starting positions and calculate modifications
        // For now just set everything to zero

        if ( GameConfig.players[ player ] ) {        

            GameState.players[ player ].EnvironmentStats = {};
            Object.keys( GameConfig.players[ player ].BaseStats ).forEach( stat => {

                GameState.players[ player ].EnvironmentStats[ stat ] = 0;

            });

        } else {

            console.log( `No record for ${ player } in GameConfig` );

        }

    },

    getStatsitcs: ( characterSide, characterName, statisticsType ) => {

        if ( !GameState[ characterSide ]) { console.log( `ERROR: No characterSide in GameState for [${characterSide}]` ); }
    
        if ( !GameState[ characterSide ][ characterName ]) { console.log( `ERROR: No characterName in GameState for [${characterName}]` ); }
    
        switch ( statisticsType ) {
    
            case 'BaseStats':
            case 'ItemStats':
            case 'BuffStats':
            case 'DebuffStats':
            case 'EnvironmentStats':
            case 'CurrentStats':
            break;
            default:
                console.log(`ERROR: [${statisticsType}] is not a valid statstics type`);
            break;
    
        }
    
        return GameState[ characterSide ][ characterName ][ statisticsType ];
    
    },

    getTurnOrder: () => {

        const playersAndEnemies = [];
        Object.keys( GameState.players ).forEach( player => {

            playersAndEnemies.push( GameState.players[ player ] );

        });
        Object.keys( GameState.enemies ).forEach( enemy => {

            playersAndEnemies.push( GameState.enemies[ enemy ] );

        });

        // What happens here when players and enemies have the same int
        return playersAndEnemies.sort( ( a, b ) => {

            return b.BaseStats.Initiative - a.BaseStats.Initiative;

        });

    },

    getHighestInitiativeCharacterPendingTurn: () => {

        let nextCharacter = 'none';
        let nextSide = 'none';
        let characterInitiative = - 1;

        const allCharacters = [];
        Object.keys(GameState.players).forEach( player => { allCharacters.push( GameState.players[ player ] ) });
        Object.keys(GameState.enemies).forEach( enemy => { allCharacters.push( GameState.enemies[ enemy ] ) });

        allCharacters.forEach( character => {

            if ( character.TurnPending ) {

                if ( character.CurrentStats.Initiative > characterInitiative ) {

                    nextCharacter = character.Model;
                    nextSide = character.Side;
                    characterInitiative = character.CurrentStats.Initiative;

                }

            }

        });

        if ( nextCharacter === 'none' || nextSide === 'none' || characterInitiative === -1) {

            throw new Error( 'ERROR: [methods.getHighestInitiativeCharacterPendingTurn()]: We have not found a character' );

        }

        return {

            character: nextCharacter,
            side: nextSide,
            initiative: characterInitiative,

        };

    },

    haveAllCharactersBeen: () => {

        let result = true;

        Object.keys( GameState.players ).forEach( player => { if ( GameState.players[ player ].TurnPending ) { result = false; } });
        Object.keys( GameState.enemies ).forEach( enemy => { if ( GameState.enemies[ enemy ].TurnPending ) { result = false; } });

        return result;

    },

    setAllCharactersToPending: () => {

        Object.keys( GameState.players ).forEach( player => { GameState.players[ player ].TurnPending = true; });
        Object.keys( GameState.enemies ).forEach( enemy => { GameState.enemies[ enemy ].TurnPending = true; });

    },

};

export default methods;