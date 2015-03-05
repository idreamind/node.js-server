/*
 * Nose.JS Express WEB-server: Logger
 */
'use strict';

var Helper  = require('./helpers'),
    helper  = new Helper();

function Logger() {

    var log      = this,
        colWidth = 30,
        colTime  = 30;

    log.getLog      = getLog;
    log.logToFile   = logToFile;

    // Create log string:
    function getLog( req  ) {

        var dateTimeStr = helper.getCurrentTime(),
            logArr      = [
                req.hostname,
                dateTimeStr,
                req.path,
                helper.pathType( req.path )
            ];

        var logStr = logArr.reduce( createStr_, "" );

        log.logToFile( logStr );
    }

    // Write log string to file:
    function logToFile( str ) {
        console.log( 'App at http://%s', str );
    }

    // Create string:
    function createStr_( prevStr, str, i ) {

        if( typeof str !== "string" ) {
            return;
        }

        var width = colWidth;
        if( i === 0 ) {
            width = colTime;
        }

        while( width > str.length ) {
            if( width > str.length ) {
                str = str + " ";
            }
        }

        return prevStr + str;
    }

    return log;
}

module.exports = Logger;