(function () {
    angular.module('locService', [])
        .factory('locService', function ($rootScope, $http) {
            var gMapApi = {};
            gMapApi.clickLat = 0;
            gMapApi.clickLong = 0;

            var locations = [];

            var lastMarker;
            var currentSelectedMarker;

            var selectedLat = 52.2866651;
            var selectedLong = -9.6749289;

            gMapApi.refresh = function (latitude, longitude, filteredResults) {

                locations = [];

                selectedLat = latitude;
                selectedLong = longitude;

                if (filteredResults) {
                    locations = convertToMapPoints(filteredResults);
                    initMap(latitude, longitude, true);
                } else {
                    $http.get('/locations').success(function (response) {
                        locations = convertToMapPoints(response);
                        initMap(latitude, longitude, false);
                    }).error(function () {
                    });
                }
            };

            var convertToMapPoints = function (response) {
                var locations = [];

                for (var i = 0; i < response.length; i++) {
                    var poi = response[i];

                    var contentString =
                        '<p><b>Place</b>: ' + poi.name + '<br>' +
                        '<b>Phone</b>: ' + poi.phone_number + '<br>' +
                        '<b>Address</b>: ' + poi.address + '<br>' +
                        '<b>Web</b>: <a href="' + poi.website + '"</a>' + poi.website + '</p>';

                    locations.push(new Location(
                        new google.maps.LatLng(poi.location[1], poi.location[0]),
                        new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 420,
                        }),
                        poi.name,
                        poi.phone_number,
                        poi.address,
                        poi.website
                    ));
                }
                return locations;
            };

            var Location = function (latlon, message, name, phone_number, address, website) {
                this.latlon = latlon;
                this.message = message;
                this.name = name;
                this.phone_number = phone_number;
                this.address = address;
                this.website = website;
            };

            var initMap = function (latitude, longitude, filter) {
                var myLatLng = {lat: selectedLat, lng: selectedLong};
                if (!map) {
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 6,
                        center: myLatLng,
                    });
                }

                if (filter) {
                    icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                } else {
                    icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                }

                locations.forEach(function (n, i) {
                    var marker = new google.maps.Marker({
                        position: n.latlon,
                        map: map,
                        title: 'Big Map',
                        icon: icon,
                    });

                    google.maps.event.addListener(marker, 'click', function (e) {
                        currentSelectedMarker = n;
                        n.message.open(map, marker);
                    });
                });

                var initialLocation = new google.maps.LatLng(latitude, longitude);
                var marker = new google.maps.Marker({
                    position: initialLocation,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                });
                lastMarker = marker;

                map.panTo(new google.maps.LatLng(latitude, longitude));
                google.maps.event.addListener(map, 'click', function (e) {
                    var marker = new google.maps.Marker({
                        position: e.latLng,
                        map: map,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    });

                    if (lastMarker) {
                        lastMarker.setMap(null);
                    }

                    lastMarker = marker;
                    map.panTo(marker.position);
                    gMapApi.clickLat = marker.getPosition().lat();
                    gMapApi.clickLong = marker.getPosition().lng();
                    $rootScope.$broadcast('clicked');
                });
            };

            google.maps.event.addDomListener(window, 'load',
                gMapApi.refresh(selectedLat, selectedLong));

            return gMapApi;
        });
})();

