<template>
<!--  <el-col :span="18" offset="3">-->
  <el-card  class="box-card">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
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
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="user.userEmail"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex" >
          <el-radio-group v-model="user.userGender">
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="0">女</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日" prop="userBirth">
          <el-date-picker
              v-model="user.userBirth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="用户Logo">
          <el-upload
              class="avatar-uploader"
              action="/api/user/logo/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register()">修改信息</el-button>
        </el-form-item>

      </el-form>
    </div>
  </el-card>
<!--  </el-col>-->
</template>

<script>
import * as userApi from "@/api/user"
export default {
  name: "UserInfo",
  data(){
    return{
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
      imageUrl:"",
    }
  },

  created() {
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      let userTel = localStorage.getItem("userTel")
      userApi.getUserInfo(userTel).then(res => {
        if(res.code === 200 ){
          this.user = res.data;
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      console.log(file.name)
      this.company.companyLogo =res.data
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    handleRemove() {
      this.imageUrl = ''
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
</style>