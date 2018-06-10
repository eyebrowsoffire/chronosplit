import WebSocket = require("ws");

import { RunManager } from "./RunManager";
import * as Commands from "chronosplit-core/Commands";

export class HostControllerSession {
    constructor(private ws: WebSocket, private runManager: RunManager) {
        console.log("controller connected");
        ws.on("message", this.receivedMessage);
    }

    public send(data: any) {
        this.ws.send(data);
    }

    public close() {
        console.log("closing connection");
        this.ws.close();
    }

    private receivedMessage = (data: WebSocket.Data) => {
        if (typeof data !== "string") {
            console.log("received non-string message from websocket");
            return;
        }

        const command: Commands.Command = JSON.parse(data);

        switch (command.command) {
            case (Commands.CommandType.StartRun): {
                this.runManager.startRun();

                // TODO: issue response.
                break;
            }

            case (Commands.CommandType.EnterSplit): {
                if (!command.secondsSinceStart) {
                    // TODO: issue error.
                    return;
                }

                this.runManager.enterSplit(command.secondsSinceStart);
                // TODO: issue response.
                break;
            }
        }
    }
}
