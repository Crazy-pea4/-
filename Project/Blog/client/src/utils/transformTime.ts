import type { QuestionList } from "@/@types/store/home";
export default function transformTime(question: QuestionList) {
  const arr = ["createdAt", "updatedAt"];
  let year;
  let month;
  let date;
  let hour;
  let minute;
  let second;
  for (let i = 0; i < arr.length; i++) {
    year = new Date(question[arr[i]]).getFullYear();
    month = new Date(question[arr[i]]).getMonth() + 1;
    date = new Date(question[arr[i]]).getDate();
    hour = new Date(question[arr[i]]).getHours();
    minute = new Date(question[arr[i]]).getMinutes();
    second = new Date(question[arr[i]]).getSeconds();

    question[
      arr[i]
    ] = `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
  }
}
