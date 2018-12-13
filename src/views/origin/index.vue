<template>
  <div class="container">
    <!-- main header -->
    <div class="main-header">
      <el-row>
        <el-col :span="12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <a href="#">数据源管理</a>
              </li>
            </ul>
          </nav>
        </el-col>

        <el-col :span="8" :offset="4" class="text-right">
          <el-button type="primary" icon="el-icon-news el-icon-right" size="medium">新建项目</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- main header end -->
    <!-- main-filter -->
    <div class="main-filter">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入关键字搜索项目" v-model="searchTxt"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search"></el-button>
        </el-col>
      </el-row>
    </div>
    <!-- main-filter end -->
    <div class="main-content">
      <!-- main-content -->
      <table class="table is-bordered is-striped is-fullwidth">
        <thead>
          <tr>
            <th>序号</th>
            <th>
              项目名称
            </th>
            <th>
               运行状态
            </th>
            <th>
               操作状态
            </th>
            <th>
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>16</th>
            <td>38</td>
            <td>11</td>
            <td>9</td>
            <td>
               <el-button type="primary" size="mini" @click="openDialog">数据源管理</el-button>
                <el-button type="success" size="mini" @click="openAlert">监控任务</el-button>
                <el-button type="info" size="mini">编辑</el-button>
                <el-button type="warning" size="mini">关闭</el-button>
                <el-button type="danger" size="mini">开启</el-button>
            </td>
          </tr>
          <tr>
            <th>16</th>
            <td>38</td>
            <td>11</td>
            <td>9</td>
            <td>9</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- main - content -->
    <div class="pageDiv">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    
  </div>
</template>


<script>
define(["Vue"], function(Vue) {
  "use strict";

  return Vue.component("v-origin", {
    template: template,
    data: function() {
      return {
        now: new Date(),
        searchTxt: "",
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ]
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
      openDialog:function(){
        // console.log(this.$);
        this.$notify.error({
          title:"错误",
          message:"message"
        })
      },
      openAlert:function(){
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
  });
});
</script>