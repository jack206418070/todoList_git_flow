const http = require('http'); //載入 http module
const { v4: uuidv4 } = require('uuid');
const { headers } = require('./libs'); // 載入 http 標頭 module
const errorHandle = require('./errorHandle');
const postTodo = require('./postTodo'); //載入新增 module
const getTodo = require('./getTodo'); //載入查詢 module
const todos = []; // 存放 todo 用

/**
 * 處理連線請求，執行 todo list 的查詢、新增、修改、刪除
 * @param {request} req 網路連線請求
 * @param {response} res 回應請求結果
 */
const requestListener = (req, res) => {

    if (req.url == "/todos" && req.method == "GET") {
        // 取得所有 todo 清單
        getTodo(res, headers, todos);
    } else if (req.url == "/todos" && req.method == "POST") {
        // 新增一筆 todo 
        postTodo(req, res, todos);
    } else if (req.url == "/todos" && req.method == "DELETE") {
        // deleteTodo.js
    } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
        // deleteTodo.js
    } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
        // patchTodo.js
    } else if (req.method == "OPTIONS") {
        res.writeHead(200, headers);
        res.end();
    } else {
        // 連線參數異常，回傳錯誤訊息
        res.writeHead(404, headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }));
        res.end();
    }
}

// 建立 http Server，監聽 http 連線請求
const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005); // 監聽指定 port 的連線請求