<template>
    <mu-container>
        <mu-button @click="show1 = !show1">Click Me</mu-button>
        <mu-flex class="mu-transition-row">
            <mu-fade-transition>
            <div class="mu-transition-box mu-primary-color mu-inverse" v-show="show1">mu-fade-transition</div>
            </mu-fade-transition>
        </mu-flex>



        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
            <mu-form-item label="用户名" help-text="帮助文字" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password" :rules="passwordRules">
                <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="isAgree" :rules="argeeRules">
            <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
            </mu-form-item>
            <mu-form-item>
            <mu-button color="primary" @click="submit">提交</mu-button>
            <mu-button @click="clear">重置</mu-button>
            </mu-form-item>
        </mu-form>
    </mu-container>
</template>

<script>
define(["Vue"], function(Vue) {
  return Vue.component("vue-ele", {
    //component:[],
    template: template,
    data: function() {
      return {
        show1: true,
        visible: false,
        form: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        usernameRules: [
          { validate: val => !!val, message: "必须填写用户名" },
          { validate: val => val.length >= 3, message: "用户名长度大于3" }
        ],
        passwordRules: [
          { validate: val => !!val, message: "必须填写密码" },
          {
            validate: val => val.length >= 3 && val.length <= 10,
            message: "密码长度大于3小于10"
          }
        ],
        argeeRules: [{ validate: val => !!val, message: "必须同意用户协议" }],
        validateForm: {
          username: "",
          password: "",
          isAgree: false
        }
      };
    },
    mounted: function() {},
    methods: {
      submit() {
        this.$refs.form.validate().then(result => {
          console.log("form valid: ", result);
        });
      },
      clear() {
        this.$refs.form.clear();
        this.validateForm = {
          username: "",
          password: "",
          isAgree: false
        };
      }
    }
  });
});
</script>
<style>
.mu-transition-row {
  margin-top: 16px;
  height: 100px;
}
.mu-transition-box {
  min-width: 200px;
  height: 100px;
  margin-right: 16px;
  border-radius: 4px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>