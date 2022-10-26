## 使用`npm init vue@latest`创建Vue3项目遇到的问题

    按提示完成项目创建后，发现在其他文件下引入的`.vue`文件代码出现红色波浪，提示`使用找不到"xxx"模块或其相应的类型声明`。经过上网查阅资料后，发现是由于ts文件之间无法互相识别vue文件，因此在项目根目录下`env.d.ts`里补充：

```ts
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

同时不要忘记了在`tsconfig.json`里的配置：

```json
{
    "include": ["env.d.ts"]
}
```

当然，以上文件都在自动创建在rootDir下了
