$(document).ready(function(){

//alert("I'm here");
	// Front End UI
	var UI = function(){
		return this;
	}
	var displayEntriesBtnElm;
	var submitBtnElm;
	var fName;
	var lName;
	var Age;
	var message;
	var entryList;

	UI.prototype.init = function(){
		//console.log('UI -> init()');

		//all the things I need to get started

		// garb jq elements and save it to vars
		submitBtnElm = $('#submit');
		displayEntriesBtnElm = $('#show_all_name');
		message = $('.message');
		entryList = $('.db_result');
		
		// assign click actions
		submitBtnElm.click(validate);
		displayEntriesBtnElm.click(onRenderList);
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
			displayEntriesBtnElm.show();
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
        		console.log('SHIT WE FAILEd');
        	}
        });
		// onSuccess renderList();  onFail() renderError();

	}

	function onSuccess(){
		console.log('UI -> onFail()');
		message.show();
		//Display Error to users
	}


	function onRenderList(e){
		console.log('UI -> onRenderList()');
		e.preventDefault();
		message.hide();
		entryList.show();
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
            
		$('#delete').click(function(){
   			var firstname = $(this).attr('id');//using the id of the firstname as id for the delete button.
  			 $.post('/delete/', {'firstname' : firstname}, function(){
     		 $(this).parent('div').remove(); //hide the entry from the user
   });
});

            // var remove = $('#delete');
            // remove.click(removeEntry);
            //console.log(data);
         });
	}

	// function removeEntry(e){
	// 	e.preventDefault()
	// 	console.log('Jean');
	// }

	var myUI = new UI();
	myUI.init();

});