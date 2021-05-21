<template>
  <el-dialog title="数据展示" :visible.sync="dialogVisible" :width="width">
    <div class="box">
      <div id="myChart" :style="{ width: '100%', height: '100%' }"></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">Close</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {ShowPost} from "../apis/read.js"
// 引入基本模板
export default {
  props: {
    table_name: {
      type: Number / String,
    },
  },
  data() {
    return {
      dialogVisible: false,
      width: "800px",
    };
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.close();
      }
    },
  },
  created() {
    let width = document.body.clientWidth;
    console.log(width);
    if (width <= 850) {
      this.width = "350px";
    } else {
      this.width = "1100px";
    }
  },
  mounted() {
    this.dialogVisible = true;
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    close() {
      this.dialogVisible = false;
      this.$emit("close");
    },
    async init() {
      
      let res = await ShowPost({params: { table_name: this.table_name }})
      
      console.log('res',res)
      
      let response = res.data.data;
      let xAxis = JSON.parse(response[0]);
      let series = [];
      response.forEach((i, idx) => {
        if (idx != 0) {
          series.push({
            name: xAxis[i - 1],
            type: "line",
            smooth: true,
            lineStyle: 0.1,
            data: JSON.parse(i),
          });
        }
      });
      // 基于准备好的dom，初始化echarts实例
      let el = document.getElementById("myChart");
      let myChart = this.$echarts.init(el);
      // 绘制图表
      let option = {
        title: {
          text: this.table_name,
        },
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "12%",
          containLabel: true,
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 20,
          },
          {
            start: 0,
            end: 20,
          },
        ],
        legend: {
          data: xAxis,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,

          data: xAxis,
        },
        yAxis: {
          type: "value",
        },
        series,
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style>
.box {
  width: 1000px;
  height: 800px;
  margin: 0 auto;
}
@media (max-width: 850px) {
  .box {
    width: 300px;
    height: 200px;
    margin: 0 auto;
  }
}
</style>