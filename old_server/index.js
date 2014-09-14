/**
 * Created by dreamind on 09.09.2014.
 */
var server = require("./modules/server");
var route  = require("./modules/route");
var requestHandlers = require("./modules/requestHandlers");

var handler = {};
handler["/"] = requestHandlers.start;
handler["/start"] = requestHandlers.start;
handler["/upload"] = requestHandlers.upload;
handler["/show"] = requestHandlers.show;

server.start(route.route, handler);