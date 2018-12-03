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
            //  项目管理中心
            {
                path: "/home",
                component: asyncComp("v@!../views/layout/layout"),
                redirect: '/home/index',
                children: [{
                    path: 'index',
                    name: 'homeIndex',
                    component: asyncComp("v@!../views/home/index")
                }]
            },
            //  数据源管理中心
            {
                path: "/origin",
                component: asyncComp("v@!../views/layout/layout"),
                redirect: '/origin/index',
                children: [{
                    path: 'index',
                    name: 'originIndex',
                    component: asyncComp("v@!../views/origin/index")
                }]
            },
            //  监控中心
            {
                path: "/monitor",
                component: asyncComp("v@!../views/layout/layout"),
                redirect: '/monitor/index',
                children: [{
                    path: 'index',
                    name: 'monitorIndex',
                    component: asyncComp("v@!../views/monitor/index")
                }]
            },
            //   报警任务中心
            {
                path: "/taskAlert",
                component: asyncComp("v@!../views/layout/layout"),
                redirect: '/taskAlert/index',
                children: [{
                        path: 'index',
                        name: 'taskAlertIndex',
                        component: asyncComp("v@!../views/taskAlert/index")
                    },
                    {
                        path: 'group',
                        name: 'taskAlertGroup',
                        component: asyncComp("v@!../views/taskAlert/group")
                    }
                ]
            },
            //   权限管理中心
            {
                path: "/ucenter",
                component: asyncComp("v@!../views/layout/layout"),
                redirect: '/ucenter/index',
                children: [{
                    path: 'index',
                    name: 'ucenterIndex',
                    component: asyncComp("v@!../views/ucenter/index")
                }]
            },
            // login   
            {
                path: "/login",
                component: asyncComp("v@!../views/login/index")
            },
            // public
            {
                path: "*",
                component: asyncComp("v@!../views/layout/404")
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


    return routers
});