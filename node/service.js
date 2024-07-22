/**
 * @author zhangyanbin
 * @date 2021年10月23日 下午7:40
 * @describe
 */

var db = require('./mysql-dao');
class tempService {
	search(cb){
		db.query('select * from user', [],function(result,fields){
			console.log('查询结果：');
			console.log(result);
			cb(result)
		});
	}
}

module.exports = new tempService();