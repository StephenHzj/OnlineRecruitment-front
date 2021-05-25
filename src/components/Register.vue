<template>
  <div class="login-wrap">
    <div class="ms-login">
          <el-card  class="box-card">
            <div slot="header" class="clearfix">
              <span>在线招聘网站</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="toLogin">已有帐号,去登录...</el-button>
            </div>
            <div  class="text item">
              <el-form :model="form" status-icon :rules="rules" ref="userRegister" label-width="100px"  class="demo-ruleForm">

                <el-form-item label="手机号" prop="tel">
                  <el-input v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                  <el-input type="password" v-model="form.checkPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role" >
                <el-radio-group v-model="form.role">
                  <el-radio-button label="求职者" ></el-radio-button>
                  <el-radio-button label="招聘者" ></el-radio-button>
                </el-radio-group>
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

import * as userApi from "../api/user";
export default {
  name:"UserLogin",
  data() {
    //验证密码是否一致
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.checkPassword !== '') {
          this.$refs.userRegister.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        tel: "",
        name: "",
        password: "",
        email: "",
        role:"",
      },
      checkPassword:"",
      imageUrl:"",
      rules: {
        tel: [{
          pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
          required: true, message: "请输入正确手机号码", trigger: "blur"
        }],
        name: [{
          required: true, message: "请输入用户名", trigger: 'blur'
        }],
        email: [{
          required: true, message: "请输入邮箱号", trigger: 'blur'
        }],
        password: [{
          validator: validatePass, required: true,trigger: 'blur'
        }],
        checkPassword: [{
          validator: validatePass2,required: true, trigger: 'blur'
        }],
        role: [{
          required: true, message: "请选择角色", trigger: 'blur'
        }],
      }
    };
  },

  methods: {
    //注册用户
    register() {
        userApi.register("/register", this.form).then((res) =>{
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

    toLogin(){
      this.$router.push("/Login")
    }


  }
};
</script>

<style scoped>

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/background.jpg);
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
