const { v4: uuidv4 } = require('uuid');
const errorHandle = require('./errorHandle');
const { headers } = require('./libs');

function postTodo(req, res, todos) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  })
  req.on('end', () => {
    try {
      const { title } = JSON.parse(body);
      if (title !== undefined) {
        const todo = {
          title,
          id: uuidv4()
        }
        todos.push(todo);

        res.writeHead(200, headers);
        res.write(JSON.stringify({
          status: 'success',
          data: todos
        }));
        res.end();
      } else {
        errorHandle(res);
      }
    } catch {
      errorHandle(res);
    }
  })
}

module.exports = postTodo;