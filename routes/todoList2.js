var express = require('express');
var fs = require("fs");
var url = require('url');


var dataFile = "todoList.json";

module.exports = function (app) {
	//获取数据
	app.get('/getData', function(req, res){
    	console.log("获取数据");
    	//读取文件
    	var objects = queryAllData();
    	res.send(objects);
    });
	
	//添加
	app.post('/addData', function(req, res){
		console.log("添加数据");
		
		var bufferArr=[];
        req.on("data",function(data){
            bufferArr.push(data);
        });
        req.on("end",function(){
        	//获取参数
            var postData = Buffer.concat(bufferArr).toString();
            var params = require("querystring").parse(postData);
            console.log(params);
            
            var allData = queryAllData();
            var object = {"id":Math.round(Math.random()*10000)+"","val":params.item};
            allData.data[allData.data.length] = object;
            saveData(allData);
            
            res.send(allData);
        });
    });
	
	//删除
	app.get('/removeData', function(req, res){
		console.log("删除数据");
		var params = url.parse(req.url).query;
		params = unescape(params);
		var value = params.split("=")[1];
		var ids = value.split(",");
		console.log("debug:"+ids);
		res.send(removeDataByIds(ids));
	});
	
	//修改
	app.post('/editData', function(req, res){
		console.log("修改数据");
		
		var bufferArr=[];
        req.on("data",function(data){
            bufferArr.push(data);
        });
        req.on("end",function(){
        	//获取参数
            var postData = Buffer.concat(bufferArr).toString();
            var params = require("querystring").parse(postData);
            console.log(params);
            
            res.send(editData(params));
        });
    });
}

//查询所有数据
function queryAllData(){
	var jsonStr = fs.readFileSync(dataFile,"utf-8");
	if(jsonStr==""){
		jsonStr = "{\"data\":[]}";
	}
	var json = JSON.parse(jsonStr); 
	return json;
}
//保存数据
function saveData(jsonobj){
	var json = JSON.stringify(jsonobj); 
	fs.writeFile(dataFile,json);
}
//删除数据
function removeDataByIds(ids){
	var allData = queryAllData();
	var idArr = [];
	for(var i = 0; i < allData.data.length; i++){
		var object = allData.data[i];
		if(ids.indexOf(object.id)>-1){
			idArr.push(i);
		}
	}
	for(var i=idArr.length-1; i>-1; i--){
		allData.data.splice(idArr[i],1);
	}
	saveData(allData);
	return allData;
}
//修改数据
function editData(jsonobj){
	var allData = queryAllData();
	for(var i = 0; i < allData.data.length; i++){
		var object = allData.data[i];
		if(object.id == jsonobj.id){
			object.val = jsonobj.val;
		}
	}
	saveData(allData);
	return allData;
}





