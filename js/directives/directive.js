/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('portals.directives', [])
        .directive('myChart', function () {
            return {
                restrict: 'E',
                template: '<div ng-style="userStyle"></div>',
                replace: true,
                scope: {
                    data: '=',
                    userStyle: '='
                },
                link: function (scope, element, attrs) {
                    // 基于准备好的dom，初始化echarts实例
                    var myChat = echarts.init(element[0]);

                    // 使用刚指定的配置项和数据显示图表
                    myChat.setOption(scope.data);

                    //监听DOM元素
                    scope.$watch('data', function (value) {
                        if (value.series) {
                            // console.log(value);
                            myChat.setOption(scope.data);
                        }
                    });

                    scope.$watch('userStyle', function (value) {
                        if (value) {
                            // console.log(valu  e);
                            myChat.resize();
                        }
                    })
                }
            };
        })

        .directive('flipBook', ['$parse', function ($parse) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: './tpls/flipbook.html',
                link: function (scope, element, attrs) {
                    var pages = $parse(attrs.pages)(scope);
                    var flipbook = $('#flipbook');

                    flipbook.turn({
                        width: 800,
                        height: 600,
                        when: {
                            turned: function (e, page, pageObj) {
                                console.log(page);
                            }
                        }
                    });

                    scope.$watch(function () {
                        return $parse(attrs.pages)(scope);
                    }, function (value) {
                        if (value && value.length) {
                            var i = 1;
                            flipbook.turn("addPage",
                                $("<div class='first-page'> \
                                        <div class='flip-name'> \
                                        老河口地理国情图集 \
                                        <div>(2016)</div> \
                                    </div> \
                                        <div class='flip-company'>湖北地信科技集团股份有限公司</div> \
                                    </div>"),
                                i++
                            );

                            value.map(function (page, index) {
                                flipbook.turn("addPage",
                                    $("<div class='left'/>").css('background-image', "url('" + page.picPath + "')"),
                                    i++
                                );

                                flipbook.turn("addPage",
                                    $("<div class='right'/>").css('background-image', "url('" + page.picPath + "')"),
                                    i++
                                );
                            });

                            flipbook.turn("addPage",
                                $("<div class='last-page'/>"),
                                i++
                            );
                        }
                    })
                }
            }
        }])

        .directive('jsXls', ['$parse', function ($parse) {
            return {
                restrict: 'E',
                template: '<input type="file" />',
                replace: true,
                link: function (scope, element, attrs) {

                    function handleSelect() {
                        var files = this.files;
                        for (var i = 0, f = files[i]; i !== files.length; ++i) {
                            var reader = new FileReader();
                            var name = f.name;
                            var data = null;
                            reader.onload = function (e) {
                                if (!e) {
                                    data = reader.content;
                                } else {
                                    data = e.target.result;
                                }

                                /* if binary string, read with type 'binary' */
                                try {
                                    var workbook = XLS.read(data, {type: 'binary'});

                                    scope.$apply(function () {
                                        scope[attrs.name] = name;
                                    });

                                    if (attrs.onread) {
                                        var handleRead = scope[attrs.onread];
                                        if (typeof handleRead === "function") {
                                            handleRead(workbook);
                                        }
                                    }
                                } catch (e) {
                                    if (attrs.onerror) {
                                        var handleError = scope[attrs.onerror];
                                        if (typeof handleError === "function") {
                                            handleError(e);
                                        }
                                    }
                                }

                                // Clear input file
                                element.val('');
                            };

                            //extend FileReader
                            if (!FileReader.prototype.readAsBinaryString) {
                                FileReader.prototype.readAsBinaryString = function (fileData) {
                                    var binary = "";
                                    var pt = this;
                                    var reader = new FileReader();
                                    reader.onload = function (e) {
                                        var bytes = new Uint8Array(reader.result);
                                        var length = bytes.byteLength;
                                        for (var i = 0; i < length; i++) {
                                            binary += String.fromCharCode(bytes[i]);
                                        }
                                        //pt.result  - readonly so assign binary
                                        pt.content = binary;
                                        $(pt).trigger('onload');
                                    };
                                    reader.readAsArrayBuffer(fileData);
                                }
                            }

                            reader.readAsBinaryString(f);
                        }
                    }

                    element.on('change', handleSelect);
                }
            };
        }])

        .directive('mask', ['$compile', function ($compile) {
            return {
                restrict: 'E',
                transclude: true,
                // replace: true,
                controller: 'MaskController',
                templateUrl: 'tpls/mask/mask.html',
                link: function (scope, element, attrs) {
                    var mask;
                    var childScope;
                    scope.$watch('vm', function (value) {
                        if (value) {
                            if (value.showMask) {
                                // append child dynamically.
                                mask = element.children('#mask');
                                mask.html('');
                                childScope = scope.$new();
                                scope.vm.overlay = value.overlay;
                                mask.append($compile(value.template)(childScope));
                            } else {
                                // remove child.
                                mask = element.children('#mask');
                                mask.empty();
                                if (childScope) {
                                    childScope.$destroy();
                                }
                            }
                        }
                    });
                }
            }
        }])

        .directive('geoPanel', function () {
            return {
                restrict: 'E',
                require: '^mask',
                replace: true,
                templateUrl: 'tpls/mask/geoPanel.html',
                controller: 'GeoPanelController'
            }
        })

        .directive('themePanel', function () {
            return {
                restrict: 'E',
                require: '^mask',
                replace: true,
                templateUrl: 'tpls/mask/themePanel.html',
                controller: 'ThemePanelController'
            }
        })

        .directive('queryPanel', function () {
            return {
                restrict: 'E',
                require: '^mask',
                replace: true,
                templateUrl: 'tpls/mask/queryPanel.html',
                controller: 'QueryPanelController'
            }
        })

})(angular);