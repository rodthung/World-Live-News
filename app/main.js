<<<<<<< HEAD
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


=======
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


>>>>>>> 28af370dab4d74096807671e9d45b621b9fc643b
});