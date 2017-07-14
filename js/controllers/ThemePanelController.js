/**
 * Created by Donny on 17/7/11.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('ThemePanelController', ['$scope', '$q', '$http', '$timeout', 'URL_CFG', 'HSymbolEngine',
            function ($scope, $q, $http, $timeout, URL_CFG, HSymbolEngine) {
                var vm = $scope.vm;
                $scope.showImg = false;
                $scope.chooseXls = false;
                $scope.step = 0;
                $scope.xlsName = null;
                $scope.xlsData = {
                    head: [],
                    body: []
                };
                $scope.checkboxs = [];
                $scope.symbolTypes = {
                    selected: null,
                    data: []
                };
                $scope.colorTypes = {
                    selected: null,
                    data: []
                };
                $scope.size = 120;
                $scope.alpha = 100;
                $scope.depth = 0;
                $scope.ratioCircle = 100;
                $scope.ratioRing = 0;

                $scope.renderImg = function (value) {
                    value = value || {};

                    HSymbolEngine.singleChart({
                        values: '1,2,3,4,5',
                        chartid: value.symbolCode || $scope.symbolTypes.selected.code,
                        colorid: value.colorCode || $scope.colorTypes.selected.code,
                        alpha: $scope.alpha / 100,
                        cwidth: $scope.size,
                        cheight: $scope.size,
                        type: 'json',
                        csetting: {
                            depth: $scope.depth,
                            ratioCircle: $scope.ratioCircle / 100,
                            ratioRing: $scope.ratioRing / 100
                        }
                    }).then(function (res) {
                        if (res.status === 'ok') {
                            $scope.symbolImg = res.message;
                        }
                    });
                };


                HSymbolEngine.themeInfos({
                    method: 'chart'
                }).then(function (res) {
                    $scope.symbolTypes = {
                        selected: res.result.result[0],
                        data: res.result.result
                    };
                }, function (err) {
                    console.log(err);
                });

                HSymbolEngine.themeInfos({
                    method: 'color',
                    colornum: 10
                }).then(function (res) {
                    $scope.colorTypes = {
                        selected: res.result.result[0],
                        data: res.result.result
                    };
                }, function (err) {
                    console.log(err);
                });


                $scope.read = function (wb) {
                    var ws = wb.Sheets['用户数据'];
                    $scope.$apply(function () {
                        $scope.xlsData.body = [];
                        XLSX.utils.sheet_to_json(ws).map(function (item, index) {
                            $scope.xlsData.body.push(angular.extend(item, {
                                id: index
                            }));
                        });

                        $scope.xlsData.head = XLSX.utils.sheet_to_json(ws, {header: 1})[0];

                        $scope.checkboxs = [];
                        $scope.xlsData.head.slice(4, -1).map(function (value) {
                            $scope.checkboxs.push({
                                name: value,
                                checked: true
                            })
                        });

                        $scope.chooseXls = true;
                    });
                };

                $scope.error = function (e) {
                    console.log(e);
                };

                $scope.next = function (step) {
                    switch (step) {
                        case 0:
                            $scope.step = step;
                            break;

                        case 1:
                            if ($scope.chooseXls) {
                                if (!$scope.symbolImg) {
                                    HSymbolEngine.singleChart({
                                        values: '1,2,3,4,5',
                                        chartid: $scope.symbolTypes.selected.code,
                                        colorid: $scope.colorTypes.selected.code,
                                        alpha: $scope.alpha / 100,
                                        cwidth: $scope.size,
                                        cheight: $scope.size,
                                        type: 'json',
                                        csetting: {
                                            depth: 2,
                                            ratioCircle: 1,
                                            ratioRing: 0,
                                            angleGapType: 1,
                                            angleStart: 0,
                                            angleSpan: 360,
                                            ratioAngleGap: 0.5,
                                            angleRoseLeaf: 60
                                        }
                                    }).then(function (res) {
                                        if (res.status === 'ok') {
                                            $scope.symbolImg = res.message;
                                            $scope.step = step;
                                        }
                                    });
                                } else {
                                    $scope.step = step;
                                }
                            }
                            break;

                        case 2:
                            var checked = _.find($scope.checkboxs, 'checked');
                            if (checked) {
                                $scope.step = step;
                            }
                            break;

                        default:
                            $scope.step = step;
                            break;
                    }
                };

                $scope.commit = function () {
                    var values = [];
                    var url = URL_CFG.theme + 'HSymbolEngine/ChartLayer';

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
                        return _.join(x, ',');
                    };
                    var names = compose(filter, map, join);

                    $scope.xlsData.body.map(function (o) {
                        var _value = [];

                        $scope.xlsData.head.slice(4, -1).map(function (value) {
                            _value.push({
                                name: value,
                                value: o[value],
                                unit: o['指标单位']
                            })
                        });

                        values.push({
                            region: o['区域'],
                            x: o['X坐标'],
                            y: o['Y坐标'],
                            values: _value
                        })
                    });

                    console.log(names($scope.checkboxs));
                    console.log(values);

                    var param = {
                        extent: [vm.overlay.xmin, vm.overlay.ymin, vm.overlay.xmax, vm.overlay.ymax].join(','),
                        width: $scope.size,
                        height: $scope.size,
                        names: names($scope.checkboxs),
                        values: values,
                        type: 'image'
                    };

                    var _param = [];
                    for (var key in param) {
                        if (typeof param[key] === 'object') {
                            _param.push(key + '=' + JSON.stringify(param[key]));
                        } else {
                            _param.push(key + '=' + param[key]);
                        }
                    }

                    $scope.showImg = true;
                    $scope.imgUrl = url + '?' + _param.join('&');

                    console.log(url + '?' + _param.join('&'));
                };
            }
        ])
})(angular);