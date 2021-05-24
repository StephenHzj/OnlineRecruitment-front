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
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
      >
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="hrId" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="companyName" label="所属公司"  align="center"></el-table-column>
        <el-table-column prop="hrName" label="姓名"></el-table-column>
        <el-table-column prop="hrTel" label="电话" ></el-table-column>
        <el-table-column prop="hrEmail" label="邮箱"></el-table-column>
        //头像
        <el-table-column prop="hrLogo" label="头像" align="center">
          <template slot-scope="scope">
            <el-image
                class="table-td-thumb"
                :src="getImgUrl(scope.row.hrLogo)"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-delete"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
    </div>
  </div>
</template>

<script>
import * as adminApi from "../../api/admin";
export default {
  name: 'AdminHr',
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      url:'',
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getHrData();
  },
  methods: {

    // 获取HR数据
    getHrData() {
      adminApi.getAllHrs().then(res => {
        this.tableData = res.data;
      });
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        adminApi.deleteHr(row.hrId).then((res) =>{
          if(res.code === 200){
            this.$message.success('删除成功');
            this.tableData.splice(index, 1);
          }else
            this.$message.error("error")
        })
      }).catch(() => {});
    },

    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    },
    //获取图片URL
    getImgUrl (img) {

      try {
        let url = require("@/assets/logo/user/" + img);
        return url;
      }catch (e){
        return require("@/assets/logo/user/default.jpg" );
      }

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
