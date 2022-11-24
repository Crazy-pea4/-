// 可选属性与只读属性
interface selectableAndReadonly {
  name?: string;
  readonly age: number;
}

const obj1: selectableAndReadonly = {
  name: "John",
  age: 1,
};

// obj1.age++ // throw error




