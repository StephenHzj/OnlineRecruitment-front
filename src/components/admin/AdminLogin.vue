<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="admin" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="admin.adminTel" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="admin.adminPassword"
                        @keyup.enter="login()"
                    >
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>

import * as userApi from "../../api/common";
export default {
    name:"adminLogin",
    data() {
        return {
            admin: {
              adminTel: "",
              adminPassword: ""
            },
            rules: {
              adminTel: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
              adminPassword: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },

    methods: {
       login() {
         userApi.login('/admin/login', this.admin).then((res)=>{
           if(res.code === 200) {
             this.$message.success("登录成功")
             console.log("跳转");
             localStorage.setItem('token',res.message);
             localStorage.setItem('adminTel', this.admin.adminTel);
             this.$router.push('/admin');
           }
         }).catch((res)=>{
           this.$message.error(res)
         })
       },
      }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(/src/assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
