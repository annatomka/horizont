requirejs.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	waitSeconds: 0,
    paths: {
        'text': '../vendor/require/text',
        'durandal':'../vendor/durandal/js',
        'plugins' : '../vendor/durandal/js/plugins',
        'transitions' : '../vendor/durandal/js/transitions',
        'knockout': '../vendor/knockout/knockout-2.3.0',
        'wrap': '../vendor/knockout/knockout.wrap',
        'mapping': '../vendor/knockout/knockout.mapping',
        'bootstrap': '../vendor/bootstrap/js/bootstrap',
        'jquery': '../vendor/jquery-2.1.0',
        'metrojs': '../vendor/MetroJs',
        'wookmark' : '../vendor/jquery.wookmark',
        'colorbox' : '../vendor/jquery.colorbox-min',
        'imagesLoaded' : '../vendor/jquery.imagesloaded',
        'snap' : '../vendor/snap.svg',
        'knockoutbootstrap' : '../vendor/knockout-bootstrap.min',
        'validate' : '../vendor/jquery/jquery.validate',
        'isotope' : 'isotope.pkgd',
        'fileupload': '../vendor/upload/jquery.fileupload',
        'bridget': '../vendor/jquery/jquery.bridget',
        'iframe': '../vendor/upload/jquery.iframe-transport',
        'knob': '../vendor/upload/jquery.knob',
        'widget': '../vendor/upload/jquery.ui.widget',
        'script': '../vendor/upload/script',
        'jquery-ui' : '../vendor/jquery-ui-1.10.4.custom',
        'gmap3': '../vendor/gmap3'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       },
       'imagesLoaded': {
    	   deps: ['wookmark'],
           exports: 'jQuery'
       },
       'knockoutbootstrap': {
    	   deps: ['jquery','bootstrap'],
           exports: 'jQuery'
       },
       'validate': {
    	   deps: ['jquery'],
           exports: 'jQuery'
       },
       'bridget': {
    	   deps: ['jquery'],
           exports: 'jQuery'
       },
       'fileupload': {
    	   deps: ['jquery','widget'],
           exports: 'jQuery'
       },
       'knob': {
    	   deps: ['jquery'],
           exports: 'jQuery'
       },
       'script': {
    	   deps: ['jquery','fileupload'],
           exports: 'jQuery'
       },
       'jquery-ui': {
    	   deps: ['jquery'],
           exports: 'jQuery'
       },
       "gmap3": {
           deps: ["jquery"]
       }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'util','classes','knockout','snap','bootstrap','knockoutbootstrap','validate','isotope','bridget','fileupload','iframe','knob','widget','script','jquery-ui','gmap3'],  
		function (system, app, viewLocator,util,classes,ko) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Horizont';
   
    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });
    

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();
        //Show the app by setting the root view model for our application with a transition.
        //app.setRoot('viewmodels/shell', 'entrance');
        app.setRoot('viewmodels/shell');
        
        $("button.close").click(function(){
        	$(".modal").remove();
        });
        $(function(){
        	 var shrinkHeader = 300;
        	  $(window).scroll(function() {
        	    var scroll = getCurrentScroll();
        	      if ( scroll >= shrinkHeader ) {
        	           $('.header').addClass('shrink');
        	           $('.left-menu').addClass('shrink-menu');
        	           $('#container').addClass('w-97');
        	        }
        	        else {
        	            $('.header').removeClass('shrink');
        	            $('.left-menu').removeClass('shrink-menu');
        	            $('#container').removeClass('w-97');
        	        }
        	  });
        	function getCurrentScroll() {
        	    return window.pageYOffset || document.documentElement.scrollTop;
        	    }
        });
        
    });
});