/*
 * Nose.JS Express WEB-server
 */
'use strict';

var express = require('express'),
    http    = require('http'),
    app     = express(),
    Logger  = require('./server/logger'),
    logger  = new Logger(),
    Router  = require('./server/router'),
    router  = new Router(),
    Simple  = require('./server/simple'),
    simple  = new Simple();

var portName = 3000;

app.engine( 'html', simple.render );
app.set('view engine', 'html');
app.set('views', __dirname + '/server/views');

// Log all connections:
app.use( function(req, res, next ) {
    logger.getLog( req );
    next();
} );

// Route Content:
app.use( function( req, res, next ) {
    router.router( req, res, next );
} );

// Send Static Content:
app.use( express.static(__dirname) );
app.use( express.static(__dirname + '/server/views') );

// Create HTTP-server:
http.createServer( app ).listen( portName, startListen );

// On server Start:
function startListen() {
    console.log(" Server Run " );
}

