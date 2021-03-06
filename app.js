﻿var express = require('express');
var session = require('express-session');
var index = require('./routes/index');
var todoList = require('./routes/todoList');
var user = require('./routes/user');
var path = require('path');
var ejs = require('ejs');
var app = express();

//ejs模板支持html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//设置静态文件目录
app.use('/public', express.static(path.join(__dirname, '/public')));

//配置session
app.use(session({ 
	secret: 'test', 
	cookie: { maxAge: 30 * 60 * 10000 },
	resave: true, //每次请求重置时间
	saveUninitialized: false, //不保存未初始化的session cookie
}));

//登录拦截器
app.use(function (req, res, next) {
    var url = req.originalUrl;
    //白名单
    var whiteList = ["/public","/login"];
    var isRedirect = true;
    
    for(var i=0;i<whiteList.length;i++){
    	if(url.indexOf(whiteList[i])>-1){
    		isRedirect = false;
    		break;
    	}
    }
    if (req.session.user) {
    	isRedirect = false;
    }
    
    if(isRedirect){
    	console.log("登录拦截器-未登录");
    	return res.redirect('/login?redirect='+url);
    }
    
    next();
});

//设置路由
user(app);
index(app);
todoList(app);

var server = app.listen(8080, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log("应用实例，访问地址为 http://%s:%s", host, port);

});