/**
 * Created by dreamind on 10.09.2014.
 */
//var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

//function start( response, postData ) {
function start( response, request ) {
    console.log("REQUEST handler START was called");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html" charset="UTF-8">' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<p>' +
        '<input type="file" name="upload">' +
        '</p>' +
        '<p>' +
        '<input type="submit" value="Upload file">' +
        '</p>' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-type": "text/html" });
    response.write(body);
    response.end();
}

//function upload( response, postData ) {
function upload( response, request ) {
    console.log("REQUEST handler UPLOAD was called");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");

        /* ! */
        fs.rename(files.upload.path, "./temp/test.png", function(err) {
            if(err) {
                console.log("we have error...");
                fs.unlink("./temp/test.png");
                fs.rename(files.upload.path, "./temp/test.png", function(err) {
                    console.log("too error...");
                });
            }
        });
        response.writeHead(200, {"Content-Type":"text/html"});
        response.write("received imaage:<br>");
        response.write("<img src='/show'>");
        response.end();
    });
//    response.writeHead(200, { "Content-type": "text/plain" });
//    response.write("You've sent: '" + querystring.parse(postData).text + "' ");
//    response.end();
}

function show( response, postData ) {
    console.log("REQUEST handler SHOW was called");
    fs.readFile("./temp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type":"image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;


