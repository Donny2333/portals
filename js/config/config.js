/**
 * Created by Donny on 17/4/26.
 */
(function () {
    "use strict";

    var prodURL = 'https://**.***.com/',
        devURL = 'http://172.30.1.246:9527/',
        Urls = {
            Prod_Cfg: {
                api: prodURL + 'MapService.svc/',
                img: prodURL,
                rar: prodURL
            },
            Dev_Cfg: {
                api: devURL + 'MapService.svc/',
                img: 'http://172.30.1.246:9528/',
                rar: 'http://172.30.1.246:9527/'
            }
        };

    angular.module('portals.config', [])

        .constant('URL_CFG', Urls.Dev_Cfg)

        .constant('APP_VERSION', {
            DEV: '1.0.0',
            RELEASE: '1.0.0'
        })

})();