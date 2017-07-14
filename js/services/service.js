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

        .factory('Now', function () {
            return {
                date: function () {
                    var d = new Date();
                    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
                }
            }
        })

        .factory('Http', ["$q", "$http", "$sce", function ($q, $http, $sce) {
            function parseParams(url, params) {
                var p = [];
                for (var key in params) {
                    if (typeof params[key] === 'object') {
                        p.push(key + '=' + JSON.stringify(params[key]));
                    } else {
                        p.push(key + '=' + params[key]);
                    }
                }
                return [url, p.join('&')].join('?');
            }

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
                },
                jsonp: function (url, params) {
                    var deferred = $q.defer();
                    var _url = parseParams(url, params);

                    $http.jsonp($sce.trustAsResourceUrl(_url)).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                },
                fakePost: function (url, params) {
                    var deferred = $q.defer();
                    var _url = parseParams(url, params);

                    $http.get(_url).then(function (res) {
                        deferred.resolve(res.data);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                }
            }
        }])

        .factory("Sections", ["Http", "URL_CFG", function (Http, URL_CFG) {
            var url = URL_CFG.api + "MapService.svc/GetDocNames";

            return {
                get: function () {
                    return Http.get(url);
                },
                post: function (param) {
                    return Http.post(url, param);
                }
            }
        }])

        .factory("Gallery", ["Http", "URL_CFG", function (Http, URL_CFG) {
            var url = URL_CFG.api + "MapService.svc/GetMapDocList";

            return {
                get: function () {
                    return Http.get(url);
                },
                post: function (param) {
                    return Http.post(url, param);
                },
                preview: function (param) {
                    return Http.post(URL_CFG.api + 'MapService.svc/GetAtlas', param);
                },
                download: function (param) {
                    return Http.post(URL_CFG.api + 'MapService.svc/DownLoadAtlas', param);
                }
            }
        }])

        .factory("Calculate", ["Http", "URL_CFG", function (Http, URL_CFG) {
            return {
                getDlgqParam: function (param) {
                    return Http.post(URL_CFG.api + 'MapService.svc/GetDlgqParam', param);
                },
                getThemeImagePoint: function (param) {
                    return Http.post(URL_CFG.api + 'CalMapService.svc/GetThemeImagePoint', param);
                },
                getThemeImageLine: function (param) {
                    return Http.post(URL_CFG.api + 'CalMapService.svc/GetThemeImageLine', param);
                },
                getThemeImageArea: function (param) {
                    return Http.post(URL_CFG.api + 'CalMapService.svc/GetThemeImageArea', param);
                }
            }
        }])

        .factory("HSymbolEngine", ["Http", 'URL_CFG', function (Http, URL_CFG) {
            return {
                themeInfos: function (param) {
                    return Http.fakePost(URL_CFG.theme + 'HSymbolEngine/ThemeInfos', param);
                },
                singleChart: function (param) {
                    return Http.fakePost(URL_CFG.theme + 'HSymbolEngine/SingleChart', param);
                },
                legend: function (param) {
                    return Http.fakePost(URL_CFG.theme + 'HSymbolEngine/Legend', param);
                },
                chartLayer: function (param) {
                    return Http.fakePost(URL_CFG.theme + 'HSymbolEngine/ChartLayer', param);
                }
            }
        }])

        .factory("Query", ["Http", 'URL_CFG', function (Http, URL_CFG) {
            return {
                getQueryParam: function (param) {
                    return Http.fakePost(URL_CFG.api + 'MapService.svc/GetQueryParam', param);
                }
            }
        }])

        .factory('FullFeatures', ['$http', 'Http', function ($http, Http) {
            return {
                query: function (url, params) {
                    var callback = $http.defaults.jsonpCallbackParam;
                    $http.defaults.jsonpCallbackParam = 'jsoncallback';
                    return Http.jsonp(url, params).then(function (res) {
                        $http.defaults.jsonpCallbackParam = callback;
                        return res;
                    }, function (err) {
                        $http.defaults.jsonpCallbackParam = callback;
                        return err;
                    })
                }
            }
        }])

})(angular);