const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Local URL: http://localhost:${PORT}`);
  const networkInterfaces = os.networkInterfaces();
  Object.keys(networkInterfaces).forEach(interfaceName => {
    networkInterfaces[interfaceName].forEach(interface => {
      if (interface.family === 'IPv4' && !interface.internal) {
        console.log(`Network URL: http://${interface.address}:${PORT}`);
      }
    });
  });
});
