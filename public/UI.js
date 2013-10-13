$(document).ready(function(){

//alert("I'm here");
	// Front End UI
	var UI = function(){
		return this;
	}

	var submitBtnElm;
	var fName;
	var lName;
	var Age;

	UI.prototype.init = function(){
		//console.log('UI -> init()');

		//all the things I need to get started

		// garb jq elements and save it to vars
		submitBtnElm = $('#submit');
		
		
		// assign click actions
		submitBtnElm.click(validate);
	}

	function validate(e){
		//console.log('UI -> validate()');

		var errorsFound = 0;
		e.preventDefault();
		var onlyLetters = new RegExp(/^[A-Za-z]+$/);
        var onlyNumbers = new RegExp(/^[0-9]/);
		
		// hide all
		$('.error').hide();

		//grabs all values from form
		fName = $('#fName').val();
		lName = $('#lName').val();
		Age = $('#Age').val();
		
		//checks validity
		//if(!onlyLetters.test(fName)){
		if(!onlyLetters.test(fName)){
			errorsFound++;
			$('.error.fname').show();
		}
		if(!onlyLetters.test(lName)){
			errorsFound++;
			$('.error.lname').show();
		}
		if(!onlyNumbers.test(Age)){
			errorsFound++;
			$('.error.age').show();
		}

		// check errors
		if(errorsFound === 0){
			submitForm();
		}
		console.log("I found " + errorsFound + " errors");
	}

	function submitForm(){
		console.log('UI -> submitForm()');

		//Create ajax to serve endpoint
		var myData = {
        fname: fName,
        lname: lName,
        age: Age
    	};
		//send passed data
		$.ajax({
			type: "POST",
			url: "/send/", 
			data: myData, 
			success: onRenderList,
        	error: function(){
        		console.log('SHIT WE FAILEd');
        	}
        });
		// onSuccess renderList();  onFail() renderError();

	}

	function onFail(){
		console.log('UI -> onFail()');

		//Display Error to users
	}


	function onRenderList(){
		console.log('UI -> onRenderList()');

		//Display Delete button
		$.get("/get/", function(result){
            console.log("End point data has been received!");
            var div= $( "#data" );
            var divCollection = '';

            for(var i=0; i< result.length; i++){
            	if(i === 0){
            		divCollection += "<table>";
            	}
                divCollection +="<tr><td>"+ result[i].FirstName + "</td><td></td><td><button id='delete'>delete</button></td></tr>";
            	if(i === result.length-1){
            		divCollection += "</table>";
            	}
            };
            div.append(divCollection);
            //console.log(data);
         });
	}

	var myUI = new UI();
	myUI.init();

});