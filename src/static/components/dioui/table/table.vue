<template>
  <div class="container">测试table {{loaded}}</div>
</template>

<script>
define(["require", "Vue"], function(require, Vue) {
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
    }
  };
  Vue.component("vue-table", result);

  return result;
});
</script>

