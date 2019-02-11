<template>
    <div class="container" v-cloak>
        <!-- main header -->
        <div class="main-header">
            <el-row>
                <el-col :span="12">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li>
                                <a>项目管理</a>
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
                    >新建项目
                    </el-button>
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
                        <el-button type="success" size="mini" @click="goLink('/monitor',{name:item.proId})">监控任务
                        </el-button>
                        <el-button type="info" size="mini" @click="editProInfo(item)">编辑</el-button>
                        <el-button type="warning" size="mini" @click="doPop(item.proId,0)"
                                   v-if="item.proOperStatus == 1 ">关闭
                        </el-button>
                        <el-button type="danger" size="mini" @click="doPop(item.proId,1)" v-else>开启</el-button>
                        <el-button type="danger" size="mini" @click="delWarning(item.proId)"
                                   v-if="item.proOperStatus == 0 ">删除
                        </el-button>
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
        <el-dialog :title="editProId?'编辑项目':'新建项目'" :visible.sync="createVisible" width="50%"
                   :before-close="createClose"
                   :close-on-click-modal="closeOnClickModal">
            <el-row>
                <el-col>
                    <el-col :span="4" class="lab-tip">项目名称:</el-col>
                    <el-col :span="16">
                        <el-input placeholder="请输入项目名称" v-model.trim="$v.projectName.$model"></el-input>
                        <div class="error" v-if="!$v.projectName.maxLength">长度不能超过50位</div>
                    </el-col>
                </el-col>
                <el-col class="mt10">
                    <el-col :span="4" class="lab-tip">项目地址:</el-col>
                    <el-col :span="16">
                        <el-input placeholder="请输入项目地址  http://xxx.com "
                                  v-model.trim="$v.projectHost.$model"></el-input>
                        <div class="error" v-if="!$v.projectHost.maxLength">长度不能超过100位</div>
                    </el-col>
                </el-col>
            </el-row>

            <span slot="footer" class="dialog-footer">
        <el-button @click="createClose">取 消</el-button>
        <el-button type="primary" @click="updateProInfo" v-if="editProId">确 定</el-button>
        <el-button type="primary" @click="submitProject" v-else>确 定</el-button>
        
      </span>
        </el-dialog>

        <!-- newCreate end -->
    </div>
</template>


<script>
    define(["Vue", "common", "api", "validators"], function (Vue, com, api, vali) {
        "use strict";

        //简易版校验
        const required = vali.required;
        const url = vali.url;
        const maxLength = vali.maxLength
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
            data: function () {
                return {
                    now: new Date(),
                    closeOnClickModal: false,
                    editTip: "新建项目",
                    editProId: "",
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
                    required,
                    maxLength: maxLength(50)
                },
                projectHost: {
                    required,
                    url,
                    maxLength: maxLength(100)
                }
            },
            mounted: function () {
                // this.refresh();
                that = this;

                this.fetchData("")
            },
            methods: {
                /**
                 *  验证数据
                 */
                vali: function () {
                    console.log("invalid");
                    return this.$v.$invalid;
                },
                /**
                 * 清除用户输入的数据
                 */
                cleanInput: function () {
                    that.projectName = "";
                    that.projectHost = "";
                },
                /**
                 * 搜索更新
                 */
                doSearch: function () {
                    this.pageNum = 1;
                    this.fetchData(this.searchTxt);
                },
                /**
                 * 新建项目
                 */
                newCreate: function () {
                    this.createVisible = true;

                    // 可以调用 组件 vue-form 中的  busshow 方法  并传参 name
                    // com.util.BusEmit('vue-form','busshow','name')
                },
                /**
                 * 提交数据
                 */
                submitProject: function () {
                    // 验证数据
                    if (this.vali()) {
                        this.$message.error("请输入项目名称与 正确的URL地址");
                        return false;
                    }

                    let obj = {
                        proName: this.projectName,
                        proUrl: this.projectHost
                    };

                    api.saveProInfo(obj).then(function (res) {
                        if (res.code == 200) {
                            that.$message({
                                message: "新建项目成功",
                                type: "success"
                            });

                            that.createClose()
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
                fetchData: function (proName) {
                    let obj = {
                        proName: proName,
                        pageNum: that.pageNum,
                        pageSize: that.pageSize
                    };
                    api.queryProInfoList(obj).then(function (res) {
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
                createClose: function () {
                    this.createVisible = false;
                    this.editProId = ""
                    this.cleanInput();
                },


                /**
                 * 改变项目的状态
                 */
                changeProStatus: function (id, type) {

                    let obj = {
                        proId: id,
                        operateStatus: type
                    }

                    api.changeProStatus(obj).then(function (res) {
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

                /**
                 * 重新编辑
                 */
                editProInfo: function (item) {
                    that.editTip = "编辑项目";
                    that.editProId = item.proId;
                    that.projectName = item.proName;
                    that.projectHost = item.proUrl;


                    that.createVisible = true;


                },
                /**
                 * 增加弹窗提示
                 */
                doPop: function (id, status) {
                    let msgTip = status == 0 ? "确定要改为 关闭 吗？" : "确定要改为 开启 吗？";


                    that.$confirm(msgTip, '操作确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {

                        that.changeProStatus(id, status)

                    }).catch(function () {

                        that.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    })


                },
                /**
                 * 删除警告
                 */
                delWarning: function (id) {
                    that.$confirm('确定要删除该项目吗？', '操作确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {

                        that.delThePro(id)

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
                delThePro: function (id) {
                    let obj = {
                        proId: id
                    }

                    api.deleteProInfo(obj).then(function (res) {
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
                 * 更新项目信息
                 */
                updateProInfo: function () {
                    // 验证数据
                    if (this.vali()) {
                        this.$message.error("请输入项目名称与 正确的URL地址");
                        return false;
                    }

                    let obj = {
                        proId: that.editProId,
                        proName: that.projectName,
                        proUrl: that.projectHost
                    }

                    api.updateProInfo(obj).then(function (res) {

                        if (res.code == 200) {

                            that.$message({
                                message: "更新成功",
                                type: "success"
                            });
                            that.createClose()
                            that.fetchData();
                        } else {
                            that.$message.error(res.msg);
                        }

                    })


                },
                /**
                 * 页面之间的跳转并传参数
                 * @param link 要跳转的链接
                 * @param param  需要传的参数
                 */
                goLink: function (link, param) {

                    console.log(link);
                    console.log(param);
                    that.$router.push({path: link, query: param})


                },

                openDialog: function () {
                    //
                    this.$notify.error({
                        title: "错误",
                        message: "message"
                    });
                },
                openAlert: function () {
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