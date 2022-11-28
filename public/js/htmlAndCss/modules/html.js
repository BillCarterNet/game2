const html = {

    createTable: (title, id, rows, cols, headings) => {

        let tableContainer = document.createElement( 'div' );
        tableContainer.setAttribute( 'id', 'tableContainer' );
    
        if (title) {

            let tableTitle = document.createElement( 'h2' );
            tableTitle.innerText = title;
            tableContainer.appendChild( tableTitle );

        }
        
        let table = document.createElement( 'table' );
        table.setAttribute( 'id', id );
        table.setAttribute( 'class', 'table' );
    
        let row = document.createElement( 'tr' );
        table.appendChild( row );

        for ( let j = 0; j < cols; j++ ) {
    
            let heading = document.createElement( 'th' );
            heading.innerText = headings[ j ];
            row.appendChild( heading );
    
        }
    
        for ( let i = 0; i < rows; i++ ) {
    
            row = document.createElement( 'tr' );
            table.appendChild( row );
            for ( let j = 0; j < cols; j++ ) {
    
                let data = document.createElement( 'td' );
                data.setAttribute( 'id', `${id}_row_${i}_col_${j}` );
                row.appendChild( data );
    
            }
    
        }
        tableContainer.appendChild( table );
        return tableContainer;
        
    },

    writeElementValue: (id, value) => {

        const element = document.getElementById( id );
        element.innerText = value;

    }

}

export default html;