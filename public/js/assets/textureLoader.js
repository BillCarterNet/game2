import * as THREE from '/build/three.module.js';

const pathFolders = [
    'images',
    'textures',
    'ProcessedTextures',
];

const textureFolders = [
    'Wall',
    'Floor',
];

const typeFolders = [
    'Ambient',
    'Base',
    'Height',
    'Normal',
    'Rough',
];

const files = [
    'image_part_001.png'
];
for ( let i = 0; i < 9; i++ ) {

    files.push( `image_part_00${i+1}.png` );

}

const buildTextureInfoList = () => {

    const list = [];

    // For each texture
    textureFolders.forEach( textureF => {

        // For each type
        typeFolders.forEach( typeF => {

            // For each file
            files.forEach( file => {

                const path = 
                    `../${pathFolders[0]}/${pathFolders[1]}/${pathFolders[2]}/` +
                    `${textureF}/${typeF}/${file}`;
                const name = 
                    `${textureF}_${typeF}_${file.substring(11,14)}`;

                list.push({
                    name: name,
                    path: path,
                });

            });

        });

    });

    return list;

}

// Programatically generated texture info list
const textureInfoList = buildTextureInfoList();

// Hard Coded texture info
const texturePathList = [
    {
        name: 'Rock_047_BaseColor',
        path: '../images/textures/Rock_047_SD/Rock_047_BaseColor.jpg'
    },
    {
        name: 'Rock_047_AmbientOcclusion',
        path: '../images/textures/Rock_047_SD/Rock_047_AmbientOcclusion.jpg',
    },
    {
        name: 'Rock_047_Height',
        path: '../images/textures/Rock_047_SD/Rock_047_Height.png',
    },
    {
        name: 'Rock_047_Normal',
        path: '../images/textures/Rock_047_SD/Rock_047_Normal.jpg',
    },
    {
        name: 'Rock_047_Roughness',
        path: '../images/textures/Rock_047_SD/Rock_047_Roughness.jpg',
    },
    {
        name: 'Fire',
        path: '../images/textures/Fire.png',
    }
];

const numberOfTextures = texturePathList.length + textureInfoList.length;

let currentProgress = 0; // Percentage complete
let textures = [];

const getName = ( path ) => {

    // OLD
    // E.g. path http://localhost:8081/images/textures/Rock_047_SD/Rock_047_Normal.jpg
    // E.g. name Rock_047_Normal

    //console.log(`Looking for name of ${path}`);

    // NEW
    const start = path.indexOf( 'image' );
    const pathToMatch = `../${path.substring( start )}`;
    const textureInfo = textureInfoList.find(x => x.path === pathToMatch);

    let name;

    if ( textureInfo ) {

        name = textureInfo.name;

    } else {

        name = path.substring(
            path.lastIndexOf( '/' ) + 1,
            path.lastIndexOf( '.' )
        );

    }

    //console.log(`Name = [${name}]`);

    return name;

}

// Called when the texture has loaded
const onLoad = ( texture ) => {

    // console.log( `texture has loaded` );
    // console.log( texture.source.data.currentSrc );
    // Set the name property
    texture.name = getName( texture.source.data.currentSrc );
    textures.push( texture );

}

// Called during load
const onProgress = ( xhr ) => {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    currentProgress += ( xhr.loaded / xhr.total * 100 ) / numberOfTextures;

};

// Function called when download errors
const onError = ( xhr ) => {

    console.log( 'An error happened' );

};
  
const loader = new THREE.TextureLoader();

// Module

const textureLoader = {

    loadTextures: () => {

        texturePathList.forEach( texture => {

            loader.load( texture.path, onLoad, onProgress, onError );

        });

        textureInfoList.forEach(texture => {

            loader.load( texture.path, onLoad, onProgress, onError );

        });

    },

    getProgress: () => {

        return currentProgress;

    },

    getTexture: ( i ) => {

        return textures[ i ];

    },

    getTextures: () => {

        return textures;

    },

    getTextureByName: ( name ) => {

        return textures.find( x => x.name === name );

    },

    getTexturesLoaded: () => {

        return textures.length;

    },

    getTextureLoadStatus: () => {

        let status = false;
        if ( textures.length === numberOfTextures ) {

            status = true;

        }
        return status;

    }

};

export default textureLoader;