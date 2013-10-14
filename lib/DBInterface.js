var mysql = require('mysql');

var sqlInfo= {
	host: 'localhost',
	user: 'root',
	password: '', 
	database: 'ClientTesting'
}

var connection = mysql.createConnection(sqlInfo);
connection.connect();
console.log("I'm connected");

function DBInterface(){

}

DBInterface.prototype.addRecord = function(settings){
	console.log('settings', settings);
	var query = "INSERT INTO People (FirstName, LastName, Age) VALUES ?";
	var values = [[settings.fname, settings.lname, settings.age],];
	var onQuery = function(err){
		if(err) throw err;
	};
	connection.query(query, [values], onQuery);
};

DBInterface.prototype.getRecord = function(res){
	//var sqlResults;
	var query = "SELECT * FROM People";
	connection.query(query, function(err, result){
		if (err) throw err;
		for(var i = 0; i < result.length; i++){
			console.log(result[i]);
		}
		res.send(result);
	})
	

}

DBInterface.prototype.removeEntry = function(){
	
	fname = settings.fname;
	connection.query("DELETE FROM People WHERE firstname = 'fname'");





	// var query = "DELETE FROM People WHERE id =  ?";
	// connection.query(query, function(err, result){
	// 	if (err) throw err;
	
	// })


}

// function insert(setting){
// 	var sql = "INSERT INTO People (FirstName, LastName, Age) VALUES ?";
// 	var values = [[setting.fname, setting.lname, setting.age],];

// 			Connect.query(sql, [values], function(err)){
// 				if(err) throw err;

// 			}
// }

// function delete(setting){
// 	var  = "DELETE FROM People WHERE id = 'setting'";
	
// }

// function get(){
// 	 var sqlResults;
// 	   var query= "SELECT * FROM People";
// 	    //console.log("Hello, I'm am here!!")
// 	    Connect.query(query, function(err, result){
// 	        if (err) {
// 	            throw err;
// 	        }

// }

// singleton
module.exports = new DBInterface();

// reg class
//module.exports = mySqlControls;

