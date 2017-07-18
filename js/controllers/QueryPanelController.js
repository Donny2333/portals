/**
 * Created by Donny on 17/7/13.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('QueryPanelController', ['$scope', '$q', '$timeout', 'Query', 'FullFeatures',
            function ($scope, $q, $timeout, Query, FullFeatures) {
                var pass = false;
                var vm = $scope.vm;
                vm.overlay.swipe = false;
                vm.overlay.queryUrl = vm.overlay.data.mapServerPath;
                vm.overlay.queryData = {
                    head: ['Name', 'ReMark', 'Detail'],
                    body: []
                };
                vm.overlay.json = null;

                $scope.assemble = function () {
                    var flag = true;
                    vm.overlay.queryData.body.map(function (o) {
                        if (o.ReMark === '必填' && !o.Value) {
                            flag = false;
                        }
                    });

                    if (flag) {
                        var param = [];

                        vm.overlay.queryData.body.map(function (o) {
                            if (o['Value']) {
                                param.push(o['Name'] + '=' + o['Value']);
                            }
                        });

                        vm.overlay.queryUrl = vm.overlay.data.mapServerPath + '?' + param.join('&');
                        pass = true;
                    }
                };

                $scope.commit = function () {
                    if (pass) {
                        var param = {};

                        vm.overlay.queryData.body.map(function (o) {
                            if (o['Value']) {
                                param[o['Name']] = o['Value'];
                            }
                        });
                        FullFeatures.query(vm.overlay.data.mapServerPath, param).then(function (res) {
                            if (res.data.status === 'ok') {
                                vm.overlay.json = JSON.stringify(res.data.result, undefined, 4);
                            } else {
                                vm.overlay.json = JSON.stringify(res, undefined, 4);
                            }
                            vm.overlay.swipe = true;
                        }, function (err) {
                            vm.overlay.json = JSON.stringify(err, undefined, 4);
                            vm.overlay.swipe = true;
                        });
                    }
                };

                $scope.backward = function () {
                    vm.overlay.swipe = false;
                };

                Query.getQueryParam({
                    MapId: vm.overlay.data.id
                }).then(function (data) {
                    vm.overlay.queryData.body = [];
                    data.result.map(function (o) {
                        vm.overlay.queryData.body.push(angular.extend(o, {
                            Value: o.DefaultVal
                        }))
                    });

                    vm.overlay.queryData.body = data.result;
                })
            }])
})(angular);