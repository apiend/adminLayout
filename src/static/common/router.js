/**
 * 主要的路由 跳转配置
 * 
 */
 define('uRouter', ["Vue", "vue-router"], function (Vue, VueRouter) {
     'use strict';
     var asyncComp = function (componentName) {
         return function (resolve) {
             require([componentName], resolve);
         };
     };

     var routers = new VueRouter({
         routes: [{
                 path: "",
                 redirect: "/home"
             },
             {
                 path: "/home",
                 component: asyncComp("v@!../views/home/index")
             },
             {
                 path: "/inner",
                 component: asyncComp("v@!../components/inner_template")
             },
             {
                 path: "/html",
                 component: asyncComp("v@!../components/component.html")
             },
             {
                 path: "/vue",
                 component: asyncComp("v@!../components/component")
             },
             {
                 path: "/async",
                 component: asyncComp("v@!../components/async")
             },
             {
                 path: "/ele",
                 component: asyncComp("v@!../components/ele")
             },
             {
                 path: "/eleFrom",
                 component: asyncComp("v@!../components/eleFrom")
             }
         ]
     });


     return  routers
 });

