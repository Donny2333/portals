/**
 * Created by Donny on 17/4/5.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('GalleryController', ['$scope', '$timeout', 'Sections', 'Gallery',
            function ($scope, $timeout, Sections, Gallery) {
                var vm = $scope.vm = {
                    title: 'Living Atlas 中的专题地图',
                    classificate: 0,
                    sections: [],
                    selected: {
                        id: 0,
                        name: '最新地图',
                        value: 'update'
                    },
                    options: [
                        {
                            id: 0,
                            name: '最新地图',
                            value: 'update'
                        }, {
                            id: 1,
                            name: '最高评级',
                            value: 'level'
                        }, {
                            id: 2,
                            name: '标题',
                            value: 'title'
                        }, {
                            id: 3,
                            name: '所有者',
                            value: 'author'
                        }, {
                            id: 4,
                            name: '最高访问量',
                            value: 'visited'
                        }
                    ],
                    display: 0,
                    gallery: [],
                    toolbox: {
                        droplist: false,
                        expand: false
                    },
                    expand: {
                        id: 0,
                        state: false,
                        open: [true, false, false]
                    }
                };

                Sections.get().then(function (res) {
                    vm.sections = res.data;
                });

                Gallery.get().then(function (res) {
                    vm.gallery = res.data;
                });

                $scope.classify = function (id) {
                    vm.classificate = id;

                    // Todo: request data from server
                };

                $scope.change = function (id) {
                    vm.selected = vm.options[id];
                    vm.toolbox.droplist = false;

                    // Todo: orderBy the vm.gallery
                };

                // $scope.focus = function () {
                //     $scope.$evalAsync(function () {
                //         console.log("focus");
                //     });
                // };
                //
                // $scope.blur = function () {
                //     $scope.$evalAsync(function ($scope) {
                //         $scope.vm.droplist = false;
                //         console.log($scope.vm.droplist);
                //     });
                // };

                $scope.hover = function (index) {
                    var show = Math.ceil((index + 1) / 4) - 1;
                    var delay = 0;

                    // 如果该层描述窗口未打开，则打开
                    if (!vm.expand.open[show]) {
                        vm.expand.open[show] = !vm.expand.open[show];

                        // 延迟绑定数据
                        $timeout(function () {
                            vm.expand.id = index;
                        }, delay);
                    } else {
                        vm.expand.id = index;
                    }

                    // 关闭其他层描述窗口
                    vm.expand.open.map(function (item, index) {
                        if (index !== show) {
                            vm.expand.open[index] = false;
                        }
                    });
                };
            }]);
})(angular);