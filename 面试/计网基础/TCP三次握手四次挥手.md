[面试官问我TCP三次握手和四次挥手，我真的是 - 掘金 (juejin.cn)](https://juejin.cn/post/7045059219216662564)

<img title="" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1526edccb834e6ba69a91b411a2b670~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp" alt="" width="352" data-align="center">

<img title="" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4713a98adf894acd9589b59220690697~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp" alt="" width="363" data-align="center">

**SYN(synchronous建立联机)**

**ACK(acknowledgement 确认)**

PSH(push传送) 

FIN(finish结束) 

RST(reset重置) 

URG(urgent紧急)

**Sequence number(序列号)**

**Acknowledge number(确认号)**

## 三次握手（建立连接）

<img title="" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/23/170723de9b8aa08b~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp" alt="" width="435" data-align="center">

1. 从最开始双方都处于`CLOSED`状态。然后服务端开始监听某个端口，进入了`LISTEN`状态。

2. 然后客户端主动发起连接，发送`SYN`报文同时*携带生成的序列号*，自己变成了`SYN-SENT`状态。（证明客户端有发送信息的能力）

3. 服务端接收到，发送`SYN`*携带服务端序列号*和`ACK`*携带客户端序列号+1*的报文，自己变成了`SYN-REVD`。（证明服务端有收到和发送信息的能力）

4. 客户端收到后再发送`ACK`报文*携带服务器序列号+1*给服务端，自己变成了`ESTABLISHED`状态；

5. 服务端收到`ACK`之后，也变成了`ESTABLISHED`状态。

## 四次挥手（连接断开）

<img title="" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/23/170723e5c0e05829~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp" alt="" width="390" data-align="center">

1. 一开始客户端和服务端双方都处于 `ESTABLISHED` 状态状态

2. 客户端打算关闭连接，会发 `FIN` 报文给服务端（其实就是把标志位 FIN 点亮），客户端发送完之后，就进入`FIN_WAIT_1`状态

3. 服务端收到 `FIN` 报文之后，回复 `ACK` 报文给客户端（表示已经收到了），服务端发送完之后，就进入 `CLOSE_WAIT` 状态

4. 客户端接收到服务端的 `ACK` 报文，就进入了 `FIN_WAIT_2` 状态

5. 这时候，服务器可能还有数据要发送给客户端，等服务端确认自己已经没有数据返回给客户端之后，就发送 `FIN` 报文给客户端了，自己进入 `LAST_ACK` 状态

6. 客户端收到服务端的`FIN`报文之后，回应`ACK`报文，自己进入 `TIME_WAIT` 状态

7. 服务端收到客户端的`ACK`报文之后，服务端就进入 `CLOSE` 状态

8. 客户端在`TIME_WAIT`等到`2MSL`，也进入了 `CLOSE` 状态

*`2MSL`：*Maximum Segment Lifetime*（最大报文生存时间）

#### 问题

**面试官**：嗯嗯，刚聊完四次挥手嘛，那你觉得为什么是四次呢？

**候选者**：其实很好理解，当客户端第一次发送 FIN 报文之后，只是代表着客户端不再发送数据给服务端，但此时客户端还是有接收数据的能力的。而服务端收到FIN报文的时候，可能还有数据要传输给客户端，所以只能先回复 ACK给客户端。

**候选者**：等到服务端不再有数据发送给客户端时，才发送 FIN 报文给客户端，表示可以关闭了。

**候选者**：所以，一来一回就四次了。
