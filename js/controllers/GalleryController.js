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
                        img: '../images/map1.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 1,
                        title: '四维导航图',
                        author: 'Web Map',
                        img: '../images/map2.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 2,
                        title: '四维导航图',
                        author: 'Web Map',
                        img: '../images/map3.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 3,
                        title: '四维导航图',
                        author: 'Web Map',
                        img: '../images/map4.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 4,
                        title: '北京市迁徙图',
                        author: 'Web Map',
                        img: '../images/map5.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 5,
                        title: '北京市迁徙图',
                        author: 'Web Map',
                        img: '../images/map6.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 6,
                        title: '北京市迁徙图',
                        author: 'Web Map',
                        img: '../images/map7.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 7,
                        title: '北京市迁徙图',
                        author: 'Web Map',
                        img: '../images/map8.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 8,
                        title: '公交线路图',
                        author: 'Web Map',
                        img: '../images/map9.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 9,
                        title: '公交线路图',
                        author: 'Web Map',
                        img: '../images/map10.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 10,
                        title: '公交线路图',
                        author: 'Web Map',
                        img: '../images/map11.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 11,
                        title: '公交线路图',
                        author: 'Web Map',
                        img: '../images/map12.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }],
                droplist: false,
                expand: false
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
        }]);
})(angular);