/**
 * API 请求接口的配置
 * 
 */
define('api', ["apiConfig"], function (service) {
    //Put traditional CommonJS module content here


    // console.log(service);

    var api = {
        version: "0.0.2",
        /**
         * 登录
         */
        doLogin: function (data) {
            return service({
                url: "/loginController/login.do",
                method: 'post',
                data: data
            })
        },
        /**
         * 修改密码
         *  oldPwd true string 旧密码
            newPwd true string 新密码
         */
        updatePassword: function (data) {
            return service({
                url: "/loginController/updatePassword.do",
                method: 'post',
                data: data
            })
        },

        /**
         * @param name false string 用户姓名
         * 
         */
        queryUserInfoList: function (data) {
            return service({
                url: "/userInfo/queryUserInfoList.do",
                method: 'post',
                data: data
            })
        },


        /**  新增用户接口
         *  name false string 用户姓名
            coed true string 账号
            phone false string 手机号
            wxNo false string 微信号
            pwd true string 密码
         */
        saveUserinfo: function (data) {
            return service({
                url: "/userInfo/saveUserinfo.do",
                method: 'post',
                data: data
            })
        },
        /**
         * 修改用户接口
         *  id true number 用户主键
            name false string 用户姓名
            coed true string 账号
            phone false string 手机号
            wxNo false string 微信号
            pwd true string 密码
         */
        updateUserInfo: function (data) {
            return service({
                url: "/userInfo/updateUserInfo.do",
                method: 'post',
                data: data
            })
        },
        /**
         * 删除用户接口
         * id true number 用户id
         */
        deleteUserInfo: function (data) {
            return service({
                url: "/userInfo/deleteUserInfo.do",
                method: 'post',
                data: data
            })
        },
        // TODO: 项目管理接口
        /**
         * 项目查询接口
         * proName false string 项目名， 可模糊
         * 
         */
        queryProInfoList: function (data) {
            return service({
                url: "/projectInfo/queryProInfoList.do",
                method: 'post',
                data: data
            })
        },

        /**
         * 新增项目接口
         * proName false string 项目名称
           proUrl false string 项目地址
         * @param {*} data 
         */

        saveProInfo: function (data) {
            return service({
                url: "/projectInfo/saveProInfo.do",
                method: 'post',
                data: data
            })
        },

        /**
         * 
         * 编辑项目接口
         *    proId true number 项目编号
              proName false string 项目名称
              proUrl false string 项目地址
         * 
         */
        updateProInfo: function (data) {
            return service({
                url: "/projectInfo/updateProInfo.do",
                method: 'post',
                data: data
            })
        },

        /**
         * 删除项目
         * 
         * proId true number 项目编号
         */
        deleteProInfo: function (data) {
            return service({
                url: "/projectInfo/deleteProInfo.do",
                method: 'post',
                data: data
            })
        },

        /**
         * 改变项目的状态
         * 
         * proId true number 项目编号
         * operateStatus true number 1开启 或   0关闭
         */
        changeProStatus: function (data) {
            return service({
                url: "/projectInfo/operation.do",
                method: 'post',
                data: data
            })
        },

        /**
         * 所有项目下拉列表接口
         */
        queryListForSlect: function (data) {
            return service({
                url: "projectInfo/queryListForSlect.do",
                method: 'post',
                data: data

            })
        },


        // TODO: dataSource 数据源的管理

        /**
         *  查询数据源
         * 
         * dataSrcName false string 数据源名称
         */
        queryDataSrcList: function (data) {
            return service({
                url: "/dataSource/queryDataSrcList.do",
                method: 'post',
                data: data
            })
        },

        /**
         * 保存数据源
         * 
         *    comId true number 归属项目编号
              dataSrcType true number 数据源类型
              dataSrcName false string 数据源名称
              dataSrcUrl false string 数据源地址
              dataSrcUsername false string 用户名
              dataSrcPwd false string 密码
              remark false string 备注
         * 
         */
        saveDataSrc: function (data) {
            return service({
                url: "/dataSource/saveDataSrc.do",
                method: 'post',
                data: data
            })
        },
        /**
         * 数据源管理 - 编辑操作
         * 
         *    dataSrcId true number 数据源序列号
              comId true number 归属项目编号
              dataSrcType true number 数据源类型
              dataSrcName false string 数据源名称
              dataSrcUrl false string 数据源地址
              dataSrcUsername false string 用户名
              dataSrcPwd false string 密码
              remark false string 备注
         * 
         */
        updateDataSrc: function (data) {
            return service({
                url: "/dataSource/saveDataSrc.do",
                method: 'post',
                data: data
            })
        },
        /**
         * 删除 
         */
        deleteDataSrc: function (data) {
            return service({
                url: "/dataSource/deleteDataSrc.do",
                method: 'post',
                data: data
            })
        }




    }


    // module.exports api
    return api
});