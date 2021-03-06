const http = require('http');

const app = require('./src/app');
const chat = require('./src/chats/chat');

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log('Server is up on port ' + port);
});

chat(server);
