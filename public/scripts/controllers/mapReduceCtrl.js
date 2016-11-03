(function () {
    angular
        .module('mapReduce', [])
        .controller('mapReduceCtrl', function ($scope, $http) {
            $scope.locations = [];

            init();

            function init() {
                reduce();
            }

            function reduce() {
                $http
                    .get('/reduced_types')
                    .then(function (response) {
                        $scope.locations = response.data;

                    }, function (err) {
                        console.log('could not get reduced types', err.message);
                    });
            }
        });
})();
