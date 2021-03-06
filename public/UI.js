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
		
		// hide all errors
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
      
        	}
        });

	}

	function onSuccess(){
		console.log('UI -> onSuccess()');
		//display success message to user
		message.show();
		
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
			    divCollection +="<tr><td>"+ result[i].LastName + "</td><td></td><td><button class='delete' data-id='"+result[i].id+"'>delete</button></td></tr>"
				if(i === result.length-1){
					divCollection += "</table>"
				}
			};
			div.append(divCollection);

			$('button.delete').click(function(){
		   		var id = $(this).data('id');//using the id of the firstname as id for the delete button.
		   		var self = this;

		  		$.post('/delete/', {'id' : id}, function(){
		     		//console.log("delete completed");
		     		$(self).parents("tr").remove();
		   		});
		   	});
			// 	$("button.delete").hover(function(){
			// 	$(this).append("<span>This is not working yet</span>");
		});
	};

	var myUI = new UI();
	myUI.init();

});
