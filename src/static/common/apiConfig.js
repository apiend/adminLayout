define(["Vue","axios"], function(Vue,axios) {
    'use strict';
    // 默认配置参数
    axios.defaults.baseURL = apihost;
 
    const service = axios.create({
        // baseURL: "http://192.168.1.38:8081/cloud2.yn.oms.product", // api的base_url
        // baseURL: apiurl.productService,
        timeout: 5000, // 请求超时时间
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                if (data[it] || data[it] === 0) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                } else {
                    ret += encodeURIComponent(it) + '=' + '&'
                }
            }
            return ret
        }]
    })

    // request拦截器
    service.interceptors.request.use(
        config => {

            // 让每个请求携带自定义token 请根据实际情况自行修改

            return config
        },
        error => {
            // Do something with request error
            console.log(error) // for debug
            Promise.reject(error)
        }
    )

    // response拦截器
    service.interceptors.response.use(
        response => response.data,

        error => {
            console.log('err' + error) // for debug
            
            return Promise.reject(error)
        }
    )


    return service

});