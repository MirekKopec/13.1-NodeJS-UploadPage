var fs = require('fs');
var formidable = require('formidable');
var util = require('util')

var orgFileName;

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");

    var form = new formidable.IncomingForm();

    form.parse(request, function(error, fields, files) {
 

        var oldPath = files.upload.path;
        var newPath = './uploaded/' + files.upload.name;        

        fs.renameSync(oldPath, newPath, function(err) {
            if (err) next(err);
            res.end();
        });

        orgFileName = newPath;


        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image: " +files.upload.name+ "<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");

    fs.readFile('templates/start.html', function(err, html) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });

}

exports.startStyle = function(request, response) {
    console.log("Rozpoczynam obsługę żądania styles.");

    fs.readFile('styles/style.css', function(err, css) {
        response.writeHead(200, {"Content-Type": "text/css"});
        response.write(css);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload");
    fs.readFile(orgFileName, "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/jpeg"});
        response.write(file, "binary");
        response.end();
    });
}