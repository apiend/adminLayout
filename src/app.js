/**
 * app.js
 * 入口文档
 *
 * Distributed under terms of the MIT license.
 */
requirejs.config({
    baseUrl: './static/',
    config: {
        es6: {
            resolveModuleSource: function (source) {
                return 'es6!' + source;
            }
        }
    },
    paths: {
        // lib
        "Vue": "js/lib/vue@2.5.17",
        "v@": "js/lib/require-vuejs",
        "vue-router": "js/lib/vue-router@3.0.1",
        "axios": "js/lib/axios@0.18.0.min",
        // "ELEMENT": "lib/element-ui@2.4.9",
        // vali
        "vuelidate": "js/block/vuelidate.min",
        "validators": "js/block/validators.min",
        "MD5":"js/lib/md5.min",

        // --custom
        "common": "common/common",
        "apiConfig":"common/apiConfig",
        "api": "common/api",
        "uRouter": "common/router",
        //custom    

        // es6 module
        es6: 'js/lib/es6',
        babel: 'js/lib/babel-5.8.34.min'
    },
    shim: {
        "Vue": {
            exports: "Vue"
        },
        "vuelidate":{
             deps: ["Vue"]
        },
        "validators":{
             deps: ["Vue", "vuelidate"]
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
// 后台地址
var backURL = "http://192.168.1.185:8086/cloud2.monitor";

// mock url
var mockURL = "https://www.easy-mock.com/mock/5c11f0c44664d341fcc05107/m"

// api back  API请求的前缀
let apihost = (window.location.host.indexOf('loc') > -1) ? mockURL : "/";

require(["Vue", "vue-router", "uRouter", "common", "vuelidate"], function (Vue, VueRouter, uRouter, com, vuelidate) {
    // install plugs 
    Vue.use(VueRouter);
    Vue.use(ELEMENT)
    // ------- install end
 
    Vue.use(vuelidate.default)
    // console.log(vuelidate);

    // Vue.prototype.$vali = validators


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