	
var config = {}

config.mysql = {};

if (process.env.PORT != undefined) {
	console.log("===> heroku")
	config.mysql.host = 'us-cdbr-east-04.cleardb.com';
	config.mysql.user = 'b663d272590db3';
	config.mysql.password = '0a2d0b83';
	config.mysql.database = 'heroku_a52750b65b3f3b8';
	config.mysql.port=3306
} else {
	console.log("===> local")
	config.mysql.host = 'localhost';
	config.mysql.user = 'root';
	config.mysql.password = '';
	config.mysql.database = 'ClientTesting';
	config.mysql.port = 3306;
}

module.exports = config;

