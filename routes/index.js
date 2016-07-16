var express = require('express');

module.exports = function (app) {
    app.get('/', function (req, res) {
    	console.log("主页");
        res.render('index');
    });
    
    
}
