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

        .factory("Gallery", ["$q", "$http", function ($q, $http) {
            var url = "/json/gallery.json";

            return {
                get: function () {
                    var deferred = $q.defer();

                    $http.get(url).then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                }
            }
        }])

})(angular);