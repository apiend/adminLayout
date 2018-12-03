define(function(require) {
    'use strict';
    
    
    console.log('util'+ new Date().getTime());
    let util ={
        init:function(){
            console.log('util.init');
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