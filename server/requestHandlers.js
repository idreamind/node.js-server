/**
 * Created by dreamind on 13.09.2014.
 */

var dataReadWrite = require("./../js/ng-modules/dataReadWrite.js"),
      querystring = require("querystring"),
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

    var dataFrom = JSON.parse(postData),
        data = '';

    switch(dataFrom.want) {
        case "all":
            dataReadWrite.readData( response );
            break;
        case "append":
            data = dataFrom.data;
            break;
        case "rewrite":
            data = dataFrom.data;
            break;
        case "delete":
            switch (dataFrom.what) {
                case "all":
                    data = "Всё удалено!";
                    break;
                case "latest":
                    break;
            }
            break;
    }
}

exports.start  = start;
exports.css    = css;
exports.js     = js;
exports.server = server;