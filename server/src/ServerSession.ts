import url = require("url");
import WebSocket = require("ws");
import http = require("http");
import net = require("net");

import { HostObserverSession } from "./HostObserverSession";
import { HostControllerSession } from "./HostControllerSession";
import { SessionTemplate } from "chronosplit-core/Models";
import { RunManager } from "./RunManager";

export class ServerSession {
  private httpServer: http.Server;
  private controlListener: WebSocket.Server;
  private observerListener: WebSocket.Server;
  private observers: Set<HostObserverSession> = new Set<HostObserverSession>();
  private controller?: HostControllerSession;
  private runManager: RunManager;

  constructor(private port: number, private template: SessionTemplate) {
    this.runManager = new RunManager(template);
  }

  public listen() {
    this.httpServer = http.createServer();
    this.controlListener = new WebSocket.Server({ noServer: true });
    this.observerListener = new WebSocket.Server({ noServer: true });

    this.controlListener.on("connection", this.createController);
    this.observerListener.on("connection", this.createObserver);
    this.httpServer.on("upgrade", this.upgrade);

    this.httpServer.listen(this.port);
  }

  private upgrade = (request: http.IncomingMessage, socket: net.Socket, head: Buffer) => {
    const pathname = url.parse(request.url).pathname;

    if (pathname === "/control") {
      const controlListener = this.controlListener;
      controlListener.handleUpgrade(request, socket, head, function done(ws) {
        controlListener.emit("connection", ws, request);
      });
    } else if (pathname === "/observe") {
      const observerListener = this.observerListener;
      observerListener.handleUpgrade(request, socket, head, function done(ws) {
        observerListener.emit("connection", ws, request);
      });
    } else {
      console.log("unexpected pathname");
      socket.destroy();
    }
  }

  private createController = (ws: WebSocket) => {
    if (!this.controller) {
      this.controller = new HostControllerSession(ws, this.runManager);
      this.controller;
    } else {
      ws.send("Controller already connected");
      ws.close();
    }
  }

  private createObserver = (ws: WebSocket) => {
    const observerSession = new HostObserverSession(ws);
    this.observers.add(observerSession);
  }
}
