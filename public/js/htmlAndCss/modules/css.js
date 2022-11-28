let stylesheet = document.querySelector( `link[href$="/css/game.css"]` );

const css = {

    addRule: ( selector, rule ) => {

        // https://stackoverflow.com/questions/1679577/get-document-stylesheets-by-name-instead-of-index
        let stylesheet = document.querySelector( `link[href$="/css/game.css"]` );
      
        if ( stylesheet ) {
    
            stylesheet = stylesheet.sheet;
        
            if ( stylesheet.addRule ) {
    
                stylesheet.addRule(selector, rule);
    
            } else if ( stylesheet.insertRule ) {
    
                stylesheet.insertRule( selector + ' { ' + rule + ' }', stylesheet.cssRules.length );
    
            }
    
        }
              
    },
    
    editElementCSS: ( id, property, value ) => {
    
        const element = document.getElementById( id );
        element.style[ property ] = value;

    },

    getElementCSS: ( id, property ) => {
    
        const element = document.getElementById( id );

        if ( element.style[ property ] ) {

            return element.style[ property ];

        } else {

            console.log( `No CSS value for property ${property} for element with id ${id}` );

        }
  
    },

}

export default css;

