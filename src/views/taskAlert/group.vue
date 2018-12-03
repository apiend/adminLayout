<template>
    <div>


        报警 群组中心
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



    Vue.component("vue-group", result);

    return result;

});

</script>
