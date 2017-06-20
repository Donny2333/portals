/**
 * Created by Donny on 17/4/5.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('GalleryController', ['$scope', '$timeout', '$http', '$window', 'Sections', 'Gallery', 'URL_CFG',
            function ($scope, $timeout, $http, $window, Sections, Gallery, URL_CFG) {
                var vm = $scope.vm = {
                    title: 'Living Atlas 中的专题地图',
                    classificate: 0,
                    sections: [],
                    atlas: {
                        total: 0,
                        pages: []
                    },
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
                    showBook: false,
                    data: {},
                    segments: [],
                    pagination: {
                        totalItems: 0,
                        maxSize: 5,
                        pageNo: 1,
                        pageSize: 12,
                        maxPage: 1
                    }
                };

                Sections.post({
                    typeRes: "Public",
                    fieldName: "TagName"
                }).then(function (data) {
                    if (data.status === "ok") {
                        data.result.map(function (section, index) {
                            vm.sections.push({
                                id: index,
                                name: section
                            })
                        })
                    }
                });

                reload(vm.pagination.pageNo - 1, vm.pagination.pageSize, "城管");

                $scope.expand = function (expand) {
                    if (expand) {
                        vm.pagination = {
                            pageNo: 1,
                            pageSize: 4
                        };
                    } else {
                        vm.pagination = {
                            pageNo: 1,
                            pageSize: 12
                        };
                    }
                    vm.toolbox.expand = expand;
                    reload(vm.pagination.pageNo - 1, vm.pagination.pageSize, vm.sections[vm.classificate].name);
                };

                $scope.classify = function (id) {
                    vm.classificate = id;
                    reload(vm.pagination.pageNo - 1, vm.pagination.pageSize, vm.sections[id].name);
                };

                $scope.pageChanged = function () {
                    reload(vm.pagination.pageNo - 1, vm.pagination.pageSize, vm.sections[vm.classificate].name);
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
                        title: "概述",
                        content: vm.data.brief
                    }, {
                        id: 1,
                        title: "详情",
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

                $scope.preview = function () {
                    if (vm.data.tagName === "图册") {
                        vm.showBook = true;
                        Gallery.preview({
                            MapId: vm.data.id
                        }).then(function (res) {
                            vm.atlas.pages = [];
                            res.result.map(function (atlas) {
                                vm.atlas.pages.push({
                                    detail: atlas.Detail,
                                    id: atlas.Id,
                                    mapId: atlas.MapId,
                                    name: atlas.Name,
                                    pageNo: atlas.PageNo,
                                    pageType: atlas.PageType,
                                    picPath: URL_CFG.img + _.replace(atlas.PicPath, '{$}', 'normal'),
                                    tagName: atlas.TagName
                                })
                            });
                            vm.atlas.total = res.count;
                        });
                    } else {
                        $window.open('http://172.30.1.246:4010/map/' + vm.data.id, '_blank');
                    }
                };

                $scope.download = function (singlePage) {
                    if (vm.data.tagName === "图册") {
                        var atlasIdLst = [];
                        var pageNo = $('#flipbook').turn("page");
                        if (singlePage && 1 < pageNo < (vm.atlas.total + 1) * 2) {
                            atlasIdLst.push(Math.floor(pageNo / 2));
                        }

                        Gallery.download({
                            AtlasIdLst: atlasIdLst,
                            ImgSizeMode: 'Small',
                            pageNo: 0,
                            pageNum: 10
                        }).then(function (res) {
                            var anchor = angular.element('<a/>');
                            anchor.attr({
                                href: res.result.BaseUrl + res.result.FileName,
                                target: '_blank',
                                download: res.result.FileName
                            })[0].click();
                        })
                    } else {

                    }
                };


                /**
                 * load gallery
                 * @param pageNo
                 * @param pageSize
                 * @param tagName
                 * @param typeRes
                 * @param mapType
                 */
                function reload(pageNo, pageSize, tagName, typeRes, mapType) {
                    Gallery.post({
                        // userId: 1,
                        pageNo: pageNo,
                        pageNum: pageSize,
                        tagName: tagName || "",
                        typeRes: typeRes || "Public",
                        mapType: mapType || ""
                    }).then(function (data) {
                        if (data.status === "ok" && data.result) {
                            vm.gallery = [];
                            data.result.length > 0 && data.result.map(function (gallery) {
                                vm.gallery.push({
                                    id: gallery.Id,
                                    title: gallery.Name,
                                    author: gallery.Author,
                                    update: gallery.UpdateTime.split(' ')[0],
                                    version: "1.0.0",
                                    img: URL_CFG.img + _.replace(gallery.PicPath, '{$}', 'big'),
                                    // img: "http://192.168.99.105:9528/RootData/public/MapDoc/Images/big/安全设施分布图.png",
                                    tagName: gallery.TagName,
                                    brief: gallery.Detail,
                                    detail: gallery.Detail2
                                })
                            });
                            vm.expand = {
                                id: 0,
                                state: false,
                                open: [true, false, false],
                                last: Math.ceil(vm.gallery.length / 4) - 1
                            };
                            vm.pagination.totalItems = data.count;
                            vm.pagination.maxPage = Math.ceil(data.count / vm.pagination.pageSize);
                        }
                    })
                }

            }]);
})(angular);