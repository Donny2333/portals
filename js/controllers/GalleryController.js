/**
 * Created by Donny on 17/4/5.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('GalleryController', ['$scope', '$timeout', '$http', 'Sections', 'Gallery', 'URL_CFG',
            function ($scope, $timeout, $http, Sections, Gallery, URL_CFG) {
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
                        open: [true, false, false],
                        last: 0
                    },
                    flipper: false,
                    data: {
                        id: 0,
                        title: '四维导航图',
                        author: 'Web Map',
                        create: "2017-4-30",
                        update: "2017-5-20",
                        version: "1.0.0",
                        img: '../images/map1.jpg',
                        description: "地理信息系统有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。" +
                        "它是在计算机硬、软件系统支持下，对整个或部分地球表层（包括大气层）"
                    },
                    segments: [{
                        id: 0,
                        title: "描述",
                        content: '地理信息系统（GIS，Geographic Information System）是一门综合性学科，结合地理学与地图学以及遥感和计算机科学，已经广泛的应用在不同的领域，是用于输入、存储、查询、分析和显示地理数据的计算机系统，随着GIS的发展，也有称GIS为“地理信息科学”（Geographic Information Science），近年来，也有称GIS为"地理信息服务"（Geographic Information service）。GIS是一种基于计算机的工具，它可以对空间信息进行分析和处理（简而言之，是对地球上存在的现象和发生的事件进行成图和分析）。 GIS 技术把地图这种独特的视觉化效果和地理分析功能与一般的数据库操作（例如查询和统计分析等）集成在一起。'
                    }, {
                        id: 1,
                        title: "API调用",
                        content: '地理信息系统（GIS，Geographic Information System）是一门综合性学科，结合地理学与地图学以及遥感和计算机科学，已经广泛的应用在不同的领域，是用于输入、存储、查询、分析和显示地理数据的计算机系统，随着GIS的发展，也有称GIS为“地理信息科学”（Geographic Information Science），近年来，也有称GIS为"地理信息服务"（Geographic Information service）。GIS是一种基于计算机的工具，它可以对空间信息进行分析和处理（简而言之，是对地球上存在的现象和发生的事件进行成图和分析）。 GIS 技术把地图这种独特的视觉化效果和地理分析功能与一般的数据库操作（例如查询和统计分析等）集成在一起。'
                    }]
                };

                Sections.post({
                    fieldName: "TypeMap",
                    typeRes: "公用"
                }).then(function (data) {
                    data.result.map(function (section, index) {
                        vm.sections.push({
                            id: index,
                            name: section
                        })
                    })
                });

                Gallery.post({
                    userId: 1,
                    typeMap: "",
                    typeRes: "公用",
                    pageNo: 0,
                    pageNum: 10
                }).then(function (data) {
                    data.result.map(function (gallery) {
                        vm.gallery.push({
                            id: gallery.Id,
                            title: gallery.Name,
                            author: gallery.Author,
                            update: gallery.UpdateTime.split(' ')[0],
                            version: "1.0.0",
                            visited: 200,
                            level: 1,
                            img: URL_CFG.img + _.replace(gallery.PicPath, '{$}', 'big'),
                            description: gallery.Detail
                        })
                    });
                    vm.expand.last = Math.ceil(vm.gallery.length / 4) - 1;
                });

                $scope.classify = function (id) {
                    vm.classificate = id;

                    // Todo: request data from server
                };

                $scope.change = function (id) {
                    vm.selected = vm.options[id];
                    vm.toolbox.droplist = false;

                    vm.gallery = _.orderBy(vm.gallery, vm.selected.value,
                        vm.selected.value === "update" ? "desc" : "asc");
                };

                $scope.goMore = function (id) {
                    // Todo: jump into the new page
                    vm.flipper = true;
                };

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