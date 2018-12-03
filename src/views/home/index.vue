<template>
  <div class="container">
    <!-- main header -->
    <div class="main-header">
      <el-row>
        <el-col :span="12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <a href="#">项目管理</a>
              </li>
            </ul>
          </nav>
        </el-col>
        <el-col :span="8" :offset="4" class="text-right">
          <el-button type="primary" icon="el-icon-news el-icon-right" size="medium" @click="newCreate">新建项目</el-button>
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
            <th>项目名称</th>
            <th>运行状态</th>
            <th>操作状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="item in tableData">
            <th>16</th>
            <td>{{item.name}}</td>
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

    <!-- dialog  newCreate -->
    
    <el-dialog
        title="新建项目"
        :visible.sync="createVisible"
        width="50%"
        :before-close="createClose">

         <el-row>
           <el-col>
             <el-col :span="4" class="lab-tip">
              项目名称:  
             </el-col> 
             <el-col :span="16">
               <el-input placeholder="请输入项目名称" v-model="projectName"></el-input>
             </el-col>
             
           </el-col>
           <el-col class="mt10">

             <el-col :span="4" class="lab-tip">
             项目地址:
             </el-col> 
             <el-col :span="16">
                <el-input placeholder="请输入项目地址" v-model="projectHost"></el-input>
             </el-col>
             
          
           </el-col>

         </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button @click="createVisible = false">取 消</el-button>
          <el-button type="primary" @click="createVisible = false">确 定</el-button>
        </span>
    </el-dialog>

    <!-- newCreate end -->

  </div>
</template>


<script>
define(["Vue","common","api","es6!components/dioui/from/index"], function(Vue,com,api,dfrom) {
  "use strict";

  console.log(dfrom);

  return Vue.component("v-home", {
    template: template,
    data: function() {
      return {
        now: new Date(),
        createVisible:false,
        searchTxt: "",
        projectName:"",
        projectHost:"", 
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
      
      
      api.doLogin().then(res=>{
        console.log(res);
      }).catch(error=>{
        console.log(error);
      })
    },
    methods: {
      refresh: function() {
        this.now = new Date();
        setTimeout(this.refresh, 2000);
      },
      /**
       * 新建项目
       */
      newCreate:function(){
        
        this.createVisible = true;

      },
      /**
       * 关闭新建弹窗
       */
      createClose:function (){
        this.createVisible = false;
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