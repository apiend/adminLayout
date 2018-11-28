/* global requirejs, require */
/**
 * app.js
 *
 * Distributed under terms of the MIT license.
 */

requirejs.config({
    baseUrl: 'static/js/',
    paths: {
        "Vue": "lib/vue@2.5.17",
        "v@": "lib/require-vuejs",
        "vue-router": "lib/vue-router@3.0.1",
        // "ELEMENT": "lib/element-ui@2.4.9",
  
        "common": "common/common"
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

// require(["lib/element-ui@2.4.9"], function (ele) {
//     console.log(ele);
// })

require(["Vue", "vue-router", "common" ], function (Vue, VueRouter, com) {
    Vue.use(VueRouter);
    console.log(ELEMENT);
    Vue.use(ELEMENT)
    // ele.install(Vue)

    // console.log(MuseUI);
    // Vue.use(MuseUI)

    console.log(com);
   

    var asyncComp = function (componentName) {
        return function (resolve) {
            require([componentName], resolve);
        };
    };

    var router = new VueRouter({
        routes: [{
                path: "",
                redirect: "/home"
            },
            {
                path: "/home",
                component: asyncComp("v@!../../views/home/index")
            },
            {
                path: "/inner",
                component: asyncComp("v@!../../components/inner_template")
            },
            {
                path: "/html",
                component: asyncComp("v@!../../components/component.html")
            },
            {
                path: "/vue",
                component: asyncComp("v@!../../components/component")
            },
            {
                path: "/async",
                component: asyncComp("v@!../../components/async")
            },
            {
                path: "/ele",
                component: asyncComp("v@!../../components/ele")
            },
            {
                path: "/eleFrom",
                component: asyncComp("v@!../../components/eleFrom")
            },
            {
                path: "/mu",
                component: asyncComp("v@!../../components/mu")
            },
        ]
    });

    // 初始化
    new Vue({
        data: {
        started: new Date()
        },
        router: router,
        // el: "#app"
    }).$mount('#app');


});