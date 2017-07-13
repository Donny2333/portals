/**
 * Created by Donny on 17/7/11.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('ThemePanelController', ['$scope', function ($scope) {
            $scope.step = 2;
            $scope.symbolImg = 'images/symbolImg.png';
            $scope.xlsName = null;
            $scope.xlsData = {
                head: [],
                body: []
            };
            $scope.checkboxs = [{
                name: '居住小区',
                checked: true
            }, {
                name: '单位院落',
                checked: true
            }, {
                name: '工矿企业',
                checked: true
            }, {
                name: '居住小区',
                checked: true
            }];

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
                });
            };

            $scope.error = function (e) {
                console.log(e);
            };

            $scope.next = function (step) {
                $scope.step = step;
                if ($scope.xlsName) {

                }
            }
        }])
})(angular);