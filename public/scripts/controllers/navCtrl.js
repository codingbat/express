(function () {
    angular
        .module('navCtrl', [])
        .controller('navCtrl',
            function ($scope, $location) {
                $scope.isActive = function (viewLocation) {
                    return viewLocation === $location.path();
                };
            });
})();
