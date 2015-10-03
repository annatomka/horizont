define(['jquery','knockout'
        , 'wrap',
        'mapping'],
function($,ko, wrap, mapping){
	'use strict';
	
	ko.wrap=wrap;
	ko.mapping=mapping;
	
	
	var util = {};
	
	util.user = ko.observable();
	util.style = ko.observable();
	util.createGuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    
    util.extend = function() {
        var sources = Array.prototype.slice.call(arguments),
            target = sources.shift();

        sources.unshift({});
        sources = $.extend.apply(null, $.map(sources,ko.toJS));  // unifying sources
        //Delete the functions from the sources
        for(var prop in sources){
        	if($.isFunction(sources[prop])){
        		delete sources[prop];
        	}
        }
        
        return $.extend(target, ko.wrap.fromJS(sources));
    };
    util.createLinkFromTitle = function(title){
    	title = title.replace(/[őŐóöÓÖ]/g,"o");
    	title = title.replace(/[úÚűÜüŰ]/g,"u");
        title = title.replace(/[áÁ]/g,"a");
        title = title.replace(/[éÉ]/g,"e");
        title = title.replace(/[\W]/g,"_");
        title = title.toLowerCase();
        return title;
    };
    util.fileSizeMaxDoc = 10000000;
    util.fileAllowedTypesDoc = /(\.|\/)(pdf|docx|doc|xls|xlsx|xlsm|xlsb|ppt|pptx)$/i;
    util.fileSizeMaxPic = 20000000;
    util.fileAllowedTypesPic = /(\.|\/)(gif|jpe?g|png)$/i;
    util.fileSizeMaxVid = 250000000;
    util.fileAllowedTypesVid = /(\.|\/)(avi|mp4|wmv)$/i;
    util.translateUploadErrors = function(errorIn, type){
		if(errorIn == 'Maximum number of files exceeded'){
			return 'A feltölthető fájlok száma elérte a maximumot.';
		}else if(errorIn == 'File type not allowed'){
			var root =  'Fájltípus nem megengedett. Engedélyezett típusok: ';
			if(type=='doc'){
				root += 'pdf|docx|doc|xls|xlsx|xlsm|xlsb|ppt|pptx';
			}else if(type == 'pic'){
				root += 'gif|jpe?g|png';
			}else if(type == 'vid'){
				root += 'avi|mp4|wmv';
			}
			return root;
		}else if(errorIn == 'File is too large'){
			var root = 'A fájl túl nagy. Maximálisan engedélyezett méret: ';
			if(type=='doc'){
				root += util.fileSizeMaxDoc;
			}else if(type == 'pic'){
				root += util.fileSizeMaxPic;
			}else if(type == 'vid'){
				root += util.fileSizeMaxVid;
			}
			return root;
		}else if(errorIn == 'File is too small'){
			return 'A fájl túl kicsi.';
		}
	};
    util.errormessages = {
    		notANumber:"A megadott érték nem szám",
    		notInteger: "A megadott érték nem egész",
    		notPositive:"A megadott érték nem pozitív",
    		notInRange: "A megadott érték nem a megfelelő tartományba esik",
    		isRequired: "Kötelező",
    		notColor: "Nem érvényes színkód",
    		notEmpty: "Legalább egy elem megadása kötelező",
    		notImage: "A kiválasztott fájl nem engedélyezett képformátum.",
    		notDocument: "A kiválasztott fájl nem engedélyezett dokumentum formátum.",
    		notVideo: "A kiválasztott fájl nem engedélyezett videó formátum."
    };
    function writeErrorMsg(name, message, errors){
    	errors.push({"name":name, "message":util.errormessages[message]});
    };
    util.validation = {
    		isNonNegativeInteger : function(item, name,errors){
    			if(item == null){
    				return errors;
    			}
    			var num = parseFloat(item);
    			if(isNaN(num)){
    				writeErrorMsg(name,"notANumber",errors);
    				return errors;
    			}
    			if(num != Math.round(item)){
    				writeErrorMsg(name,"notInteger",errors);
    				return errors;
    			}
    			if(num<0){
    				writeErrorMsg(name,"notPositive",errors);
    				return errors;
    			}
    			return errors;
    		},
    		isRequired : function(item,name,errors){
    			if(item ===null || item ==="" || item === undefined){
    				writeErrorMsg(name,"isRequired",errors);
    				return errors;
    			}
    			return errors;
    		},
    		notEmpty : function(item,name,errors){
    			if(item.length == 0){
    				writeErrorMsg(name,"notEmpty",errors);
    				return errors;
    			}
    			return errors;
    		},
    		isInRange : function(item,name,errors,from,to){
    			if(item == null){
    				return errors;
    			}
    			var num = parseFloat(item);
    			if(isNaN(num)){
    				writeErrorMsg(name,"notInRange",errors);
    				return errors;
    			}
    			if(num<from || num>to){
    				writeErrorMsg(name,"notInRange",errors);
    				return errors;
    			}
    			return errors;
    		},
    		isColor : function(item,name,errors){
    			var regexp = /^#[0-9A-F]+$/i;
    			if(regexp.test(item)){
    				return errors;
    			} else{
    				writeErrorMsg(name,"notColor",errors);
    			}
    		},
    		isValidImage: function(file,errors){
    			var regexp = util.fileAllowedTypesPic;
    			if(regexp.test(file)){
    				return errors;
    			}else{
    				writeErrorMsg(file, "notImage",errors);
    			}
    		},
    		isValidDocument: function(file,errors){
    			var regexp = util.fileAllowedTypesDoc;
    			if(regexp.test(file)){
    				return errors;
    			}else{
    				writeErrorMsg(file, "notDocument",errors);
    			}
    		},
    		isValidVideo: function(file,errors){
    			var regexp = util.fileAllowedTypesVid;
    			if(regexp.test(file)){
    				return errors;
    			}else{
    				writeErrorMsg(file, "notVideo",errors);
    			}
    		}
    };
    
    util.extendObservable = function ( target, source ) {
	    var prop, srcVal, tgtProp, srcProp,
	        isObservable = false;
	
	    for ( prop in source ) {
	
	        if ( !source.hasOwnProperty( prop ) ) {
	            continue;
	        }
	
	        if ( ko.isWriteableObservable( source[prop] ) ) {
	            isObservable = true;
	            srcVal = source[prop]();
	        } else if ( typeof ( source[prop] ) !== 'function' ) {
	            srcVal = source[prop];
	        }
	
	        if ( ko.isWriteableObservable( target[prop] ) ) {
	            target[prop]( srcVal );
	        } else if ( target[prop] === null || target[prop] === undefined ) {
	
	            target[prop] = isObservable ? ko.observable( srcVal ) : srcVal;
	
	        } else if ( typeof ( target[prop] ) !== 'function' ) {
	            target[prop] = srcVal;
	        }
	
	        isObservable = false;
	    }
	};
	util.clone = function(obj, emptyObj){
	    var json = ko.toJSON(obj);
	    var js = JSON.parse(json);

	    return util.extendObservable(emptyObj, js);
	};
	
	 return util;
});