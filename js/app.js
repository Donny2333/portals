/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('portals', [
        'ngAnimate',
        'portals.routers',
        'portals.directives',
        'portals.services',
        'portals.controllers'
    ]);

})(angular);