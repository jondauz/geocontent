var GeoContent = (function ($) {

<<<<<<< HEAD
	// Hide content that will be changed
<<<<<<< HEAD
	var geoContentElems = $('[data-geo-content]');
  geoContentElems.css('opacity','0');
=======
	var geoContentElems = $('[data-geo-content]').css('opacity','0');
=======
  var geoContent = {},
    getipurl =  "http://icanhazip.com/",
    location = null,
    elemsToLocalize = [];

  geoContent.settings = {
    ip: null,
    mygeourl: 'https://freegeoip.net/json',
    onComplete: null,
  }
>>>>>>> master

  $.ajaxSetup({
<<<<<<< HEAD
    timeout: 4000
  });
>>>>>>> master
=======
    timeout: 3000
  }); 
>>>>>>> master

  geoContent.change = function(elemObject) {

    elemsToLocalize.push(elemObject);

  }

  geoContent.init = function(options) {
   
    $.extend(geoContent.settings, options);
    
    if(geoContent.settings.ip) {
      getLocation();
    } else {
      getUserIP();
    }

  };

  function changeText(elemObject) {

    if(!elemObject.regions) {
      updateContent(elemObject.element, elemObject.content);
    }
    else if(elemObject.regions&&elemObject.regions.indexOf(location.region_code)>=0&&(!elemObject.exclude||elemObject.exclude==false)) {
      updateContent(elemObject.element, elemObject.content);
    }
    else if(elemObject.regions&&elemObject.regions.indexOf(location.region_code)==-1&&elemObject.exclude==true) {
      updateContent(elemObject.element, elemObject.content);
    }

    elemObject.element.css('opacity','1');

  }

  function changeImage(elemObject) {
    
    if($.isArray(elemObject.content)) {
       
       $.each(elemObject.content, function(index, value){
      
        if(value.region===location.region_code) {
          elemObject.element.attr('src',value.image);
          elemObject.element.load(function(){
            elemObject.element.css('opacity','1');
          });
          return;
        }

        if(elemObject.content.length-1===index) {
          elemObject.element.css('opacity','1');        
        }

      });

    } else {
      showError('"content" must be an array for type image');
    }

  }  

  function updateContent(elem, template) {
    
    var newText = "";
    // Change Region Code
    if(template.indexOf('%%region_code%%')>0&&location.region_code!=='') {
      newText = template.replace('%%region_code%%', location.region_code);
    }
    // Change Region Name
    else if(template.indexOf('%%region_name%%')>0&&location.region_name!=='') {
      newText = template.replace('%%region_name%%', location.region_name);
    } 
    
    if(newText!=='') {
      elem.text(newText);
    }
   
  }

  function getUserIP() {

    $.ajax({
      url: getipurl
    }).done(function(ip){ 

      geoContent.settings.ip = ip;
      getLocation();
     
     }).error(function(){

      showError('Unable to get IP.');
      showElements();
    
    });

  }

  function getLocation() {

    $.ajax({
      url: geoContent.settings.mygeourl + '/' + geoContent.settings.ip      
    }).done(function(userlocation){ 

      location = userlocation;
      changeContent();

    }).error(function(error){
     
      showError('Unable to get geolocate.');
      showElements();
    
    });

  }

  function changeContent() {
    
    $.each(elemsToLocalize, function(index, value){

      if(!value.type) {

        showError('type is required for' + value.element.selector.toString());
      
      } else {

        if(value.content) {
           if(value.type=="text") {
            changeText(value);
          }
          else if(value.type=="image") {
            changeImage(value);
          }
        } else {
          showError('content is required for ' + value.element.selector.toString());
        }

      }
     
    });

  }

  function showElements() {

    $.each(elemsToLocalize, function(index, value){
      
      value.element.css('opacity','1');

    });

  }

  function showError(msg) {

    console.error(msg);

  }

  return geoContent;

}(jQuery));
