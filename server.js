const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Yeni bir bağlantı kuruldu.');

  ws.on('message', (message) => {
    console.log('Alınan mesaj:', message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Bir bağlantı kapandı.');
  });
});

server.listen(3000, () => {
  console.log('WebSocket sunucusu dinleniyor...');
});
