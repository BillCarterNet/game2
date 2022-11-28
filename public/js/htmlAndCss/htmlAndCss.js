import Css from './modules/css.js';
import SetUpThree from './modules/setUpThree.js';
import SetUpDebug from './modules/setUpDebug.js';
import SetUpSplash from './modules/setUpSplash.js';
import SetUpCameraControls from './modules/cameraControls.js';
import PlayerAndTarget from './modules/playerAndTarget.js';
import PlayerStats from './modules/playerStats.js';
import TurnOrder from './modules/turnOrder.js';

const HtmlAndCSS = {

    setUpThree: () => {

        SetUpThree.init();

    },

    setUpDebug: () => {

        SetUpDebug.init();

    },

    setUpSplashScreen: () => {

        SetUpSplash.init();

    },

    setUpCameraControls: () => {

        SetUpCameraControls.init();

    },

    setUpPlayerAndTarget: () => {

        PlayerAndTarget.init();
        PlayerStats.init();
        TurnOrder.init();

    },

    displayLoading: (x) => {

        if ( x <= 0 ) { x = 0 };
        if ( x >= 100 ) { x = 100 };
        Css.editElementCSS( 'loadingBar', 'width', `${x}%` );

    },

    updateDebug: () => {

        SetUpDebug.update();

    },

    updatePlayerAndTarget: () => {

        PlayerAndTarget.update();
        PlayerStats.update();
        TurnOrder.update();

    },

}

export default HtmlAndCSS;