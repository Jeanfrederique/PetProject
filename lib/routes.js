var dbinterface = require('./DBInterface');

var Routes = function(){

}

//When adding a record to DB.
Routes.prototype.onSend = function(req, res){
	var formData = {
		fname: req.body.fname,
		lname: req.body.lname,
		age: req.body.age,
	}
	dbinterface.addRecord(formData);
	res.send('');
}

Routes.prototype.onGet = function(req, res){
	//Get data from MYSql DB
	var records = dbinterface.getRecord(res);
	
}

Routes.prototype.onDelete = function(req, res){
	//remove entry from mysql database.
	console.log(req.body.id);
	var remove = dbinterface.removeEntry(req.body.id);
	//console.log('Hellooooo Jean' + id);
	res.send('');
}

module.exports = new Routes();


