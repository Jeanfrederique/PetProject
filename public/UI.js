$(document).ready(function(){

//alert("I'm here");
	// Front End UI
	var UI = function(){
		return this;
	}
	var display_entriesBtnElm;
	var submitBtnElm;
	var fName;
	var lName;
	var Age;
	var success_message;

	UI.prototype.init = function(){
		//console.log('UI -> init()');

		//all the things I need to get started

		// garb jq elements and save it to vars
		submitBtnElm = $('#submit');
		display_entriesBtnElm = $('#show_all_name').hide();
		success_message = $('.message').hide();
		// assign click actions
		submitBtnElm.click(validate);
		display_entriesBtnElm.click(onRenderList);
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
			success_message.show();
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
			success: onSuccess,
        	error: function(){
        		console.log('SHIT WE FAILED');
        	}
        });
		
	}

	function onSuccess(){
		display_entriesBtnElm.show();

	}


	function onRenderList(e){
		console.log('UI -> onRenderList()');
		e.preventDefault();
		//removing success message.
		success_message.show();
		//Display entries with delete button
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

	function onDelete (){

		$.get("/delete", function(){
			
			
		})

	}

	var myUI = new UI();
	myUI.init();

});