<template>
  <el-row :gutter="20">
    <el-col :span="16" offset="4">
      <div class="grid-content bg-purple">
        <el-card :data="job" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{job.jobName}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
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
    }
  }
}
</script>

<style scoped>

</style>