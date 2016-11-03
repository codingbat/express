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
                        removeFromList(index);
                        console.log('deleted');

                    }, function (err) {
                        console.log('could not delete location', err.message);
                    });
            };

            function removeFromList(index) {
                $scope.locations.splice(index, 1);
            }
        });
})();
