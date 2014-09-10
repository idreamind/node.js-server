/**
 * Created by dreamind on 10.09.2014.
 */
//function route( handler, pathName, response, postData ) {
function route( handler, pathName, response, request ) {
    console.log(" Route request for '" + pathName + "' pathname");

    if(typeof handler[pathName] === 'function') {
        handler[pathName](response, request);
    } else {
        console.log("No request handler found for '" + pathName + "' ");
        response.writeHead(404, { "Content-type": "text/plain" });
        response.write("404 Not Found");
        response.end();
    }
}

exports.route = route;
