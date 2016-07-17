var express = require('express');
var fs = require("fs");
var url = require('url');


var dataFile = "todoList.json";

module.exports = function (app) {
	//获取数据
	app.get('/getData', function(req, res){
    	console.log("获取数据");
    	//读取所有数据
    	var objects = queryAllData();
    	console.log(objects);
    	res.send(objects);
    });
	
	//保存数据
	app.post('/saveData', function(req, res){
		console.log("保存数据");
		
		var bufferArr=[];
        req.on("data",function(data){
            bufferArr.push(data);
        });
        req.on("end",function(){
        	//获取参数
            var postData = Buffer.concat(bufferArr).toString();
            console.log(postData);
            //var params = require("querystring").parse(postData);
            saveAllData(postData);
            res.end();
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

//保存所有数据
function saveAllData(data){
	fs.writeFile(dataFile,data);
}





