<template>
  <div class="container">测试table {{loaded}}</div>
</template>

<script>
define(["require", "Vue","common"], function(require, Vue,com) {
  "use strict";
    var result = {
    template: template,
    props: {
      title: {
        type: String,
        default: "tabele测式类"
      }
    },
    data: function() {
      var time = new Date();
      return {
        loaded: time
      };
    },
    mounted(){
      console.log('vue-table');

      com.util.BusEmit('vue-form','busshow','name')

    }
  };
  Vue.component("vue-table", result);

  return result;
});
</script>

