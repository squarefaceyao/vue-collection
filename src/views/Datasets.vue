<template>
  <div class="Datasets">
    <el-card >
      <el-header>
        Historical Data
      </el-header>
            <el-table
            :data="tables"
            border
            >

            <el-table-column
                  type="index"
                  :index="indexMethod">
                </el-table-column>

            <el-table-column
              label="Data"
            >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.create_time | formatDate3}}</span>
              </template>
            </el-table-column>
              <el-table-column
                prop="table_name"
                label="Name"
                >
              </el-table-column>

               <el-table-column
                prop="table_rows"
                label="Number"
                >
              </el-table-column>

              <el-table-column
                prop="table_name"
                label="操作"
                width="200"
                >
                <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handelInfo(scope.$index, scope.row)">Show</el-button> 
                 
                  <el-button 
                  size="mini"
                  type="danger"
                  @click="handleDownload(scope.$index, scope.row)">Dowload</el-button>
              </template>

              </el-table-column>

          </el-table>
    </el-card>

    <datases-popup v-if="show" @close="close" :table_name="row.table_name" ></datases-popup>   
    
  </div>
</template>


<script>
import datasesPopup from "@/components/datasesPopup.vue"
import { defineComponent, ref, onMounted, reactive } from '@vue/composition-api'
import { TablePost } from "../apis/read.js" 
import { Download ,Gettables}  from "../apis/read.js"
import { formatDate } from '../utils/date.js';


export default({
  name: 'Datasets',
  components: {
    datasesPopup
  },
  data(){
      return{
        tables:[],
        show: false,
        row: '',
      }
    },

    filters: {
    // 时间格式自定义 只需把字符串里面的改成自己所需的格式
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy.MM.dd');
    },
    formatDate2(time) {
      let date = new Date(time);
      return formatDate(date, 'hh:mm:ss');
    },
    formatDate3(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
   methods: {
      indexMethod(index) {
        return index * 1;
      },
      // 查看数据
      handelInfo(index,row) {
        this.row  = row
        this.show = true
      },
      async handleDownload(index,row) {
        let res = await Download({params: { table_name: row.table_name }})
        
        
        let data = res.data.data;
        let link = document.createElement('a')
        link.href = data
        // link.download = 'test.csv'
        link.click()
        
      
         this.$message({
          message: 'Congratulations!!!',
          type: 'success'
        });
      },
      // 删除组件
      close() {
        this.row = ''
        this.show = false
      }
    },

    mounted() {
      console.log(this.$echarts)
      // this.tables = [{
      //       "id": 1,
      //       "create_time": "Thu, 06 May 2021 14:26:36 GMT",
      //       "table_name": "123",
      //       "table_rows": 0
      //   }]
      Gettables().then(response => {
        
        /*自行替换接口返回的数据*/
        this.tables = response.data.data

      })
    }
})
</script>
<style>
.Datasets{
  margin: 0 auto;
}
@media (min-width: 850px){
  .Datasets{
  width: 1200px;
  margin: 0 auto;
}
}
@media (max-width: 850px){
  .Datasets{
}
}
</style>