let express = require( 'express' );
let app = express();
let server = require( 'https' ).Server( app );
const https = require('https')
const fs = require('fs')
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'MEN.png' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

let io = require( 'socket.io' )( sslServer );

io.of( '/stream' ).on( 'connection', stream );

sslServer.listen(3030, () => console.log('secure server on port 3030'))

//server.listen( 3030 );
