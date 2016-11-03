(function () {
    angular.module('updateCtrl', ['PoiService'])
        .controller('updateCtrl', function ($scope, PoiService) {
            $scope.locations = [];

            activate();

            function activate() {
                getLocations();
            }

            function getLocations() {
                PoiService.getPoi().then(function (response) {
                    $scope.locations = response.data;
                }, function (err) {
                    console.log('could not retrieve locations in update', err);
                });
            }
        });
})();
