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
            
           <router-link tag="li" active-class="is-active" to="/home" ><a>项目管理</a></router-link>
           <router-link tag="li" active-class="is-active" to="/origin"><a>数据源管理</a></router-link>
           <router-link tag="li" active-class="is-active" to="/monitor"><a>监控列表</a></router-link>
   
           
            <li>
              <a  @click="doExtend('isShowChild01')">报警服务<i class="pull-right"   v-bind:class="{'el-icon-plus': !isShowChild01, 'el-icon-minus':isShowChild01 }"></i></a>
              <ul v-if="isShowChild01">
                <li @click="goPath('/taskAlert/index')"><a>报警日志</a></li>
                <!-- <router-link tag="li" active-class="is-active" to="/taskAlert/index"><a>报警日志</a></router-link> -->
                <li @click="goPath('/taskAlert/group')"><a>报警群组</a></li>
                 <!-- <router-link tag="li" active-class="is-active" to="/taskAlert/group"><a>报警群组</a></router-link> -->
              </ul>
            </li>
            <li >
              <a @click="doExtend('isShowChild02')">权限管理 <i class="pull-right" v-bind:class="{'el-icon-plus': !isShowChild02, 'el-icon-minus':isShowChild02 }" ></i></a>
                    
              <ul v-if="isShowChild02">
                <!-- <li ><a>角色管理</a></li> -->
                <li @click="goPath('/ucenter')"><a>人员管理</a></li>
                <!-- <router-link tag="li" active-class="is-active" to="/ucenter"><a>人员管理</a></router-link> -->

              </ul>
            </li>
          </ul>
        </aside>
      </el-aside>
      <el-container>
        <el-header>
            <user-info></user-info>
        </el-header>
        <el-main>
            <transition name="component-fade" mode="out-in">
                  <router-view></router-view>
            </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
define(["Vue"], function(Vue) {
  "use strict";
    const asyncComp = function (componentName) {
        return function (resolve) {
            require([componentName], resolve);
        };
    };
    const UserInfo =asyncComp("v@!../views/layout/components/userInfo")
  return Vue.component("v-home", {
    template: template,
      components:{UserInfo},
    data: function() {
      return {
        isShowChild01:false,
        isShowChild02:false,
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
      },
      /**
       * 用来判断是否 children
       */
      doExtend:function(e){
        console.log(e);
        this[e] = !this[e];
        
      },
      /**
       * 用来做路径的跳转
       */
      goPath:function(path,name){

        if(name){
          this.$router.push(name)

          return false 
        }

        if(path){

          this.$router.push({
            path:path
          })
          return false
        }
        
      }
    }
  });
});
</script>