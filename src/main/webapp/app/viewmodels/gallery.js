define(['durandal/app','knockout','require','classes','viewmodels/userinfo'],
function (app,ko,require,classes,userinfo) {
	return {
     fileInfos: ko.observableArray(),
     for_selection: ko.observable(false),
     activate: function (for_selection) {
     	var self = this;
     	self.for_selection(for_selection);
     	self.fileInfos.removeAll();
     	$.getJSON('api/gallery').done(function(properties){
			var loadedFiles = ko.wrap.fromJS(properties);
			for(var i in loadedFiles()){
    			self.fileInfos.push(new classes.FileInfo(loadedFiles()[i]));
			}
		});
     },
     selectItem: function(item){
    	 var self = this;
    	 if(self.for_selection()){
    		 this.__dialog__.close(item);
    	 }else{
    		 app.showDialog("viewmodels/imageviewer",item.path()+item.name());
    	 }
     },
     deleteItem: function(item){
    	 var self = this;
    	 $.getJSON('api/gallery/delete?item='+item.id()).success(function(){
    		 self.fileInfos.remove(item);
    	 });
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