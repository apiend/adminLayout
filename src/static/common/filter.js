/**
 * Vue 常用的一些参数过滤及转换
 */

define(['Vue'], function (Vue) {
    'use strict';
    var WIN = window,
        DOC = document;
    var _filter =!(function(){


        //  注册过滤器 时间过滤器
        Vue.filter('dformat', function (date) {
            // 返回处理后的值

            let time = new Date(date)
            let year = time.getFullYear();
            let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
            let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            let minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            let second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        })

        //  项目 运行状态
          Vue.filter('dStatus', function (status) {
              //  ，1有效，2失效
               return status == 1 ? "有效" : "失效"
          })
         
          // 项目 操作状态
          Vue.filter('dOpenStatus', function (status) {
              //  ，1有效，2失效
              return  status ==1 ? "开启":"关闭"
          })




    })()
    

    return _filter

});