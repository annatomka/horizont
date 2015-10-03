define(['durandal/app','knockout', 'viewmodels/userinfo'],function(app,ko,userinfo) {
	var self = this;
	return {
		images : ko.observableArray([]),
        username: ko.observable(),
        password: ko.observable(),
		activate : function() {
			var self = this;
			console.log("activated...");
		},
		processLogin: function(){
			var self = this;
		},
		register: function(){
			var self = this;
			this.__dialog__.close();
//		     var app = require('durandal/app');
	         app.showDialog('viewmodels/registration');
		},
		cancel: function (dialogResult) {
			this.__dialog__.close();
	    },
		attached : function(view) {
			console.log("attached...");
			$(view).draggable({
	    	      handle: ".modal-draggable"
	    	  });
			//callback handler for form submit
			$("#form").submit(function(e)
			{
			    var postData = $(this).serializeArray();
			    var formURL = $(this).attr("action");
			    $.ajax(
			    {
			        url : formURL,
			        type: "POST",
			        data : postData,
			        success:function(data, textStatus, jqXHR) 
			        {
			            //data: return data from server
			        	console.log("login success...");
			        	app.trigger('login');
			        },
			        error: function(jqXHR, textStatus, errorThrown) 
			        {
			        	console.log("login failed...");
			        	$("#errors-container").append('<div class="common-error alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-exclamation-triangle"></i>  Sikertelen bejelentkezés.</div>');
						
			        }
			    });
			    e.preventDefault(); //STOP default action
			});
			 
//			$("#form").submit(); //Submit  the FORM
//			var form = $('#form'),
//            submit = form.trigger.bind(form, 'submit');
//		//Enter bind
//        form.keypress(function(event){
//			if(event.which == 13){
//				$.when(submit()).done(function(param){
//					console.log("login done...");
//				});
//			}
//		});
		}
	};
});