<template>
    <div>
        404 未找到当前页面
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
 

    Vue.component("vue-404", result);

    return result;

});
</script>

