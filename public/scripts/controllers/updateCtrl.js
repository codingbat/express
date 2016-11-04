(function () {
    angular.module('updateCtrl', ['PoiService', 'locService'])
        .controller('updateCtrl', function ($scope, $rootScope, $http, PoiService, locService) {
            $scope.locations = [];
            $scope.oneAtATime = true;
            $scope.formData = {};

            activate();

            function activate() {
                getLocations();
            }

            function getLocations() {
                PoiService.getPoi().then(function (response) {
                    $scope.locations = response.data;
                    $scope.formData = response.data;
                }, function (err) {
                    console.log('could not retrieve locations in update', err);
                });
            }

            $scope.updatePoi = function(index, id) {
                var poiData = {
                    name: $scope.formData[index].name,
                    phone_number: $scope.formData[index].phone_number,
                    address: $scope.formData[index].address,
                    website: $scope.formData[index].website,
                    location: [$scope.formData[index].location[0], $scope.formData[index].location[1]],
                    type: $scope.formData[index].type,
                };

                $http.put('/locations/' + id, poiData)
                    .success(function (data) {
                        console.log('updated: ', JSON.stringify(data));
                    })
                    .error(function (err) {
                        console.log('Error: ' + err);
                    });
            };

        });
})();
