<template>
  <div class="login-wrap">
    <div class="ms-login">
          <el-card  class="box-card">
            <div slot="header" class="clearfix">
              <span>在线招聘网站</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toLogin">已有帐号,去登录...</el-button>
            </div>
            <div  class="text item">
              <el-form :model="user" status-icon :rules="rules" ref="userRegister" label-width="100px"  class="demo-ruleForm">

                <el-form-item label="手机号" prop="userTel">
                  <el-input v-model="user.userTel"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="user.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPassword">
                  <el-input type="password" v-model="user.userPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                  <el-input type="password" v-model="user.checkPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                  <el-input v-model="user.userEmail"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="userGender">
                  <el-radio v-model="user.userGender" label="1">男</el-radio>
                  <el-radio v-model="user.userGender" label="0">女</el-radio>
                </el-form-item>

                <el-form-item label="生日" prop="userBirth">
                  <el-date-picker
                      v-model="user.userBirth"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="register()">注册</el-button>
                  <el-button @click="resetForm('userRegister')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>

    </div>
  </div>
</template>

<script>

import * as userApi from "../../api/user";
export default {
  name:"UserLogin",
  data() {
    //验证密码是否一致
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.checkPassword !== '') {
          this.$refs.userRegister.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.userPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: {
        userId: "",
        userTel: "",
        userName: "",
        userPassword: "",
        userLogo: "",
        userGender: "",
        userEmail: "",
        userBirth: "",
      },
      checkPassword:"",
      imageUrl:"",
      rules: {
        userTel: [{
          pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
          required: true, message: "请输入正确手机号码", trigger: "blur"
        }],
        userName: [{
          required: true, message: "请输入用户名", trigger: 'blur'
        }],
        userEmail: [{
          required: true, message: "请输入邮箱号", trigger: 'blur'
        }],
        userPassword: [{
          validator: validatePass, required: true,trigger: 'blur'
        }],
        checkPassword: [{
          validator: validatePass2,required: true, trigger: 'blur'
        }],
      }
    };
  },

  methods: {
    //注册用户
    register() {
      userApi.register("/user/register", this.user).then((res) =>{
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$message.success("将在3s后跳转登录")
          setTimeout(this.toLogin, 3000);
        }
        if(res.code === 503){
          this.$message.error(res.message)
        }
        else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      console.log(file.name)
      this.user.userLogo =res
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    toLogin(){
      this.$router.push("/userLogin")
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
  top: 40%;
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
