
OPEN:
------
最近学了一下Node.js，做了一个简单的讲稿，和大家分享一下，希望互相学习，不喜可喷！

PPT1:
------
分享分为3个部分，首先对Node.js做一个介绍，然后重点是讲3个demo，不会写demo的程序猿不是好猿，最后瞎扯一点相关的知识。

PPT2:
------
不要看node.js这个名字就以为这是前端开发的玩意，其实它是一个服务端开发语言，有的小伙伴可能会诧异了，javascript也可以做服务端开发，当javascript还只能被浏览器解析的时候当然不行啦，有了这货后javascript就从浏览器这个客户端端的代表中解脱出来了，从此走向了前后端通吃的康庄大道。鉴于表达能力有限，我从官网的上面翻译了这段定义：
> Node.js是一个构建在chrome的javascript运行时上的平台，可以用来构建快速的、可扩展的网络应用。它使用了**事件驱动**、**非阻塞I/O模型**为数据密集型实时运行程序提高了一个轻量、高效、跨平台的解决方案。

坦白说我翻译的时候都不晓得这些个专业词汇是什么意思，还是来点直白的吧，node.js使用Chrome的v8虚拟机来解释和执行javascript代码，同时提供了很多有用的模块，进行文件读取和网络交互等。
安装这等小事就略过不讲了，我们直接来看看node.js是怎么解释和执行javascript的吧。
*1.打开命令行，输入node，进入node的命令环境，来一段javascript代码，2.打开记事本，写一段js代码，保存，然后node xxx.js看效果*
用法就是这么简单，不要小看了这种简单，一砖一瓦是很不起眼的，铸成大厦后就让人叹为观止了，让我们来看看node.js能做些什么让人叹为观止的事情。

PPT3:
-------
如果要在写ppt和写代码中选一样，我会选后者，分享编程语言的重头戏当然是写代码啦。下面是三个demo由简单到复杂，第一个是用node.js搭建一个服务器，第二个是使用node.js爬play.google.com中下本周推荐app的title和href信息，第三个是一个简单的博客应用，可以写博客和展示最新的post。

PPT4:
-------
因为node.js主要是用来做web开发的，所以几乎所有讲node.js的地方都是已下面这段代码开场:

    ```
    var http = require('http');
    var server = http.createServer(function(req, res) {
        res.writeHeader(200, {'Content-type': 'text/plain'});
        res.write('Hello World!');
        res.end();
    })
    server.listen(1337, '127.0.0.1');
    ```

代码中的server就是一个简单的http服务器。

1.   node app/assets/snippet_createServer.js
2.   浏览器地址栏输入 localhost:1337

其实这个ppt讲稿就是由node.js搭建的一个http服务。
*看目录结构，目录有点乱*

- app和demo中是页面代码,app中包含所有ppt的页面，demo包括所有demo的页面。
- controller是服务端代码
    
    - [server.js](/controller/server.js)是入口,node server.js启动项目
    - [app.js](/controller/app.js)中是app页面说调用的web方法
    - [demo.js](/controller/demo.js)是demo相关页面调用的web方法
    - [base.js](/controller/base.js)是一些web方法公用的方法，比如render/renderJson,
    - [db.js](/controller/db.js)是数据库连接和数据model
    - [route.js](/controller/route.js)是路由对象
    - [mime.js](/controller/mime.js)是文件后缀和MIME的map
    - [config.js](/controller/config.js)是配置信息

PPT4:
-------
爬虫，相信大家都不陌生，主要分三步（非官方分法）：

1.   请求目标页面
2.   解析目标页面
3.   迭代1到2直到获取目标信息，然后返回给客户端

node.js自带的http模块提供了http.request方法，不过比较基础，参数较复杂，可以选择一些封装好一些的外部模块，我说知道的有request和superagent两个模块，我这里用了request模块，主要是因为我知道怎么用request设置代理，play.google.com需要设置代理去请求。这个模块就可以满足第一步的需求了，至于第二步，我还是采取了拿来主义，用了一个比较NB的外部模块--cheerio--可以理解成一个服务端的jquery，提供了很多jquery的api，可以用来解析请求获取的页面。
两个主要的问题都解决后就可以开工了

> 代码见:[controller/demo.js中的crawler方法](/controller/demo.js)，
> 执行结果见：[/demo/crawler](/demo/crawler)
> 存在的问题：页面返回结果中的非英文乱码，暂不清楚原因，待解决
> 还需要考虑的问题：并发连接过多及其他尚未考虑的问题

PPT5:
-------
搭建一个简单的博客，除了静态文件外，服务器端需要具备处理GET和POST请求以及从存取数据库的能力。

- GET请求
![首页获取最新博客的方法](/app/assets/getLatestPost.png)
- POST请求
