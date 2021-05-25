<template>
  <el-container>
    <el-main >
      <el-row :gutter="20">
        <el-col :span="16" :offset="0">
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
              <span>{{"工作介绍："+job.introduction|textLimit}}</span>
            </div>
            <div class="item-content">
              <span>{{"工作要求："+job.requirement|textLimit}}</span>
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
  filters: {//限制文本显示字数,超出部分用...代替
    textLimit (value) {
      if (!value) return ''
      if (value.length > 20) {
        return value.slice(0,20) + '...'//0:下标,从第一个字开始显示,50:显示字数,多余用...代替
      }
      return value
    }
  },
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
  width: 350px;
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
  padding-top: 20px;
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