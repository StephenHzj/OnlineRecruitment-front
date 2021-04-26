<template>
  <el-main >
    <el-col :span="8" :offset="8">
      <el-form :model="hr" status-icon :rules="rules" ref="hrRegister" label-width="100px"  class="demo-ruleForm">

        <el-form-item label="手机号" prop="hrTel">
          <el-input v-model="hr.hrTel"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="hrName">
          <el-input v-model="hr.hrName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="hrPassword">
          <el-input type="password" v-model="hr.hrPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="hr.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="hrEmail">
          <el-input v-model="hr.hrEmail"></el-input>
        </el-form-item>

        <el-form-item label="个人介绍" prop="hrProfile">
          <el-input  type="textarea" v-model="hr.hrProfile"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <el-upload
              class="avatar-uploader"
              action="/api/hr/upload"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register()">注册</el-button>
          <el-button @click="resetForm('hrRegister')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-main>
</template>

<script>

import * as userApi from '../api/common'
export default {
  name: "HrRegister",
  data() {
    //验证密码是否一致
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.hr.checkPassword !== '') {
          this.$refs.hrRegister.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.hr.hrPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      hr: {
        hrId: "",
        companyId:1,
        hrTel: "",
        hrName: "",
        hrPassword: "",
        hrLogo: "",
        hrEmail: "",
        hrProfile:""

      },
      checkPassword:"",
      imageUrl:"",
      rules: {
        hrTel: [{
          pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
          required: true, message: "请输入正确手机号码", trigger: "blur"
        }],
        hrName: [{
          required: true, message: "请输入用户名", trigger: 'blur'
        }],
        hrEmail: [{
          required: true, message: "请输入邮箱号", trigger: 'blur'
        }],
        hrPassword: [{
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
      userApi.register("/hr/register", this.hr).then((res) =>{
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
