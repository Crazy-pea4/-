ES6 中 Map 相对于 Object 对象有几个区别：

Object 的键只能是字符串或者 Symbol，Map 的键值**可以是任意值**

Map 的键值是有序的，数据的排序是根据用户 push 的顺序进行排序的, 而 Object 实例中 key,value 的顺序就是有些规律了，(他们会先排数字开头的 key 值，然后才是字符串开头的 key 值)

Map 的键值对数量可以通过 size 属性获取，Object 则需要通过 Object.keys(obj).length 类似的方式获取

Object 有自己的原型，原型链上的键名可能与对象的键名产生冲突。除非我们使用 Object.create(null)创建一个没有原型的对象
