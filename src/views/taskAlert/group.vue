<template>
    <div class="container" v-cloak>
        <!-- main header -->
        <div class="main-header">
            <el-row>
                <el-col :span="12">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li>
                                <a>报警群组</a>
                            </li>
                        </ul>
                    </nav>
                </el-col>
                <el-col :span="8" :offset="4" class="text-right">
                    <el-button
                            type="primary"
                            icon="el-icon-news el-icon-right"
                            size="medium"
                            @click="handleCreate"
                    >新建群组
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <!-- main header end -->
        <!-- main-filter -->
        <div class="main-filter">
        </div>
        <!-- main-filter end -->
        <div class="main-content">
            <!-- main-content -->
            <table class="table is-bordered is-striped is-fullwidth">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>群组名</th>
                    <th>群成员</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in tableData">
                    <th>{{item.userGroupId}}</th>
                    <td>{{item.groupName}}</td>
                    <td>{{item.usersName}}</td>
                    <td>
                        <el-button type="info" size="mini" @click="editGroup(item)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="delGroup(item.userGroupId)">删除</el-button>
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
        <!--adddialog start-->
        <el-dialog
                title="新建群组"
                width="30%"
                :visible.sync="addDialog"
                top="50px"
        >
            <el-row>
                <el-col :span="4" class="lab-tip">群组名:</el-col>
                <el-col :span="16">
                    <el-input placeholder="请输入群组名称" v-model="form.groupName" clearable></el-input>
                    <div class="error" v-if="!$v.form.groupName.maxLength && anyErr">群组名不能超过50位</div>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">群成员:</el-col>
                <el-col :span="16">
                    <el-autocomplete
                            style="width: 100%;"
                            class="inline-input"
                            v-model="user"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入名称"
                            @select="handleSelect"
                    ></el-autocomplete>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip"></el-col>
                <el-col :span="16">
                    <el-tag v-for="user in userNameList"
                            :key="user"
                            closable
                            type="parimary"
                            @close="handleCloseTag(user)"
                            style="float: left;margin-left: 10px;margin-top: 5px;display:block;width:100%;"
                    >
                        {{user}}
                    </el-tag>
                </el-col>

            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip"></el-col>
                <el-col :span="16">
                    已选择{{userNameList.length}}个组员
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip"></el-col>
                <el-col :span="16">
                    <el-button type="primary" @click="handleSubmit('add')">确定</el-button>
                    <el-button @click="closeDialog">取消</el-button>
                </el-col>
            </el-row>

        </el-dialog>
        <!--adddialog end-->
        <!--editdialog start-->
        <el-dialog
                title="编辑群组"
                width="30%"
                :visible.sync="editDialog"
                top="50px"
        >
            <el-row>
                <el-col :span="4" class="lab-tip">群组名:</el-col>
                <el-col :span="16">
                    <el-input placeholder="请输入群组名称" v-model="form.groupName" clearable></el-input>
                </el-col>
                <div class="error" v-if="!$v.form.groupName.maxLength && anyErr">群组名不能超过50位</div>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip">群成员:</el-col>
                <el-col :span="16">
                    <el-autocomplete
                            style="width: 100%;"
                            class="inline-input"
                            v-model="user"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入名称"
                            @select="handleSelect"
                    ></el-autocomplete>
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip"></el-col>
                <el-col :span="16">
                    <el-tag v-for="user in userNameList"
                            :key="user"
                            closable
                            type="parimary"
                            @close="handleCloseTag(user)"
                            style="float: left;margin-left: 10px;margin-top: 5px;"
                    >
                        {{user}}
                    </el-tag>
                </el-col>

            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip"></el-col>
                <el-col :span="16">
                    已选择{{userNameList.length}}个组员
                </el-col>
            </el-row>
            <el-row class="mt10">
                <el-col :span="4" class="lab-tip"></el-col>
                <el-col :span="16">
                    <el-button type="primary" @click="handleSubmit('edit')">确定</el-button>
                    <el-button @click="editDialog = false">取消</el-button>
                </el-col>
            </el-row>

        </el-dialog>
        <!--editdialog end-->
    </div>
</template>


<script>

    define(["Vue", "common", "api", "validators"], function (Vue, com, api, vali) {
        "use strict";
        var that

        const required = vali.required;
        const minLength = vali.minLength;
        const maxLength = vali.maxLength;

        var result = {
            template: template,
            validations: {
                form: {
                    groupName: {
                        required,
                        maxLength: maxLength(50)
                    }

                }
            },
            data: function () {
                var time = new Date()
                return {
                    user: '',
                    anyErr:false,
                    loaded: time,
                    tableData: [],
                    pageTotal: "",
                    pageSize: 10,
                    pageNum: 1,
                    addDialog: false,
                    editDialog: false,
                    userGroupId: '',
                    form: {
                        groupName: ''
                    },
                    userNameList: [],
                    userIdList: []
                };
            },
            mounted: function () {
                // this.refresh();
                that = this;
                this.fetchData();
            },
            methods: {
                /**
                 * 获取列表数据
                 * @param
                 */
                fetchData: function () {
                    let obj = {
                        pageNum: that.pageNum || 1,
                        pageSize: that.pageSize || 10
                    }
                    api.queryUserGroupList(obj).then(function (res) {
                        if (res.code == 200) {
                            that.tableData = res.data.list;
                            that.pageTotal = res.data.total;
                        } else {
                            that.$message.error(res.msg);
                        }
                    });
                },
                /**
                 * 名称模糊查询
                 * @param
                 */
                querySearch: function (queryString, cb) {
                    api.queryUserGroupInfoList({name: queryString}).then(function (res) {
                        if (res.code == 200) {
                            let userList = []
                            res.data.forEach(val => {
                                userList.push({
                                    value: val.name,
                                    address: val.id
                                })
                            })
                            cb(userList);
                        } else {
                            that.$message.error(res.msg);
                        }
                    })

                },
                /**
                 * 新建群组
                 * @param
                 */
                handleCreate() {
                    this.addDialog = true
                    this.form.groupName = ''
                    this.userNameList = []
                    this.userIdList = []
                },
                /**
                 * 添加/修改群组
                 * @param
                 */
                handleSubmit(type) {
                    this.anyErr = true
                    if(!this.$v.$invalid){
                        if (that.form.groupName.trim() === '') {
                            that.$message.warning('请输入群组名称')
                        } else {
                            const obj = {
                                groupName: that.form.groupName,
                                usersIds: that.userIdList.join(),
                                usersName: that.userNameList.join()
                            }
                            let func, dialog
                            switch (type) {
                                case 'add':
                                    func = api.saveUserGroup
                                    break
                                case 'edit':
                                    obj.userGroupId = that.userGroupId
                                    func = api.editUserGroup
                            }
                            func(obj).then(function (res) {
                                if (res.code == 200) {
                                    that.$message.success(res.msg)
                                    that.addDialog = false
                                    that.editDialog = false
                                    that.fetchData()
                                } else {
                                    that.$message.error(res.msg);
                                }
                            })
                        }
                    }

                },
                /**
                 * 编辑群组
                 * @param
                 */
                editGroup(item) {
                        this.form.groupName = item.groupName
                        this.userGroupId = item.userGroupId
                        this.userNameList = item.usersName === '' ? [] : item.usersName.split(',')
                        this.userIdList = item.usersIds === '' ? [] : item.usersIds.split(',')
                        this.editDialog = true
                },
                /**
                 * 删除群组
                 * @param
                 */
                delGroup(id) {
                    that.$confirm('确定要删除该项目吗？', '操作确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {
                        api.deleteUserGroup({userGroupId: id}).then(function (res) {
                            if (res.code == 200) {

                                that.$message.success(res.msg)
                                that.fetchData()
                            } else {
                                that.$message.error(res.msg);
                            }
                        })
                    }).catch(function () {
                        that.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });

                },
                closeDialog(){
                    this.user = ''
                    this.addDialog = false
                },
                handleSelect(item) {
                    console.log(item)
                    that.user = ''
                    if (this.userIdList.indexOf(item.address) === -1) {
                        this.userNameList.push(item.value)
                        this.userIdList.push(item.address)
                    }
                },
                handleCloseTag(tag) {
                    this.userNameList.forEach((user, index) => {
                        if (tag === user) {
                            this.userNameList.splice(index, 1)
                            this.userIdList.splice(index, 1)
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
                }
            }
        };


        Vue.component("vue-group", result);

        return result;

    });

</script>
