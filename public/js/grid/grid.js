import * as THREE from '/build/three.module.js';

import textureLoader from '../assets/textureLoader.js';
import Picker from '../controls/picker.js';
import GameState from '../game/state.js';
import GameConfig from '../game/config.js';

// import { VertexNormalsHelper } from '../../../jsm/helpers/VertexNormalsHelper.js';
//'/build/three/examples/jsm/helpers/VertexNormalsHelper';
// import { text3d } from './text3d.js';
// import { gameState } from '../game/state.js';

/*

TODO
- Seperate out hex, outline and wall creation into seperate functions
- Tidy wall creation function
    - Make walls 3a high
    - Make texture sections wrap correctly
- Add suitable spot lighte
    - Above PC / NPC
    - Torches on wall
    - Tie in with picking
- Fill hexes around walls
    - Fade out dependant on distance from wall
- Expand outlines for cell highlighting
- Re-add text label debug

*/

/*

Room
====

A room is part of a level
A room is a grid (rectangle) of hexagons
Some will be on and some will be off (as the room shape determines)

A grid at its most basic is a grid of dots 
Each potentially being a vertex (of 1, 2 or 3 hexagons) or the centre of a single hexagon
Each row of dots is offset by half the length of the side of a hexagon
Also every other row has one more dot to produce a grid like the one below

Hexagon Grid
============

Hexagon side length = a

| a |
| 2.5 * a  |
  ._ _.    .    ._ _.    .    ._ _.    .    ._ _.    .    ._ _.     Row 1,  14 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 2,  15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 3,  14 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 4,  15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 5,  14 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 6,  15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 7,  16 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 8,  15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 9,  14 dots
 /     \       /     \       /     \       /     \       /     \
/   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \   Row 10, 15 dots
\       /     \       /     \       /     \       /     \       /
 \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    Row 11, 14 dots

There are 11 rows of 14/15 dots results in the grid above
5 rows of 5 hexagon and 4 rows of 4 hexagons 
25 + 16 = 42 hexagons in total

Some facts about hexagons
=========================

If the side is lenth a
And remembering that the hexagon is 6 equilateral triangles
We can draw this diagram

    /|
 a / | X
  /__|

   a/2

By pythagorus

a^2 = (a/2)^2 + x^2
X^2 = a^2 - (a^2)/4
x = sqrt(3 * a/4)
X = sqrt(3) * a / 2

So for our hexagon we have

  |---a---|
   _______       ____
  /\     /\       |
 /  \   /  \     sqrt(3) * a / 2
/____\./____\    ____
\    / \    /
 \  /   \  /
  \/_____\/

|----2a------| 

So if we look at row 2 we can see our grid is (5 * 2a) + (4 * a) wide
Or 14 * a wide
If we look at the height we have 5 hexagons, each hexagon is sqrt(3) * a high
So our grid is 5 * sqrt(3) * a high

sqrt(3) is roughly 1.73 so our grid is roughly 14 * a wide and 8.6 * a high

*/


// So let define a hex edge or a
// This is the length in x, y, z co-ordinate space
const a = 2.0;

// Now lets define how many hexes wide and high our grid is
// Our grid will be in the X Z plane so lets talk about width (x) and depth (z)
/*
    Y
    ^   
    |
    |
    |
    +-----------> X
   /
  /
|/_
Z
*/

// Note so we always have a centre hex lets make sure the width is odd
const roomHexWidth = 9;
// For our hex co ordinate system (which will start at row zero and hex zero)
// Lets also work out the far right hex ordinate
const roomHexes = 2 * ( roomHexWidth - 1 );
if ( roomHexWidth % 2 === 0 ) {

    console.log( `Error room hex width must be odd` );

}

// Note for aesthetic reasons (and assumed in some calculations) lets only allow the depth to be odd
// I.e. the bottom row will always have the same number of hexes as the top row
const roomHexDepth = 9;
// For our hex co ordinate system (which will start at row zero and hex zero)
// Lets also work out the bottom row ordinate
const roomRows = 2 * ( roomHexDepth - 1 );
if ( roomHexDepth % 2 === 0 ) {

    console.log( `Error room hex depth must be odd` );

}

// We can now calculate some other information about the grid
const noOfHex = roomHexWidth * roomHexWidth + ( roomHexWidth - 1 ) * roomHexWidth;
// Dimensions in x, y, z co-ordinate space
const roomWidth = roomHexWidth * 2 * a + ( roomHexWidth - 1 ) * a;
const roomDepth = roomHexDepth * Math.sqrt( 3 );

// Now lets define the co-ordinates for the centre of the central hexagon
const roomX = 0;
const roomY = 0;
const roomZ = 0;
const room = new THREE.Vector3( roomX, roomY, roomZ );
// And the top left of the room (will be useful for loops)
const roomTopLeft = new THREE.Vector3(
    roomX - roomWidth * 0.5,
    roomY,
    roomZ - roomDepth * 0.5
)

// Now lets work out the co-ordinates of each hexagon centre
// Lets store each hexagon's details in an array
let hexagons = [];

/**
 * Will create hexagons in the array for the grid with basic info:
 * 
 * centre - centre of hexagon (THREE.Vector3)
 * 
 * exists - A flag to decide whether a hexagon should exist
 * 
 * row, hex - rudimentary hexagon co-ordinate system
 * 
 * @param {int} roomHexWidth count of hexagons in width of grid
 * @param {int} roomHexDepth count of hexagons in depth of grid
 * @param {THREE.Vector3} roomTopLeft co-ordinates of top left (XZ plane) of grid
 */
const calculateHexagonCentres = ( roomHexWidth, roomHexDepth, roomTopLeft ) => {

    // Loop through the rows of hexagons
    for ( let row = 0; row < 2 * roomHexDepth - 1; row++ ) {

        // The initial xOffset is different for odd and even rows (see diagram)
        let hexes, xOffset, zOffset;
        if ( row % 2 === 0 ) { // Even row

            hexes = roomHexWidth; 
            xOffset = roomTopLeft.x + a;

        } else { // Odd row

            hexes = roomHexWidth - 1; // - We have one less hexagon
            xOffset = roomTopLeft.x + 2.5 * a; 

        }

        // Loop through the hexagons in the row
        for ( let hex = 0; hex < hexes; hex++ ) {

            zOffset = roomTopLeft.z;
            let x, y, z;
            x = xOffset + hex * 3 * a;
            y = roomY;
            z = zOffset + ( 0.5 * row * Math.sqrt( 3 ) * a );
            const centre = new THREE.Vector3( x, y, z );

            // row and hex will be our hexagon co-ordinates in our grid
            // We need to make an adjustment to get the co-ordinates we want
            // See the grid in the populateAdjacentHexagons() function
            let coordAdjust;
            if ( row % 2 === 0 ) {

                coordAdjust = 0;

            } else {

                coordAdjust = 1;

            }

            // Lets add our hexagon
            hexagons.push({

                centre: centre,
                exists: true,
                playable: true,
                type: '',
                row: row,
                hex: hex * 2 + coordAdjust,

            });

        }
    }

}

/**
 * Determines co ordinates of a hexagon vertex in the XY plane
 * @param {int} i - The number of the vertex
 * @param {int} hexWidth - The width of the hexagon
 * @param {int} angleOffset - Angle offset (Usually 0)
 * @returns {THREE.Vector3} - The hexagon vertex coordinates
 */
const createVertex = ( i, hexWidth, angleOffset ) => {

/*
Lets think again about triangles and hexagons

  120 or 2PI/3  _________  60 or PI/3    
               /\       /\               sin   0 = 0               cos   0 = 1                /|
              /  \     /  \              sin  60 = sqrt(3) / 2     cos  60 = 1 / 2           / |
             /    \   / \  \             sin 120 = sqrt(3) / 2     cos 120 = - 1 / 2     a  /  |
180 or PI   /______\./_w_\__\ 0          sin 180 = 0               cos 180 = -1            /   | a sin w
            \      / \      /            sin 240 = -sqrt(3) / 2    cos 240 = - 1 / 2      /\ w |
             \    /   \    /             sin 300 = -sqrt(3) / 2    cos 300 = 1 / 2       /__\__|
              \  /     \  /                                                              a cos w
  240 or 4PI/3 \/_______\/ 300 or 5PI/3

So we can see that if we want to generate the 6 vertices of a hexagon
We use x = a cos w and y = sin w (in x/y plane)
Start with w = 0 and increase by 60 deg or PI/3 rad for each vertex
*/

    let angle = ( Math.PI / 3 ) * i + angleOffset;
    return new THREE.Vector3( 

        hexWidth * Math.cos( angle ), 
        hexWidth * Math.sin( angle ), 
        0

    );

}

/**
 * Determines co ordinates of a hexagon vertex in the XZ plane
 * @param {int} i - The number of the vertex
 * @param {int} hexWidth - The width of the hexagon
 * @param {int} angleOffset - Angle offset (Usually 0)
 * @returns {THREE.Vector3} - The hexagon vertex coordinates
 */
const createVertexXZ = ( i, hexWidth, angleOffset ) => {

    let angle = ( Math.PI / 3 ) * i + angleOffset;
    return new THREE.Vector3( 

        hexWidth * Math.cos( angle ),  
        0,
        hexWidth * Math.sin( angle ),

    );

}

const getTextureAbove = ( index ) => {

    //   | 7 8 9 |
    // -------------
    // 3 | 1 2 3 | 1
    // 6 | 4 5 6 | 4
    // 9 | 7 8 9 | 7
    // -------------
    //   | 1 2 3 |

    // 1 -> 7
    // 2 -> 8
    // 3 -> 9
    // 4 -> 1
    // 5 -> 2
    // 6 -> 3
    // 7 -> 4
    // 8 -> 5
    // 9 -> 6

    let texture;
    if ( index < 4 ) {

        texture = index + 6;

    } else {

        texture = index - 3;

    }

    return texture;

}

/**
 * Construct the meshes for the hexagons
 * 
 * These are in the XZ plane and randomly textured ( sections 1 - 9 of main texture)
 */
const constructHexagonMeshes = () => {

    // Do this for each hex in our grid
    hexagons.forEach( hexagon => {

        // Lets have an id which uses our hexagon co-ordinates
        hexagon.id = `hexagon_r${ hexagon.row }_h${ hexagon.hex }`,
        hexagon.content = { 
            name: 'Empty',
            type: 'N/A',
        };

        hexagon.vertices = [];
        for ( let i = 0; i < 6; i++ ) {

            hexagon.vertices.push( createVertex( i, a, 0 ) );

        }

        // Lets generate a hex shape (note we must do shapes in the XY plane and rotate later)
        hexagon.hexShape = new THREE.Shape();
        hexagon.hexShape.moveTo( hexagon.vertices[ 0 ].x, hexagon.vertices[ 0 ].y );
        for ( let i = 1; i < 6; i++ ) {

            hexagon.hexShape.lineTo( hexagon.vertices[ i ].x, hexagon.vertices[ i ].y );

        }
        hexagon.hexShape.lineTo( hexagon.vertices[ 0 ].x, hexagon.vertices[ 0 ].y );
        hexagon.hexShape.autoClose = true;

        // Lets create the hex geometry    
        hexagon.hexShapeGeo = new THREE.ShapeGeometry( hexagon.hexShape );

        // Lets set the textures
        let hexTextures = {};

        // Lets get random textures (each square is cut 1 - 9 smaller squares)
        const num = Math.floor( Math.random() * 9 ) + 1;

        hexTextures.baseColourHexTexture = textureLoader.getTextureByName( `Floor_Base_00${num}` );
        hexTextures.normalHexTexture = textureLoader.getTextureByName( `Floor_Normal_00${num}` );
        hexTextures.heightHexTexture = textureLoader.getTextureByName( `Floor_Height_00${num}` );
        hexTextures.roughnessHexTexture = textureLoader.getTextureByName( `Floor_Rough_00${num}` );
        hexTextures.aoHexTexture = textureLoader.getTextureByName( `Floor_Ambient_00${num}` );

        // Fine tune textures to fill hexagon
        Object.keys( hexTextures ).forEach( texture => {

            // This seems to put texture at centre of hexagon
            hexTextures[ texture ].offset.x = a * 0.25;
            hexTextures[ texture ].offset.y = a * 0.25;
            // This seems to make it big enough to cover the who hexagon
            hexTextures[ texture ][ 'repeat' ].x = a / 8;
            hexTextures[ texture ][ 'repeat' ].y = a / 8;

        });

        // Make the material for the hexagon
        hexagon.material = new THREE.MeshStandardMaterial({

            map: hexTextures.baseColourHexTexture,
            normalMap: hexTextures.normalHexTexture,
            // displacementMap: hexTextures.heightHexTexture,
            // displacementScale: 0.05, //* Math.random(),
            roughnessMap: hexTextures.roughnessHexTexture,
            roughness: Math.random(),//0.5,
            aoMap: hexTextures.aoHexTexture,
            //wireframe: true

        });
        hexagon.material.side = THREE.DoubleSide;

        // Now we can make our hex mesh
        hexagon.mesh = new THREE.Mesh( hexagon.hexShapeGeo, hexagon.material );
        hexagon.mesh.receiveShadow = true;
        hexagon.mesh.castShadow = true;
        hexagon.mesh.name = `hexagon_r${ hexagon.row }_h${ hexagon.hex }`;

        // Adjust is position to the centre
        hexagon.mesh.position.x = hexagon.centre.x;
        hexagon.mesh.position.y = hexagon.centre.y;
        hexagon.mesh.position.z = hexagon.centre.z;

        // Rotate 270 deg around the x axis so its in the x/z plane (no longer in the x/y plane)
        hexagon.mesh.rotation.x = 3 * Math.PI / 2;

    });

}

const constructHexagonOutlineMeshes = () => {

    // Construct two outlines
    // 1 - always marks each hex on map (Black)
    // 2 - situationally marks an individual hex on map (White) if cursor is on hex

    // Do this for each hex in our grid
    hexagons.forEach( hexagon => {

        // Set outline thicknesses as a fraction of a
        const outLineWidth = 0.05 * a;
        const outLineWidth2 = 0.1 * a; 

        // Vertices
        hexagon.innerVertices = [];
        hexagon.innerVertices2 = [];
        for ( let i = 0; i < 6; i++ ) {

            hexagon.innerVertices.push( createVertex( i, a - outLineWidth, 0 ) );
            hexagon.innerVertices2.push( createVertex( i, a - outLineWidth - outLineWidth2, 0 ) );

        }

        // Lets generate the shapes for the grid outline from the inner and outer vertices
        hexagon.outlineShapes = [];
        hexagon.outlineShapes2 = [];

        // Will be 6 segments for each outline
        for ( let i = 0; i < 6; i++ ) {

            const outlineShape = new THREE.Shape();
            outlineShape.moveTo( hexagon.vertices[ i ].x, hexagon.vertices[ i ].y );
            outlineShape.lineTo( hexagon.vertices[ ( i + 1 ) % 6 ].x, hexagon.vertices[ ( i + 1 ) % 6 ].y );
            outlineShape.lineTo( hexagon.innerVertices[ ( i + 1 ) % 6 ].x, hexagon.innerVertices[ ( i + 1 ) % 6 ].y );
            outlineShape.lineTo( hexagon.innerVertices[ i ].x, hexagon.innerVertices[ i ].y );
            outlineShape.autoClose = true;
            hexagon.outlineShapes.push( outlineShape );

            const outlineShape2 = new THREE.Shape();
            outlineShape2.moveTo( hexagon.innerVertices[ i ].x, hexagon.innerVertices[ i ].y );
            outlineShape2.lineTo( hexagon.innerVertices[ ( i + 1 ) % 6 ].x, hexagon.innerVertices[ ( i + 1 ) % 6 ].y );
            outlineShape2.lineTo( hexagon.innerVertices2[ ( i + 1 ) % 6 ].x, hexagon.innerVertices2[ ( i + 1 ) % 6 ].y );
            outlineShape2.lineTo( hexagon.innerVertices2[ i ].x, hexagon.innerVertices2[ i ].y );
            outlineShape2.autoClose = true;
            hexagon.outlineShapes2.push( outlineShape2 );

        }

        // Lets create the hex outline geometries
        hexagon.outlineGeometries = [];
        hexagon.outlineShapes.forEach( outlineShape => {

            hexagon.outlineGeometries.push( new THREE.ShapeGeometry( outlineShape ) );

        });
        hexagon.outlineGeometries2 = [];
        hexagon.outlineShapes2.forEach( outlineShape => {

            hexagon.outlineGeometries2.push( new THREE.ShapeGeometry( outlineShape ) );

        });

        // Make material for the outlines
        hexagon.outlineMaterial = new THREE.MeshBasicMaterial({

            // Black for all grids
            color: 0x000000,
            //wireframe: true

        });
        hexagon.outlineMaterial2 = new THREE.MeshBasicMaterial({

            // Red for cursored grid
            color: 0xCCCCCC,
            //wireframe: true

        });

        // Now we make our outline meshes
        hexagon.outlineMeshes = [];
        let outlineCount = 0;
        hexagon.outlineGeometries.forEach( outlineGeometry => {

            const outlineMesh = new THREE.Mesh( outlineGeometry, hexagon.outlineMaterial );
            outlineMesh.receiveShadow = true;
            outlineMesh.name = `${ hexagon.mesh.name }_outline_${ outlineCount }`;
            hexagon.outlineMeshes.push( outlineMesh );
            outlineCount++;

        });
        hexagon.outlineMeshes2 = [];
        let outlineCount2 = 0;
        hexagon.outlineGeometries2.forEach( outlineGeometry => {

            const outlineMesh = new THREE.Mesh( outlineGeometry, hexagon.outlineMaterial2 );
            //outlineMesh.receiveShadow = true;
            outlineMesh.name = `${ hexagon.mesh.name }_outline2_${ outlineCount }`;
            hexagon.outlineMeshes2.push( outlineMesh );
            outlineCount2++;

        });

        // Adjust position and rotation
        hexagon.outlineMeshes.forEach( outlineMesh => {

            outlineMesh.position.x = hexagon.centre.x;
            outlineMesh.position.y = hexagon.centre.y + 0.025; // Need to be above hexes
            outlineMesh.position.z = hexagon.centre.z;
            outlineMesh.rotation.x = 3 * Math.PI / 2;

        });
        hexagon.outlineMeshes2.forEach( outlineMesh => {

            outlineMesh.position.x = hexagon.centre.x;
            outlineMesh.position.y = hexagon.centre.y + 0.025; // Need to be above hexes
            outlineMesh.position.z = hexagon.centre.z;
            outlineMesh.rotation.x = 3 * Math.PI / 2;

        });

    });

}

const constructHexagonHighlightMeshes = () => {

    // These are similar to outlines but will instead cover the whole hexagon
    // They will be used to tag the current character and current character target
    // In the future they may be used to indicate ranges (e.g. movement ranges)

    // Do this for each hex in our grid
    hexagons.forEach( hexagon => {
        
        // Needs to come up to edge of hex border
        const highlightWidth = 0.95 * a;

        // Vertices
        hexagon.highlightVertices = [];
        for ( let i = 0; i < 6; i++ ) {

            hexagon.highlightVertices.push( createVertex( i, highlightWidth, 0 ) );

        }

        // Lets generate a shape (note we must do shapes in the XY plane and rotate later)
        hexagon.highlightShape = new THREE.Shape();
        hexagon.highlightShape.moveTo( hexagon.highlightVertices[ 0 ].x, hexagon.highlightVertices[ 0 ].y );
        for ( let i = 1; i < 6; i++ ) {
        
            hexagon.highlightShape.lineTo( hexagon.highlightVertices[ i ].x, hexagon.highlightVertices[ i ].y );
        
        }
        hexagon.highlightShape.lineTo( hexagon.highlightVertices[ 0 ].x, hexagon.highlightVertices[ 0 ].y );
        hexagon.highlightShape.autoClose = true;

        // Lets create the hex geometry    
        hexagon.highlightGeo = new THREE.ShapeGeometry( hexagon.highlightShape );

        // Make material for the highlight
        hexagon.highlightMaterial = new THREE.MeshBasicMaterial({

            // Black for all grids
            color: GameConfig.colours.active,
            transparent: true,
            opacity: GameConfig.opacity,

        });
        // Will need to update this on the fly (i.e. change colour)
        hexagon.highlightMaterial.needsUpdate = true;
        hexagon.highlightMaterial.side = THREE.DoubleSide;

        // Make the mesh
        hexagon.highlightMesh = new THREE.Mesh( hexagon.highlightGeo, hexagon.highlightMaterial );
        hexagon.highlightMesh.receiveShadow = false;
        hexagon.highlightMesh.castShadow = false;
        hexagon.highlightMesh.name = `hexagon_highlight_r${ hexagon.row }_h${ hexagon.hex }`;

        // Adjust is position to the centre
        hexagon.highlightMesh.position.x = hexagon.centre.x;
        hexagon.highlightMesh.position.y = hexagon.centre.y + 0.010; // Above hexes but under outlines
        hexagon.highlightMesh.position.z = hexagon.centre.z;

        // Rotate 270 deg around the x axis so its in the x/z plane (no longer in the x/y plane)
        hexagon.highlightMesh.rotation.x = 3 * Math.PI / 2;

    });

}

const constructHexagonWallMeshes = () => {

    /*
    Each wall made up from the following vertices

    hexagon.verticesXZ[ i % 6 ] + h          hexagon.verticesXZ[ ( i + 1 ) % 6 ] + h
                                    v3      v2
                                    _________
                                    |      /|
                                    |     / |
                                    |    /  |
                                    |   /   |
                                    |  /    |
                                    | /     |
                                    ---------
                                    v0      v1
        hexagon.verticesXZ[ i % 6 ]           hexagon.verticesXZ[ ( i + 1 ) % 6 ]
    */

    // Do this for each hex in our grid
    hexagons.forEach( hexagon => {

        // Need to have vertices in XZ plane
        hexagon.verticesXZ = [];
        for ( let i = 0; i < 6; i++ ) {

            const adjust = 1.01; // Gaps without this!

            hexagon.verticesXZ.push ( 
                new THREE.Vector3().addVectors( hexagon.centre, createVertexXZ( i, adjust * a, 0 ) ) 
            );

        }

        // Store for each hexagons walls
        hexagon.walls = [];

        // These hexes created in XZ plane (not XY plane so need to be careful with order here)
        const wallEdges = [

            'lowerRight',
            'lower',
            'lowerLeft',
            'upperLeft',
            'upper',
            'upperRight',

        ];

        // A potential 6 walls for each hex (1 for each side)
        for ( let i = 0; i < 6; i++ ) {

            // Wall vectors
            const v0 = hexagon.verticesXZ[ i % 6 ];
            const v1 = hexagon.verticesXZ[ ( i + 1 ) % 6 ];
            const v2 = new THREE.Vector3().addVectors( 
                hexagon.verticesXZ[ ( i + 1 ) % 6 ], 
                new THREE.Vector3( 0, a, 0 ) 
            );
            const v3 = new THREE.Vector3().addVectors( 
                hexagon.verticesXZ[ i % 6 ], 
                new THREE.Vector3( 0, a, 0 ) 
            );

            // Set up buffer geometry for each section of wall
            const wallGeometries = {
                lower: new THREE.BufferGeometry(),
                middle: new THREE.BufferGeometry(),
                upper: new THREE.BufferGeometry(),
            };

            // Vertices and UVs (useful to store together)
            const vertices = {

                lower: [

                    { pos: [ v0.x, v0.y, v0.z ], uv: [0, 0], }, // BL
                    { pos: [ v1.x, v1.y, v1.z ], uv: [1, 0], }, // BR
                    { pos: [ v3.x, v3.y, v3.z ], uv: [0, 1], }, // TL
                
                    { pos: [ v3.x, v3.y, v3.z ], uv: [0, 1], }, // TL
                    { pos: [ v1.x, v1.y, v1.z ], uv: [1, 0], }, // BR
                    { pos: [ v2.x, v2.y, v2.z ], uv: [1, 1], }, // TR

                ],
                middle: [

                    { pos: [ v0.x, v0.y + a, v0.z ], uv: [0, 0], }, // BL
                    { pos: [ v1.x, v1.y + a, v1.z ], uv: [1, 0], }, // BR
                    { pos: [ v3.x, v3.y + a, v3.z ], uv: [0, 1], }, // TL
                
                    { pos: [ v3.x, v3.y + a, v3.z ], uv: [0, 1], }, // TL
                    { pos: [ v1.x, v1.y + a, v1.z ], uv: [1, 0], }, // BR
                    { pos: [ v2.x, v2.y + a, v2.z ], uv: [1, 1], }, // TR

                ],
                upper: [

                    { pos: [ v0.x, v0.y + 2 * a, v0.z ], uv: [0, 0], }, // BL
                    { pos: [ v1.x, v1.y + 2 * a, v1.z ], uv: [1, 0], }, // BR
                    { pos: [ v3.x, v3.y + 2 * a, v3.z ], uv: [0, 1], }, // TL
                
                    { pos: [ v3.x, v3.y + 2 * a, v3.z ], uv: [0, 1], }, // TL
                    { pos: [ v1.x, v1.y + 2 * a, v1.z ], uv: [1, 0], }, // BR
                    { pos: [ v2.x, v2.y + 2 * a, v2.z ], uv: [1, 1], }, // TR

                ]

            };

            const positions = {

                lower: [],
                middle: [],
                upper: [],

            };

            const uvs = {

                lower: [],
                middle: [],
                upper: [],

            };

            Object.keys( vertices ).forEach( wallSection => {

                for ( const vertex of vertices[ wallSection ] ) {

                    positions[ wallSection ].push( ...vertex.pos );
                    uvs[ wallSection ].push( ...vertex.uv );
    
                }

            });

            const positionNumComponents = 3;
            const uvNumComponents = 2;

            Object.keys( wallGeometries ).forEach( wallSection => {

                wallGeometries[ wallSection ].setAttribute(
                    'position',
                    new THREE.BufferAttribute( new Float32Array( positions[ wallSection ] ), positionNumComponents ) 
                );
                wallGeometries[ wallSection ].setAttribute(
                    'uv',
                    new THREE.BufferAttribute( new Float32Array( uvs[ wallSection ] ), uvNumComponents ) 
                );
                wallGeometries[ wallSection ].computeVertexNormals();

            });

            const wall = {

                exists: true,
                edge: wallEdges[ i ],
                meshes: [],

            };

            // Sort out wall materials here
            const wallTextures = {

                lower: {},
                middle: {},
                upper: {},

            };

            // Could play with a non uniform distribution here
            // To reduce frequency of larger bricks
            const seedTexture = Math.floor( Math.random() * 9 ) + 1;

            const textureIndices = {

                lower: seedTexture,
                middle: getTextureAbove( seedTexture ),
                upper: getTextureAbove( getTextureAbove( seedTexture ) )

            }

            Object.keys( wallTextures ).forEach( wallSection => {

                wallTextures[ wallSection ].baseColourHexTexture = textureLoader.getTextureByName( `Wall_Base_00${textureIndices[ wallSection ]}` );
                wallTextures[ wallSection ].normalHexTexture = textureLoader.getTextureByName( `Wall_Normal_00${textureIndices[ wallSection ]}` );
                wallTextures[ wallSection ].heightHexTexture = textureLoader.getTextureByName( `Wall_Height_00${textureIndices[ wallSection ]}` );
                wallTextures[ wallSection ].roughnessHexTexture = textureLoader.getTextureByName( `Wall_Rough_00${textureIndices[ wallSection ]}` );
                wallTextures[ wallSection ].aoHexTexture = textureLoader.getTextureByName( `Wall_Ambient_00${textureIndices[ wallSection ]}` );

            });

            const wallMaterial = {

                lower: {},
                middle: {},
                upper: {},

            };

            Object.keys( wallMaterial ).forEach( wallSection => {

                wallMaterial[ wallSection ] = new THREE.MeshStandardMaterial({

                    map: wallTextures[ wallSection ].baseColourHexTexture,
                    normalMap: wallTextures[ wallSection ].normalHexTexture,
                    displacementMap: wallTextures[ wallSection ].heightHexTexture,
                    displacementScale: 0.05, //* Math.random(),
                    roughnessMap: wallTextures[ wallSection ].roughnessHexTexture,
                    roughness: Math.random(),//0.5,
                    aoMap: wallTextures[ wallSection ].aoHexTexture,
                    //wireframe: true
        
                });
                wallMaterial[ wallSection ].side = THREE.DoubleSide;

            });

            Object.keys( wallGeometries ).forEach( wallSection => {

                const wallSectionMesh = new THREE.Mesh( 
                    wallGeometries[ wallSection ], 
                    wallMaterial[ wallSection ] 
                ); 
                wallSectionMesh.name = `${ hexagon.mesh.name }-wall-${ wallSection }`;
                wall.meshes.push( 
                    wallSectionMesh
                );

            });

            hexagon.walls.push( wall );

        }

    });

}


// function add3dLabels() {

//     hexagons.forEach(hexagon => {

//         let textLabel = text3d.makeTextLabel(hexagon.id, {
//             fontface: 'verdana',
//             borderThickness: 4
//         });

//         hexagon.text = textLabel;
//         hexagon.text.position.copy( hexagon.mesh.position );
//         hexagon.text.rotation.x = 3.01 * Math.PI / 2;
//         hexagon.text.position.y += 0.01;

//     });

// }

/**
 * Determine neighbour hexagon for each edge
 * - upper
 * - upperLeft
 * - lowerLeft
 * - lower
 * - lowerRight
 * - upperRight
 */
const populateAdjacentHexagons = () => {
/*

OUR HEXAGON CO ORDINATE SYSTEM (5 by 5 hexes)

     hex 0  hex 1  hex 2  hex 3  hex 4  hex 5  hex 6  hex 7  hex 8
     ._ _.    .    ._ _.    .    ._ _.    .    ._ _.    .    ._ _.     
    /     \       /     \       /     \       /     \       /     \
   /  0,0  \._ _./  0,2  \._ _./  0,4  \._ _./  0,6  \._ _./  0,8  \   Row 0
   \       /     \       /     \       /     \       /     \       /
    \._ _./  1,1  \._ _./  1,3  \._ _./  1,5  \._ _./  1,7  \._ _./    Row 1
    /     \       /     \       /     \       /     \       /     \
   /  2,0  \._ _./  2,2  \._ _./  2,4  \._ _./  2,6  \._ _./  2,8  \   Row 2
   \       /     \       /     \       /     \       /     \       /
    \._ _./  3,1  \._ _./  3,3  \._ _./  3,5  \._ _./  3,7  \._ _./    Row 3
    /     \       /     \       /     \       /     \       /     \
   /  4,0  \._ _./  4,2  \._ _./  4,4  \._ _./  4,6  \._ _./  4,8  \   Row 4
   \       /     \       /     \       /     \       /     \       /
    \._ _./  5,1  \._ _./  5,3  \._ _./  5,5  \._ _./  5,7  \._ _./    Row 5
    /     \       /     \       /     \       /     \       /     \
   /  6,0  \._ _./  6,2  \._ _./  6,4  \._ _./  6,6  \._ _./  6,8  \   Row 6
   \       /     \       /     \       /     \       /     \       /
    \._ _./  7,1  \._ _./  7,3  \._ _./  7,5  \._ _./  7,7  \._ _./    Row 7
    /     \       /     \       /     \       /     \       /     \
   /  8,0  \._ _./  8,2  \._ _./  8,4  \._ _./  8,8  \._ _./  8,8  \   Row 8
   \       /     \       /     \       /     \       /     \       /
    \._ _./   .   \._ _./   .   \._ _./   .   \._ _./   .   \._ _./    

*/

    hexagons.forEach( hexagon => {

        hexagon.neighbours = {};
        // UPPER
        // Will be hex with row = row - 2 and hex = hex
        // If row - 2 < 0 there is no upper neighbour
        // I.e. top two rows have no hexs directly aobve them
        if ( hexagon.row - 2 < 0 ) {

            hexagon.neighbours.upper = 'none';

        } else {

            hexagon.neighbours.upper = {
                row: hexagon.row - 2,
                hex: hexagon.hex
            };

        }
        // UPPER LEFT
        // Will be hex with row = row - 1 and hex = hex - 1
        // If row - 1 < 0 OR hex - 1 < 0 there is no upper left neighbour
        if ( ( hexagon.row - 1 < 0 ) || ( hexagon.hex - 1 < 0 ) ) {

            hexagon.neighbours.upperLeft = 'none';

        } else {

            hexagon.neighbours.upperLeft = {
                row: hexagon.row - 1,
                hex: hexagon.hex - 1
            }

        }
        // LOWER LEFT
        // Will be hex with row = row + 1 and hex = hex - 1
        // If row + 1 > roomRows OR hex - 1 < 0 there is no lower left neighbour
        if ( ( hexagon.row + 1 > roomRows ) || ( hexagon.hex - 1 < 0 ) ) {

            hexagon.neighbours.lowerLeft = 'none';

        } else {

            hexagon.neighbours.lowerLeft = {
                row: hexagon.row + 1,
                hex: hexagon.hex - 1
            }

        }
        // LOWER
        // Will be hex with row = row + 2 and hex = hex
        // If row + 2 > roomRows there is no lower neighbour
        // I.e. bottom two rows have no hexes directly beneath them
        if ( hexagon.row + 2 > roomRows ) {

            hexagon.neighbours.lower = 'none';

        } else {

            hexagon.neighbours.lower = {
                row: hexagon.row + 2,
                hex: hexagon.hex
            };

        }
        // LOWER RIGHT
        // Will be hex with row = row + 1 and hex = hex + 1
        // If row + 1 > roomRows OR hex + 1 > roomsHexes there is no lower left neighbour
        if ( ( hexagon.row + 1 > roomRows ) || ( hexagon.hex + 1 > roomHexes ) ) {

            hexagon.neighbours.lowerRight = 'none';

        } else {

            hexagon.neighbours.lowerRight = {
                row: hexagon.row + 1,
                hex: hexagon.hex + 1
            };

        }
        // UPPER RIGHT
        // Will be hex with row = row - 1 and hex = hex + 1
        // If row - 1 < 0 OR hex + 1 > roomHexes there is no upper right neighbour
        if ( ( hexagon.row - 1 < 0 ) || ( hexagon.hex + 1 > roomHexes ) ) {

            hexagon.neighbours.upperRight = 'none';

        } else {

            hexagon.neighbours.upperRight = {
                row: hexagon.row - 1,
                hex: hexagon.hex + 1
            };

        }

    });

}

/**
 * Scans through walls for each hexagon
 * 
 * Sets all walls to not exist
 * 
 * If there is no neighbour on the edge set wall to exist
 */
const addWallExistence = () => {

    hexagons.forEach( hexagon => {

        // Asume no walls
        hexagon.walls.forEach( wall => {

            wall.exists = false;

        });

        // Look at each neighbour and add wall if there is none
        Object.keys( hexagon.neighbours ).forEach( neighbour => {

            if ( hexagon.neighbours[ neighbour ] === 'none' ) {

                hexagon.walls.find( wall => wall.edge === neighbour ).exists = true;

            }

        });

    });

}

const markEdgeHexagons = ( roomHexWidth, roomHexDepth ) => {

    hexagons.forEach( hexagon => {

        if (
            ( hexagon.row === 0 ) || // Top row
            ( hexagon.row === 1 ) || // 2nd Top row
            ( hexagon.hex === 0 ) || // Far left hexes
            ( hexagon.hex === 2 * ( roomHexWidth - 1 ) ) || // Far right hexes
            ( hexagon.row === 2 * ( roomHexDepth - 1 ) ) || // Bottom row
            ( hexagon.row === 2 * ( roomHexDepth - 1 ) - 1 ) // 2nd Bottom row
        ) {

            hexagon.type = 'Edge';
            hexagon.playable = false;

        }
    });

}

const randomEdgeHexagon = () => {

    hexagons.find( hex => hex.row === 4 && hex.hex === 4 ).type = 'Edge';
    hexagons.find( hex => hex.row === 3 && hex.hex === 3 ).type = 'Edge';
    hexagons.find( hex => hex.row === 5 && hex.hex === 5 ).type = 'Edge';

}

const processHexagonTypes = () => {

    hexagons.forEach( hexagon => {

        switch ( hexagon.type ) {

            case 'Edge':
                hexagon.mesh.position.y += 3 * a;
                hexagon.outlineMeshes.forEach( outlineMesh => {

                    outlineMesh.position.y += 3 * a; 

                });
            break;

        }

    });    

}

const addMoreWallExistence = () => {

    hexagons.forEach( hexagon => {

        if ( hexagon.type === 'Edge' ) {

            Object.keys( hexagon.neighbours ).forEach( neighbour => {

                if ( hexagon.neighbours[ neighbour ] !== 'none' ) {

                    // Find type of neighbour
                    const row = hexagon.neighbours[ neighbour ].row;
                    const hex = hexagon.neighbours[ neighbour ].hex;
                    const type = hexagons.find( x => x.row === row && x.hex === hex ).type;

                    // Add wall if neighbour is an edge
                    if ( type !== 'Edge' ) {

                        hexagon.walls.find( x => x.edge === neighbour ).exists = true;

                    }

                }

            });

        }

    });

}

const extractRowAndHexFromString = ( string ) => {

    let workString = string
    // Is it an outline?
    while ( workString.indexOf( '_outline' ) != -1 ) {

        workString = workString.substring(
            0,
            workString.indexOf( '_outline' )
        );

    }
    // workString = workString.replace( 'hexagon', '' );
    // const info = workString.split("_");

    return workString;

}

const updateCharacterPopulatedGrids = () => {

    let hexId;
    // Mark all as empty (players can move)
    hexagons.forEach( hexagon => {

        hexagon.content = { 
            objectName: 'Empty Grid',
            name: 'Empty Grid',
            type: 'empty',
        };

    });
    // Mark player locations
    Object.keys( GameState.players ).forEach( player => {

        // console.log(`Marking ${player} position on grid`);
        // console.log(`Name ${GameState.players[ player ].Name}`);
        hexId = 
            `hexagon_r` + 
            `${ GameState.players[ player ].Row }_` + 
            `h${ GameState.players[ player ].Hex }`;
        // console.log(`hexId ${hexId}`);
        // console.log(`===`);
        hexagons.find( h => h.id === hexId ).content = {
            objectName: player,
            name: GameState.players[ player ].Name,
            type: 'player',
        }

    });
    // Mark enemy locations
    Object.keys( GameState.enemies ).forEach( enemy => {

        hexId = 
            `hexagon_r` + 
            `${ GameState.enemies[ enemy ].Row }_` + 
            `h${ GameState.enemies[ enemy ].Hex }`;
        hexagons.find( h => h.id === hexId ).content = {
            objectName: enemy,
            name: GameState.enemies[ enemy ].Name,
            type: 'enemy',
        }

    });

}

// Our module

const grid = {

    addToScene: ( scene ) => {

        console.log( 'We are adding grid to scene' );
        calculateHexagonCentres( roomHexWidth, roomHexDepth, roomTopLeft );
        constructHexagonMeshes();
        constructHexagonOutlineMeshes();
        constructHexagonWallMeshes();
        constructHexagonHighlightMeshes();
        populateAdjacentHexagons();
        addWallExistence();
        markEdgeHexagons( roomHexWidth, roomHexDepth );
        randomEdgeHexagon();
        processHexagonTypes();
        addMoreWallExistence();
        //add3dLabels();

        hexagons.forEach( hexagon => {

            if ( hexagon.exists ) {

                // Grids
                scene.add( hexagon.mesh );

                // Grid Outlines
                hexagon.outlineMeshes.forEach( outlineMesh => {

                    scene.add( outlineMesh );

                });

                // Cursored grid
                hexagon.outlineMeshes2.forEach( outlineMesh => {

                    scene.add( outlineMesh );
                    outlineMesh.visible = false;

                });

                // Grid highlight
                scene.add( hexagon.highlightMesh );
                hexagon.highlightMesh.visible = false;

                // scene.add(hexagon.text);
                hexagon.walls.forEach( wall => {

                    if ( wall.exists ) {

                        wall.meshes.forEach( mesh => {

                            scene.add( mesh );

                        });

                    }

                });

            }

        });

    },

    update: () => {

        // Hex cursor
        const pickedHexagon = Picker.getIntersectedObject();
        const pickedHexagonId = extractRowAndHexFromString( pickedHexagon );
        GameState.currentPickedGridId = pickedHexagonId;

        if ( pickedHexagon !== 'No visible hexagon' ) {

            hexagons.forEach( hexagon => {
                
                if ( hexagon.id === pickedHexagonId ) {

                    // Mark 6 meshes of picked grid as visible
                    hexagon.outlineMeshes2.forEach( outlineMesh => {

                        outlineMesh.visible = true;

                    });

                } else {

                    // Make 6 meshes of all other grids invisible
                    hexagon.outlineMeshes2.forEach( outlineMesh => {

                        outlineMesh.visible = false;

                    });

                }

            });

        } else { // No picked hexagon make all invisible

            hexagons.forEach( hexagon => {

                hexagon.outlineMeshes2.forEach( outlineMesh => {

                    outlineMesh.visible = false;

                });

            });

        }

        // Current Character / Target
        if ( GameState.state.modelsAdded ) {

            // Get Current Player (if none must be an enemy)
            const currentCharacter = GameState.currentCharacter;
            const currentSide = GameState.currentSide;
            // Get Row / Hex
            const currentPlayerRow = GameState[ currentSide ][ currentCharacter ].Row;
            const currentPlayerHex = GameState[ currentSide ][ currentCharacter ].Hex;
            const currentPlayerGridId = `hexagon_r${ currentPlayerRow }_h${ currentPlayerHex }`;
            const currentTargetGridId = GameState.currentTargetGridId;
            // Make visible (all other invis)
            hexagons.forEach( hexagon => {

                switch ( hexagon.id ) {

                    case currentPlayerGridId:
                        hexagon.highlightMesh.visible = true;
                    break;

                    case currentTargetGridId:
                        hexagon.highlightMesh.visible = true;
                        hexagon.highlightMaterial.color.set( GameConfig.colours.target );
                        //hexagon.highlightMaterial.opacity.set( GameConfig.colours.opacity );
                    break;

                    default:
                        hexagon.highlightMesh.visible = false;
                    break;

                }

            });

        }

        if ( GameState.state.modelsAdded ) {

            updateCharacterPopulatedGrids();

        }


    //

    //     if (gameState.debug) {

    //         hexagons.forEach(hexagon => {

    //             hexagon.text.visible = true;
    
    //         });

    //     } else {

    //         hexagons.forEach(hexagon => {

    //             hexagon.text.visible = false;
    
    //         });

    //     }
    
    },

    getHexCentre: ( row, hex ) => {

        const hexagonRow = parseInt(row);
        const hexagonHex = parseInt(hex);

        const hexagonToFind = hexagons.find( hexagon => hexagon.row === hexagonRow && hexagon.hex === hexagonHex );

        if ( hexagonToFind ) {

            return hexagonToFind.centre;

        } else {

            console.log( `No hexagon found for row ${row}, hex ${hex}` );

        }

    },

    getHexContent: ( row, hex, id ) => {

        let hexagonToFind;

        // Use id if we have one
        if ( id ) {

            hexagonToFind = hexagons.find( h => h.id === id );

        } else {

            const hexagonRow = parseInt( row );
            const hexagonHex = parseInt( hex );
    
            hexagonToFind = hexagons.find( hexagon => hexagon.row === hexagonRow && hexagon.hex === hexagonHex );
    
        }

        if ( hexagonToFind ) {
    
            return hexagonToFind.content;

        } else {

            console.log( `No hexagon found for row [${ row }], hex [${ hex }], id [${ id }]` );

        }

    },

}

export default grid;