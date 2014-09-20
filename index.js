/**
 * Created by dreamind on 13.09.2014.
 *
 * This is the entry point to the server **/

var server = require("./server/server"),
    router = require("./server/router"),
    requestHandlers = require("./server/requestHandlers");

var handler = {};
handler["/"] = requestHandlers.start;

// img:
handler["/image/gym-hop.png"] = requestHandlers.img;

// css:
handler["/css/style.css"] = requestHandlers.css;
handler["/css/animation.css"] = requestHandlers.css;
handler["/bower_components/angular/angular-csp.css"] = requestHandlers.css;

// js:
handler["/bower_components/angular/angular.js"] = requestHandlers.js;
handler["/bower_components/angular-animate/angular-animate.js"] = requestHandlers.js;
handler["/bower_components/jquery/dist/jquery.js"] = requestHandlers.js;

handler["/js/ng-modules/app.module.js"] = requestHandlers.js;
handler["/js/ng-modules/getDataSFactory.js"] = requestHandlers.js;
handler["/js/ng-modules/appendSDataFactory.js"] = requestHandlers.js;
handler["/js/ng-modules/deleteSDataFactory.js"] = requestHandlers.js;
handler["/js/ng-modules/dataLoadFactory.js"] = requestHandlers.js;
handler["/js/ng-modules/plotDataCtrl.js"] = requestHandlers.js;
handler["/js/ng-directives/PanoramicPicture.js"] = requestHandlers.js;

handler["/server"] = requestHandlers.server;

server.start( router.route, handler );