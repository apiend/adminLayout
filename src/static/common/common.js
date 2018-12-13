define("common", ["Vue", "axios", "api", "../static/common/util"], function (Vue, axios, api, util) {
    'use strict';
    var WIN = window,
        DOC = document;

    console.log(util);

    console.log('common' + new Date().getTime());

    // 常用模块

    var asyncComp = function (componentName) {
        return function (resolve) {
            require([componentName], resolve);
        };
    };

    var HOST = {
        prefix: "_monitor_"
    }



    var common = {
        version: "1.0.0",
        util: util,
        // 引入公用小模块
        dForm: asyncComp("v@!../static/components/dioui/from/from"),
        dTable: asyncComp("v@!../static/components/dioui/table/table"),
        // ---
        storeValue: storeValue,
        getValue: getValue,
        deleteValue: deleteValue,

    }




    /**
     * 设置cookie
     *
     * @param {any} c_name
     * @param {any} value
     * @param {any} expiredays
     */
    function setCookie(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        DOC.cookie = c_name + "=" + decodeURI(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    }

    /**
     * 获取cookie
     *
     * @param {any} cookieName
     * @returns
     */
    function getCookie(cookieName) {
        var start = DOC.cookie.indexOf(cookieName + "=");
        if (start == -1) {
            return "";
        }
        start = start + cookieName.length + 1;
        var end = DOC.cookie.indexOf(";", start);
        if (end == -1) {
            end = DOC.cookie.length;
        }
        return decodeURIComponent(DOC.cookie.substring(start, end));
    }

    /**
     * 存储键值对
     *
     * @param {any} key
     * @param {any} value
     * @param {string} [type="url"]
     * @param {string} [expiredays=""]
     * @returns
     */
    function storeValue(key, value, type = "url", expiredays = "") {
        switch (type) {
            case "url":
                return "&" + encodeURIComponent(key) + "=" + encodeURIComponent(value);
            case "local":
                window.localStorage && localStorage.setItem(HOST.prefix + key, value);
                break;
            case "session":
                window.sessionStorage && sessionStorage.setItem(HOST.prefix + key, value);
                break;
            case "cookie":
                setCookie(HOST.prefix + key, value, expiredays);
                break;

        }
    };

    /**
     * 提取值
     * 默认是从URL中提取  
     * @param {any} key
     * @param {string} [type="url"]
     * @returns
     */
    function getValue(key, type = "url") {
        switch (type) {
            case "url":
                return getParamValue(key);
                break;
            case "local":
                return localStorage.getItem(HOST.prefix + key);
                break;
            case "session":
                return sessionStorage.getItem(HOST.prefix + key);
                break;
            case "cookie":
                return getCookie(HOST.prefix + key);
                break;
        }
    };

    /**
     * 删除 localStorage cookie 与 sessionStorage 中的值
     *
     * @param {any} key
     * @param {any} type
     * @returns
     */
    function deleteValue(key, type) {
        var type = type || "all";
        if (!key) {
            localStorage.clear();
            sessionStorage.clear();
            return;
        }
        switch (type) {
            case "all":
                localStorage.removeItem(HOST.prefix + key);
                sessionStorage.removeItem(HOST.prefix + key);
                setCookie(HOST.prefix + key, "", -1);
                break;
            case "local":
                localStorage.removeItem(HOST.prefix + key);
                break;
            case "session":
                sessionStorage.removeItem(HOST.prefix + key);
                break;
            case "cookie":
                setCookie(HOST.prefix + key, "", -1);
                break;
        }
    };

    /**
     * url中提取值辅助函数
     *
     * @returns
     */
    function getUrlparams() {
        var src = window.location.search,
            arr = src.substr(1, src.length - 1).split("&"),
            returnObj = {};
        if (arr !== null) {
            for (var i = 0, l = arr.length; i < l; i++) {
                var value = arr[i].split("=");
                if (value && value.length > 1) {
                    returnObj[decodeURIComponent(value[0])] = decodeURIComponent(value[1])
                }
            }
        }
        return returnObj;
    };
    /**
     * url中提取值
     *
     * @param {any} name
     * @returns
     */
    function getParamValue(name) {
        var param = getUrlparams();
        if (param[name]) {
            return param[name];
        }
        return null;
    }



    /**
     * 转换obj类型
     *
     * @param {any} obj
     * @returns
     */
    function type(obj) {
        var t;
        if (obj == null) {
            t = String(obj);
        } else {
            t = Object.prototype.toString.call(obj).toLowerCase();
            t = t.substring(8, t.length - 1);
        }
        return t;
    }




    console.log(api);
    return common;
});