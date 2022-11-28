import Css from '../htmlAndCss/modules/css.js';

const playerAndTargetPresses = {

    process: () => {

        // Get the HTML buttons
        const playerStatsButton = document.getElementById( 'playerStatsButton' );
        const playerItemButton = document.getElementById( 'playerItemsButton' );
        const playerActionsButton = document.getElementById( 'playerActionsButton' );
        const infoTurnOrderButton = document.getElementById( 'infoTurnOrderButton' );

        // Get the HTML containers
        const playerStatsContainer = document.getElementById( 'playerStatsContainer' );
        const turnOrderContainer = document.getElementById( 'turnOrderContainer' );


        // STATS
        playerStatsButton.onmousedown = () => {

            if ( playerStatsContainer.hidden ) {

                playerStatsContainer.hidden = false;
                playerStatsButton.style.filter = 'invert(0%)';

            } else {

                playerStatsContainer.hidden = true;
                playerStatsButton.style.filter = 'invert(100%)';

            }

        };
        playerStatsButton.onmouseup = () => {

            if ( playerStatsContainer.hidden ) {

                playerStatsButton.style.filter = 'invert(0%)';

            } else {

                playerStatsButton.style.filter = 'invert(100%)';

            }

        };
        // ORDER
        infoTurnOrderButton.onmousedown = () => {

            if ( turnOrderContainer.hidden ) {

                turnOrderContainer.hidden = false;
                infoTurnOrderButton.style.filter = 'invert(0%)';

            } else {

                turnOrderContainer.hidden = true;
                infoTurnOrderButton.style.filter = 'invert(100%)';

            }

        };
        infoTurnOrderButton.onmouseup = () => {

            if ( turnOrderContainer.hidden ) {

                infoTurnOrderButton.style.filter = 'invert(0%)';

            } else {

                infoTurnOrderButton.style.filter = 'invert(100%)';

            }

        };

    }

}

export default playerAndTargetPresses;