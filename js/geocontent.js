;(function($) {

	// Hide content that will be changed
<<<<<<< HEAD
	var geoContentElems = $('[data-geo-content]');
  geoContentElems.css('opacity','0');
=======
	var geoContentElems = $('[data-geo-content]').css('opacity','0');

  /// Set up AJAX default values 
  $.ajaxSetup({
    timeout: 4000
  });
>>>>>>> master

  // Define our constructor 
  this.GeoContent = function() {

  	var geoObject = this;
  	this.geoContent = null;

  	geoObject.getIpUrl = "http://icanhazip.com/";

    // Define option defaults 
    geoObject.options = {
      mygeourl: 'https://freegeoip.net/json',
    	ip: null,
      exclude: false,
      regions: []  
    }

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      $.extend(geoObject.options, arguments[0]);
    }

    if(geoObject.options&&(geoObject.options.ip===null||geoObject.options.ip==='')) {
  	
    	$.ajax({
  			url: geoObject.getIpUrl
  		}).done(function(ip){	
  		
  			geoObject.options.ip = ip;
  			initGeoContent(geoObject);
  		
  		}).error(function(){

        console.error('Unable to get IP.')
        showElements();

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

      if(geoObject.options.exclude) {
        updateExcludedContent(geoObject);
      } else {
        updateContent(geoObject);
      }

		}).error(function(error){
     
      console.error('Unable to get geolocate.')
      showElements();
    
    });
 
  }

  function updateExcludedContent(geoObject) {

    if(geoObject.options.regions.length==0) {
      
      showElements();
      console.error("Array of regions to exclude can't be empty!");
    
    } else {

      if(geoObject.options.regions.indexOf(geoObject.geoContent.region_code)<0) {

        $.each(geoContentElems, function(index, value){
      
          var current = $(value),
            currentData = $(value).data('geo-content'),
            newText = '';
          
          // Change Region Code
          if(currentData.indexOf('%%region_code%%')>0&&geoObject.geoContent.region_code!=='') {
            newText = currentData.replace('%%region_code%%', geoObject.geoContent.region_code);
          }
          // Chnage Region Name
          else if(currentData.indexOf('%%region_name%%')>0&&geoObject.geoContent.region_name!=='') {
            newText = currentData.replace('%%region_name%%', geoObject.geoContent.region_name);
          } 
          
          if(newText!=='') {
            current.text(newText);
          }
          current.css('opacity','1');

        });
        
      } else {
        
        showElements();
      
      }
    
    }    
  
  }

  function updateContent(geoObject) {
    
    if(geoObject.options.regions.length==0||geoObject.options.regions.indexOf(geoObject.geoContent.region_code)>=0) {

      $.each(geoContentElems, function(index, value){
    
        var current = $(value),
          currentData = $(value).data('geo-content'),
          newText = '';
        
        // Change Region Code
        if(currentData.indexOf('%%region_code%%')>0&&geoObject.geoContent.region_code!=='') {
          newText = currentData.replace('%%region_code%%', geoObject.geoContent.region_code);
        }
        // Chnage Region Name
        else if(currentData.indexOf('%%region_name%%')>0&&geoObject.geoContent.region_name!=='') {
          newText = currentData.replace('%%region_name%%', geoObject.geoContent.region_name);
        } 
        
        if(newText!=='') {
          current.text(newText);
        }
        current.css('opacity','1');

      });
      
    } else {
      showElements();
    }

  	
  }

  function showElements() {
  
    geoContentElems.css('opacity','1');

  }

}(jQuery));
