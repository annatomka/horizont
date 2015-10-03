define(['util', 'class', 'knockout'],
		function(util,Class, ko){
	var classes = {};
	classes.mapping = {
		    'ignore': ["__moduleId__"]
	};
	classes.Ad = Class.extend({
		init:function(properties){
			util.extend(this, {
            	id: '',
            	category_id: '',
            	categoryname: '',
            	location_id: '',
            	location_name: '',
    			location_lat: '',
    			location_long: '',
            	user_id: '',
            	name: '',
            	description: '',
            	price: '',
            	username: '',
            	image_id: '',
            	image_path: '',
            	useremail: '',
            	userphone: '',
            	updated: null,
            	targetPrice: '',//irányár-e
            	offer: '',//keres vagy kínál?
            	rev: 0,
            	_destroy: false,
            }, properties);
		},
		save: function() {
            var ret= $.ajax({
                type: 'POST',
                url: 'api/ads',
                data: ko.mapping.toJSON(this,classes.mapping),
                dataType: 'json',
                contentType: 'application/json'
            });
            return ret;
        }
	});
	classes.Ad.load = function(id){
		 return $.getJSON('api/ads/' + id).pipe(function(properties) {
	            return new classes.Ad(properties);
	        });
	};
	classes.User = Class.extend({
		init:function(properties){
			util.extend(this, {
            	id: '',
            	firstname: '',
            	lastname: '',
            	email: '',
            	password: '',
            	phone: '',
            	company: false,
            	admin: false,
            	rev: 0,
            	_destroy: false,
            }, properties);
		},
		save: function() {
            var ret= $.ajax({
                type: 'POST',
                url: 'api/register',
                data: ko.mapping.toJSON(this,classes.mapping),
                dataType: 'json',
                contentType: 'application/json'
            });
            return ret;
        }
	});
	
	classes.Category = Class.extend({
		init:function(properties){
			util.extend(this, {
            	id: '',
            	name: '',
            	rev: 0,
            	_destroy: false,
            }, properties);
		},
		save: function() {
            var ret= $.ajax({
                type: 'POST',
                url: 'api/categories',
                data: ko.mapping.toJSON(this,classes.mapping),
                dataType: 'json',
                contentType: 'application/json'
            });
            return ret;
        }
	});
	classes.userinfo = function(){
		 return $.getJSON('api/user/info');
    };
    
    classes.FileInfo = Class.extend({
		init:function(properties){
			util.extend(this, {
            	id: '',
            	user_id: '',
            	name: '',
            	path: ''
            }, properties);
		}
    });
	return classes;
});