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

        .directive('jsXls', ['$parse', function ($parse) {
            return {
                restrict: 'E',
                template: '<input type="file" />',
                replace: true,
                link: function (scope, element, attrs) {

                    function handleSelect() {
                        var files = this.files;
                        for (var i = 0, f = files[i]; i !== files.length; ++i) {
                            var reader = new FileReader();
                            var name = f.name;
                            var data = null;
                            reader.onload = function (e) {
                                if (!e) {
                                    data = reader.content;
                                } else {
                                    data = e.target.result;
                                }

                                /* if binary string, read with type 'binary' */
                                try {
                                    var workbook = XLS.read(data, {type: 'binary'});

                                    scope.$apply(function () {
                                        scope[attrs.name] = name;
                                    });

                                    if (attrs.onread) {
                                        var handleRead = scope[attrs.onread];
                                        if (typeof handleRead === "function") {
                                            handleRead(workbook);
                                        }
                                    }
                                } catch (e) {
                                    if (attrs.onerror) {
                                        var handleError = scope[attrs.onerror];
                                        if (typeof handleError === "function") {
                                            handleError(e);
                                        }
                                    }
                                }

                                // Clear input file
                                element.val('');
                            };

                            //extend FileReader
                            if (!FileReader.prototype.readAsBinaryString) {
                                FileReader.prototype.readAsBinaryString = function (fileData) {
                                    var binary = "";
                                    var pt = this;
                                    var reader = new FileReader();
                                    reader.onload = function (e) {
                                        var bytes = new Uint8Array(reader.result);
                                        var length = bytes.byteLength;
                                        for (var i = 0; i < length; i++) {
                                            binary += String.fromCharCode(bytes[i]);
                                        }
                                        //pt.result  - readonly so assign binary
                                        pt.content = binary;
                                        $(pt).trigger('onload');
                                    };
                                    reader.readAsArrayBuffer(fileData);
                                }
                            }

                            reader.readAsBinaryString(f);
                        }
                    }

                    element.on('change', handleSelect);
                }
            };
        }]);

})(angular);