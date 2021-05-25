<template>
  <el-col :span="18" offset="3">
  <el-menu  class="el-menu-demo" :default-active="activeIndex"  mode="horizontal" @select="handlePush" >
    <el-menu-item >
      <el-image class="logo" :src="require('../../assets/index.png')"></el-image>
    </el-menu-item>

    <el-menu-item index="/user/index">首页</el-menu-item>
    <el-menu-item index="/user/application">我的申请</el-menu-item>
    <el-menu-item index="/user/job">岗位列表</el-menu-item>
    <el-col :span="1" offset="10" >
      <el-avatar style="width: 50px;height: 50px;margin-top: 5px">
        <img v-model="user.userLogo" :src="getImgUrl(user.userLogo)"/>
        user
      </el-avatar>
    </el-col>
    <el-col :span="2" >
      <div style="width: 120px;height: 60px;text-align: center;line-height: 60px">
        <span >{{user.userName}}</span>
      </div>
    </el-col>

    <el-submenu  index="2">
      <template  slot="title">个人中心</template>
      <el-menu-item index="/user/info">个人信息</el-menu-item>
      <el-menu-item index="/user/resume">我的简历</el-menu-item>
    </el-submenu>
  </el-menu>
  </el-col>
</template>

<script>
import * as userApi from "../../api/user"
export default {
  name: "Head",
  data() {
    return {
      user:{
        userName:"",
        userLogo:""
      },
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    handlePush(key, keyPath) {
      this.$router.push(key);
      console.log(key, keyPath);
    },
    getUserInfo(){

      this.user.userName= localStorage.getItem("userName")
      this.user.userLogo= localStorage.getItem("userLogo")

      },
    //获取图片URL
    getImgUrl (imgUrl) {

      try {
        let url = require("@/assets/logo/user/" + imgUrl);
        return url;
      }catch (e){
        return require("@/assets/logo/user/default.jpg" );
      }

    },
    }

}
</script>

<style scoped>
.logo{
  height:60px;width: 60px
}

.el-menu-demo{
}
</style>