// https://www.opencodez.com/java-script/static-website-with-node-js-webserver.htm
// https://github.com/pavansolapure/opencodez-samples/tree/master/node-web-server

let express = require( "express" );

let app = express();

app.use( express.static( 'public' ) );

// Custom css, js and images
app.use( '/css', express.static( __dirname + '/public/css') );
app.use( '/js', express.static( __dirname + '/public/js') );
app.use( '/images', express.static( __dirname + '/public/images') );

// Three modules
app.use( '/build/', express.static( __dirname + '/node_modules/three/build') );
app.use( '/jsm/', express.static( __dirname + '/node_modules/three/examples/jsm') );
app.use( '/dat/', express.static( __dirname + '/node_modules/dat.gui/build') );

let server = app.listen( 8081, () => {

    let port = server.address().port;
    console.log( __dirname );
    console.log( "Server started at http://localhost:%s", port );
    
});