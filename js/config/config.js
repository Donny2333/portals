/**
 * Created by Donny on 17/4/26.
 */
(function () {
    "use strict";

    var prodURL = 'http://172.30.1.246',
        devURL = 'http://192.168.250.44',
        Urls = {
            Prod_Cfg: {
                api: prodURL + ':9527/',
                img: prodURL + ':9528/',
                temp: prodURL + ':9528/RootData/TempData/'
            },
            Dev_Cfg: {
                api: devURL + ':9527/',
                img: devURL + ':9528/',
                temp: devURL + ':9528/RootData/TempData/'
            }
        };

    angular.module('portals.config', [])

        .constant('URL_CFG', Urls.Dev_Cfg)

        .constant('APP_VERSION', {
            DEV: '1.0.0',
            RELEASE: '1.0.0'
        })

})();