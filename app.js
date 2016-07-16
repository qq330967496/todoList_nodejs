var express = require('express');
var index = require('./routes/index');
var todoList = require('./routes/todoList');
var path = require('path');
var ejs = require('ejs');


var app = express();

//ejs模板支持html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//设置静态文件目录
app.use('/public', express.static(path.join(__dirname, '/public')));

//设置路由
index(app);
todoList(app);


var server = app.listen(8080, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})