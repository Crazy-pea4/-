<template>
  <div class="listBox">
    <!-- <div class="nameAndGrade">
      <span class="name">姓名</span>
      <span class="grade">成绩</span>
    </div> -->
    <div class="list">
      <ul>
        <li v-for="item in dataInfo" :key="item.id">
          <input type="checkbox" name="" id="" />
          <span>{{ item.name }}</span
          ><span class="grade">{{ item.grade }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import * as echarts from 'echarts';
export default {
  name: "list",
  data() {
    return {
      dataInfo: [],
    };
  },

  methods: {
    addToList(info) {
      // console.log("我是List", info);
      this.dataInfo.unshift(info);
      this.$bus.$emit("echartsChange", this.dataInfo);
    },
  },
  mounted() {
    this.$bus.$on("addToList", this.addToList);
    this.$bus.$emit("echartsChange", this.dataInfo);
  },
};
</script>

<style scoped>
.listBox {
  margin: 0 auto;
  width: 90%;
  border: 1px solid black;
  border-radius: 5px;
}

/* .nameAndGrade {
  margin: 0 auto;
  width: 55%;
  display: flex;
  justify-content: space-between;
} */
.list {
  margin: 0 auto;
  width: 80%;
}

.list ul li {
  position: relative;
  width: 275px;
}

.list ul li input {
  margin-right: 15%;
}

.list ul li span {
  text-align: center;
  width: 50px;
}

.grade {
  position: absolute;
  top: 0;
  right: 20px;
}
</style>
