<template>
    <div>
     <el-button :plain="true" @click="open">打开消息提示</el-button>

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
        form: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        }
      };
    },
    mounted: function() {},
    methods: {
      open() {
        // this.$message('这是一条消息提示');
          this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },

      openVn() {
        const h = this.$createElement;
        this.$message({
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ])
        });
      }
    }
  });
});
</script>