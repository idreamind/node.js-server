var http = require("http");
var url  = require("url");

function start(route, handler) {
    function onRequest(request, response) {
        console.log(" Request received ")

        var pathName = url.parse(request.url).pathname;
        console.log(" Request for '" + pathName + "' received");

        route( handler, pathName, response );
    }

    http.createServer(onRequest).listen(8888);
    console.log(" Server has started ");
}

exports.start = start;