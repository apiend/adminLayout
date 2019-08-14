<template>
  <div
    class="container"
    style="background:#fff;padding:30px"
  >
    <div class="main-header">
      <el-row>
        <el-col :span="12">
          <nav
            class="breadcrumb"
            aria-label="breadcrumbs"
          >
            <ul>
              <li>
                <a>{{abnormalTitle}}</a>
              </li>
            </ul>
          </nav>
        </el-col>
      </el-row>
    </div>

    <!--新建监控显示-->
    <p class="monitoringAdd-title">项目基本信息</p>
    <div class="monitoringAdd-box-border">
      <div class="el-row">
        <div class="mt10 el-row">
          <div
            class="lab-tip el-col el-col-4"
            data-style1=""
          >项目名称:</div>
          <div class="el-col el-col-16">
            <select
              v-model="projectId"
              class="selectDiv"
              :disabled="pageType==2||pageType==3"
            >
              <option value="">请选择</option>
              <option
                v-for="item in projectList"
                :value="item.proId"
              >{{item.proName}}</option>
            </select>
            <div
              class="error"
              v-if="!$v.projectId.required && anyErr"
            >项目名称不能为空</div>
          </div>
        </div>
      </div>
      <el-row>
        <el-row class="mt10">
          <el-col
            :span="4"
            class="lab-tip"
          >任务名称:</el-col>
          <el-col :span="16">

            <el-input
              placeholder="请输入任务名称"
              v-model="taskEventName"
              :disabled="pageType==2||pageType==3"
            ></el-input>
            <div
              class="error"
              v-if="!$v.taskEventName.required && anyErr"
            >任务名称不能为空</div>
          </el-col>
        </el-row>
        <el-row class="mt10">
          <el-col
            :span="4"
            class="lab-tip"
          >事件描述:</el-col>
          <el-col :span="16">

            <el-input
              placeholder="请输入事件描述"
              v-model="eventDesc"
              maxlength='500'
            ></el-input>
            <div
              class="error"
              v-if="!$v.eventDesc.required && anyErr"
            >事件描述不能为空</div>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <p class="monitoringAdd-title">配置监控指标</p>
    <div
      class="monitoringAdd-box-border"
      style="padding-bottom:0"
    >
      <div
        class="monitoringAdd-box-bordersecond"
        v-for="(item,index) in monitortargetArr"
      >
        <div class="monitoringAdd-box-bordersecond-title">监控指标{{index+1}}<i
            class="el-icon-error"
            style="color:#f56c6c;font-size:24px;margin-top:3px"
            v-show="monitortargetArr.length>1"
            @click="monitorDel(index)"
          ></i></div>
        <div class="el-row">
          <div class="mt10 el-row">
            <div
              class="lab-tip el-col el-col-4"
              data-style1=""
            >数据源:</div>
            <div
              class="el-col el-col-16"
              style="width:30%"
            >
              <select
                v-model="item.dataSource"
                class="selectDiv"
              >
                <option value="">请选择</option>
                <option
                  v-for="el in dbsourceIdList"
                  :value="el.dataSrcId"
                >{{el.dataSrcName}}</option>
              </select>
              <div
                class="error"
                v-if="!item.dataSource&&isclickSave"
              >数据源不能为空</div>
            </div>
          </div>
          <el-row class="mt10">
            <el-col
              :span="4"
              class="lab-tip"
            >监控代码:</el-col>
            <el-col :span="16">
              <el-input
                v-model.trim="item.monitorCode"
                type="textarea"
                rows="4"
              ></el-input>
              <div
                class="error"
                v-if="!item.monitorCode&&isclickSave"
              >监控代码不能为空</div>
            </el-col>
          </el-row>
          <el-row class="mt10">
            <el-col
              :span="4"
              class="lab-tip"
            ></el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                size="mini"
                @click="handleCheckOrigin(index)"
              >检查</el-button>
            </el-col>
            <el-col
              :span="4"
              v-if="item.ischeckCode==3"
            >
              <el-button
                type="success"
                icon="el-icon-check"
                circle
                size="mini"
                style="margin-top: 5px;"
              ></el-button>
              <span class="confirm-text">可以执行</span>
            </el-col>
            <el-col
              :span="4"
              v-if="item.ischeckCode==2"
            >
              <el-button
                type="danger"
                icon="el-icon-close"
                circle
                size="mini"
                style="margin-top: 5px;"
              ></el-button>
              <span class="confirm-text">无法执行</span>
            </el-col>
          </el-row>
          <el-row class="mt10">
            <el-col
              :span="4"
              class="lab-tip"
            >结果变量名:</el-col>
            <el-col
              :span="16"
              style="width:30%"
            >

              <el-input
                placeholder="请输入结果变量名"
                v-model="item.resultVariable"
              ></el-input>
              <div
                class="error"
                v-if="!item.resultVariable&&isclickSave"
              >结果变量名不能为空</div>

            </el-col>
          </el-row>
          <el-row class="mt10">
            <el-col
              :span="4"
              class="lab-tip"
            >数据导出:</el-col>
            <el-col
              :span="16"
              class="lab-tip"
              style="text-align: left"
            >
              <el-checkbox
                label="*对服务器性能有影响，慎用"
                v-model="item.dataExportflag"
              ></el-checkbox>
            </el-col>
          </el-row>
          <el-row
            class="mt10"
            v-if="item.dataExportflag"
          >
            <el-col
              :span="4"
              class="lab-tip"
            ></el-col>
            <el-col :span="16">
              <el-input
                v-model.trim="item.dataExport"
                type="textarea"
                rows="4"
              ></el-input>
              <div
                class="error"
                v-if="!item.dataExport&&isclickSave"
              >数据导出代码不能为空</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="width:1344px;height:40px;display: flex;justify-content:center;margin-bottom:20px">
        <el-col :span="2">
          <el-button
            type="primary"
            icon="el-icon-plus"
            :disabled='monitortargetArr.length>=10'
            size='medium'
            @click="monitorAdd"
          >添加监控指标</el-button>
        </el-col>
      </div>
    </div>
    <p class="monitoringAdd-title">设置监控规则</p>
    <div class="monitoringAdd-box-border">
      <div class="mt10 el-row">
        <div
          class="lab-tip el-col el-col-4"
          data-style1=""
        >下列条件符合:</div>
        <div
          class="el-col el-col-16"
          style="width:15%"
        >
          <select
            v-model="screenFactor"
            class="selectDiv"
          >
            <option value="1">全部</option>
            <option value="2">任何</option>
          </select>
        </div>
      </div>
      <hr style="background-color:#bbb;height:1px">
      <div
        class="mt10 el-row"
        v-for="(el,index) in monitorruleArr"
      >
        <div
          class="lab-tip el-col el-col-4"
          data-style1=""
          style="width:5%"
        >{{index+1}}:</div>
        <div
          class="el-col el-col-16"
          style="width:12%;margin-right:15px"
        >
          <select
            v-model="el.data1"
            class="selectDiv"
          >
            <option value="">请选择</option>
            <option
              v-for="item in validationList1(index)"
              :value="item.value"
            >{{item.label}}</option>
          </select>
          <div
            class="error"
            v-if="!el.data1&&isclickSave"
          >该元素不能为空</div>
        </div>
        <div
          class="el-col el-col-16"
          style="width:10%;margin-right:15px"
        >
          <select
            v-model="el.data2"
            class="selectDiv"
          >
            <option
              v-for="item in formulaList"
              :value="item.value"
            >{{item.label}}</option>
          </select>
        </div>
        <div
          class="el-col el-col-16"
          style="width:10%;margin-right:15px"
        >
          <select
            v-model="el.data3"
            class="selectDiv"
          >
            <option value="1">常量</option>
            <option
              v-for="item in validationList2(index)"
              :value="item.value"
            >{{item.label}}</option>
          </select>
        </div>
        <el-col
          :span="16"
          style="width:10%"
          v-if="el.data3==1"
        >

          <el-input
            placeholder=""
            v-model="el.data4"
          ></el-input>
          <div
            class="error"
            v-if="!el.data4&&el.data3==1&&isclickSave"
          >该元素不能为空</div>
          <div
            class="error"
            v-if="!isnumber(el.data4)&&el.data3==1&&isclickSave"
          >请输入数字</div>
        </el-col>
        <el-col
          :span="16"
          style="width:7%;height:40px;line-height: 40px;"
          v-if="el.data3!=1"
        >
          <el-checkbox v-model="el.data5">值</el-checkbox>
        </el-col>
        <el-col
          :span="16"
          style="width:10%;height:40px;line-height: 40px;"
          v-if="el.data3!=1&&el.data5"
        >
          <el-input
            placeholder=""
            v-model="el.data6"
          >
          </el-input>
          <div
            class="error"
            v-if="!el.data6&&el.data3!=1&&el.data5&&isclickSave"
          >该元素不能为空</div>

        </el-col>
        <el-col
          :span="16"
          style="width:3%;height:40px;line-height: 40px;"
          v-if="el.data3!=1&&el.data5"
        >
          %

        </el-col>

        <el-col
          :span="16"
          style="width:10%;padding:8px 0;"
        >
          <i
            class="el-icon-circle-close"
            style="font-size:24px;color:#f56c6c"
            @click="monitorrulearrDel(index)"
            v-if="!(index==0&&monitorruleArr.length==1)"
          ></i>
          <i
            class="el-icon-circle-plus"
            v-if="(index==monitorruleArr.length-1)&&monitorruleArr.length!=10"
            @click="monitorrulearrAdd"
            style="font-size:24px;color:#409eff"
          ></i>
        </el-col>

      </div>
    </div>
    <p class="monitoringAdd-title">设置报警规则</p>
    <div class="monitoringAdd-box-border">
      <el-row>
        <el-row class="mt10">
          <el-col
            :span="4"
            class="lab-tip"
          >报警信息模板:</el-col>
          <el-col :span="16">

            <el-input
              placeholder=""
              v-model="alarmInfoTemp"
              maxlength="500"
            >
              <template slot="prepend">{{projectNames}}</template>
            </el-input>
            <div
              class="error"
              v-if="!$v.alarmInfoTemp.required && anyErr"
            >报警信息模板不能为空</div>
          </el-col>

        </el-row>
        <el-row class="mt10">
          <el-col
            :span="4"
            class="lab-tip"
          >开始时间:</el-col>
          <el-col :span="4">
            <el-date-picker
              :picker-options="pickerOptions"
              v-model="stime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            >
            </el-date-picker>
            <div
              class="error"
              v-if="!$v.stime.required && anyErr"
            >开始时间不能为空</div>
          </el-col>
        </el-row>
        <el-row class="mt10">
          <el-col
            :span="4"
            class="lab-tip"
          >结束时间:</el-col>
          <el-col :span="4">
            <el-date-picker
              :picker-options="pickerOptions2"
              v-model="etime"
              format="yyyy-MM-dd HH:mm"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            >
            </el-date-picker>
            <div
              class="error"
              v-if="!$v.etime.required && anyErr"
            >结束时间不能为空</div>
          </el-col>
        </el-row>
        <el-row class="mt10">
          <el-col
            :span="4"
            class="lab-tip"
          >监控频率:</el-col>
          <el-col
            :span="10"
            class="lab-tip"
          >
            <el-radio
              v-for="item in radioList"
              :label="item.value"
              v-model="monitorType"
              style="float: left;margin-top: 10px;"
              :disabled="!item.flag"
            >{{item.label}}
            </el-radio>

          </el-col>

        </el-row>
        <div
          class="form-hint"
          v-show="!radioList[0].flag"
        >*使用数据导出功能时，无法选择分钟频率，因为会严重影响服务器性能</div>
        <!--每小时-->
        <el-row
          class="mt10"
          v-if="monitorType==='1'"
        >
          <el-col
            :span="4"
            class="lab-tip"
          >时间段:</el-col>
          <el-col
            :span="16"
            class="lab-tip"
          >
            <el-time-picker
              style="width: 160px;float: left;"
              v-model="hourTimestart"
              :picker-options="{
    }"
              value-format="HH"
              format="HH:mm"
              placeholder="起始时间点"
            >
            </el-time-picker>

            <el-time-picker
              style="width: 160px;float: left;margin-left: 20px;"
              v-model="hourTimeend"
              :picker-options="{
    }"
              value-format="HH"
              format="HH:mm"
              placeholder="结束时间点"
            >
            </el-time-picker>

          </el-col>
          <div
            class="error"
            v-if="!$v.hourTimestart.required && anyErr"
          >起始时间点不能为空</div>
          <div
            class="error"
            v-if="!$v.hourTimeend.required && anyErr"
          >结束时间点不能为空</div>
        </el-row>
        <!-- 每分钟 -->
        <div
          class="mt10 el-row"
          v-if="monitorType === '0'"
        >
          <div
            class="lab-tip el-col el-col-4"
            data-style1=""
          >分钟:</div>
          <div
            class="el-col el-col-16"
            style="width:10%"
          >
            <select
              v-model="minuteCount"
              class="selectDiv"
              :disabled='!radioList[0].flag'
            >
              <option
                v-for="item in minuteList"
                :value="item"
                :selected="item==minuteCount"
              >{{item}}分钟</option>
            </select>
          </div>
        </div>
        <!-- 每分钟 -->
        <!--每天-->
        <el-row
          class="mt10"
          v-if="monitorType === '2'"
        >
          <el-col
            :span="4"
            class="lab-tip"
          >时间节点:</el-col>
          <el-col
            :span="16"
            class="lab-tip"
          >
            <el-time-picker
              style="width: 160px;float: left;"
              v-model="dayTime"
              :picker-options="{
    }"
              value-format="HH:mm"
              format="HH:mm"
              placeholder="时间节点"
            >
            </el-time-picker>
            <div
              class="error"
              v-if="!$v.dayTime.required && anyErr"
            >时间节点不能为空</div>
          </el-col>
        </el-row>
        <!--每周-->
        <el-row v-if="monitorType === '3'">
          <el-row class="mt10">
            <el-col
              :span="4"
              class="lab-tip"
            >时间节点:</el-col>
            <el-col
              :span="16"
              class="lab-tip"
            >
              <el-time-picker
                style="width: 160px;float: left;"
                v-model="dayTime"
                :picker-options="{
    }"
                value-format="HH:mm"
                format="HH:mm"
                placeholder="时间节点"
              >
              </el-time-picker>
              <div
                class="error"
                v-if="!$v.dayTime.required && anyErr"
              >时间节点不能为空</div>
            </el-col>
          </el-row>
          <!-- <div
            class="error"
            v-if="!$v.form.startH.required && checkParams"
          >时间节点不能为空</div> -->

          <el-row class="mt10">
            <el-col
              :span="4"
              class="lab-tip"
            >每周:</el-col>
            <el-col
              :span="16"
              class="lab-tip"
              style="text-align: left;"
            >
              <el-checkbox
                label="周一"
                @change="handleChecked(0)"
                v-model="weekArr[0]"
              ></el-checkbox>
              <el-checkbox
                label="周二"
                @change="handleChecked(1)"
                v-model="weekArr[1]"
              ></el-checkbox>
              <el-checkbox
                label="周三"
                @change="handleChecked(2)"
                v-model="weekArr[2]"
              ></el-checkbox>
              <el-checkbox
                label="周四"
                @change="handleChecked(3)"
                v-model="weekArr[3]"
              ></el-checkbox>
              <el-checkbox
                label="周五"
                @change="handleChecked(4)"
                v-model="weekArr[4]"
              ></el-checkbox>
              <el-checkbox
                label="周六"
                @change="handleChecked(5)"
                v-model="weekArr[5]"
              ></el-checkbox>
              <el-checkbox
                label="周日"
                @change="handleChecked(6)"
                v-model="weekArr[6]"
              ></el-checkbox>
            </el-col>

          </el-row>
          <div
            class="error"
            v-if="!$v.weekTime.required && anyErr"
          >日期选择不能为空</div>

        </el-row>
        <!--每周结束-->
      </el-row>
      <div class="mt10 el-row">
        <div
          class="lab-tip el-col el-col-4"
          data-style1=""
        >通知对象:</div>
        <div
          class="el-col el-col-16"
          style="width:15%;margin-right:15px"
        >
          <select
            v-model="groupId"
            class="selectDiv"
          >
            <option
              v-for="item in groupList"
              :value="item.value"
            >{{item.label}}</option>
          </select>
        </div>
        <el-col
          :span="16"
          style="width:15%"
        >
          <el-autocomplete
            class="inline-input"
            v-model="contactSearch"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>

      </div>
      <div
        class="error"
        v-if="contactArr.length==0&&anyErr"
      >通知对象不能为空</div>
      <el-row class="mt10">
        <el-col
          :span="4"
          class="lab-tip"
        ></el-col>
        <el-col
          :span="20"
          style="text-align: left;"
        >
          <el-tag
            v-for="tag in contactArr"
            :key="tag.id"
            :closable="contactArr.length>1"
            @close="handleClose(tag)"
            style="margin-left:10px"
          >
            {{tag.value}}
          </el-tag>
        </el-col>
      </el-row>
      <div class="mt10 el-row">
        <div
          class="lab-tip el-col el-col-4"
          data-style1=""
        >通道沉默时间:</div>
        <div
          class="el-col el-col-16"
          style="width:220px"
        >
          <select
            v-model="silenceTime"
            class="selectDiv"
          >
            <option
              v-for="item in silenceTimeArr"
              :value="item.id"
            >{{item.value}}</option>
          </select>
          <div
            class="error"
            v-if="!$v.silenceTime.required && anyErr"
          >通道沉默时间不能为空</div>
        </div>
      </div>
      <div class="form-hint">*通道沉默是指当天内，前一条报警发出后，间隔多长时间才会发出下一条</div>

    </div>
    <el-row
      class="mt10"
      v-if="pageType==3"
    >
      <el-col
        :span="4"
        class="lab-tip"
      >编辑理由:</el-col>
      <el-col :span="16">

        <el-input
          placeholder=""
          v-model="editrRemarks"
        ></el-input>
        <div
          class="error"
          v-if="!$v.editrRemarks.required && anyErr"
        >编辑理由不能为空</div>
      </el-col>
    </el-row>
    <el-row
      class="mt10"
      style="padding-bottom:30px"
    >
      <el-col
        :span="4"
        class="lab-tip"
      ></el-col>
      <el-col
        :span="2"
        class="lab-tip"
      >
        <el-button
          type="primary"
          @click="handleSubmit"
        >确定</el-button>
      </el-col>
      <el-col
        :span="2"
        :offset="1"
        class="lab-tip"
      >
        <el-button @click="handleCancel">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>


<script>
define(["Vue", "common", "api", "validators"], function(Vue, com, api, vali) {
  "use strict";
  var that;
  const required = vali.required;
  const maxLength = vali.maxLength;
  var result = {
    template: template,
    components: {},
    validations() {
      return this.validation;
    },
    data: function() {
      var time = new Date();
      return {
        projectList: [], //项目名称列表
        validation: {
          projectId: {
            required
          },
          taskEventName: {
            required
          },
          eventDesc: {
            required
          },
          alarmInfoTemp: {
            required
          },
          stime: {
            required
          },
          etime: {
            required
          },
          silenceTime: {
            required
          },
          dayTime: {
            //   报警时间每天
          },
          hourTimestart: {
            //   报警时间每小时开始
          },
          hourTimeend: {
            //   报警时间每小时结束
          },
          weekTime: {
            //   报警时间每周
          },
          editrRemarks: {
            // required
          }
        },
        dayTime: "",
        hourTimestart: "",
        hourTimeend: "",
        weekTime: [], //报警时间
        abnormalTitle: "",
        initdata: "",
        radioList: [
          {
            value: "0",
            label: "每分钟",
            flag: true
          },
          {
            value: "1",
            label: "每小时",
            flag: true
          },
          {
            value: "2",
            label: "每天",
            flag: true
          },
          {
            value: "3",
            label: "每周",
            flag: true
          }
        ],
        selectList: [
          {
            proId: 1,
            proName: "张三"
          },
          {
            proId: 2,
            proName: "李四"
          }
        ],
        projectId: "", //项目名称
        taskEventName: "", //任务名称
        alarmInfoTemp: "", //报警信息模板
        stime: "", //
        etime: "",
        silenceTime: "1", //通道沉默时间
        silenceTimeArr: [
          { id: "5", value: "5分钟" },
          { id: "10", value: "10分钟" },
          { id: "15", value: "15分钟" },
          { id: "30", value: "30分钟" },
          { id: "60", value: "60分钟" },
          { id: "180", value: "3小时" },
          { id: "360", value: "6小时" }
        ],
        eventDesc: "", //时间描述
        monitorType: "0", //监控频率类型
        timeout: null,
        // 模糊搜索
        checkSuccess: "",
        testvariable: false, //测试变量
        weekArr: [false, false, false, false, false, false, false],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        editrRemarks: "", //编辑理由
        anyErr: false,
        monitortargetArr: [
          {
            id: 1,
            dataSource: "",
            monitorCode: "",
            resultVariable: "",
            dataExportflag: false,
            dataExport: "",
            ischeckCode: 1 //三个状态：1.为检查，2.检查，不可执行；3.检查可以执行
          }
        ], //监控指标数组
        monitortargetArrold: JSON.stringify([
          {
            id: 1,
            dataSource: "",
            monitorCode: "",
            resultVariable: "",
            dataExportflag: false,
            dataExport: "",
            ischeckCode: 1 //三个状态：1.为检查，2.检查，不可执行；3.检查可以执行
          }
        ]), //监控指标数组,old,用作对比
        monitortargetIndexstart: 1,
        monitorruleArr: [
          {
            data1: "",
            data2: "1",
            data3: "1",
            data4: "",
            data5: "",
            data6: 0
          }
        ], //监控规则数组
        isclickSave: false, //是否点击保存
        screenFactor: "1", //公式筛选条件
        formulaList: [
          {
            value: "1",
            label: ">"
          },
          {
            value: "2",
            label: "<"
          },
          {
            value: "3",
            label: "≥"
          },
          {
            value: "4",
            label: "≤"
          },
          {
            value: "5",
            label: "!="
          },
          {
            value: "6",
            label: "="
          },
          {
            value: "7",
            label: "包含"
          },
          {
            value: "8",
            label: "不包含"
          }
        ], //监控规则第二个选项
        restaurants: [],
        contactSearch: "", //联系对象搜索结果
        contactArr: [], //通知对象数组，
        groupList: [], //通知对象群主
        groupId: "", //选中的群组id
        dbsourceIdList: [], //数据源列表
        pageType: "", //当前页面类型，1.初始化新建；2.新建；3.编辑
        monitoringId: "", //监控事件id
        minuteCount: 1, //监控频率分钟数
        minuteFlag: true,
        groupIdwotchflag: true, //用于编辑事件时候，，查询的了通知对象，，这个将groupIdwotchflag修改为假。。表示不用watch groupId。
        minuteList: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30
        ]
      };
    },
    mounted: function() {
      console.log(this.isnumber(55555555));
      console.log(this.$route.query);
      if (this.$route.query.id) {
        this.abnormalTitle = "编辑事件";
        this.pageType = 3;
        this.monitoringId = this.$route.query.id;
        this.projectId = this.$route.query.projectId;
        this.taskEventName = this.$route.query.taskEventName;
        this.validation.editrRemarks = { required };
        // this.editInquier(this.monitoringId);//查询接口在queryUserGroupInfoList这个接口之后，不然回显有问题
      } else if (this.$route.query.projectId) {
        this.abnormalTitle = "新建事件";
        this.pageType = 2;
        this.projectId = this.$route.query.projectId;
        this.taskEventName = this.$route.query.taskEventName;
      } else {
        this.abnormalTitle = "新建事件";
        this.pageType = 1;
      }
      this.queryUserGroupInfoList();
      this.queryGroupListForSlect();
      this.queryListForSlect();
      this.queryListForOriginSlect();
    },
    watch: {
      monitorType(newName, oldName) {
        //   监控频率时间间隔类型
        if (newName == 1) {
          this.validation.hourTimestart = { required };
          this.validation.hourTimeend = { required };
          this.validation.dayTime = {};
          this.validation.weekTime = {};
          this.dayTime = "";
          this.weekTime = [false, false, false, false, false, false, false];
        } else if (newName == 2) {
          this.validation.dayTime = { required };
          this.validation.hourTimestart = {};
          this.validation.weekTime = {};
          this.validation.hourTimeend = {};
          this.hourTimestart = "";
          this.weekTime = [false, false, false, false, false, false, false];
          this.hourTimeend = "";
        } else if (newName == 3) {
          this.validation.dayTime = { required };
          this.validation.weekTime = { required };
          this.validation.hourTimestart = {};
          this.validation.hourTimeend = {};
          this.hourTimestart = "";
          this.hourTimeend = "";
        } else if (newName == 0) {
          this.validation.dayTime = {};
          this.validation.weekTime = { required };
          this.validation.hourTimestart = {};
          this.validation.hourTimeend = {};
        }
      },
      groupId(newName, oldName) {
        //   通知对象群组id

        if (newName) {
          if (this.groupIdwotchflag) {
            for (let index = 0; index < this.groupList.length; index++) {
              if (newName == this.groupList[index].value) {
                this.contactArr = [];
                this.contactSearch = "";
                for (let i = 0; i < this.groupList[index].users.length; i++) {
                  let obj = {};
                  obj.value = this.groupList[index].users[i];
                  obj.id = this.groupList[index].usersid[i];
                  this.contactArr.push(obj);
                }
                return;
              }
            }
          } else {
            this.groupIdwotchflag = true;
          }
        }
      },
      monitortargetArr: {
        handler(newName, oldName) {
          // 监控==》监控指标列表是否发生变化，并找出哪些发生变化
          this.watchMonitor(newName);
        },
        deep: true
      }
    },
    computed: {
      projectName() {
        let project = "";
        for (let index = 0; index < this.projectList.length; index++) {
          if (this.projectId == this.projectList[index].proId) {
            project = this.projectList[index].proName;
          }
        }
        return project;
      },
      projectNames() {
        if (this.projectName) {
          return "【" + this.projectName + "】";
        } else {
          return "";
        }
      }
    },
    methods: {
      queryUserGroupInfoList() {
        let that = this;
        api.queryUserGroupInfoList({}).then(function(res) {
          if (res.code == 200) {
            for (let index = 0; index < res.data.length; index++) {
              let obj = {};
              obj.id = res.data[index].id;
              obj.value = res.data[index].name;
              that.restaurants.push(obj);
            }
            if(that.pageType==3){
              
              that.editInquier(that.monitoringId);
            }
          } else {
            that.$message.error(res.msg);
          }
        });
      },
      isnumber(i) {
        let reg = /^\d+$/;
        return reg.test(i);
      },
      datefilter(date) {
        let time = new Date(date);
        let year = time.getFullYear();
        let month =
          time.getMonth() + 1 < 10
            ? "0" + (time.getMonth() + 1)
            : time.getMonth() + 1;
        let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
        let hour =
          time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
        let minute =
          time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        let second =
          time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
        return year + "-" + month + "-" + day + " " + hour + ":" + minute;
      },
      editInquier(id) {
        //查询
        let that = this;
        let obj = {
          id: id
        };
        api.queryTaskInfoById(obj).then(function(res) {
          if (res.code == 200) {
            that.eventDesc = res.data.eventDesc;
            that.screenFactor = res.data.monitorCondition;
            that.alarmInfoTemp = res.data.alarmInfo;
            that.stime = that.formatDate(res.data.stime);
            that.etime = that.formatDate(res.data.etime);
            that.silenceTime = res.data.silenceTime;
            that.monitorType = res.data.eventType.eventMonitorType.toString();

            that.hourTimeend = res.data.eventType.endH;
            that.groupIdwotchflag = false; //查询时候会改变通知群组id，这时通知对象id不用watch

            if (that.monitorType == "0") {
              that.minuteCount = res.data.eventType.exeWeekTimes;
            } else if (that.monitorType == "3") {
              //每周
              if (res.data.eventType.exeWeekTimes) {
                res.data.eventType.exeWeekTimes
                  .split(",")
                  .forEach((item, index) => {
                    const num = Number(item - 1);
                    that.weekArr[num] = true;
                  });
              }
              let arr = [];
              that.weekArr.forEach((val, index) => {
                if (val) {
                  arr.push(index + 1);
                }
              });
              that.weekTime = arr;
              that.validation.weekTime = { required };
            }
            if (that.monitorType == "3" || that.monitorType == "2") {
              that.dayTime = res.data.eventType.startH;
            } else if (that.monitorType == "1") {
              that.hourTimestart = res.data.eventType.startH;
            }
            // 通知对象
            that.groupId=res.data.eventType.noticeUserGroup;
            let tagId = res.data.noticeUsers.split(",");
            that.contactArr = [];
            for (let i = 0; i < tagId.length; i++) {
              for (let j = 0; j < that.restaurants.length; j++) {
                if (tagId[i] == that.restaurants[j].id) {
                  let obj = {};
                  obj.id = that.restaurants[j].id;
                  obj.value = that.restaurants[j].value;
                  that.contactArr.push(obj);
                }
              }
            }
            
            // 监控指标
            let jiankongArr = [];
            for (let i = 0; i < res.data.taskDetails.length; i++) {
              let obj = {};
              obj.id = i + 1;
              obj.dataSource = res.data.taskDetails[i].dbsourceId;
              obj.monitorCode = res.data.taskDetails[i].eventSrcCode;
              obj.resultVariable = res.data.taskDetails[i].eventResult;
              obj.dataExportflag =
                res.data.taskDetails[i].isExport == 1 ? true : false;
              obj.dataExport = res.data.taskDetails[i].exportSrcCode;
              obj.ischeckCode = 3;
              jiankongArr.push(obj);
            }
            that.monitortargetArr = jiankongArr;
            that.monitortargetArrold = JSON.stringify(jiankongArr);
            that.monitortargetIndexstart = res.data.taskDetails.length;
            // 下列符合条件
            let bijiaoArr = [];
            for (let i = 0; i < res.data.compareDetails.length; i++) {
              let obj = {};
              obj.data1 = res.data.compareDetails[i].compareF;
              obj.data2 = res.data.compareDetails[i].compareType;
              obj.data3 = res.data.compareDetails[i].compareE;
              if (res.data.compareDetails[i].compareE == 1) {
                obj.data4 = res.data.compareDetails[i].compareResultNumber;
              } else {
                obj.data6 = res.data.compareDetails[i].compareResultNumber;
                obj.data5 = true;
              }
              bijiaoArr.push(obj);
            }
            that.monitorruleArr = bijiaoArr;
          } else {
          }
        });
      },
      formatDate(time) {
        return new Date(time);
      },
      watchMonitor(newName) {
        let that = this;
        let flagdata = 1;
        for (let i = 0; i < newName.length; i++) {
          if (newName[i].dataExportflag) {
            if (that.monitorType == "0") {
              that.monitorType = "1";
            }
            flagdata = 2;
            that.radioList[0].flag = false;
          }
        }
        if (flagdata == 1) {
          that.radioList[0].flag = true;
        }
        for (let i = 0; i < JSON.parse(this.monitortargetArrold).length; i++) {
          for (let j = 0; j < newName.length; j++) {
            if (JSON.parse(this.monitortargetArrold)[i].id == newName[j].id) {
              // 这里很扯，this指向导致没办法，字符串转去
              let a = JSON.stringify(JSON.parse(this.monitortargetArrold)[i]);
              let b = JSON.stringify(newName[j]);
              let a1 = JSON.parse(a);
              let b1 = JSON.parse(b);
              delete a1.ischeckCode;
              delete b1.ischeckCode; //做出修改时，比对该条数据时，属性ischeckCode得去掉
              // console.log(b1);
              if (JSON.stringify(a1) != JSON.stringify(b1)) {
                newName[j].ischeckCode = 1;
              }
            }
          }
        }
        this.monitortargetArrold = JSON.stringify(newName);
      },
      //通知对象，搜索
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return restaurant => {
          return (
            restaurant.value
              .toLowerCase()
              .indexOf(queryString.toLowerCase()) === 0
          );
        };
      },
      handleSelect(item) {
        if (this.contactArr.length == 0) {
          this.contactArr.push(item);
        } else {
          for (let index = 0; index < this.contactArr.length; index++) {
            if (this.contactArr[index].id == item.id) {
              return false;
            }
          }
          this.contactArr.push(item);
        }
      },
      //通知对象，搜索，结束
      validationList1(el) {
        let that = this;
        // console.log(that.monitorruleArr[el].data3);
        //监控规则，第一条,和第三条不能同时选择，同一个监控指标
        const objList = [];
        for (let index = 0; index < this.monitortargetArr.length; index++) {
          let obj = {};
          obj.value = index + 2;
          obj.label = "监控指标" + (index + 1);
          if (obj.value != that.monitorruleArr[el].data3) {
            objList.push(obj);
          }
        }
        return objList;
      },
      validationList2(el) {
        //监控规则，第三条下拉列表
        let that = this;
        const objList = [];
        for (let index = 0; index < this.monitortargetArr.length; index++) {
          let obj = {};
          obj.value = index + 2;
          obj.label = "监控指标" + (index + 1);
          if (obj.value != that.monitorruleArr[el].data1) {
            objList.push(obj);
          }
        }
        return objList;
      },
      handleCancel() {
        let that = this;
        if (that.pageType == 1) {
          that.$router.push({
            name: "monitorIndex",
            query: {}
          });
        } else {
          that.$router.push({
            name: "abnormal",
            query: {}
          });
        }
      },
      handleSubmit() {
        console.log(this.weekArr);
        this.isclickSave = true;
        if (this.vali()) {
          this.anyErr = true;
          this.$message.error("请输入正确的参数");

          return false;
        } else if (this.contactArr.length == 0) {
          this.$message.error("请选择通知对象");
          return false;
        } else {
          for (let i = 0; i < this.monitortargetArr.length; i++) {
            if (!this.monitortargetArr[i].dataSource) {
              this.$message.error("请输入正确的参数");
              return false;
            } else if (!this.monitortargetArr[i].monitorCode) {
              this.$message.error("请输入正确的参数");
              return false;
            } else if (!this.monitortargetArr[i].resultVariable) {
              this.$message.error("请输入正确的参数");
              return false;
            } else if (this.monitortargetArr[i].dataExportflag) {
              if (!this.monitortargetArr[i].dataExport) {
                this.$message.error("请输入正确的参数");
                return false;
              }
            } else if (this.monitortargetArr[i].ischeckCode != 3) {
              this.$message.error("请检查监控代码");
              return false;
            }
          }
          for (let i = 0; i < this.monitorruleArr.length; i++) {
            if (!this.monitorruleArr[i].data1) {
              this.$message.error("请输入正确的参数");
              return false;
            } else if (this.monitorruleArr[i].data3 == 1) {
              if (!this.monitorruleArr[i].data4) {
                //监控规则第三个参数选择为常量时，常量值不能为空
                this.$message.error("请输入正确的参数");
                return false;
              }
            } else if (
              this.monitorruleArr[i].data3 != 1 &&
              this.monitorruleArr[i].data5
            ) {
              if (!this.monitorruleArr[i].data6) {
                //监控规则第三个参数选择为非常量时，第三个值的百分比值不能为空
                this.$message.error("请输入正确的参数");
                return false;
              }
            }
          }
          let that = this;
          let startHs = that.hourTimestart || that.dayTime;
          let paramsObj = {
            eventDesc: that.eventDesc,
            alarmInfo: that.alarmInfoTemp,
            monitorType: that.monitorType,
            stime: that.datefilter(that.stime),
            etime: that.datefilter(that.etime),
            startH: "",
            endH: that.hourTimeend.length < 4 ? that.hourTimeend + ":00" : "",
            weeks: "", //周期数字1-7 多个以逗号分隔/选择分钟则传分钟参数
            noticeUserGroup: that.groupId, //通知对象组id
            taskEventName: that.taskEventName,
            operateDesc: that.editrRemarks,
            projectId: that.projectId,
            projectName: that.projectName,
            silenceTime: that.silenceTime,
            monitorCondition: that.screenFactor,
            compareDetailsStr: "",
            taskDetailsStr: "",
            noticeUsers: "" //
          };
          if (startHs.length == 5) {
            //起止时间，开始
            paramsObj.startH = startHs;
          } else if (startHs.length == 2) {
            paramsObj.startH = startHs + ":00";
          } else {
            paramsObj.startH = "";
          }

          if (that.hourTimeend.length == 5) {
            //起止时间，结束
            paramsObj.endH = that.hourTimeend;
          } else if (that.hourTimeend.length == 2) {
            paramsObj.endH = that.hourTimeend + ":00";
          } else {
            paramsObj.endH = "";
          }
          console.log(that.hourTimeend);
          if (that.monitorType == "3") {
            paramsObj.weeks = that.weekTime.join(",");
          } else if (that.monitorType == "0") {
            paramsObj.weeks = that.minuteCount;
          }
          let noticeUsersList = [];
          /* 通知对象 */
          for (let index = 0; index < that.contactArr.length; index++) {
            noticeUsersList.push(that.contactArr[index].id);
          }
          paramsObj.noticeUsers = noticeUsersList.join(",");
          /* 通知对象 */

          /* 比较规则 */
          let compareDetailsStrlist = [];
          for (let index = 0; index < that.monitorruleArr.length; index++) {
            let obj = {};
            obj.compareE = that.monitorruleArr[index].data3; //第三个参数
            obj.compareF = that.monitorruleArr[index].data1; //第一个参数
            obj.compareType = that.monitorruleArr[index].data2; //比较类型
            if (that.monitorruleArr[index].data3 == 1) {
              obj.compareResultNumber = that.monitorruleArr[index].data4; //数值
            } else {
              obj.compareResultNumber = that.monitorruleArr[index].data6; //数值
            }
            compareDetailsStrlist.push(obj);
          }
          paramsObj.compareDetailsStr = JSON.stringify(compareDetailsStrlist);
          /* 比较规则 */

          /* 监控指标 */
          let taskDetailsStrlist = [];
          for (let index = 0; index < that.monitortargetArr.length; index++) {
            let obj = {};
            obj.dbsourceId = that.monitortargetArr[index].dataSource;
            obj.eventSrcCode = encodeURI(
              that.monitortargetArr[index].monitorCode
            );
            obj.eventResult = that.monitortargetArr[index].resultVariable;
            obj.isExport = that.monitortargetArr[index].dataExportflag ? 1 : 2;
            obj.exportSrcCode = encodeURI(
              that.monitortargetArr[index].dataExport
            );
            obj.order = index + 1;
            taskDetailsStrlist.push(obj);
          }
          paramsObj.taskDetailsStr = JSON.stringify(taskDetailsStrlist);
          if (that.pageType == 3) {
            paramsObj.id = that.monitoringId;
            /* 监控指标  */
            api.editTaskInfo(paramsObj).then(function(res) {
              if (res.code == 200) {
                that.$router.push({
                  name: "abnormal",
                  query: {}
                });
              } else {
                that.$message.error(res.msg);
              }
            });
          } else {
            /* 监控指标 editTaskInfo */
            api.saveTaskInfo(paramsObj).then(function(res) {
              if (res.code == 200) {
                if (that.pageType == 1) {
                  that.$router.push({
                    name: "monitorIndex",
                    query: {}
                  });
                } else {
                  that.$router.push({
                    name: "abnormal",
                    query: {}
                  });
                }
              } else {
                that.$message.error(res.msg);
              }
            });
          }
        }
      },
      handleChecked(index) {
        const arr = [];
        this.weekArr.forEach((val, index) => {
          if (val) {
            arr.push(index + 1);
          }
        });
        this.weekTime = arr;
      },
      handleClose(tag) {
        this.contactArr.splice(this.contactArr.indexOf(tag), 1);
      },
      handleCheckOrigin(i) {
        //检查代码,i:检查的监控代码中的哪个sql原句下标
        let that = this;
        let obj = {
          dataSrcId1: that.monitortargetArr[i].dataSource,
          sql1: encodeURI(that.monitortargetArr[i].monitorCode),
          ifExport: that.monitortargetArr[i].dataExportflag ? 1 : 2,
          sql2: encodeURI(that.monitortargetArr[i].dataExport)
        };
        api.checkSqlStatus(obj).then(function(res) {
          if (res.code == 200) {
            that.monitortargetArr[i].ischeckCode = 3;
            console.log(that.monitortargetArr[i]);
          } else {
            that.monitortargetArr[i].ischeckCode = 2;
            that.$message.error(res.msg);
          }
        });
      },
      changeTime(stime) {
        this.pickerOptions2 = {
          disabledDate(time) {
            return time.getTime() < new Date(stime);
          }
        };
      },
      createStateFilter(queryString) {
        return state => {
          return (
            state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          );
        };
      },
      // 模糊搜索
      vali() {
        this.$v.$touch();
        return this.$v.$invalid;
      },
      monitorAdd() {
        let that = this;
        that.monitortargetIndexstart += 1; //生成独立下标
        //增加监控指标
        var monitortargetObj = {
          id: that.monitortargetIndexstart,
          dataSource: "",
          monitorCode: "",
          resultVariable: "",
          dataExportflag: false,
          dataExport: "",
          ischeckCode: 1 //三个状态：1.为检查，2.检查，不可执行；3.检查可以执行
        };
        if (this.monitortargetArr.length < 10) {
          this.monitortargetArr.push(monitortargetObj);
        }
      },
      monitorDel(i) {
        //删除监控指标，当前下标对象
        this.monitortargetArr.splice(i, 1);
      },
      monitorrulearrAdd() {
        //增加监控规则
        let monitortargetObj = {
          data1: "",
          data2: "1",
          data3: "1",
          data4: "",
          data5: "",
          data6: 0
        };
        if (this.monitorruleArr.length < 10) {
          this.monitorruleArr.push(monitortargetObj);
        }
      },
      monitorrulearrDel(i) {
        //删除监控规则，当前下标对象
        this.monitorruleArr.splice(i, 1);
      },
      queryGroupListForSlect() {
        //通知对象
        let that = this;
        api.queryGroupListForSlect().then(function(res) {
          if (res.code == 200) {
            if (that.pageType!=3){
              that.groupId = res.data[0].userGroupId;
            }
            
            res.data.forEach(group => {
              that.groupList.push({
                value: group.userGroupId,
                label: group.groupName,
                users: group.usersName.split(","),
                usersid: group.usersIds.split(",")
              });
            });
          } else {
            that.$message.error(res.msg);
          }
        });
      },
      queryListForSlect() {
        //项目
        let that = this;
        api.queryListForSlect().then(function(res) {
          if (res.code == 200) {
            that.projectList = res.data;
          } else {
            that.$message.error(res.msg);
          }
        });
      },
      queryListForOriginSlect() {
        //数据源
        let that = this;
        api.queryListForOriginSlect().then(function(res) {
          if (res.code == 200) {
            if (res.data.length) {
              that.dbsourceIdList = res.data;
            }
          } else {
            that.$message.error(res.msg);
          }
        });
      }
    }
  };
  Vue.component("vue-monitor", result);

  return result;
});
</script>

<style scoped>
.monitoringAdd-box-border {
  border: 1px solid #dcdcdc;
  padding: 30px 30px 30px 30px;
  margin-bottom: 30px;
}
.monitoringAdd-box-bordersecond {
  border: 1px solid #dcdcdc;
  padding: 30px 30px 30px 30px;
  margin-bottom: 30px;
  position: relative;
}
.monitoringAdd-box-bordersecond-title {
  position: absolute;
  line-height: 30px;
  left: 20px;
  top: -15px;
  background: #fff;
  padding: 0 5px;
  font-size: 13px;
}
.monitoringAdd-title {
  text-align: left;
  line-height: 36px;
  padding-left: 30px;
}
.el-col-4 {
  width: 12%;
}
.form-hint {
  color: red;
  font-size: 12px;
  text-align: left;
  padding-left: 12%;
  line-height: 24px;
}
select[disabled] {
  background: #f5f7fa;
  color: #c0c4cc;
}
</style>
