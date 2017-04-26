/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('portals.services', [])
        .factory('uuid', function () {
            var uuid = {};

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            uuid.create = function () {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };

            return uuid;
        })

        .factory('Http', ["$q", "$http", function ($q, $http) {
            return {
                get: function (url) {
                    var deferred = $q.defer();

                    $http.get(url).then(function (res) {
                        deferred.resolve(res.data);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                },
                post: function (url, param) {
                    var deferred = $q.defer();

                    $http.post(url, param).then(function (res) {
                        deferred.resolve(res.data);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                }
            }
        }])

        .factory("Sections", ["Http", function (Http) {
            var url = "http://192.168.99.105:9527/MapService.svc/GetDocNames";

            return {
                get: function () {
                    return Http.get(url);
                },
                post: function (param) {
                    return Http.post(url, param);
                }
            }
        }])

        .factory("Gallery", ["Http", function (Http) {
            var url = "http://192.168.99.105:9527/MapService.svc/GetMapDocList";

            return {
                get: function () {
                    return Http.jsonp(url);
                },
                post: function (param) {
                    return Http.post(url, param);
                }
            }
        }])

})(angular);