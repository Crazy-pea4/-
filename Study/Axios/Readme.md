## 启动SJON-Server

安装 JSON Server

```js
npm install -g json-server
```

创建一个 `db.json` 文件夹并写入下面的数据

```js
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

启动你的json-server

(请确保你在json-server文件夹目录下运行下面代码.)

```js
json-server --watch db.json
```