
class ControllerSession {
    constructor(ws) {
        this.ws = ws;
        console.log('controller connected');
    }

    send(data) {
        this.ws.send(data)
    }

    close() {
        console.log('closing connection');
        this.ws.close();
    }
}

module.exports = ControllerSession;