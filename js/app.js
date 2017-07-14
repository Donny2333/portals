/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('portals', [
        'ngSanitize',
        'ui.select',
        'ngAnimate',
        'ui.bootstrap',
        'portals.config',
        'portals.routers',
        'portals.directives',
        'portals.services',
        'portals.controllers'
    ]).config(['$httpProvider', '$sceProvider', function ($httpProvider, $sceProvider) {
        $httpProvider.defaults.useXDomain = true;
        // $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
    }]);


})(angular);