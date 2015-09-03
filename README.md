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
Before initilizing the plug-in you need to first set-up the plug-in with the content that needs to be localized. 
### Setting up 
Using the `change()` function you'll be able to add elements that need to be localized. 
```javascript
GeoContent.change({
  type: text|image,
  element: $(".element-to-localize"),
  content: string|array,
});
```
### Changing Text
```javascript
GeoContent.change({
  type: 'text',
  element: $(".geo-text"),
  content: "How's the weather in %%region_name%%?"
});
```
option | Type | Default | Description
------ | ---- | ------- | -----------
type (required) | string | null | "text" or "image" are the possible choices. If you wish to localize text you would use "text". If you want to localize an image use "image".
element (required)|$(element)|null| This is a jQuery selector of the element you wish to localize. 
content (required)|string|null| When localizing  text using **%%region_name%%** and **%%region_code%%** in the string will be replaces with the user’s location region code or region name. Example: “How’s the weather in %%region_name%%?” will end up reading, “How’s the weather in California?” if you live in California.
regions (optional) | array |  null | An array of region codes, which is used to specify which "regions" will have their content changed. If no array of regions is given, then the content will change no matter what the region of the user. 
exclude (optional) | boolean |  false | If exclude is true the regions array will be used as a list of regions to **not** change the content of. 


### Changing an Image 
```javascript
GeoContent.change({
  type:'image',
  element: $('.geo-image'),
  content: [
    {
      region: "CA",
      image: "images/california-dog.jpg"
    }
  ] 
});
```
option | Type | Default | Description
------ | ---- | ------- | -----------
type (required) | string | null | "text" or "image" are the possible choices. If you wish to localize text you would use "text". If you want to localize an image use "image".
element (required)|$(element)|null| This is a jQuery selector of the element you wish to localize. 
content (required)|array|null| When localizing an image "content" must be an array of objects which contain "region" (string) and "image" (string). "region" represents what region should be shown this image should be shown. "image" represents the path of the new image.

### Initialization
After you set-up the plug-in you need to initialize the plug-in. 
```javascript
GeoContent.init({
    ip: string,
    mygeourl: string
});
```

option | Type | Default | Description
------ | ---- | ------- | -----------
ip (optional) | string | null | Rather then having plug-in retreive your IP, you can pass in an IP instead.
mygeourl (optional)|string|null| freegeoip provides a way for developers to create there own webserver using the freegeoip code. If you've created your own webserver you can pass the url to the API using this option.





