<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">注册</div>
      <el-form :model="user" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item label="手机号">
          <el-input v-model="user.userTel"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="user.userPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="user.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="user.userGender" label="1">男</el-radio>
          <el-radio v-model="user.userGender" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="生日">
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
              :show-file-list="false"
              :auto-upload="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="login()">注册</el-button>
        </div>
        <p class="login-tips">Tips : !!!!!!!!!!!!!!!!!!!!!</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as userApi from '../api/common'
export default {
  name: "UserRegister",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      imageUrl: "",
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
    }
  },

  methods: {

    handleAvatarSuccess(res, file) {
      this.user.userLogo = file
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },


    register() {
      userApi.register("/user/register", this.user).then((res) => {
        this.$message.success(res)
        if (res === "注册成功") {
          console.log("跳转");
        }
      }).catch((res) => {
        this.$message.error(res)
      })
    },
    update() {
      userApi.register("/user/update", this.user).then((res) => {
        this.$message.success(res)
        if (res === 1) {
          this.$message.success("更新成功");
          console.log("跳转");
        } else {
          this.$message.error("更新失败");
        }
      }).catch((res) => {
        this.$message.error(res)
      })
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


