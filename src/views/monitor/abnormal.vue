<template>
    <div class="container">
        <div class="main-header">
            <el-row>
                <el-col :span="12">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li>
                                <a>{{abnormalTitle}}</a>
                            </li>
                        </ul>
                    </nav>
                </el-col>
                <el-col :span="8" :offset="4" class="text-right">
                    <el-button type="primary" icon="el-icon-news el-icon-right" size="medium" @click="handleAddEvent">
                        新建事件
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <!-- main-filter -->
        <div class="main-filter">
            <el-row>
                <el-col :span="8">
                    <el-input placeholder="请输入关键字搜索事件" v-model="eventDesc"></el-input>
                </el-col>
                <el-col :span="4">
                    <select v-model="operateStatus" class="selectDiv">
                        <option v-for="item in selectList" :value="item.value">{{item.label}}</option>
                    </select>
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
                    <th> 事件描述</th>
                    <th> 事件状态
                    </th>
                    <th>
                        开始时间
                    </th>
                    <th>
                        截止时间
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in tableData">
                    <th>{{item.id}}</th>
                    <td>{{item.eventDesc}}</td>
                    <td>{{item.operateStatus | eventStatus}}</td>
                    <td>{{item.stime |dformat}}</td>
                    <td>{{item.etime |dformat}}</td>
                    <td>
                        <el-button type="primary" size="mini" @click="handleEdit(item.id)">编辑</el-button>
                        <el-button type="success" size="mini" @click="handleUpdate(item.id,'start')"
                                   v-if="item.operateStatus===0">开启
                        </el-button>
                        <el-button type="warning" size="mini" @click="handleUpdate(item.id,'off')"
                                   v-if="item.operateStatus===1">关闭
                        </el-button>
                        <el-button type="danger" size="mini" @click="handleUpdate(item.id,'del')">删除
                        </el-button>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-show="pageTotal===0">暂无数据</div>
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
        <!--add dialog-->
        <el-dialog
                v-if="addDialog"
                :title="dialogTitle"
                width="55%"
                :visible.sync="addDialog"
                top="50px"
        >
            <monitor-form @on-close="handleCloseDialog"
                          :dialogtype="dialogType"
                          :initData="dialogData"
            ></monitor-form>
        </el-dialog>
        <!--add dialog end-->
    </div>
</template>


<script>
    define(["Vue", "common", "api", "validators"], function (Vue, com, api) {
        "use strict";

        // dialog中form表单
        const asyncComp = function (componentName) {
            return function (resolve) {
                require([componentName], resolve);
            };
        };
        const MonitorForm = asyncComp("v@!../views/monitor/components/monitorForm")

        var that
        var result = {
            template: template,
            components: {MonitorForm},
            data: function () {
                var time = new Date();
                return {
                    abnormalTitle:'',
                    dialogTitle: '新建事件',
                    loaded: time,

                    selectList: [{
                        label: '全部',
                        value: ''
                    }, {
                        label: '开启',
                        value: 1
                    }, {
                        label: '关闭',
                        value: 0
                    }, {
                        label: '已完成',
                        value: 2
                    }],
                    eventDesc: '',
                    operateStatus: '',
                    tableData: [],
                    pageTotal: null,
                    pageSize: 10,
                    pageNum: 1,
                    // dialog
                    addDialog: false,
                    dialogData: {},
                    dialogType: ''
                }
            },
            mounted: function () {
                that = this
                that.checkParams()
            },
            watch: {
                '$route': 'fetchData'
            },
            methods: {
                checkParams() {
                    if (this.$route.params.id === undefined) {
                        this.$router.push('/monitor/index')
                        return
                    } else {
                        that.fetchData()
                    }
                },
                /**
                 * 获取列表
                 */
                fetchData: function () {
                    let obj = {
                        projectId: this.$route.params.id,
                        taskEventName: this.$route.params.task,
                        eventDesc: this.eventDesc,
                        operateStatus: this.operateStatus,
                        pageSize: this.pageSize || 10,
                        pageNum: this.pageNum || 1
                    }
                    api.queryTaskInfoList(obj).then(function (res) {
                        if (res.code === 200) {
                            if(res.data.list[0]){
                                that.abnormalTitle = `${res.data.list[0].projectName}-${res.data.list[0].taskEventName}`
                            }
                            that.tableData = res.data.list
                            that.pageTotal = res.data.total
                        }

                    })
                },
                /**
                 * 新建事件
                 */
                handleAddEvent: function () {
                    this.dialogTitle = '新建事件'
                    that.dialogData = {
                        projectName: this.$route.params.projectName,
                        projectId: this.$route.params.id,
                        taskEventName: this.$route.params.task,
                    }
                    that.dialogType = 'addEvent'
                    that.addDialog = true

                },
                handleEdit: function (item) {
                    this.dialogTitle = '编辑事件'
                    that.dialogData = item
                    that.dialogType = 'editEvent'
                    that.addDialog = true
                },
                /**
                 * 开启
                 */
                handleUpdate: function (id, event) {
                    var title, context
                    switch (event) {
                        case 'start':
                            title = '开启确认'
                            context = '确定要开启这个事件吗？'
                            break
                        case 'off':
                            title = '关闭确认'
                            context = '确定要关闭这个事件吗?'
                            break
                        case 'del':
                            title = '删除确认'
                            context = '确定要删除这个事件吗?'
                            break
                    }
                    that.$confirm(context, title, {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {
                        if (event === 'del') {
                            that.deleteTheEvent(id)
                        } else {
                            that.updateTheEvent(event, id)
                        }
                    }).catch(function () {
                        that.$message({
                            type: 'info',
                            message: '操作已取消'
                        });
                    });
                },
                deleteTheEvent(id) {
                    let obj = {
                        id: id
                    }
                    api.deleteTaskInfo(obj).then(function (res) {
                        if (res.code == 200) {
                            that.$message({
                                message: res.msg,
                                type: "success"
                            });
                            that.fetchData();
                        } else {
                            that.$message.error(res.msg);
                        }
                    })
                },
                handleCloseDialog(){
                    this.addDialog = false
                    this.fetchData()
                },
                updateTheEvent: function (event, id) {
                    let obj = {
                        id: id,
                        operateStatus: event === 'off' ? 0 : 1
                    }
                    api.updateTaskInfo(obj).then(function (res) {
                        if (res.code == 200) {
                            that.$message({
                                message: res.msg,
                                type: "success"
                            });
                            that.fetchData();
                        } else {
                            that.$message.error(res.msg);
                        }
                    })
                },
                doSearch: function () {
                    that.fetchData()
                },
                // 分页
                handleSizeChange(val) {
                    this.pageSize = val
                    this.fetchData()
                },
                handleCurrentChange(val) {
                    this.pageNum = val
                    this.fetchData()
                },
                handleFilter() {
                    this.pageNum = 1
                    this.fetchData()
                }
            }
        };


        Vue.component("vue-monitor", result);

        return result;

    });
</script>

<style scoped>
    .confirm-text {
        margin-left: 5px;
        font-size: 14px;
        color: #606266;
    }
</style>
