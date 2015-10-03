define(['durandal/app','knockout','require','classes','viewmodels/userinfo'],
function (app,ko,require,classes,userinfo) {
	return {
     ads: ko.observableArray([]),
     editAd: function(ad){
    	var self = this;
	    app.showDialog('viewmodels/ad',ad);
     },
     deleteAd: function(ad){
    	 var self = this;
    	 ad._destroy(true);
    	 ad.save();
     },
     getAds: function(){
    	 var self = this;
    	 self.ads.removeAll();
      	$.getJSON('api/ads?user_id='+userinfo.getUser().id()).done(function(properties) {
 				var loadedAds = ko.wrap.fromJS(properties);
 				for(var i in loadedAds()){
      			self.ads.push(new classes.Ad(loadedAds()[i]));
 				}
 				
 		});
     },
     activate: function () {
     	var self = this;
     	self.getAds();
     	app.on('ads:refresh',function(){
     		self.getAds();
     	});
     }
   };
});