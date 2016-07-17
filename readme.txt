启动步骤：

1.在postgreSQL库中创建todoList表和user表，初始化user数据：
	create table tbl_todolist(id varchar(50) primary key,val varchar(4000),userid varchar(50));
	create table tbl_user(id varchar(50) primary key,username varchar(100),password varchar(100));
	insert into tbl_user(id,username,password) values('1111111111','admin','admin');
	insert into tbl_user(id,username,password) values('2222222222','guest','guest');

2.配置conf/db.js的参数

3.启动，CLI如下：
$node app.js


要求：
1）使用node.js语言实现，搭建web应用；（完成）
2) 该web应用实现如上所示的todo list功能，用户可通过浏览器访问该web页面；（完成）
3）todo list页面通过ajax从后端获取示例数据，并展示；（完成）
4）设计和实现用户交互，数据可通过ajax更新到后端；（完成）

加分项：
1）使用gulp或者其他类似构建工具；
2） 上文的demo有一个缺陷， 数据是保存在浏览器/内存中的, 换一个浏览器就无法访问创建的数据了。可考虑把数据保存在postgresql数据库中, 让用户在不同的浏览器中都能访问自己保存的数据。（完成）
3） 该demo没有用户账户功能， 所有用户共享一个todo list。 请让每个用户拥有一个自己的账户，能管理个人的todo list。（完成）
