/**
 * Created by Donny on 17/4/5.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('MapController', ['$scope', function ($scope) {
            $scope.vm = {
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
        }])
})(angular);