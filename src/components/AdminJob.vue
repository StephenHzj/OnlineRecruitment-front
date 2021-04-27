<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table
          :data="job"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
      >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="jobId" label="ID" width="55" align="center"></el-table-column>
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


        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="disableJob(scope.$index, scope.row)"
            >禁用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>

      <!-- 编辑弹出框 -->
      <el-dialog title="岗位详情:" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :data="detailInfo"  label-width="100px">
          <el-form-item label="岗位名称:">
            <span>{{detailInfo.jobName}}</span>
          </el-form-item>
          <el-form-item label="公司名称:">
            <span>{{detailInfo.companyName}}</span>
          </el-form-item>
          <el-form-item label="薪资:">
            <span>{{detailInfo.salary}}</span>
          </el-form-item>
          <el-form-item label="工作地点:">
            <span>{{detailInfo.location}}</span>
          </el-form-item>
          <el-form-item label="工作介绍:">
            <span>{{detailInfo.introduction}}</span>
          </el-form-item>
          <el-form-item label="工作要求:">
            <span>{{detailInfo.requirement}}</span>
          </el-form-item>
          <el-form-item label="学历要求:">
            <span >{{detailInfo.degree}}</span>
          </el-form-item>
          <el-form-item label="需求人数:">
            <span >{{detailInfo.quantity}}</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="editVisible = false">确 定</el-button>
            </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import * as adminApi from "../api/admin";
export default {
  name: 'AdminJob',
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      job: [],
      editVisible: false,
      pageTotal: 0,
      detailInfo: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getJobData();
  },
  methods: {

    // 获取用户数据
    getJobData() {
      adminApi.getAllJobs().then(res => {
        this.job = res.data;
      });
    },

    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    },

    disableJob(index,row) {
      // 二次确认删除
      this.$confirm('确定禁用该岗位吗？', '提示', {
        type: 'warning'
      }).then(() => {
        if(row.jobState === -1){
          this.$message.warning("招聘已结束,无需审核")
        }else {
        adminApi.disableJob(row.jobId).then((res) =>{
          if(res.code === 200){
            if(row.jobState === 1) {
              row.jobState = 0;
              this.$set(this.job,index,row);
              this.$message.error("禁用成功");
            }
            else{
              row.jobState = 1;
              this.$set(this.job,index,row);
              this.$message.success("启用成功");
            }
          }else if(res.code === 503)
            this.$message.error(res.message);
          else
            this.$message.error("error")
        })
      }}).catch(() => {});
    },

    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.detailInfo = row;
      this.editVisible = true;
    },
    filterTag(value, row) {
      return row.jobState === value;
    },
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
