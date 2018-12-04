define("common", ["Vue","axios","api", "../static/common/util"], function (Vue, axios,api,util) {
    'use strict';

    console.log(util);
 
    console.log('common' + new Date().getTime());

    // 常用模块
    
    var asyncComp = function (componentName) {
        return function (resolve) {
            require([componentName], resolve);
        };
    };




    var common ={
        version: "1.0.0",
        dForm: asyncComp("v@!../static/components/dioui/from/from"),
        dTable: asyncComp("v@!../static/components/dioui/table/table")

    }

    console.log(api);
    return common;
});

 