var pg = require('pg');
var constring = "tcp://postgres:910125@localhost:5432/myTest";

var client = new pg.Client(constring);
client.connect();

client.query("create table tbl_todolist(id varchar(50) primary key,val varchar(50))");
client.query("insert into tbl_todolist(id,val) values('123123','aaaaaa')");
client.query("insert into tbl_todolist(id,val) values('444444','bbbbbb')");
//client.query("insert into beatle(id,val) values($1,$2)", [ 'brown', 'aaa' ]);
var query = client.query("select * from tbl_todolist");

query.on('row', function(row) {
	console.log(row);
	console.log("tbl_todolist id:%s", row.id);
	console.log("tbl_todolist val:%s", row.val);
});

query.on('end', function() {
	client.end();
});