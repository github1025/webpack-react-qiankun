var express = require('express');
var app = express();
const tempService = require('./service');

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
  });
app.use('/public', express.static('public'));

app.get('/', function(req,res) {
    console.log("主页 GET 请求")
    res.send("Hellow GET");
})

app.post('/', (req, res)=>{
    console.log("主页 POST 请求");
    res.send("Hello POST")
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
    console.log("/del_user 响应 DELETE 请求");
    res.send('删除页面');
 })
  
 //  /list_user 页面 GET 请求
 app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
 })
  
 // 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
 app.get('/ab*cd', function(req, res) {   
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
 })

 app.get('/process_get', function (req, res) {
    // 输出 JSON 格式
    var response = {
        "first_name":req.query.first_name,
        "last_name":req.query.last_name
    };
	 tempService.search((result)=>{
	 	console.log("controler接受到的值",result)
		 res.send(JSON.stringify(result));
	 })
    console.log(response);
 })

var server = app.listen(8081,()=>{
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})