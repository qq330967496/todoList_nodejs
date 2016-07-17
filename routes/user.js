var express = require('express');
var url = require('url');

//用户
var adminUser = {"id":"1111111111","userName":"admin","password":"admin"};
var guestUser = {"id":"2222222222","userName":"guest","password":"guest"};

//检查登录
function checkLogin(userName,password){
	var loginUser = {};
	if(userName==adminUser.userName && password == adminUser.password){
		loginUser = adminUser;
		console.log("admin登录成功！");
	}
	
	if(userName==guestUser.userName && password == guestUser.password){
		loginUser = guestUser;
		console.log("guest登录成功！");
	}
	delete loginUser["password"];
	return loginUser;
}

module.exports = function (app) {
	
	//登录页面
	app.get('/login', function(req, res){
		console.log("登录页面");
		res.render('login');
    });
	
	//登录
	app.post('/login', function(req, res){
		console.log("登录");
		
		var bufferArr=[];
        req.on("data",function(data){
            bufferArr.push(data);
        });
        req.on("end",function(){
        	//获取post参数
            var postData = Buffer.concat(bufferArr).toString();
            var postParams = require("querystring").parse(postData);
            
            //获取get参数
    		var getParamStr = url.parse(req.url).query;
    		getParamStr = unescape(getParamStr);
    		var getParamArr = getParamStr.split("&");
    		var getParams = {};
    		for(var i=0; i<getParamArr.length;i++){
    			var paramName = getParamArr[i].split("=")[0];
    			var value = getParamArr[i].split("=")[1];
    			
    			getParams[paramName] = value;
    		}
    		
    		//认证
    		var loginUser = checkLogin(postParams.userName, postParams.password);
    		req.session.user = loginUser;
    		//跳转
    		if(loginUser){
    			res.redirect(getParams.redirect);
    		}else{
    			res.redirect('/login');
    		}
    		
        });
    });
	
	//获取登录用户信息
	app.get('/getLoginUserInfo', function(req, res){
		console.log("获取登录用户信息");
		var getLoginUserInfo = req.session.user;
		res.send(getLoginUserInfo);
    });
}






