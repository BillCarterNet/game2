const helper = {

    hexToRGBA: ( hex, opacity ) => {

        return 'rgba(' + ( hex = hex.replace( '#', '' ) )
        .match( new RegExp( '(.{' + hex.length/3 + '})', 'g' ) )
        .map( function( l ) { return parseInt( hex.length % 2 ? l + l : l, 16 ) } )
        .concat( isFinite(opacity) ? opacity : 1 ).join( ',' ) + ')';

    },

    generateRandomHexColor: () => {

        const letters = '0123456789ABCDEF';
        let color = '0x';
        for ( let i = 0; i < 6; i++ ) {
          color += letters[ Math.floor( Math.random() * letters.length ) ];
        }
        return parseInt( color );
    
    },

};

export default helper;
