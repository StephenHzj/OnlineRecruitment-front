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
          :data="company"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
      >
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="companyCode" label="公司代码"  align="center"></el-table-column>
        <el-table-column prop="companyName" label="公司名称"></el-table-column>
        <el-table-column prop="companyLocation" label="地点"></el-table-column>

        //头像
        <el-table-column prop="companyLogo" label="Logo" align="center">
          <template slot-scope="scope">
            <el-image
                class="table-td-thumb"
                :src="getImgUrl(scope.row.companyLogo)"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column
            prop="companyState"
            label="公司状态"
            align="center"
            :filters="[{ text: '通过审核', value: 1 }, { text: '未审核', value: 0 }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.companyState === 1?'success':(scope.row.companyState=== 0?'danger':'danger')"
            >{{scope.row.companyState === 1? '通过审核' : (scope.row.companyState === 0 ? '未审核':'未审核')}}</el-tag>
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
                @click="auditCompany(scope.$index, scope.row.companyCode)"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑弹出框 -->
      <el-dialog title="公司详情" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="company" label-width="70px">
          <el-form-item label="公司ID">
            <span>{{company.companyId}}</span>
          </el-form-item>
          <el-form-item label="公司名称">
            <span>{{company.companyName}}</span>
          </el-form-item>
          <el-form-item label="公司代码">
            <span>{{company.companyCode}}</span>
          </el-form-item>
          <el-form-item label="公司地点">
            <span>{{company.companyLocation}}</span>
          </el-form-item>
          <el-form-item label="公司电话">
            <span>{{company.companyTel}}</span>
          </el-form-item>
          <el-form-item label="公司邮箱">
            <span>{{company.companyEmail}}</span>
          </el-form-item>
          <el-form-item label="公司简介">
            <span >{{company.companyProfile}}</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="editVisible = false">确 定</el-button>
            </span>
      </el-dialog>

      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="page.pageIndex"
            :page-size="page.pageSize"
            :total="page.totalElements"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import * as adminApi from "../api/admin";
export default {
  name: 'AdminCompany',
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 2,
        totalElements: 0
      },

      url:'',
      company: [],
      editVisible: false,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getCompanyData();
  },
  methods: {
    stateFormat(row){
      if (row === 0) {
        return '已通过'
      } else  {
        return '未审核'
      }

    },
    // 获取用户数据
    getCompanyData() {
      adminApi.getPageCompanies(this.page).then(res => {
        console.log(res);
        this.company = res.data.content;
        this.page.totalElements = res.data.totalElements;
        this.page.pageSize = res.data.pageable.pageSize;
      });
    },
    // 删除操作
    auditCompany(index, code) {
      // 二次确认删除
      this.$confirm('确定要通过审核吗？', '提示', {
        type: 'warning'
      }).then(() => {
        adminApi.auditCompany(code).then((res) =>{
          if(res === '审核成功'){
            this.$message.success('审核成功');
          }else
            this.$message.error("error")
        })
      }).catch(() => {});
    },

    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.page, 'pageIndex', val);
      this.getCompanyData();
    },

    filterTag(value, row) {
      return row.companyState === value;
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
