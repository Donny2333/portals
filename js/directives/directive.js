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

})(angular);