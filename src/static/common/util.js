define(["require", "Vue"], function (require,Vue) {
    'use strict';   
    
    // 同级组件的通讯 简单通讯
    const Bus = new Vue()
 
    let util ={
         BusEmit: function (component, action, param){
             Bus.$emit(component, action, param)
         },
         BusOn: {
             mounted() {
                 Bus.$on(`${this.$options.name}`, this.onBusAction)
             },
             beforeDestroy() {
                 Bus.$off(`${this.$options.name}`, this.onBusAction)
             },
             methods: { 
                 onBusAction(action, param) {
                     console.log(`调用组件：${this.$options.name},方法：${action},参数：${param}`)
                     this[action](param)
                 }
             }
         }
    }

    
    

    return util
});


// define([
//     'require', 
// ], function(require) {
//     'use strict';
//     console.log(require);
// });

// define(function (require, exports, module) {
//     // var a = require('a'),
//     //     b = require('b');
//     // let name = "name"
//     // //Return the module value
  
//     // return name;
// });