/* https://developers.google.com/maps/documentation/javascript/reference
*
* */
(function(window) {

  window.initializeMap = initializeMap;
  var map,
    myPlace;

  /*
   * @description initialize map
   * initializeMap() is called when page is loaded.
   */
  function initializeMap(place) {

    // Set a temp location
    var mapOptions = {
      center: {
        lat: 25,
        lng: 120
      },
      zoom: 14
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    searchLocation(place);
  }

  /*
   * @description search location by google API
   */
  function searchLocation(place) {
    var request = {
      query: place
    };
    var service = new google.maps.places.PlacesService(map);
    myPlace = place;
    service.textSearch(request, addLocationToMap);
  }

  /*
  * @description add the result location as marker to map
  * @param {array} result
  * @param {status} object
  * */
  function addLocationToMap(result, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var mapBounds = new google.maps.LatLngBounds();
      var placeData = result[0];
      var lat = placeData.geometry.location.lat();  // latitude from the place service
      var lon = placeData.geometry.location.lng();  // longitude from the place service
      var myLatlng = new google.maps.LatLng(lat, lon);
      var marker = new google.maps.Marker({
        map: map,
        position: myLatlng
      });

      // Set on click
      marker.addListener('click', function() {
        var infowindow = new google.maps.InfoWindow({
          content: myPlace
        });
        infowindow.open(map, marker);
      });
      mapBounds.extend(myLatlng);
      map.setCenter(mapBounds.getCenter());
    }
    else {
      // Google API error occurs...
      $('.map-wrapper').remove();
    }
  }

})(window);
