<template>
  <el-main >
    <el-col :span="8" :offset="8">
      <el-form :model="company" status-icon :rules="rules" ref="companyRegister" label-width="100px" class="demo-ruleForm">

        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="company.companyName"></el-input>
        </el-form-item>
        <el-form-item label="公司代码" prop="companyCode">
          <el-input v-model="company.companyCode"></el-input>
        </el-form-item>

        <el-form-item label="公司位置" prop="companyLocation">
        <el-cascader
            size="large"
            :options="options"
            v-model="selectedLocation"
            @change="handleAddress"
            filterable
        >
        </el-cascader>
        <el-input label="详细地址"  type="textarea" v-model="detailedLocation" @change="handleAddress"></el-input>
        </el-form-item>

        <el-form-item label="公司邮箱" prop="companyEmail">
          <el-input v-model="company.companyEmail"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" prop="companyTel">
          <el-input v-model="company.companyTel"></el-input>
        </el-form-item>

        <el-form-item label="公司简介" prop="companyProfile">
          <el-input  type="textarea" v-model="company.companyProfile"></el-input>
        </el-form-item>

        <el-form-item label="公司Logo">
          <el-upload
              class="avatar-uploader"
              action="/api/admin/company/upload"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register()">注册</el-button>
          <el-button @click="resetForm('companyRegister')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-main>
</template>

<script>

import { regionData, CodeToText } from "element-china-area-data";

import * as userApi from '../api/common'
export default {
  name: "CompanyRegister",
  data() {
    return {
      company: {
        companyId: "",
        companyCode:"",
        companyName: "",
        companyLocation:"",
        companyLogo: "",
        companyTel:"",
        companyEmail: "",
        companyProfile:"",
        companyState:"",
        companyAdmin:""
      },
      options: regionData,
      selectedLocation: [],
      detailedLocation:"",

      imageUrl:"",
      rules: {
        companyTel: [{
          pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
          required: true, message: "请输入正确手机号码", trigger: "blur"
        }],
        companyName: [{
          required: true, message: "请输入公司名称", trigger: 'blur'
        }],
        companyEmail: [{
          required: true, message: "请输入邮箱号", trigger: 'blur'
        }],
      }
    };
  },
  methods: {
    //注册用户
    register() {
      userApi.register("/admin/company/register", this.company).then((res) =>{
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
      this.company.companyLogo =res
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
    handleAddress() {
      var loc = "";
      for (let i = 0; i < this.selectedLocation.length; i++) {
        loc += CodeToText[this.selectedLocation[i]];
      }
      loc += this.detailedLocation;
      this.company.companyLocation = loc;
    }
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