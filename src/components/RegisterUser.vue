<template>
  <el-main >
  <el-col :span="8" :offset="8">
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

    <el-form-item label="头像">
      <el-upload
          class="avatar-uploader"
          action="/api/user/upload"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register()">注册</el-button>
      <el-button @click="resetForm('userRegister')">重置</el-button>
    </el-form-item>
  </el-form>
  </el-col>
  </el-main>
</template>

<script>

import * as userApi from '../api/common'
export default {
  name: "UserRegister",
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
        if (res === "注册成功") {
          alert('submit!');
        } else {
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
  }
}
</script>

<style scoped>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
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
  width: 600px;
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
