/**
 * Created by dreamind on 13.09.2014.
 *
 * This is the main-server file **/

var http = require("http"),
    url  = require("url");

function start( route, handler ) {
    function onRequest( request, response ) {
        console.log( " Request receiver " );

        var pathName = url.parse(request.url).pathname;
        route( handler, pathName, response, request  );
    }

    http.createServer( onRequest ).listen(8888);
    console.log( " Server has started " );
}

exports.start = start;
