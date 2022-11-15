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

## 当tailwindcss和ant-design-vue在一起

    当按官网的步骤下载配置好ant-design后，原先tailwindcss的效果失效了，考虑到可能与ant-design样式冲突，于是查阅tailwindcss官网找到解决办法：

```js
/*
important 选项允许您控制是否将 Tailwind 的功能类标记为 !important。
当您将 Tailwind 与已存在的具有非常特殊的选择器的 CSS 一起使用时，这可能会非常有用。
要生成 !important 的功能类，在您的配置选项中把 important 键设置为 true：
*/

// tailwind.config.js
module.exports = {
  important: true,
}
```

打开控制台可以看到tailwindcss的样式都加上了`!important`

<img title="" src="file:///C:/Users/Crazy_pea/AppData/Roaming/marktext/images/2022-10-26-10-18-35-image.png" alt="" data-align="inline">

### delete注册时用的checkPassword字段

    使用antDesign的form表单验证，会把checkPassword字段也添加到验证成功返回的对象中：

```ts
{
    ...,
    checkPassword: 123456
}
```

    显然，这里的对象是需要通过接口传递给后端的，那么这个checkPassword不需要存在，所以使用delete操作符删除checkPassword

```ts
const onFinish = (values: FormState) => {
    delete values.checkPass
    register(values)
}
```

    可是vscode检测到ts错误`"delete" 运算符的操作数必须是可选的。`，检查代码发现，之前定义的类型接口把checkPassword定义为必选，因此delete它会产生错误。于是将类型接口改为如下：

```ts
interface FormState {
    nickname: string
    phoneNumber: string;
    password: string;
    checkPass?: string;
}
```

错误解决

### autocomplete="off" 不生效

    autocomplete属性是表单字段中的HTML5新属性，该属性有两种状态值，分别为"on" 和 “off”，该属性可省略：省略属性值后默认值为"on"，也可以省略属性名，直接写入关键字on或off。 因为浏览器内部也会默认开启一个输入字段后自动补全的功能，所以在有些情况下我们设置 autocomplete=“off” 后会失效。

    所以处理这种情况的一个小tip就是将该属性赋一个除on 或 off之外的一个任意的值（你自己可以随便胡诌八扯一个值）。例如: autocomplete=“new-pwd”。

## router-view搭配keep-alive时出现的小毛病

    为了解决服务器带宽，某些页面采用keep-alive缓存防止多次请求数据

在app.vue中写：

```v
<RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.isKeepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.isKeepAlive" />
</RouterView>
```

调试时发现控制台报错

```
runtime-core.esm-bundler.js:38 

[Vue warn]: Unhandled error during execution of scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core 
  at <KeepAlive> 
  at <RouterView> 
  at <App>
warn2 @ runtime-core.esm-bundler.js:38
logError @ runtime-core.esm-bundler.js:212
handleError @ runtime-core.esm-bundler.js:204
callWithErrorHandling @ runtime-core.esm-bundler.js:158
flushJobs @ runtime-core.esm-bundler.js:388
Promise.then (async)
queueFlush @ runtime-core.esm-bundler.js:280
queuePostFlushCb @ runtime-core.esm-bundler.js:302
queueEffectWithSuspense @ runtime-core.esm-bundler.js:1589
scheduler @ runtime-core.esm-bundler.js:1811
triggerEffect @ reactivity.esm-bundler.js:396
triggerEffects @ reactivity.esm-bundler.js:386
triggerRefValue @ reactivity.esm-bundler.js:1002
(anonymous) @ reactivity.esm-bundler.js:1136
triggerEffect @ reactivity.esm-bundler.js:396
triggerEffects @ reactivity.esm-bundler.js:381
triggerRefValue @ reactivity.esm-bundler.js:1002
(anonymous) @ reactivity.esm-bundler.js:1136
triggerEffect @ reactivity.esm-bundler.js:396
triggerEffects @ reactivity.esm-bundler.js:381
triggerRefValue @ reactivity.esm-bundler.js:1002
set value @ reactivity.esm-bundler.js:1047
finalizeNavigation @ vue-router.mjs:3334
(anonymous) @ vue-router.mjs:3207
Promise.then (async)
pushWithRedirect @ vue-router.mjs:3174
push @ vue-router.mjs:3099
ToLocation @ sideBar.vue:27
onClick @ sideBar.vue:6
callWithErrorHandling @ runtime-core.esm-bundler.js:155
callWithAsyncErrorHandling @ runtime-core.esm-bundler.js:164
invoker @ runtime-dom.esm-bundler.js:339
runtime-core.esm-bundler.js:6070 

Uncaught (in promise) TypeError: parentComponent.ctx.deactivate is not a function
    at unmount (runtime-core.esm-bundler.js:6070:33)
    at patch (runtime-core.esm-bundler.js:5054:13)
    at sharedContext.activate (runtime-core.esm-bundler.js:2435:13)
    at processComponent (runtime-core.esm-bundler.js:5480:37)
    at patch (runtime-core.esm-bundler.js:5085:21)
    at ReactiveEffect.componentUpdateFn [as fn] (runtime-core.esm-bundler.js:5695:17)
    at ReactiveEffect.run (reactivity.esm-bundler.js:187:25)
    at instance.update (runtime-core.esm-bundler.js:5729:56)
    at updateComponent (runtime-core.esm-bundler.js:5554:26)
    at processComponent (runtime-core.esm-bundler.js:5487:13)
```

经过查阅资料得知，需要给`<Component />`动态组件加一个key

```v
<component :is="Component" v-if="$route.meta.isKeepAlive" :key="$route.name" />
```

问题解决

## vite静态资源处理

    vite内部将public文件夹下的所有文件暴露在根目录下，因此访问的时候直接`/assets/xxx`，而不是`/public/assets/xxx`

## 全局路由守卫--.then()与await

    在vue-router4中，舍弃了路由守卫第三个参数next，转变为使用

`return {name: xxx}`的形式去跳转路由。如果我们在里面进行请求操作时采用.then()获取异步结果是不行的，因为在.then()回调内部去`return {name: xxx} `是无效的，必须采用async await来保证函数作用域始终处在beforeEach回调当中

## mongoDB莫名罢工事件

    事情发生在一个优雅的夜晚，本人像以往一样熟练地打开mongodb连接`localhost:27017`，随后突如其来的报错把我震得一愣一愣的，在终端中显示

```
MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
```

我就纳闷，跟平常一样的手法居然这回不管用，去网上查了查，发现是连接`::1:27017`搞的鬼，本人前几天恰好将node升级成为了18版本（之前是16）node18内部使用的时ipv6，会自动将localhost域名翻译成`::1`而不是`127.0.0.1`，而我的代码恰好是

```
mongoose.connect("mongodb://localhost:27017/Blog");
```

所以只需要把localhost改成127.0.0.1即可，或者不嫌麻烦回退node版本
