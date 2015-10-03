    define(['durandal/app','knockout','require','classes','viewmodels/userinfo'],
    		function (app,ko,require,classes,userinfo) {
    var router = require('plugins/router');
    return {
    	alerts : ko.observableArray(),
        router: router,
        useranonim: ko.observable(true),
        useradmin: ko.observable(false),
        loginVisible: ko.observable(false),
        menuOpened: ko.observable(false),
        selectedAd: ko.observable(),
        activate: function () {
        	var self = this;
        	ko.bindingHandlers.currency = { 
        		    update: function(element, valueAccessor, allBindingsAccessor) { 
        		    	
        		        var value = valueAccessor()(); 
        		        var valueUnwrapped = ko.utils.unwrapObservable(value); 
        		        
        		        var m = ""; 
        		        if (valueUnwrapped) {        
        		            m = parseInt(valueUnwrapped); 
        		            if (m) { 
        		                m = m.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + " Ft";
        		            } 
        		        }        
        		        $(element).text(m);    
        		    } 
        		}; 
        	
        	ko.bindingHandlers.dateString = {
        		    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        		        var value = valueAccessor(),
        		            allBindings = allBindingsAccessor();
        		        var valueUnwrapped = ko.utils.unwrapObservable(value);
        		        var pattern = allBindings.datePattern || 'MM/dd/yyyy';
        		        $(element).text((new Date(valueUnwrapped)).toLocaleString());
        		    }
        		}
        	
        	$.when(userinfo).then(function(){
        		self.useranonim(userinfo.isAnonim());
        		self.useradmin(userinfo.isAdmin());
        		var index = {
                                route: '',
                                title: 'Minden hirdetés',
                                moduleId: 'viewmodels/adsviewer',
                                nav: false
        		};
        		var adsview = {
                        route: 'adsviewer',
                        title: 'Minden hirdetés',
                        moduleId: 'viewmodels/adsviewer',
                        nav: true
                    };
        		var myadsview = { 
                        route: 'myads', 
                        title:'Hirdetéseim', 
                        moduleId: 'viewmodels/myads', 
                        nav: true 
                    };
        		
        		var adminview = {
                        route: 'admin',
                        title: 'Admin',
                        moduleId: 'viewmodels/admin',
                        nav: true
                    };
        		
        		if(userinfo.isAnonim()){
        			router.map([index,adsview]).buildNavigationModel();
        		}else{
        			if(userinfo.isAdmin()){
        				router.map([index,adsview,myadsview,adminview]).buildNavigationModel();
        			}else{
        				router.map([index,adsview,myadsview]).buildNavigationModel();
        			}
        		}                  
                return router.activate();
        	});
        	
           
        },
        adEditorVisible: ko.observable(false),
        login: function(){
        	console.log("login happened...");
        	var self = this;
        	self.removeMenu();
            var app = require('durandal/app');
            app.showDialog('viewmodels/login');
        },
        info: function(){
        	console.log("user info requested");
        	var self = this;
        	self.removeMenu();
        	 var app = require('durandal/app');
             app.showDialog('viewmodels/userdetails');
        },
        removeMenu: function(){
        	var menu = $("#bt-menu");
        	menu.removeClass('bt-menu-open' );
            menu.addClass('bt-menu-close' );
        },
        createAd: function(){
        	var self = this;
        	var app = require('durandal/app');
	        app.showDialog('viewmodels/ad');
        },
        createCategory: function(){
        	var self = this;
        	var app = require('durandal/app');
	        app.showDialog('viewmodels/category');
        },
        showGallery: function(){
        	var self = this;
    	    app.showDialog('viewmodels/gallery',false);
        },
        upload: function(){
        	var self = this;
    	    app.showDialog('viewmodels/uploader');
        },
        attached: function(view){
        	var self = this;
        	
        	(function() {
          		 
        	    // http://stackoverflow.com/a/11381730/989439
        	    function mobilecheck() {
        	        var check = false;
        	        (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        	        return check;
        	    }
        	 
        	    function init() {
        	 
        	        var menu = $( '#bt-menu' ),
        	            trigger = menu.find( 'a.bt-menu-trigger' ),
        	            // event type (if mobile, use touch events)
        	            eventtype = mobilecheck() ? 'touchstart' : 'click',
        	            resetMenu = function() {
        	                menu.removeClass('bt-menu-open' );
        	                menu.addClass('bt-menu-close' );
        	            },
        	            closeClickFn = function( ev ) {
        	                resetMenu();
        	                overlay.off('click', closeClickFn );
        	            };
        	 
        	        var overlay = '<div class="bt-overlay"></div>';
        	        menu.append( overlay );
        	        trigger.on('click', function( ev ) {
        	            ev.stopPropagation();
        	            ev.preventDefault();
        	             
        	            if( menu.hasClass( 'bt-menu-open' ) ) {
        	                resetMenu();
        	            }
        	            else {
        	                 menu.removeClass('bt-menu-close' );
        	                menu.addClass('bt-menu-open' );
        	                $(".bt-overlay").on('click', closeClickFn );
        	            }
        	        });
        	 
        	    }
        	 
        	    
        	    init();
        	    $('.md-trigger').on('click',function(){
        	    		var overlay = document.querySelector( '.md-overlay' );

        	    		[].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

        	    			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
        	    				close = modal.querySelector( '.md-close' );

        	    			function removeModal( hasPerspective ) {
        	    				$(modal).removeClass( 'md-show' );

        	    				if( hasPerspective ) {
        	    					$( document.documentElement).removeClass( 'md-perspective' );
        	    				}
        	    			}

        	    			function removeModalHandler() {
        	    				removeModal( $(el).hasClass( 'md-setperspective' ) ); 
        	    			}

        	    			el.addEventListener( 'click', function( ev ) {
        	    				$(modal).addClass( 'md-show' );
        	    				overlay.removeEventListener( 'click', removeModalHandler );
        	    				overlay.addEventListener( 'click', removeModalHandler );

        	    				if( $(el).hasClass( 'md-setperspective' ) ) {
        	    					setTimeout( function() {
        	    						$(document.documentElement).addClass('md-perspective' );
        	    					}, 25 );
        	    				}
        	    			});

        	    			close.addEventListener( 'click', function( ev ) {
        	    				ev.stopPropagation();
        	    				removeModalHandler();
        	    			});

        	    		} );
        	    		
        	    		
        	    });
        	})();
        	
        	app.on("categories:refresh",function(){
        		self.removeMenu();
    		});
        	
        	app.on("ads:refresh",function(){
        		self.removeMenu();
    		});
        	
        	//hibakezelés
        	$(document).ajaxError(function(event, request, settings) {
                switch (request.status) {
                    case 200 :
                        break;            
                    case 401 :                
                    	self.alerts.push({'message': 'A kért elemhez nincs hozzáférési jogosultsága.', 'priority': 'danger'});
                    	
                        break;
                    case 404 :                
                    	self.alerts.push({'message': 'A kért elem nem található. Üzenet: ' + ko.mapping.fromJSON(request.responseText).message(), 'priority': 'danger'});
                    	
                        break;
                    
                    case 500 :
                    		//$("#system_errors").html(ko.mapping.fromJSON(request.responseText).message());
                    	self.alerts.push({'message': 'A szerveroldalon hiba történt. Üzenet: ' + ko.mapping.fromJSON(request.responseText).message(), 'priority': 'danger'});
                    	break;
                    default :
                    	
                        break;
                }
            });
        }
    };
    });