const jsonServer = require("json-server");
const path = require("path");
const express = require("express");
const server = jsonServer.create();
const db = path.resolve(__dirname, "db.json");
const middlewares = jsonServer.defaults();
const router = jsonServer.router(db);
const NODE_ENV = process.env.NODE_ENV;
const root = path.resolve(
  __dirname,
  NODE_ENV === "production" ? "build" : "public"
);
const port = process.env.LEANCLOUD_APP_PORT || 3004;
// 配置前端路由
const reactRouters = [
  "/login",
  "detail/:id",
  "/search_result",
  "search",
  "/user",
  "/purchase/:id"
];

server.use(express.static(root, { maxAge: 86400 }));
server.use(express.json());
server.use(middlewares);

// 处理前端路由
router.get(reactRouters, (req, res) => {
  res.sendFile(root, "index.html");
});

// 登录
server.post("/login", (req, res) => {
  const { username, password } = req.body;

  res.send({
    username,
    id: 1
  });
});

server.use(router);
server.listen(port, () => {
  console.log("JSON Server is running on port: " + port);
});
