<template>
  <div class="container" v-cloak>

   
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
      <!-- <dform title="测试dform"></dform> -->
      <!-- <dtable title="测试dtable"></dtable> -->
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
            <th>{{item.proId}}</th>
            <td>{{item.proName}}</td>
            <td>{{item.proRunStatus}}</td>
            <td>{{item.proOperStatus}}</td>
            <td>
               <el-button type="primary" size="mini" @click="openDialog">数据源管理</el-button>
                <el-button type="success" size="mini" @click="openAlert">监控任务</el-button>
                <el-button type="info" size="mini">编辑</el-button>
                <el-button type="warning" size="mini">关闭</el-button>
                <el-button type="danger" size="mini">开启</el-button>
            </td>
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
 

define(["Vue","common","api" ], function(Vue,com,api) {
  "use strict";
  /**
   * 引入公用模块
   */
   let dform = com.dForm;
   let dtable = com.dTable;


  var that 

  return Vue.component("v-home", {
    components: {
      dform,
      dtable
    },
    template: template,
    data: function() {
      return {
        now: new Date(),
        createVisible:false,
        searchTxt: "",
        projectName:"",
        projectHost:"", 
        tableData: []
      };
    },
    mounted: function() {
      // this.refresh();
      that = this;

        this.fetchData("22")
    },
    methods: {
      /**
       *  验证数据 
       */
      vail:function(){

        
      },
      /**
       * 搜索更新
       */
      doSearch:function(){

          if(this.searchTxt){
               this.fetchData(this.searchTxt)
          }else{
             this.$message.error('请输入搜索关键字');
          }
         


      },
      /**
       * 新建项目
       */
      newCreate:function(){
        
        this.createVisible = true;

        // 可以调用 组件 vue-form 中的  busshow 方法  并传参 name
        com.util.BusEmit('vue-form','busshow','name')

      },
      /**
       * 获取列表数据
       * @param str 搜索时间用
       */
      fetchData:function(proName){
          let obj ={
            proName:proName
          }
          api.queryProInfoList(obj).then(function(res){
            console.log(res);
            if(res.code == 200){
              that.tableData = res.data.list
            }else{
              this.$message.error(res.msg);
            }

          })
      },
      /**
       * 关闭新建弹窗
       */
      createClose:function (){
        this.createVisible = false;
      },
      openDialog:function(){
        // 
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