<template>
  <div>
    <!-- main header -->
    <div class="main-header">
      <el-row>
        <el-col :span="12">
          <nav
            class="breadcrumb"
            aria-label="breadcrumbs"
          >
            <ul>
              <li>
                <a>报警日志</a>
              </li>
            </ul>
          </nav>
        </el-col>
      </el-row>
    </div>
    <!-- main header end -->

    <!-- main-filter -->
    <div class="main-filter">
      <el-row>
        <el-col :span="3">
          <select
            v-model="proId"
            class="selectDiv"
          >
            <option value="">全部项目</option>
            <option
              v-for="item in selectList"
              :value="item.proId"
            >{{item.proName}}</option>
          </select>
        </el-col>
        <el-col :span="3">
          <select
            v-model="timeId"
            class="selectDiv"
          >
            <option value="">选择时间查询</option>
            <option
              v-for="item in timeList"
              :value="item.id"
              :selected="timeId==item.id"
            >{{item.value}}</option>
          </select>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="timeFilter"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入关键字搜索任务"
            v-model="eventName"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="doSearch"
          ></el-button>
        </el-col>
        <el-col
          :span="2"
          :offset="1"
        >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="doExport"
          >导出</el-button>
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
            <th>项目名称</th>
            <th>任务名称</th>
            <th>报警信息</th>
            <th>触发时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in tableData">
            <tr>
              <th>{{item.proId}}</th>
              <td>{{item.proName}}</td>
              <td>{{item.eventName}}</td>
              <td>{{item.alarmInfo}}</td>
              <td>{{item.eventTiggerTime | dformat}}</td>
              <td
                @click="extendTable(item)"
                style="cursor: pointer;"
              >
                <i
                  class="el-icon-caret-bottom"
                  v-show="!item.show"
                ></i>
                <i
                  class="el-icon-caret-top"
                  v-show="item.show"
                ></i>
              </td>
            </tr>
            <template v-if="item.show">
              <tr>
                <td colspan="6">
                  <p> 监控事件描述:{{item.eventDesc}}</p>
                  <p> 通知对象:{{item.usersName}}</p>
                </td>
              </tr>
            </template>

          </template>
        </tbody>
      </table>
      <div v-show="pageTotal===0">暂无数据</div>
    </div>
    <!-- main - content -->
    <div class="pageDiv">
      <el-pagination
        background
        v-show="pageTotal>pageSize"
        :current-page="pageNum"
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="pageTotal"
      ></el-pagination>
    </div>
    <!-- main - content -->
  </div>

</template>


<script>
define(["Vue", "common", "api"], function(Vue, com, api) {
  "use strict";
  var that;
  var result = {
    template: template,
    data: function() {
      var time = new Date();
      return {
        loaded: time,
        timeFilter: null,
        proId: "",
        eventName: "",
        selectList: [],
        tableData: [],
        stime: "",
        etime: "",
        pageTotal: "",
        pageSize: 10, // 每页10个
        pageNum: 1, // 当前页码
        timeList: [
          { id: 1, value: "今天" },
          { id: 2, value: "昨天" },
          { id: 3, value: "3天内" },
          { id: 4, value: "7天内" },
          { id: 5, value: "15天内" },
          { id: 6, value: "30天内" }
        ],
        timeId: ""
      };
    },
    mounted: function() {
      that = this;
      that.fetchData();
      that.fetchSelectList();
    },
    watch: {
      timeId(newName, oldName) {
        if (newName) {
          this.timeFilter = null;
        }
      },
      timeFilter: {
        handler(newName, oldName) {
          if (newName) {
            this.timeId = "";
            console.log(this.timeId)
          }
        },
        deep: true
      }
    },
    methods: {
      /**
       * 获取下拉
       */
      fetchSelectList: function() {
        api.queryListForSlect().then(function(res) {
          if (res.code == 200) {
            res.data.forEach(function(item, i) {
              item.value = item.proId;
              that.selectList.push(item);
            });
          } else {
            that.$message.error(res.msg);
          }
        });
      },
      /**
       * 获取列表
       */
      fetchData: function() {
        let stime, etime;
        if (that.timeFilter === null) {
          stime = "";
          etime = "";
        } else {
          stime = that.timeFilter[0];
          etime = that.timeFilter[1];
        }
        let obj = {
          proId: that.proId,
          stime,
          etime,
          eventName: that.eventName,
          pageNum: that.pageNum,
          pageSize: that.pageSize,
          conciseTime: that.timeId
        };
        api.queryEventLogList(obj).then(function(res) {
          if (res.code == 200) {
            that.tableData = res.data.list;
            that.pageTotal = res.data.total;
          } else {
            that.$message.error(res.msg);
          }
        });
      },
      /**
       * 导出
       */
      doExport() {
        let stime, etime;
        if (that.timeFilter === null) {
          stime = "";
          etime = "";
        } else {
          stime = that.timeFilter[0];
          etime = that.timeFilter[1];
        }
        const src = `${apihost}eventExecuteLog/export.do?proId=${
          that.proId
        }&stime=${stime}&etime=${etime}&eventName=${that.eventName}`;
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = src;
        a.click();
        document.body.removeChild(a);
      },
      doSearch: function() {
        that.fetchData();
      },
      /**
       * 展开列表
       */
      extendTable: function(item) {
        Vue.set(item, "show", !item.show);
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
      }
    }
  };

  Vue.component("vue-task", result);

  return result;
});
</script>
