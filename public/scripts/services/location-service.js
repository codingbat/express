(function () {
    angular.module('locService', [])
        .factory('locService', function ($rootScope, $http) {
            var googleMapService = {};
            googleMapService.clickLat = 0;
            googleMapService.clickLong = 0;

            var locations = [];

            var lastMarker;
            var currentSelectedMarker;

            // User Selected Location (initialize to center of America)
            var selectedLat = 52.2866651;
            var selectedLong = -9.6749289;

            googleMapService.refresh = function (latitude, longitude, filteredResults) {

                locations = [];

                selectedLat = latitude;
                selectedLong = longitude;

                if (filteredResults) {

                    locations = convertToMapPoints(filteredResults);

                    initialize(latitude, longitude, true);
                }

                else {

                    $http.get('/locations').success(function (response) {

                        locations = convertToMapPoints(response);

                        initialize(latitude, longitude, false);
                    }).error(function () {
                    });
                }
            };

            var convertToMapPoints = function (response) {

                // Clear the locations holder
                var locations = [];

                // Loop through all of the JSON entries provided in the response
                for (var i = 0; i < response.length; i++) {
                    var poi = response[i];

                    // Create popup windows for each record
                    var contentString =
                        '<p><b>Place</b>: ' + poi.name + '<br>' +
                        '<br><b>Phone</b>: ' + poi.phone_number + '<br>' +
                        '<b>Address</b>: ' + poi.address + '<br> + ' +
                        '<b>URL</b>: ' + poi.website + '</p>';

                    // Converts each of the JSON records into Google Maps Location format (Note Lat, Lng format).
                    locations.push(new Location(
                        new google.maps.LatLng(poi.location[1], poi.location[0]),
                        new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 320,
                        }),
                        poi.name,
                        poi.phone_number,
                        poi.address,
                        poi.website
                    ));
                }
                // location is now an array populated with records in Google Maps format
                return locations;
            };

            // Constructor for generic location
            var Location = function (latlon, message, name, phone_number, address, website) {
                this.latlon = latlon;
                this.message = message;
                this.name = name;
                this.phone_number = phone_number;
                this.address = address;
                this.website = website;
            };

            // Initializes the map
            var initialize = function (latitude, longitude, filter) {

                // Uses the selected lat, long as starting point
                var myLatLng = {lat: selectedLat, lng: selectedLong};

                // If map has not been created...
                if (!map) {

                    // Create a new map and place in the index.html page
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 3,
                        center: myLatLng,
                    });
                }

                // If a filter was used set the icons yellow, otherwise blue
                if (filter) {
                    icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                } else {
                    icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                }

                // Loop through each location in the array and place a marker
                locations.forEach(function (n, i) {
                    var marker = new google.maps.Marker({
                        position: n.latlon,
                        map: map,
                        title: 'Big Map',
                        icon: icon,
                    });

                    // For each marker created, add a listener that checks for clicks
                    google.maps.event.addListener(marker, 'click', function (e) {

                        // When clicked, open the selected marker's message
                        currentSelectedMarker = n;
                        n.message.open(map, marker);
                    });
                });

                // Set initial location as a bouncing red marker
                var initialLocation = new google.maps.LatLng(latitude, longitude);
                var marker = new google.maps.Marker({
                    position: initialLocation,
                    animation: google.maps.Animation.BOUNCE,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                });
                lastMarker = marker;

                // Function for moving to a selected location
                map.panTo(new google.maps.LatLng(latitude, longitude));

                // Clicking on the Map moves the bouncing red marker
                google.maps.event.addListener(map, 'click', function (e) {
                    var marker = new google.maps.Marker({
                        position: e.latLng,
                        animation: google.maps.Animation.BOUNCE,
                        map: map,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    });

                    // When a new spot is selected, delete the old red bouncing marker
                    if (lastMarker) {
                        lastMarker.setMap(null);
                    }

                    // Create a new red bouncing marker and move to it
                    lastMarker = marker;
                    map.panTo(marker.position);

                    // Update Broadcasted Variable (lets the panels know to change their lat, long values)
                    googleMapService.clickLat = marker.getPosition().lat();
                    googleMapService.clickLong = marker.getPosition().lng();
                    $rootScope.$broadcast('clicked');
                });
            };

            // Refresh the page upon window load. Use the initial latitude and longitude
            google.maps.event.addDomListener(window, 'load',
                googleMapService.refresh(selectedLat, selectedLong));

            return googleMapService;
        });
})();

