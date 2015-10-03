define(['durandal/app','knockout','classes','viewmodels/userinfo'],function(app,ko,classes,userinfo) {
	return {
        username: ko.observable(),
        password: ko.observable(),
        image: ko.observable(),
        readonly: ko.observable(false),
        selectedCategory: ko.observable(),
        categories: ko.observableArray([]),
		activate : function(edited) {
			var self = this;
			self.image(undefined);
			if(edited != null){
				self.ad = edited;
				self.selectedCategory(self.ad.category_id());
				if(edited.image_id()!=null){
					//kép betöltése
					$.getJSON('api/gallery/'+edited.image_id()).success(function(item){
						self.image(new classes.FileInfo(item));
					});
				}
			}else{
				self.ad = new classes.Ad();
				
			}
			
			self.categories.removeAll();
			//kategóriák betöltése
			$.getJSON('api/categories').done(function(properties){
				var loadedCategories = ko.wrap.fromJS(properties);
				for(var i in loadedCategories()){
        			self.categories.push(new classes.Category(loadedCategories()[i]));
				}
			});
			console.log("ad activated...");
		},
		selectImage: function(){
			var self = this;
			console.log("select image...");
			 var app = require('durandal/app');
             app.showDialog('viewmodels/gallery',true).then(function(item){
                 console.log(item);
                 self.image(item);
                 self.ad.image_id(item.id());
                 self.ad.image_path(item.path()+'t_'+item.name());
             });
             
		},
		save: function(){
			var self = this;
			
			//jquery validation test
			if($("#ad-form").valid()){
				self.ad.user_id(userinfo.getUser().id());
				self.ad.category_id(self.selectedCategory());
				self.ad.save().complete(function(){
					console.log("ad save complete");
					self.cancel();
					app.trigger("ads:refresh");
				});
			}
		},
		cancel: function (dialogResult) {
			this.__dialog__.close();
	    },
	    uploadDoc: function(type){
			var self = this;
			var $file = '';
			var $uploadform = '';
			var postiframe = '';
			var $postiframe = '';
			var post_url = '';
		
			$file = $('#imagefile');
			postiframe = 'postiframe_image';
				
			$uploadform = $('#uploadform_image');
			post_url = "api/ads/upload/picture";
			
			   var iframe = $('<iframe name="'+postiframe+'" id="'+postiframe+'" style="display: none" src="javascript:false"/>');

	            $("body").append(iframe);
	            $postiframe = $("#"+postiframe);
	            var form = $uploadform;
	            form.attr("action",post_url);
	            form.attr("method", "post");
	            form.attr("enctype", "multipart/form-data");
	            form.attr("encoding", "multipart/form-data");
	            form.attr("target", postiframe);
	            form.attr("file", $file.val());
	            form.submit();

	            $postiframe.load(function () {
	                var iframeContents = $postiframe[0].contentWindow.document.body.innerHTML;
	               
	                $postiframe.remove();
	                iframe.remove();
	            });

	            return false;
		},
		attached : function(view) {
			console.log("ad attached...");
			 $(view).draggable({
	    	      handle: ".modal-draggable"
	    	  });
			
			$.validator.addMethod('positive', function (value, element, param) {

		        return (value != 0) && (value == parseInt(value, 10));
		    }, 'Please enter a non zero integer value!');
			
			//jquery validation init
			$("#ad-form").validate({
			    
		        rules: {
		            adname: "required",
		            category: "required",
		            price: {
		            	number: true,
		            	positive: true,
		            	required: true
		            }
		        },
		        messages: {
		        	adname: "Cím megadása kötelező.",
		        	category: "Kategória megadása kötelező.",
		        	price: {
		        		required: "Az ár megadása kötelező.",
		        		number: "Az ár csak szám lehet.",
		        		positive: "Az ár csak pozitív szám lehet."
		        	}
		        }
		    });
			    
		}
	};
});