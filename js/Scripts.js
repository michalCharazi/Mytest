

$(document).ready(function(){
	
	var persons = [];

	var person = function(_firstName, _lastName, _nickName, _gender, _email, _password){
		this.firstName = _firstName;
		this.lastName = _lastName;
		this.nickName = _nickName;
		this.gender = _gender;
		this.email = _email;
		this.password = _password;
	};

	

	$("#formDeatails").validate({
		rules:
		{
			fname:{required:true},
            lname:{required:true},
            nickname:{required:true},
            rdoGender:{required:true},
            email:{
            		   required:true,
            		   email:true
            	  },
            confirmEmail:{
            				 required:true,
            				 equalTo: "#email"
           				 },
            password:{
            	          required:true,
            	          minlength:8,
            	          maxlength:12
                     },
            confirmPassword:{
            					required:true,
            					equalTo: "#password"
            				},
            demand1: {required:true},
            errorPlacement: function(error, element) {
                error.appendTo(element.parent("div").next("div"));
            },
		},
		 messages: 
		 {
			fname: {required: "You mast enter your first name"},
			confirmPassword: {equalTo: "equal error"},
			password: {maxlength: "Please enter at most 12 characters.",}
		 },
		
		success:function(){
			$("#errordiv").css("display","block");
		},
        errorClass: "Error"
	});

     $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "password have to contain numbers and characters"
        );
     $("#password").rules("add", { regex: "^(?=.*[a-zA-Z])(?=.*[0-9])" });  

     $("#formDeatails").submit(function(element){
		if($("#formDeatails").valid())
		{
			var em = $("#email").val();
			var w = $.grep(persons, function(e){ return e.email == em; });
    		if(w!=0 || w==" ")
     		{
       			element.preventDefault();
       			alert("Email exsist already please press new email");
       		}
       		else
       		{
       			var f =  $("#fname").val();
				var l =  $("#lname").val();
				var n =  $("#nickname").val();
				if($("#rdoM").prop("checked"))
					var g = "male";
				else
					var g = "female";
				var e = $("#email").val();
				var s = $("#password").val();
				var p = new person(f,l,n,g,e,s);
				alert(p.firstName + " " + p.lastName + " "+ p.nickName + " " + p.gender + " " + p.email + " " + p.password);
				persons.push(p);
				element.preventDefault();
				$("#errordiv").css("display","none");
       		}
		}
		else
		{
			$("#errordiv").css("display","block");
			
		}
	});

    
});