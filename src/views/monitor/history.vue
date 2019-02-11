<template>
    <div class="container">
        <div class="main-header">
            <el-row>
                <el-col :span="12">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li>
                                <a>{{historyTitle}}</a>
                            </li>
                        </ul>
                    </nav>
                </el-col>
            </el-row>
        </div>
        <!-- main-content -->
        <div class="main-content">
            <table class="table is-bordered is-striped is-fullwidth">
                <thead>
                <tr>
                    <th>序号</th>
                    <th> 编辑人</th>
                    <th> 事件描述
                    </th>
                    <th>
                        编辑理由
                    </th>
                    <th>
                        时间
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in tableData">
                    <th>{{item.taskId}}</th>
                    <td>{{item.operateName}}</td>
                    <td>{{item.eventDesc}}</td>
                    <td>{{item.operateDesc }}</td>

                    <td>{{item.operateTime | dformat}}</td>
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
    </div>
</template>


<script>
    define(["Vue", "common", "api", "validators"], function (Vue, com, api) {
        "use strict";
        var that
        var result = {
            template: template,
            data: function () {
                return {
                    tableData:[],
                    pageTotal: null,
                    pageSize: 10,
                    pageNum: 1,
                };
            },
            mounted: function () {
                that = this
                that.fetchData()
            },
            computed:{
                historyTitle(){
                    if(this.$route.params.name){
                        return  `${this.$route.params.name}-${  this.$route.params.task}`
                    }else{
                        return `监控记录`
                    }
                }
            },
            methods: {
                /**
                 * 获取列表
                 */
                fetchData: function () {
                    let obj = {
                        projectId: this.$route.params.id,
                        taskEventName: this.$route.params.task,
                        pageSize: this.pageSize || 10,
                        pageNum: this.pageNum || 1
                    }
                    console.log(obj)
                    api.queryOperateLogList(obj).then(function (res) {
                       if(res.code===200){
                           console.log(res)
                           that.tableData = res.data.list
                           that.pageTotal = res.data.total
                       }else{
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
</style>
