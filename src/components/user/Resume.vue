<template >
  <el-form :model="resume" status-icon  ref="companyRegister" label-width="100px" class="demo-ruleForm">
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="resume.realName"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex" >
      <el-radio-group v-model="resume.sex">
        <el-radio-button label="1">男</el-radio-button>
        <el-radio-button label="0">女</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="生日" prop="birthday">
      <el-date-picker
          v-model="resume.birthday"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>

    <el-form-item label="毕业院校" prop="university">
      <el-input v-model="resume.university"></el-input>
    </el-form-item>

    <el-form-item label="专业" prop="major">
      <el-input v-model="resume.major"></el-input>
    </el-form-item>

    <el-form-item label="学历" prop="degree">
      <el-input v-model="resume.degree"></el-input>
    </el-form-item>

    <el-form-item label="自我介绍" prop="introduction">
      <el-input  type="textarea" v-model="resume.introduction"></el-input>
    </el-form-item>

    <el-form-item label="专业特长" prop="speciality">
      <el-input  type="textarea" v-model="resume.speciality"></el-input>
    </el-form-item>

    <el-form-item label="实习经历" prop="experience">
      <el-input  type="textarea" v-model="resume.experience"></el-input>
    </el-form-item>

    <el-form-item label="期望岗位" prop="target">
      <el-input v-model="resume.target"></el-input>
    </el-form-item>

    <el-form-item label="期望薪资" prop="hopeSalary">
      <el-input v-model="resume.hopeSalary"></el-input>
    </el-form-item>

    <el-form-item label="家庭住址" prop="location">
      <el-input v-model="resume.workArea"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="updateResume()">更新简历</el-button>
      <el-button @click="resetForm('companyRegister')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as userApi from "@/api/user"
export default {
  name: "Resume",
  data(){
    return{
      resume:{
        resumeId:"",
        userId:"",
        realName:"",
        sex:'',
        birthday:"",
        university:"",
        major:"",
        degree:"",
        introduction:"",
        speciality:"",
        experience:"",
        target:"",
        hopeSalary:"",
        workArea:""
      },
    }
  },
  created() {
    this.getResumeData();
  },
  methods:{
    updateResume(){
      userApi.updateResume(this.resume).then(res => {
        if(res.code === 200){
          this.$notify({
            title: '更新成功',
            message: '简历更新成功',
            type: 'success'
          });
        }
      })
    },
    getResumeData(){
      let userTel = localStorage.getItem("userTel")
      userApi.getResumeData(userTel).then(res => {
        if(res.code === 200){
          this.resume = res.data;
          this.$message.success("查询成功");
          console.log(res.data)
        }else {
          this.$message.error("错误")
        }

      })
    },
  }
}
</script>

<style scoped>

</style>