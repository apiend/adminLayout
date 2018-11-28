<template>
    <div>
     <el-button :plain="true" @click="open">打开消息提示</el-button>
     <el-input v-model="input" placeholder="请输入内容"></el-input>

      <el-time-select
        v-model="value1"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        placeholder="选择时间">
      </el-time-select>

      
 
    </div>
</template>
<script>
define(["Vue"], function(Vue) {
  return Vue.component("vue-ele", {
    //component:[],
    template: template,
    data: function() {
      return {
        visible: false,
        input: "",
        value1: "",
        formInline: {
          user: "",
          region: ""
        } 
      };
    },
    mounted: function() {
      
    },
    methods: {
      open() {
        // this.$message('这是一条消息提示');
        this.$alert("这是一段内容", "标题名称", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
      },
      onSubmit() {
        console.log("submit!");
      },

      openVn() {
        const h = this.$createElement;
        this.$message({
          message: h("p", null, [
            h("span", null, "内容可以是 "),
            h("i", { style: "color: teal" }, "VNode")
          ])
        });
      }
    }
  });
});
</script>