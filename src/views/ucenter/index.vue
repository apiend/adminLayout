<template>
  <div class="container" v-cloak>
    <!-- 用户中心 及 权限  中心 -->
    <!-- main header -->
    <div class="main-header">
      <el-row>
        <el-col :span="12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <a>人员管理</a>
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
          >新增人员</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- main header end -->
    <!-- main-filter -->
    <div class="main-filter">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入人员名称" v-model="searchTxt"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="doSearch"></el-button>
        </el-col>
      </el-row>
    </div>
    <!-- main-filter end -->
    <!-- main-content -->
    <div class="main-content">
      <table class="table is-bordered is-striped is-fullwidth">
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>帐号</th>
            <th>手机号</th>
            <th>微信号</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData">
            <th>{{item.id}}</th>
            <td>{{item.name}}</td>
            <td>{{item.coed}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.wxNo}}</td>
            <td>
              <el-button type="info" size="mini">编辑</el-button>
              <el-button type="info" size="mini">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- main - content -->


    <!-- page div -->
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

    <!-- page div end -->



    <!-- dialog  newCreate -->
    <el-dialog title="新增人员" 
      :visible.sync="createVisible" 
      width="50%" 
      :close-on-click-modal="closeOnClickModal"
      :before-close="createClose">
      <el-row>
        <el-col>
          <el-col :span="4" class="lab-tip">姓名:</el-col>
          <el-col :span="16">
            <el-input placeholder="请输入姓名" v-model.trim="$v.uName.$model"></el-input>
          </el-col>
        </el-col>
        <el-col class="mt10">
          <el-col :span="4" class="lab-tip">帐号:</el-col>
          <el-col :span="16">
            <el-input placeholder="请输入帐号" v-model.trim="$v.uCoed.$model"></el-input>
          </el-col>
        </el-col>

        <el-col class="mt10">
          <el-col :span="4" class="lab-tip">手机号:</el-col>
          <el-col :span="16">
            <el-input placeholder="请输入手机号" v-model.trim="$v.uPhone.$model"></el-input>
            <div class="error" v-if="!$v.uPhone.mustBePhone && anyErr">请输入正确的手机号</div>
          </el-col>
        </el-col>

        <el-col class="mt10">
          <el-col :span="4" class="lab-tip">微信号:</el-col>
          <el-col :span="16">
            <el-input placeholder="请输入微信号" v-model.trim="$v.uWXNO.$model"></el-input>
          </el-col>
        </el-col>

         <el-col class="mt10">
          <el-col :span="4" class="lab-tip">密码:</el-col>
          <el-col :span="16">
            <el-input placeholder="请输入密码" type="password" v-model="$v.uPwd.$model"></el-input>
                <div class="error" v-if="!$v.uPwd.mustBePwd && anyErr">请输入6-32位由数字、字母、下划线组成的密码</div>
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
define(["Vue", "common", "api", "validators","MD5"], function(Vue, com, api, vali,MD5) {
  "use strict";
  var that;
  console.log(vali);
  //简易版校验
  const required = vali.required;
  const minLength = vali.minLength;
  const maxLength = vali.maxLength;
  // 手机号的验证
  var  mustBePhone = function(value) {
        const urlregex = /^[1][2345789]\d{9}$/
        return urlregex.test(value)
  }
  // 请输入6-32位由数字、字母、下划线组成的密码
  var  mustBePwd = function (value){
    const password = /^(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/
    return password.test(value)
  }
  // ---


  var result = {
    template: template,
    data: function() {
      var time = new Date();
      return {
        closeOnClickModal: false,
        createVisible: false,
        anyErr:false, // 当有错误的时候
        searchTxt: "",
        newUser:{
            name:"", // false string 用户姓名
            coed:"", //true string 账号
            phone:"", //false string 手机号
            wxNo:"", //false string 微信号
            pwd:"" //true string 密码
        },
        uName:"",
        uCoed:"",
        uPhone:"",
        uWXNO:"",
        uPwd:"",
        tableData: [],
        loaded: time,
        pageTotal: "",
        pageSize: 10, // 每页10个
        pageNum: 1 // 当前页码
      };
    },
    validations: {
      uName: {
        required
      },
      uCoed: {
        required
      },
      uPhone: {
        required,
        mustBePhone
      },

      uWXNO:{
        required
      },
      uPwd:{
        required, 
        mustBePwd
      }

    },
    mounted: function() {
      console.log("个人用户中心");
      that = this;

      this.fetchData();
    },
    methods: {
      /**
       *  验证数据
       */
      vali: function() {
        this.$v.$touch();
        console.log("invalid");
        return this.$v.$invalid;
      },
      /**
       * 清除用户输入的数据
       */
      cleanInput: function() {
        // that.projectName = "";
        // that.projectHost = "";
        that.uName="";
        that.uCoed="";
        that.uPhone="";
        that.uWXNO="";
        that.uPwd=""
      },
      /**
       * 新建用户
       */
      newCreate: function() {
        console.log("新建");
        this.createVisible = true;
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
       * 关闭新建弹窗
       */
      createClose: function() {
        this.createVisible = false;

        this.cleanInput();
      },
      fetchData:function(Name){
        console.log('fetchData');
        let obj={
          name:Name,
           pageNum: that.pageNum,
          pageSize: that.pageSize

        } 

        api.queryUserInfoList(obj).then(function(res){

          console.log(res);

          if (res.code == 200) {
            that.tableData = res.data.list;
            that.pageTotal = res.data.total;
          } else {
            that.$message.error(res.msg);
          }


        })

  

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
      submitProject: function() {
        console.log("ww");
         // 验证数据
        if (this.vali()) {
          this.anyErr = true;
          this.$message.error("请输入正确的参数");
          return false;
        }

        let obj ={

            name:this.uName,
            coed:this.uCoed,
            phone:this.uPhone,
            wxNo:this.uWXNO,
            pwd:MD5(this.uPwd)

        }

        api.saveUserinfo(obj).then(function(res){

          console.log(res);
          if (res.code == 200) {
            // that.tableData = res.data.list;
            // that.pageTotal = res.data.total;

             that.$message({
              message: "新增人员",
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

        })
        


      }
    }
  };

  Vue.component("vue-ucenter", result);

  return result;
});
</script>
