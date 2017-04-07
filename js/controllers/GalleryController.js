/**
 * Created by Donny on 17/4/5.
 */
(function (angular) {
    'use strict';

    angular.module('portals.controllers')
        .controller('GalleryController', ['$scope', function ($scope) {
            $scope.vm = {
                title: '资源',
                sections: [
                    {
                        id: 0,
                        name: '分类1'
                    }, {
                        id: 1,
                        name: '分类2'
                    }, {
                        id: 2,
                        name: '分类3'
                    }, {
                        id: 3,
                        name: '分类4'
                    }, {
                        id: 4,
                        name: '分类5'
                    }],
                selected: 0,
                options: [{
                    id: 0,
                    value: ''
                }],
                display: 0,
                gallery: [
                    {
                        id: 0,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map1.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 1,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map2.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 2,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map3.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 3,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map4.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 4,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map5.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 5,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map6.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 6,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map7.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 7,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map8.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 8,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map9.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 9,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map10.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 10,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map11.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }, {
                        id: 11,
                        title: 'Mid-Century Map',
                        author: 'Web Map',
                        img: '../images/map12.jpg',
                        description: "this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing.this is this is this some thing."
                    }],
                expand: false
            };
        }]);
})(angular);