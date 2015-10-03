define(['require','knockout','classes'],
		function(require,ko,classes) {
    return {
        model: ko.observable(),
        save: function(){
        	var self = this;
        	self.model.save();
        },
        activate: function(data){
        	var self = this;
        	self.model = data;
        },
        attached: function(view){
//        	$('#editAd').modal();
        	$("button.close").click(function(){
        		$('#editAd').remove();
        	});
        }
    };
});