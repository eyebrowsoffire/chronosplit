import WebSocket = require("ws");

export class HostObserverSession {
    constructor(private ws: WebSocket) {
        console.log("observer connected");
    }

    public send(data: any) {
        this.ws.send(data);
    }

    public close() {
        console.log("closing connection");
        this.ws.close();
    }
}
