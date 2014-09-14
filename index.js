/**
 * Created by dreamind on 13.09.2014.
 *
 * This is the entry point to the server **/

var server = require("./server/server"),
    router = require("./server/router"),
    requestHandlers = require("./server/requestHandlers");

var handler = {};
handler["/"] = requestHandlers.start;
handler["/bower_components/angular/angular-csp.css"] = requestHandlers.css;
handler["/bower_components/angular/angular.js"] = requestHandlers.js;
handler["/js/ng-modules/app.module.js"] = requestHandlers.js;
handler["/js/ng-modules/getDataSFactory.js"] = requestHandlers.js;
handler["/js/ng-modules/appendSDataFactory.js"] = requestHandlers.js;
handler["/js/ng-modules/deleteSDataFactory.js"] = requestHandlers.js;
handler["/js/ng-modules/dataLoadController.js"] = requestHandlers.js;
//handler["/server"] = requestHandlers.requests;

server.start( router.route, handler );