<template>
  <el-menu  class="el-menu-demo" :default-active="activeIndex"  mode="horizontal" @select="handleSelect">
    <el-menu-item >
      <el-image class="logo" :src="require('../../assets/index.png')"></el-image>
    </el-menu-item>
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">职位列表</el-menu-item>
    <el-menu-item index="3">我的申请</el-menu-item>
    <el-col :span="1" offset="13" >
    <el-menu-item  index="3">
      <el-avatar >
        <img v-model="user.userLogo" :src="getImgUrl(user.userLogo)"/>
        user
      </el-avatar>
    </el-menu-item>
    </el-col>
    <el-col :span="2" >
      <el-menu-item  index="3">
        <span >{{user.userName}}</span>
      </el-menu-item>
    </el-col>

    <el-submenu  index="2">
      <template  slot="title">个人中心</template>
      <el-menu-item index="2-1">个人信息</el-menu-item>
      <el-menu-item index="2-2">我的简历</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import * as userApi from "../../api/user"
export default {
  name: "IndexHead",
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
    handleSelect(key, keyPath) {
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