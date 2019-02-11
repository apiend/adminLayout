<template>
    <el-row type="flex" justify="end">
        <el-col>
            <div class="user-info-con">
                <div class="avatar-con">
                    <img :src="avatarImg" alt="" class="avatar-img">
                </div>
                <div class="user-info" @click="changeDropdown">
                     <span class="el-dropdown-link">
                        {{userName}}<i
                             :class="[showLogout?'el-icon-arrow-up el-icon--right':'el-icon-arrow-down el-icon--right'] "
                             style="cursor:pointer;"></i>
                     </span>
                    <div class="drop-con" v-if="showLogout">
                        <el-dropdown-item @click.native="editPwd">修改密码</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">登 出</el-dropdown-item>
                    </div>

                </div>
            </div>

        </el-col>
        <el-dialog
                title="修改密码"
                :visible.sync="editPwdDialog"
                width="30%"
               >
            <el-row>
                <el-col :span="4" class="lab-tip">原密码:</el-col>
                <el-col :span="16">
                    <el-input v-model="oldPassword" type="password"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4" class="lab-tip">新密码:</el-col>
                <el-col :span="16">
                    <el-input type="password" v-model.trim="$v.newPassword.$model"></el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
    <el-button @click="editPwdDialog = false">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </span>
        </el-dialog>
    </el-row>
</template>

<script>

    define(["Vue", "common", "api", "validators", "vue-router","MD5"], function (Vue, com, api, vali, VueRouter,MD5) {
        "use strict";
        const required = vali.required
        const minLength = vali.minLength
        var result = {
            template: template,
            data() {
                return {
                    oldPassword:'',
                    newPassword:'',
                    userName: '',
                    editPwdDialog:false,
                    avatarImg: 'data:image/jpeg;base64,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',
                    showLogout: false
                }
            },
            validations: {
                oldPassword: {
                    required
                },
                newPassword: {
                    required,
                    minLength: minLength(6)
                }
            },
            mounted() {
                this.userName = JSON.parse(com.getValue('authInfo', 'session')).userName
            },
            methods: {
                vali() {
                    return this.$v.$invalid;
                },
                // 修改密码
                editPwd() {
                    this.editPwdDialog = true
                },
                handleSubmit(){
                    if (this.vali()) {
                        this.$message.error("请检查输入内容");
                        return false;
                    }else{
                        api.updatePassword({oldPwd:MD5(this.oldPassword),newPwd:MD5(this.newPassword)}).then(res=>{
                            if(res.code===200){
                                this.$message.success(res.msg)
                                this.editPwdDialog = false
                            }else{
                                this.$message.error(res.msg)
                            }
                        })

                    }
                },
                changeDropdown() {
                    this.showLogout = !this.showLogout
                },
                logout() {
                    api.logout().then(res => {
                        if (res.code === 200) {
                            this.message.success(res.msg)

                        }
                    })
                    com.deleteValue('authInfo', 'session')
                    window.location.reload()

                }
            }
        }


        Vue.component("user-info", result);

        return result;

    });
</script>

<style scoped>
    .user-info-con {
        float: right;
        display: flex;
    }
.user-info{
    min-width: 100px;
}
    .avatar-con {
        margin-top: 10px;
        margin-right: 18px;
    }

    .avatar-img {
        width: 40px;
        height: 40px;
        border: 1px solid #fff;
        border-radius: 50%;
    }

    .drop-con {
        z-index:999!important;
        position:absolute;
        padding: 10px 0;
        margin: 5px 0;
        background-color: #fff;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
</style>
