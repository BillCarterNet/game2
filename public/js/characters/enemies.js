// Three
import * as THREE from '/build/three.module.js';
import * as SkeletonUtils from '../../../jsm/utils/SkeletonUtils.js';

// Internal
import ModelLoader from '../assets/modelLoader.js';
import AnimationLoader from '../assets/animationLoader.js';
import Grid from '../grid/grid.js';
import GameState from '../game/state.js';
import GameConfig from '../game/config.js';
import Methods from './methods.js';
import methods from './methods.js';



// Store for player models and other things
const enemyObjects = [];

// Private
const getStatsitcs = ( enemyName, statisticsType ) => {

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

    if ( Object.keys( GameState.enemies ).includes( enemyName ) ) {

        return GameState.enemies[ enemyName ][ statisticsType ];

    } else {

        console.log( `Error getting [${ statisticsType }] for [${ enemyName }]` );

    }

};
const setCurrentStatistics = ( enemyName ) => {

    GameState.enemies[ enemyName ].CurrentStats = {};

    Object.keys( GameState.enemies[ enemyName ].BaseStats ).forEach( stat => {

        GameState.enemies[ enemyName ].CurrentStats[stat] = 
            GameState.enemies[ enemyName ].BaseStats[stat] +
            GameState.enemies[ enemyName ].ItemStats[stat] +
            GameState.enemies[ enemyName ].BuffStats[stat] +
            GameState.enemies[ enemyName ].DebuffStats[stat] +
            GameState.enemies[ enemyName ].EnvironmentStats[stat];

    });

}

// Module

const enemies = {

    addToScene: ( scene ) => {

        // Need to make sure not called before models are loaded (handled in code.js)
        const enemyModels = ModelLoader.getEnemies();
        
        // DEBUG
        console.log(`We have ${enemyModels.length} enemy models`);

        // Populate objects and add animation mixers
        enemyModels.forEach(enemyModel => {

            enemyObjects.push({
                model: enemyModel,
                mixer: new THREE.AnimationMixer( enemyModel )
            });
        
        });

        // Deal with multiple instances of models
        // I.e. currently we just load a skeleton model (need to fix so it can be animated)
        // But we want 4 enemies
        for(let i = 0; i < 3; i++) {

            const clonedSkeleton = SkeletonUtils.clone(enemyModels[0]);
            clonedSkeleton.name = `${enemyModels[0].name}${i + 2}`;
            enemyObjects.push({
                model: clonedSkeleton,
                mixer: new THREE.AnimationMixer( clonedSkeleton )
            });

        }

        let gridCoOrdinates;

        enemyObjects.forEach( object => {

            switch( object.model.name ) {

                case 'Skeleton':

                    Methods.initEnemyObjectState( 
                        object.model.name, 
                        9, 
                        7, 
                        'Opardin',
                        'Warrior',
                        { x: 0.02, y: 0.02, z: 0.02 },
                    );
                    Methods.initEnemyBaseStats(
                        'Skeleton',
                        object.model.name,
                    );
                    const skeletonAnimation = AnimationLoader.getAnimationByName( 'Idle4' );

                    // MODEL NOTES

                    // Also seems to disappear when animated
                    //object.mixer.clipAction(skeletonAnimation.animations[0]).play();

                break;

                case 'Skeleton2':

                    Methods.initEnemyObjectState( 
                        object.model.name, 
                        10, 
                        8, 
                        'Nogoryo',
                        'Warrior',
                        { x: 0.02, y: 0.02, z: 0.02 },
                    );
                    Methods.initEnemyBaseStats(
                        'Skeleton',
                        object.model.name,
                    );
                    const skeleton2Animation = AnimationLoader.getAnimationByName( 'Idle4' );

                    // MODEL NOTES

                    // Also seems to disappear when animated
                    //object.mixer.clipAction(skeletonAnimation.animations[0]).play();

                break;

                case 'Skeleton3':

                    Methods.initEnemyObjectState( 
                        object.model.name, 
                        10, 
                        6, 
                        'Crixus',
                        'Warrior',
                        { x: 0.02, y: 0.02, z: 0.02 },
                    );
                    Methods.initEnemyBaseStats(
                        'Skeleton',
                        object.model.name,
                    );
                    const skeleton3Animation = AnimationLoader.getAnimationByName( 'Idle4' );

                    // MODEL NOTES

                    // Also seems to disappear when animated
                    //object.mixer.clipAction(skeletonAnimation.animations[0]).play();

                break;

                case 'Skeleton4':

                    Methods.initEnemyObjectState( 
                        object.model.name, 
                        11, 
                        7, 
                        'Krakarth',
                        'Mage',
                        { x: 0.02, y: 0.02, z: 0.02 },
                    );
                    Methods.initEnemyBaseStats(
                        'Skeleton',
                        object.model.name,
                    );
                    const skeleton4Animation = AnimationLoader.getAnimationByName( 'Idle4' );

                    // MODEL NOTES

                    // Also seems to disappear when animated
                    //object.mixer.clipAction(skeletonAnimation.animations[0]).play();

                break;

            }

            // Common set up to all enemies
            Methods.initEnemyItemStats( 'Skeleton', object.model.name );
            Methods.initEnemyBuffStats( 'Skeleton', object.model.name );
            Methods.initEnemyDebuffStats( 'Skeleton', object.model.name );
            Methods.initEnemyEnvironmentStats( 'Skeleton', object.model.name );
            //setCurrentStatistics( object.model.name );
            Methods.setCurrentStatistics( object.model.name, 'enemies' );

            // Get co-ordinates based on grid position
            gridCoOrdinates = Grid.getHexCentre( 
                GameState.enemies[ object.model.name ].Row, 
                GameState.enemies[ object.model.name ].Hex,
            );

            // Set model position based on co-ordinates
            object.model.position.set( 
                gridCoOrdinates.x, 
                gridCoOrdinates.y, 
                gridCoOrdinates.z 
            );

            // Scale model according to state (i.e. set up above)
            object.model.scale.set( 
                GameState.enemies[ object.model.name ].scale.x, 
                GameState.enemies[ object.model.name ].scale.y, 
                GameState.enemies[ object.model.name ].scale.z, 
            );

            // DEBUG
            console.log( `Adding ${object.model.name} to scene` );

            // Add 3D model to scene
            scene.add( object.model );

        });

        // DEBUG
        console.log('GameState enemies');
        console.log(GameState.enemies);

    },

    update: ( delta ) => {

        // Update animations
        enemyObjects.forEach(object => {

            object.mixer.update( delta );

        });

    },

    getCurrentStats: ( enemyName ) => {

        // Could maybe call setCurrentStatistics() here for good measure
        return getStatsitcs( enemyName, 'CurrentStats' );

    },

}

export default enemies;