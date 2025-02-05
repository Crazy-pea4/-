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

<img title="" src="file:///C:/Users/Crazy_pea/AppData/Roaming/marktext/images/2022-10-26-10-18-35-image.png" alt="" data-align="inline">****

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

## storeToRefs之多重解构有时不成功

    在写展示ip地址的组件时，为了方便在模板中使用数据，使用了storeToRefs进行数据响应式解构：

```js
import useCustomStore from "@/stores/custom"
import { storeToRefs } from 'pinia'
// 创建自定义功能仓库
const customStore = useCustomStore()
const { ipInfo } = storeToRefs(customStore)
```

但是这样写还是不可避免地要在模板中写`ipInfo.xxx`的形式，于是我想能不能多重解构，由于解构出来的ipInfo是被ref()处理过的，因此：

```js
const { ipInfo: { value: { area, city, country, isp, ip } } }
    = storeToRefs(customStore)
```

但是奇怪的是这样解构出来的数据有时会**出现**有时则不会，而不会的情况占大多数，所以还是只能采用第一种写法。（后来推测是使用下面的多重解构方式破坏了ipInfo的响应性，在组件初始化的时候上面代码已经执行，而异步请求稍后才改变ipInfo对象，破坏了其响应性导致即使后面数据更改，也无法在模板中改变）

### 迅速的question

    在编写Question页面时，并不把它作为Home页面下的子页面，因此其需要的questionList也就是在useMainFloorStore中的数据需要额外引入

`import { useMainFloorStore } from "@/stores/home"`（在这之前使用的事件代理以及如何传递参数不在这里提了，毕竟比较基础）

拿到question的目的就是展示标题、描述等，在模板中使用`{{question.id}}`，然后再js中

```js
onMounted(() => {
    // 由于使用了其他模块的store，在页面刷新的时候也要加上mainFloor的数据获取步骤
    if (!mainFloorStore.questionList.length) {
        mainFloorStore.updateQuestionList()
        questionStore.updateAnswerList(query.questionid as string)
    }
    question.value = mainFloorStore.questionList[Number(query.index)]
})
```

起初通过home页面点击跳转至question页面数据获取还是正常的，当刷新了之后，就出现了报错，排查后发现是在模板中使用question时它还是undefined，也就是没有及时获取到数据。将上面的代码改造：

```js
onBeforeMount(async () => {
    // 由于使用了其他模块的store，在页面刷新的时候也要加上mainFloor的数据获取步骤
    if (!mainFloorStore.questionList.length) {
        await mainFloorStore.updateQuestionList()
        await questionStore.updateAnswerList(query.questionid as string)
    }
    question.value = mainFloorStore.questionList[Number(query.index)]
})
```

再次刷新页面后发现数据出现在模板上，但是控制台还是报错，为了让控制台美观一点，添加`v-if` <header v-if="question></header>保证question不为undefined时再使用

### 设计互斥点赞、踩功能

后端：在设计接口的时候，只设计了两个接口：点赞和踩，通过分辨是`PUT`和`DELETE`方法来分辨是新增还是取消。

前端：通过后端返回的isLikes和isHesitation字段来判别当前的按钮状态，然后决定是新增还是取消

以上是原先的想法，当实践过后发现还有很多问题要解决，比如无法确定当前是点击了哪个按钮（采用了事件代理），已经点赞但是又想点踩等

于是给按钮都添加上自定义属性

```html
<div class="w-16 h-7 border-slate-600 border-1 flex justify-center items-center cursor-pointer rounded-xl mr-1"
     :class="{ 'bg-slate-600': i.isLikes, 'text-white': i.isLikes }" :data-answerId="i._id"
     :data-which="1" :data-isLikes="i.isLikes" :data-isHesitation="i.isHesitation">
     赞
</div>
```

分三种情况：

1. 没有点赞信息，直接点赞，赞值+1

2. 有点赞信息，再次点击点赞（取消点赞），赞值-1

3. 有点赞信息，点击踩，赞值+1、踩值+1

同时以上的值也要对应相应的样式更改。由于后端部分设计的耦合度太高，将第二种情况单独领出来修改isLikes和isHesitation

## 将项目打包放入服务器中

    在腾讯云的宝塔面板里完成后端的相关配置后（在后端的problem-i-meet.md中写了），将项目build打包，期间可能会有些库和vite+ts的检测不合符，可以使用`@ts-nocheck`来整个文件忽略ts检查

```js
// @ts-nocheck

const a = 100
let b = true
...
```

    项目顺利打包后，找个离后端文件夹近的地方放client文件夹，之后配置运行的后端项目，填写域名

![](C:\Users\Crazy_pea\AppData\Roaming\marktext\images\2022-12-18-00-39-22-image.png)

然后打开外网映射

![](C:\Users\Crazy_pea\AppData\Roaming\marktext\images\2022-12-18-00-39-39-image.png)

此时再去访问公网地址就会发现可以进入项目的前端页面了
