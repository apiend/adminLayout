<template>
  <div class="container" v-cloak>
    <!-- main header -->
    <div class="main-header">
      <el-row>
        <el-col :span="12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <a >项目管理</a>
              </li>
            </ul>
          </nav>
        </el-col>
        <el-col :span="8" :offset="4" class="text-right">
          <el-button
            type="primary"
            icon="el-icon-news el-icon-right"
            size="medium"
            @click="newCreate"
          >新建项目</el-button>
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
          <el-button type="primary" icon="el-icon-search" @click="doSearch"></el-button>
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
            <td>{{item.proRunStatus | dStatus}}</td>
            <td>{{item.proOperStatus | dOpenStatus}}</td>
            <td>
              <el-button type="primary" size="mini" @click="openDialog">数据源管理</el-button>
              <el-button type="success" size="mini" @click="openAlert">监控任务</el-button>
              <el-button type="info" size="mini">编辑</el-button>
              <el-button type="warning" size="mini" @click="changeProStatus(item.proId,'1')">关闭</el-button>
              <el-button type="danger" size="mini" @click="changeProStatus(item.proId,'2')">开启</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- main - content -->

    
    <div class="pageDiv">
      <el-pagination
        background
        v-show="pageTotal>0"
        :current-page="pageNum"
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="pageTotal"
      ></el-pagination>
    </div>

    <!-- dialog  newCreate -->
    <el-dialog title="新建项目" :visible.sync="createVisible" width="50%" :before-close="createClose" :close-on-click-modal="closeOnClickModal">
      <el-row>
        <el-col>
          <el-col :span="4" class="lab-tip">项目名称:</el-col>
          <el-col :span="16">
            <el-input placeholder="请输入项目名称" v-model.trim="$v.projectName.$model"></el-input>
          </el-col>
        </el-col>
        <el-col class="mt10">
          <el-col :span="4" class="lab-tip">项目地址:</el-col>
          <el-col :span="16">
            <el-input placeholder="请输入项目地址" v-model.trim="$v.projectHost.$model"></el-input>
          </el-col>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="createClose">取 消</el-button>
        <el-button type="primary" @click="submitProject">确 定</el-button>
      </span>
    </el-dialog>

    <!-- newCreate end -->
  </div>
</template>


<script>
define(["Vue", "common", "api", "validators"], function(Vue, com, api, vali) {
  "use strict";

  //简易版校验
  const required = vali.required;
  const minLength = vali.minLength;
  const url = vali.url;
  /**
   * 引入公用模块
   */
  let dform = com.dForm;
  let dtable = com.dTable;

  var that;

  return Vue.component("v-home", {
    components: {
      dform,
      dtable
    },
    template: template,
    data: function() {
      return {
        now: new Date(),
        closeOnClickModal: false,
        createVisible: false,
        searchTxt: "",
        projectName: "",
        projectHost: "",
        pageTotal: "",
        pageSize: 10, // 每页10个
        pageNum: 1, // 当前页码
        tableData: []
      };
    },
    validations: {
      projectName: {
        required
      },
      projectHost: {
        required,
        url
      }
    },
    mounted: function() {
      // this.refresh();
      that = this;

      this.fetchData("");
    },
    methods: {
      /**
       *  验证数据
       */
      vali: function() {
        console.log("invalid");
        return this.$v.$invalid;
      },
      /**
       * 清除用户输入的数据
       */
      cleanInput:function(){
         that.projectName = "";
         that.projectHost = "";
      },  
      /**
       * 搜索更新
       */
      doSearch: function() {
        if (this.searchTxt) {
          this.pageNum = 1; 
          this.fetchData(this.searchTxt);
        } else {
          this.$message.error("请输入搜索关键字");
        }
      },
      /**
       * 新建项目
       */
      newCreate: function() {
        this.createVisible = true;

        // 可以调用 组件 vue-form 中的  busshow 方法  并传参 name
        // com.util.BusEmit('vue-form','busshow','name')
      },
      /**
       * 提交数据
       */
      submitProject: function() {
        // 验证数据
        if (this.vali()) {
          this.$message.error("请输入项目名称与URL地址");
          return false;
        }

        let obj = {
          proName: this.projectName,
          proUrl: this.projectHost
        };

        api.saveProInfo(obj).then(function(res) {
          if (res.code == 200) {
            that.$message({
              message: "新建项目成功",
              type: "success"
            });

            that.createVisible = false;

            that.cleanInput();

            /**
             * 刷新列表
             */

            that.fetchData();
          } else {
            that.$message.error(res.msg);
          }
        });

        console.log("提交数据");
      },
      /**
       * 获取列表数据
       * @param str 搜索时间用
       */
      fetchData: function(proName) {
        let obj = {
          proName: proName,
          pageNum: that.pageNum,
          pageSize: that.pageSize
        };
        api.queryProInfoList(obj).then(function(res) {
          console.log(res);
          if (res.code == 200) {
            that.tableData = res.data.list;
            that.pageTotal = res.data.total;
          } else {
            that.$message.error(res.msg);
          }
        });
      },

      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.fetchData();
      },
      handleFilter() {
        this.pageNum = 1;
        this.fetchData();
      },
      /**
       * 关闭新建弹窗
       */
      createClose: function() {
        this.createVisible = false;

        this.cleanInput();
      },

      /**
       * 页面之间的跳转并传参数
       * @param link 要跳转的链接
       * @param param  需要传的参数
       */
      goLink:function(link,param){

      },
      /**
       * 改变项目的状态
       */
      changeProStatus:function(id,type){

        let obj ={
            proId:id,
            status:type
        }

        api.changeProStatus(obj).then(function(res) {
          console.log(res);
          if (res.code == 200) {
           
                that.$message({
                  message: "修改成功",
                  type: "success"
                });

                that.fetchData();

          } else {
            that.$message.error(res.msg);
          }
        });





      },  
      openDialog: function() {
        //
        this.$notify.error({
          title: "错误",
          message: "message"
        });
      },
      openAlert: function() {
        this.$alert("这是一段内容", "标题名称", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
      }
    }
  });
});
</script>