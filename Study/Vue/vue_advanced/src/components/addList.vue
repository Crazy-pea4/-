<template>
  <div class="addListBox">
    <div class="inputBox">
      <span>姓名：</span>
      <input type="text" class="add-input" ref="nameInput" @keyup.enter="formList" />
      <span>-</span>
      <span>成绩：</span>
      <input type="text" class="add-input" ref="gradeInput" @keyup.enter="formList" />
    </div>
    <button class="add-button" @click="formList">添加</button>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "AddList",
  data() {
    return {
      nameInputVal: "",
      gradeInputVal: "",
    };
  },
  methods: {
    getNameInputVal() {
      this.nameInputVal = this.$refs.nameInput.value;
    },
    getGradeInputVal() {
      this.gradeInputVal = this.$refs.gradeInput.value;
    },
    formList() {
      let name = this.$refs.nameInput.value;
      let grade = this.$refs.gradeInput.value;
      if (name.trim() === "" && grade.trim() === "") {
        alert("请输入内容");
      } else {
        this.getNameInputVal();
        this.getGradeInputVal();
        const info = {
          name,
          grade,
          id: nanoid(),
        }
        this.$bus.$emit("addToList", info);
        this.$refs.nameInput.value = "";
        this.$refs.gradeInput.value = "";
      }
    },
  },
};
</script>

<style scoped>
.addListBox {
  position: relative;
  margin: 10px auto;
  width: 90%;
  height: 30px;
}

.inputBox {
  position: absolute;
  top: 0;
  left: 10%;
  /* transform: translateX(-50%); */
  width: 65%;
}

.add-input {
  margin-right: 10px;
  width: 80px;
  height: 30px;
  padding-left: 5px;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 5px;
}

.add-button {
  float: right;
  width: 18%;
  height: 31px;
  border: 0;
  line-height: 31px;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(55, 191, 245);
}
</style>