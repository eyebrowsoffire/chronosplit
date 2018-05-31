import WebSocket = require("ws");

export class ControllerSession {
    constructor(private ws: WebSocket) {
        console.log("controller connected");
    }

    public send(data: any) {
        this.ws.send(data);
    }

    public close() {
        console.log("closing connection");
        this.ws.close();
    }
}
