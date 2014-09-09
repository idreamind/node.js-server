/**
 * Created by dreamind on 10.09.2014.
 */
var exec = require("child_process").exec;

function start( response ) {
    console.log("REQUEST handler START was called");

    exec("dir", function (error, stdout, stderr ) {
        response.writeHead(200, { "Content-type": "text/plain" });
        response.write( stdout );
        response.end();
    });
}

function upload( response ) {
    console.log("REQUEST handler UPLOAD was called");

    response.writeHead(200, { "Content-type": "text/plain" });
    response.write("Hellow, Upload!!!");
    response.end();
}

exports.start = start;
exports.upload = upload;



