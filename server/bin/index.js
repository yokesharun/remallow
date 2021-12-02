#!/usr/bin/env node

const colors = require('colors');
const greet = require("../lib/exe");

// get arguments after first two elements in process.argv
var arguments = process.argv.splice(2);

const currentFolder = process.cwd();

// check if user want language specific greeting
// default value of language is `null`
var lang = null;

// check if first argument is `--lang`
if (arguments[0] == '--lang') {
    // set second argument as language.
    lang = arguments[1];
}


// if `lang` is empty, then show random greeting
if (lang) {
    // print random greeting
    console.log(
        // wraps text with rainbow color formatting
        colors.rainbow(
            // returns the greeting text with specified language
            greet.greet(lang)
        )
    );
}
else {
    // print random greeting
    console.log(process.cwd())

    const { exec } = require('child_process');
    const ChromeLauncher = require('chrome-launcher');

    const { getInstalledPath } = require('get-installed-path')
    getInstalledPath('remallow').then((path) => {
        console.log(path)
        // exec('cd '+path+' && npm run start', (err, stdout, stderr) => {
        //     if (err) {
        //         //some err occurred
        //         console.error(err)
        //     } else {
        //         // the *entire* stdout and stderr (buffered)
        //         console.log(`stdout: ${stdout}`);
        //         console.log(`stderr: ${stderr}`);
        //     }
        // });
        // exec('cd '+path+' && node server/bin/server.js', (err, stdout, stderr) => {
        //     if (err) {
        //         //some err occurred
        //         console.error(err)
        //     } else {
        //         // the *entire* stdout and stderr (buffered)
        //         console.log(`stdout: ${stdout}`);
        //         console.log(`stderr: ${stderr}`);
        //     }
        // });
    })

    ChromeLauncher.launch({
        startingUrl: 'http://127.0.0.1:4000',
        chromeFlags: [`--app=http://127.0.0.1:4000`]
    }).then(chrome => {
        console.log(`Remallow Package Manager running on http://127.0.0.1:4000`);
    });

    console.log(
        // wraps text with rainbow color formatting
        colors.rainbow(
            // returns the random greeting text
            greet.greetRandom()
        )
    );
}

console.log(currentFolder)

const getPackage = (res) => {
    var fs = require('fs'),
    path = require('path'),   
    filePath = path.join(currentFolder, 'package.json');
    fs.readFile(filePath, "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        console.log("File data:", jsonString);
        res.send(jsonString);
    });
}



var express = require('express');
var app = express();
var utils = require('./index');

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3663');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/package', function (req, res) {
    getPackage(res)
})

var server = app.listen(8081, function () {
   var host = 'http://127.0.0.1/'
   var port = '8081';
   console.log("Example app listening at http://%s:%s", host, port)
})


module.exports = { getPackage, currentFolder }