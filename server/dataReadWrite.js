/**
 * Created by dreamind on 14.09.2014.
 */

var fs = require("fs"),
    colors = require("./../node_modules/colors/colors.js");

// Append a new data to the end of the JSON-object
function appendData( response, newData ) {

    var setData = "none",
        getData = "none",
        stringEnd = ", ";

    newData = JSON.parse( newData );

    fs.readFile("data/data.json", function( error, data ) {
        if( error ) {
            response.errors = error;
        } else {
            setData = JSON.parse( data );
            setData.days = setData.days.concat( newData.days );
            setData.weight = setData.weight.concat( newData.weight );
            setData.fat = setData.fat.concat( newData.fat );
            setData.water = setData.water.concat( newData.water );

            getData = setData;

            setData.days = setData.days.concat( stringEnd );
            setData.weight = setData.weight.concat( stringEnd );
            setData.fat = setData.fat.concat( stringEnd );
            setData.water = setData.water.concat( stringEnd );

            setData = JSON.stringify( setData );

            fs.writeFile("data/data.json", setData, {flag: 'w'}, function( error ) {
                response.errors += error;
            });

            var dataToSend = JSON.stringify(getData);

            response.writeHead(200, { "Content-type": "text/plain" });
            response.write( dataToSend );
            response.end();
        }
    });
}

// Rewrite a new data to the JSON-object
function rewriteData( response,  newData ) {

    var stringEnd = ", ";

    // Yes! Two times!!!
    newData = JSON.parse( newData );

    console.log( "when goal 1: " + newData.when );

    newData.days = newData.days.concat( stringEnd );
    newData.weight = newData.weight.concat( stringEnd );
    newData.fat = newData.fat.concat( stringEnd );
    newData.water = newData.water.concat( stringEnd );
//    newData.goal = newData.goal.toString();
//    newData.goal = newData.goal.concat( stringEnd );
//    newData.when = newData.when.toString();
//    newData.when = newData.when.concat( stringEnd );

    console.log( "else data: " + newData.water );
    console.log( "when goal 2: " + newData.when );

    setData = JSON.stringify( newData );

    fs.writeFile("data/data.json", setData, {flag: 'w'}, function( error ) {
        response.errors += error;
    });

    var dataToSend = JSON.stringify(newData);

    response.writeHead(200, { "Content-type": "text/plain" });
    response.write( dataToSend );
    response.end();
}

// Read a data from the JSON-object
function readData( response ) {

    var getData = "none";

    fs.readFile("data/data.json", function( error, data ) {
        if( error ) {
            response.errors = error;
        } else {
            getData = JSON.parse( data );
            getData.days = getData.days.slice(0, -2);
            getData.weight = getData.weight.slice(0, -2);
            getData.fat = getData.fat.slice(0, -2);
            getData.water = getData.water.slice(0, -2);

            var dataToSend = JSON.stringify(getData);

            response.writeHead(200, { "Content-type": "text/plain" });
            response.write( dataToSend );
            response.end();
        }
    });
}

function deleteAll( response ) {

    var newData = "{\"days\":\" \", \"weight\":\" \", \"fat\":\" \", \"water\":\" \"}",
        setData = "none";

    fs.writeFile("data/data.json", newData, {flag: 'w'}, function( error ) {
        response.errors += error;
    });

    setData = JSON.parse( newData );
    var dataToSend = JSON.stringify(setData);

    response.writeHead(200, { "Content-type": "text/plain" });
    response.write( dataToSend );
    response.end();
}

function deleteLatest( response ) {

    var setData = "none",
        getData = "none",
        regExp  = new RegExp(" ",'g'),
        stringEnd = ", ";

    fs.readFile("data/data.json", function( error, data ) {
        if( error ) {
            response.errors = error;
        } else {
            setData = JSON.parse( data );

            setData.days = handleObj( setData.days, stringEnd );
            setData.weight = handleObj( setData.weight, stringEnd );
            setData.fat = handleObj( setData.fat, stringEnd );
            setData.water = handleObj( setData.water, stringEnd );

            getData = setData;
            setData = JSON.stringify( setData );

            fs.writeFile("data/data.json", setData, {flag: 'w'}, function( error ) {
                response.errors += error;
            });

            var dataToSend = JSON.stringify(getData);

            response.writeHead(200, { "Content-type": "text/plain" });
            response.write( dataToSend );
            response.end();
        }
    });

    function handleObj( obj, end ) {
        var object = obj;
        object = object.split(" ");
        // It to delete only last changed dara
        if( object.length > 2 ) {
            object.pop();
            object.pop();
            return object + end;
        } else {
            return obj;
        }
    }
}

exports.appendData = appendData;
exports.rewriteData = rewriteData;
exports.readData  = readData;
exports.deleteAll = deleteAll;
exports.deleteLatest = deleteLatest;
