/**
 * API 请求接口的配置
 * 
 */
define('api', ["apiConfig"], function (service) {
    //Put traditional CommonJS module content here
    
      
    // console.log(service);

    var api = {
        version:"0.0.1",
        doLogin:function(data){
            return service({
                url:"/app/login.do",
                 method: 'post',
                data: data
            })
        }
    } 


    // module.exports api
    return api
});