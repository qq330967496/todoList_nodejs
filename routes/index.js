var express = require('express');

module.exports = function (app) {
    app.get('/todolist', function (req, res) {
    	console.log("主页");
        res.render('index');
    });
    
    
}
