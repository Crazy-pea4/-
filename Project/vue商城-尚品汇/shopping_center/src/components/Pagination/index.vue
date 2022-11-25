<template>
  <div class="Pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startAndEnd.start > 1"
      @click="$emit('getPageNo', 1)"
    >
      1
    </button>
    <button v-show="startAndEnd.start > 2">...</button>
    <!-- 中 -->
    <!-- v-for尽量避免与v-if一起写在同一个标签中，会有极大的性能浪费 -->
    <template v-for="(page, index) in startAndEnd.end">
      <!-- 使用v-for必须提供key，但是template标签不能指定key，所以在其内部的根标签指定:key -->
      <button
        :key="index"
        v-show="page >= startAndEnd.start"
        @click="$emit('getPageNo', page)"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </template>
    <!-- 下 -->
    <button v-show="startAndEnd.end < totalPage - 1">...</button>
    <button
      v-show="startAndEnd.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <div>{{ startAndEnd }}当前页码{{ pageNo }}---我是连续页码范围，测试用</div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEnd() {
      // 起始与结束页码
      let start = 0;
      let end = 0;
      // 特殊情况，当总页数没有连续页码多
      if (this.totalPage < this.continues) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        // 特殊情况 当前页面是1 或者 2      1 2 3 4 5
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // 特殊情况 当前页面是30 或者 31    27 28 29 30 31
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.Pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      // cursor: not-allowed;
      // background-color: #409eff;
      background-color: #c81623;
      color: #fff;
    }
  }
}
</style>