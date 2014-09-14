/**
 * Created by dreamind on 13.09.2014.
 */

var querystring = require("querystring"),
     formidable = require("formidable"),
             fs = require("fs");

// Only for start:
function start( response, request, pathName, postData ) {
    fs.readFile("templates/app.html", function( error, data ) {
        if( error ) {
            response.writeHead(200, { "Content-type": "text/html" });
            response.write( "<h1>404 Requested template not Found</h1><h2>Error: " + error + "</h2>" );
            response.end();
        } else {
            response.writeHead(200, { "Content-type": "text/html" });
            response.write( data );
            response.end();
        }
    });
}

function css( response, request, pathName, postData ) {

    var correctPath = pathName.substring(1);
    fs.readFile(correctPath, function( error, data ) {
        if( error ) {
            response.writeHead(200, { "Content-type": "text/html" });
            response.write( "<h1>404 Requested CSS not Found</h1><h2>Error: " + error + "</h2>" );
            response.end();
        } else {
            response.writeHead(200, { "Content-type": "text/css" });
            response.write( data );
            response.end();
        }
    });
}

function js( response, request, pathName, postData ) {

    var correctPath = pathName.substring(1);
    fs.readFile(correctPath, function( error, data ) {
        if( error ) {
            response.writeHead(200, { "Content-type": "text/html" });
            response.write( "<h1>404 Requested JS not Found</h1><h2>Error: " + error + "</h2>" );
            response.end();
        } else {
            response.writeHead(200, { "Content-type": "text/javascript" });
            response.write( data );
            response.end();
        }
    });
}

function server( response, request, pathName, postData ) {
    console.log("Received POST data chunk '" + postData + "' ");
    response.writeHead(200, { "Content-type": "text/plain" });
    response.write("You've sent: '" + postData + "' ");
    response.end();
}

//var postData = '';
//if( request.method == 'POST' ) {
//    var form = new formidable.IncomingForm();
//    form.parse( request, function( error, fields, files) {
//        postData = fields.want;
//        console.log( "All data: " + fields );
//    });
//}
//    console.log( " Post Data: " + postData );

exports.start  = start;
exports.css    = css;
exports.js     = js;
exports.server = server;