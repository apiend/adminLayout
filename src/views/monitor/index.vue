<template>
    <div class="container">
        <div class="main-header">
            <el-row>
                <el-col :span="12">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li>
                                <a>监控日志</a>
                            </li>
                        </ul>
                    </nav>
                </el-col>
                <el-col :span="8" :offset="4" class="text-right">
                    <el-button type="primary" icon="el-icon-news el-icon-right" size="medium" @click="addDialog = true">
                        新建监控
                    </el-button>
                </el-col>
            </el-row>
        </div>

        <!-- main-filter -->
        <div class="main-filter">
            <el-row>
                <el-col :span="4">
                    <select v-model="projectId" class="selectDiv" ref="projectId">
                        <option value="">全部</option>
                        <option v-for="item in selectList" :value="item.proId" :key="item.proId">{{item.proName}}
                        </option>
                    </select>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="请输入关键字搜索任务" v-model="taskEventName"></el-input>
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
                    <th> 项目名称</th>
                    <th> 任务名称
                    </th>
                    <th>
                        事件数量
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in tableData">
                    <th>{{item.projectId}}</th>
                    <td>{{item.projectName}}</td>
                    <td>{{item.taskEventName}}</td>
                    <td>{{item.eventCount}}</td>
                    <td>
                        <el-button type="primary" size="mini"
                                   @click="showAbnormal(item.projectName,item.projectId,item.taskEventName)">查看
                        </el-button>
                        <el-button type="success" size="mini" @click="showHistory(item.projectId,item.projectName,item.taskEventName)">
                            记录
                        </el-button>
                        <el-button type="danger" size="mini" @click="handleDel(item.projectId,item.taskEventName)">删除
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
                    v-show="pageTotal>pageSize"
                    :current-page="pageNum"
                    layout="prev, pager, next"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="pageTotal"
            ></el-pagination>
        </div>
        <!--add dialog-->
        <el-dialog
                title="新建监控"
                width="55%"
                :visible.sync="addDialog"
                v-if="addDialog"
                top="50px"
        >
            <monitor-form @on-close="dialogClose" dialogtype="addMonitor"></monitor-form>
        </el-dialog>
        <!--add dialog end-->
    </div>
</template>


<script>

    define(["Vue", "common", "api", "validators"], function (Vue, com, api, vali) {
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
            components: {MonitorForm},
            template: template,
            data: function () {
                var time = new Date();
                return {
                    dialogTitle: '',
                    loaded: time,
                    projectId: '',
                    selectList: [],
                    taskEventName: '',
                    tableData: [],
                    pageTotal: null,
                    pageSize: 10,
                    pageNum: 1,
                    // dialog
                    addDialog: false
                };
            },

            mounted: function () {
                that = this
                that.fetchSelectList()
            },
            methods: {
                dialogClose() {
                    this.addDialog = false
                    this.fetchData()
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
                                if (item.proId === that.$route.query.name) {
                                    that.projectId = item.proId
                                    that.$nextTick(() => {
                                        setTimeout(() => {
                                            that.$refs.projectId[i + 1].selected = 'selected'
                                        }, 100)
                                    })
                                }

                            })

                            that.fetchData()
                        } else {
                            that.$message.error(res.msg);
                        }
                    })
                },
                /**
                 * 获取列表
                 */
                fetchData: function () {
                    let obj = {
                        projectId: this.projectId,
                        taskEventName: this.taskEventName,
                        pageSize: this.pageSize || 10,
                        pageNum: this.pageNum || 1
                    }
                    api.queryTaskInfoGroupList(obj).then(function (res) {
                        that.tableData = res.data.list
                        that.pageTotal = res.data.total
                    })
                },
                /**
                 * 查看
                 */
                showAbnormal: function (projectName, id, task) {
                    this.$router.push({
                        name: 'abnormal',
                        params: {
                            projectName,
                            id,
                            task
                        }
                    })
                },
                /**
                 * 纪录
                 */
                showHistory: function (id,name, task) {
                    this.$router.push({
                        name: 'history',
                        params: {
                            id,
                            name,
                            task
                        }
                    })
                },
                /**
                 * 删除
                 */
                handleDel: function (id, taskEventName) {
                    that.$confirm('确定要删除该项目吗？', '操作确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {

                        that.delThePro(id, taskEventName)

                    }).catch(function () {
                        that.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                },
                /**
                 * 删除项目
                 */
                delThePro: function (id, taskEventName) {
                    let obj = {
                        projectId: id,
                        taskEventName: taskEventName
                    }
                    api.deleteBatchInfo(obj).then(function (res) {
                        if (res.code == 200) {
                            that.$message({
                                message: "删除成功",
                                type: "success"
                            });

                            that.fetchData();
                        } else {
                            that.$message.error(res.msg);
                        }

                    })
                },
                /**
                 * dialog-获取数据源下拉
                 */
                fetchOriginList: function () {
                    let obj = {}
                    api.queryDataSrcList(obj).then(function (res) {
                        if (res.code == 200) {
                            that.tableData = res.data.list;
                            that.pageTotal = res.data.total;
                        } else {
                            that.$message.error(res.msg);
                        }
                    });
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
