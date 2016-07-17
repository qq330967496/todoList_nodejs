启动步骤：

1.在postgreSQL库中创建todoList表和user表，初始化user数据：
	create table tbl_todolist(id varchar(50) primary key,val varchar(4000),userid varchar(50));
	create table tbl_user(id varchar(50) primary key,username varchar(100),password varchar(100));
	insert into tbl_user(id,username,password) values('1111111111','admin','admin');
	insert into tbl_user(id,username,password) values('2222222222','guest','guest');

2.配置conf/db.js的参数

3.控制台启动，CLI如下：
$node app.js
