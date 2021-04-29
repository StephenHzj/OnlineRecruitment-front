<template>
  <el-container>
<!--    <el-header >-->
<!--        <el-row type="flex" align="middle">-->
<!--          <el-col :span="2">-->
<!--              <el-image style="height:70px;width: 70px" :src="require('../../assets/index.png')"></el-image>-->
<!--          </el-col >-->
<!--          <el-col :span="2" offset="16" >-->
<!--            <span >qiuzhizhe</span>-->
<!--            <el-avatar >user</el-avatar>-->
<!--          </el-col>-->
<!--          <el-col :span="2" >-->
<!--            <el-dropdown>-->
<!--              <span class="el-dropdown-link">-->
<!--                下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--              </span>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">-->
<!--                <el-dropdown-item>项目仓库</el-dropdown-item>-->
<!--              </a>-->
<!--              <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--            </el-dropdown>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--    </el-header>-->

    <el-main >
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <div class="block">
            <el-carousel height="250px">
              <el-carousel-item v-for="item in imgData" :key="item">
                <el-image
                    style="width:100%; height: 100%"
                    :src="item.src"
                    ></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>

      <div class="content-title">
        热门岗位
      </div>
      <el-row  class="el-row" :gutter="20" >
        <el-col style="margin-top: 10px; margin-bottom: 10px" class="el-col"
                :span="8" v-for="(job, index) in jobData" :key="job.jobId" >
          <el-card shadow="hover" class="box-card" :key="index" :body-style="{ padding: '0px' }">
            <div slot="header" class="clearfix">
              <span>{{job.companyName}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="jobDetail(job.jobId)">查看详情</el-button>
            </div>
            <div class="item-content-body">
            <div class="item-left-top" >
                <span class="item-left-top-left">{{job.jobName }}</span>
              <span class="item-left-top-middle">{{job.salary +"/月"}}</span>
              <span class="item-left-top-right">{{job.hrName}}</span>
            </div>
            <div class="item-left-bottom">
              <span>{{job.degree+"|"+job.location}}</span>
            </div>
            <div class="item-content">
              <span>{{"工作介绍："+job.introduction}}</span>
            </div>
            <div class="item-content">
              <span>{{"工作要求："+job.requirement}}</span>
            </div>
            </div>
          </el-card>
        </el-col>
      </el-row>


    </el-main>
  </el-container>
</template>

<script>
import vtest from "../404"
import * as userApi from "@/api/user"
import vHead from "@/components/admin/Header";
import vSidebar from "@/components/admin/AdminSidebar";
import vTags from "@/components/admin/Tags";
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
  components: {
    vtest,
  },
  created(){
    userApi.getJobInfo().then((res) => {
      this.jobData = res.data;
      console.log(this.jobData)
    })
  },
  methods:{
    jobDetail(jobId){
      this.$router.push( { name: 'jobDetail', params: { jobId: jobId }})
      // this.$router.push("/user/job/"+jobId,)

    }
  }



}
</script>

<style scoped>



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


.item-content-body{
  padding: 10px 20px;
}
.content-title {
  border-bottom: 2px solid #63d4c7;
  padding-bottom: 10px
}




.item-left-top{
  font-size: 18px;
  margin-top: 8px;
  margin-bottom: 5px;
}
.item-left-top-left {
  font-weight: 400;
  color: #414a60
}

.item-left-top-middle{
  color: #fc703e;
  font-weight: 400;
  padding-left: 8px
}

.item-left-top-right{
  font-weight: 400;
  padding-right: 8px;
  float: right;
}

.item-left-bottom {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #9fa3b0
}

.item-content{
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 8px;
}


</style>