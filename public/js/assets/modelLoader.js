import * as THREE from '/build/three.module.js';
import { FBXLoader } from '../../../jsm/loaders/FBXLoader.js';
const fbxLoader = new FBXLoader();

// https://www.youtube.com/watch?v=vz8H3tBbCJM

const pathFolders = [
    'models',
];

const typeFolders = [
    'players',
    'enemies',
];

const playerFiles = [
    {
        filename: 'erika_archer_bow_arrow.fbx',
        name: 'Archer',
    },
    {
        filename: 'Maria WProp J J Ong.fbx',
        name: 'Cleric',
    },
    {
        filename: 'frost-mage-wow.fbx',
        name: 'Mage',
    },
    {
        filename: 'Paladin WProp J Nordstrom.fbx',
        name: 'Warrior'
    },
];

const enemyFiles = [
    {
        filename: 'Skeleton.fbx',
        name: 'Skeleton',
    },
]

const playerModels = [];
const enemyModels = [];

const buildModelInfo = ( modelFiles, models, modelType ) => {

    const info = [];

    modelFiles.forEach( file => {

        let filePath;
        switch ( modelType ) {
            case 'player':
                filePath = `../${pathFolders[ 0 ]}/${typeFolders[ 0 ]}/${file.filename}`;
            break;
            case 'enemy':
                filePath = `../${pathFolders[ 0 ]}/${typeFolders[ 1 ]}/${file.filename}`;
            break;
        }

        info.push({
            path: filePath,
            // Custom load function that adds name to model once loaded
            load: ( model ) => {

                // DEBUG
                console.log( `${file.name} model has loaded` );

                // Name it
                model.name = file.name;

                // Add to our collection
                models.push( model );

            },
            progress: ( xhr ) => {

                //console.log( `${player.name} ${(( xhr.loaded / xhr.total ).toFixed( 3 ) * 100 )} + % loaded` );

            },
            error: ( xhr ) => {

                console.log( `An error occured loading the ${file.name} model`);
                console.log( xhr );

            }
        });

    });

    return info;

}

const playerModelInfo = buildModelInfo( playerFiles, playerModels, 'player' );
const enemyModelInfo = buildModelInfo( enemyFiles, enemyModels, 'enemy' );

// Module

const modelLoader = {

    loadPlayerModels: () => {

        playerModelInfo.forEach( info => {

            fbxLoader.load( info.path, info.load, info.progress, info.error );

        });

    },

    getPlayerModelLoadStatus: () => {

        let status = false;
        if ( playerModels.length === playerFiles.length ) {

            status = true;

        }
        return status;

    },

    getPlayers: () => {

        return playerModels;

    },

    loadEnemyModels: () => {

        enemyModelInfo.forEach( info => {

            fbxLoader.load( info.path, info.load, info.progress, info.error );

        });

    },

    getEnemyModelLoadStatus: () => {

        let status = false;
        if ( enemyModels.length === enemyFiles.length ) {

            status = true;

        }
        return status;

    },

    getEnemies: () => {

        return enemyModels;

    },

}

export default modelLoader;