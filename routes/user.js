var url = require('url');
var userDao  = require('../dao/userDao');


function getUsers(){
	//用户
	var users = [{"id":"1111111111","userName":"admin","password":"admin"},
	             {"id":"2222222222","userName":"guest","password":"guest"}];
	return users;
}

//检查登录
function checkLogin(username,password,callback){
	userDao.queryAllData(function (json){
		var users = json.data;
		var loginUser = undefined;
		for(var i=0;i<users.length; i++){
			console.log(username);
			console.log(users[i]);
			if(username==users[i].username && password == users[i].password){
				loginUser = users[i];
				console.log(users[i].username+"登录成功！");
				break;
			}
		}
		if(loginUser){
			delete loginUser["password"];
		}
		
		callback(loginUser);
	});
	
	
}

//获取get参数
function getGetParams(req){
	var getParamStr = url.parse(req.url).query;
	getParamStr = unescape(getParamStr);
	var getParamArr = getParamStr.split("&");
	var getParams = {};
	for(var i=0; i<getParamArr.length;i++){
		var paramName = getParamArr[i].split("=")[0];
		var value = getParamArr[i].split("=")[1];
		getParams[paramName] = value;
	}
	return getParams;
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
    		/*var getParamStr = url.parse(req.url).query;
    		getParamStr = unescape(getParamStr);
    		var getParamArr = getParamStr.split("&");
    		var getParams = {};
    		for(var i=0; i<getParamArr.length;i++){
    			var paramName = getParamArr[i].split("=")[0];
    			var value = getParamArr[i].split("=")[1];
    			
    			getParams[paramName] = value;
    		}*/
            var getParams = getGetParams(req);
    		
    		//认证
            checkLogin(postParams.username, postParams.password,function (loginUser){
            	req.session.user = loginUser;
        		//跳转
        		if(loginUser){
        			if(!getParams.redirect){
        				getParams.redirect = "/index";//默认跳转
        			}
        			res.redirect(getParams.redirect);
        		}else{
        			res.redirect('/login');
        		}
            });
        });
    });
	
	//获取登录用户信息
	app.get('/getLoginUserInfo', function(req, res){
		console.log("获取登录用户信息");
		var getLoginUserInfo = req.session.user;
		res.send(getLoginUserInfo);
    });
	
	//登出
	app.get('/logout', function(req, res){
		console.log("登出");
		req.session.user = null;
		
		res.redirect('login');
    });
	
	//检测登录
	app.post('/login/checkLogin',function(req, res){
		console.log("检测登录");
		var bufferArr=[];
        req.on("data",function(data){
            bufferArr.push(data);
        });
        req.on("end",function(){
        	//获取post参数
            var postData = Buffer.concat(bufferArr).toString();
            var postParams = require("querystring").parse(postData);
            
            checkLogin(postParams.username, postParams.password,function (loginUser){
            	if(loginUser){
        			res.send(true);
        		}else{
        			res.send(false);
        		}
            });
        });
		
		
	});
}






