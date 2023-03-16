```js
// 这是一个接受 3 个参数的函数
const add = function (x, y, z) {
  return x + y + z;
};
```

柯里化后

```js
// 接收一个单一参数
const curryingAdd = function (x) {
  return function (y) {
    return function (z) {
      return x + y + z;
    };
  };
};
// 调用
curryingAdd(1)(2)(3);
```

简单讲就是把一个多参数的函数 f，变换成接受部分参数的函数 g，并且这个函数 g 会返回一个函数 h，函数 h 用来接受其他参数。函数 h 可以继续柯里化。就是一个套娃的过程～

## 2 柯里化的作用和特点

### 2.1 参数复用

工作中会遇到的需求：通过正则校验电话号、邮箱、身份证是否合法等等

于是我们会封装一个校验函数如下：

```js
/**
 * @description 通过正则校验字符串
 * @param {RegExp} regExp 正则对象
 * @param {String} str 待校验字符串
 * @return {Boolean} 是否通过校验
 */
function checkByRegExp(regExp, str) {
  return regExp.test(str);
}
```

假如我们要校验很多手机号、邮箱，我们就会这样调用：

```js
// 校验手机号
checkByRegExp(/^1\d{10}$/, "15152525634");
checkByRegExp(/^1\d{10}$/, "13456574566");
checkByRegExp(/^1\d{10}$/, "18123787385");
// 校验邮箱
checkByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/, "fsds@163.com");
checkByRegExp(/^(\w)+(\.\w+)_@(\w)+((\.\w+)+)$/, "fdsf@qq.com");
checkByRegExp(/^(\w)+(\.\w+)_@(\w)+((\.\w+)+)$/, "fjks@qq.com");
```

貌似没什么问题，事实上还有改进的空间

校验同一类型的数据时，相同的正则我们写了很多次。
代码可读性较差，如果没有注释，我们并不能一下就看出来正则的作用
我们试着使用函数柯里化来改进：

```js
// 将函数柯里化
function checkByRegExp(regExp) {
  return function (str) {
    return regExp.test(str);
  };
}
```

于是我们传入不同的正则对象，就可以得到功能不同的函数：

```js
// 校验手机
const checkPhone = curryingCheckByRegExp(/^1\d{10}$/)
// 校验邮箱
const checkEmail = curryingCheckByRegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)
现在校验手机、邮箱的代码就简单了，并且可读性也增强了

// 校验手机号
checkPhone('15152525634');
checkPhone('13456574566');
checkPhone('18123787385');
// 校验邮箱
checkEmail('fsds@163.com');
checkEmail('fdsf@qq.com');
checkEmail('fjks@qq.com');
```

这就是参数复用：我们只需将第一个参数 regExp 复用，就可以直接调用有特定功能的函数

通用函数(如 checkByRegExp)解决了兼容性问题，但也会带来使用的不便，比如不同的应用场景需要传递多个不同的参数来解决问题

有的时候同一种规则可能会反复使用（比如校验手机的参数），这就造成了代码的重复，利用柯里化就能够消除重复，达到复用参数的目的。

柯里化的一种重要思想：降低适用范围，提高适用性

### 2.2 提前返回

在 JS DOM 事件监听程序中，我们用 addEventListener 方法为元素添加事件处理程序，但是部分浏览器版本不支持此方法，我们会使用 attachEvent 方法来替代。

这时我们会写一个兼容各浏览器版本的代码：

```js
/**
 * @description:
 * @param {object} element DOM元素对象
 * @param {string} type 事件类型
 * @param {Function} fn 事件处理函数
 * @param {boolean} isCapture 是否捕获
 * @return {void}
 */
function addEvent(element, type, fn, isCapture) {
  if (window.addEventListener) {
    element.addEventListener(type, fn, isCapture);
  } else if (window.attachEvent) {
    element.attachEvent("on" + type, fn);
  }
}
```

我们用 addEvent 来添加事件监听，但是每次调用此方法时，都会进行一次判断，事实上浏览器版本确定下来后，没有必要进行重复判断。

柯里化处理：

```js
function curryingAddEvent() {
    if (window.addEventListener) {
        return function(element, type, fn, isCapture) {
            element.addEventListener(type, fn, isCapture)
        }
    } else if (window.attachEvent) {
        return function(element, type, fn) {
            element.attachEvent("on" + type, fn)
        }
    }
}
const addEvent = curryingAddEvent()

// 也可以用立即执行函数将上述代码合并
const addEvent = (function curryingAddEvent() {
 	...
})()
```

现在我们得到的 addEvent 是经过判断后得到的函数，以后调用就不用重复判断了。

这就是提前返回或者说提前确认，函数柯里化后可以提前处理部分任务，返回一个函数处理其他任务

### 2.3 延迟执行

事实上，上述正则校验和事件监听的例子中已经体现了延迟执行。

curryingCheckByRegExp 函数调用后返回了 checkPhone 和 checkEmail 函数

curringAddEvent 函数调用后返回了 addEvent 函数

返回的函数都不会立即执行，而是等待调用。

## 总结和补充

- 柯里化突出一种重要思想：降低适用范围，提高适用性

- 柯里化的三个作用和特点：参数复用、提前返回、延迟执行

柯里化是闭包的一个典型应用，利用闭包形成了一个保存在内存中的作用域，把接收到的部分参数保存在这个作用域中，等待后续使用。并且返回一个新函数接收剩余参数
