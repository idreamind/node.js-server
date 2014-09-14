/**
 * Created by dreamind on 13.09.2014.
 */
function route( handler, pathName, response, request ) {
    console.log(" Request for '" + pathName + "' received");

    if(typeof handler[pathName] === 'function') {
        handler[pathName](response, request, pathName);
    } else {
        console.log("No request handler found for '" + pathName + "' ");
        response.writeHead(404, { "Content-type": "text/html" });
        response.write("<h1>404 Not Found</h1>");
        response.end();
    }
}

exports.route = route;