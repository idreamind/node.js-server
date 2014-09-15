/**
 * Created by dreamind on 13.09.2014.
 */
var colors = require("./../node_modules/colors/colors.js");

function route( handler, pathName, response, request, postData ) {
    console.log(" Request for '" + pathName + "' received".green);

    if(typeof handler[pathName] === 'function') {
        handler[pathName](response, request, pathName, postData);
    } else {
        console.log("No request handler found for '".red + pathName + "' ");
        response.writeHead(404, { "Content-type": "text/html" });
        response.write("<h1>404 Not Found</h1>");
        response.end();
    }
}

exports.route = route;