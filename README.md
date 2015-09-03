GeoContent
============

GeoContent provides the ability to change content depending on location. First, GeoContent uses [icanhazip.com](https://major.io/icanhazip-com-faq/) to retreive the user's IP and then uses [freegeoip](http://freegeoip.net/) to get user's location from the user's IP.

## Installation
Bower installation 
```javascript
bower install geocontent
```
GeoContent requires JQuery to be loaded. Include geocontent.js script after loading JQuery.
```javascript
<script src="/path/to/jquery.min.js"></script>
<script src="/path/to/geocontent.js"></script>
```
## Setup and Initialization
To use GeoContent you first need to initialize the plugin.  
```javascript
GeoContent.init({
  onComplete: function() {
    // Change content code
  }
});
```
The `GeoContent.init()` function requires an object, with an `onComplete` function, to be passed into the `GeoContent.init()` function. GeoContent also has other optional settings that can be included in the object. 

option | Type | Default | Description
------ | ---- | ------- | -----------
ip (optional) | string | null | Rather then having plug-in retreive your IP, you can pass in an IP instead.
mygeourl (optional)|string|null| freegeoip provides a way for developers to create there own webserver using the freegeoip code. If you've created your own webserver you can pass the url to the API using this option.

## Using GeoContent
In order to ensure that IP and location has been received, changing of content is done in the `onComplete` function of the plug-ing initialization. 
```javascript
GeoContent.init({
  onComplete: function() {
    GeoContent.changeText({
      element: $("h2"),
      template: "How's the weather in %%region_name%%?"
    });
  }
});
```
GeoContent as a few function that you can use in order to change the content depending on location. Eacb function accepts an object which tells the plug-in, amongst other things, what content to change and what to change the content to. 

## Functions
Here is a list of functions that can be used in the `onComplete` function which will usd to change the content depending on user's location. 
#### GeoContent.changeText(Object)
This function is used to change the text of an HTML element.

Example: Code below will replace the content of all `<h2>` elements with the template value for all states that are not Nevada or California. 

```javascript
GeoContent.init({
  onComplete: function() {
    GeoContent.changeText({
      element: $("h2"),
      template: "How's the weather in %%region_name%%?"
      regions: ['CA','NV'],
      exclude: true
    });
  }
});
```
option | Type | Default | Description
------ | ---- | ------- | -----------
element (required) | $(element) |  null | The element in which you want content to change depending on location.
template (required) | string |  null | The content that will replace the original content. **%%region_name%%** and **%%region_code%%** in the string will be replaces with the user's location region code or region name. Example: "How's the weather in %%region_name%%?" will end up reading, "How's the weather in California?" if you live in California. 
regions (optional) | array |  null | An array of region codes, which is used to specify which "regions" will have their content changed. If no array of regions is given, then the content will change no matter what the region of the user. 
exclude (optional) | boolean |  false | If exclude is true the regions array will be used as a list of regions to **not** change the content of. 





