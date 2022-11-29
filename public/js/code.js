// Three
import * as THREE from '/build/three.module.js';
// import { GLTFLoader } from '../../jsm/loaders/GLTFLoader.js';
import Stats from '../../jsm/libs/stats.module.js';
// import * as DAT from '/dat/dat.gui.module.js';



// Modules
import HtmlAndCSS from './htmlAndCss/htmlAndCss.js';
import GameState from './game/state.js';
import KeyPresses from './controls/keyPresses.js';
import CameraButtonPresses from './controls/cameraButtonPresses.js';
import PlayerAndTargetPresses from './controls/playerAndTargetPresses.js';
import DragAndDrop from './controls/dragAndDrop.js';
import GameCamera from './game/camera.js';
import Clock from './game/clock.js';
// import Lights from './game/lights.js';
import PointLights from './game/pointLights.js';
import Grid from './grid/grid.js';
import Players from './characters/players.js';
import Enemies from './characters/enemies.js';
import CharacterMethods from './characters/methods.js';
//import Fire from './fire/fire.js';
import TextureLoader from './assets/textureLoader.js';
import ModelLoader from './assets/modelLoader.js';
import AnimationLoader from './assets/animationLoader.js';
import Picker from './controls/picker.js';



// Set GameStates
GameState.state.initialising = true;
GameState.state.gridAdded = false;
GameState.state.modelsAdded = false;

// Set up HTML and CSS
HtmlAndCSS.setUpSplashScreen();
HtmlAndCSS.setUpThree();
HtmlAndCSS.setUpDebug();
HtmlAndCSS.setUpCameraControls();
HtmlAndCSS.setUpPlayerAndTarget();
const splashContainer = document.getElementById( 'splashContainer' );

// Listen for key/button presses
KeyPresses.process();
CameraButtonPresses.process();
PlayerAndTargetPresses.process();
DragAndDrop.process();

// Camera
GameCamera.init();

// Container for three.js
const canvasContainer = document.getElementById( 'canvasContainer' );

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x111111 );

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize( canvasContainer.offsetWidth, canvasContainer.offsetHeight );
renderer.setPixelRatio( (window.devicePixelRatio) ? window.devicePixelRatio : 1 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
canvasContainer.appendChild( renderer.domElement );

// Stats Debug
const stats = new Stats( { autoPlace: false } );
stats.domElement.style.position = 'relative';
const statsContainer = document.getElementById( 'statsContainer' );
statsContainer.appendChild( stats.domElement );
statsContainer.hidden = true;
const debugContainer = document.getElementById( 'debugContainer');
debugContainer.hidden = true;
const datContainer = document.getElementById( 'datContainer' );
datContainer.hidden = true;
const threeDebugContainer = document.getElementById( 'threeDebugContainer' );
threeDebugContainer.hidden = true;



const init = () => {

    // Lights.addToScene(scene);
    // Lights.addDat();
    PointLights.addToScene( scene );
    PointLights.addDat();

    TextureLoader.loadTextures();
    ModelLoader.loadPlayerModels();
    ModelLoader.loadEnemyModels();
    AnimationLoader.loadAnimations();

    GameCamera.setLookAtVector();

    renderFrame();
    windowResize();

}



const renderFrame = () => {

    // Main Loop
    GameState.frame++;

    const deltaTime = Clock.getDelta();
    GameState.gameTimeDelta = deltaTime;
    GameState.gameTime += deltaTime;

    GameCamera.render( renderer, scene );
    //Lights.updateLights();
    PointLights.updateLights();
    // THREE DEBUG
    stats.update();

    if ( GameState.debug ) { 
        
        statsContainer.hidden = false;
        debugContainer.hidden = false;
        datContainer.hidden = false;
        threeDebugContainer.hidden = false;
        HtmlAndCSS.updateDebug();
    
    } else { 
        
        statsContainer.hidden = true;
        debugContainer.hidden = true;
        datContainer.hidden = true;
        threeDebugContainer.hidden = true;
    
    }

    const loadingFrame = 100;
    HtmlAndCSS.displayLoading( Math.round( GameState.frame / loadingFrame * 100 ) );

    if ( GameState.frame > loadingFrame ) { 

        splashContainer.hidden = true; 
        document.getElementById( 'cameraControls' ).hidden = false;
    
    }

    if ( !GameState.state.gridAdded && TextureLoader.getTextureLoadStatus() ) {

        Grid.addToScene( scene );
        GameState.state.gridAdded = true;
        // console.log( 'TEXTURES' );
        // console.log( TextureLoader.getTextures() );

    }

    if ( GameState.state.gridAdded ) {

        Picker.getIntersectedObjects( scene );
        Picker.getTarget();
        Grid.update();

    }

    if ( 
        !GameState.state.modelsAdded &&
        GameState.state.gridAdded &&
        ModelLoader.getPlayerModelLoadStatus() && 
        ModelLoader.getEnemyModelLoadStatus() &&
        AnimationLoader.getAnimationLoadStatus() 
    ) {

        Players.addToScene( scene );
        Enemies.addToScene( scene );
        GameState.state.modelsAdded = true;
        GameState.currentCharacter = CharacterMethods.getTurnOrder()[0].Model; // First element highest init character
        GameState.currentSide = CharacterMethods.getTurnOrder()[0].Side;

    }

    if ( GameState.state.modelsAdded ) {

        // Animate Players / Enemies
        Players.update( Clock.getDelta() );
        Enemies.update( Clock.getDelta() );

        // Game Logic

        // Have all characters been, i.e. is it end of turn
        if ( CharacterMethods.haveAllCharactersBeen() ) {

            console.log( 'TURNOVER' )
            GameState.turn++;
            CharacterMethods.setAllCharactersToPending();
            // Set the next character
            const nextCharacter = CharacterMethods.getHighestInitiativeCharacterPendingTurn();
            GameState.currentCharacter = nextCharacter.character;
            GameState.currentSide = nextCharacter.side;

        }

        // Is the current character no longer pending a turn?
        if ( !GameState[ GameState.currentSide ][ GameState.currentCharacter ].TurnPending ) {

            // Set the next character
            const nextCharacter = CharacterMethods.getHighestInitiativeCharacterPendingTurn();
            GameState.currentCharacter = nextCharacter.character;
            GameState.currentSide = nextCharacter.side;

        }
        // Determine highest initiative character pending a turn
        // If enemy action enemy
        // If player set as current player

        // Get next player
        // While player has AP (or not ended turn)
            // Get action from user
            // Do action
            // Process action consequences
            // - Player damage
            // - Player death
            // - Enemy damage
            // - Enemy death
            // - All player death
            // - All enemy death

        HtmlAndCSS.updatePlayerAndTarget();

    }

    requestAnimationFrame( renderFrame );

}



// make responsive
const windowResize = () => {

    GameCamera.setAspect( canvasContainer.offsetWidth / canvasContainer.offsetHeight );
    GameCamera.updateProjectionMatrix();
    renderer.setSize( canvasContainer.offsetWidth, canvasContainer.offsetHeight );
    renderFrame();

}



window.addEventListener( 'resize', windowResize, false );
window.onload = init;