<template>
  <div>监控 列表</div>
</template>


<script>
define(["Vue", "common", "api"], function(Vue, com, api) {
  "use strict";
    var result = {
        template: template,
        data: function() {
            var time = new Date();
            return {
                loaded: time
            };
        }
    };



    Vue.component("vue-monitor", result);

    return result;

});
</script>


