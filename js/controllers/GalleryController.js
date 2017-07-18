/**
 * Created by Donny on 17/4/5.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('GalleryController', ['$scope', '$rootScope', '$timeout', '$http', '$window', '$q', 'Sections', 'Gallery', 'Calculate', 'URL_CFG',
            function ($scope, $rootScope, $timeout, $http, $window, $q, Sections, Gallery, Calculate, URL_CFG) {
                var vm = $scope.vm = {
                    title: 'Living Atlas 中的专题地图',
                    classificate: {
                        id: '1',
                        classify: '20'
                    },
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

                Sections.getMapMenu().then(function (res) {
                    res.result.map(function (o) {
                        if (o.parent_id == 0) {
                            vm.sections.push({
                                id: o.id,
                                img: URL_CFG.img + o.normal_pic,
                                checked: URL_CFG.img + o.select_pic,
                                field: o.name,
                                classify: []
                            })
                        }
                    });

                    vm.sections.map(function (section) {
                        res.result.map(function (o) {
                            if (o.parent_id == section.id) {
                                section.classify.push({
                                    id: o.id,
                                    name: o.name,
                                    sort: o.sort
                                });
                            }
                        });
                    });

                    vm.classificate = {
                        id: vm.sections[0].id,
                        classify: vm.sections[0].classify[0].id
                    }
                });


                reload({
                    pageNo: vm.pagination.pageNo - 1,
                    pageNum: vm.pagination.pageSize,
                    tagId: 20,
                    typeRes: "Public",
                    mapType: ""
                });

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
                    reload({
                        pageNo: vm.pagination.pageNo - 1,
                        pageNum: vm.pagination.pageSize,
                        tagId: vm.classificate.classify,
                        typeRes: "Public",
                        mapType: ""
                    });
                };

                $scope.classify = function (id, classify) {
                    vm.classificate.id = id;
                    vm.classificate.classify = classify;
                    reload({
                        pageNo: vm.pagination.pageNo - 1,
                        pageNum: vm.pagination.pageSize,
                        tagId: classify,
                        typeRes: "Public",
                        mapType: ""
                    });
                };

                $scope.pageChanged = function () {
                    reload({
                        pageNo: vm.pagination.pageNo - 1,
                        pageNum: vm.pagination.pageSize,
                        tagId: vm.classificate.classify,
                        typeRes: "Public",
                        mapType: ""
                    });
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
                    switch (vm.data.appType) {
                        case 'altas_dlgq':
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
                            break;

                        case 'map_3D':
                            $window.open(vm.data.mapServerPath, '_blank');
                            break;

                        case 'cal_area':
                            Calculate.getDlgqParam({
                                MapId: vm.data.id
                            }).then(function (res) {
                                $rootScope.$broadcast('mask:show', {
                                    showMask: true,
                                    template: '<geo-panel></geo-panel>',
                                    overlay: {
                                        title: '地理国情统计出图',
                                        list: res.result,
                                        data: vm.data,
                                        select: res.result[0],
                                        radioDisabled: true
                                    }
                                });
                            });
                            break;

                        case 'cal_points':
                        case 'cal_road':
                        case 'cal_water':
                            Calculate.getDlgqParam({
                                MapId: vm.data.id
                            }).then(function (res) {
                                $rootScope.$broadcast('mask:show', {
                                    showMask: true,
                                    template: '<geo-panel></geo-panel>',
                                    overlay: {
                                        title: '地理国情统计出图',
                                        list: res.result,
                                        data: vm.data,
                                        select: res.result[0]
                                    }
                                });
                            });
                            break;

                        case 'cal_theme':
                            $rootScope.$broadcast('mask:show', {
                                showMask: true,
                                template: '<theme-panel></theme-panel>',
                                overlay: {
                                    title: '专题统计出图',
                                    xmin: vm.data.xmin,
                                    xmax: vm.data.xmax,
                                    ymin: vm.data.ymin,
                                    ymax: vm.data.ymax,
                                    mxdPath: vm.data.mxdPath,
                                    imgHeight: 800,
                                    imgWidth: 800
                                }
                            });
                            break;

                        case 'query_general':
                        case 'query_qnl':
                            $rootScope.$broadcast('mask:show', {
                                showMask: true,
                                template: '<query-panel></query-panel>',
                                overlay: {
                                    title: vm.data.title,
                                    data: vm.data
                                }
                            });
                            break;

                        case 'mapshow':
                            $window.open(URL_CFG.map + vm.data.id, '_blank');
                            break;

                        default:
                            break;
                    }
                };

                $scope.download = function (singlePage) {
                    switch (vm.data.appType) {
                        case 'altas_dlgq':
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
                                if (res.data.status === 'ok') {
                                    var anchor = angular.element('<a/>');
                                    anchor.attr({
                                        href: res.result.BaseUrl + res.result.FileName,
                                        target: '_blank',
                                        download: res.result.FileName
                                    })[0].click();
                                }
                            });
                            break;

                        default:
                            break;
                    }
                };

                function reload(param) {
                    Gallery.post(param).then(function (data) {
                        if (data.status === "ok" && data.result) {
                            vm.gallery = [];
                            data.result.length > 0 && data.result.map(function (gallery) {
                                vm.gallery.push({
                                    appType: gallery.AppType,
                                    id: gallery.Id,
                                    title: gallery.Name,
                                    author: gallery.Author,
                                    update: gallery.UpdateTime.split(' ')[0],
                                    version: "1.0.0",
                                    img: URL_CFG.img + _.replace(gallery.PicPath, '{$}', 'big'),
                                    // img: "http://192.168.99.105:9528/RootData/public/MapDoc/Images/big/安全设施分布图.png",
                                    brief: gallery.Detail,
                                    detail: gallery.Detail2,
                                    mxdPath: gallery.MxdPath,
                                    mapServerPath: gallery.MapServerPath,
                                    xmin: gallery.Xmin,
                                    xmax: gallery.Xmax,
                                    ymin: gallery.Ymin,
                                    ymax: gallery.Ymax
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
                    }, function (err) {
                        console.log(err);
                    })
                }
            }
        ])
    ;
})(angular);