<template>
  <el-container>
    <el-header >
        <el-row type="flex" align="middle">
          <el-col :span="2">
              <el-image style="height:70px;width: 70px" :src="require('../../assets/index.png')"></el-image>
          </el-col >
          <el-col :span="2" offset="16" >
            <span >qiuzhizhe</span>
            <el-avatar >user</el-avatar>
          </el-col>
          <el-col :span="2" >
            <el-dropdown>
              <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
    </el-header>

    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="block">
            <el-carousel height="250px">
              <el-carousel-item v-for="item in imgData" :key="item">
                <el-image
                    style="width:100%; height: 100%"
                    :src="item.src"
                    :fit="fill"></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>

<!--      <el-row  class="el-row" :gutter="20" >-->
<!--        <el-col style="margin-bottom: 20px" class="el-col" :span="8" v-for="(job, index) in jobData" :key="job.jobId" >-->
<!--          <el-card shadow="hover" class="box-card" :key="index" :body-style="{ padding: '0px' }">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span>{{job.companyName}}</span>-->
<!--              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
<!--            </div>-->

<!--            <div style="padding: 14px;">-->
<!--              <span>{{job.jobName}}</span>-->
<!--              <div class="bottom clearfix">-->
<!--               <span>{{job.salary}}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->

      <div class="content-list">
        <div class="item-list" >
          <el-row  class="el-row" :gutter="20" >
            <el-col style="margin-bottom: 20px" class="el-col" :span="8" v-for="(job, index) in jobData" :key="job.jobId" >
              <div class="item">
              <el-card shadow="hover" class="box-card" :key="index" :body-style="{ padding: '0px' }">
                <div slot="header" class="clearfix">
                  <span>{{job.companyName}}</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div class="item-left-top">
                    <span class="item-left-top-left">{{job.jobName }}</span>
                  <span class="item-left-top-right">{{job.salary }}</span>
                </div>
                <div class="item-content-top"

                <div class="item-left-bottom">
                  <span>{{job.degree+"|"+job.location}}</span>
                </div>
<!--                <div style="padding: 14px;">-->
<!--                  <span>{{job.jobName}}</span>-->
<!--                  <div class="bottom clearfix">-->
<!--                    <span>{{job.salary}}</span>-->
<!--                  </div>-->
<!--                </div>-->
              </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>


    </el-main>
  </el-container>
</template>

<script>
import * as userApi from "@/api/user"
export default {
  name: "userIndex",
  data(){
    return {
      logoUrl: require('../../assets/index.png'),
      imgData: [
        {
          src: require('../../assets/banner/1.jpg')
        }, {
          src: require('../../assets/banner/2.jpg')
        }, {
          src: require('../../assets/banner/3.jpg')
        }, {
          src: require('../../assets/banner/4.jpg')
        },
      ],
      jobData: [],
    }
  },
  created(){
    userApi.getJobInfo().then((res) => {
      this.jobData = res.data;
      console.log(this.jobData)
    })
  }



}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.content-title {
  border-bottom: 2px solid #63d4c7;
  padding-bottom: 10px
}

.item-list {
  width: 100%;
  overflow: hidden;
  background: #fff;
  border-left: 1px solid #f6f6f8
}

.item {
  float: left;
  justify-content: space-between;
  padding: 22px 20px;
  border-right: 2px solid #f6f6f8;
  border-bottom: 2px solid #f6f6f8;
  margin-right: -3px
}

.item-left-top-left {
  font-size: 16px;
  font-weight: 400;
  color: #414a60
}

.item-left-top-right{
  color: #fc703e;
  font-size: 16px;
  font-weight: 400;
  padding-left: 8px
}

.item-left-bottom {
  margin-top: 2px;
  font-size: 12px;
  color: #9fa3b0
}

.item-content-top{
  font-size: 16px;
  font-weight: 400;
  color: #414a60
}

.item-content-bottom{
  margin-top: 2px;
  font-size: 12px;
  color: #9fa3b0
}

.item-right-top {
  font-weight: 400;
  font-size: 13px;
  color: #4a4160
}

.item-right-bottom{
  margin-top: 2px;
  font-size: 12px;
  color: #9fa3b0
}

</style>