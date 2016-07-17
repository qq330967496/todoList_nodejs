var express = require('express');
var url = require('url');

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
    		console.log(getParams);
    		
    		var isLogin = false;
    		//认证
    		if(postParams.userName=="admin" && postParams.password == "admin"){
    			isLogin = true;
    			req.session.user = {"id":"1111111111","userName":"admin"};
    		}
    		
    		
    		//跳转
    		if(isLogin){
    			res.redirect(getParams.redirect);
    		}else{
    			res.redirect('/login');
    		}
    		
        });
		
		
    });
}