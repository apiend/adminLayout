/**
 * app.js
 * 入口文档
 *
 * Distributed under terms of the MIT license.
 */
requirejs.config({
    baseUrl: './static/',
    paths: {
        // lib
        "Vue": "js/lib/vue@2.5.17",
        "v@": "js/lib/require-vuejs",
        "vue-router": "js/lib/vue-router@3.0.1",
        "axios": "js/lib/axios@0.18.0.min",
        // "ELEMENT": "lib/element-ui@2.4.9",

        // --custom
        "common": "common/common",
        "apiConfig":"common/apiConfig",
        "api": "common/api",
        "uRouter": "common/router"
        //custom 
    },
    shim: {
        "Vue": {
            exports: "Vue"
        },
        "axios":{
            deps:["Vue"]
        },
         "common":{
            deps: ["axios","api"]
         },
        "api":{
            deps: ["axios","apiConfig"]
        },
        // 调整主要的载入顺序
        "vue-router": {
            deps: ["v@"]
        },
        "uRouter":{
            deps: ["vue-router"]
        }
        // "ElementUI":{
        //     deps: ['Vue'],
        //     // exports: 'ELEMENT'
        // }
    }
});

// api back 
let apihost = (window.location.host.indexOf('localhost') > -1) ? "http://192.168.1.5" : "/";

require(["Vue", "vue-router", "uRouter", "common"], function (Vue, VueRouter, uRouter, com) {
    // install plugs 
    Vue.use(VueRouter);
    Vue.use(ELEMENT)
    // ------- install end
 
    console.log('app' + new Date().getTime());

    console.log(com);
    console.log(uRouter);
    // 初始化
    var tvue = new Vue({
        data: {
            started: new Date()
        },
        router: uRouter,
        // el: "#app"
    }).$mount('#app');


    //挂载到 WINDOWS
    window.tvue = tvue

});