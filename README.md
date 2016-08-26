# Web-DHT

Web-DHT is a demo showing one possible way for running a DHT within the web browser. It does this by utilizing [bittorrent-dht](https://github.com/feross/bittorrent-dht) as the DHT protococol and [peer-relay](https://github.com/xuset/peer-relay) as the underlying transport.

## Setup

```bash
git clone https://github.com/xuset/web-dht/
cd web-dht
npm install
```

To start the bootstrap/first peer run:
```bash
npm start 8000
```

This will start a NodeJS peer that accepts connections over WebSocket on port 8000. NodeJS peers support incoming WebSockets connections and optionally incoming WebRTC connections while web browser peers only support incoming WebRTC connections. Both support outgoing WebSocketing connections. 

To start a web browser peer open the `index.html` file with your browser either by double clicking or starting your own web server. It will attempt to bootstrap itself by first connecting to `ws://localhost:8000`. The `index.html` also provides a basic interface for the DHT by providing the ability to get and put static values in the DHT and also displaying some basic stats for that peer like who the peer is connected to.

Multiple web browser peers can be started by opening `index.html` in multiple tabs/windows/browsers and they will start to connect to each other.

