(function () {
    angular
        .module('poiApp', [
            'addCtrl',
            'queryCtrl',
            'navCtrl',
            'updateCtrl',
            'deleteCtrl',
            'geolocation',
            'locService',
            'ngRoute',
            'PoiService'
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

            }).otherwise({redirectTo: '/create'})
        });
})();
