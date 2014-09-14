var http = require("http"),
    url  = require("url");

function start(route, handler) {
    function onRequest(request, response) {
        console.log(" Request received ");

//        var postData = '';
        var pathName = url.parse(request.url).pathname;
        console.log(" Request for '" + pathName + "' received");

//        request.setEncoding("utf8");
//        request.addListener("data", function(postDataChunk) {
//            postData += postDataChunk;
//            console.log("Received POST data chunk '" + postDataChunk + "' ");
//        });

//        request.addListener("end", function() {
//            route( handler, pathName, response, postData );
//        });
        route( handler, pathName, response, request );
    }

    http.createServer(onRequest).listen(8888);
    console.log(" Server has started ");
}

exports.start = start;