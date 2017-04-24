/**
 * Created by Donny on 17/4/5.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('GalleryController', ['$scope', '$timeout', 'Gallery', function ($scope, $timeout, Gallery) {
            var vm = $scope.vm = {
                title: 'Living Atlas 中的专题地图',
                sections: [
                    {
                        id: 0,
                        name: '影像'
                    }, {
                        id: 1,
                        name: '底图'
                    }, {
                        id: 2,
                        name: '历史地图'
                    }, {
                        id: 3,
                        name: '人口统计与生活方式'
                    }, {
                        id: 4,
                        name: '景观'
                    }, {
                        id: 5,
                        name: '海洋'
                    }, {
                        id: 6,
                        name: '地球观测'
                    }, {
                        id: 7,
                        name: '城市系统'
                    }, {
                        id: 8,
                        name: '运输'
                    }, {
                        id: 9,
                        name: '边界和地点'
                    }, {
                        id: 10,
                        name: '地图故事'
                    }
                ],
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

            Gallery.get().then(function (res) {
                vm.gallery = res.data;
            });

            $scope.change = function (id) {
                vm.selected = vm.options[id];
                vm.toolbox.droplist = false;

                // Todo: filter the vm.gallery
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