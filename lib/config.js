	
var config = {}

config.mysql = {};



config.mysql.host = 'hostname';
config.mysql.port = 6379;
config.mysql.port = process.env.WEB_PORT || 9980;

module.exports = config;