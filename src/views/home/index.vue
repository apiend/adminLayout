<template>
  <div class="container">
    <div class="notification">
      This container is
      <strong>centered</strong> on desktop.
    </div>
  </div>
</template>


<script>
 var name = "diogoxiang"
 

define(["Vue"], function(Vue) {
  "use strict";
 
  return Vue.component("v-home", {
    template: template,
    data: function() {
      return {
        now: new Date()
      };
    },
    mounted: function() {
      this.refresh();
      console.log(name);
    },
    methods: {
      refresh: function() {
        this.now = new Date();
        setTimeout(this.refresh, 2000);
      }
    }
  });
  
});
</script>