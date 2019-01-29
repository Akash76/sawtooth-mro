/**
 * The certificate can be viewed on browser. Please execute this script and then locate to url 
 * that is present in account of asset.
 */

const express = require('express')
const path = require('path')
const fs = require('fs')
var app = express()

app.get('/*', function(req, res) {
    var a = (req.url).split("/")
    fs.readdir(path.join(__dirname, '/views'), function(err, files) {
        var temp = "no"
        for(var i=0; i<files.length; i++) {
            if(files[i] == a[1] + '.png'){
                temp = "yes"
            }
        }
        if(temp == "yes"){
            res.sendFile(path.join(__dirname,'/views/' + a[1] + '.png'))
        } else {
            res.send("Certificate not present")
        }
    })
})

app.listen("3000", function() {
    console.log("App listening on port 3000")
})