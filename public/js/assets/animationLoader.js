import * as THREE from '/build/three.module.js';
import { FBXLoader } from '../../../jsm/loaders/FBXLoader.js';

const fbxLoader = new FBXLoader();


const pathFolders = [
    'models',
];

const typeFolders = [
    'animations',
];

const animationFiles = [
    {
        filename: 'Idle.fbx',
        name: 'Idle1',
    },
    {
        filename: 'Great Sword Idle.fbx',
        name: 'Idle2',
    },
    {
        filename: 'Unarmed Idle 01.fbx',
        name: 'Idle3',
    },
    {
        filename: 'Sword And Shield Idle.fbx',
        name: 'Idle4',
    },
    {
        filename: 'Chicken Dance.fbx',
        name: 'Chicken',
    },
];

const animations = [];
const mixers = [];

const buildAnimationInfo = () => {

    const info = [];

    animationFiles.forEach( animation => {

        info.push({
            path: `../${pathFolders[ 0 ]}/${typeFolders[ 0 ]}/${animation.filename}`,
            // Custom load function that adds name to model once loaded
            load: ( anim ) => {

                // DEBUG
                console.log( `${animation.name} animation has loaded` );

                anim.name = animation.name;
                animations.push( anim );

            },
            progress: ( xhr ) => {

                //console.log( `${animation.name} ${(( xhr.loaded / xhr.total ).toFixed( 3 ) * 100 )} + % loaded` );

            },
            error: ( xhr ) => {

                console.log( `An error occured loading the ${animation.name} model`);
                console.log( xhr );

            }
        });

    });

    return info;

}

const animationInfo = buildAnimationInfo();

// Module

const animationLoader = {

    loadAnimations: () => {

        animationInfo.forEach( info => {

            fbxLoader.load( info.path, info.load, info.progress, info.error );

        });

    },

    getAnimationLoadStatus: () => {

        let status = false;
        if ( animations.length === animationFiles.length ) {

            status = true;

        }
        return status;

    },

    getAnimationByName: ( name ) => {

        return animations.find( animation => animation.name === name );

    },

}

export default animationLoader;
