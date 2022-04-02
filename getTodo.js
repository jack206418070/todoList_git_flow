function getTodo(res, headInfo, todos) {
    res.writeHead(200, headInfo);
    res.write(JSON.stringify(
        {
            "status": "200",
            "data": todos
        }
    ));
    res.end();
}

module.exports = getTodo;