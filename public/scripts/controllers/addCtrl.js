(function () {
    angular.module('addCtrl', [
        'geolocation',
        'locService',
    ]).controller('addCtrl',
        function ($scope, $http, $rootScope, geolocation, locService) {
            $scope.formData = {};
            var coords = {};
            var lat = 0;
            var long = 0;

            $scope.formData.lng = -9.6749289;
            $scope.formData.lat = 52.2866651;

            geolocation.getLocation()
                .then(function (data) {
                    coords = {lat: data.coords.latitude, long: data.coords.longitude};

                    $scope.formData.lng = parseFloat(coords.long).toFixed(3);
                    $scope.formData.lat = parseFloat(coords.lat).toFixed(3);

                    locService.refresh($scope.formData.lat, $scope.formData.lng);
                });

            $rootScope.$on('clicked', function () {
                $scope.$apply(function () {
                    $scope.formData.lat = parseFloat(locService.clickLat).toFixed(3);
                    $scope.formData.lng = parseFloat(locService.clickLong).toFixed(3);
                });
            });

            $scope.refreshLoc = function () {
                geolocation.getLocation()
                    .then(function (data) {
                        coords = {lat: data.coords.latitude, long: data.coords.longitude};

                        $scope.formData.lat = parseFloat(coords.long).toFixed(3);
                        $scope.formData.lng = parseFloat(coords.lat).toFixed(3);
                        locService.refresh(coords.lat, coords.long);
                    });
            };

            $scope.createPOI = function () {
                var poiData = {
                    name: $scope.formData.name,
                    phone_number: $scope.formData.phone_number,
                    address: $scope.formData.address,
                    website: $scope.formData.website,
                    location: [$scope.formData.lng, $scope.formData.lat],
                    types: [$scope.formData.types],
                };

                $http.post('/locations', poiData)
                    .success(function (data) {
                        $scope.formData.name = '';
                        $scope.formData.address = '';
                        $scope.formData.website = '';
                        $scope.formData.types = '';
                        locService.refresh($scope.formData.location.lat, $scope.formData.location.lng);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            };
        });
})();
