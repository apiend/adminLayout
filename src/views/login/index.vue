<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">云数据监控平台</h3>
          <div class="box is-half">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="txt"
                  v-model.trim="$v.username.$model"
                  placeholder="请输入帐号"
                  autofocus
                >
              </div>
            </div>
            <!-- <pre>{{ $v }}</pre> -->
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="password"
                  v-model="$v.password.$model"
                  placeholder="请输入密码"
                >
              </div>
            </div>

            <!-- <div class="field">
                   <div class="control">
                     <input class="input" type="txt" v-model="captcha" placeholder="请输入验证码">
                    </div>
            </div>-->
            <button class="button is-block is-info is-large is-fullwidth" @click="doLogin">登录</button>
          </div>

          <p class="has-text-grey">Copyright © 2018 深圳市太和物联信息技术有限公司</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
define(["Vue", "api", "validators", "common","MD5"], function(Vue, api, vali, com,MD5) {
  "use strict";
  //简易版校验
  const required = vali.required;
  const minLength = vali.minLength;

  var that;
  // --
  var result = {
    template: template,
    data: function() {
      var time = new Date();
      return {
        loaded: time,
        username: "",
        password: "",
        captcha: ""
      };
    },
    validations: {
      username: {
        required
      },
      password: {
        required
      }
    },
    mounted() {
      // console.log('mounted');
      console.log(this.$route);
      that = this;
    },
    methods: {
      /**
       * 有input 的时候,注意验证用户输入的东西
       */
      vali() {
        console.log("invalid");
        return this.$v.$invalid;
      },

      /**
       * 登录
       */
      doLogin() {

       
        // 验证数据
        if (this.vali()) {
          this.$message.error("请输入用户名与密码");
          return false;
        }

        let obj = {
          userName: this.username,
          passWord: MD5(this.password)
        };
        // this.$v.$touch();
        // console.log(this);

        api.doLogin(obj).then(function(res) {
          if (res.code == 200) {
        
            // 登录数据存储
            com.storeValue("authInfo", JSON.stringify(res.data), "session");

            console.log('登录成功');
            // 登录成功 redirect
            // that.$router.push({ path: that.$route.query.redirect });
            // that.$router.push({ path:"/" })
            // 增加了权限控制跳转有问题

            window.location.reload();

            
          } else {
            that.$message.error(res.msg);
          }
          // console.log(res);
        });
        // console.log('dologin');
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
