
/**
 * app.js
 * 入口文档
 *
 * Distributed under terms of the MIT license.
 */
requirejs.config({
    baseUrl: 'static/',
    paths: {
        // lib
        "Vue": "js/lib/vue@2.5.17",
        "v@": "js/lib/require-vuejs",
        "vue-router": "js/lib/vue-router@3.0.1",
        // "ELEMENT": "lib/element-ui@2.4.9",

        // --custom
        "common": "common/common",
        "api":"common/api",
        "uRouter":"common/router"
        //custom 
    },
    shim: {
        "Vue": {
            "exports": "Vue"
        }
        // "ElementUI":{
        //     deps: ['Vue'],
        //     // exports: 'ELEMENT'
        // }
    }
});



require(["Vue", "vue-router","uRouter","common"], function (Vue, VueRouter,uRouter, com) {
    // install plugs 
    Vue.use(VueRouter);
    Vue.use(ELEMENT)
    // ------- install end

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