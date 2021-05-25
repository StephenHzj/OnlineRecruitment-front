<template>
<!--  <el-row :gutter="20">-->
<!--    <el-col :span="16" offset="4">-->
      <div class="grid-content bg-purple">
        <el-card :data="job" class="box-card">
          <div slot="header" style="height: 140px" class="clearfix">
            <el-image
                style="float: right; width: 120px; height: 120px"
                :src="getComLogo(job.company.companyLogo)"
                :fit="fit"></el-image>
            <div>
            <h1>{{job.company.companyName}}</h1>
            </div>
            <div style="margin-top: 20px">
              <b class="company-info">{{job.company.companyLocation+" | "+job.company.companyEmail }}</b>
            </div>
            <div style="margin-top: 20px">
            <p>{{"公司简介："+job.company.companyProfile}}</p>
            </div>
<!--            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>

          <div class="item-content-body">
            <el-divider content-position="left" >
              <span style="font-weight: bolder;font-size: 20px">
                 HR简介
              </span>
            </el-divider>
            <div class="hr-logo" >
                  <el-avatar style="float: right" :size="60" :src="getHrLogo(job.hr.hrLogo)"></el-avatar>
            </div>
            <div>
              <h3 class="item-left-top-left">{{job.hr.hrName}}</h3>
            </div>
            <div class="item-content">
              <span>联系方式：{{job.hr.hrEmail}}</span>
            </div>
            <div class="item-content">
              <span>个人简介：{{job.hr.hrProfile}}</span>

            </div>
            <el-divider content-position="left" >
              <span style="font-weight: bolder;font-size: 20px">
                 工作详情
              </span>
            </el-divider>
            <div>
            <div class="item-left-top" >
              <h2 class="item-left-top-left">{{job.jobName }}</h2>
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
              <el-button  type="success" @click="application()">申请</el-button>
            </div>
          </div>

        </el-card>
      </div>
<!--    </el-col>-->
<!--  </el-row>-->
</template>

<script>
import * as userApi from "../../api/user"
export default {
  name: "JobDetail",
  data(){
    return{
      job:[]
    }
  },
  created() {
    this.getJobDetail()
  },
  methods:{
    getJobDetail(){
      let jobId = this.$route.params.jobId
      userApi.getJobDetail(jobId).then(res => {
        if(res.code === 200){
          this.job = res.data;
        }else {
          this.$message.error("查询出错")
        }
      })
    },
    //获取图片URL
    getComLogo (img) {

      try {
        console.log(img)
        let url = require("@/assets/logo/company/" + img);
        return url;
      }catch (e){
        return require("@/assets/logo/user/default.jpg" );
      }

    },

    //获取图片URL
    getHrLogo (img) {
      try {
        let url = require("@/assets/logo/hr/" + img);
        return url;
      }catch (e){
        return require("@/assets/logo/user/default.jpg" );
      }

    },
    application(){
      let params = {
        userTel: localStorage.getItem("userTel"),
        jobId: this.job.jobId
      };
      userApi.applicationJob(params).then(res => {
        if(res.code === 200){
          this.$notify({
            title: '申请成功',
            message: '您已成功投递简历',
            type: 'success'
          });
        }
        if(res.code === 503){
          this.$notify({
            title: '投递失败',
            dangerouslyUseHTMLString: true,
            message: "<router-link :to='{ path: 'relative/path'}' append> 填写简历</router-link>"
          });
        }
      })
    }
  }
}
</script>

<style scoped>


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
  padding-left: 0px
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
.hr-name{
  font-size: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;


}
.hr-logo{
  margin-right: 30px;
}
</style>