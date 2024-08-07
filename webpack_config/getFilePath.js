
/* eslint-env node */
 
 
 const fs = require("fs");
 
 /**
  * 【遍历某文件下的文件目录】
  *
  * @param {String} path 路径
  * @returns {Array} ["about","index"]
  */
 module.exports = function getFilePath(path){
     let fileArr = [];
     let existpath = fs.existsSync(path); //是否存在目录
     if(existpath){
         let readdirSync = fs.readdirSync(path);  //获取目录下所有文件
         readdirSync.map((item)=>{
             let currentPath = path + "/" + item;
             let isDirector = fs.statSync(currentPath).isDirectory(); //判断是不是一个文件夹
             if(isDirector && item != "components" && item != "base" && item != "redux" && item != "util"){ // component目录下为组件 需要排除
                 fileArr.push(item);
             }
         });
         console.log("扫描./src后的entry数组",fileArr)
         return fileArr;
     }
    } 