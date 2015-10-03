define(['knockout','classes','viewmodels/userinfo'],
function(ko,classes,userinfo) {
	var self = this;
	return {
		repassword: ko.observable(""),
		activate : function() {
			var self = this;
			
			self.user = ko.observable();
			$.when(userinfo).then(function(){
				self.user(userinfo.getUser());
			});
			
			console.log("userdetails activated...");
		},
		cancel: function (dialogResult) {
			this.__dialog__.close();
	    },
	    save: function(){
	    	var self = this;
	    	console.log("userdetails save...");
	    	//jquery validation test
			if($("#reg-form").valid()){
				self.user().save();
			}
	    },
		attached : function(view) {
			console.log("userdetails attached...");
			$(view).draggable({
	    	      handle: ".modal-draggable"
	    	  });
			
			$.validator.addMethod("phone", function(value, element,param) {
			    return  this.optional(element) || /^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/.test(value);
			}, "Your entered data is not foo");
			var requiredtxt = " megadása kötelező.";
			//jquery validation init
			$("#reg-form").validate({
			    
		        rules: {
		        	 firstname: "required",
			         lastname: "required",
			         password: { 
			        	 required: true,
			        	 minlength: 4,
			        	 maxlength: 8
			         },
			         phone: {
			        	 phone: true
			         }
		        },
		        messages: {
		        	 firstname: "Vezetéknév "+ requiredtxt,
			            lastname: "Keresztnév "+ requiredtxt,
			            password: {
			            	required: "Jelszó "+ requiredtxt,
			            	minlength: "A jelszónak legalább 4 karakter hosszúnak kell lennie.",
			            	maxlength: "A jelszó legfeljebb 8 karakter hosszú lehet."
			            },
			            phone: {
			            	phone: "A megadott telefonszám nem megfelelő formátumú."
			            }
		        	
		        }
		    });
		}
	};
});