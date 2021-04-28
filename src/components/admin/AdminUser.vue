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
        <div class="handle-box">
        </div>
        <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
          <el-table-column prop="userId" label="ID" width="55" align="center"></el-table-column>
          <el-table-column prop="userTel" label="账号"  align="center"></el-table-column>
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="userGender" label="性别" :formatter="genderFormat"></el-table-column>
          <el-table-column prop="userEmail" label="用户邮箱"></el-table-column>
          //头像
          <el-table-column prop="userLogo" label="头像" align="center">
            <template slot-scope="scope">
<!--              <div v-for="(item,index) in content" :key="index">-->
              <el-image
                  class="table-td-thumb"
                  :src="getImgUrl(scope.row.userLogo)"
              ></el-image>
<!--              </div>-->
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
              :current-page="page.pageIndex"
              :page-size="page.pageSize"
              :total="page.totalElement"
              @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </template>

  <script>
  import * as adminApi from "../../api/admin";
  export default {
    name: 'adminUser',
    data() {
      return {
        page: {
          pageIndex: 1, //当前页
          pageSize: 2, //每页大小
          totalElement: 10, //总共元素
        },
        tableData: [],
        editVisible: false,
      };
    },
    created() {
      this.getUserData();
    },
    methods: {
      genderFormat(row, column){
        if (row.userGender === 0) {
          return '女'
        } else  {
          return '男'
        }

      },
      // 获取用户数据
      getUserData() {
        adminApi.getPageUsers(this.page).then(res => {
          this.tableData = res.data.content; //用户数据
          this.page.totalElement = res.data.totalElements;
          this.page.pageSize = res.data.pageable.pageSize;
        });
      },
      // 删除操作
      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        }).then(() => {
          adminApi.deleteUser(row.userId).then((res) =>{
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
        this.$set(this.page, 'pageIndex', val);
        console.log(val)
        this.getUserData();
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
