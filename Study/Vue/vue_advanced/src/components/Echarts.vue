<template>
  <div class="echartsBox">
    <button class="switch" @click="switchMode">切换</button>
    <div class="echarts" ref="echarts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Echarts",
  data() {
    return {
      mode: "bar",
      isEchartsInit: false,
      myChart: null,
      // 用来储存数据信息，当echarts仅有类型改变时就用这里面的数据
      dataInfo: [],
    };
  },
  methods: {
    echartsInit(dom) {
      let myChart = echarts.init(dom);
      this.isEchartsInit = true;
      this.myChart = myChart;
    },
    echartsChange(dataInfo = this.dataInfo) {
      console.log(dataInfo);
      this.dataInfo = dataInfo;
      let Xdata = [];
      let Sdata = [];
      dataInfo.forEach((item) => {
        Xdata.push(item.name);
        Sdata.push(item.grade);
      });
      let dom = this.$refs.echarts;
      if (this.isEchartsInit === false) {
        this.echartsInit(dom);
      } else {
        this.myChart.setOption({
          title: {
            text: "领沃前端第二轮考核",
          },
          xAxis: {
            data: Xdata,
          },
          yAxis: {},
          series: [
            {
              name: "成绩",
              type: this.mode,
              data: Sdata,
            },
          ],
        });
      }
    },
    switchMode() {
      this.mode = this.mode === "bar" ? "line" : "bar";
      this.echartsChange();
    },
  },
  mounted() {
    this.$bus.$on("echartsChange", this.echartsChange);
    this.echartsChange();
  },
};
</script>

<style scoped>
.echartsBox {
  position: relative;
}

.echarts {
  margin-top: 125px;
  width: 100%;
  height: 350px;
}

.switch {
  position: absolute;
  top: -31px;
  right: 5%;
  width: 95px;
  height: 31px;
  line-height: 31px;
  text-align: center;
  border-radius: 5px;
  z-index: 999;
  color: white;
  background-color: darkcyan;
}
</style>
