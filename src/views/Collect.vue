<template>
  <div class="collect">
    <el-card>
      <div slot="header" class="header">
        <span>Plant electric signal online collection platform</span>
      </div>
      <el-row>
        <el-col :span="12" :xs="20" :offset="4" >
          <el-form
            :model="form"
            :rules="rules"

            ref="form"
            label-width="40%"
            class="demo-ruleForm"
          >
            <el-form-item label="Name" prop="table_name" >
              <el-input v-model="form.table_name" placeholder="Example:table_name_rf" ></el-input>
            </el-form-item>

            <el-form-item label="Frequency of sample(Hz)" prop="RF">
              <el-input type="number" v-model="form.RF"></el-input>
            </el-form-item>

            <el-form-item label="Acquisition time">
              <el-input disabled :value="times"></el-input>
            </el-form-item>

            <el-form-item class="bottom" label-width="0px" >

              <el-button type="primary" plain @click="submit">Start</el-button>
              <el-button type="primary" plain @click="push">Stop</el-button>
            
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { submit } from "../apis/read.js" 
export default {
  data() {
    return {
      form: {
        table_name: "",
        RF: 1,
        time: "0时0分0秒",
      },
      rules: {
          table_name: [
            { required: true, message: '请输入表名', trigger: 'blur' },
          ],
          RF: [
            { required: true, message: '请输入采集频率', trigger: 'blur' },
          ],},
      time: 0,
      inter: null,

    };
  },
  computed:{
    times(){
      let time = this.time
      let xiaoshi = Math.floor(time/3600)
      let fenzhong = Math.floor((time-xiaoshi) /60)
      let secn = Math.floor((time-xiaoshi) %60)

      return xiaoshi+'时'+fenzhong+'分'+secn+'秒'
    },

  },
  methods: {
    // 提交
    async submit() {
      this.$refs.form.validate(async (valid) => {
          if (valid) {
            let parms = {
              table_name: this.form.table_name,
              RF: this.form.RF,
              type: 'submit'
            }
            submit(parms)
            this.calculation()
            this.$message({
                  message: '开始采集',
                  type: 'success'
                });
            

          } else {
            console.log('error submit!!');
            return false;
          }
        });

    },
    // 计算时间
    calculation() {
      this.inter = setInterval(()=>{
        this.time ++
      },1000)

    },
    // 停止
    push() {
      this.$refs.form.validate(async (valid) => {
          if (valid) {
            let parms = {
              table_name: this.form.table_name,
              RF: this.form.RF,
              type: 'pause',
            }
            submit(parms)
            this.$message({
                  message: 'sss',
                  type: 'success'
                });
          clearInterval(this.inter)
          this.time = 0
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    

  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: flex-start;
}
 .collect{
  margin: 0 auto;
}
@media (min-width: 850px){
  .collect{
  width: 1200px;
  margin: 0 auto;
}
}
@media (max-width: 850px){
.demo-ruleForm >>> .el-form-item__label{
  width: 100px !important;
}
}
</style>