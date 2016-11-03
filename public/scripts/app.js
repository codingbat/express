(function () {
    angular
        .module('poiApp', [
            'addCtrl',
            'queryCtrl',
            'navCtrl',
            'updateCtrl',
            'deleteCtrl',
            'mapReduce',
            'geolocation',
            'locService',
            'ngRoute',
            'PoiService',
        ])
        .config(function ($routeProvider) {
            $routeProvider.when('/create', {
                controller: 'addCtrl',
                templateUrl: 'views/addForm.html',

            }).when('/retrieve', {
                controller: 'queryCtrl',
                templateUrl: 'views/queryForm.html',

            }).when('/update', {
                controller: 'updateCtrl',
                templateUrl: 'views/updateForm.html',

            }).when('/delete', {
                controller: 'deleteCtrl',
                templateUrl: 'views/delete.html',

            }).when('/reduce', {
                controller: 'mapReduceCtrl',
                templateUrl: 'views/mapReduce.html',

            }).otherwise({redirectTo: '/create'})
        });
})();
