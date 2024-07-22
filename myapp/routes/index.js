var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express111111111' });
  const rootDir = path.resolve(__dirname, '..'); // 上级目录
  const filePath = path.join(rootDir, 'public/index.html');
  console.log("1111", rootDir, filePath)
  res.sendFile(filePath)
  // res.sendFile('/Users/zhangyanbin/Desktop/react/react-webpack/myapp/static/index.html')
});

module.exports = router;
