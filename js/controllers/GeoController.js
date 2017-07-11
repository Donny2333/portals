/**
 * Created by Donny on 17/7/7.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('GeoPanelController', ['$scope', '$q', 'Calculate', 'Now', 'URL_CFG',
            function ($scope, $q, Calculate, Now, URL_CFG) {
                var vm = $scope.vm;
                vm.overlay.showImg = false;
                vm.overlay.imgUrl = null;
                vm.overlay.geography = {
                    title: '无题',
                    creator: '佚名',
                    org: '地信科技',
                    date: Now.date(),
                    radios: {
                        checked: 1,
                        data: [{
                            name: '柱状图',
                            value: 1
                        }, {
                            name: '饼状图',
                            value: 2
                        }, {
                            name: '堆叠图',
                            value: 3
                        }]
                    },
                    checkboxs: [{
                        name: '居住小区',
                        checked: true
                    }, {
                        name: '单位院落',
                        checked: true
                    }, {
                        name: '工矿企业',
                        checked: false
                    }],
                    showCheckboxs: false
                };

                if (vm.overlay.data.title === '城市综合能力') {
                    vm.overlay.geography.showCheckboxs = true;
                }

                $scope.select = function (item) {
                    vm.overlay.select = item;
                };

                $scope.commit = function () {
                    var getThemeImage = null;
                    switch (vm.overlay.data.title) {
                        case '地类面积':
                            getThemeImage = getThemeImageArea;
                            break;

                        case '道路统计':
                        case '水域统计':
                            getThemeImage = getThemeImageLine;
                            break;

                        case '城市综合能力':
                            getThemeImage = getThemeImagePoint;
                            break;

                        default:
                            break;
                    }
                    getThemeImage && getThemeImage(vm.overlay.geography).then(function (data) {
                        vm.overlay.showImg = true;
                        vm.overlay.imgUrl = URL_CFG.temp + data;
                    });
                };

                function getThemeImagePoint(geography) {
                    var deferred = $q.defer();
                    var compose = function (f, g, h) {
                        return function (x) {
                            return h(g(f(x)));
                        };
                    };
                    var filter = function (x) {
                        return _.filter(x, 'checked');
                    };
                    var map = function (x) {
                        return _.map(x, 'name');
                    };
                    var join = function (x) {
                        return _.join(x, '_');
                    };
                    var mapName = compose(filter, map, join);

                    Calculate.getThemeImagePoint({
                        title: geography.title,
                        creator: geography.creator,
                        org: geography.org,
                        date: geography.date,
                        mapname: mapName(geography.checkboxs),
                        dataType: vm.overlay.select.Code,
                        thematictype: geography.radios.checked
                    }).then(function (data) {
                        if (data.status === "ok") {
                            deferred.resolve(data.result);
                        } else {
                            deferred.reject(data);
                        }
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                }

                function getThemeImageLine(geography) {
                    var deferred = $q.defer();

                    Calculate.getThemeImageLine({
                        title: geography.title,
                        creator: geography.creator,
                        org: geography.org,
                        date: geography.date,
                        mapname: vm.overlay.select.Name,
                        dataType: vm.overlay.select.Code,
                        thematictype: geography.radios.checked
                    }).then(function (data) {
                        if (data.status === "ok") {
                            deferred.resolve(data.result);
                        } else {
                            deferred.reject(data);
                        }
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                }

                function getThemeImageArea(geography) {
                    var deferred = $q.defer();

                    Calculate.getThemeImageArea({
                        title: geography.title,
                        creator: geography.creator,
                        org: geography.org,
                        date: geography.date,
                        mapname: vm.overlay.select.Name,
                        mapcode: vm.overlay.select.Code,
                        thematictype: geography.radios.checked
                    }).then(function (data) {
                        if (data.status === "ok") {
                            deferred.resolve(data.result);
                        } else {
                            deferred.reject(data);
                        }
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                }
            }])
})(angular);