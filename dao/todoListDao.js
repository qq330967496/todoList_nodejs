var pg = require('pg');
var conf_db = require('../conf/db');

// 连接池
var pool = new pg.Pool(conf_db.postgres);

// 查询所有
function queryAllData(callback) {
	console.log("查询所有数据");
	
	pool.query('select * from tbl_todolist order by id', function(err, result) {
		if (err){
			console.log(err);
			return;
		}
		
		var todoListData = { "data" :  result.rows}; 
		callback(todoListData);
	});
}
//根据用户id查询数据
function queryDataByUserId(userid,callback) {
	console.log("根据用户id查询数据");
	var sqlStr = 'select * from tbl_todolist where userid = \''+userid+'\' order by id';
	console.log(sqlStr)
	
	pool.query(sqlStr, function(err, result) {
		if (err){console.log(err); return ;}
		var todoListData = { "data" :  result.rows}; 
		callback(todoListData);
	});
}

// 保存所有
function saveAllData(json) {
	removeAllData();
	console.log("保存所有数据");
	for (var i = 0; i < json.data.length; i++) {
		var valArr = [ json.data[i].id, json.data[i].val,json.data[i].userId ];
		pool.query("insert into tbl_todolist(id,val,userId) values($1,$2,$3)",valArr,function(err) {
			if (err) {console.log(err); return ;}
		});
	}
}
//保存数据，通过用户Id清理数据
function saveData(json){
	var userid = "";
	if(json.data.length>0){
		userid = json.data[0].userid;
	}
	removeDataByUserId(userid,function(){
		console.log("插入数据");
		for (var i = 0; i < json.data.length; i++) {
			var valArr = [ json.data[i].id, json.data[i].val,json.data[i].userid ];
			pool.query("insert into tbl_todolist(id,val,userId) values($1,$2,$3)",valArr,function(err) {
				if (err){console.log(err); return ;}
			});
		}
	});
	
}

//删除所有数据
function removeAllData(){
	console.log("删除所有数据");
	pool.query('delete from tbl_todolist', function(err) {
		if (err) console.log(err);
	});
}
//根据用户id删除数据
function removeDataByUserId(userid,callback){
	console.log("根据用户id删除数据");
	var sqlStr = 'delete from tbl_todolist where userid = \''+userid+'\'';
	console.log(sqlStr);
	pool.query(sqlStr, function(err) {
		if (err){console.log(err); return ;}
		callback();
	});
	
}

module.exports.queryAllData = queryAllData;
module.exports.saveAllData = saveAllData;
module.exports.queryDataByUserId = queryDataByUserId;
module.exports.saveData = saveData;
