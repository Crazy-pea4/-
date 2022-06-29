import { hello } from "./test";

function test() {
  console.log("hello webpack");
}
test();
class myClass {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
let Tom = new myClass('汤姆');
console.log(Tom);
