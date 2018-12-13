<template>
    <div>

        用户中心 及 权限  中心
    </div>


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
 

    Vue.component("vue-ucenter", result);

    return result;

});
</script>
