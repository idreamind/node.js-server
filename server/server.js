/*
 * Test Template Server: Server
 */
'use strict';

var cons    = require('consolidate'),
    Simple  = require('./Simple'),
    simple  = new Simple(),
    express = require('express'),
    http    = require('http'),
    app     = express();

var portName = 3000;

simple.setMode( 'prod' );

app.engine( 'html', simple.render );
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');

app.use('/is', express.static(__dirname + '/static/server.html') );
app.use('/static', express.static( __dirname + '/static'    ) );
app.use( express.static( __dirname + '/static'    ) );
app.use( express.static( __dirname + '/templates' ) );

app.use( function( req, res ) {
    console.log( req.path );
    if( req.path === "/") {
        res.render('simple', {
            title: "Simple.JS",
            data: "Hello There!",
            unData: "Ref. Error"
        });
    }
} );

http.createServer(app).listen(portName, function(){
    console.log(" Server Run " );
} );
