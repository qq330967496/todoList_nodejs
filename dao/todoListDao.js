var pg = require('pg');
var constring = "tcp://postgres:910125@localhost:5432/myTest";

var config = {
	host : 'localhost',
	port : '5432',
	user : 'postgres',
	password : '910125',
	database : 'myTest',
};

// 连接池
var pool = new pg.Pool(config);

// 查询所有
function queryAllData(callback) {
	console.log("查询所有数据");

	pool.query('select * from tbl_todolist order by id', function(err, result) {
		if (err) console.log(err);
		var todoListData = { "data" :  result.rows}; 
		callback(todoListData);
	});
}

// 保存所有
function saveAllData(json) {
	removeAllData();
	console.log("保存所有数据");
	for (var i = 0; i < json.data.length; i++) {
		var valArr = [ json.data[i].id, json.data[i].val ];
		pool.query("insert into tbl_todolist(id,val) values($1,$2)",valArr,function(err) {
			if (err) console.log(err);
		});
	}
}

//删除所有数据
function removeAllData(){
	console.log("删除所有数据");
	pool.query('delete from tbl_todolist', function(err) {
		if (err) console.log(err);
	});
}

module.exports.queryAllData = queryAllData;
module.exports.saveAllData = saveAllData;
