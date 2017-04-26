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
                            name: '标题',
                            value: 'title'
                        }, {
                            id: 2,
                            name: '所有者',
                            value: 'author'
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
                    data: {},
                    segments: [],
                    pagination: {
                        totalItems: 0,
                        maxSize: 5,
                        pageNo: 0,
                        pageSize: 12,
                        maxPage: 1
                    }
                };

                Sections.post({
                    typeRes: "公用",
                    fieldName: "TagName",
                    mapType: "mapserver"
                }).then(function (data) {
                    if (data.status === "ok") {
                        data.result.map(function (section, index) {
                            vm.sections.push({
                                id: index,
                                name: section
                            })
                        })
                    }
                    else {
                        console.log(data);
                    }
                });

                Gallery.post({
                    // userId: 1,
                    typeMap: "",
                    typeRes: "公用",
                    pageNo: 0,
                    pageNum: vm.pagination.pageSize
                }).then(function (data) {
                    if (data.status === "ok") {
                        data.result.map(function (gallery) {
                            vm.gallery.push({
                                id: gallery.Id,
                                title: gallery.Name,
                                author: gallery.Author,
                                update: gallery.UpdateTime.split(' ')[0],
                                version: "1.0.0",
                                img: URL_CFG.img + _.replace(gallery.PicPath, '{$}', 'big'),
                                brief: gallery.Detail,
                                detail: gallery.Detail2
                            })
                        });
                        vm.expand.last = Math.ceil(vm.gallery.length / 4) - 1;
                        vm.pagination.totalItems = data.count;
                        vm.pagination.maxPage = Math.ceil(data.count / vm.pagination.pageSize);
                        console.log(vm.pagination.maxPage);
                    }
                    else {
                        console.log(data);
                    }
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
                    vm.flipper = true;
                    vm.data = vm.gallery[id];

                    // Todo: fulfill segmets
                    vm.segments = [{
                        id: 0,
                        title: "描述",
                        content: vm.data.detail
                    }];
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