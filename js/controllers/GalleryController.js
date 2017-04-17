/**
 * Created by Donny on 17/4/5.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('GalleryController', ['$scope', '$timeout', function ($scope, $timeout) {
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
                    value: '最新地图'
                },
                options: [{
                    id: 0,
                    value: '最新地图'
                }, {
                    id: 1,
                    value: 'Title'
                }, {
                    id: 2,
                    value: 'Visited'
                }],
                display: 0,
                gallery: [
                    {
                        id: 0,
                        title: '四维导航图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map1.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 1,
                        title: '四维导航图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map2.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 2,
                        title: '四维导航图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map3.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 3,
                        title: '四维导航图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map4.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 4,
                        title: '北京市迁徙图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map5.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 5,
                        title: '北京市迁徙图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map6.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 6,
                        title: '北京市迁徙图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map7.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 7,
                        title: '北京市迁徙图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map8.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 8,
                        title: '公交线路图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map9.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 9,
                        title: '公交线路图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map10.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 10,
                        title: '公交线路图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map11.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }, {
                        id: 11,
                        title: '公交线路图',
                        author: 'Web Map',
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map12.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    }],
                toolbox: {
                    droplist: false,
                    expand: true
                },
                expand: {
                    state: false,
                    id: 0,
                    open: [true, false, false]
                }
            };

            $scope.change = function (option) {
                console.log(option);
            };

            $scope.focus = function () {
                $scope.$evalAsync(function () {
                    console.log("focus");
                });
            };

            $scope.blur = function () {
                $scope.$evalAsync(function ($scope) {
                    $scope.vm.droplist = false;
                    console.log($scope.vm.droplist);
                });
                console.log("blur");
            };

            $scope.click = function (index) {
                var show = Math.ceil((index + 1) / 4) - 1;

                // 如果该层描述窗口未打开，则打开
                if (!$scope.vm.open[show]) {
                    $scope.vm.open[show] = !$scope.vm.open[show];

                    // 延迟绑定数据
                    $timeout(function () {
                        $scope.vm.select.id = index;
                    }, 180);
                } else {
                    $scope.vm.select.id = index;
                }

                // 关闭其他层描述窗口
                $scope.vm.open.map(function (item, index) {
                    if (index !== show) {
                        $scope.vm.open[index] = false;
                    }
                });
            }
        }]);
})(angular);