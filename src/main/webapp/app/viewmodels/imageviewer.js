define(['durandal/app','knockout','require','classes','viewmodels/userinfo'],
function (app,ko,require,classes,userinfo) {
	return {
     image: ko.observable(),
     activate: function (item) {
     	var self = this;
     	self.image(item);
     },
     cancel: function (dialogResult) {
 		this.__dialog__.close();
 	 },
     attached: function(view){
    	 $(view).draggable({
    	      handle: ".modal-draggable"
    	  });
     }
   };
});