/**
 * Created by dreamind on 14.09.2014.
 */

var fs = require("fs");

function writeData( data ) {

}

function readData( response ) {

    var getData = "none";

    fs.readFile("data/data.json", function( error, data ) {
        if( error ) {
            response.errors = error;
        } else {
            getData = JSON.parse( data );

            console.log( "Days: " + getData.days );
            console.log( "Weight: " + getData.weight );
            console.log( "Fat: " + getData.fat );
            console.log( "Water: " + getData.water );

            response.writeHead(200, { "Content-type": "text/plain" });
            response.write("You've sent: '" + getData + "' ");
            response.end();

        }
    });
}

exports.writeData = writeData;
exports.readData  = readData;