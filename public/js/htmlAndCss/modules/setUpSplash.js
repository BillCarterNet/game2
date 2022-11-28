import Css from './css.js';

const html = () => {

    // Container

    const splashContainer = document.createElement( 'div' );
    splashContainer.setAttribute( 'id', 'splashContainer' );
    document.body.appendChild( splashContainer );

    // Loading indicator

    const spinnerContainer = document.createElement( 'div' );
    spinnerContainer.setAttribute( 'class', 'spinnerContainer' );

    const spinnerText = document.createElement( 'div' );
    spinnerText.setAttribute( 'class', 'spinnerText' );
    spinnerText.innerText = 'LOADING';

    spinnerContainer.appendChild( spinnerText );

    const loadingBarContainer = document.createElement( 'div' );
    loadingBarContainer.setAttribute( 'id', 'loadingBarContainer' );
    spinnerContainer.appendChild( loadingBarContainer );

    const loadingBar = document.createElement( 'div' );
    loadingBar.setAttribute( 'id', 'loadingBar' );
    loadingBarContainer.appendChild( loadingBar );

    splashContainer.appendChild( spinnerContainer );

    // Logo

    const logoContainer = document.createElement( 'div' );
    logoContainer.setAttribute( 'id', 'logoContainer' );
    splashContainer.appendChild( logoContainer );

    const outerBlackCircle = document.createElement( 'div' );
    outerBlackCircle.setAttribute( 'id', 'outerBlackCircle' );

    logoContainer.appendChild( outerBlackCircle );

    const outerWhiteCircle = document.createElement( 'div' );
    outerWhiteCircle.setAttribute( 'id', 'outerWhiteCircle' );

    logoContainer.appendChild( outerWhiteCircle );

    const outerMask = document.createElement( 'div' );
    outerMask.setAttribute( 'id', 'outerMask' );

    logoContainer.appendChild( outerMask );

    const innerBlackCircle = document.createElement( 'div' );
    innerBlackCircle.setAttribute( 'id', 'innerBlackCircle' );

    logoContainer.appendChild( innerBlackCircle );

    const innerWhiteCircle = document.createElement( 'div' );
    innerWhiteCircle.setAttribute( 'id', 'innerWhiteCircle' );

    logoContainer.appendChild( innerWhiteCircle );

    const innerMask = document.createElement( 'div' );
    innerMask.setAttribute( 'id', 'innerMask' );

    logoContainer.appendChild( innerMask );

    const logoBar = document.createElement( 'div' );
    logoBar.setAttribute( 'id', 'logoBar' );

    logoContainer.appendChild( logoBar );

}

const css = () => {

    // Container

    Css.addRule( '#splashContainer', 'z-index: 1' );
    Css.addRule( '#splashContainer', 'position: absolute' );
    Css.addRule( '#splashContainer', 'background-color: white' );
    Css.addRule( '#splashContainer', 'top: 0;' );
    Css.addRule( '#splashContainer', 'left: 0;' );
    Css.addRule( '#splashContainer', 'right: 0;' );
    Css.addRule( '#splashContainer', 'bottom: 0;' );

    // Loading Indicator

    Css.addRule( '.spinnerContainer', 'text-align: center;' );
    Css.addRule( '.spinnerContainer', 'position: absolute' );
    Css.addRule( '.spinnerContainer', 'right: 20px' ); 
    Css.addRule( '.spinnerContainer', 'bottom: 20px' );

    Css.addRule( '.spinnerText', 'padding: 5px;' );
    Css.addRule( '.spinnerText', 'font-family: sans-serif;' );

    Css.addRule( '#loadingBarContainer', 'margin-left: 10%;' );
    Css.addRule( '#loadingBarContainer', 'margin-right: 10%;' );
    Css.addRule( '#loadingBarContainer', 'border: 3px solid black;' );
    Css.addRule( '#loadingBarContainer', 'height: 20px;' );
    Css.addRule( '#loadingBarContainer', 'margin-top: 5px;' );
    Css.addRule( '#loadingBarContainer', 'margin-left: 0px;' );
    Css.addRule( '#loadingBarContainer', 'margin-right: 0px;' );

    Css.addRule( '#loadingBar', 'background-color: black' );
    Css.addRule( '#loadingBar', 'height: 20px;' );
    Css.addRule( '#loadingBar', 'width: 100%;' );

    // Logo

    Css.addRule( '#logoContainer', 'position: absolute;' );
    Css.addRule( '#logoContainer', 'margin: auto;' );
    Css.addRule( '#logoContainer', 'top: 0;' );
    Css.addRule( '#logoContainer', 'left: 0;' );
    Css.addRule( '#logoContainer', 'right: 0;' );
    Css.addRule( '#logoContainer', 'bottom: 0;' );
    Css.addRule( '#logoContainer', 'max-width: 100%;' );
    Css.addRule( '#logoContainer', 'max-height: 100%;' );
    Css.addRule( '#logoContainer', 'overflow: auto;' );
    Css.addRule( '#logoContainer', 'background-color: white;' );

    // Want width to be 33% of window width and square
    const logoWidth = Math.round( 0.33 * window.innerWidth );
    Css.addRule( '#logoContainer', `width: ${logoWidth}px;` );
    Css.addRule( '#logoContainer', `height: ${logoWidth}px;` );

    Css.addRule( '#outerBlackCircle', 'position: absolute;' );
    Css.addRule( '#outerBlackCircle', 'border-radius: 50%;' );
    Css.addRule( '#outerBlackCircle', 'padding-top: 100%;' );
    Css.addRule( '#outerBlackCircle', 'width: 100%;' );
    Css.addRule( '#outerBlackCircle', 'height: auto;' );
    Css.addRule( '#outerBlackCircle', 'background: black;' );

    Css.addRule( '#outerWhiteCircle', 'position: absolute;' );
    Css.addRule( '#outerWhiteCircle', 'border-radius: 50%;' );
    Css.addRule( '#outerWhiteCircle', 'padding-top: 90%;' );
    Css.addRule( '#outerWhiteCircle', 'width: 90%;' );
    Css.addRule( '#outerWhiteCircle', 'height: auto;' );
    Css.addRule( '#outerWhiteCircle', 'background: white;' );
    // top = (100 - width) / 2
    Css.addRule( '#outerWhiteCircle', 'top: 5%;' );
    Css.addRule( '#outerWhiteCircle', 'left: 5%;' );
    Css.addRule( '#outerWhiteCircle', 'right: 5%;' );
    Css.addRule( '#outerWhiteCircle', 'bottom: 5%;' );

    Css.addRule( '#outerMask', 'position: absolute;' );
    Css.addRule( '#outerMask', 'border-radius: 0% 150% 150% 0%;' );
    Css.addRule( '#outerMask', 'padding-top: 100%;' );
    Css.addRule( '#outerMask', 'width: 50%;' );
    Css.addRule( '#outerMask', 'height: auto;' );
    Css.addRule( '#outerMask', 'background: white;' );
    Css.addRule( '#outerMask', 'transform: translate(100%, 0%)' );

    Css.addRule( '#innerBlackCircle', 'position: absolute;' );
    Css.addRule( '#innerBlackCircle', 'border-radius: 50%;' );
    Css.addRule( '#innerBlackCircle', 'padding-top: 70%;' );
    Css.addRule( '#innerBlackCircle', 'width: 70%;' );
    Css.addRule( '#innerBlackCircle', 'height: auto;' );
    Css.addRule( '#innerBlackCircle', 'background: black;' );
    // top = (100 - width) / 2
    Css.addRule( '#innerBlackCircle', 'top: 15%;' );
    Css.addRule( '#innerBlackCircle', 'left: 15%;' );
    Css.addRule( '#innerBlackCircle', 'right: 15%;' );
    Css.addRule( '#innerBlackCircle', 'bottom: 15%;' );

    Css.addRule( '#innerWhiteCircle', 'position: absolute;' );
    Css.addRule( '#innerWhiteCircle', 'border-radius: 50%;' );
    Css.addRule( '#innerWhiteCircle', 'padding-top: 60%;' );
    Css.addRule( '#innerWhiteCircle', 'width: 60%;' );
    Css.addRule( '#innerWhiteCircle', 'height: auto;' );
    Css.addRule( '#innerWhiteCircle', 'background: white;' );
    // top = (100 - width) / 2
    Css.addRule( '#innerWhiteCircle', 'top: 20%;' );
    Css.addRule( '#innerWhiteCircle', 'left: 20%;' );
    Css.addRule( '#innerWhiteCircle', 'right: 20%;' );
    Css.addRule( '#innerWhiteCircle', 'bottom: 20%;' );

    Css.addRule( '#innerMask', 'position: absolute;' );
    Css.addRule( '#innerMask', 'border-radius: 150% 0% 0% 150%;' );
    Css.addRule( '#innerMask', 'padding-top: 70%;' );
    Css.addRule( '#innerMask', 'width: 35%;' );
    Css.addRule( '#innerMask', 'height: auto;' );
    Css.addRule( '#innerMask', 'background: white;' );
    // top = (100 - width) / 2
    Css.addRule( '#innerMask', 'top: 15%;' );
    Css.addRule( '#innerMask', 'left: 15%;' );
    Css.addRule( '#innerMask', 'right: 15%;' );
    Css.addRule( '#innerMask', 'bottom: 15%;' );

    Css.addRule( '#logoBar', 'position: absolute;' );
    Css.addRule( '#logoBar', 'padding-top: 0%;' );
    Css.addRule( '#logoBar', 'width: 35%;' );
    Css.addRule( '#logoBar', 'height: 5%;' );
    Css.addRule( '#logoBar', 'background: black;' );
    Css.addRule( '#logoBar', 'top: 47.5%;' );
    Css.addRule( '#logoBar', 'left: 15%;' );
    Css.addRule( '#logoBar', 'right: 15%;' );
    Css.addRule( '#logoBar', 'bottom: 47.5%;' );

    Css.addRule( '#logoBar', 'transform: translate(100%, 0%)' );
    Css.addRule( '#logoBar', 'color: white;' );

}

const setUpSplash = {

    init: () => {

        html();
        css();

    }

}

export default setUpSplash;