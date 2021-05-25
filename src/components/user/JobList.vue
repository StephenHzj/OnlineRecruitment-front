<template>
  <div>
    <el-table
        :data="jobData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @row-click="jobDetail"
    >
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="jobName" label="岗位"  align="center"></el-table-column>
      <el-table-column prop="companyName" label="公司名称"></el-table-column>
      <el-table-column prop="location" label="工作地点"></el-table-column>
      <el-table-column prop="quantity" label="所需人数"></el-table-column>
      <el-table-column prop="updateDate" label="发布时间"></el-table-column>
      <el-table-column
          prop="jobState"
          label="岗位状态"
          align="center"
          :filters="[{ text: '发布中', value: 1 }, { text: '禁用', value: 0 },{ text: '招聘结束', value: -1 }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.jobState === 1?'success':(scope.row.jobState=== 0?'danger':'info')"
          >{{scope.row.jobState === 1? '发布中' : (scope.row.jobState === 0 ? '禁用':'招聘结束')}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import * as userApi from "../../api/user"
export default {
  name: "JobList",
  created() {
    this.getJobList();
  },
  methods: {
    getJobList(){
      userApi.getJobList().then(res => {
        if(res.code === 200){
          this.jobData =  res.data
        }
      })
    },
    filterTag(value, row) {
      return row.jobState === value;
    },
    jobDetail(row){
      this.$router.push( { name: 'jobDetail', params: { jobId: row.jobId }})
      // this.$router.push("/user/job/"+jobId,)
    }
  },
  data() {
    return {
      jobData: []
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: #F56C6C;
}

.el-table .success-row {
  background: #67C23A;
}
</style>
