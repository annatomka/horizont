define(['durandal/app','durandal/system','plugins/http', 'durandal/app', 'knockout','wookmark','imagesLoaded','colorbox','isotope','classes'],
		function (app,system,http, app, ko,wookmark,imagesLoaded,colorbox,Isotope,classes) {
	self.myEditor = ko.observable();
    return {
        displayName: 'Flickr',
        ko: ko,
        myEditor: ko.observable(),
        selectedAd: ko.observable(),
        images: ko.observableArray([]),
        ads: ko.observableArray([]),
        categories: ko.observableArray([]),
        format: function(str){
        	return '["'+str+'"]';
        },
        getCategories: function(){
        	var self = this;
        	self.categories.removeAll();
			//kategóriák betöltése
			$.getJSON('api/categories').done(function(properties){
				var loadedCategories = ko.wrap.fromJS(properties);
				var all = new classes.Category();
				all.id('*');
				all.name('Minden kategória');
				self.categories.push(all);
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
				console.log("loaded ads: "+loadedAds().length);
				for(var i in loadedAds()){
        			self.ads.push(new classes.Ad(loadedAds()[i]));
				}
				
			});
        },
        activate: function () {
        	var self = this;

        	
        	self.getAds();
        	app.on("ads:refresh",function(){
        		self.getAds();
        	});
        	
        	self.getCategories();
        	app.on("categories:refresh",function(){
        		self.getCategories();
        	});
            //the router's activator calls this function and waits for it to complete before proceding
            if (this.images().length > 0) {
                return;
            }

        },
        convertToSelector: function(name){
        	if(name=="*")
        		return name;
        	return '.'+name;
        },
        select: function(item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/detail';
            app.showDialog(item);
        },
        editAd: function(item){
        	var self = this;
        	
        	self.adEditorVisible(true);
        	self.selectedAd(item);
        },
        adEditorVisible: ko.observable(false),
        createAd: function(){
        	var self = this;
        	//selectedAd átállítása
        	//editpanel visible
        	self.adEditorVisible(true);
        	self.selectedAd(new classes.Ad());
        	
        },
        clearSelectedAd: function(){
        	var self = this;
        	self.adEditorVisible(false);
        	self.selectedAd(undefined);
        },
        showImageViewer: function(path){
        	var self = this;
        	var path_to_open = path.replace("/t_","/");
        	app.showDialog('viewmodels/imageviewer',path_to_open);
        },
        attached: function(view){

        	$.bridget( 'isotope', Isotope );
        	
        	
        	$('#iso_ads').ready(function(){
        		console.log("iso ads ready");
        		var $container = $('#content');
        		setTimeout(function(){$container.isotope({
        			filter: '*',
        			animationOptions: {
        		     duration: 750,
        		     easing: 'linear',
        		     queue: false,
        		   }
        		});},400);

        		$('#nav a').click(function(){
        			console.log("nav a");
        		  var selector = $(this).attr('data-filter');
        		    $container.isotope({ 
        			filter: selector,
        			animationOptions: {
        		     duration: 750,
        		     easing: 'linear',
        		     queue: false,
        			 
        		   }
        		  });
        		  return false;
        		});
        	});
//        	$.bridget( 'isotope', Isotope );
//    		var $container = $('#content');
//    		$container.isotope({
//    			filter: '*',
//    			animationOptions: {
//    		     duration: 750,
//    		     easing: 'linear',
//    		     queue: false,
//    		   }
//    		});
//
//    		$('#nav a').click(function(){
//    		  var selector = $(this).attr('data-filter');
//    		    $container.isotope({ 
//    			filter: selector,
//    			animationOptions: {
//    		     duration: 750,
//    		     easing: 'linear',
//    		     queue: false,
//    			 
//    		   }
//    		  });
//    		  return false;
//    		});

        }
    };
});