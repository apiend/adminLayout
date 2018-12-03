<template>
    <div>


        报警 任务中心
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



    Vue.component("vue-task", result);

    return result;

});

</script>
