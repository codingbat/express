(function () {
    angular
        .module('poiApp', [
            'addCtrl',
            'queryCtrl',
            'navCtrl',
            'geolocation',
            'locService',
            'ngRoute'
        ])
        .config(function ($routeProvider) {
            $routeProvider.when('/add', {
                controller: 'addCtrl',
                templateUrl: 'views/addForm.html',

            }).when('/find', {
                controller: 'queryCtrl',
                templateUrl: 'views/queryForm.html',

            }).otherwise({redirectTo: '/add'})
        });
})();
