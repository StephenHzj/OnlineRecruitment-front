<template>
    <div class="login-wrap">
        <div class="ms-login">
          <el-card  class="box-card">
            <div slot="header" class="clearfix">
              <span>在线招聘网站</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toRegister">去注册...</el-button>
            </div>
            <div  class="text item">
              <el-form :model="user" status-icon :rules="rules" ref="login" label-width="60px" class="demo-ruleForm">
                <el-form-item label="账号" prop="userTel">
                  <el-input v-model="user.userTel"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="userPassword">
                  <el-input type="password" v-model="user.userPassword" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="login()">登录</el-button>
                  <el-button @click="resetForm('login')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
    </div>
    </div>
</template>

<script>

import * as userApi from "../../api/common";
export default {
    name:"userLogin",
    data() {
        return {
            user: {
              userTel: "",
              userPassword: ""
            },
            rules: {
              userTel: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
              userPassword: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },

    methods: {
       login() {
         if (this.user.userTel === "" || this.user.userPassword === "")
           this.$message.error("请输入账号密码")
         else {
           userApi.login('/user/login', this.user).then((res) => {
             if (res.code === 200) {
               this.$message.success("登录成功")
               console.log("跳转");
               localStorage.setItem('userTel', this.user.userTel);
               localStorage.setItem('userName', res.data.userName)
               localStorage.setItem('userLogo', res.data.userLogo)
               this.$router.push('/head');
             }
           }).catch((res) => {
             this.$message.error(res)
           })
         }
       },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toRegister(){
         this.$router.push("/userRegister")
      }

      }
};
</script>

<style scoped>

.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/background.jpg);
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
    left: 70%;
    top: 50%;
    width: 400px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
