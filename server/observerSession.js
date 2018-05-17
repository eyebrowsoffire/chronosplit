
class ObserverSession {
    constructor(ws) {
        this.ws = ws;
        console.log('observer connected');
    }

    send(data) {
        this.ws.send(data);
    }

    close() {
        console.log("closing connection");
        this.ws.close();
    }
}

module.exports = ObserverSession;