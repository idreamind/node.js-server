/**
 * Created by dreamind on 13.09.2014.
 *
 * This is the main-server file **/

var http = require("http"),
    url  = require("url");

function start( route, handler ) {
    function onRequest( request, response ) {
        console.log( " Request receiver " );

        var postData = '';
        var pathName = url.parse(request.url).pathname;

        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
        });
        request.addListener("end", function() {
            route( handler, pathName, response, request, postData );
        });
//        route( handler, pathName, response, request, postData );
    }

    http.createServer( onRequest ).listen(8888);
    console.log( " Server has started " );
}

exports.start = start;
