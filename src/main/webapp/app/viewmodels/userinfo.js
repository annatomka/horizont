define(['durandal/app','knockout','classes'],function(app,ko,classes) {
    function  User(){
           	
    	var self = this;
    	app.on('login').then(function(){
    		console.log("login trigger catched...");
    		self.user(null);
    		self.loadUser(true);
    	});
    	self.user = ko.observable();
        self.anonim = ko.observable(true);
        self.admin = ko.observable(false);
            this.loadUser = function(refresh){
            	  if(self.user() == null){
            		  var call = $.getJSON('api/user/info');
            		  call.success(function(user){
            			  
            	console.log("user loaded... user"+user);
            		  if(user == null){
            			  self.anonim(true);
            			  self.admin(false);
            			  return;
            		  }
            		  self.user(new classes.User(user));
                      self.anonim(false);
                      self.admin(user.admin);
                      if(refresh && refresh ===true)
                    	  location.reload(true);
            		  });
                       call.fail(function(jqXHR, textStatus, errorThrown){
                       	console.log("userinfo load fail...");
                       	if(errorThrown=="Unauthorized"){
                       		//anonim user
                       		self.anonim(true);
                       	}
                       });
            	   }
            };
           this.loadUser();
           this.getUser = function(){ 
                return self.user();
        	  
           };
           this.isAnonim = function(){
        	   return self.anonim();
           };
           this.reset = function(){
        	   self.user(null);
        	   self.loadUser();
           };
           
           this.isAdmin = function(){
        	   return self.admin();
           };

    };

    var _ctx = new User();
    return _ctx;
});