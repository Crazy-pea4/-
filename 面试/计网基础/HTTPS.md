## SSL/TLS

    https后面的s指的是SSL/TLS加密协议，SSL在现代浏览器大多数都不支持了，使用的都是TLS，但由于SSL名气大，所以现在也有人把它们混起来叫，或者就叫成SSL。这些其实都是不对的，下面的笔记都把TLS作为主要叫法

## 对称加密

    假定发送方和接收方事先规定一种别人都不知道的加密和解密算法G，那么理论上只有发送和接收方能正常进行通信，但如果由第三者不小心获取到了算法G，那么使用该算法的通信双方就相当于在别人面前裸奔了。

## 非对称加密

    为了避免上面出现的尴尬，非对称加密引入了公钥和私钥两个概念    

<img title="" src="file:///C:/Users/Crazy_pea/AppData/Roaming/marktext/images/2022-12-04-01-04-38-image.png" alt="" width="801">

小青有一把全世界只有他才有的青色钥匙，小红也是有一把独一无二的红色钥匙；他们两个决定把黄色钥匙公开出去，可以让别人看到这是我们要用到的钥匙；然后小青和小红用各自的私钥合并公开的公钥，两者都得到各自的私公钥结合体！并向对方交换；最后小青用小红给的结合体和自己的私钥再结合，小红也做相同的操作，结果发现都能合成一样的超级无敌独一无二钥匙。这就是非对称加密的过程

## TLS握手过程(TLS 1.2 简要版本)

TLS握手是在TCP三次握手之后，也就是连接确认建立之后。

1. 客户端想服务端发起请求附带一份随机数，服务端接收请求后返回证书和公钥也*附带一份随机数*

2. 客户端接收证书公钥，判断证书是否合法

3. 若合法，客户端生成一份**预主密钥**，并用收到的公钥进行**加密**

4. 将加密后的预主密钥传送至服务端，服务端用私钥解密得到预主密钥

5. 客户端在之前的传输时会携带一份随机数，客户端随机数和服务端随机数与预主密钥一起，生成**主密钥**，再生成**会话密钥**，服务端的数据通过会话密钥**加密**传递给客户端

6. 客户端也通过服务端的步骤合成会话密钥，解密服务端的数据。**注意**：此时已经是**对称加密**

总结：生成会话密钥之前都是非对称加密，TLS握手成功往后都是对称加密。



![5b2790b067b440e7c506145dbc4dfc48.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a35fee8f8414aadb51014b78f6fd806~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
