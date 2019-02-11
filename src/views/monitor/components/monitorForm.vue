<template>
    <div>

        <!--新建监控显示-->
        <el-row v-if="dialogtype==='addMonitor'">
            <el-row>
                <el-col :span="4" class="lab-tip">项目:{{initdata}}</el-col>
                <el-col :span="16">
                    <select v-model="form.projectId" class="selectDiv" @change="projectIdChanged">
                        <option v-for="item in selectList" :value="item.proId">{{item.proName}}</option>
                    </select>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">任务名称:</el-col>
                <el-col :span="16">

                    <el-input placeholder="请输入任务名称" v-model="form.taskEventName"></el-input>
                    <div class="error" v-if="!$v.form.taskEventName.required && checkParams">任务名称不能为空</div>
                </el-col>
            </el-row>
        </el-row>

        <!--编辑监控显示-->
        <el-row v-if="dialogtype==='editEvent'">
            <el-row>
                <el-col :span="4" class="lab-tip">项目:</el-col>
                <el-col :span="16">
                    <el-input v-model="form.projectName" disabled></el-input>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">任务名称:</el-col>
                <el-col :span="16">
                    <el-input placeholder="请输入任务名称" v-model="form.taskEventName" disabled></el-input>
                </el-col>
            </el-row>
        </el-row>

        <!--新建事件显示-->
        <el-row v-if="dialogtype==='addEvent'">

            <el-row>
                <el-col :span="4" class="lab-tip">项目:</el-col>
                <el-col :span="16">
                    <el-input v-model="initdata.projectName" disabled></el-input>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">任务名称:</el-col>
                <el-col :span="16">
                    <el-input v-model="initdata.taskEventName" disabled></el-input>
                </el-col>
            </el-row>
        </el-row>
        <!--新建事件-->

        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">数据源1:</el-col>
            <el-col :span="8">
                <select v-model="form.dbsourceFId" class="selectDiv" ref="dbsourceFId">
                    <option v-for="item in originList" :value="item.value">{{item.label}}</option>
                </select>
            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">监控代码1:</el-col>
            <el-col :span="16">
                <el-input v-model.trim="$v.form.eventSrcCodeF.$model" type="textarea" rows="4"></el-input>
                <div class="error" v-if="!$v.form.eventSrcCodeF.required && checkParams">监控代码不能为空</div>
            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">结果变量名1:</el-col>
            <el-col :span="8">
                <el-input v-model.trim="$v.form.eventFResult.$model"></el-input>
                <div class="error" v-if="!$v.form.eventFResult.required && checkParams">结果变量名不能为空</div>
            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">公式:</el-col>
            <el-col :span="3">
                <select v-model="form.compareType" class="selectDiv" @change="selectFormula" ref="compareType">
                    <option v-for="item in formulaList" :value="item.value">{{item.label}}</option>
                </select>
            </el-col>
            <el-col :span="3" style="margin-left: 10px;">
                <select v-model="form.compareResultType" class="selectDiv" @change="changeResultType"
                        ref="compareResultType">
                    <option v-for="item in typeList" :value="item.value">{{item.label}}</option>
                </select>
            </el-col>
            <el-col :span="3" style="margin-left: 10px;" v-show="form.compareResultType===0">
                <el-input v-model="form.compareResultFinal"></el-input>
                <div class="error" v-if="!$v.form.compareResultFinal.required && checkParams">常量值不能为空</div>

            </el-col>
        </el-row>
        <el-row v-show="form.compareResultType===1">
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">数据源2:</el-col>
                <el-col :span="8">
                    <select v-model="form.dbsourceEId" class="selectDiv" ref="dbsourceEId">
                        <option v-for="item in originList" :value="item.value">{{item.label}}</option>
                    </select>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">监控代码2:</el-col>
                <el-col :span="16">
                    <el-input v-model="form.eventSrcCodeE" type="textarea" rows="4" @change="recheckSql"></el-input>
                    <div class="error" v-if="!$v.form.eventSrcCodeE.required && checkParams">监控代码2不能为空</div>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">结果变量名2:</el-col>
                <el-col :span="8">
                    <el-input v-model="form.eventEResult"></el-input>
                    <div class="error" v-if="!$v.form.eventEResult.required && checkParams">结果变量名2不能为空</div>
                </el-col>
            </el-row>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">事件描述:</el-col>
            <el-col :span="8">
                <el-input v-model="form.eventDesc"></el-input>
                <div class="error" v-if="!$v.form.eventDesc.required && checkParams">事件描述不能为空</div>
            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">报警信息:</el-col>
            <el-col :span="16">
                <el-input v-model="form.alarmInfoTemp" disabled></el-input>
            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip"></el-col>
            <el-col :span="2">
                <el-button type="primary" @click="handleCheckOrigin">检查</el-button>
            </el-col>
            <el-col :span="4" v-if="checkSuccess ==='success'">
                <el-button type="success" icon="el-icon-check" circle size="mini"
                           style="margin-top: 5px;"></el-button>
                <span class="confirm-text">可以执行</span>
            </el-col>
            <el-col :span="4" v-if="checkSuccess ==='fail'">
                <el-button type="danger" icon="el-icon-close" circle size="mini"
                           style="margin-top: 5px;"></el-button>
                <span class="confirm-text">无法执行</span>
            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">开始时间:</el-col>
            <el-col :span="4">
                <el-date-picker
                        :picker-options="pickerOptions"
                        v-model="form.stime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        @change="changeTime"
                        value-format="yyyy-MM-dd HH:mm"
                        placeholder="选择日期时间">
                </el-date-picker>
                <div class="error" v-if="!$v.form.stime.required && checkParams">开始时间不能为空</div>

            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">结束时间:</el-col>
            <el-col :span="4">
                <el-date-picker
                        :picker-options="pickerOptions2"
                        v-model="form.etime"
                        format="yyyy-MM-dd HH:mm"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm"
                        placeholder="选择日期时间">
                </el-date-picker>
                <div class="error" v-if="!$v.form.etime.required && checkParams">结束时间不能为空</div>

            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">监控频率:</el-col>
            <el-col :span="10" class="lab-tip">
                <el-radio v-for="item in radioList" :label="item.value" v-model="form.monitorType"
                          style="float: left;margin-top: 10px;" @change="changeRadio">{{item.label}}
                </el-radio>
            </el-col>
        </el-row>
        <!--每小时-->
        <el-row class="mt10" v-if="form.monitorType==='1'">
            <el-col :span="4" class="lab-tip">时间段:</el-col>
            <el-col :span="16" class="lab-tip">
                <el-time-picker
                        style="width: 160px;float: left;"
                        v-model="form.startH"
                        :picker-options="{
    }"
                        value-format="HH"
                        format="HH:mm"
                        placeholder="起始时间点">
                </el-time-picker>
                <el-time-picker
                        style="width: 160px;float: left;margin-left: 20px;"
                        v-model="form.endH"
                        :picker-options="{
    }"
                        value-format="HH"
                        format="HH:mm"
                        placeholder="结束时间点">
                </el-time-picker>
            </el-col>
            <div class="error" v-if="!$v.form.startH.required && checkParams">起始时间点不能为空</div>
            <div class="error" v-if="!$v.form.endH.required && checkParams">结束时间点不能为空</div>
        </el-row>

        <!--每天-->
        <el-row class="mt10" v-if="form.monitorType === '2'">
            <el-col :span="4" class="lab-tip">时间节点:</el-col>
            <el-col :span="16" class="lab-tip">
                <el-time-picker
                        style="width: 160px;float: left;"
                        v-model="form.startH"
                        :picker-options="{
    }"
                        value-format="HH:mm"
                        format="HH:mm"
                        placeholder="时间节点">
                </el-time-picker>
                <div class="error" v-if="!$v.form.startH.required && checkParams">时间节点不能为空</div>
            </el-col>
        </el-row>
        <!--每周-->
        <el-row v-if="form.monitorType === '3'">
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">时间节点:</el-col>
                <el-col :span="16" class="lab-tip">
                    <el-time-picker
                            style="width: 160px;float: left;"
                            v-model="form.startH"
                            :picker-options="{
    }"
                            value-format="HH:mm"
                            format="HH:mm"
                            placeholder="时间节点">
                    </el-time-picker>
                </el-col>
            </el-row>
            <div class="error" v-if="!$v.form.startH.required && checkParams">时间节点不能为空</div>

            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">每周:</el-col>
                <el-col :span="16" class="lab-tip">
                    <el-checkbox label="周一" @change="handleChecked(0)" v-model="weekArr[0]"></el-checkbox>
                    <el-checkbox label="周二" @change="handleChecked(1)" v-model="weekArr[1]"></el-checkbox>
                    <el-checkbox label="周三" @change="handleChecked(2)" v-model="weekArr[2]"></el-checkbox>
                    <el-checkbox label="周四" @change="handleChecked(3)" v-model="weekArr[3]"></el-checkbox>
                    <el-checkbox label="周五" @change="handleChecked(4)" v-model="weekArr[4]"></el-checkbox>
                    <el-checkbox label="周六" @change="handleChecked(5)" v-model="weekArr[5]"></el-checkbox>
                    <el-checkbox label="周日" @change="handleChecked(6)" v-model="weekArr[6]"></el-checkbox>
                </el-col>

            </el-row>
            <div class="error" v-if="!$v.form.weeks.required && checkParams">日期选择不能为空</div>

        </el-row>
        <!--每周结束-->
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip">通知对象:</el-col>
            <el-col :span="10" class="lab-tip">
                <select v-model="form.noticeUserGroup" class="selectDiv" @change="handleSelectGroup" id="groupSelect"
                        ref="noticeUserGroup">
                    <option v-for="item in groupList" :value="item.value">{{item.label}}</option>
                </select>
            </el-col>
        </el-row>
        <el-row class="mt10" style="min-height: 80px;">
            <el-col :span="4" class="lab-tip"></el-col>
            <el-col :span="20" class="lab-tip">
                <el-tag v-for="user in userNames" type="primary" style="float: left;margin-right: 5px;margin-top: 5px;">
                    {{user}}
                </el-tag>
            </el-col>
        </el-row>
        <el-row class="mt10" v-show="dialogtype ==='editEvent'" style="margin-bottom: 45px;">
            <el-col :span="4" class="lab-tip">编辑理由</el-col>
            <el-col :span="10" class="lab-tip">
                <el-input v-model="form.operateDesc"></el-input>
                <div class="error" v-if="!$v.form.operateDesc.required && checkParams">编辑理由不能为空</div>
            </el-col>
        </el-row>
        <el-row class="mt10">
            <el-col :span="4" class="lab-tip"></el-col>
            <el-col :span="2" class="lab-tip">
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </el-col>
            <el-col :span="2" :offset="1" class="lab-tip">
                <el-button @click="handleCancel">取消</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>

    define(["Vue", "common", "api", "validators"], function (Vue, com, api, vali) {
        "use strict";
        // 校验
        const required = vali.required

        var that
        var result = {
            template: template,
            props: ['dialogtype', 'initdata'],
            validations() {
                //三个表单验证不同
                if (this.dialogtype === 'addMonitor') {
                    this.validateList.form.taskEventName = {required}
                    return this.validateList
                } else {
                    this.validateList.form.taskEventName = {}
                    return this.validateList
                }
            },

            data: function () {
                return {
                    //验证条件
                    validateList:
                        {
                            form: {
                                taskEventName: {},
                                eventFResult: {
                                    required
                                },
                                eventSrcCodeF: {
                                    required
                                },
                                compareResultFinal: {
                                    required
                                },
                                eventEResult: {},
                                eventSrcCodeE: {},
                                stime: {
                                    required
                                },
                                eventDesc: {
                                    required
                                },
                                etime: {
                                    required
                                },
                                startH: {},
                                endH: {},
                                weeks: {},
                                operateDesc: {}
                            }
                        }
                    ,
                    // dialog
                    innerVisible: false,
                    selectList: [],
                    groupList: [],
                    checkParams: false,
                    form: {
                        stime: '',
                        etime: '',
                        noticeUserGroup: '',
                        compareType: '1',
                        taskEventName: '',
                        eventFResult: '',
                        compareResultFinal: '',
                        eventDesc: '',
                        eventSrcCodeF: '',
                        eventSrcCodeE: '',
                        eventEResult: '',
                        radioValue: '1',
                        compareResultType: 0,
                        alarmInfoTemp: '【太和物联】yyyy-mm-dd“项目名称“{变量名1}数据异常，异常值：{变量名1的数值}，高于阈值“阈值””，超出“n%”；',
                        alarmInfo: '【太和物联】%s“%s“{%s}数据异常，异常值：{%s}，高于阈值“%s””，超出“%s”；',
                        monitorType: '0',
                        startH: '',
                        endH: '',
                        weeks: [],
                        operateDesc: ''
                    },
                    checkSuccess: '',
                    weekArr: [false, false, false, false, false, false, false],
                    originList: [],
                    formulaList: [{
                        value: '1',
                        label: '>'
                    }, {
                        value: '2',
                        label: '<'
                    }, {
                        value: '3',
                        label: '≥'
                    }, {
                        value: '4',
                        label: '≤'
                    }, {
                        value: '5',
                        label: '!='
                    }, {
                        value: '6',
                        label: '='
                    }],
                    typeList: [{
                        value: 0,
                        label: '常量'
                    }, {
                        value: 1,
                        label: '变量'
                    }],
                    radioList: [{
                        value: '0',
                        label: '每分钟'
                    }, {
                        value: '1',
                        label: '每小时'
                    }, {
                        value: '2',
                        label: '每天'
                    }, {
                        value: '3',
                        label: '每周'
                    }],
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                        }
                    },
                    pickerOptions2: {
                        disabledDate(time) {
                            return time.getTime() < Date.now()
                        }
                    }
                }
            },
            computed: {
                userNames() {
                    let arr = []
                    this.groupList.forEach(val => {
                        if (val.value == this.form.noticeUserGroup) {
                            arr = val.users
                        }
                    })
                    return arr
                }
            },
            mounted: function () {
                that = this
                if (that.dialogtype === 'addMonitor') {
                    that.fetchSelectList()
                } else if (that.dialogtype === 'editEvent') {
                    this.validateList.form.operateDesc = {required}
                    that.fetchEditList()
                } else {
                    this.form.projectName = that.initdata.projectName
                    this.form.projectId = that.initdata.projectId
                    this.form.taskEventName = that.initdata.taskEventName
                }
                this.fetchOriginSelectList()
                this.fetchGroupSelectList()

            },
            methods: {
                /**
                 *  验证数据
                 */
                vali: function () {
                    return this.$v.$invalid;
                },
                /**
                 * 编辑拉取数据
                 */
                fetchEditList() {
                    const obj = {
                        id: this.initdata
                    }
                    api.queryTaskInfoById(obj).then(res => {
                        if (res.code === 200) {


                            if (res.data.eventType.exeWeekTimes) {
                                res.data.eventType.exeWeekTimes.split(',').forEach((item, index) => {
                                    const num = Number(item - 1)
                                    this.weekArr[num] = true
                                })
                            }
                            const arr = []
                            this.weekArr.forEach((val, index) => {
                                if (val) {
                                    arr.push(index + 1)
                                }
                            })
                            this.form.weeks = arr
                            // 更新所有下拉框内容
                            that.$nextTick(() => {
                                setTimeout(() => {
                                    const dbsourceFId = that.$refs.dbsourceFId
                                    const dbsourceFIdlen = that.$refs.dbsourceFId.length
                                    for (let i = 0; i < dbsourceFIdlen; i++) {
                                        if (dbsourceFId[i].value == res.data.dbsourceFId) {
                                            dbsourceFId[i].selected = 'selected'
                                        }
                                    }
                                    this.form.dbsourceFId = res.data.dbsourceFId

                                    const compareType = that.$refs.compareType
                                    const compareTypelen = that.$refs.compareType.length
                                    for (let i = 0; i < compareTypelen; i++) {
                                        if (compareType[i].value == res.data.compareType) {
                                            compareType[i].selected = 'selected'
                                        }
                                    }

                                    const compareResultType = that.$refs.compareResultType
                                    const compareResultTypelen = that.$refs.compareResultType.length
                                    for (let i = 0; i < compareResultTypelen; i++) {
                                        if (compareResultType[i].value == res.data.compareResultType) {
                                            compareResultType[i].selected = 'selected'
                                        }
                                    }

                                    const noticeUserGroup = that.$refs.noticeUserGroup
                                    const noticeUserGrouplen = noticeUserGroup.length
                                    for (let i = 0; i < noticeUserGrouplen; i++) {
                                        if (noticeUserGroup[i].value == res.data.eventType.noticeUserGroup) {
                                            noticeUserGroup[i].selected = 'selected'
                                        }
                                    }

                                    if (res.data.dbsourceEId !== '') {
                                        const dbsourceEId = that.$refs.dbsourceEId
                                        const dbsourceEIdlen = that.$refs.dbsourceEId.length
                                        for (let i = 0; i < dbsourceEIdlen; i++) {
                                            if (dbsourceEId[i].value == res.data.dbsourceEId) {
                                                dbsourceEId[i].selected = 'selected'
                                            }
                                        }
                                        this.form.dbsourceEId = res.data.dbsourceEId
                                    }

                                }, 200)
                            })
                            this.changeResultType({
                                target: {
                                    value: this.form.compareResultType
                                }
                            })
                            this.form.projectId = res.data.projectId
                            this.form.projectName = res.data.projectName
                            this.form.compareType = res.data.compareType
                            this.form.dbsourceFId = res.data.dbsourceFId
                            this.form.selectFormula = res.data.selectFormula
                            this.form.dbsourceEId = res.data.dbsourceEId
                            this.form.taskEventName = res.data.taskEventName
                            this.form.compareResultType = res.data.compareResultType
                            if (res.data.compareResultType === 1) {
                                this.validateList.form.eventEResult = {required}
                                this.validateList.form.eventSrcCodeE = {required}
                                this.validateList.form.compareResultFinal = {}
                            }
                            this.form.eventSrcCodeF = res.data.eventSrcCodeF
                            this.form.eventFResult = res.data.eventFResult
                            this.form.eventSrcCodeE = res.data.eventSrcCodeE
                            this.form.eventEResult = res.data.eventEResult
                            this.form.eventDesc = res.data.eventDesc
                            this.form.monitorType = res.data.monitorType.toString()
                            this.changeRadio(this.form.monitorType)
                            this.form.compareResultFinal = res.data.compareResultFinal
                            this.form.stime = this.formatDate(res.data.stime)
                            this.form.etime = this.formatDate(res.data.etime)
                            this.form.startH = res.data.eventType.startH
                            this.form.endH = res.data.eventType.endH
                            this.form.noticeUserGroup = res.data.eventType.noticeUserGroup
                            this.form.operateDesc = res.data.operateDesc
                        }

                    })
                },
                formatDate(time) {
                    return new Date(time)
                },
                /**
                 * 获取下拉
                 */
                fetchSelectList: function () {
                    api.queryListForSlect().then(function (res) {
                        if (res.code == 200) {
                            res.data.forEach(function (item, i) {
                                item.value = item.proId
                                that.selectList.push(item)
                            })
                            that.form.projectId = that.selectList[0].proId
                            that.form.projectName = that.selectList[0].proName
                        } else {
                            that.$message.error(res.msg);
                        }
                    })
                },
                /**
                 * 获取数据源下拉
                 */
                fetchOriginSelectList: function () {
                    api.queryListForOriginSlect({comId: ''}).then(function (res) {
                        if (res.code == 200) {

                            res.data.forEach(function (item, i) {
                                item.value = item.dataSrcName
                                that.originList.push({
                                    value: item.dataSrcId,
                                    label: item.dataSrcName
                                })
                                that.form.dbsourceFId = that.originList[0].value
                                that.form.dbsourceEId = that.originList[0].value
                            })
                        } else {
                            that.$message.error(res.msg);
                        }
                    })
                },
                /**
                 * 获取群组下拉
                 */
                handleChecked(index) {
                    const arr = []
                    this.weekArr.forEach((val, index) => {
                        if (val) {
                            arr.push(index + 1)
                        }
                    })
                    this.form.weeks = arr
                },
                handleSelectGroup(group) {
                    this.form.noticeUserGroup = group.target.value
                },
                fetchGroupSelectList: function () {
                    api.queryGroupListForSlect().then(function (res) {

                        if (res.code == 200) {
                            res.data.forEach(group => {
                                that.groupList.push({
                                    value: group.userGroupId,
                                    label: group.groupName,
                                    users: group.usersName.split(',')
                                })

                            })
                            if (that.dialogtype !== 'editEvent') {
                                that.form.noticeUserGroup = that.groupList[0].value
                            }
                        } else {
                            that.$message.error(res.msg);
                        }
                    });
                },
                /**
                 * 检查sql
                 */
                handleCheckOrigin: function () {
                    let obj = {
                        compareResultType: that.form.compareResultType,
                        dataSrcId1: that.form.dbsourceFId,
                        sql1: encodeURI(that.form.eventSrcCodeF),
                        dataSrcId2: that.form.dbsourceEId,
                        sql2: encodeURI(that.form.eventSrcCodeE)
                    }
                    api.checkSqlStatus(obj).then(function (res) {
                        if (res.code == 200) {
                            that.checkSuccess = 'success'
                        } else {
                            that.checkSuccess = 'fail'
                            that.$message.error(res.msg);
                        }
                    })
                },
                /**
                 * 表单提交
                 */
                handleSubmit: function () {
                    // 选择每小时时 开始结束时间不带分钟
                    if (this.form.monitorType == '1') {
                        this.form.stime = that.datefilter(this.form.stime)
                        this.form.etime = that.datefilter(this.form.etime)
                        this.form.stime = this.form.stime.substr(0, 14) + '00'
                        this.form.etime = this.form.etime.substr(0, 14) + '00'
                        this.form.startH.length < 4 ? this.form.startH = this.form.startH + ':00' : null
                        this.form.endH.length < 4 ? this.form.endH = this.form.endH + ':00' : null
                    }
                    // 查询语句编码
                    const encodeedUri = {
                        eventSrcCodeF : encodeURI(this.form.eventSrcCodeF),
                        eventSrcCodeE : encodeURI(this.form.eventSrcCodeE)
                    }
                    // 格式化开始结束时间
                    const setime = {
                        stime : that.datefilter(this.form.stime),
                        etime : that.datefilter(this.form.etime)
                    }
                    const params = {

                    }
                    let func
                    if (that.dialogtype === 'editEvent') {
                        this.checkParams = true
                        Object.assign(params,this.form, {id: that.initdata},encodeedUri,setime)
                        func = api.editTaskInfo
                    } else {
                        this.checkParams = true
                        func = api.saveTaskInfo
                    }
                    if (that.checkSuccess === 'success') {
                        if (!that.vali()) {
                            func( Object.assign(params,this.form,encodeedUri,setime)).then(res => {
                                if (res.code === 200) {
                                    this.$message.success(res.msg)
                                    this.$emit('on-close')
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }
                    } else {

                        this.$message.warning('请先检查sql语句')
                    }
                },
                datefilter(date) {
                    let time = new Date(date)
                    let year = time.getFullYear();
                    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
                    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
                    let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
                    let minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
                    let second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
                    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
                },
                /**
                 *  清除表单
                 */
                clearForm() {
                    this.checkParams = false
                    this.form.taskEventName = ''
                    this.form.eventFResult = ''
                    this.form.compareResultFinal = ''
                    this.form.eventSrcCodeF = ''
                    this.form.startH = ''
                    this.form.end = ''
                },
                /**
                 *  更改sql重新检测
                 */
                recheckSql() {
                    this.checkSuccess = ''
                },
                /**
                 *  切换常量/变量
                 */
                changeResultType(event) {
                    if (event.target.value == '0') {
                        this.validateList.form.eventEResult = {}
                        this.validateList.form.eventSrcCodeE = {}
                        this.validateList.form.compareResultFinal = {required}
                    } else {
                        this.validateList.form.eventEResult = {required}
                        this.validateList.form.eventSrcCodeE = {required}
                        this.validateList.form.compareResultFinal = {}
                    }
                },
                /**
                 *  切换频率
                 */
                changeRadio(radio) {
                    switch (radio) {
                        case '0':
                            this.form.startH = ''
                            this.form.endH = ''
                            this.form.weeks = ''

                            this.validateList.form.startH = {}
                            this.validateList.form.endH = {}
                            this.validateList.form.weeks = {}
                            break
                        case '1':
                            this.form.weeks = ''

                            this.validateList.form.startH = {required}
                            this.validateList.form.endH = {required}
                            this.validateList.form.weeks = {}
                            break
                        case '2':
                            this.form.endH = ''
                            this.form.weeks = ''

                            this.validateList.form.startH = {required}
                            this.validateList.form.endH = {}
                            this.validateList.form.weeks = {}
                            break
                        case '3':
                            this.form.endH = ''

                            this.validateList.form.startH = {required}
                            this.validateList.form.endH = {}
                            this.validateList.form.weeks = {required}
                            break
                    }
                },
                selectFormula(event) {
                    let alarmInfo, alarmInfoTemp
                    switch (event.target.value) {
                        case '1':
                            alarmInfoTemp = '【太和物联】%s“%s“{%s}数据异常，异常值：{%s}，高于阈值“%s””，超出“%s”；'
                            alarmInfo = '【太和物联】yyyy-mm-dd“项目名称“{变量名1}数据异常，异常值：{变量名1的数值}，高于阈值“阈值””，超出“n%”；'
                            break
                        case '2':
                            alarmInfoTemp = '【太和物联】%s“%s“{%s}数据异常，异常值：{%s}，低于阈值“%s”；'
                            alarmInfo = '【太和物联】yyyy-mm-dd“项目名称“{变量名1}数据异常，异常值：{变量名1的数值}，低于阈值“阈值”；'
                            break
                        case '3':
                            alarmInfoTemp = '【太和物联】%s“%s“{%s}数据异常，异常值：{%s}，高于或等于阈值“%s””，超出“%s”；'
                            alarmInfo = '【太和物联】yyyy-mm-dd“项目名称“{变量名1}数据异常，异常值：{变量名1的数值}，高于或等于阈值“阈值””，超出“n%”；'
                            break
                        case '4':
                            alarmInfoTemp = '【太和物联】%s“%s“{%s}数据异常，异常值：{%s}，低于或等于阈值“%s”；'
                            alarmInfo = '【太和物联】yyyy-mm-dd“项目名称“{变量名1}数据异常，异常值：{变量名1的数值}，低于或等于阈值“阈值”；'
                            break
                        case '5':
                            alarmInfoTemp = '【太和物联】%s“%s“{%s}数据异常，异常值：{%s}，非阈值“%s”；'
                            alarmInfo = '【太和物联】yyyy-mm-dd“项目名称“{变量名1}数据异常，异常值：{变量名1的数值}，非阈值“阈值”；'
                            break
                        case '6':
                            alarmInfoTemp = '【太和物联】%s“%s“{%s}数据异常，异常值：{%s}，达到阈值“%s”；'
                            alarmInfo = '【太和物联】yyyy-mm-dd“项目名称“{变量名1}数据异常，异常值：{变量名1的数值}，达到阈值“阈值”；'
                            break
                    }
                    this.form.alarmInfo = alarmInfoTemp
                    this.form.alarmInfoTemp = alarmInfo
                },
                handleCancel: function () {
                    this.clearForm()
                    this.$emit('on-close')
                },
                changeTime(stime) {
                    this.pickerOptions2 = {
                        disabledDate(time) {
                            return time.getTime() < new Date(stime)
                        }
                    }
                },
                projectIdChanged() {
                    this.selectList.forEach(select => {
                        if (select.value === this.form.projectId) {
                            this.form.projectName = select.proName
                        }
                    })
                }
            }
        };


        Vue.component("vue-monitor-form", result);

        return result;

    });
</script>

<style scoped>
</style>
