var pg = require('pg');
var conf_db = require('../conf/db');

// 连接池
var pool = new pg.Pool(conf_db.postgres);

// 查询所有
function queryAllData(callback) {
	console.log("查询所有数据");
	
	pool.query('select * from tbl_user order by id', function(err, result) {
		if (err){
			console.log(err);
			return;
		}
		
		var allData = { "data" :  result.rows}; 
		callback(allData);
	});
}

module.exports.queryAllData = queryAllData;
