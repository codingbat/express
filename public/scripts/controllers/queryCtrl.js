(function () {
    angular
        .module('queryCtrl', [
            'geolocation',
            'locService'
        ])
        .controller('queryCtrl',
            function ($scope, $log, $http, $rootScope, geolocation, locService) {

                $scope.formData = {};
                var queryBody = {};

                geolocation.getLocation().then(function (data) {
                    coords = {lat: data.coords.latitude, long: data.coords.longitude};

                    $scope.formData.lng = parseFloat(coords.long).toFixed(3);
                    $scope.formData.lat = parseFloat(coords.lat).toFixed(3);
                });

                $rootScope.$on("clicked", function () {
                    $scope.$apply(function () {
                        $scope.formData.lat = parseFloat(locService.clickLat).toFixed(3);
                        $scope.formData.lng = parseFloat(locService.clickLong).toFixed(3);
                    });
                });

                $scope.queryLocations = function () {

                    queryBody = {
                        longitude: parseFloat($scope.formData.lng),
                        latitude: parseFloat($scope.formData.lat),
                        distance: parseFloat($scope.formData.distance),
                        name: $scope.formData.name,
                    };

                    $http.post('/query', queryBody)
                        .success(function (queryResults) {
                            locService.refresh(queryBody.latitude, queryBody.longitude, queryResults);
                            $scope.queryCount = queryResults.length;
                        })
                        .error(function (queryResults) {
                            console.log('Error ' + queryResults);
                        })
                };
            });
})();
