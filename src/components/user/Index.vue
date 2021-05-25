<template>
  <div class="wrapper">
    <u-head></u-head>
    <el-col :span="18" offset="3">
      <div >
      <el-scrollbar style="height:100%">
        <div >
          <router-view></router-view>
        </div>
      </el-scrollbar>
      </div>
    </el-col>

  </div>

</template>

<script>
import uHead from './Head'
export default {
  name:"Index",
  data() {
    return {
    };
  },
  components:{
    uHead
  },
};
</script>

<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}

</style>