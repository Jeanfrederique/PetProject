var mysql = require('mysql');

var sqlInfo= {
	host: 'localhost',
	user: 'root',
	password: '', 
	database: 'ClientTesting'
}

var connection = mysql.createConnection(sqlInfo);
connection.connect();
console.log("Database connection");

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

DBInterface.prototype.removeEntry = function(id){
	//this is not working..will fix later.
	connection.query("DELETE FROM People WHERE id = '"+id+"'");

}



// singleton
module.exports = new DBInterface();

// reg class
//module.exports = mySqlControls;

