<template>  
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                     <h3 class="title has-text-grey">云数据监控平台</h3>
                     <div class="box is-half">

                            <div class="field">
                                <div class="control">
                                    <input class="input" type="txt" v-model="username"  placeholder="请输入帐号" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input" type="password" v-model="password" placeholder="请输入密码">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input" type="txt" v-model="captcha" placeholder="请输入验证码">
                                </div>
                            </div>
                            
                            <button class="button is-block is-info is-large is-fullwidth" @click="doLogin">登录</button>
                     
                    </div>

                    <p class="has-text-grey">
                        Copyright © 2018 深圳市太和物联信息技术有限公司 
                    </p>
                </div>
            </div>
        </div>
    </section>   
</template>

<script>
 
define(['Vue'], function(Vue) {
    'use strict';

     var result = {
        template: template,
        data: function() {
            var time = new Date();
            return {
                loaded: time,
                username:"",
                password:"",
                captcha:""
            };
        },
        mounted () {
            console.log('mounted');

        },
        methods: {
            /**
             * 登录
             */
            doLogin(){
                console.log('dologin');
            }
        }
    };

    // vue-login
    Vue.component("vue-login", result);

    return result;
});

</script>



<style>
 /* 这里只写这个模块所用的 css */
</style>
