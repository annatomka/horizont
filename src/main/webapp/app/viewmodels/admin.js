 define(['durandal/app','knockout','require','classes','viewmodels/userinfo'],function (app,ko,require,classes,userinfo) {
 return {
	  users: ko.observableArray([]),
	  categories: ko.observableArray([]),
	  ads: ko.observableArray([]),
	  actualUser: ko.observable(""),
	  deleteUser: function(user){
		var self = this;
		user._destroy(true);
		user.save();
	  },
	  deleteCategory: function(cat){
		  cat._destroy(true);
		  cat.save();
	  },
	  deleteAd: function(ad){
		  ad._destroy(true);
		  ad.save();
	  },
	  formatname: function(userInRow){
		  var self = this;
		  var ret =  userInRow.lastname() + ' ' + userInRow.firstname() +' <span style="color: grey;"> ('+userInRow.email()+')</span>';
		
		return ret;  
	  },
	  getCategories: function(){
		  var self = this;
		  self.categories.removeAll();
		     $.getJSON('api/categories').done(function(properties) {
				var loadedCategories = ko.wrap.fromJS(properties);
				for(var i in loadedCategories()){
					self.categories.push(new classes.Category(loadedCategories()[i]));
				}
			});
	  },
	  getAds: function(){
		var self = this; 
		 self.ads.removeAll();
	     $.getJSON('api/ads').done(function(properties) {
			var loadedAds = ko.wrap.fromJS(properties);
			for(var i in loadedAds()){
				self.ads.push(new classes.Ad(loadedAds()[i]));
			}
		});
	  },
	  showAd: function(ad){
	    	var self = this;
		    app.showDialog('viewmodels/ad',ad);
	     },
	  attached: function(view){
		  var self = this;
		 self.actualUser(userinfo.getUser().id());
		 self.users.removeAll();
	     $.getJSON('api/users').done(function(properties) {
			var loadedUsers = ko.wrap.fromJS(properties);
			for(var i in loadedUsers()){
				if(self.actualUser()!=loadedUsers()[i].id())
				self.users.push(new classes.User(loadedUsers()[i]));
			}
		});
	   self.getAds();
	   app.on("ads:refresh",function(){
		   self.getAds();
	   });
	   
	   self.getCategories();
	   app.on("categories:refresh",self.getCategories.bind(self));
	  }
   };
});