var geoContent = (function ($) {

    var geoContent = {};    

    geoContent.settings = {
      getipurl:  "http://icanhazip.com/",
      ip: null,
      mygeourl: 'https://freegeoip.net/json',
      location: null,
      onComplete: null,
    }
  
    $.ajaxSetup({
      timeout: 4000
    }); 

    geoContent.changeText = function (elemObject) {
      
      if(!elemObject.regions) {
        updateContent(elemObject.element, elemObject.template);
      }
      else if(elemObject.regions&&elemObject.regions.indexOf(geoContent.settings.location.region_code)>=0&&(!elemObject.exclude||elemObject.exclude==false)) {
        updateContent(elemObject.element, elemObject.template);
      }
      else if(elemObject.regions&&elemObject.regions.indexOf(geoContent.settings.location.region_code)==-1&&elemObject.exclude==true) {
        updateContent(elemObject.element, elemObject.template);
      }

      elemObject.element.css('opacity','1');

    };

    geoContent.changeImage = function() {
      /* TO-DO: Create Change Image */
    };

    geoContent.init = function(options) {
     
      $.extend(this.settings, options);
      
      if(this.settings.ip) {
        getLocation();
      } else {
        getUserIP();
      }

    };

    function updateContent(elem, template) {
      
      var newText = "";
      // Change Region Code
      if(template.indexOf('%%region_code%%')>0&&geoContent.settings.location.region_code!=='') {
        newText = template.replace('%%region_code%%', geoContent.settings.location.region_code);
      }
      // Change Region Name
      else if(template.indexOf('%%region_name%%')>0&&geoContent.settings.location.region_name!=='') {
        newText = template.replace('%%region_name%%', geoContent.settings.location.region_name);
      } 
      
      if(newText!=='') {
        elem.text(newText);
      }
     
    }

    function getUserIP() {

      $.ajax({
        url: geoContent.settings.getipurl
      }).done(function(ip){ 

        geoContent.settings.ip = ip;
        getLocation();
       
       }).error(function(){

        showError('Unable to get IP.');
      
      });

    }

    function getLocation() {

    $.ajax({
      url: geoContent.settings.mygeourl + '/' + geoContent.settings.ip      
    }).done(function(location){ 

      geoContent.settings.location = location;
        
      if(geoContent.settings.onComplete) {
        geoContent.settings.onComplete();
      } else {
        showError('Missing "onComplete" function');
      }

    }).error(function(error){
     
      showError('Unable to get geolocate.')
    
    });
  
  }

  function showError(msg) {
    console.error(msg);
  }

  return geoContent;

}(jQuery));




// ;(function($) {

// 	// Hide content that will be changed
// 	var geoContentElems = $('[data-geo-content]').css('opacity','0');



//   // Define our constructor 
//   this.GeoContent = function() {

//   	var geoObject = this;
//   	this.geoContent = null;

//   	geoObject.getIpUrl = "http://icanhazip.com/";

//     // Define option defaults 
//     geoObject.options = {
//       mygeourl: 'https://freegeoip.net/json',
//     	ip: null,
//       exclude: false,
//       regions: []  
//     }

//     // Create options by extending defaults with the passed in arugments
//     if (arguments[0] && typeof arguments[0] === "object") {
//       $.extend(geoObject.options, arguments[0]);
//     }

//     if(geoObject.options&&(geoObject.options.ip===null||geoObject.options.ip==='')) {
  	
//     	$.ajax({
//   			url: geoObject.getIpUrl
//   		}).done(function(ip){	
  		
//   			geoObject.options.ip = ip;
//   			initGeoContent(geoObject);
  		
//   		}).error(function(){

//         console.error('Unable to get IP.')
//         showElements();

//       });

//   	} else {

//    		initGeoContent(geoObject);
  	
//   	}

//   }

//   function initGeoContent(geoObject) {
 
//     $.ajax({
// 			url: geoObject.options.mygeourl + '/' + geoObject.options.ip
// 		}).done(function(result){	
		  
//       geoObject.geoContent = result;

//       if(geoObject.options.exclude) {
//         updateExcludedContent(geoObject);
//       } else {
//         updateContent(geoObject);
//       }

// 		}).error(function(error){
     
//       console.error('Unable to get geolocate.')
//       showElements();
    
//     });
 
//   }

//   function updateExcludedContent(geoObject) {

//     if(geoObject.options.regions.length==0) {
      
//       showElements();
//       console.error("Array of regions to exclude can't be empty!");
    
//     } else {

//       if(geoObject.options.regions.indexOf(geoObject.geoContent.region_code)<0) {

//         $.each(geoContentElems, function(index, value){
      
//           var current = $(value),
//             currentData = $(value).data('geo-content'),
//             newText = '';
          
//           // Change Region Code
//           if(currentData.indexOf('%%region_code%%')>0&&geoObject.geoContent.region_code!=='') {
//             newText = currentData.replace('%%region_code%%', geoObject.geoContent.region_code);
//           }
//           // Chnage Region Name
//           else if(currentData.indexOf('%%region_name%%')>0&&geoObject.geoContent.region_name!=='') {
//             newText = currentData.replace('%%region_name%%', geoObject.geoContent.region_name);
//           } 
          
//           if(newText!=='') {
//             current.text(newText);
//           }
//           current.css('opacity','1');

//         });
        
//       } else {
        
//         showElements();
      
//       }
    
//     }    
  
//   }

//   function updateContent(geoObject) {
    
//     if(geoObject.options.regions.length==0||geoObject.options.regions.indexOf(geoObject.geoContent.region_code)>=0) {

//       $.each(geoContentElems, function(index, value){
    
//         var current = $(value),
//           currentData = $(value).data('geo-content'),
//           newText = '';
        
//         // Change Region Code
//         if(currentData.indexOf('%%region_code%%')>0&&geoObject.geoContent.region_code!=='') {
//           newText = currentData.replace('%%region_code%%', geoObject.geoContent.region_code);
//         }
//         // Chnage Region Name
//         else if(currentData.indexOf('%%region_name%%')>0&&geoObject.geoContent.region_name!=='') {
//           newText = currentData.replace('%%region_name%%', geoObject.geoContent.region_name);
//         } 
        
//         if(newText!=='') {
//           current.text(newText);
//         }
//         current.css('opacity','1');

//       });
      
//     } else {
//       showElements();
//     }

  	
//   }

//   function showElements() {
  
//     geoContentElems.css('opacity','1');

//   }

// }(jQuery));
