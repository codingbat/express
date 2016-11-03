(function () {
    angular.module('deleteCtrl', [])
        .controller('deleteCtrl', function ($scope, geolocation, locService, PoiService, $http) {
            $scope.locations = [];

            init();

            function init() {
                getLocations();
            }

            function getLocations() {
                PoiService.getPoi().then(function (response) {
                    $scope.locations = response.data;
                }, function (err) {
                    console.log('could not retrieve locations in update', err.message);
                });
            }

            $scope.deletePoi = function (index, id) {
                $http.delete('/locations/' + id)
                    .then(function () {
                        refreshLoc();
                        removeFromList(index);
                        console.log('deleted');

                    }, function (err) {
                        console.log('could not delete location', err.message);
                    });
            };

            function removeFromList(index) {
                $scope.locations.splice(index, 1);
            }

            function refreshLoc() {
                geolocation.getLocation()
                    .then(function (data) {
                        coords = {lat: data.coords.latitude, long: data.coords.longitude};

                        $scope.formData.lat = parseFloat(coords.long).toFixed(7);
                        $scope.formData.lng = parseFloat(coords.lat).toFixed(7);
                        locService.refresh(coords.lat, coords.long);
                    });
            };
        });
})();
