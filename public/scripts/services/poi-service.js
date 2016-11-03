(function () {
    angular.module('PoiService', [])
        .factory('PoiService', [
            '$http', function ($http) {
                var poi = function () {
                    return $http.get('http://localhost:3000/locations');
                };

                return {
                    getPoi: poi,
                };
            },

        ]);
}());
