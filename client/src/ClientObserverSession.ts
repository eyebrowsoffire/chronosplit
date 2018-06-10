import { RunObserver } from "chronosplit-core/RunObserver";

import WebSocket = require("ws");

export class ClientObserverSession {
    private webSocket: WebSocket;
    constructor(private url: string, private observer?: RunObserver) {
        this.webSocket = new WebSocket(url);

        // Connection opened
        this.webSocket.on("open", this.onOpen);

        // Listen for messages
        this.webSocket.on("message", this.onMessage);
    }

    private onOpen = () => {
        console.log("Successfully connected.");
    }

    private onMessage = (data: WebSocket.Data) => {
        console.log("Received message: " + data);
    }
}
