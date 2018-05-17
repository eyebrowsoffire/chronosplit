const url = require('url');
const WebSocket = require('ws');
const http = require('http');
const ObserverSession = require('./observerSession.js');
const ControllerSession = require('./controllerSession.js');

class ServerSession {
  constructor(port, template) {
    this.port = port;
    this.template = template;
  }

  listen() {
    this.httpServer = http.createServer();
    this.controlListener = new WebSocket.Server({ noServer: true });
    this.observerListener = new WebSocket.Server({ noServer: true });

    this.observers = [];

    this.controlListener.on('connection', this.createController.bind(this));
    this.observerListener.on('connection', this.createObserver.bind(this));
    this.httpServer.on('upgrade', this.upgrade.bind(this));
    
    this.httpServer.listen(this.port);    
  }

  upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    
    if (pathname === '/control') {
      var controlListener = this.controlListener;
      controlListener.handleUpgrade(request, socket, head, function done(ws) {
        controlListener.emit('connection', ws, request);
      });
    } else if (pathname === '/observe') {
      var observerListener = this.observerListener;
      observerListener.handleUpgrade(request, socket, head, function done(ws) {
        observerListener.emit('connection', ws, request);
      });
    } else {
      console.log('unexpected pathname');
      socket.destroy();
    }
  }

  createController(ws) {
    if (!this.controller) {
      this.controller = new ControllerSession(ws);
      this.controller
    } else {
      ws.send('Controller already connected');
      ws.close();
    }
  }

  createObserver(ws) {
    var observerSession = new ObserverSession(ws);
    this.observers.push(observerSession);
  }
}

module.exports = ServerSession;