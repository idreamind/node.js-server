/**
 * Created by dreamind on 10.09.2014.
 */
var exec = require("child_process").exec;

function start( response ) {
    console.log("REQUEST handler START was called");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html" charset="UTF-8">' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<p>' +
        '<input type="submit" value="Submit text">' +
        '</p>' + 
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-type": "text/html" });
    response.write( body );
    response.end();

//    exec("dir", function (error, stdout, stderr ) {
//        response.writeHead(200, { "Content-type": "text/plain" });
//        response.write( stdout );
//        response.end();
//    });
}

function upload( response ) {
    console.log("REQUEST handler UPLOAD was called");

    response.writeHead(200, { "Content-type": "text/plain" });
    response.write("Hellow, Upload!!!");
    response.end();
}

exports.start = start;
exports.upload = upload;



