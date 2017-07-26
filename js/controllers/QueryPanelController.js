/**
 * Created by Donny on 17/7/13.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('QueryPanelController', ['$scope', '$q', '$timeout', 'Query', 'FullFeatures', 'uuid',
            function ($scope, $q, $timeout, Query, FullFeatures, uuid) {
                var pass = false;
                var vm = $scope.vm;
                var map = null;
                vm.overlay.swipe = 0;
                vm.overlay.queryUrl = vm.overlay.data.mapServerPath;
                vm.overlay.queryData = {
                    head: ['Name', 'ReMark', 'Detail'],
                    body: []
                };
                vm.overlay.json = null;

                $scope.assemble = function () {
                    var flag = true;
                    vm.overlay.queryData.body.map(function (o) {
                        if (o.ReMark === '必填' && !o.Value) {
                            flag = false;
                        }
                    });

                    if (flag) {
                        var param = [];

                        vm.overlay.queryData.body.map(function (o) {
                            if (o['Value']) {
                                param.push(o['Name'] + '=' + o['Value']);
                            }
                        });

                        vm.overlay.queryUrl = vm.overlay.data.mapServerPath + '?' + param.join('&');
                        pass = true;
                    }
                };

                $scope.showMap = function () {
                    var url = vm.overlay.data.mxdPath;
                    var extent = [vm.overlay.data.xmin, vm.overlay.data.ymin, vm.overlay.data.xmax, vm.overlay.data.ymax];
                    var srcID = vm.overlay.data.srcID;
                    var layers = [
                        new ol.layer.Image({
                            source: new ol.source.ImageArcGISRest({
                                url: url,
                                params: {}
                            })
                        })
                    ];

                    document.getElementById('map').innerHTML = '';
                    map = new ol.Map({
                        layers: layers,
                        target: 'map',
                        view: new ol.View({
                            center: [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2],
                            projection: new ol.proj.Projection({
                                code: 'EPSG:' + srcID,
                                // set projection's units
                                units: extent[0] < 150 && extent[0] > 50 ? 'degrees' : 'm'
                            })
                        })
                    });

                    // set map's resolution
                    var size = map.getSize();
                    var resolution = (extent[3] - extent[1]) / size[1];
                    map.getView().setResolution(resolution);

                    var pts = [];
                    var obj = JSON.parse(vm.overlay.json);
                    var results = obj.Result[0].Result;
                    var draw = null;
                    var style;
                    var center;

                    console.log(results);
                    switch (results[0].ShapeType) {
                        case '点':
                            results.map(function (result) {
                                var shape = result.Shape;
                                if (shape) {
                                    var pt = [
                                        parseFloat(shape.slice(0, shape.indexOf(','))),
                                        parseFloat(shape.slice(shape.indexOf(',') + 1, shape.length))
                                    ];
                                    pts.push(pt);
                                }
                            });

                            draw = drawPoints;
                            style = new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: 'images/location.png',
                                    anchor: [.5, .85]
                                })
                            });
                            center = pts[0];
                            break;

                        case '线':
                            results.map(function (result) {
                                var line = [];
                                var shape = result.Shape;
                                if (shape) {
                                    shape.split(';').map(function (str) {
                                        var pt = [
                                            parseFloat(str.slice(0, str.indexOf(','))),
                                            parseFloat(str.slice(str.indexOf(',') + 1, str.length))
                                        ];
                                        line.push(pt);
                                    });
                                    pts.push(line);
                                }
                            });

                            draw = drawPolylines;
                            style = new ol.style.Style({
                                stroke: new ol.style.Stroke({
                                    width: 6,
                                    color: 'red'
                                })
                            });
                            center = pts[0][0];
                            break;

                        case '面':
                            var list = [];
                            results.map(function (result) {
                                var line = [];
                                var shape = result.Shape;
                                if (shape) {
                                    shape.split(';').map(function (str) {
                                        var pt = [
                                            parseFloat(str.slice(0, str.indexOf(','))),
                                            parseFloat(str.slice(str.indexOf(',') + 1, str.length))
                                        ];
                                        line.push(pt);
                                    });
                                    pts.push([line]);
                                }
                            });

                            draw = drawPolygons;
                            style = new ol.style.Style({
                                stroke: new ol.style.Stroke({
                                    width: 3,
                                    color: [255, 0, 0, 1]
                                }),
                                fill: new ol.style.Fill({
                                    color: [255, 0, 0, 0.4]
                                })
                            });
                            // center = pts[0][0][0];
                            center = [111.68212638, 32.395253213];
                            break;

                        default:
                            alert('无法进行图上展示');
                            break;
                    }

                    if (pts.length) {
                        vm.overlay.swipe = 2;
                        draw && draw(pts, style);
                        map.getView().animate({
                            center: center
                        });
                    }
                };

                $scope.commit = function () {
                    if (pass) {
                        var param = {};

                        vm.overlay.queryData.body.map(function (o) {
                            if (o['Value']) {
                                param[o['Name']] = o['Value'];
                            }
                        });
                        FullFeatures.query(vm.overlay.data.mapServerPath, param).then(function (res) {
                            if (res.data.status === 'ok') {
                                vm.overlay.json = JSON.stringify(res.data.result, undefined, 4);
                            } else {
                                vm.overlay.json = JSON.stringify(res, undefined, 4);
                            }
                            vm.overlay.swipe = 1;
                        }, function (err) {
                            vm.overlay.json = JSON.stringify(err, undefined, 4);
                            vm.overlay.swipe = 1;
                        });
                    }
                };

                Query.getQueryParam({
                    MapId: vm.overlay.data.id
                }).then(function (data) {
                    vm.overlay.queryData.body = [];
                    data.result.map(function (o) {
                        vm.overlay.queryData.body.push(angular.extend(o, {
                            Value: o.DefaultVal
                        }))
                    });

                    vm.overlay.queryData.body = data.result;
                });

                function drawPoints(pts, style) {
                    var points = [];
                    points.push(new ol.Feature(new ol.geom.MultiPoint(pts)));

                    var layerPoints = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: points
                        }),
                        style: style
                    });
                    map.addLayer(layerPoints);
                }

                function drawPolylines(pts, style) {
                    var layerPolylines = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: [new ol.Feature(new ol.geom.MultiLineString(pts))]
                        }),
                        style: style
                    });
                    map.addLayer(layerPolylines);
                }

                function drawPolygons(pts, style) {
                    var layerPolygons = new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: [
                                new ol.Feature(new ol.geom.MultiPolygon(pts))
                            ]
                        }),
                        style: style
                    });
                    map.addLayer(layerPolygons);
                }
            }])
})(angular);