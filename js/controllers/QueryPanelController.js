/**
 * Created by Donny on 17/7/13.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('QueryPanelController', ['$scope', '$q', '$http', '$timeout', 'Query',
            function ($scope, $q, $http, $timeout, Query) {
                var vm = $scope.vm;
                vm.overlay.queryData = {
                    head: ['Name', 'ReMark', 'Detail'],
                    body: []
                };
                vm.overlay.queryUrl = vm.overlay.data.mapServerPath;

                $scope.assemble = function () {
                    var flag = true;
                    vm.overlay.queryData.body.map(function (o) {
                        if (o.ReMark === '必填' && !o.Value) {
                            flag = false;
                            console.log(o);
                        }
                    });
                    console.log(flag);
                };

                Query.getQueryParam({
                    MapId: vm.overlay.data.id
                }).then(function (data) {
                    vm.overlay.queryData.body = [];
                    data.result.map(function (o) {
                        vm.overlay.queryData.body.push(angular.extend(o, {
                            Value: ''
                        }))
                    });

                    vm.overlay.queryData.body = data.result;
                    console.log(vm.overlay.queryData.body);
                })
            }])
})(angular);