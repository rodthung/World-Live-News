angular.module("newsApp", ["ngRoute"])

.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html'
        })
        .when('/Map', {
            templateUrl: 'pages/map.html',
            controller: 'mapController'
        });
})


.run(function () {
});