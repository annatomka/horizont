define(['knockout','classes'],function(ko,classes) {
	return {
        username: ko.observable(),
        password: ko.observable(),
		activate : function() {
			var self = this;
			self.user = new classes.User();
			console.log("registration activated...");
		},
		processRegistration: function(){
			var self = this;
			//jquery validation test
			if($("#reg-form").valid()){
				
				var promise = $.getJSON("api/check?email="+self.user.email());
					promise.done(function(isOk){
						if(isOk){
							self.user.save().done(function(ret){
								if(ret){
									$("#errors-container").append('<div class=" alert alert-info alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-check-circle-o"></i>  A regisztráció sikeres volt. A megadott email címmel már be tud jelentkezni.</div>');
									
								}
							});
						}else{
							$("#errors-container").append('<div class="common-error alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-exclamation-triangle"></i>  A megadott email címmel már regisztráltak. Kérjük válasszon másikat.</div>');
						}
					});
					
				
			}
		},
		cancel: function (dialogResult) {
			this.__dialog__.close();
	    },
		attached : function(view) {
			console.log("registration attached...");
			$(view).draggable({
	    	      handle: ".modal-draggable"
	    	  });
			var form = $('#form'),
            submit = form.trigger.bind(form, 'submit');
			var requiredtxt = " megadása kötelező.";
			$.validator.addMethod("phone", function(value, element,param) {
			    return  this.optional(element) || /^(\+[1-9][0-9]*(\([0-9]*\)|-[0-9]*-))?[0]?[1-9][0-9\- ]*$/.test(value);
			}, "Your entered data is not foo");
			
			//jquery validation init
			$("#reg-form").validate({
			    
		        rules: {
		        	 firstname: "required",
			         lastname: "required",
			         email: {required:true,email:true},
			         password: { 
			        	 required: true,
			        	 minlength: 4,
			        	 maxlength: 8
			         },
			         category: "required",
			         phone: {
			        	 phone: true
			         }
		        },
		        messages: {
		        	 firstname: "Vezetéknév "+ requiredtxt,
			            lastname: "Keresztnév "+ requiredtxt,
			            email: {
			            	required: "Email cím "+ requiredtxt,
			            	email: "A megadott email-cím nem megfelelő formátumú. Helyes formátum: anonim@gmail.com"
			            },
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
			
		//Enter bind
        form.keypress(function(event){
			if(event.which == 13){
				submit();
			}
		});
		}
	};
});