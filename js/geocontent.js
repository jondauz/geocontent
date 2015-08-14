;(function($) {

	// Hide content that will be changed
	$('[data-geo-content]').css('opacity','0');

  // Define our constructor 
  this.GeoContent = function() {

   	var geoObject = this;
  	this.geoContent = null,
  	geoObject.obe;

  	geoObject.getIpUrl = "http://icanhazip.com/";

    // Define option defaults 
    geoObject.options = {
      mygeourl: 'https://freegeoip.net/json',
    	ip: null,
    }

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      geoObject.options = extendDefaults(geoObject.options, arguments[0]);
    }

  	if(geoObject.options&&(geoObject.options.ip===null||geoObject.options.ip==='')) {
  	
    	$.ajax({
  			url: geoObject.getIpUrl
  		}).done(function(ip){	
  		
  			geoObject.options.ip = ip;
  			initGeoContent(geoObject);
  		
  		});

  	} else {
  	
  		initGeoContent(geoObject);
  	
  	}

  }

  function initGeoContent(geoObject) {
   	$.ajax({
			url: geoObject.options.mygeourl + '/' + geoObject.options.ip
		}).done(function(result){	
		
			geoObject.geoContent = result;	
  		updateContent(geoObject);
		
		});
  }

  function updateContent(geoObject) {
     
  	var contentToChange = $('[data-geo-content]');
  	
  	$.each(contentToChange, function(index, value){
  		
  		var current = $(value),
  			currentData = $(value).data('geo-content'),
  			newText = "";
  		
  		if(currentData.indexOf('%%region_code%%')>0) {
  			newText = currentData.replace('%%region_code%%', geoObject.geoContent.region_code);
  		}
  		else if(currentData.indexOf('%%region_name%%')>0) {
  			newText = currentData.replace('%%region_name%%', geoObject.geoContent.region_name);
  		} 
      
      if(newText!=='') {
  		  current.text(newText);
  		}
      current.css('opacity','1');
  	
  	});
  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

}(jQuery));
