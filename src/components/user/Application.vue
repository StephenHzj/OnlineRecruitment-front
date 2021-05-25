<template>
  <div>
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="18" offset="4">-->
        <el-table
            :data="AppData"
            style="width: 100%"
           >
          <el-table-column
              prop="applicationDate"
              label="日期"
              sortable
              width="180">
          </el-table-column>
          <el-table-column
              prop="jobName"
              label="岗位名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="hrName"
              label="处理人"
              width="180">
          </el-table-column>
          <el-table-column
              prop="companyName"
              label="公司名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="companyState"
              label="投递状态"
              align="center">
            <template slot-scope="scope">
              <el-tag
                  :type="scope.row.applicationState === 1?'success':(scope.row.applicationState=== -1?'danger':'info')"
              >{{scope.row.companyState === 1? '已通过' : (scope.row.companyState === -1 ? '已拒绝':'未审核')}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
<!--      </el-col>-->
<!--    </el-row>-->
  </div>

</template>

<script>
import * as userApi from "../../api/user"
export default {
  name: "Application",
  created() {
    this.getAppList();
  },
  methods: {
    getAppList(){
      let userTel = localStorage.getItem("userTel");
      userApi.getAppList(userTel).then(res => {
        if(res.code === 200){
           this.AppData =  res.data
        }
      })
    },
  },
  data() {
    return {
      AppData: []
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
