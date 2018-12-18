<template>
  <div class="container">
    <!-- main header -->
    <div class="main-header">
      <el-row>
        <el-col :span="12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <a >数据源管理</a>
              </li>
            </ul>
          </nav>
        </el-col>

        <!-- <el-col :span="8" :offset="4" class="text-right">
          <el-button type="primary" icon="el-icon-news el-icon-right" size="medium">新建项目</el-button>
        </el-col> -->
      </el-row>
    </div>
    <!-- main header end -->
    <!-- main-filter -->
    <div class="main-filter">
      <el-row>
        <el-col :span="4" >
            <select v-model="selectValue" class="selectDiv">
              <option  v-for="item in selectList"  :value ="item.proId">{{item.proName}}</option>
          </select>
        </el-col>
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
      <!-- main-content -->
      <table class="table is-bordered is-striped is-fullwidth">
        <thead>
          <tr>
            <th>序号</th>
            <th>
              所属项目
            </th>
            <th>
               数据源名称
            </th>
            <th>
               数据源地址
            </th>
            <th>
              类型
            </th>
             <th>
              备注
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData">
            <th>{{item.dataSrcId}}</th>
            <td>{{item.comId}}</td>
            <td>{{item.dataSrcName}}</td>
            <td>{{item.dataSrcUrl}}</td>
            <td>{{item.dataSrcType}}</td> 
            <td>
                {{item.remark}}
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
    
  </div>
</template>


<script>
define(["Vue","common", "api"], function(Vue, com, api) {
  "use strict";
  var that
  return Vue.component("v-origin", {
    template: template,
    data: function() {
      return {
        now: new Date(),
        selectValue:"",
         selectList: [{
           value:"",
           proName:"全部项目"
         }],
        searchTxt: "",
        pageTotal: "",
        pageSize: 10, // 每页10个
        pageNum: 1, // 当前页码
        tableData: [],
       
         
      };
    },
    mounted: function() {
      // this.refresh();

      that = this;

      this.fetchData("");
      this.fetchSelectList();
    },
    methods: {
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
       * 获取下拉
       */
      fetchSelectList:function(){
        api.queryListForSlect().then(function(res){
          if (res.code == 200) {
            
            res.data.forEach(function(item,i){
                item.value = item.proId
                console.log(item);
                that.selectList.push(item)
 
            })
                         
          } else {
            that.$message.error(res.msg);
          }

        })
      },
       /**
       * 获取列表数据
       * @param str 搜索时间用
       */
      fetchData: function(proName) {
        let obj = {
          comId:that.selectValue,
          dataSrcName: proName,
          pageNum: that.pageNum,
          pageSize: that.pageSize
        };
        api.queryDataSrcList(obj).then(function(res) {
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

       
    }
  });
});
</script>