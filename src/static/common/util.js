define('util', function() {
    'use strict';
    
    console.log('util'+ new Date().getTime());
    let util ={
        init:function(){
            console.log('util.init');
        }
    }
    

    return util
});