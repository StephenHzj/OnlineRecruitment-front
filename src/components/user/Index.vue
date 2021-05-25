<template>

    <div class="wrapper">
      <u-head></u-head>
      <el-col :span="18" offset="3">
        <div >
          <router-view></router-view>
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
.wrapper  {
  overflow-y: scroll;
  overflow-x: hidden;
}

/*.wrapper {*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  overflow: hidden;*/
/*}*/

</style>