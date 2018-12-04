<template>
  <div class="form">{{title}}</div>
</template>

<script>
define(["Vue","common"], function(Vue,com) {
    console.log(com);
  var result = {
    template: template,
    mixins:[com.util.BusOn],
    props: {
      title: {
        type: String,
        default: "Form测式类"
      }
    },
    data: function() {
      var time = new Date();
      return {
        loaded: time
      };
    },
    methods:{
        busshow:function(str){
            console.log(str);
        }
    }
  };
  Vue.component("vue-form", result);

  return result;
});
</script>

