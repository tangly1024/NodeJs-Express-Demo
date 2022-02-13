var express = require("express");
const res = require("express/lib/response");
const req = require("express/lib/request");

var app = express();

app.get("/", function (req, res) {
  console.log(req, res);
  res.send("Hello World!");
});

app.get("/user", function (req, res) {
  res.send("Got a Get request");
});

// 网站首页接受 POST 请求
app.post("/user", function (req, res) {
  res.send("Got a POST request");
});

// /user 节点接受 PUT 请求
app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

// /user 节点接受 DELETE 请求
app.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});

/**
 * app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。
 * 在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。
 */
app.all("/secret", function (req, res, next) {
  console.log("Accessing the secret section ...");
  next(); // pass control to the next handler
});

// 匹配 abcd、abbcd、abbbcd等
app.get("/ab+cd", function (req, res) {
  res.send("ab+cd");
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get("/ab*cd", function (req, res) {
  res.send("ab*cd");
});

// 匹配 /abe 和 /abcde
app.get("/ab(cd)?e", function (req, res) {
  res.send("ab(cd)?e");
});
// 匹配任何路径中含有 a 的路径：
app.get(/match/, function (req, res) {
  res.send("/a/");
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function (req, res) {
  res.send("/.*fly$/");
});

app.get("/example/a", function (req, res) {
  res.send("Hello from A!");
});

app.get(
  "/example/b",
  function (req, res, next) {
    console.log("response will be sent by the next function ...");
    next();
  },
  function (req, res) {
    res.send("Hello from B!");
  }
);

var cb0 = function (req, res, next) {
  console.log("CB0");
  next();
};

var cb1 = function (req, res, next) {
  console.log("CB1");
  next();
};

var cb2 = function (req, res) {
  res.send("Hello from C!");
};

app.get("/example/c", [cb0, cb1, cb2]);


app.get(
  "/example/d",
  [cb0, cb1],
  function (req, res, next) {
    console.log("the response will be sent by the next function ...");
    next();
  },
  function (req, res) {
    res.send("Hello from D!");
  }
);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
