<template>
  <div class="hero is-fullheight">
    <el-container>
      <el-aside width="220px">
        <!-- 左侧导航模块 -->
        <aside class="menu">
          <!-- <p class="menu-label">Transactions</p> -->
          <div class="aside_logo">
             云数据监控平台
          </div>
          <ul class="menu-list">
            <li>
              <a class="is-active">项目管理</a>
            </li>
           <li>
              <a>数据源管理</a>
            </li>
            <li>
              <a>监控列表</a>
            </li>
            <li>
              <a >报警服务</a>
              <ul>
                <li><a>报警日志</a></li>
                <li><a>报警群组</a></li>
              </ul>
            </li>
            <li>
              <a>权限管理</a>
            </li>
          </ul>
        </aside>
      </el-aside>
      <el-container>
        <el-header>头部</el-header>
        <el-main>
            <transition name="component-fade" mode="out-in">
              <keep-alive>
                  <router-view></router-view>
              </keep-alive>
            </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
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