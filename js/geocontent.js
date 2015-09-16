var GeoContent = (function ($) {

  var geoContent = {},
    getipurl =  "http://icanhazip.com/",
    location = null,
    elemsToLocalize = [];

  geoContent.settings = {
    ip: null,
    mygeourl: 'https://freegeoip.net/json',
    onComplete: null,
  }

  $.ajaxSetup({
    timeout: 3000
  }); 

  geoContent.change = function(elemObject) {

    elemObject.element.css('opacity',0);
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
    } else {
      newText = template;
    }
    
    if(newText!=="") {
      elem.text(newText);
    }
    elem.css('opacity','1');
 
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
      
      $('body').addClass(location.region_code);
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
