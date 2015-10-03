define(['durandal/app','knockout','classes'],function(app,ko,classes) {
	return {
		activate : function(edited) {
			var self = this;
			if(edited != null){
				self.category = edited;
			}else{
				self.category = new classes.Category();
			}
			
			console.log("Category activated...");
		},
		save: function(){
			var self = this;
			self.category.save().complete(function(){
				app.trigger('categories:refresh');
				self.cancel();
			});
		},
		cancel: function (dialogResult) {
			this.__dialog__.close();
	    },
		attached : function(view) {
			console.log("Category attached...");
			$(view).draggable({
	    	      handle: ".modal-draggable"
	    	  });
		}
	};
});