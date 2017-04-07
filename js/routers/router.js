/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('portals.routers', ['ui.router'])
        .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/app/home');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: 'tpls/menu.html',
                    controller: 'AppController'
                })
                .state('app.home', {
                    url: '/home',
                    templateUrl: 'tpls/home.html',
                    controller: 'HomeController'
                })
                .state('app.product', {
                    url: '/product',
                    templateUrl: 'tpls/product.html',
                    controller: 'ProductController'
                })
                .state('app.solution', {
                    url: '/solution',
                    templateUrl: 'tpls/solution.html',
                    controller: 'SolutionController'
                })
                .state('app.case', {
                    url: '/case',
                    templateUrl: 'tpls/case.html',
                    controller: 'CaseController'
                })
                .state('app.gallery', {
                    url: '/gallery',
                    templateUrl: 'tpls/gallery.html',
                    controller: 'GalleryController'
                })
                .state('app.map', {
                    url: '/map',
                    templateUrl: 'tpls/map.html',
                    controller: 'MapController'
                })
                .state('app.news', {
                    url: '/news',
                    templateUrl: 'tpls/news.html',
                    controller: 'NewsController'
                })
                .state('app.resource', {
                    url: '/resource',
                    templateUrl: 'tpls/resource.html',
                    controller: 'ResourceController'
                });
        }]);

})(angular);