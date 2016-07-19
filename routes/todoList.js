var fs = require("fs");
var url = require('url');
//引入todoListDao
var todoListDao = require('../dao/todoListDao');


var dataFile = "todoList.json";

module.exports = function (app) {
	//获取数据
	app.get('/getData', function(req, res){
    	console.log("获取数据");
    	//读取数据
    	var userid = req.session.user.id;
    	todoListDao.queryDataByUserId(userid,function (data){
    		var objects = data
    		console.log(objects);
        	res.send(objects);
    	});
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
            var json = JSON.parse(postData);
            console.log(json);
            //var userid = req.session.user.id;
            todoListDao.saveData(json);
            res.end();
        });
	});
}

//文件存储方式
/*//查询所有数据
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
*/




